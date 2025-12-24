import streamlit as st
import google.generativeai as genai
import os
from dotenv import load_dotenv

# 1. 環境変数（APIキー）を読み込む
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

# APIキーがあるかチェック
if not api_key:
    st.error("APIキーが見つかりません。.envファイルを確認してください。")
    st.stop()

# Google Geminiの設定
genai.configure(api_key=api_key)
# 無料枠で使える高速モデル「Gemini 1.5 Flash」を使用
model = genai.GenerativeModel('gemini-1.5-flash')

# 2. アプリの画面（UI）を作る
st.title("AIデートプランナー 💘 (Gemini版)")
st.write("相手の情報を入力すると、最高のデートプランを無料で提案します！")

# 入力フォーム
with st.form("date_form"):
    col1, col2 = st.columns(2)
    with col1:
        name = st.text_input("相手の名前")
        gender = st.selectbox("相手の性別", ["男性", "女性", "その他"])
    
    with col2:
        mbti = st.selectbox("相手のMBTI（性格タイプ）", [
            "INTJ (建築家)", "INTP (論理学者)", "ENTJ (指揮官)", "ENTP (討論者)",
            "INFJ (提唱者)", "INFP (仲介者)", "ENFJ (主人公)", "ENFP (広報運動家)",
            "ISTJ (管理者)", "ISFJ (擁護者)", "ESTJ (幹部)", "ESFJ (領事官)",
            "ISTP (巨匠)", "ISFP (冒険家)", "ESTP (起業家)", "ESFP (エンターテイナー)"
        ])
        budget = st.selectbox("予算感", ["0円 (節約)", "3,000円以内", "5,000円〜1万円", "1万円以上 (リッチ)"])

    submitted = st.form_submit_button("デートプランを考える！")

# 3. ボタンが押されたらAIにリクエストする
if submitted and name:
    # AIへの命令文
    prompt = f"""
    あなたはプロのデートコンサルタントです。
    以下の相手とのデートプランを具体的に1つ提案してください。
    タイムスケジュール形式で、会話のネタや、そのMBTIタイプへの接し方のアドバイスも含めてください。

    【相手の情報】
    - 名前: {name}
    - 性別: {gender}
    - MBTI: {mbti}
    - 予算: {budget}
    """

    with st.spinner("Geminiが思考中..."):
        try:
            # Geminiに生成を依頼
            response = model.generate_content(prompt)
            
            st.success(f"{name}さんとのデートプランが完成しました！")
            # 結果を表示
            st.markdown(response.text)
            
        except Exception as e:
            st.error(f"エラーが発生しました: {e}")

elif submitted and not name:
    st.warning("相手の名前を入力してください！")