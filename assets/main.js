let currentCategory = 'all';
let panicKey = localStorage.getItem('nebula_panic_key') || null;
let isRecordingKey = false;
let stealthTimer;
const TIMEOUT_MS = 8000;

document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 678, once: true, easing: 'ease-out-cubic' });

    const yearSpan = document.getElementById('year');
    if(yearSpan) yearSpan.innerText = new Date().getFullYear();

    if (window.location.pathname.includes('/play')) {
        loadGame();
    } else {
        setupSecretTrigger();
        sortLibrary(library);

        filterCategory('all');
        setupSearch();

        if (document.getElementById('key-display')) updateKeyDisplay();
    }
});

function filterCategory(cat) {
    currentCategory = cat;

    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => {
        if (btn.innerText.toLowerCase().includes(cat) || (cat === 'all' && btn.innerText.includes('All'))) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (cat === 'all') {
        renderGameGrid(library);
    } else {
        const filtered = library.filter(item => item.category === cat);
        renderGameGrid(filtered);
    }
}

function setupSearch() {
    const input = document.getElementById('search-input');
    if(!input) return;
    
    input.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase();
        
        if (term === '') {
            filterCategory(currentCategory);
            return;
        }

        const allGames = flattenLibrary(library);
        const filtered = allGames.filter(g => g.title.toLowerCase().includes(term));
        renderGameGrid(filtered);
    });
}

function setupSecretTrigger() {
    const logo = document.getElementById('secret-logo');
    if(!logo) return;

    let clickCount = 0;
    let clickResetTimer;

    logo.addEventListener('click', (e) => {
        e.preventDefault(); 

        if (document.getElementById('game-view').style.display === 'block' || 
            document.getElementById('settings-view').style.display === 'block') {
            switchToGames();
            return;
        }

        clickCount++;
        clearTimeout(clickResetTimer);
        clickResetTimer = setTimeout(() => { clickCount = 0; }, 1000);

        if (clickCount >= 3) {
            switchToGames();

            const navLinks = document.getElementById('nav-links');
            navLinks.innerHTML = `
                <a href="https://discord.gg/mUDUdhsauv" target="_blank"><i class="fa-brands fa-discord"></i> Discord</a>
                <a href="https://github.com/tracerip/nebula" target="_blank"><i class="fa-brands fa-github"></i> GitHub</a>
                <a href="#" onclick="switchToSettings(); return false;"><i class="fa-solid fa-gear"></i> Settings</a>
            `;

            initStealthMode();
        }
    });
}

function switchToGames() {
    document.getElementById('edu-view').style.display = 'none';
    document.getElementById('settings-view').style.display = 'none';
    document.getElementById('game-view').style.display = 'block';
    setTimeout(() => AOS.refresh(), 100);
    
    document.title = isChromebook ? "Nebula | Educational Resources" : "Nebula | Simulations Active";
}

function switchToSettings() {
    document.getElementById('game-view').style.display = 'none';
    document.getElementById('settings-view').style.display = 'block';
    setTimeout(() => AOS.refresh(), 100);
}

function initStealthMode() {
    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    activityEvents.forEach(evt => window.addEventListener(evt, resetStealthTimer));
    resetStealthTimer();
}

function resetStealthTimer() {
    clearTimeout(stealthTimer);
    stealthTimer = setTimeout(lockdownSystem, TIMEOUT_MS);
}

function lockdownSystem() {
    document.getElementById('game-view').style.display = 'none';
    document.getElementById('settings-view').style.display = 'none';
    document.getElementById('edu-view').style.display = 'block';
    
    const navLinks = document.getElementById('nav-links');
    if(navLinks) {
        navLinks.innerHTML = `<a href="#">Articles</a><a href="#">Research</a><a href="#">About</a>`;
    }
    document.title = "Nebula | Astronomy Learning Resources";
    
    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    activityEvents.forEach(evt => window.removeEventListener(evt, resetStealthTimer));
}

function openCloak() {
    const win = window.open('about:blank', '_blank');
    if (!win) { alert("Popup blocked!"); return; }
    
    const iframe = win.document.createElement('iframe');
    iframe.src = window.location.href;
    iframe.style.width = '100vw';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    iframe.style.margin = '0';
    
    win.document.open();
    win.document.write('<!DOCTYPE html><html><head><title>Google</title><link rel="icon" href="https://google.com/favicon.ico"><style>body{margin:0;overflow:hidden}</style></head><body></body></html>');
    win.document.body.appendChild(iframe);
    win.document.close();
}

