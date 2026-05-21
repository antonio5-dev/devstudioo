/**
 * SCRIPT PRINCIPAL
 * Gerencia funcionalidades básicas do site (menu mobile, etc.)
 */

(function() {
    // Menu Mobile Toggle
    function initMobileMenu() {
        const menuToggle = document.querySelector(".menu-toggle");
        const menu = document.querySelector(".menu");
        
        if (menuToggle && menu) {
            menuToggle.addEventListener("click", () => {
                menu.classList.toggle("active");
            });
        }
    }
    
    // Smooth Scroll para links internos
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener("click", function(e) {
                const targetId = this.getAttribute("href");
                if (targetId === "#") return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                    
                    // Fecha menu mobile após clique
                    const menu = document.querySelector(".menu");
                    if (menu && menu.classList.contains("active")) {
                        menu.classList.remove("active");
                    }
                }
            });
        });
    }
    
    // Fechar menu ao clicar fora (mobile)
    function initCloseMenuOnClickOutside() {
        document.addEventListener("click", function(event) {
            const menu = document.querySelector(".menu");
            const menuToggle = document.querySelector(".menu-toggle");
            
            if (menu && menu.classList.contains("active")) {
                if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
                    menu.classList.remove("active");
                }
            }
        });
    }
    
    // Inicializa tudo
    function init() {
        initMobileMenu();
        initSmoothScroll();
        initCloseMenuOnClickOutside();
        console.log("✅ Script principal inicializado!");
    }
    
    // Aguarda o DOM carregar
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();