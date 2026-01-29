// Markdown Parser (Simple) for SEO
function parseMarkdown(text) {
    if (!text) return '';
    return text
        // Headers
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        // Bold
        .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>')
        // Paragraphs
        .replace(/\n\s*\n/g, '</p><p>')
        // Lists
        // Lists
        .replace(/^\s*-\s(.*)$/gim, '<li>$1</li>')
        // Fix for multiple Q&A lines being merged or lost - simple newline to BR
        .replace(/\n(Q:|A:)/g, '<br><b>$1</b>');
}

document.addEventListener('DOMContentLoaded', async () => {
    // Navigation & Elements
    const mainContent = document.getElementById('main-content');
    const dashboardView = document.getElementById('dashboard-view');
    const toggleCategories = document.getElementById('nav-categories-toggle');
    const toggleApps = document.getElementById('nav-apps-toggle');
    const toggleGames = document.getElementById('nav-games-toggle');
    const navHome = document.getElementById('nav-home');
    const subCategories = document.getElementById('submenu-categories');
    const subApps = document.getElementById('submenu-apps');
    const subGames = document.getElementById('submenu-games');

    const loadedMenus = { c: false, a: false, g: false };
    let allItemsCache = []; // Cache all items for search/deep linking

    // --- INITIALIZATION ---

    // Pre-fetch all indices for search/deep link lookup
    async function loadAllData() {
        const sources = ['g', 'a']; // Categories aren't 'playable' items usually
        for (const folder of sources) {
            try {
                const res = await fetch(`${folder}/index.json`);
                if (res.ok) {
                    const data = await res.json();
                    allItemsCache = [...allItemsCache, ...data];
                }
            } catch (e) {
                console.error(`Failed to load ${folder} index`);
            }
        }
    }

    await loadAllData();
    checkDeepLink();

    // --- DEEP LINKING ---

    function checkDeepLink() {
        const params = new URLSearchParams(window.location.search);
        const gameId = params.get('u');
        const catId = params.get('c');

        if (gameId) {
            const item = allItemsCache.find(i => i.id === gameId);
            if (item) {
                openItem(item);
                if (item.path.includes('games/') || item.tags) toggleSubmenu(toggleGames, subGames, 'g');
                if (item.path.includes('a/')) toggleSubmenu(toggleApps, subApps, 'a');
            }
        } else if (catId) {
            // Need to look up category by ID
            fetch('c/index.json').then(r => r.json()).then(cats => {
                const cat = cats.find(c => c.id === catId);
                if (cat) {
                    renderCategoryView(cat.title);
                    toggleSubmenu(toggleCategories, subCategories, 'c');

                    // Wait for DOM to populate then highlight active
                    setTimeout(() => {
                        const link = Array.from(subCategories.querySelectorAll('.submenu-item')).find(l => l.innerText.trim() === cat.title);
                        if (link) {
                            document.querySelectorAll('.submenu-item').forEach(i => i.style.color = '#888');
                            link.style.color = 'white';
                            document.getElementById('nav-home').classList.remove('active');
                        }
                    }, 100);
                }
            });
        }
    }

    // --- FILTERING & GRID RENDERING ---

    function renderCategoryView(categoryTitle) {
        const results = allItemsCache.filter(item => {
            if (!item.tags) return false;
            return item.tags.some(tag => tag.toLowerCase() === categoryTitle.toLowerCase());
        });
        renderGrid(results, categoryTitle);
    }

    function renderGrid(items, title) {
        dashboardView.style.display = 'none';
        const existingView = document.getElementById('active-item-view');
        if (existingView) existingView.remove();
        const existingBrowse = document.querySelector('.browse-grid-container');
        if (existingBrowse) existingBrowse.remove();

        mainContent.style.overflowY = 'auto';

        const container = document.createElement('div');
        container.className = 'browse-grid-container';
        container.style.padding = '40px';
        container.style.maxWidth = '1200px';
        container.style.margin = '0 auto';

        const header = document.createElement('h1');
        header.innerText = title;
        header.style.fontFamily = "'Outfit', sans-serif";
        header.style.fontSize = '2.5rem';
        header.style.marginBottom = '30px';
        header.style.color = 'white';
        container.appendChild(header);

        if (items.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.innerText = 'No games found in this category.';
            emptyState.style.color = '#666';
            container.appendChild(emptyState);
        } else {
            const grid = document.createElement('div');
            grid.style.display = 'grid';
            grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
            grid.style.gap = '24px';

            items.forEach(item => {
                const card = document.createElement('div');
                card.style.background = '#111';
                card.style.border = '1px solid #222';
                card.style.borderRadius = '16px';
                card.style.overflow = 'hidden';
                card.style.cursor = 'pointer';
                card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-4px)'; card.style.borderColor = '#444'; });
                card.addEventListener('mouseleave', () => { card.style.transform = 'translateY(0)'; card.style.borderColor = '#222'; });
                card.style.transition = 'all 0.2s';

                const img = document.createElement('img');
                img.src = item.thumbnail;
                img.style.width = '100%';
                img.style.aspectRatio = '16/9';
                img.style.objectFit = 'cover';
                img.style.display = 'block';

                const info = document.createElement('div');
                info.style.padding = '16px';
                const cardTitle = document.createElement('div');
                cardTitle.innerText = item.title;
                cardTitle.style.fontWeight = '700';
                cardTitle.style.color = 'white';
                info.appendChild(cardTitle);

                card.appendChild(img);
                card.appendChild(info);
                card.addEventListener('click', () => openItem(item));
                grid.appendChild(card);
            });
            container.appendChild(grid);
        }
        mainContent.appendChild(container);
    }

    // --- SUBMENU HANDLING ---

    async function toggleSubmenu(triggerElement, submenuElement, folderCode) {
        const isExpanded = triggerElement.classList.contains('expanded');

        if (isExpanded) {
            triggerElement.classList.remove('expanded');
            submenuElement.classList.remove('open');
        } else {
            triggerElement.classList.add('expanded');
            submenuElement.classList.add('open');

            if (!loadedMenus[folderCode]) {
                await populateSubmenu(folderCode, submenuElement);
                loadedMenus[folderCode] = true;
            }
        }
    }

    async function populateSubmenu(folder, container) {
        try {
            const response = await fetch(`${folder}/index.json`);
            if (!response.ok) throw new Error('Index not found');
            const data = await response.json();

            container.innerHTML = '';

            data.forEach(item => {
                const link = document.createElement('a');
                link.className = 'submenu-item';

                // Check if thumbnail is url or emoji
                const isUrl = item.thumbnail && (item.thumbnail.includes('/') || item.thumbnail.includes('.'));

                let iconHtml = '';
                if (isUrl) {
                    iconHtml = `<img class="submenu-icon" src="${item.thumbnail}">`;
                } else {
                    // Emoji / Text
                    iconHtml = `<span style="width:18px; text-align:center; font-size:14px;">${item.thumbnail || '📁'}</span>`;
                }

                link.innerHTML = `
                    ${iconHtml}
                    <span>${item.title}</span>
                `;

                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Highlight active
                    document.querySelectorAll('.submenu-item').forEach(i => i.style.color = '#888');
                    link.style.color = 'white';

                    // Remove active from Home
                    document.getElementById('nav-home').classList.remove('active');

                    if (folder === 'c') {
                        // Filter by category
                        renderCategoryView(item.title);
                        // Update URL
                        const url = new URL(window.location);
                        url.searchParams.set('c', item.id);
                        url.searchParams.delete('u'); // switch mode
                        window.history.pushState({}, '', url);
                    } else {
                        // Games and Apps open the viewer
                        openItem(item);
                    }
                });

                container.appendChild(link);
            });
        } catch (error) {
            console.error(error);
        }
    }

    // --- ITEM VIEWER (GAMES/APPS) ---

    async function openItem(item) {
        // Update URL without reload
        const url = new URL(window.location);
        url.searchParams.set('u', item.id);
        url.searchParams.delete('c'); // Remove category param to prevent stacking
        window.history.pushState({}, '', url);

        // Update Dynamic Meta Tags
        const setMeta = (selector, val, attr = 'content') => {
            let el = document.querySelector(selector);
            if (!el) {
                el = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
                if (selector.includes('property')) el.setAttribute('property', selector.match(/property="([^"]+)"/)[1]);
                if (selector.includes('name')) el.setAttribute('name', selector.match(/name="([^"]+)"/)[1]);
                if (selector.includes('rel')) el.setAttribute('rel', 'canonical');
                document.head.appendChild(el);
            }
            el.setAttribute(attr, val);
        };

        const absoluteThumb = new URL(item.thumbnail, window.location.origin).href;
        const pageUrl = window.location.href;

        document.title = `Play ${item.title} Unblocked for Free No Download`;
        setMeta('link[rel="canonical"]', pageUrl, 'href');
        setMeta('meta[property="og:title"]', `Play ${item.title} Unblocked for Free No Download`);
        setMeta('meta[property="og:description"]', item.description || `Play ${item.title} Unblocked for Free No Download`);
        setMeta('meta[property="og:image"]', absoluteThumb);
        setMeta('meta[property="og:url"]', pageUrl);

        setMeta('meta[name="twitter:url"]', pageUrl);
        setMeta('meta[name="twitter:card"]', 'summary_large_image');
        setMeta('meta[name="twitter:title"]', `Play ${item.title} Unblocked for Free No Download`);
        setMeta('meta[name="twitter:description"]', item.description || `Play ${item.title} Unblocked for Free No Download`);
        setMeta('meta[name="twitter:image"]', absoluteThumb);

        // Hide Dashboard & Fix Layout
        dashboardView.style.display = 'none';

        // Remove old view
        const existingView = document.getElementById('active-item-view');
        if (existingView) existingView.remove();

        // Remove browser grid if exists
        const browseGrid = document.querySelector('.browse-grid-container');
        if (browseGrid) browseGrid.remove();

        // 1. Force Main Content to Full Width
        mainContent.style.overflowY = 'auto'; // Enable scrolling for SEO content

        // Create View Container
        const viewContainer = document.createElement('div');
        viewContainer.id = 'active-item-view';
        viewContainer.style.width = '100%';
        viewContainer.style.minHeight = '100%';
        viewContainer.style.display = 'flex';
        viewContainer.style.flexDirection = 'column';
        viewContainer.style.backgroundColor = '#000';

        // --- IFRAME SECTION ---
        const iframeContainer = document.createElement('div');
        iframeContainer.style.width = '100%';
        iframeContainer.style.height = 'calc(100vh - 60px)'; // Full height minus topbar
        iframeContainer.style.minHeight = 'calc(100vh - 60px)';
        iframeContainer.style.flexShrink = '0'; // Prevent squishing
        iframeContainer.style.background = '#000';
        iframeContainer.style.borderBottom = '1px solid #1a1a1a';

        const iframe = document.createElement('iframe');
        iframe.src = item.path || '#';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframeContainer.appendChild(iframe);

        viewContainer.appendChild(iframeContainer);

        // --- SEO / INFO SECTION ---
        const seoContainer = document.createElement('div');
        seoContainer.style.padding = '40px';
        seoContainer.style.maxWidth = '1000px';
        seoContainer.style.margin = '0 auto';
        seoContainer.style.color = '#ccc';

        let descContent = `<p>${item.description || 'No description available.'}</p>`;

        // Try to fetch markdown description if available in meta field
        if (item.meta) {
            try {
                const metaRes = await fetch(item.meta);
                if (metaRes.ok) {
                    let mdText = await metaRes.text();

                    // Extract SEO Keywords section (Hidden SEO or Hidden SEO Keywords)
                    // Matches header and content up to next header or end of string
                    const seoRegex = /#\s*Hidden\s*SEO(?: Keywords)?\s*\n+([\s\S]*?)(?=\n#|$)/i;
                    const match = mdText.match(seoRegex);

                    if (match) {
                        const keywords = match[1].replace(/\n/g, ', ').trim();

                        // Update/Create Meta Tag
                        let metaTag = document.querySelector('meta[name="keywords"]');
                        if (!metaTag) {
                            metaTag = document.createElement('meta');
                            metaTag.name = "keywords";
                            document.head.appendChild(metaTag);
                        }
                        metaTag.content = keywords;

                        // Remove from the text so it doesn't render
                        mdText = mdText.replace(seoRegex, '');
                    } else {
                        // Clear keywords if none found to avoid pollution from previous items
                        let metaTag = document.querySelector('meta[name="keywords"]');
                        if (metaTag) metaTag.content = "";
                    }

                    descContent = parseMarkdown(mdText);
                }
            } catch (e) {
                console.log('No metadata file found');
            }
        }

        seoContainer.innerHTML = `
            <h1 style="font-family: 'Outfit', sans-serif; font-size: 3rem; color: white; margin-bottom: 20px;">${item.title}</h1>
            <div style="font-size: 1.1rem; line-height: 1.6; color: #aaa;">
                ${descContent}
            </div>
        `;

        viewContainer.appendChild(seoContainer);

        mainContent.appendChild(viewContainer);
    }

    function showDashboard() {
        const url = new URL(window.location);
        url.searchParams.delete('c');
        window.history.pushState({}, '', url);

        document.querySelectorAll('.submenu-item').forEach(i => i.style.color = '#888');

        const navHome = document.getElementById('nav-home');
        if (navHome) navHome.classList.add('active');

        const existingView = document.getElementById('active-item-view');
        if (existingView) existingView.remove();

        const browseGrid = document.querySelector('.browse-grid-container');
        if (browseGrid) browseGrid.remove();

        // Restore Dashboard
        mainContent.style.overflowY = 'hidden';
        dashboardView.style.display = 'flex';
    }

    // --- EVENT LISTENERS ---

    if (toggleCategories) toggleCategories.addEventListener('click', (e) => { e.preventDefault(); toggleSubmenu(toggleCategories, subCategories, 'c'); });
    if (toggleApps) toggleApps.addEventListener('click', (e) => { e.preventDefault(); toggleSubmenu(toggleApps, subApps, 'a'); });
    if (toggleGames) toggleGames.addEventListener('click', (e) => { e.preventDefault(); toggleSubmenu(toggleGames, subGames, 'g'); });

    if (navHome) navHome.addEventListener('click', (e) => {
        e.preventDefault();
        showDashboard();
    });
});
