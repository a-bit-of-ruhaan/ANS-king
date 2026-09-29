import openai
from app.core.config import settings
import time

def generate_answer(topic: str, subject: str) -> str:
    prompt = f"Write a detailed university exam answer for '{subject}: {topic}'. Structure: Intro, Key Points, Examples, Conclusion."
    
    api_keys = [
        settings.GROK_API_KEY, 
        settings.GROK_API_KEY_2, 
        settings.GROK_API_KEY_3
    ]
    
    # Filter out empty placeholders
    valid_keys = [k for k in api_keys if k and k != "your_backup_key_here" and "i am using grok" not in k.lower()]
    
    if not valid_keys:
        raise Exception("No valid API keys found in configuration.")

    last_error = None
    
    for key in valid_keys:
        try:
            client = openai.OpenAI(
                api_key=key,
                base_url="https://api.x.ai/v1",
            )
            response = client.chat.completions.create(
                model=settings.GROK_MODEL,
                messages=[
                    {"role": "system", "content": "You are a helpful academic assistant."},
                    {"role": "user", "content": prompt}
                ]
            )
            return response.choices[0].message.content
        except Exception as e:
            error_str = str(e).lower()
            if "429" in error_str or "quota" in error_str or "exhausted" in error_str:
                last_error = e
                print(f"Key failed with quota limit, trying next key... ({e})")
                continue
            else:
                # If it's a different error (e.g. 404, bad format), raise immediately
                raise e
                
    # If all keys failed with quota errors
    raise Exception(f"All available API keys have exceeded their quota. Last error: {str(last_error)}")
