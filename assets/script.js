const games = [
    { 
        id: "slope", 
        title: "Slope", 
        description: "The ultimate 3D speed run game.", 
        icon: "thumbnail.jpg"
    },
    { 
        id: "eaglercraft-1.12.2", 
        title: "Minecraft 1.12.2 (Recommended)", 
        description: "1.12, the release of the World of Color Update, released on June 7, 2017.", 
        icon: "thumbnail.png"
    },
    { 
        id: "eaglercraft-1.12.2-wasm", 
        title: "Minecraft 1.12.2 (WASM-GC) (Experimental)", 
        description: "1.12, the release of the World of Color Update, released on June 7, 2017.", 
        icon: "thumbnail.jpg"
    },
    { 
        id: "eaglercraftx-1.8.8", 
        title: "Minecraft 1.8.8 (Recommended)", 
        description: "1.8, the release of the Bountiful Update released on September 2, 2014.", 
        icon: "thumbnail.png"
    },
    { 
        id: "eaglercraftx-1.8.8-wasm", 
        title: "Minecraft 1.8.8 (WASM-GC) (Experimental)", 
        description: "1.8, the release of the Bountiful Update released on September 2, 2014.", 
        icon: "thumbnail.png"
    },
    { 
        id: "eaglercraft-1.5.2", 
        title: "Minecraft 1.5.2", 
        description: "1.5, the release of the Redstone Update, released on March 13, 2013.", 
        icon: "thumbnail.png"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });

    const yearSpan = document.getElementById('year');
    if(yearSpan) yearSpan.innerText = new Date().getFullYear();

    if (window.location.pathname.includes('play')) {
        loadGame();
    } else {
        renderGameGrid(games);
        setupSearch();
    }
});

function renderGameGrid(list) {
    const grid = document.getElementById('game-grid');
    if(!grid) return;
    grid.innerHTML = '';

    list.forEach((game, index) => {
        const card = document.createElement('a');
        card.href = `play?game=${game.id}`;
        card.className = 'game-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', index * 50);

        const isImage = /\.(png|jpg|jpeg|gif|webp)$/i.test(game.icon);
        let mediaHtml = isImage 
            ? `<img src="games/${game.id}/${game.icon}" alt="${game.title}" class="card-img" loading="lazy">` 
            : `<div class="card-emoji">${game.icon}</div>`;

        card.innerHTML = `
            <div class="card-media-wrapper">${mediaHtml}</div>
            <div class="card-content">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

function setupSearch() {
    const input = document.getElementById('search-input');
    if(!input) return;
    input.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase();
        renderGameGrid(games.filter(g => g.title.toLowerCase().includes(term)));
    });
}

function loadGame() {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get('game');
    const gameData = games.find(g => g.id === gameId);
    
    if (gameData) {
        const gamePath = `games/${gameId}/index.html`;

        const pageTitle = `Playing ${gameData.title} | Nebula`;
        document.title = pageTitle;
        document.getElementById('game-title').innerText = gameData.title;
        document.getElementById('game-frame').src = gamePath;

        const rawBtn = document.getElementById('raw-btn');
        if(rawBtn) rawBtn.href = gamePath;

        updateSEOTags(gameData);

        fetch(`games/${gameId}/description.txt`)
            .then(res => {
                if(!res.ok) throw new Error("No description.txt");
                return res.text();
            })
            .then(text => parseAndDisplayDetails(text))
            .catch(err => {
                document.getElementById('game-details-section').style.display = 'none';
            });

    } else {
        window.location.href = '/';
    }
}

function updateSEOTags(game) {
    const currentUrl = window.location.href;
    const imageUrl = /\.(png|jpg|jpeg|gif|webp)$/i.test(game.icon) 
        ? `${window.location.origin}/games/${game.id}/${game.icon}`
        : `${window.location.origin}/assets/og-image.jpg`;

    let linkTag = document.querySelector("link[rel='canonical']");
    if (!linkTag) {
        linkTag = document.createElement('link');
        linkTag.setAttribute('rel', 'canonical');
        document.head.appendChild(linkTag);
    }
    linkTag.setAttribute('href', currentUrl);

    document.querySelector('meta[name="description"]').setAttribute("content", `Play ${game.title} unblocked. ${game.description}`);

    document.querySelector('meta[property="og:title"]').setAttribute("content", game.title);
    document.querySelector('meta[property="og:description"]').setAttribute("content", game.description);
    document.querySelector('meta[property="og:url"]').setAttribute("content", currentUrl);
    document.querySelector('meta[property="og:image"]').setAttribute("content", imageUrl);

    document.querySelector('meta[property="twitter:title"]').setAttribute("content", game.title);
    document.querySelector('meta[property="twitter:description"]').setAttribute("content", game.description);
    document.querySelector('meta[property="twitter:image"]').setAttribute("content", imageUrl);
    document.querySelector('meta[property="twitter:url"]').setAttribute("content", currentUrl);
}

function parseAndDisplayDetails(text) {
    const container = document.getElementById('game-details-section');
    container.style.display = 'grid';

    const sections = { description: "", controls: "", seo: "" };
    let currentSection = null;

    text.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        
        if (trimmed.startsWith('#')) {
            const header = trimmed.replace('#', '').trim().toLowerCase();
            if (header.includes('description')) currentSection = 'description';
            else if (header.includes('control')) currentSection = 'controls';
            else if (header.includes('hidden') || header.includes('seo')) currentSection = 'seo';
            else currentSection = null;
        } 
        else if (currentSection) {
            sections[currentSection] += line + "\n";
        }
    });

    document.getElementById('desc-content').innerText = sections.description.trim() || "No description available.";
    document.getElementById('controls-content').innerText = sections.controls.trim() || "No controls listed.";

    if (sections.seo.trim()) {
        const seoText = sections.seo.trim();
        
        document.getElementById('seo-content').innerText = seoText;
        
        const metaTag = document.querySelector('meta[name="keywords"]');
        if(metaTag) {
            const existing = metaTag.getAttribute('content');
            const newKeywords = seoText.replace(/\n/g, ', ');
            metaTag.setAttribute('content', `${existing}, ${newKeywords}`);
        }
    }
}

function toggleFullscreen() {
    const elem = document.getElementById("game-frame");
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}