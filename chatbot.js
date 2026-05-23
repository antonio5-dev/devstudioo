/**
 * CHATBOT MODULE
 * Gerencia todas as funcionalidades do chatbot
 */

const Chatbot = (function() {
    // Configuração do Bot
    const BOT_NAME = "Sofia";
    const BOT_EMOJI = "🤖";
    
    // Palavras-chave e respostas
    const KEYWORDS = {
        site: {
            keywords: ["fazem site", "criam sites", "fazem website", "criam websites", "desenvolvem websites"],
            response: "Criamos sites modernos, rápidos e responsivos para Empresas e Profissionais. ✨ Confira nosso Portfólio aqui no Site! 😄"
        },
        assistente: {
            keywords: ["o que é um assistente virtual", "o que é um chatbot", "o que é um bot", "o que é um atendente virtual"],
            response: "O Assistente Virtual é um Chatbot que funciona no seu Site, atendendo seus clientes 24 horas por dia. Seus clientes poderão tirar dúvidas sobre seus produtos, sempre que quiserem. 🤖 E serão sempre muito bem atendidos!"
        },
        suporte: {
            keywords: ["dão suporte", "dão manutenção", "fazem atualização", "fazem atualizações", "se der problema", "se precisar manutenção"],
            response: "Nós damos suporte, manutenção e fazemos atualizações periódicas para manter seu site sempre funcionando. Temos diferentes planos de assinatura para atender as demandas do seu Website. 🔧 Solicite um Orçamento e comece hoje a modernizar o seu Negócio!"
        },
        preco: {
            keywords: ["preço", "valor", "quanto custa", "preco", "orcamento", "orçamento"],
            response: "Nossos preços variam conforme a complexidade do projeto. Você pode solicitar um orçamento, basta clicar no botão Solicite um Orçamento, ou clicar em Contato no menu superior. Ao ser direcionado para o foumulário de contato, deixe seu WhastApp ou e-mail, e descreva sua empresa ou seu negócio. Retornaremos prontamente!"
        },
        prazo: {
            keywords: ["qual o prazo", "quanto tempo estar online", "quanto tempo entrega", "quanto demora"],
            response: "O prazo médio de entrega é de 7 a 14 dias úteis, dependendo da complexidade do projeto. ⏱️"
        }
    };
    
    const DEFAULT_RESPONSE = "Obrigada pelo Contato! 😄";
    
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
    
    // Processar mensagem — FAQ primeiro, IA como fallback
    async function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // 1. Tenta responder pelo FAQ
        for (const [key, data] of Object.entries(KEYWORDS)) {
            for (const keyword of data.keywords) {
                if (lowerMessage.includes(keyword.toLowerCase())) {
                    return data.response;
                }
            }
        }
        
        // 2. Se não encontrou no FAQ, chama a IA
        try {
            const response = await fetch("https://devstudioo.onrender.com/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: message })
            });
            const data = await response.json();
            return data.reply;
        } catch (error) {
            return "Desculpe, estou com dificuldades técnicas. Deixe uma mensagem no Formulário de Contato e responderemos prontamente! 😊";
        }
    }
    
    // Enviar mensagem
    async function sendMessage() {
        const message = elements.chatInput.value.trim();
        
        if (message === "") return;
        
        // Adiciona mensagem do usuário
        elements.chatMessages.appendChild(createUserMessage(message));
        
        // Limpa input
        elements.chatInput.value = "";
        
        // Rola para o final
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;

        // Mostra "digitando..." enquanto aguarda resposta
        const typing = createBotMessage("digitando...");
        elements.chatMessages.appendChild(typing);
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;

        const response = await getBotResponse(message);

        elements.chatMessages.removeChild(typing);
        elements.chatMessages.appendChild(createBotMessage(response));
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
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
        const welcomeText = `Olá, eu sou a ${BOT_NAME}, Atendente Virtual da VerdeStudio!<br>Me pergunte sobre:<br>
                            <br>• A Criação do seu Website Profissional<br>
                            <br>• Como funciona o Atendimento Virtual no seu Website<br>
                            <br>• Suporte, Manutenção e Atualização do seu Websites<br>
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