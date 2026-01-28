const isChromebook = /CrOS/.test(navigator.userAgent);
const spaceWords = ["Solar", "Lunar", "Nebula", "Orbit", "Gravity", "Cosmic", "Galaxy", "Physics"];

const featuredItem = {
    id: "movie-theater",
    title: "Nebula Theater",
    description: "Watch thousands of movies and TV shows.",
    icon: "fa-solid fa-film",
    link: "/movie", 
    isExternal: true
};

const library = [
        {
        type: "group",
        title: "Minecraft Collection",
        description: "All Eaglercraft versions (Classic 0.30, 1.5.2, 1.8.8, 1.12.2, etc).",
        icon: "mc-thumbnail.jpg",
        category: "html5",
        items: [
            { 
                id: "eaglercraft-1.12.2", 
                title: "Minecraft 1.12.2 (JS)", 
                description: "1.12, the release of the [World of Color Update](https://minecraft.wiki/w/World_of_Color_Update), released on June 7, 2017.", 
                icon: "thumbnail.png",
                category: "html5",
                creator: {
                    name: "PeytonPlayz595",
                    link: "https://discord.gg/nmKB4KRUMy",
                    icon: "fa-brands fa-discord"
                }
            },
            { 
                id: "eaglercraft-1.12.2-wasm", 
                title: "Minecraft 1.12.2 (WASM-GC)", 
                description: "1.12, the release of the [World of Color Update](https://minecraft.wiki/w/World_of_Color_Update), released on June 7, 2017.", 
                icon: "thumbnail.png",
                category: "html5",
                creator: {
                    name: "PeytonPlayz595",
                    link: "https://discord.gg/nmKB4KRUMy",
                    icon: "fa-brands fa-discord"
                }
            },
            { 
                id: "eaglercraftx-1.8.8", 
                title: "Minecraft 1.8.8 (JS)", 
                description: "1.8, the release of the [Bountiful Update](https://minecraft.wiki/w/Bountiful_Update) released on September 2, 2014.", 
                icon: "thumbnail.png",
                category: "html5",
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
                category: "html5",
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
                category: "html5",
                creator: {
                    name: "Ayunami2000 / lax1dude",
                    link: "https://eaglercraft.com/",
                    icon: "fa-solid fa-globe"
                }
            },
            { 
                id: "eaglercraft-alpha-1.2.6", 
                title: "Minecraft Alpha 1.2.6 (JS)", 
                description: "The final alpha bug-fix release of the legendary sandbox survival game developed by [Mojang Studios](https://minecraft.wiki/w/Mojang_Studios).", 
                icon: "thumbnail.png",
                category: "html5",
                creator: {
                    name: "Colbster937",
                    link: "https://github.com/EaglerPorts/a1.2.6",
                    icon: "fa-brands fa-github"
                }
            },
            { 
                id: "eaglercraft-alpha-1.2.6-wasm", 
                title: "Minecraft Alpha 1.2.6 (WASM-GC)", 
                description: "The final alpha bug-fix release of the legendary sandbox survival game developed by [Mojang Studios](https://minecraft.wiki/w/Mojang_Studios).", 
                icon: "thumbnail.png",
                category: "html5",
                creator: {
                    name: "Colbster937",
                    link: "https://github.com/EaglerPorts/a1.2.6",
                    icon: "fa-brands fa-github"
                }
            },
            { 
                id: "eaglercraft-indev-20100223", 
                title: "Minecraft Indev 20100223 (JS)", 
                description: "Indev 20100223, the version that introduced [paintings](https://minecraft.wiki/w/Java_Edition_Indev_20100223), released on February 23, 2010.", 
                icon: "thumbnail.png",
                category: "html5",
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
                category: "html5",
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
                category: "html5",
                creator: {
                    name: "PeytonPlayz595",
                    link: "https://github.com/PeytonPlayz595",
                    icon: "fa-brands fa-github"
                }
            }
        ]
    },
    {
        type: "group",
        title: "Geometry Dash Collection",
        description: "All Geometry Dash versions including fan games. (Sub Zero, Lite, World, etc).",
        icon: "gd-thumbnail.jpg",
        category: "html5",
        items: [
            {
                id: "gd-lite",
                title: "Geometry Dash Lite",
                description: "The free starter edition of the iconic rhythm-based platformer with the first 13 levels.",
                icon: "thumbnail.jpg",
                category: "html5",
                creator: {
                    name: "geometrydashlite.io",
                    link: "https://geometrydashlite.io",
                    icon: "fa-solid fa-globe"
                }
            },
            {
                id: "gd-world",
                title: "Geometry Dash World",
                description: "The mobile-exclusive rhythm platformer expansion with four mega-levels.",
                icon: "thumbnail.webp",
                category: "html5",
                creator: {
                    name: "geometrydashlite.io",
                    link: "https://geometrydashlite.io",
                    icon: "fa-solid fa-globe"
                }
            },
            {
                id: "gd-subzero",
                title: "Geometry Dash SubZero",
                description: "The icy spin-off rhythm platformer packed with three exclusive mega-levels.",
                icon: "thumbnail.webp",
                category: "html5",
                creator: {
                    name: "geometrydashlite.io",
                    link: "https://geometrydashlite.io",
                    icon: "fa-solid fa-globe"
                }
            },
            {
                id: "gd-breeze",
                title: "Geometry Dash Breeze",
                description: "A popular fan-made modification of the classic rhythm platformer that introduces exclusive levels, fresh icon sets, and vibrant visual effects.",
                icon: "thumbnail.png",
                category: "html5",
                creator: {
                    name: "geometrydashlite.io",
                    link: "https://geometrydashlite.io",
                    icon: "fa-solid fa-globe"
                }
            },
            {
                id: "gd-vibes",
                title: "Geometry Vibes",
                description: "A vibrant fan-made rhythm platformer channeling Geometry Dash vibes with the wave gamemode.",
                icon: "thumbnail.jpg",
                category: "html5",
                creator: {
                    name: "gameVgames",
                    link: "https://www.gamevgames.com/game/geometry-vibes",
                    icon: "fa-solid fa-globe"
                }
            },
            {
                id: "gj",
                title: "Geometry Jump",
                description: "The infamous, web-exclusive bootleg of the popular rhythm platformer, widely recognized as the school computer version.",
                icon: "thumbnail.png",
                category: "html5"
            }
        ]
    },
    {
        type: "group",
        title: "FNaF Collection",
        description: "All FNaF versions (1, 2, 3, 4, Ultimate Custom Night, etc).",
        icon: "fnaf-thumbnail.jpg",
        category: "html5",
        items: [
            { 
                id: "fnaf", 
                title: "Five Nights at Freddy's", 
                description: "Play as a night security guard at Freddy Fazbear's Pizza, surviving five terrifying nights by monitoring cameras, closing doors, and managing flashlight power against animatronics.", 
                icon: "thumbnail.jpg",
                category: "html5",
                creator: {
                    name: "genizy",
                    link: "https://github.com/genizy/fnaf",
                    icon: "fa-brands fa-github"
                }
            },
            { 
                id: "fnaf-2", 
                title: "Five Nights at Freddy's 2", 
                description: "No doors this time—use a flashlight on vents, wind a music box remotely, and don a Freddy mask to fool aggressive animatronics.", 
                icon: "thumbnail.jpg",
                category: "html5",
                creator: {
                    name: "genizy",
                    link: "https://github.com/genizy/fnaf",
                    icon: "fa-brands fa-github"
                }
            },
            {
                id: "fnaf-3", 
                title: "Five Nights at Freddy's 3", 
                description: "Maintain systems against malfunctioning vents, cameras, and audio lures while hallucination phantoms disrupt you and Springtrap hunts silently.", 
                icon: "thumbnail.jpg",
                category: "html5",
                creator: {
                    name: "genizy",
                    link: "https://github.com/genizy/fnaf",
                    icon: "fa-brands fa-github"
                }
            },
            {
                id: "fnaf-4", 
                title: "Five Nights at Freddy's 4", 
                description: "Pure nightmare fuel in a child's bedroom. Listen for breath sounds to flash the closet and hallway, wind the music box via flashlight, and fend off animatronics in close-quarters terror.", 
                icon: "thumbnail.jpg",
                category: "html5",
                creator: {
                    name: "genizy",
                    link: "https://github.com/genizy/fnaf",
                    icon: "fa-brands fa-github"
                }
            },
            {
                id: "fnaf-4-halloween", 
                title: "Five Nights at Freddy's 4: Halloween Edition", 
                description: "The spine-chilling Halloween-themed edition of [FNaF 4](play?game=fnaf-4), swapping the normal animatronics with horrifying Halloween-themed animatronics.", 
                icon: "thumbnail.jpg",
                category: "html5",
                creator: {
                    name: "genizy",
                    link: "https://github.com/genizy/fnaf",
                    icon: "fa-brands fa-github"
                }
            },
            {
                id: "fnaf-sl", 
                title: "Five Nights at Freddy's: Sister Location", 
                description: "Work at Circus Baby's Entertainment & Rental underground facility as a technician. Navigate Primary Control Office stations via hand-unit, defend against animatronics, play death minigames, and uncover horrifying plot across endings", 
                icon: "thumbnail.jpg",
                category: "html5",
                creator: {
                    name: "genizy",
                    link: "https://github.com/genizy/fnaf",
                    icon: "fa-brands fa-github"
                }
            },
            {
                id: "fnaf-ps", 
                title: "Freddy Fazbear's Pizzeria Simulator", 
                description: "Build your dream pizzeria by day with risky animatronic purchases, then salvage and defend against nocturnal threats.", 
                icon: "thumbnail.jpg",
                category: "html5",
                creator: {
                    name: "genizy",
                    link: "https://github.com/genizy/fnaf",
                    icon: "fa-brands fa-github"
                }
            },
            {
                id: "fnaf-ucn", 
                title: "Ultimate Custom Night", 
                description: "Survive 20/20 mode with 50 selectable animatronics from the FNaF series, managing doors, lights, cameras, global music box, heater, power A/C, and unique mechanics like Dee Dee summons.", 
                icon: "thumbnail.jpg",
                category: "html5",
                creator: {
                    name: "genizy",
                    link: "https://github.com/genizy/fnaf",
                    icon: "fa-brands fa-github"
                }
            },
            {
                id: "fnaf-world",
                title: "FNaF World",
                description: "A quirky chibi-style RPG adventure starring over 48 recruitable animatronics exploring a colorful overworld.",
                icon: "thumbnail.jpg",
                category: "html5",
                creator: {
                    name: "genizy",
                    link: "https://github.com/genizy/fnaf",
                    icon: "fa-brands fa-github"
                }
            }
        ]
    },
    {
        type: "group",
        title: "Bloons Collection",
        description: "All Bloons versions (1, 2, 3, 4, Player Pack, etc).",
        icon: "bloons-thumbnail.jpg",
        category: "flash",
        items: [
            {
                id: "bloons",
                title: "Bloons",
                description: "Adjust your aim, set your power, and launch darts through tricky formations of rubber targets. Utilize special balloons like tacks, bombs, and ice to clear the screen in this addictive flash classic.",
                icon: "thumbnail.png",
                category: "flash"
            },
            {
                id: "bloons-2",
                title: "Bloons 2",
                description: "Travel through different worlds and experiment with new special balloons, including the Reverse Gravity Balloon and the Bee Balloon.",
                icon: "thumbnail.png",
                category: "flash"
            },
            {
                id: "bloons-player-pack",
                title: "Bloons Player Pack 1",
                description: "Features 50 of the best levels created by the original Bloons community.",
                icon: "thumbnail.jpg",
                category: "flash"
            },
            {
                id: "bloons-player-pack-2",
                title: "Bloons Player Pack 2",
                description: "This pack is known for its Rube Goldberg style levels, where hitting one balloon triggers a massive chain reaction of tacks and bombs.",
                icon: "thumbnail.jpg",
                category: "flash"
            },
            {
                id: "bloons-player-pack-3",
                title: "Bloons Player Pack 3",
                description: "Turns up the heat with levels that demand pixel-perfect precision. These stages often feature tight corridors and hidden rubber blocks that require you to find the exact angle to succeed.",
                icon: "thumbnail.jpg",
                category: "flash"
            },
            {
                id: "bloons-player-pack-4",
                title: "Bloons Player Pack 4",
                description: "Many levels here look like pictures (animals, objects) made of balloons, but don't let the cute looks fool you—they are tricky to clear.",
                icon: "thumbnail.jpg",
                category: "flash"
            },
            {
                id: "bloons-player-pack-5",
                title: "Bloons Player Pack 5",
                description: "The festive finale to the player pack series. Originally released as a Christmas special, it features holiday-themed designs and some of the most difficult puzzles in the entire franchise.",
                icon: "thumbnail.jpg",
                category: "flash"
            },
            {
                id: "btd",
                title: "Bloons Tower Defense",
                description: "Instead of solving puzzles, your goal here is to stop waves of balloons from reaching the end of the track.",
                icon: "thumbnail.png",
                category: "flash"
            },
            {
                id: "btd-2",
                title: "Bloons Tower Defense 2",
                description: "This sequel introduces the iconic Boomerang Monkey and the road spikes, giving you more ways to handle the tougher balloon waves (including the dreaded Lead Bloons).",
                icon: "thumbnail.jpg",
                category: "flash"
            },
            {
                id: "btd-3",
                title: "Bloons Tower Defense 3",
                description: "A major leap forward for the series, introducing massive upgrades and new towers like the Spike-o-pult and the Monkey Beacon.",
                icon: "thumbnail.png",
                category: "flash"
            },
            {
                id: "btd-4",
                title: "Bloons TD 4",
                description: "Overhauled the graphics and gameplay mechanics, introducing the upgrade system we know today. Unlock new towers as you rank up, including the Glue Gunner, Ace, and Mortar, and unleash the devastating Sun God temple.",
                icon: "thumbnail.png",
                category: "flash"
            },
            {
                id: "btd-5",
                title: "Bloons TD 5",
                description: "Widely considered the peak of the Flash era for the franchise. It features dual upgrade paths for every tower, special agents, daily challenges, and intense boss bloons like the ZOMG.",
                icon: "thumbnail.jpg",
                category: "flash"
            }
        ]
    },
    { 
        id: "gta-vc", 
        title: "Grand Theft Auto: Vice City", 
        description: "GTA Vice City defines the open-world genre, transporting players to a neon-soaked, 1980s rendition of Miami.", 
        icon: "thumbnail.jpg",
        category: "emulator"
    },
    { 
        id: "polytrack", 
        title: "PolyTrack", 
        description: "A thrilling low-poly racing game heavily inspired by TrackMania, featuring insane loops, jumps, high-speed drifts, and precision driving where every millisecond counts.", 
        icon: "thumbnail.png",
        category: "html5",
        creator: {
            name: "Kodub",
            link: "https://kodub.itch.io/polytrack",
            icon: "fa-brands fa-itch-io"
        }
    },
    { 
        id: "slope", 
        title: "Slope", 
        description: "The ultimate 3D speed run game where you play as a ball dodging red walls going down a slope.", 
        icon: "thumbnail.jpg",
        category: "html5",
        creator: {
            name: "Y8",
            link: "https://github.com/reunbozdo/BlockBlast",
            icon: "fa-brands fa-github"
        }
    },
    { 
        id: "slope-plus", 
        title: "Slope Plus", 
        description: "A modded version of the addictive endless runner [Slope](play?game=slope), packed with extra features like seeded runs for replayable maps, custom games to load maps and set starting speeds.", 
        icon: "thumbnail.jpg",
        category: "html5",
        creator: {
            name: "coweggs",
            link: "https://coweggs.itch.io/slope-plus",
            icon: "fa-brands fa-itch-io"
        }
    },
    { 
        id: "pentablocks", 
        title: "Pentablocks", 
        description: "Maneuver your dot with precise WASD controls through endless barrages of red obstacles in a black void.", 
        icon: "thumbnail.png",
        category: "html5",
        creator: {
            name: "coweggs",
            link: "https://coweggs.itch.io/pentablocks",
            icon: "fa-brands fa-itch-io"
        }
    },
    { 
        id: "minesweeper", 
        title: "Minesweeper", 
        description: "The timeless logic puzzle classic where you uncover a grid of hidden tiles, using numbers to deduce and flag mine locations without detonating any.", 
        icon: "thumbnail.png",
        category: "html5"
    },
    { 
        id: "minesweeper-variation", 
        title: "Minesweeper Variation", 
        description: "A tense twist on classic [Minesweeper](play?game=minesweeper) where every 10 seconds, 3 of your moves get mysteriously reverted, forcing constant adaptation.", 
        icon: "thumbnail.png",
        category: "html5",
        creator: {
            name: "coweggs",
            link: "https://coweggs.itch.io/minesweeper-variation",
            icon: "fa-brands fa-itch-io"
        }
    },
    {
        id: "buckshot-roulette",
        title: "Buckshot Roulette",
        description: " Play Russian roulette with a 12-gauge shotgun. Four enter. One leaves. Roll the dice with your life. Good luck!",
        icon: "thumbnail.jpg",
        category: "html5",
        creator: {
            name: "Mike Klubnika",
            link: "https://mikeklubnika.itch.io/buckshot-roulette",
            icon: "fa-brands fa-itch-io"
        }
    },
    {
        id: "block-blast", 
        title: "Block Blast", 
        description: "An exciting online puzzle game with drag-and-drop Tetris block gameplay.", 
        icon: "thumbnail.jpg",
        category: "html5",
        creator: {
            name: "GreeniYT",
            link: "https://github.com/greeniYT/gug/",
            icon: "fa-brands fa-github"
        }
    },
    { 
        id: "terraria", 
        title: "Terraria", 
        description: "A 2D sandbox action-adventure game, often described as 2D Minecraft.", 
        icon: "thumbnail.jpg",
        category: "html5",
        creator: {
            name: "Mercury Workshop",
            link: "https://terraria.mercurywork.shop/",
            icon: "fa-solid fa-globe"
        }
    },
    { 
        id: "slime-rancher", 
        title: "Slime Rancher", 
        description: "A first-person adventure game. Become a young rancher who ventures to a mysterious planet thousands of light-years from Earth.", 
        icon: "thumbnail.png",
        category: "html5",
        creator: {
            name: "Snubby",
            link: "https://dev.snubby.top/",
            icon: "fa-solid fa-globe"
        }
    },
    { 
        id: "super-mario-64", 
        title: "Super Mario 64", 
        description: "A 3D action-adventure platform game released for the N64.", 
        icon: "thumbnail.png",
        category: "html5",
        creator: {
            name: "Snubby",
            link: "https://github.com/SnubbyOWO/Mario64Offline",
            icon: "fa-brands fa-github"
        }
    },
    { 
        id: "schoolboy-runaway", 
        title: "SchoolBoy Runaway", 
        description: "A thrilling 3D first-person stealth game where you play as a mischievous schoolboy grounded by strict parents for bad grades.", 
        icon: "thumbnail.jpg",
        category: "html5",
        creator: {
            name: "98Corbins",
            link: "https://itch.io/profile/98corbins/",
            icon: "fa-brands fa-itch-io"
        }
    },
    { 
        id: "repo", 
        title: "R.E.P.O.",
        description: "A chaotic online co-op horror game for up to 6 players featuring realistic physics, proximity voice chat, and terrifying monsters.", 
        icon: "thumbnail.jpg",
        category: "html5",
        creator: {
            name: "98Corbins",
            link: "https://itch.io/profile/98corbins/",
            icon: "fa-brands fa-itch-io"
        }
    },
    { 
        id: "people-playground", 
        title: "People Playground", 
        description: "A gruesomely fun 2D sandbox physics simulator where you unleash chaos on over 100 ragdolls with 200+ weapons, explosives, traps, gadgets, and machines.", 
        icon: "thumbnail.jpg",
        category: "html5",
        creator: {
            name: "98Corbins",
            link: "https://itch.io/profile/98corbins/",
            icon: "fa-brands fa-itch-io"
        }
    },
    { 
        id: "thats-not-my-neighbor", 
        title: "That's not my Neighbor", 
        description: "A chilling 1955 apartment horror sim where you man the D.D.D. entrance as a door guard, scrutinizing residents via cameras, files, and photos to spot grotesque doppelgangers mimicking humans.", 
        icon: "thumbnail.png",
        category: "html5",
        creator: {
            name: "Nachosama Games",
            link: "https://store.steampowered.com/app/3431040/Thats_not_my_Neighbor/",
            icon: "fa-brands fa-steam"
        }
    },
    { 
        id: "ultrakill", 
        title: "ULTRAKILL", 
        description: "A blistering retro FPS where blood is your fuel—slaughter demons in Hell as V1, a machine that thrives on fresh gore.", 
        icon: "thumbnail.jpg",
        category: "html5",
        creator: {
            name: "98Corbins",
            link: "https://itch.io/profile/98corbins/",
            icon: "fa-brands fa-itch-io"
        }
    },
    { 
        id: "burrito-bison", 
        title: "Burrito Bison", 
        description: "Trapped in a world ruled by gummy bears, your only escape is to launch yourself from a wrestling ring and bounce your way out of Candy Land.", 
        icon: "thumbnail.jpg",
        category: "html5",
        creator: {
            name: "Juicy Beast Studio",
            link: "https://burritobison.com",
            icon: "fa-solid fa-globe"
        }
    },
    { 
        id: "toss-the-turtle", 
        title: "Toss the Turtle", 
        description: "Use a massive cannon to fire a helpless turtle into the atmosphere, then keep him airborne by shooting him with pistols, machine guns, and rocket launchers.", 
        icon: "thumbnail.jpg",
        category: "flash",
        creator: {
            name: "Echo",
            link: "https://3kh0.net",
            icon: "fa-solid fa-globe"
        }
    },
    {
        id: "kitten-cannon",
        title: "Kitten Cannon",
        description: "Simple yet brutal game challenges you to fire a kitten from a cannon as far as possible.", 
        icon: "thumbnail.webp",
        category: "flash",
        creator: {
            name: "BurstStudio",
            link: "https://www.newgrounds.com/portal/view/228520",
            icon: "fa-solid fa-globe"
        }
    },
    {
        id: "hollow-knight",
        title: "Hollow Knight",
        description: "A critically acclaimed 2D Metroidvania that invites you to explore the twisting caverns of a ruined kingdom called Hallownest.",
        icon: "thumbnail.jpg",
        category: "html5",
        creator: {
            name: "bog",
            link: "https://github.com/aukak/hollow-knight",
            icon: "fa-brands fa-github"
        }
    },
    {
        id: "buildnow-gg",
        title: "BuildNow GG",
        description: "A fast-paced third-person tactical shooter that focuses heavily on building mechanics.",
        icon: "thumbnail.jpg",
        category: "html5",
        creator: {
            name: "BattleLab",
            link: "https://www.crazygames.com/game/buildnow-gg",
            icon: "fa-solid fa-globe"
        }
    },
    {
        id: "nautilusos",
        title: "NautilusOS",
        description: "A sophisticated webtop that runs entirely within your browser. It simulates a full desktop environment, complete with a taskbar, custom apps, and integrated applications like a terminal, Gemini AI, and more.",
        icon: "thumbnail.png",
        category: "app",
        creator: {
            name: "Nautilus Labs",
            link: "https://github.com/nautilus-os/NautilusOS",
            icon: "fa-brands fa-github"
        }
    },
    {
        id: "helios",
        title: "Helios Proxy",
        description: "A powerful, web proxy designed to function as a browser within a browser. Created to bypass restrictive admin censorship and spyware-ridden school networks.",
        icon: "thumbnail.png",
        category: "app",
        creator: {
            name: "dinguschan",
            link: "https://github.com/dinguschan-owo/Helios",
            icon: "fa-brands fa-github"
        }
    },
    {
        id: "tapper",
        title: "Tapper",
        description: "The classic arcade test of reflexes and multitasking. You play as a bartender who must frantically serve frothy mugs of root beer to waves of thirsty customers.",
        icon: "thumbnail.png",
        category: "emulator",
        creator: {
            name: "Marvin Glass and Associates",
            link: "https://en.wikipedia.org/wiki/Marvin_Glass_and_Associates",
            icon: "fa-solid fa-globe"
        }
    },
    {
        id: "infinite-craft",
        title: "Infinite Craft",
        description: "You start with just four basic elements—Water, Fire, Earth, and Wind—and combine them to discover new items, concepts, pop culture icons, and even entire universes.",
        icon: "thumbnail.png",
        category: "html5",
        creator: {
            name: "Neal",
            link: "https://neal.fun/infinite-craft/",
            icon: "fa-solid fa-globe"
        }
    }
];
