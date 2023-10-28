import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Load all questions from questions.json
with open("data/questions.json", "r") as f:
    data = json.load(f)
    questions = data['questions'] 

app = FastAPI()

# Route to get all questions for a certain type
@app.get("/questions/{type}")
def get_questions_by_type(type: str):
    filtered_questions = [q for q in questions if q["type"] == type]
    return {"questions": filtered_questions}

# Route to get all types
@app.get("/types")
def get_types():
    types = set(q["type"] for q in questions)
    return {"types": list(types)}

# Handle cors errors and only allow my localhost:3000 to make calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
