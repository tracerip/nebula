import { featuredItem, library } from './games.js';

const visualGrid = document.getElementById('visual-grid');

// Utility to create HTML from string
function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

// Generate the simple grid item (image only)
// Generate the simple grid item (image only)
function generateGridItem(item) {
    // If thumbnail is emoji, create a colored box with emoji
    if (item.thumbnail && (item.thumbnail.startsWith('http') || item.thumbnail.includes('/') || item.thumbnail.includes('.'))) {
        return `
            <div class="grid-item">
                <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
            </div>
        `;
    } else {
        return `
            <div class="grid-item" style="display:flex;align-items:center;justify-content:center;font-size:3rem;">
                ${item.thumbnail || '🎮'}
            </div>
        `;
    }
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

    // Filter out items without proper image thumbnails for the visual grid if desired,
    // or just let them render as blocks. User said "get all images", so maybe prioritize images.
    // Let's filter for image-based thumbnails to keep the visual grid looking 3D/pretty.
    // actually user said "get all the images" implying extract image urls.
    // But let's just use all items, maybe some apps have image thumbnails.

    // We need enough items to create a tall column that scrolls (approx 24-30 items)
    // User reported blank spaces, so let's increase the count significantly to ensure
    // the track is always full regardless of screen height or scroll speed.
    let displayList = [];
    if (allItems.length > 0) {
        // Ensure at least 60 items or enough to cover large screens 2x over
        while (displayList.length < 60) {
            displayList = displayList.concat(allItems);
        }
    }

    const fragment = document.createDocumentFragment();
    displayList.forEach(item => {
        fragment.appendChild(createElementFromHTML(generateGridItem(item)));
    });

    visualGrid.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', initVisualGrid);
