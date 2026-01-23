# Contributing to Nebula

First off, thanks for taking the time to contribute! We welcome new games to expand the library.

## 🚀 How to Add a New Game

Adding a game to Nebula involves three main steps: uploading the game files, creating a metadata text file, and registering the game in the main script.

### 1. Folder Structure

Navigate to the `games/` directory. Create a new folder with a unique **ID** for your game. This ID must be URL-friendly (lowercase, hyphens instead of spaces).

*Example:* `games/slope-2`

Inside this folder, you must have:
1.  **`index.html`**: The entry point for the game.
2.  **`description.txt`**: A text file for detailed info and SEO (format below).
3.  **`thumbnail.png`** (or other file formats): The image used for the grid card (not required if using an emoji).
4.  **Game Assets**: All other scripts/styles required for the game to run.

### 2. The Metadata File (`description.txt`)

We use a specific text format to dynamically load the "Description" and "Controls" sections on the play page, as well as hidden SEO keywords.

Create a file named `description.txt` inside your game folder. Use the `#` character to denote section headers. The parser looks for **Description**, **Controls**, and **SEO**.

**Template:**
```text
# Description
Write a detailed description of the game here. This is what appears in the "Description" box below the game frame. You can use multiple lines.

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
    icon: "thumbnail.png"       // Filename inside the game folder OR an Emoji
}
```

#### Example A: Using an Image Thumbnail
If you have a `thumbnail.jpg` inside `games/my-cool-game/`:

```javascript
{ 
    id: "my-cool-game", 
    title: "My Cool Game", 
    description: "An awesome adventure game.", 
    icon: "thumbnail.jpg"
}
```

#### Example B: Using an Emoji Icon
If you don't have an image, you can simply paste an emoji string. The system automatically detects if it is not a file extension:

```javascript
{ 
    id: "retro-pong", 
    title: "Retro Pong", 
    description: "Classic arcade fun.", 
    icon: "🏓" 
}
```

---

## 🧪 Testing

1.  Start a local server (e.g., using VS Code Live Server).
    *   *Note: It's not recommended to just open the HTML file. If it shows `Cannot GET /play` in the URL make sure to set from `play` to `play.html`*
2.  Navigate to the homepage.
3.  Ensure your card appears in the grid with the correct image/emoji.
4.  Click the card. Ensure the game loads in the iframe.
5.  Check below the game to see if your Description and Controls loaded correctly from the text file.