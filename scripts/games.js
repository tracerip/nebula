/* Data Source for Nebula Launcher */

export const featuredItem = {
    id: "feat-001",
    type: "game",
    title: "Aether Ascendancy",
    description: "Explore the infinite skies in this high-octane strategy RPG. Command your fleet, build your city in the clouds, and dominate the Aether.",
    thumbnail: "assets/images/hero.png", // Reusing hero image for the featured card background
    category: "Strategy RPG",
    creator: {
        name: "Studio Mithril",
        icon: "https://api.dicebear.com/7.x/identicon/svg?seed=Mithril",
        link: "#"
    },
    isExternal: false,
    url: "/games/aether-ascendancy"
};

export const library = [
    {
        id: "game-001",
        type: "game",
        title: "Neon Overdrive",
        description: "High-speed cyberpunk racing on rain-slicked streets. Customize your ride and outrun the law.",
        thumbnail: "assets/images/game3.png",
        category: "Racing",
        creator: {
            name: "CyberCore",
            icon: "https://api.dicebear.com/7.x/identicon/svg?seed=Cyber",
            link: "#"
        },
        url: "/games/neon-overdrive"
    },
    {
        id: "game-002",
        type: "game",
        title: "Shadow & Steel",
        description: "A dark fantasy RPG set in the cursed forests of Aethelia. Master magic and blade.",
        thumbnail: "assets/images/game2.png",
        category: "RPG",
        creator: {
            name: "IronWorks",
            icon: "https://api.dicebear.com/7.x/identicon/svg?seed=Iron",
            link: "#"
        },
        url: "/games/shadow-steel"
    },
    {
        id: "game-003",
        type: "game",
        title: "Sky City Builder",
        description: "Relaxing city building sim in the clouds. Manage resources and keep your citizens happy.",
        thumbnail: "assets/images/game1.png",
        category: "Simulation",
        creator: {
            name: "CloudNine",
            icon: "https://api.dicebear.com/7.x/identicon/svg?seed=Cloud",
            link: "#"
        },
        url: "/games/sky-city"
    },
    {
        id: "group-001",
        type: "group",
        title: "Retro Collection",
        description: "A curated collection of pixel-perfect classics from the golden age of arcade gaming.",
        thumbnail: "assets/images/game3.png", // Reusing for demo
        category: "Collection",
        items: [
            { id: "retro-1", title: "Pixel Pong" },
            { id: "retro-2", title: "Space Invaders Remake" },
            { id: "retro-3", title: "Pac-Man Infinite" }
        ]
    },
    {
        id: "game-004",
        type: "game",
        title: "Void Drifters",
        description: "Multiplayer space combat. Team up with friends and conquer the void.",
        thumbnail: "assets/images/game1.png",
        category: "Multiplayer",
        creator: {
            name: "VoidSoft",
            icon: "https://api.dicebear.com/7.x/identicon/svg?seed=Void",
            link: "#"
        },
        url: "/games/void-drifters"
    }
];
