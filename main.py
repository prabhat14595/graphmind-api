from fastapi import FastAPI
from app.flow import build_chat_graph
from app.state import ChatState
from app.state import GraphState

app = FastAPI()
graph = build_chat_graph()

@app.get("/")
def root():
    return {"message": "LangGraph Chat App is running!"}

@app.get("/chat")
def chat(user_input: str):
    state = ChatState(messages=[{"role": "user", "content": user_input}])  # ✅ FIX HERE
    result = graph.invoke(state)
    return result