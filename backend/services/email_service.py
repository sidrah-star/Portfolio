import aiosmtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_host = os.getenv('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', '587'))
        self.smtp_user = os.getenv('SMTP_USER', '')
        self.smtp_pass = os.getenv('SMTP_PASS', '')
        self.contact_email = os.getenv('CONTACT_EMAIL', 'hsidra10@gmail.com')
        
    async def send_contact_email(self, name: str, email: str, message: str, contact_id: str) -> bool:
        """Send contact form message to Sidra's email"""
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f"New Contact Form Message from {name}"
            msg['From'] = self.smtp_user
            msg['To'] = self.contact_email
            msg['Reply-To'] = email
            
            # Create HTML content
            html_content = f"""
            <html>
                <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #00d4aa, #45b7d1); padding: 20px; border-radius: 10px 10px 0 0;">
                        <h2 style="color: white; margin: 0;">New Contact Form Message</h2>
                    </div>
                    <div style="background: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0;">
                        <h3 style="color: #333; margin-top: 0;">Contact Details:</h3>
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Contact ID:</strong> {contact_id}</p>
                        
                        <h3 style="color: #333;">Message:</h3>
                        <div style="background: white; padding: 15px; border-left: 4px solid #00d4aa; margin: 10px 0;">
                            <p style="margin: 0; line-height: 1.6;">{message}</p>
                        </div>
                        
                        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                        <p style="color: #666; font-size: 12px;">
                            This message was sent from your portfolio website contact form.
                        </p>
                    </div>
                </body>
            </html>
            """
            
            # Create plain text content
            text_content = f"""
            New Contact Form Message
            
            Name: {name}
            Email: {email}
            Contact ID: {contact_id}
            
            Message:
            {message}
            
            ---
            This message was sent from your portfolio website contact form.
            """
            
            # Attach both versions
            text_part = MIMEText(text_content, 'plain')
            html_part = MIMEText(html_content, 'html')
            
            msg.attach(text_part)
            msg.attach(html_part)
            
            # Send email
            await aiosmtplib.send(
                msg,
                hostname=self.smtp_host,
                port=self.smtp_port,
                start_tls=True,
                username=self.smtp_user,
                password=self.smtp_pass,
            )
            
            logger.info(f"Contact email sent successfully for contact ID: {contact_id}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send contact email: {str(e)}")
            return False
    
    async def send_confirmation_email(self, name: str, email: str) -> bool:
        """Send confirmation email to the person who contacted"""
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = "Thank you for contacting Sidra Hussain"
            msg['From'] = self.smtp_user
            msg['To'] = email
            
            # Create HTML content
            html_content = f"""
            <html>
                <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #00d4aa, #45b7d1); padding: 20px; border-radius: 10px 10px 0 0;">
                        <h2 style="color: white; margin: 0;">Thank You for Your Message!</h2>
                    </div>
                    <div style="background: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0;">
                        <p>Hi {name},</p>
                        
                        <p>Thank you for reaching out! I've received your message and will get back to you within 24 hours.</p>
                        
                        <p>In the meantime, feel free to:</p>
                        <ul>
                            <li>Check out my projects on <a href="https://github.com/sidrah-star" style="color: #00d4aa;">GitHub</a></li>
                            <li>Connect with me on <a href="https://www.linkedin.com/in/sidra-hussain123/" style="color: #45b7d1;">LinkedIn</a></li>
                        </ul>
                        
                        <p>Best regards,<br><strong>Sidra Hussain</strong><br>Machine Learning Practitioner & AI Enthusiast</p>
                        
                        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                        <p style="color: #666; font-size: 12px;">
                            This is an automated response from Sidra's portfolio website.
                        </p>
                    </div>
                </body>
            </html>
            """
            
            # Create plain text content
            text_content = f"""
            Hi {name},
            
            Thank you for reaching out! I've received your message and will get back to you within 24 hours.
            
            In the meantime, feel free to:
            - Check out my projects on GitHub: https://github.com/sidrah-star
            - Connect with me on LinkedIn: https://www.linkedin.com/in/sidra-hussain123/
            
            Best regards,
            Sidra Hussain
            Machine Learning Practitioner & AI Enthusiast
            
            ---
            This is an automated response from Sidra's portfolio website.
            """
            
            # Attach both versions
            text_part = MIMEText(text_content, 'plain')
            html_part = MIMEText(html_content, 'html')
            
            msg.attach(text_part)
            msg.attach(html_part)
            
            # Send email
            await aiosmtplib.send(
                msg,
                hostname=self.smtp_host,
                port=self.smtp_port,
                start_tls=True,
                username=self.smtp_user,
                password=self.smtp_pass,
            )
            
            logger.info(f"Confirmation email sent successfully to: {email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send confirmation email: {str(e)}")
            return False