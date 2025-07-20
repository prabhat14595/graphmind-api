
from langgraph.graph import StateGraph
from app.state import ChatState
from app.nodes import generate_response

def build_chat_graph():
    # Create a LangGraph state machine
    builder = StateGraph(ChatState)

    # Add nodes
    builder.add_node("chat", generate_response)

    # Define edges
    builder.set_entry_point("chat")
    builder.set_finish_point("chat")

    # Build the graph
    graph = builder.compile()
    return graph