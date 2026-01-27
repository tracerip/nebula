function renderGameGrid(list, isSubGroup = false) {
    const grid = document.getElementById('game-grid');
    if(!grid) return;
    grid.innerHTML = '';

    if (!isSubGroup && list === library && (typeof currentCategory === 'undefined' || currentCategory === 'all' || currentCategory === 'html5')) {
        renderFeatured(grid);
    }

    if (isSubGroup) {
        const backCard = document.createElement('div');
        backCard.className = 'game-card back-card';
        backCard.onclick = () => {
            window.history.pushState({}, '', window.location.pathname);
            const cat = typeof currentCategory !== 'undefined' ? currentCategory : 'all';
            filterCategory(cat); 
            document.getElementById('search-input').value = '';
        };
        backCard.innerHTML = `
            <div class="card-media-wrapper" style="background: rgba(255,255,255,0.05);"><div class="card-emoji">↩️</div></div>
            <div class="card-content"><h3>Return</h3><p>Back to library</p></div>
        `;
        grid.appendChild(backCard);
    }

    list.forEach((item, index) => {
        createCard(item, index, grid);
    });
}

function renderFeatured(grid) {
    const featuredCard = document.createElement('div');
    featuredCard.className = 'featured-card';
    featuredCard.setAttribute('data-aos', 'fade-up');
    featuredCard.onclick = () => { window.location.href = featuredItem.link; };

    featuredCard.innerHTML = `
        <div class="featured-content">
            <div class="featured-icon"><i class="${featuredItem.icon}"></i></div>
            <div class="featured-text">
                <h3>${featuredItem.title}</h3>
                <p>${featuredItem.description}</p>
            </div>
            <div class="featured-arrow"><i class="fa-solid fa-arrow-right"></i></div>
        </div>
    `;
    grid.appendChild(featuredCard);
}

function createCard(item, index, grid) {
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
            const param = isChromebook ? 'video' : 'game';
            window.location.href = `play?${param}=${item.id}`;
        }
    };

    const isImage = /\.(png|jpg|jpeg|gif|webp)$/i.test(item.icon);
    let mediaHtml = isImage 
        ? `<img src="${item.type === 'group' ? 'assets/' + item.icon : 'games/' + item.id + '/' + item.icon}" alt="${cleanDesc}" class="card-img" loading="lazy">` 
        : `<div class="card-emoji" aria-label="${cleanDesc}" role="img">${item.icon}</div>`;

    let catBadge = '';
    if(item.category && item.category !== 'html5' && item.type !== 'group') {
        catBadge = `<span style="font-size:10px; border:1px solid #666; padding:2px 5px; border-radius:4px; margin-left:5px; color:#aaa">${item.category.toUpperCase()}</span>`;
    }

    const titlePrefix = item.type === 'group' ? '<i class="fa-solid fa-folder-open" style="color:#fbbf24; margin-right:8px;"></i>' : '';

    card.innerHTML = `
        <div class="card-media-wrapper">${mediaHtml}</div>
        <div class="card-content">
            <h3>${titlePrefix}${item.title}${catBadge}</h3>
            <p>${htmlDesc}</p>
        </div>
    `;
    grid.appendChild(card);
}

function toggleFullscreen() {
    const elem = document.getElementById("game-frame");
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}

function parseMarkdown(text) {
    if(!text) return "";
    return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="desc-link" onclick="event.stopPropagation()">$1</a>');
}

function stripMarkdown(text) {
    if(!text) return "";
    return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
}

function sortLibrary(list) {
    list.sort((a, b) => {
        const aIsGroup = a.type === 'group';
        const bIsGroup = b.type === 'group';
        if (aIsGroup && !bIsGroup) return -1;
        if (!aIsGroup && bIsGroup) return 1;
        return a.title.localeCompare(b.title);
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