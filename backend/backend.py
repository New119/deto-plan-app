from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://ai-date-maker.vercel.app","https://deto-plan-app.vercel.app",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ★「自分」の情報を削除しました
class DateRequest(BaseModel):
    relationship: str
    age_group: str
    gender: str
    mbti: str      # 相手のみ
    love_type: str # 相手のみ
    start_time: str
    budget: str
    location: str

@app.post("/generate_plan")
async def generate_plan(request: DateRequest):
    try:
        model = genai.GenerativeModel("gemini-2.5-flash")

        # ★プロンプトを「相手のためのプラン」に特化
        prompt = f"""
        あなたはプロのデートプランナーです。
        以下の相手の性格（MBTIとLove Type 16）を分析し、相手が「最高！」と感動するデートプランを作成してください。

        【相手のプロフィール】
        - 性格(MBTI): {request.mbti}
        - 恋愛タイプ(Love Type): {request.love_type}
        - 属性: {request.gender}, {request.age_group}
        - あなたとの関係: {request.relationship}
        
        【条件】
        - 開始時間: {request.start_time}
        - 場所: {request.location}
        - 予算: {request.budget}

        【指示】
        1. 相手のLove Type（リードされたい？したい？等）とMBTI（計画的？直感的？等）の特性を深く分析してください。
        2. その性格にドンピシャで刺さるプランにしてください。

        【出力形式】
        (マークダウン形式)

        ## 🎯 相手の性格攻略ポイント
        (MBTIとLove Typeから見た、相手の恋愛傾向と、今日気をつけるべきこと)

        ## 📅 デートプランのテーマ
        「(キャッチーなタイトル)」

        ## 🕒 タイムスケジュール
        - **HH:MM** (場所・行動)
          > (なぜこの相手にここが良いのかの理由)
        
        ... (最後まで)

        ## 💡 接し方のアドバイス
        - (相手が喜ぶ具体的なセリフや行動)
        """

        response = model.generate_content(prompt)
        return {"status": "success", "plan": response.text}

    except Exception as e:
        print(f"エラー発生: {e}")
        return {"status": "error", "message": str(e)}