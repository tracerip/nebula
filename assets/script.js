/*
    Discord: "fa-brands fa-discord"
    GitHub: "fa-brands fa-github"
    Twitter/X: "fa-brands fa-x-twitter"
    YouTube: "fa-brands fa-youtube"
    Generic Website: "fa-solid fa-globe"
    Person/User: "fa-solid fa-user"
    Game Controller: "fa-solid fa-gamepad"
*/

const library = [
    { 
        id: "slope", 
        title: "Slope", 
        description: "The ultimate 3D speed run game where you play as a ball dodging red walls going down a slope.", 
        icon: "thumbnail.jpg",
        creator: {
            name: "Y8",
            link: "https://github.com/reunbozdo/BlockBlast",
            icon: "fa-brands fa-github"
        }
    },
    { 
        id: "block-blast", 
        title: "Block Blast", 
        description: "An exciting online puzzle game with drag-and-drop Tetris block gameplay.", 
        icon: "thumbnail.jpg",
        creator: {
            name: "Hungry Studio",
            link: "https://www.hungrystudio.com/",
            icon: "fa-solid fa-globe"
        }
    },
    {
        type: "group",
        title: "Minecraft Collection",
        description: "All Eaglercraft versions (1.5.2, 1.8.8, 1.12.2, etc).",
        icon: "🪓",
        items: [
            { 
                id: "eaglercraft-1.12.2", 
                title: "Minecraft 1.12.2 (JS)", 
                description: "1.12, the release of the [World of Color Update](https://minecraft.wiki/w/World_of_Color_Update), released on June 7, 2017.", 
                icon: "thumbnail.png",
                creator: {
                    name: "PeytonPlayz585",
                    link: "https://discord.gg/nmKB4KRUMy",
                    icon: "fa-brands fa-discord"
                }
            },
            { 
                id: "eaglercraft-1.12.2-wasm", 
                title: "Minecraft 1.12.2 (WASM-GC)", 
                description: "1.12, the release of the [World of Color Update](https://minecraft.wiki/w/World_of_Color_Update), released on June 7, 2017.", 
                icon: "thumbnail.png",
                creator: {
                    name: "PeytonPlayz585",
                    link: "https://discord.gg/nmKB4KRUMy",
                    icon: "fa-brands fa-discord"
                }
            },
            { 
                id: "eaglercraftx-1.8.8", 
                title: "Minecraft 1.8.8 (JS)", 
                description: "1.8, the release of the [Bountiful Update](https://minecraft.wiki/w/Bountiful_Update) released on September 2, 2014.", 
                icon: "thumbnail.png",
                creator: {
                    name: "Ayunami2000 / lax1dude",
                    link: "https://gitflic.ru/project/lax1dude/eaglercraft-1_8",
                    icon: "fa-brands fa-github"
                }
            },
            { 
                id: "eaglercraftx-1.8.8-wasm", 
                title: "Minecraft 1.8.8 (WASM-GC)", 
                description: "1.8, the release of the [Bountiful Update](https://minecraft.wiki/w/Bountiful_Update) released on September 2, 2014.", 
                icon: "thumbnail.png",
                creator: {
                    name: "Ayunami2000 / lax1dude",
                    link: "https://gitflic.ru/project/lax1dude/eaglercraft-1_8",
                    icon: "fa-brands fa-github"
                }
            },
            { 
                id: "eaglercraft-1.5.2", 
                title: "Minecraft 1.5.2 (JS)", 
                description: "1.5, the release of the [Redstone Update](https://minecraft.wiki/w/Redstone_Update), released on March 13, 2013.", 
                icon: "thumbnail.png",
                creator: {
                    name: "Ayunami2000 / lax1dude",
                    link: "https://eaglercraft.com/",
                    icon: "fa-solid fa-globe"
                }
            },
            { 
                id: "eaglercraft-indev-20100223", 
                title: "Minecraft Indev 20100223 (JS)", 
                description: "Indev 20100223, the version that introduced [paintings](https://minecraft.wiki/w/Java_Edition_Indev_20100223), released on February 23, 2010.", 
                icon: "thumbnail.png",
                creator: {
                    name: "Colbster937",
                    link: "https://github.com/EaglerPorts/in-20100223",
                    icon: "fa-brands fa-github"
                }
            },
            { 
                id: "eaglercraft-indev-20100223-wasm", 
                title: "Minecraft Indev 20100223 (WASM-GC)", 
                description: "Indev 20100223, the version that introduced [paintings](https://minecraft.wiki/w/Java_Edition_Indev_20100223), released on February 23, 2010.", 
                icon: "thumbnail.png",
                creator: {
                    name: "Colbster937",
                    link: "https://github.com/EaglerPorts/in-20100223",
                    icon: "fa-brands fa-github"
                }
            },
            { 
                id: "eaglercraft-classic-0.30", 
                title: "Minecraft 0.30 (WASM-GC)", 
                description: "0.30, the version that introduced [Survival Mode](https://minecraft.wiki/w/Java_Edition_Classic_0.30), released on November 10, 2009.", 
                icon: "thumbnail.png",
                creator: {
                    name: "PeytonPlayz585",
                    link: "https://github.com/PeytonPlayz585",
                    icon: "fa-brands fa-github"
                }
            }
        ]
    },
    { 
        id: "terraria", 
        title: "Terraria (WASM-GC)", 
        description: "A 2D sandbox action-adventure game developed by [Re-Logic](https://re-logic.com/). Often described as 2D Minecraft.", 
        icon: "thumbnail.jpg",
        creator: {
            name: "Mercury Workshop",
            link: "https://terraria.mercurywork.shop/",
            icon: "fa-solid fa-globe"
        }
    }
];

