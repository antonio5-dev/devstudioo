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
    "Criamos sites modernos, rápidos e responsivos para empresas e profissionais que querem ter mais presença Online. 😄";

}

else if (
    mensagem.toLowerCase().includes("assistente") ||
    mensagem.toLowerCase().includes("ia")
) {

    resposta =
    "O Assitente Virtual é um Chatbot que funciona no seu Site, atendendo seus clientes 24 horas por dia. 🤖";

}

else if (
    mensagem.toLowerCase().includes("suporte") ||
    mensagem.toLowerCase().includes("manutenção")
) {

    resposta =
    "Nós damos suporte, manutenção e fazemos atualizações periódicas para manter seu site sempre funcionando. 🚀";

}

else {

    resposta =
    "Obrigado pelo Contato! 😄";

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

const menuToggle = document.querySelector(".menu-toggle");

const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {

  menu.classList.toggle("active");

});