from langchain.schema import HumanMessage, AIMessage
from app.state import ChatState
from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv

load_dotenv()  # Loads .env into environme

# llm = ChatOpenAI(
#     # deepseek/deepseek-chat-v3-0324:free
#     model_name="deepseek/deepseek-chat-v3-0324:free",  # Using free DeepSeek V3 model
#     base_url="https://openrouter.ai/api/v1",
#     openai_api_key=os.getenv("OPENROUTER_API_KEY"), #create a .env file with this key
#     max_tokens=2000  # Reduced for regular chat responses
#     ) 


llm = ChatOpenAI(
    # Using Groq's Llama3-70B model

    model_name="llama3-70b-8192",
    base_url="https://api.groq.com/openai/v1",
    openai_api_key=os.getenv("GROQ_API_KEY"), # Need GROQ_API_KEY in .env file
    max_tokens=2000  # Reduced for regular chat responses
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
