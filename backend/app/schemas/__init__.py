from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class GenerateRequest(BaseModel):
    topic: str
    subject: str
    marks: Optional[str] = "Long Answer"

class HistoryResponse(BaseModel):
    id: int
    topic: str
    subject: str
    content: str
    created_at: datetime
    
    class Config:
        orm_mode = True
