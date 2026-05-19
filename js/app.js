// ==========================================================================
// 1. LÓGICA DA TELA DE LOGIN
// ==========================================================================
const formulario = document.getElementById('loginForm');
const mensagem = document.getElementById('mensagem');

if (formulario) {
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const emailDigitado = document.getElementById('email').value;
        const senhaDigitada = document.getElementById('password').value;

        if (emailDigitado === "admin@teste.com" && senhaDigitada === "1234") {
            mensagem.style.color = "green";
            mensagem.textContent = "Login realizado com sucesso! Redirecionando...";
            
            // 🔥 NOVO: Salva o nome do usuário no localStorage antes de ir para a Home
            localStorage.setItem('usuarioLogado', 'Admin');
            
            // Pequeno atraso para o usuário conseguir ler a mensagem de sucesso
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        } else {
            mensagem.style.color = "red";
            mensagem.textContent = "E-mail ou senha incorretos. Tente novamente.";
        }
    });
}

// ==========================================================================
// 2. LÓGICA DO MODO ESCURO
// ==========================================================================
const botaoTema = document.getElementById('botao-tema');

if (botaoTema) {
    const temaSalvo = localStorage.getItem('tema');
    
    if (temaSalvo) {
        document.documentElement.setAttribute('data-theme', temaSalvo);
        if (temaSalvo === 'dark') {
            botaoTema.textContent = "☀️ Claro";
        }
    }

    botaoTema.addEventListener('click', () => {
        let temaAtual = document.documentElement.getAttribute('data-theme');
        
        if (temaAtual === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            botaoTema.textContent = "🌙 Escuro";
            localStorage.setItem('tema', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            botaoTema.textContent = "☀️ Claro";
            localStorage.setItem('tema', 'dark');
        }
    });
}

// ==========================================================================
// 🔥 3. NOVO: VERIFICAR USUÁRIO LOGADO NO MENU
// ==========================================================================
const linkLogin = document.getElementById('link-login');

if (linkLogin) {
    // Busca se existe algum usuário salvo na memória do navegador
    const usuario = localStorage.getItem('usuarioLogado');

    if (usuario) {
        // Se achou um usuário, troca o link de "Login" por um texto de boas-vindas + botão Sair
        const itemMenu = linkLogin.parentElement; // Pega o <li> que envolve o link
        
        // Substitui o HTML interno do <li> para mostrar a mensagem e um link de Sair
        itemMenu.innerHTML = `
            <span style="color: white; margin-right: 10px;">Olá, ${usuario}!</span>
            <a href="#" id="btn-sair" style="color: #ff4d4d; text-decoration: none; font-size: 14px;">(Sair)</a>
        `;

        // Configura o botão "Sair" para limpar a memória e atualizar a página
        document.getElementById('btn-sair').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('usuarioLogado'); // Apaga o usuário da memória
            window.location.reload(); // Atualiza a página para o menu voltar ao normal
        });
    }
}