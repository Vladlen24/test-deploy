import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from pathlib import Path
from fastapi.responses import FileResponse, JSONResponse
from PIL import Image
from io import BytesIO
import base64

from models import Answers
from handle import calculate_score, text_result


app = FastAPI()

class ImageResponseModel(BaseModel):
    text: str
    image_base64: str


# Mapping result to images
result_images = {
    'result1': ['./img/result1.jpg', text_result[0], "Прямые"],
    'result2': ['./img/result2.jpg', text_result[1], "Арочные"],
    'result3': ['./img/result3.jpg', text_result[2], "Мягко изогнутые"],
    'result4': ['./img/result4.jpg', text_result[3], "Высокие и драматичные"],
    'result5': ['./img/result5.jpg', text_result[4], "Мягко закругленные"],
}

@app.post("/items", response_model=ImageResponseModel)
async def calculate_result(answers: Answers):
    result, color_result = calculate_score(answers)
    image_path = result_images.get(result)[0]
    description = result_images.get(result)[1]
    name = result_images.get(result)[2]
    with open(image_path, "rb") as image_file:
        img = Image.open(image_file)
        img_io = BytesIO()
        img.save(img_io, "JPEG")
        img_io.seek(0)

        img_base64 = base64.b64encode(img_io.read()).decode('utf-8')

    response_data = {
        "name": name,
        "description": description,
        "recomendation": color_result,
        "image_base64": img_base64
    }

    return JSONResponse(content=response_data)


    # return FileResponse(image_path, media_type="image/png")


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