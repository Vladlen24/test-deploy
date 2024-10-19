import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from models import Answers
from handle import calculate_score


app = FastAPI()


# Mapping result to images
result_images = {
    'result1': 'https://static-00.iconduck.com/assets.00/docker-icon-2048x2048-5mc7mvtn.png',
    'result2': 'https://www.svgrepo.com/show/373924/nginx.svg',
    'result3': 'https://static-00.iconduck.com/assets.00/docker-icon-2048x2048-5mc7mvtn.png',
    'result4': 'https://www.svgrepo.com/show/373924/nginx.svg',
    'result5': 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
}

@app.post("/items")
async def calculate_result(answers: Answers):
    result = calculate_score(answers)
    image_url = result_images.get(result)
    return {"imageUrl": image_url}


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://46.148.229.184",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)