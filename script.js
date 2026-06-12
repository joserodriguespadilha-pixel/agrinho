// script.js
// Menu Mobile Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scroll para todos os links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Simulador de Impacto
    const simulateBtn = document.getElementById('simulateBtn');
    const impactResult = document.getElementById('impactResult');
    
    if (simulateBtn) {
        simulateBtn.addEventListener('click', function() {
            const hectares = Math.floor(Math.random() * (300 - 20 + 1) + 20);
            const arvoresPreservadas = hectares * 75;
            const carbonoReduzido = (hectares * 2.8).toFixed(1);
            
            impactResult.innerHTML = `
                <i class="fas fa-chart-line"></i> 
                Com práticas sustentáveis em ${hectares} hectares:<br>
                🌳 ${arvoresPreservadas} árvores preservadas/restauradas<br>
                🌍 ${carbonoReduzido} toneladas de CO₂ equivalentes reduzidas<br>
                💧 Até ${Math.round(hectares * 1.2)} mil m³ de água economizados por ano
            `;
            impactResult.style.animation = 'fadeIn 0.5s ease';
        });
    }
    
    // Newsletter Form
    const form = document.getElementById('newsletterForm');
    const feedback = document.getElementById('formFeedback');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            
            if (name === '' || email === '') {
                showFeedback('❌ Preencha todos os campos para continuar.', 'error');
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                showFeedback('📧 Digite um e-mail válido.', 'error');
                return;
            }
            
            // Sucesso
            showFeedback(`✅ Obrigado(a), ${name}! Você receberá conteúdos exclusivos do Agrinho 2026. 🌱`, 'success');
            form.reset();
            
            setTimeout(() => {
                feedback.innerHTML = '';
            }, 5000);
        });
    }
    
    function showFeedback(message, type) {
        feedback.innerHTML = message;
        feedback.style.color = type === 'error' ? '#c0392b' : '#2C6E2F';
        feedback.style.fontWeight = '500';
    }
    
    // Adicionar animação nos cards (observação visual)
    const cards = document.querySelectorAll('.card, .practice-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            console.log(`Explorando prática sustentável: ${card.querySelector('h3')?.innerText || 'Agro'}`);
        });
    });
    
    // Animação de entrada suave para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card, .practice-card, .timeline-item, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Estilo adicional para animação no simulador
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .impact-result {
        animation: fadeIn 0.3s ease;
    }
`;
document.head.appendChild(style);
