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
    const searchInput = document.querySelector('.search-input');
    const subCategories = document.getElementById('submenu-categories');
    const subApps = document.getElementById('submenu-apps');
    const subGames = document.getElementById('submenu-games');

    const loadedMenus = { c: false, a: false, g: false };
    let allItemsCache = []; // Cache all items for search/deep linking
    let categoriesCache = []; // Cache categories for alias mapping

    const previewTooltip = document.createElement('div');
    previewTooltip.className = 'game-preview-tooltip';
    document.body.appendChild(previewTooltip);

    const PRIMARY_DOMAIN = 'https://trylearning.space';

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

    function showTooltip(e, item) {
        let screenshotsHtml = '';
        if (item.screenshots && item.screenshots.length > 0) {
            // Duplicate for infinite scroll effect
            const images = [...item.screenshots, ...item.screenshots];
            const trackHtml = images.map(src => `<img src="${src}" class="preview-screenshot-img">`).join('');
            screenshotsHtml = `
                <div class="preview-screenshots">
                    <div class="preview-track">
                        ${trackHtml}
                    </div>
                </div>
            `;
        }

        const displayImage = item.thumbnail || item.icon;
        const normalizedTags = normalizeTags(item.tags || []);
        previewTooltip.innerHTML = `
            <img src="${displayImage}" class="preview-thumb" alt="${item.title}">
            <div class="preview-title">${item.title}</div>
            <div class="preview-desc">${item.description || 'No description available.'}</div>
            <div class="preview-tags" style="font-size: 0.75rem; color: #666; margin-top: 4px;">${normalizedTags.join(', ')}</div>
            ${screenshotsHtml}
        `;
        previewTooltip.classList.add('visible');
        updateTooltipPos(e);
    }

    function updateTooltipPos(e) {
        const padding = 20;
        let x = e.clientX + padding;
        let y = e.clientY + padding;

        if (x + previewTooltip.offsetWidth > window.innerWidth) {
            x = e.clientX - previewTooltip.offsetWidth - padding;
        }
        if (y + previewTooltip.offsetHeight > window.innerHeight) {
            y = e.clientY - previewTooltip.offsetHeight - padding;
        }

        previewTooltip.style.left = `${x}px`;
        previewTooltip.style.top = `${y}px`;
    }

    function hideTooltip() {
        previewTooltip.classList.remove('visible');
    }

    // --- INITIALIZATION ---

    // Pre-fetch all indices for search/deep link lookup
    async function loadAllData() {
        // Load Categories first for alias mapping
        try {
            const catRes = await fetch('c/index.json');
            if (catRes.ok) categoriesCache = await catRes.json();
        } catch (e) {
            console.error("Failed to load categories index");
        }

        const sources = ['g', 'a']; // Categories aren't 'playable' items usually
        for (const folder of sources) {
            try {
                const res = await fetch(`${folder}/index.json`);
                if (res.ok) {
                    const data = await res.json();
                    const typedData = data.map(item => ({ ...item, type: folder }));
                    allItemsCache = [...allItemsCache, ...typedData];
                }
            } catch (e) {
                console.error(`Failed to load ${folder} index`);
            }
        }

        // Background pre-fetch images for common UI elements
        prefetchImages();
    }

    function prefetchImages() {
        const toPrefetch = allItemsCache.slice(0, 50);
        toPrefetch.forEach(item => {
            const imgUrl = item.thumbnail || item.icon;
            if (imgUrl) {
                const img = new Image();
                img.src = imgUrl;
            }
        });
    }

    function syncSidebar(id) {
        document.querySelectorAll('.submenu-item').forEach(link => {
            if (link.dataset.id === id) {
                link.style.color = 'white';
            } else {
                link.style.color = '#888';
            }
        });
        document.getElementById('nav-home')?.classList.remove('active');
    }

    // Helper to resolve aliases and deduplicate tags
    function normalizeTags(tags) {
        if (!tags) return [];
        const resolved = tags.map(tag => {
            const cat = categoriesCache.find(c =>
                c.title.toLowerCase() === tag.toLowerCase() ||
                (c.aliases && c.aliases.some(a => a.toLowerCase() === tag.toLowerCase()))
            );
            return cat ? cat.title : tag;
        });
        return [...new Set(resolved)];
    }

    // --- SEARCH LOGIC ---
    function performSearch(query) {
        if (!query.trim()) {
            showDashboard();
            return;
        }

        const q = query.toLowerCase();
        const results = allItemsCache.filter(item => {
            const matchesBasic = item.title.toLowerCase().includes(q) ||
                item.id.toLowerCase().includes(q) ||
                (item.icon && item.icon.toLowerCase().includes(q));

            const normalized = normalizeTags(item.tags || []);
            const matchesTags = normalized.some(tag => {
                const isMatch = tag.toLowerCase().includes(q);
                if (isMatch) return true;

                // Check if query is an alias for this resolved category
                const cat = categoriesCache.find(c => c.title.toLowerCase() === tag.toLowerCase());
                return cat && cat.aliases && cat.aliases.some(a => a.toLowerCase().includes(q));
            });

            return matchesBasic || matchesTags;
        });

        renderGrid(results, `Search Results for "${query}"`);
    }

    await loadAllData();
    checkDeepLink();

    // --- DEEP LINKING ---

    function checkDeepLink() {
        const params = new URLSearchParams(window.location.search);
        const gameId = params.get('u');
        const appId = params.get('a');
        const catId = params.get('c');

        const targetId = gameId || appId;

        if (targetId) {
            const item = allItemsCache.find(i => i.id === targetId);
            if (item) {
                openItem(item, true); // true = skip pushState
            }
        } else if (catId) {
            fetch('c/index.json').then(r => r.json()).then(cats => {
                const cat = cats.find(c => c.id === catId);
                if (cat) {
                    syncSidebar(cat.id);
                    renderCategoryView(cat.title);
                }
            });
        } else {
            showDashboard(true); // true = skip pushState
        }
    }

    window.addEventListener('popstate', checkDeepLink);

    // --- FILTERING & GRID RENDERING ---

    function renderCategoryView(categoryTitle) {
        const results = allItemsCache.filter(item => {
            if (!item.tags) return false;
            const normalized = normalizeTags(item.tags);
            return normalized.some(tag => tag.toLowerCase() === categoryTitle.toLowerCase());
        });

        // Update Canonical for Category
        const params = new URLSearchParams(window.location.search);
        const catId = params.get('c');
        if (catId) {
            const canonicalUrl = `${PRIMARY_DOMAIN}?c=${catId}`;
            setMeta('link[rel="canonical"]', canonicalUrl, 'href');
        }

        renderGrid(results, categoryTitle);
    }

    function renderGrid(items, title) {
        dashboardView.style.display = 'none';
        const existingView = document.getElementById('active-item-view');
        if (existingView) existingView.remove();
        const existingBrowse = document.querySelector('.browse-grid-container');
        if (existingBrowse) existingBrowse.remove();

        mainContent.scrollTop = 0;
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
                img.src = item.thumbnail || item.icon;
                img.style.width = '100%';
                img.style.aspectRatio = '16/9';
                img.style.objectFit = 'cover';
                img.style.display = 'block';
                img.style.transition = 'transform 0.3s ease';

                const info = document.createElement('div');
                info.style.padding = '16px';
                const cardTitle = document.createElement('div');
                cardTitle.innerText = item.title;
                cardTitle.style.fontWeight = '700';
                cardTitle.style.color = 'white';
                info.appendChild(cardTitle);

                card.appendChild(img);
                card.appendChild(info);

                card.addEventListener('mouseenter', () => {
                    img.style.transform = 'scale(1.1)';
                });
                card.addEventListener('mouseleave', () => {
                    img.style.transform = 'scale(1)';
                });

                // Tooltip Listeners
                card.addEventListener('mouseenter', (e) => showTooltip(e, item));
                card.addEventListener('mousemove', (e) => updateTooltipPos(e));
                card.addEventListener('mouseleave', () => hideTooltip());

                card.addEventListener('click', () => {
                    hideTooltip();
                    openItem(item);
                });
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

            // Custom sorting: 0-9, A-Z, then symbols
            const getPriority = (str) => {
                const char = (str || '').charAt(0).toLowerCase();
                if (/[0-9]/.test(char)) return 1;
                if (/[a-z]/.test(char)) return 2;
                return 3;
            };

            data.sort((a, b) => {
                const prioA = getPriority(a.title);
                const prioB = getPriority(b.title);

                if (prioA !== prioB) return prioA - prioB;
                return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
            });

            // Pre-calculate which categories are actually in use
            const usedCategoryTitles = new Set();
            if (folder === 'c') {
                allItemsCache.forEach(game => {
                    (game.tags || []).forEach(tag => {
                        const t = tag.toLowerCase().trim();
                        // Find ALL matching categories by ID, Title, or Alias
                        const matchingCats = categoriesCache.filter(c =>
                            c.id.toLowerCase() === t ||
                            c.title.toLowerCase() === t ||
                            (c.aliases && c.aliases.some(a => a.toLowerCase() === t))
                        );
                        matchingCats.forEach(cat => usedCategoryTitles.add(cat.title.toLowerCase()));
                    });
                });
            }

            data.forEach(item => {
                // If this is the categories menu, hide empty ones
                if (folder === 'c') {
                    if (!usedCategoryTitles.has(item.title.toLowerCase())) return;
                }

                const link = document.createElement('a');
                link.className = 'submenu-item';

                // Check if image exists (prefer icon for square icons)
                const displayIcon = item.icon || item.thumbnail;
                const isUrl = displayIcon && (displayIcon.includes('/') || displayIcon.includes('.'));

                let iconHtml = '';
                if (isUrl) {
                    iconHtml = `<img class="submenu-icon" src="${displayIcon}">`;
                } else {
                    // Emoji / Text (Check both fields just in case)
                    const iconValue = item.icon || item.thumbnail || '📁';
                    iconHtml = `<span style="width:18px; text-align:center; font-size:14px;">${iconValue}</span>`;
                }

                link.dataset.id = item.id;

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
                        syncSidebar(item.id);
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

    async function openItem(item, skipPush = false) {
        // Sync Sidebar Highlight
        syncSidebar(item.id);

        if (!skipPush) {
            const url = new URL(window.location);
            const param = item.type === 'a' ? 'a' : 'u';
            url.searchParams.set(param, item.id);
            if (param === 'a') url.searchParams.delete('u'); else url.searchParams.delete('a');
            url.searchParams.delete('c');
            window.history.pushState({}, '', url);
        }

        const paramKey = item.type === 'a' ? 'a' : 'u';
        const canonicalUrl = `${PRIMARY_DOMAIN}?${paramKey}=${item.id}`;
        const absoluteThumb = new URL(item.thumbnail || item.icon, window.location.origin).href;

        document.title = `Play ${item.title} Unblocked for Free No Download`;
        setMeta('link[rel="canonical"]', canonicalUrl, 'href');
        setMeta('meta[property="og:title"]', `Play ${item.title} Unblocked for Free No Download`);
        setMeta('meta[property="og:description"]', item.description || `Play ${item.title} Unblocked for Free No Download`);
        setMeta('meta[property="og:image"]', absoluteThumb);
        setMeta('meta[property="og:url"]', canonicalUrl);

        setMeta('meta[name="twitter:url"]', canonicalUrl);
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
        mainContent.style.overflowY = 'auto'; // Enable scrolling for info content

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
        iframeContainer.className = 'iframe-container';
        iframeContainer.style.width = '100%';
        iframeContainer.style.height = 'calc(100vh - 60px)'; // Full height minus topbar
        iframeContainer.style.minHeight = 'calc(100vh - 60px)';
        iframeContainer.style.flexShrink = '0'; // Prevent squishing
        iframeContainer.style.background = '#000';
        iframeContainer.style.borderBottom = '1px solid #1a1a1a';
        iframeContainer.style.position = 'relative';

        const iframe = document.createElement('iframe');
        iframe.src = item.path || '#';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';

        // Fullscreen Toggle
        const fsBtn = document.createElement('button');
        fsBtn.className = 'fullscreen-btn';
        fsBtn.innerHTML = '<i data-feather="maximize"></i>';
        fsBtn.title = 'Fullscreen';
        fsBtn.onclick = () => {
            if (iframe.requestFullscreen) iframe.requestFullscreen();
            else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
            else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
        };

        iframeContainer.appendChild(iframe);
        iframeContainer.appendChild(fsBtn);

        viewContainer.appendChild(iframeContainer);

        // --- GAME INFO CONTAINER ---
        const infoWrapper = document.createElement('div');
        infoWrapper.className = 'game-info-container';

        // --- 1. TITLE & DESCRIPTION SECTION ---
        const descSection = document.createElement('div');
        descSection.className = 'info-section';

        let descContent = `<p>${item.description || 'No description available.'}</p>`;
        if (item.meta) {
            try {
                const metaRes = await fetch(item.meta);
                if (metaRes.ok) {
                    let mdText = await metaRes.text();
                    const seoRegex = /#\s*Hidden\s*SEO(?: Keywords)?\s*\n+([\s\S]*?)(?=\n#|$)/i;
                    const match = mdText.match(seoRegex);
                    if (match) {
                        let metaTag = document.querySelector('meta[name="keywords"]');
                        if (!metaTag) {
                            metaTag = document.createElement('meta');
                            metaTag.name = "keywords";
                            document.head.appendChild(metaTag);
                        }
                        metaTag.content = match[1].replace(/\n/g, ', ').trim();
                        mdText = mdText.replace(seoRegex, '');
                    }
                    descContent = parseMarkdown(mdText);
                }
            } catch (e) {
                console.log('No metadata file found');
            }
        }

        descSection.innerHTML = `
            <div class="section-header">
                <i data-feather="info" class="section-icon"></i>
                <h2 class="section-title">Description</h2>
            </div>
            <h1 style="font-family: 'Outfit', sans-serif; font-size: 3.5rem; color: white; margin-bottom: 24px;">${item.title}</h1>
            <div class="description-content">
                ${descContent}
            </div>
        `;
        infoWrapper.appendChild(descSection);

        // --- 2. SCREENSHOTS SECTION ---
        if (item.screenshots && Array.isArray(item.screenshots) && item.screenshots.length > 0) {
            const screenshotSection = document.createElement('div');
            screenshotSection.className = 'info-section';

            const grid = document.createElement('div');
            grid.className = 'screenshot-grid';

            item.screenshots.forEach((src, idx) => {
                const display = document.createElement('div');
                display.className = 'screenshot-display';
                display.style.backgroundImage = `url('${src}')`;

                const img = document.createElement('img');
                img.src = src;
                img.className = 'screenshot-img';
                img.alt = `${item.title} Screenshot ${idx + 1}`;

                img.onload = () => {
                    const ratio = img.naturalWidth / img.naturalHeight;
                    // Dynamic Bento Logic
                    if (idx === 0) {
                        display.classList.add('span-large'); // Always feature the first one
                    } else if (ratio > 1.8) {
                        display.classList.add('span-wide');
                    } else if (ratio < 0.7) {
                        display.classList.add('span-tall');
                    }
                };

                display.appendChild(img);
                grid.appendChild(display);
            });

            screenshotSection.innerHTML = `
                <div class="section-header">
                    <i data-feather="image" class="section-icon"></i>
                    <h2 class="section-title">Screenshots</h2>
                </div>
            `;
            screenshotSection.appendChild(grid);
            infoWrapper.appendChild(screenshotSection);
        }

        // --- 3. SIMILAR GAMES SECTION ---
        let similarGames = allItemsCache.filter(i =>
            i.id !== item.id &&
            i.tags && item.tags &&
            i.tags.some(tag => (item.tags || []).includes(tag))
        ).slice(0, 10);

        // Fallback to random games if no similar ones found
        if (similarGames.length === 0) {
            similarGames = allItemsCache
                .filter(i => i.id !== item.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 10);
        }

        if (similarGames.length > 0) {
            const isFallback = (allItemsCache.filter(i => i.id !== item.id && i.tags && item.tags && i.tags.some(tag => (item.tags || []).includes(tag))).length === 0);
            const sectionTitle = isFallback ? 'Other Games' : 'Similar Games';

            const similarSection = document.createElement('div');
            similarSection.className = 'info-section';

            similarSection.innerHTML = `
                <div class="section-header">
                    <i data-feather="grid" class="section-icon"></i>
                    <h2 class="section-title">${sectionTitle}</h2>
                </div>
                <div class="similar-grid"></div>
            `;

            const grid = similarSection.querySelector('.similar-grid');

            similarGames.forEach(sim => {
                const card = document.createElement('a');
                card.className = 'similar-card';
                card.href = `?u=${sim.id}`;

                const img = document.createElement('img');
                img.src = sim.thumbnail || sim.icon;
                img.className = 'similar-thumb';
                img.alt = sim.title;
                img.style.transition = 'transform 0.3s ease'; // Keep for hover effect

                const normalizedSimTags = normalizeTags(sim.tags || []);
                const info = document.createElement('div');
                info.className = 'similar-info';
                info.innerHTML = `
                    <div class="similar-name">${sim.title}</div>
                    <div class="similar-tags">${normalizedSimTags.join(', ')}</div>
                `;

                card.appendChild(img);
                card.appendChild(info);

                card.addEventListener('mouseenter', () => {
                    img.style.transform = 'scale(1.1)';
                });
                card.addEventListener('mouseleave', () => {
                    img.style.transform = 'scale(1)';
                });

                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    hideTooltip();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    openItem(sim);
                });

                // Tooltip Listeners
                card.addEventListener('mouseenter', (e) => showTooltip(e, sim));
                card.addEventListener('mousemove', (e) => updateTooltipPos(e));
                card.addEventListener('mouseleave', () => hideTooltip());

                grid.appendChild(card);
            });

            infoWrapper.appendChild(similarSection);
        }

        viewContainer.appendChild(infoWrapper);
        mainContent.appendChild(viewContainer);

        // Re-initialize feather icons for new content
        if (window.feather) window.feather.replace();
    }


    function showDashboard(skipPush = false) {
        if (!skipPush) {
            const url = new URL(window.location);
            url.searchParams.delete('c');
            url.searchParams.delete('u');
            window.history.pushState({}, '', url);
        }

        document.querySelectorAll('.submenu-item').forEach(i => i.style.color = '#888');

        const navHome = document.getElementById('nav-home');
        if (navHome) navHome.classList.add('active');

        const existingView = document.getElementById('active-item-view');
        if (existingView) existingView.remove();

        const browseGrid = document.querySelector('.browse-grid-container');
        if (browseGrid) browseGrid.remove();

        // Reset Meta for Dashboard
        document.title = "Nebula";
        setMeta('link[rel="canonical"]', PRIMARY_DOMAIN, 'href');

        // Restore Dashboard
        mainContent.scrollTop = 0;
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

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.toLowerCase();
                const results = allItemsCache.filter(item =>
                    item.title.toLowerCase().includes(query) ||
                    item.id.toLowerCase().includes(query)
                );
                if (results.length === 1) {
                    openItem(results[0]);
                    searchInput.value = '';
                }
            }
        });
    }

    // Expose functions for other scripts (like renderGames.js)
    window.openItem = openItem;
    window.showTooltip = showTooltip;
    window.updateTooltipPos = updateTooltipPos;
    // --- MOBILE MENU LOGIC ---
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (mobileMenuBtn && sidebar && sidebarOverlay) {

        function toggleSidebar(show) {
            if (show) {
                sidebar.classList.add('open');
                sidebarOverlay.classList.add('visible');
            } else {
                sidebar.classList.remove('open');
                sidebarOverlay.classList.remove('visible');
            }
        }

        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = sidebar.classList.contains('open');
            toggleSidebar(!isOpen);
        });

        sidebarOverlay.addEventListener('click', () => {
            toggleSidebar(false);
        });

        // Event Delegation for dynamic items
        sidebar.addEventListener('click', (e) => {
            if (window.innerWidth <= 900) {
                const target = e.target.closest('a, .submenu-item, .nav-item');
                if (target && !target.id.includes('toggle')) {
                    // Check if it's a toggle button (expand/collapse), if so, don't close
                    // The toggles have IDs nav-categories-toggle etc.
                    // But wait, the toggle itself is an 'a' tag.
                    // The user wants to expand the menu, not close the sidebar.

                    if (target.id === 'nav-categories-toggle' || target.id === 'nav-apps-toggle' || target.id === 'nav-games-toggle') {
                        return;
                    }
                    toggleSidebar(false);
                }
            }
        });
    }

    window.hideTooltip = hideTooltip;
});
