from datetime import datetime, timedelta
from typing import Dict, List
import asyncio

class RateLimiter:
    def __init__(self):
        self.requests: Dict[str, List[datetime]] = {}
        self.max_requests = 5  # Max 5 requests per hour
        self.time_window = timedelta(hours=1)
    
    def is_allowed(self, ip_address: str) -> bool:
        """Check if the IP address is allowed to make a request"""
        now = datetime.utcnow()
        
        # Clean old requests
        if ip_address in self.requests:
            self.requests[ip_address] = [
                req_time for req_time in self.requests[ip_address]
                if now - req_time < self.time_window
            ]
        else:
            self.requests[ip_address] = []
        
        # Check if limit exceeded
        if len(self.requests[ip_address]) >= self.max_requests:
            return False
        
        # Add current request
        self.requests[ip_address].append(now)
        return True
    
    def get_remaining_requests(self, ip_address: str) -> int:
        """Get remaining requests for an IP address"""
        if ip_address not in self.requests:
            return self.max_requests
        
        now = datetime.utcnow()
        recent_requests = [
            req_time for req_time in self.requests[ip_address]
            if now - req_time < self.time_window
        ]
        
        return max(0, self.max_requests - len(recent_requests))
    
    def get_reset_time(self, ip_address: str) -> datetime:
        """Get when the rate limit resets for an IP address"""
        if ip_address not in self.requests or not self.requests[ip_address]:
            return datetime.utcnow()
        
        oldest_request = min(self.requests[ip_address])
        return oldest_request + self.time_window

# Global rate limiter instance
rate_limiter = RateLimiter()