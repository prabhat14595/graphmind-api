from typing import TypedDict, Optional, List, Dict
from pydantic import BaseModel

class ChatState(BaseModel):
    messages: List[Dict[str, str]]  # Keeps track of chat history

    @staticmethod
    def init(user_input: str):
        return ChatState(messages=[{"role": "user", "content": user_input}])