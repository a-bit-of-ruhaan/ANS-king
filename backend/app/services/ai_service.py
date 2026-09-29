import google.generativeai as genai
from app.core.config import settings

def generate_answer(topic: str, subject: str) -> str:
    prompt = f"Write a detailed university exam answer for '{subject}: {topic}'. Structure: Intro, Key Points, Examples, Conclusion."
    
    api_key = settings.GEMINI_API_KEY
    if not api_key or api_key == "your_gemini_api_key_here":
        raise Exception("No valid Gemini API key found in configuration.")

    try:
        genai.configure(api_key=api_key)
        
        # Use gemini-3.6-flash by default as it's the recommended model for text generation
        model_name = getattr(settings, 'GEMINI_MODEL', 'gemini-3.6-flash')
        model = genai.GenerativeModel(model_name)
        
        system_instruction = "You are a helpful academic assistant."
        
        # We can either pass system instructions to the model at creation or just prepend it to the prompt.
        # Starting with Gemini 1.5, system instructions are natively supported:
        try:
            model = genai.GenerativeModel(model_name, system_instruction=system_instruction)
        except Exception:
            # Fallback if the package version doesn't support system_instruction directly
            prompt = f"{system_instruction}\n\n{prompt}"
            model = genai.GenerativeModel(model_name)

        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        raise Exception(f"Failed to generate answer using Gemini: {str(e)}")
