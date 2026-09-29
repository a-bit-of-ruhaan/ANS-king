import hashlib
import os
import binascii
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from app.core.database import get_db, engine
from app.models import User, History, Base
from app.schemas import UserCreate, UserLogin, Token, GenerateRequest, HistoryResponse
from app.services.ai_service import generate_answer
from typing import List

# Create tables
Base.metadata.create_all(bind=engine)

router = APIRouter()

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def get_current_user(authorization: str = Header(None), db: Session = Depends(get_db)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.split(" ")[1]
    user = db.query(User).filter(User.token == token).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user

@router.post("/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username already registered")
    
    token = binascii.hexlify(os.urandom(20)).decode()
    db_user = User(
        username=user.username,
        password_hash=hash_password(user.password),
        token=token
    )
    db.add(db_user)
    db.commit()
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username, User.password_hash == hash_password(user.password)).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    token = binascii.hexlify(os.urandom(20)).decode()
    db_user.token = token
    db.commit()
    return {"access_token": token, "token_type": "bearer"}

@router.post("/generate")
def generate(req: GenerateRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        content = generate_answer(req.topic, req.subject)
        
        history_item = History(
            user_id=current_user.id,
            topic=req.topic,
            subject=req.subject,
            content=content
        )
        db.add(history_item)
        db.commit()
        
        return {"content": content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history", response_model=List[HistoryResponse])
def get_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(History).filter(History.user_id == current_user.id).order_by(History.created_at.desc()).all()
