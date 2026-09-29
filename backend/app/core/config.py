import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "EXAM Answer AI"
    PROJECT_VERSION: str = "1.0.0"
    GROK_API_KEY: str = os.getenv("GROK_API_KEY", "")
    GROK_API_KEY_2: str = os.getenv("GROK_API_KEY_2", "")
    GROK_API_KEY_3: str = os.getenv("GROK_API_KEY_3", "")
    GROK_MODEL: str = os.getenv("GROK_MODEL", "grok-beta")
    
    class Config:
        env_file = ".env"

settings = Settings()
