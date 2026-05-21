/**
 * CHATBOT MODULE
 * Gerencia todas as funcionalidades do chatbot
 */

const Chatbot = (function() {
    // Configuração do Bot
    const BOT_NAME = "Jonny";
    const BOT_EMOJI = "🤖";
    
    // Palavras-chave e respostas
    const KEYWORDS = {
        site: {
            keywords: ["site", "sites", "website", "pagina", "página", "criar site", "site profissional"],
            response: "Criamos sites modernos, rápidos e responsivos para Empresas e Profissionais. ✨ Confira nosso Portfólio aqui no Site! 😄"
        },
        assistente: {
            keywords: ["assistente", "ia", "chatbot", "bot", "atendente", "virtual", "automatizado"],
            response: "O Assistente Virtual é um Chatbot que funciona no seu Site, atendendo seus clientes 24 horas por dia. Seus clientes poderão tirar dúvidas sobre seus produtos, sempre que quiserem. 🤖 E serão sempre muito bem atendidos!"
        },
        suporte: {
            keywords: ["suporte", "manutenção", "atualização", "ajuda", "problema", "manutencao"],
            response: "Nós damos suporte, manutenção e fazemos atualizações periódicas para manter seu site sempre funcionando. 🔧 Solicite um Orçamento e comece hoje a modernizar o seu Negócio!"
        },
        preco: {
            keywords: ["preço", "valor", "quanto custa", "preco", "orcamento", "orçamento"],
            response: "Nossos preços variam conforme a complexidade do projeto. 💰 Solicite um orçamento pelo formulário de contato e teremos prazer em te atender!"
        },
        prazo: {
            keywords: ["prazo", "tempo", "entrega", "demora", "quanto tempo"],
            response: "O prazo médio de entrega é de 7 a 14 dias úteis, dependendo da complexidade do projeto. ⏱️"
        }
    };
    
    const DEFAULT_RESPONSE = "Obrigado pelo Contato! 😄";
    
    // DOM Elements (inicializados depois)
    let elements = {};
    
    // Função para verificar se o DOM está carregado
    function waitForElements() {
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                elements = {
                    chatbotButton: document.getElementById("chatbot-button"),
                    chatbotContainer: document.getElementById("chatbot-container"),
                    closeChat: document.getElementById("close-chat"),
                    sendChat: document.getElementById("send-chat"),
                    chatInput: document.getElementById("chat-input"),
                    chatMessages: document.getElementById("chatbot-messages")
                };
                
                if (elements.chatbotButton && elements.chatbotContainer) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
        });
    }
    
    // Criar mensagem do usuário
    function createUserMessage(text) {
        const messageDiv = document.createElement("div");
        messageDiv.className = "message-user";
        messageDiv.textContent = text;
        return messageDiv;
    }
    
    // Criar mensagem do bot
    function createBotMessage(text) {
        const messageDiv = document.createElement("div");
        messageDiv.className = "message-bot";
        messageDiv.innerHTML = `${BOT_EMOJI} ${text}`;
        return messageDiv;
    }
    
    // Processar mensagem e retornar resposta
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        for (const [key, data] of Object.entries(KEYWORDS)) {
            for (const keyword of data.keywords) {
                if (lowerMessage.includes(keyword.toLowerCase())) {
                    return data.response;
                }
            }
        }
        
        return DEFAULT_RESPONSE;
    }
    
    // Enviar mensagem
    function sendMessage() {
        const message = elements.chatInput.value.trim();
        
        if (message === "") return;
        
        // Adiciona mensagem do usuário
        elements.chatMessages.appendChild(createUserMessage(message));
        
        // Limpa input
        elements.chatInput.value = "";
        
        // Rola para o final
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
        
        // Simula resposta do bot (delay para parecer natural)
        setTimeout(() => {
            const response = getBotResponse(message);
            const botMessage = createBotMessage(response);
            elements.chatMessages.appendChild(botMessage);
            elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
        }, 500);
    }
    
    // Enviar mensagem ao pressionar Enter
    function handleKeyPress(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    }
    
    // Abrir chat
    function openChat() {
        elements.chatbotContainer.style.display = "flex";
    }
    
    // Fechar chat
    function closeChat() {
        elements.chatbotContainer.style.display = "none";
    }
    
    // Inicializar eventos
    function initEvents() {
        elements.chatbotButton.addEventListener("click", openChat);
        elements.closeChat.addEventListener("click", closeChat);
        elements.sendChat.addEventListener("click", sendMessage);
        elements.chatInput.addEventListener("keypress", handleKeyPress);
    }
    
    // Mensagem de boas-vindas
    function showWelcomeMessage() {
        const welcomeText = `Olá, eu sou o ${BOT_NAME}, Atendente Virtual da VerdeStudio!<br>Me pergunte sobre:<br>
                            <br>• A Criação do seu Site Profissional<br>
                            <br>• Como funciona o Atendimento Virtual no seu Site<br>
                            <br>• Suporte, Manutenção e Atualização de Sites<br>
                            <br>• Preços e Orçamentos<br>
                            <br>• Prazos de Entrega<br>`;
        
        const welcomeMessage = createBotMessage(welcomeText);
        elements.chatMessages.appendChild(welcomeMessage);
    }
    
    // API Pública
    return {
        init: async function() {
            await waitForElements();
            initEvents();
            showWelcomeMessage();
            console.log("✅ Chatbot inicializado com sucesso!");
        }
    };
})();

// Inicializa o chatbot quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
    Chatbot.init();
});