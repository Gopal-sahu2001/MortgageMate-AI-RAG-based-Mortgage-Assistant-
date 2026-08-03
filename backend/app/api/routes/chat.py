from fastapi import APIRouter

router = APIRouter()


@router.post("/chat")
def chat():
    return {
        "response": "Hello! I am your Mortgage AI Assistant. AI integration is coming soon."
    }