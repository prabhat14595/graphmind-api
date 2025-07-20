from langchain.schema import HumanMessage, AIMessage
from app.state import ChatState
from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv

load_dotenv()  # Loads .env into environme

llm = ChatOpenAI(
    model_name="deepseek/deepseek-r1-0528:free",
    base_url="https://openrouter.ai/api/v1",
    openai_api_key=os.getenv("OPENROUTER_API_KEY"), #create a .env file with this key
    max_tokens=5500  # Prevents exceeding token budget
    ) 

def convert_messages(dict_messages):
    """Convert list of dicts to LangChain BaseMessage objects."""
    converted = []
    for m in dict_messages:
        role = m["role"]
        content = m["content"]
        if role == "user":
            converted.append(HumanMessage(content=content))
        elif role == "assistant":
            converted.append(AIMessage(content=content))
        else:
            raise ValueError(f"Unknown role: {role}")
    return converted

def generate_response(state: ChatState) -> ChatState:
    messages = convert_messages(state.messages)
    response = llm.invoke(messages)
    state.messages.append({"role": "assistant", "content": response.content})
    return state
