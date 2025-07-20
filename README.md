# 🤖 GraphMind API – AI Chat with LangGraph + FastAPI

An open-source beginner-friendly AI chat project using **LangGraph**, **FastAPI**, and **OpenRouter (free GPT/OpenAI alternatives)**.

![GraphMind Banner](assets/banner.png)

---

## 🚀 Features

- 🌐 Built with **FastAPI** – Fast, simple web API
- 🧠 Uses **LangGraph** – Graph-based LLM orchestration
- 🔑 Uses `.env` for API keys securely
- 🔌 Plug-and-play OpenRouter model support
- 🗂️ Beginner-friendly project structure
- ⚡ Async-ready, production-extensible
- 📄 Swagger docs available at `/docs`

---

## 🗂️ Project Structure

```
graphmind-api/
│
├── app/
│   ├── flow.py        # LangGraph state graph setup
│   ├── nodes.py       # LLM + Response generation logic
│   ├── state.py       # Pydantic state definition
│
├── main.py            # FastAPI app entry point
├── .env               # 🔐 API keys and secrets (not committed)
├── .gitignore         # Git ignored files
├── requirements.txt   # Python dependencies
└── README.md          # You’re here
```

---

## 🧩 Prerequisites

- Python 3.10 or above
- pip
- Optional: Virtualenv

---

## ⚙️ Setup Instructions

### 1. Clone the project
```bash
git clone https://github.com/your-username/graphmind-api.git
cd graphmind-api
```

### 2. Create a virtual environment
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Create `.env` file
```env
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## ▶️ Run the Project

```bash
uvicorn main:app --reload --port 8011
```

Visit 👉 http://127.0.0.1:8011/docs to try out the `/chat` API!

---

## 🧪 Example API Usage

**Endpoint**:
```http
POST /chat?user_input=hello
```

**Response**:
```json
{
  "response": "Hi! How can I assist you today?"
}
```

---

## 📸 Screenshots

### 🔹 Swagger UI (`/docs`)
![Swagger UI Screenshot](assets/swagger-ui.png)

### 🔹 Terminal Output
![Terminal Screenshot](assets/terminal.png)

---

## 💬 Supported Models via OpenRouter

You can use any of the free or cheap models:
- `deepseek/deepseek-r1-0528:free` ✅ (Free!)
- `google/gemini-pro`
- `openai/gpt-3.5-turbo`
- And many more from https://openrouter.ai/models

---

## 👥 Contributing

Contributions welcome! Open issues, suggest features, or send pull requests.

---

## 📄 License

MIT License © 2025 [Your Name]

---

## 🙏 Acknowledgements

- [LangGraph](https://github.com/langchain-ai/langgraph)
- [FastAPI](https://fastapi.tiangolo.com)
- [OpenRouter](https://openrouter.ai)
- [LangChain](https://github.com/langchain-ai/langchain)

---

🧠 *“From zero to graph-based AI with LangGraph. Let’s build!”*