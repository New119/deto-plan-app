import streamlit as st

st.title("デートプラン生成アプリ ❤️")
st.write("開発環境の構築に成功しました！")

name = st.text_input("相手の名前を入力してください")
if name:
    st.write(f"{name}さんとのデートプランを考えましょう！")