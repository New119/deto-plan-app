import google.generativeai as genai
import os
from dotenv import load_dotenv

# APIキーを読み込む
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    print("APIキーが見つかりません。.envを確認してください")
else:
    genai.configure(api_key=api_key)
    print("=== あなたのAPIキーで使えるモデル一覧 ===")
    try:
        # 使えるモデルを全部表示する
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(m.name)
    except Exception as e:
        print(f"エラーが発生しました: {e}")