from fastapi import FastAPI
from app.flow import build_chat_graph
from app.state import ChatState

app = FastAPI()
graph = build_chat_graph()

@app.get("/")
def root():
    return {"message": "LangGraph Chat App is running!"}

@app.post("/chat")
def chat(user_input: str):
    state = ChatState.init(user_input)
    final_state_dict = graph.invoke(state)
    final_state = ChatState.model_validate(final_state_dict)  # safely convert back
    return {"response": final_state.messages[-1]["content"]}