function loadGame() {
    const params = new URLSearchParams(window.location.search);
    const gameParam = params.get('game');
    const videoParam = params.get('video');
    let targetId = null;

    if (isChromebook) {
        if (gameParam) {
            const newUrl = new URL(window.location);
            newUrl.searchParams.delete('game');
            newUrl.searchParams.set('video', gameParam);
            window.history.replaceState({}, '', newUrl);
            targetId = gameParam;
        } else if (videoParam) targetId = videoParam;
    } else {
        if (videoParam) { window.location.href = '/'; return; }
        else if (gameParam) targetId = gameParam;
    }

    if (!targetId) { window.location.href = '/'; return; }

    const allGames = flattenLibrary(library);
    const gameData = allGames.find(g => g.id === targetId);
    
    if (gameData) {
        const gamePath = `games/${targetId}/index.html`;

        document.title = isChromebook 
            ? `Playing ${spaceWords[Math.floor(Math.random()*spaceWords.length)]} Video` 
            : `Play ${gameData.title} | Nebula`;

        document.getElementById('game-title').innerText = gameData.title;
        document.getElementById('game-frame').src = gamePath;

        const rawBtn = document.getElementById('raw-btn');
        if(rawBtn) rawBtn.href = gamePath;
        if (window.self !== window.top) {
            rawBtn.onclick = (e) => { e.preventDefault(); openCloak(rawBtn.href); };
        }

        const creatorBtn = document.getElementById('creator-btn');
        if (gameData.creator) {
            creatorBtn.style.display = 'inline-flex';
            creatorBtn.href = gameData.creator.link;
            document.getElementById('creator-name').innerText = gameData.creator.name;
            document.getElementById('creator-icon').className = gameData.creator.icon;
        } else {
            creatorBtn.style.display = 'none';
        }

        updateSEOTags(gameData);
        fetch(`games/${targetId}/description.txt`)
            .then(res => res.text())
            .then(text => parseAndDisplayDetails(text))
            .catch(err => document.getElementById('game-details-section').style.display = 'none');
    } else {
        window.location.href = '/'; 
    }
}

function updateSEOTags(game) {
    const masterDomain = "https://trylearning.space";
    const canonicalUrl = masterDomain + window.location.pathname + window.location.search;

    let linkTag = document.querySelector("link[rel='canonical']");
    if (!linkTag) {
        linkTag = document.createElement('link');
        linkTag.setAttribute('rel', 'canonical');
        document.head.appendChild(linkTag);
    }
    
    linkTag.setAttribute('href', canonicalUrl);

    if (isChromebook) return;

    const imageUrl = /\.(png|jpg|jpeg|gif|webp)$/i.test(game.icon) 
        ? `${window.location.origin}/games/${game.id}/${game.icon}`
        : `${window.location.origin}/assets/og-image.jpg`;

    const cleanDesc = stripMarkdown(game.description);

    document.querySelector('meta[name="description"]').setAttribute("content", `Play ${game.title} unblocked for free without needing to download. ${cleanDesc}`);
    
    document.querySelector('meta[property="og:title"]').setAttribute("content", game.title);
    document.querySelector('meta[property="og:description"]').setAttribute("content", `Play ${game.title} unblocked for free without needing to download. ${cleanDesc}`);
    document.querySelector('meta[property="og:url"]').setAttribute("content", canonicalUrl);
    document.querySelector('meta[property="og:image"]').setAttribute("content", imageUrl);
    
    document.querySelector('meta[property="twitter:title"]').setAttribute("content", game.title);
    document.querySelector('meta[property="twitter:description"]').setAttribute("content", `Play ${game.title} unblocked for free without needing to download. ${cleanDesc}`);
    document.querySelector('meta[property="twitter:image"]').setAttribute("content", imageUrl);
    document.querySelector('meta[property="twitter:url"]').setAttribute("content", canonicalUrl);
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
        } else if (currentSection) {
            sections[currentSection] += line + "\n";
        }
    });

    const rawDesc = sections.description.trim() || "No description available.";
    document.getElementById('desc-content').innerHTML = parseMarkdown(rawDesc);

    const rawControls = sections.controls.trim() || "No controls listed.";
    document.getElementById('controls-content').innerHTML = parseMarkdown(rawControls);

    if (sections.seo.trim()) {
        const seoText = sections.seo.trim();
        
        document.getElementById('seo-content').innerText = seoText;
        
        const metaTag = document.querySelector('meta[name="keywords"]');
        if(metaTag) {
            if (isChromebook) {
                return; 
            }

            let currentKeywords = metaTag.getAttribute('content');

            currentKeywords = currentKeywords
                .replace(/education|astronomy|physics/gi, "") 
                .replace(/,\s*,/g, ",") 
                .replace(/^,\s*|,\s*$/g, "") 
                .trim();
            
            const separator = currentKeywords.length > 0 ? ', ' : '';
            metaTag.setAttribute('content', `${currentKeywords}${separator}${seoText.replace(/\n/g, ', ')}`);
        }
    }
}

function startKeyRecording() {
    isRecordingKey = true;
    const btn = document.getElementById('record-btn');
    btn.innerText = "Press any key...";
    btn.style.borderColor = "#fbbf24";
    btn.style.color = "#fbbf24";
}

function clearPanicKey() {
    panicKey = null;
    localStorage.removeItem('nebula_panic_key');
    updateKeyDisplay();
}

function updateKeyDisplay() {
    const disp = document.getElementById('key-display');
    const btn = document.getElementById('record-btn');
    
    if (disp) {
        disp.innerText = panicKey ? panicKey.toUpperCase() : "NONE";
    }
    
    if (btn) {
        btn.innerText = panicKey ? "Change Key" : "Set Keybind";
        btn.style.borderColor = "";
        btn.style.color = "";
    }
}

function executePanic() {
    window.location.replace("https://docs.google.com/");
}

window.addEventListener('keydown', (e) => {
    if (isRecordingKey) {
        e.preventDefault();
        e.stopPropagation();

        if (e.key === "Escape") {
            isRecordingKey = false;
            updateKeyDisplay();
            return;
        }

        panicKey = e.key;
        localStorage.setItem('nebula_panic_key', panicKey);
        
        isRecordingKey = false;
        updateKeyDisplay();
        return;
    }

    if (panicKey && e.key.toLowerCase() === panicKey.toLowerCase()) {
        if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
            return;
        }

        e.preventDefault();
        e.stopPropagation();
        executePanic();
    }
});