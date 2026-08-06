from fastapi import FastAPI
from app.api.routes.chat import router as chat_router
#from app.api import users
from app.api.routes.health import router as health_router
from app.api.users import router as users_router

app = FastAPI(
    title="Mortgage AI Assistant API",
    version="1.0.0",
    description="Backend API for the Mortgage AI Assistant",
)

#app.include_router(users.router)
app.include_router(users_router)
app.include_router(health_router)
app.include_router(chat_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to the Mortgage AI Assistant Backend"
    }