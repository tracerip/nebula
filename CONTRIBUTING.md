# Contributing to Nebula

First off, thanks for taking the time to contribute! We welcome new games to expand the library.

## 🚀 How to Add a New Game

Adding a game to Nebula involves four main steps: uploading the game files, creating a metadata text file, registering the game in the main script, and updating the sitemap.

### 1. Folder Structure

Navigate to the `games/` directory. Create a new folder with a unique **ID** for your game. This ID must be URL-friendly (lowercase, hyphens instead of spaces).

*Example:* `games/slope-2`

Inside this folder, you must have:
1.  **`index.html`**: The entry point for the game source code.
2.  **`description.txt`**: A text file for detailed info and SEO (format below).
3.  **`thumbnail.png`** (or other file formats): The image used for the grid card (not required if using an emoji).
4.  **Game Assets**: All other scripts/styles required for the game to run.

### 2. The Metadata File (`description.txt`)

We use a specific text format to dynamically load the "Description" and "Controls" sections on the play page, as well as hidden SEO keywords.

Create a file named `description.txt` inside your game folder. Use the `#` character to denote section headers. The parser looks for **Description**, **Controls**, and **SEO**.

**Template:**
```text
# Description
Write a detailed description of the game here. This is what appears in the "Description" box below the game frame.

You can use multiple lines. Link markdown [Text](url) is supported.

# Controls
WASD - Move
Space - Jump

# SEO
slope game, 3d runner, unity games, unblocked speed run
```

### 3. Registering the Game

Open `assets/script.js`. You will see a `games` array at the top of the file. You need to add a new object to this array.

**The Object Structure:**

```javascript
{ 
    id: "folder-name",          // Must match the folder name in games/
    title: "Game Title",        // Displayed on the card and tab
    description: "Short text.", // A short blurb (1 sentence) for the grid card
    icon: "thumbnail.png",      // Filename inside the game folder OR an Emoji
    
    // Optional: Adds a button linking to the developer next to the "Raw" button
    creator: {
        name: "Developer Name",
        link: "https://github.com/developer",
        icon: "fa-brands fa-github" // FontAwesome Class
    }
}
```

#### Example A: Using an Image Thumbnail & Creator
If you have a `thumbnail.jpg` inside `games/my-cool-game/`:

```javascript
{ 
    id: "my-cool-game", 
    title: "My Cool Game", 
    description: "An awesome adventure game.", 
    icon: "thumbnail.jpg",
    creator: {
        name: "Rob Kay",
        link: "https://twitter.com/robkay",
        icon: "fa-brands fa-twitter"
    }
}
```

#### Example B: Using an Emoji Icon (No Creator)
If you don't have an image or creator info, you can omit the creator block and use an emoji:

```javascript
{ 
    id: "retro-pong", 
    title: "Retro Pong", 
    description: "Classic arcade fun.", 
    icon: "🏓" 
}
```

**Common Icons:**
*   Discord: `fa-brands fa-discord`
*   GitHub: `fa-brands fa-github`
*   Twitter/X: `fa-brands fa-x-twitter`
*   YouTube: `fa-brands fa-youtube`
*   Generic Website: `fa-solid fa-globe`
*   Generic User: `fa-solid fa-user`

### 4. Updating the Sitemap

To ensure search engines index this specific game URL correctly, you must add it to `sitemap.xml` located in the root directory.

Open `sitemap.xml` and add a new `<url>` block. Make sure to replace `game-id` with the folder/id name.

```xml
<url>
    <loc>https://nebula.trace.rip/play?game=YOUR-GAME-ID</loc>
    <lastmod>2025-01-23</lastmod> <!-- Use today's date -->
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
</url>
```

---

## 🧪 Testing

1.  Start a local server (e.g., using VS Code Live Server).
    *   *Note: It's not recommended to just double-click the HTML file. Javascript fetches are blocked by CORS on `file://` protocols.*
2.  Navigate to the homepage.
3.  Ensure your card appears in the grid with the correct image/emoji.
4.  Click the card. Ensure the game loads in the iframe.
5.  Check below the game to see if your Description and Controls loaded correctly from the text file.
6.  If you added a creator, check that the button appears next to "Raw" and links to the correct URL.