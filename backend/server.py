from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ValidationError
from typing import List, Optional
import uuid
from datetime import datetime

# Import our models and services
from models.contact import ContactCreate, ContactMessage, ContactResponse
from services.email_service import EmailService
from services.rate_limiter import rate_limiter

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initialize services
email_service = EmailService()

# Create the main app without a prefix
app = FastAPI(title="Sidra Hussain Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Helper function to get client IP
def get_client_ip(request: Request) -> str:
    """Get client IP address from request"""
    x_forwarded_for = request.headers.get('x-forwarded-for')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0].strip()
    return request.client.host

# Define Models for existing endpoints
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Existing routes
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Contact form endpoint
@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(
    contact_data: ContactCreate,
    request: Request
):
    """Submit contact form message"""
    try:
        # Get client info
        client_ip = get_client_ip(request)
        user_agent = request.headers.get('user-agent', '')
        
        # Check rate limiting
        if not rate_limiter.is_allowed(client_ip):
            remaining_requests = rate_limiter.get_remaining_requests(client_ip)
            reset_time = rate_limiter.get_reset_time(client_ip)
            
            raise HTTPException(
                status_code=429,
                detail={
                    "success": False,
                    "message": f"Too many requests. Please try again later. Limit resets at {reset_time.strftime('%H:%M UTC')}",
                    "remaining_requests": remaining_requests
                }
            )
        
        # Create contact message
        contact_message = ContactMessage(
            name=contact_data.name.strip(),
            email=contact_data.email.lower().strip(),
            message=contact_data.message.strip(),
            ip_address=client_ip,
            user_agent=user_agent
        )
        
        # Save to database
        result = await db.contact_messages.insert_one(contact_message.dict())
        
        if not result.inserted_id:
            raise HTTPException(
                status_code=500,
                detail={
                    "success": False,
                    "message": "Failed to save message. Please try again."
                }
            )
        
        # Send email notification (async, don't block response)
        email_sent = await email_service.send_contact_email(
            name=contact_message.name,
            email=contact_message.email,
            message=contact_message.message,
            contact_id=contact_message.id
        )
        
        # Send confirmation email to sender
        confirmation_sent = await email_service.send_confirmation_email(
            name=contact_message.name,
            email=contact_message.email
        )
        
        # Log email status
        if not email_sent:
            logger.warning(f"Failed to send notification email for contact {contact_message.id}")
        if not confirmation_sent:
            logger.warning(f"Failed to send confirmation email for contact {contact_message.id}")
        
        # Return success response
        return ContactResponse(
            success=True,
            message="Thank you for your message! I'll get back to you within 24 hours.",
            id=contact_message.id
        )
        
    except ValidationError as e:
        logger.error(f"Validation error in contact form: {e}")
        raise HTTPException(
            status_code=422,
            detail={
                "success": False,
                "message": "Please check your input and try again.",
                "errors": [str(error) for error in e.errors()]
            }
        )
    
    except HTTPException:
        # Re-raise HTTP exceptions (like rate limiting)
        raise
    
    except Exception as e:
        logger.error(f"Unexpected error in contact form: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "message": "An unexpected error occurred. Please try again later."
            }
        )

# Get contact messages (for admin purposes)
@api_router.get("/contact/messages")
async def get_contact_messages(
    limit: int = 50,
    skip: int = 0,
    status: Optional[str] = None
):
    """Get contact messages (admin endpoint)"""
    try:
        # Build query
        query = {}
        if status:
            query["status"] = status
        
        # Get messages
        cursor = db.contact_messages.find(query).sort("created_at", -1).skip(skip).limit(limit)
        messages = await cursor.to_list(length=limit)
        
        # Get total count
        total = await db.contact_messages.count_documents(query)
        
        return {
            "success": True,
            "messages": messages,
            "total": total,
            "limit": limit,
            "skip": skip
        }
        
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "message": "Failed to fetch messages"
            }
        )

# Health check endpoint
@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test database connection
        await db.command("ping")
        
        return {
            "status": "healthy",
            "timestamp": datetime.utcnow().isoformat(),
            "services": {
                "database": "connected",
                "email": "configured" if email_service.smtp_user else "not_configured"
            }
        }
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(
            status_code=503,
            detail={
                "status": "unhealthy",
                "message": str(e)
            }
        )

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()