document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });

    const yearSpan = document.getElementById('year');
    if(yearSpan) yearSpan.innerText = new Date().getFullYear();

    if (window.location.pathname.includes('/play')) {
        loadGame();
    } else {
        renderGameGrid(library);
        setupSearch();
    }
});

function renderGameGrid(list, isSubGroup = false) {
    const grid = document.getElementById('game-grid');
    if(!grid) return;
    grid.innerHTML = '';

    if (isSubGroup) {
        const backCard = document.createElement('div');
        backCard.className = 'game-card back-card';
        backCard.onclick = () => {
            renderGameGrid(library); 
            document.getElementById('search-input').value = '';
        };
        backCard.innerHTML = `
            <div class="card-media-wrapper" style="background: rgba(255,255,255,0.05);">
                <div class="card-emoji">↩️</div>
            </div>
            <div class="card-content">
                <h3>Go Back</h3>
                <p>Return to main library</p>
            </div>
        `;
        grid.appendChild(backCard);
    }

    list.forEach((item, index) => {
        const cleanDesc = stripMarkdown(item.description);
        const htmlDesc = parseMarkdown(item.description);

        const card = document.createElement('div');
        card.className = 'game-card';
        if (item.type === 'group') card.classList.add('group-card');
        
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', index * 50);
        
        card.onclick = (e) => {
            if (e.target.tagName === 'A') return;

            if (item.type === 'group') {
                renderGameGrid(item.items, true);
            } else {
                window.location.href = `play?game=${item.id}`;
            }
        };

        const isImage = /\.(png|jpg|jpeg|gif|webp)$/i.test(item.icon);
        let mediaHtml = isImage 
            ? `<img src="${item.type === 'group' ? 'assets/' + item.icon : 'games/' + item.id + '/' + item.icon}" alt="${cleanDesc}" class="card-img" loading="lazy">` 
            : `<div class="card-emoji" aria-label="${cleanDesc}" role="img">${item.icon}</div>`;

        const titlePrefix = item.type === 'group' ? '<i class="fa-solid fa-folder-open" style="color:#fbbf24; margin-right:8px;"></i>' : '';

        card.innerHTML = `
            <div class="card-media-wrapper">${mediaHtml}</div>
            <div class="card-content">
                <h3>${titlePrefix}${item.title}</h3>
                <p>${htmlDesc}</p>
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

        if (term === '') {
            renderGameGrid(library);
        } else {
            const allGames = flattenLibrary(library);
            const filtered = allGames.filter(g => g.title.toLowerCase().includes(term));
            renderGameGrid(filtered);
        }
    });
}

function flattenLibrary(list) {
    let result = [];
    list.forEach(item => {
        if (item.type === 'group') {
            result = result.concat(item.items);
        } else {
            result.push(item);
        }
    });
    return result;
}

function loadGame() {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get('game');

    const allGames = flattenLibrary(library);
    const gameData = allGames.find(g => g.id === gameId);
    
    if (gameData) {
        const gamePath = `games/${gameId}/index.html`;

        document.title = `Playing ${gameData.title} | Nebula`;
        document.getElementById('game-title').innerText = gameData.title;
        document.getElementById('game-frame').src = gamePath;

        const rawBtn = document.getElementById('raw-btn');
        if(rawBtn) rawBtn.href = gamePath;

        const creatorBtn = document.getElementById('creator-btn');
        const creatorIcon = document.getElementById('creator-icon');
        const creatorName = document.getElementById('creator-name');

        if (gameData.creator) {
            creatorBtn.style.display = 'inline-flex';
            creatorBtn.href = gameData.creator.link;
            creatorName.innerText = gameData.creator.name;
            // Set icon class (e.g. "fa-brands fa-github")
            creatorIcon.className = gameData.creator.icon;
        } else {
            creatorBtn.style.display = 'none';
        }
        // ---------------------------------

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
            const existing = metaTag.getAttribute('content');
            metaTag.setAttribute('content', `${existing}, ${seoText.replace(/\n/g, ', ')}`);
        }
    }
}

function toggleFullscreen() {
    const elem = document.getElementById("game-frame");
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}

function parseMarkdown(text) {
    return text.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g, 
        '<a href="$2" target="_blank" class="desc-link" onclick="event.stopPropagation()">$1</a>'
    );
}

function stripMarkdown(text) {
    return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
}