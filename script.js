const chatbotButton = document.getElementById("chatbot-button");
const chatbotContainer = document.getElementById("chatbot-container");
const closeChat = document.getElementById("close-chat");

chatbotButton.addEventListener("click", () => {
    chatbotContainer.style.display = "flex";
});

closeChat.addEventListener("click", () => {
    chatbotContainer.style.display = "none";
});

const sendChat = document.getElementById("send-chat");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chatbot-messages");

sendChat.addEventListener("click", () => {

    const mensagem = chatInput.value;

    if (mensagem === "") {
        return;
    }

    // mensagem do usuário
    const novaMensagem = document.createElement("div");

    novaMensagem.textContent = mensagem;

    novaMensagem.style.background = "#216c3b";
    novaMensagem.style.color = "white";
    novaMensagem.style.padding = "10px";
    novaMensagem.style.marginBottom = "10px";
    novaMensagem.style.borderRadius = "10px";
    novaMensagem.style.width = "fit-content";
    novaMensagem.style.marginLeft = "auto";

    chatMessages.appendChild(novaMensagem);

    // limpa input
    chatInput.value = "";

    // resposta automática fake
    setTimeout(() => {

        const respostaBot = document.createElement("div");

        let resposta = "";

if (
    mensagem.toLowerCase().includes("site") ||
    mensagem.toLowerCase().includes("sites")
) {

    resposta =
    "Criamos sites modernos, rápidos e responsivos para empresas e profissionais que querem atrair mais clientes 😄";

}

else if (
    mensagem.toLowerCase().includes("chatbot") ||
    mensagem.toLowerCase().includes("ia")
) {

    resposta =
    "Também desenvolvemos chatbots integrados ao site para atendimento automático e geração de clientes 🤖";

}

else if (
    mensagem.toLowerCase().includes("suporte") ||
    mensagem.toLowerCase().includes("manutenção")
) {

    resposta =
    "Oferecemos suporte, manutenção e atualizações contínuas para manter seu site sempre funcionando 🚀";

}

else {

    resposta =
    "Olá 😄 Podemos ajudar com sites profissionais, chatbots com IA e suporte técnico.";

}

respostaBot.textContent = resposta;

        respostaBot.style.background = "black";
        respostaBot.style.padding = "10px";
        respostaBot.style.marginBottom = "10px";
        respostaBot.style.borderRadius = "10px";
        respostaBot.style.width = "fit-content";

        chatMessages.appendChild(respostaBot);

    }, 500);

});