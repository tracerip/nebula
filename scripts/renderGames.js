import { featuredItem, library } from './games.js';

const visualGrid = document.getElementById('visual-grid');

// Generate the simple grid item (image only)
function generateGridItem(item) {
    const div = document.createElement('div');
    div.className = 'grid-item';

    const displayImage = item.icon || item.thumbnail;
    const isUrl = displayImage && (displayImage.startsWith('http') || displayImage.includes('/') || displayImage.includes('.'));

    if (isUrl) {
        const img = document.createElement('img');
        img.src = displayImage;
        img.alt = item.title;
        img.loading = 'lazy';
        div.appendChild(img);
    } else {
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        div.style.fontSize = '3rem';
        div.innerText = displayImage || '🎮';
    }

    // --- CLICK HANDLER ---
    div.addEventListener('click', () => {
        if (window.openItem) {
            window.hideTooltip(); // Hide tooltip if it was showing
            window.openItem(item);
        }
    });

    // --- TOOLTIP HANDLERS ---
    div.addEventListener('mouseenter', (e) => {
        if (window.showTooltip) window.showTooltip(e, item);
    });
    div.addEventListener('mousemove', (e) => {
        if (window.updateTooltipPos) window.updateTooltipPos(e);
    });
    div.addEventListener('mouseleave', () => {
        if (window.hideTooltip) window.hideTooltip();
    });

    return div;
}

// Populate the visual scroll track
async function initVisualGrid() {
    if (!visualGrid) return;

    let allItems = [];
    try {
        const [gRes, aRes] = await Promise.all([
            fetch('g/index.json'),
            fetch('a/index.json')
        ]);
        const gData = await gRes.json();
        const aData = await aRes.json();
        allItems = [...gData, ...aData];
    } catch (e) {
        console.error("Failed to load visual grid items", e);
        return;
    }

    let displayList = [];
    if (allItems.length > 0) {
        // Ensure we have enough items to fill the view
        while (displayList.length < 40) {
            displayList = [...displayList, ...allItems];
        }
        // Double the list to create a perfect seamless loop for the translateY(-50%) animation
        displayList = [...displayList, ...displayList];
    }

    const fragment = document.createDocumentFragment();
    displayList.forEach(item => {
        fragment.appendChild(generateGridItem(item));
    });

    visualGrid.innerHTML = ''; // Clear just in case
    visualGrid.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', initVisualGrid);
