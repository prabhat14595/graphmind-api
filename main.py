from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import logging
import os
from app.flow import build_chat_graph
from app.state import ChatState
from app.state import GraphState
import logging
from fastapi.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.INFO)

app = FastAPI()
graph = build_chat_graph()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files (React build creates a static folder inside build)
app.mount("/static", StaticFiles(directory="static/static"), name="static")

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "GraphMind AI Chat"}

# Serve React app
@app.get("/")
def serve_react_app():
    return FileResponse("static/index.html")

# Catch-all route for React Router (SPA routing)
@app.get("/{full_path:path}")
def serve_react_app_catchall(full_path: str):
    # Don't intercept API routes
    if full_path.startswith("api/") or full_path.startswith("docs") or full_path.startswith("openapi.json"):
        return {"error": "Not found"}
    return FileResponse("static/index.html")

@app.post("/chat")
def chat(request_data: dict):
    logging.info("Received POST request to /chat")
    
    # Extract user input from the request
    if 'messages' in request_data and len(request_data['messages']) > 0:
        # Get the last message from the frontend
        last_message = request_data['messages'][-1]
        user_input = last_message.get('content', '')
    else:
        return {"error": "No messages found in request"}
    
    # Create state with the user input
    state = ChatState(messages=[{"role": "user", "content": user_input}])
    logging.info(f"Processing message: {user_input}")
    
    # Invoke the graph and get response
    result = graph.invoke(state)
    logging.info("Response generated successfully")
    
    return result

# Health check endpoint for Docker
@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "GraphMind AI Chat"}

# Serve static files (React build)
if os.path.exists("static"):
    app.mount("/static", StaticFiles(directory="static"), name="static")
    
    # Serve React app for all other routes
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        # Serve API routes normally, everything else goes to React
        if full_path.startswith(("chat", "health", "docs", "openapi.json")):
            return {"error": "Not found"}
        
        # Check if it's a static file request
        static_file_path = f"static/{full_path}"
        if os.path.exists(static_file_path) and os.path.isfile(static_file_path):
            return FileResponse(static_file_path)
        
        # Default to index.html for React routing
        return FileResponse("static/index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)