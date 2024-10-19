from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from models import SurveyData
from handler import process_survey
 
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/submit")
async def submit_form(name: str = Form(...), email: str = Form(...)):
    # Обрабатываем данные формы
    return HTMLResponse(f"<h2>Спасибо, {name}! Ваш email: {email}</h2>")