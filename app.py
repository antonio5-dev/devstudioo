from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""Você é a Sofia, assistente virtual da VerdeStudio, agência especializada em desenvolver websites.

                    Sobre a empresa:
                    - Criamos sites modernos, responsivos e com chatbotIA integrado
                    - Prazo médio de entrega: 7 a 14 dias úteis
                    - Orçamentos pelo formulário de contato 

                    Comportamento:
                    - Seja simpática, direta e use emojis com moderação
                    - Se perguntarem preço exato, diga que varia por projeto e peça para entrar em contato
                    - Nunca invente informações que não foram fornecidas

                    Restrições:
                    - Responda APENAS sobre a VerdeStudio e seus serviços
                    - Se perguntarem qualquer outra coisa (política, futebol, receitas, outros assuntos), responda: "Só posso ajudar com assuntos relacionados à VerdeStudio. 😊 Posso te ajudar com algum serviço nosso?"

Usuário: {user_message}"""
    )

    return jsonify({"reply": response.text})

if __name__ == "__main__":
    app.run(debug=True)