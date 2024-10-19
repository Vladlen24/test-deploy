import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn


app = FastAPI()


class Answers(BaseModel):
    question1: str
    question2: str
    question3: str
    question4: str
    question5: str

# Dummy logic for scoring
def calculate_score(answers: Answers):
    scores = {'result1': 0, 'result2': 0, 'result3': 0, 'result4': 0, 'result5': 0}

    # Simple scoring mechanism based on answer values
    for answer in [answers.question1, answers.question2, answers.question3, answers.question4, answers.question5]:
        if answer == 'option1':
            scores['result1'] += 1
        elif answer == 'option2':
            scores['result2'] += 1
        elif answer == 'option3':
            scores['result3'] += 1

    # Find the result with the highest score
    max_result = max(scores, key=scores.get)
    return max_result

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
    image_url = result_images.get(result, 'https://cdn-icons-png.flaticon.com/512/25/25231.png')
    return {"imageUrl": image_url}

# @app.get("/items")
# def get_items():
#     items = [
#         {
#             "id": 1,
#             "name": "Docker",
#             "img": "https://static-00.iconduck.com/assets.00/docker-icon-2048x2048-5mc7mvtn.png",
#         },
#         {
#             "id": 2,
#             "name": "Nginx",
#             "img": "https://www.svgrepo.com/show/373924/nginx.svg",
#         },
#         {
#             "id": 3,
#             "name": "GitHub",
#             "img": "https://cdn-icons-png.flaticon.com/512/25/25231.png",
#         },
#     ]
#     random.shuffle(items)
#     return items


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