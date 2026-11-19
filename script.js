const globalCounterDisplay = document.getElementById('global-counter');
const mcStatusMsg = document.getElementById('mc-status-msg');

const loreHeading = document.getElementById('lore-heading');
const loreSub = document.getElementById('lore-sub');
const loreBody = document.getElementById('lore-body');

const slideTitleText = document.getElementById('slide-title');
const slideDescText = document.getElementById('slide-desc');

const genrePanelTitleText = document.getElementById('genre-panel-title');
const genrePanelSubText = document.getElementById('genre-panel-sub');
const genrePanelBodyText = document.getElementById('genre-panel-body');

const foundMCs = new Set();
const totalMCs = 7;

const hiddenMCCards = document.querySelectorAll('.hidden-mc');
hiddenMCCards.forEach(mc => {
    mc.addEventListener('click', () => {
        const mcName = mc.getAttribute('data-mc-name');
        if (!foundMCs.has(mcName)) {
            foundMCs.add(mcName);
            mc.classList.add('mc-found');
            if (globalCounterDisplay) {
                globalCounterDisplay.innerText = foundMCs.size;
            }
            if (mcStatusMsg) {
                if (foundMCs.size === totalMCs) {
                    mcStatusMsg.innerText = "All 7 MCs Found! True Anime Fan!";
                } else {
                    mcStatusMsg.innerText = `You found ${mcName}!`;
                }
            }
        } else if (mcStatusMsg) {
            mcStatusMsg.innerText = `Already found ${mcName}!`;
        }
    });
});

const defaultLoreTitle = "";
const defaultLoreSub = "Big Shonen Legends";
const defaultLoreBody = "Naruto, One Piece, and Bleach are famously known as the Big Three. During the early 2000s, these three series dominated the anime industry, breaking global viewership milestones and setting the blueprint for the entire modern supernatural action genre.";

const animeLoreDatabase = {
    naruto: {
        title: "Naruto",
        sub: "Believe it!!!",
        body: "This one is a classic journey about a loud orphan kid that everyone dislikes, but he's determined to become the leader of his ninja village no matter what. The world-building is cool, the fights are legendary, and watching him earn everyone's respect is honestly pretty moving."
    },
    onepiece: {
        title: "One Piece",
        sub: "Find the Treasure!!!",
        body: "An absolute giant of a story about a rubber boy named Luffy who sets out to sea to find a legendary treasure and become the Pirate King. It looks goofy at first, but the emotional moments hit super hard and the crew dynamic is unmatched. It is incredibly long, but once the plot gets going, you get totally sucked into the adventure."
    },
    bleach: {
        title: "Bleach",
        sub: "Bankai!!!",
        body: "This one focuses on Ichigo, an edgy high school student who can see ghosts and accidentally steals the powers of a Soul Reaper to protect his family. It has some of the coolest character designs and weapon transformations from the early 2000s era. The music and style are amazing, making it a great pick if you love pure supernatural action."
    }
};

const slideshowContentDatabase = [
    {
        title: "Gurren Lagann",
        desc: "In a world where humanity is forced to live in deep subterranean villages, a quiet boy named Simon and a boisterous, ambitious man named Kamina unearth a mysterious glowing key and a mini-mecha. Breaking through to the surface, they lead an epic, galaxy-scaling rebellion against the tyrannical Beastmen to claim absolute freedom for humanity."
    },
    {
        title: "The God of High School",
        desc: "An action-packed tournament style anime where martial artists from all over South Korea compete to determine the best fighter, uncovering hidden god-like powers along the way with top-tier animation."
    },
    {
        title: "Death Note",
        desc: "A high-stakes psychological thriller following Light Yagami, a brilliant high school student who discovers a supernatural notebook that grants him the power to kill anyone whose name he writes in it."
    },
    {
        title: "Attack on Titan",
        desc: "A dark fantasy where humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans. A masterpiece of mystery, plot twists, and survival."
    },
    {
        title: "Solo Leveling",
        desc: "In a world where hunters must battle deadly monsters to protect mankind, Sung Jinwoo, the weakest hunter of all mankind, finds himself in a struggle for survival inside a double dungeon. After overcoming its trials, he awakens with a unique leveling system that allows him to grow infinitely stronger."
    }
];

const genresContentDatabase = {
    fma: {
        title: "Action & Shonen",
        sub: "Fullmetal Alchemist (FMA)",
        body: "Unleash your power. Dive into high-octane battles, legendary power systems, and moving character growth arcs built on deep sacrifice and determination."
    },
    opm: {
        title: "Seinen Matrix",
        sub: "One Punch Man (OPM)",
        body: "Darker themes for deeper minds. Explores intense psychological landscapes, mature subversion tropes, and gorgeous layout art styles matching high industry standards."
    },
    codegeass: {
        title: "Sci-Fi & Mecha",
        sub: "Code Geass",
        body: "Vast tactical landscapes and machine systems. Follows master strategists maneuvering massive mech suit models across dangerous sociopolitical battlefields."
    },
    yourname: {
        title: "Drama & Romance",
        sub: "Your Name. (2016 Film)",
        body: "Deep emotional threads and destiny across space and time. A stunning cinematic masterpiece exploring love, connections, and memories separation."
    }
};

const defaultGenreTitle = "Explore Genres";
const defaultGenreSub = "Pick a Category";
const defaultGenreBody = "Hover over any of the four massive panels on the left to dynamically explore different anime styles, sub-genres, and iconic layout themes.";

if (genrePanelTitleText && genrePanelSubText && genrePanelBodyText) {
    genrePanelTitleText.innerText = defaultGenreTitle;
    genrePanelSubText.innerText = defaultGenreSub;
    genrePanelBodyText.innerText = defaultGenreBody;
}

const choiceCards = document.querySelectorAll('.choice-card');
choiceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const key = card.getAttribute('data-anime-lore');
        if (animeLoreDatabase[key]) {
            loreHeading.innerText = animeLoreDatabase[key].title;
            loreSub.innerText = animeLoreDatabase[key].sub;
            loreSub.classList.remove('lore-default-title');
            loreBody.innerText = animeLoreDatabase[key].body;
        }
    });

    card.addEventListener('mouseleave', () => {
        loreHeading.innerText = defaultLoreTitle;
        loreSub.innerText = defaultLoreSub;
        loreSub.classList.add('lore-default-title');
        loreBody.innerText = defaultLoreBody;
    });
});

const slidesReel = document.getElementById('slides-reel');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlideIndex = 0;
let slideInterval;

function updateSlides(index) {
    dots[currentSlideIndex].classList.remove('active');
    currentSlideIndex = index;
    dots[currentSlideIndex].classList.add('active');

    if (slidesReel) {
        slidesReel.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    }

    if (slideTitleText && slideDescText && slideshowContentDatabase[currentSlideIndex]) {
        slideTitleText.innerText = slideshowContentDatabase[currentSlideIndex].title;
        slideDescText.innerText = slideshowContentDatabase[currentSlideIndex].desc;
    }
}

function nextSlide() {
    let nextIndex = (currentSlideIndex + 1) % slides.length;
    updateSlides(nextIndex);
}

function startSlideTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 10000); 
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const targetIndex = parseInt(dot.getAttribute('data-index'));
        updateSlides(targetIndex);
        startSlideTimer(); 
    });
});

startSlideTimer();

const genreCards = document.querySelectorAll('.massive-genre-card');
const previewImage = document.getElementById('preview-image');
const battleFrame = document.getElementById('battle-frame');

const genreImagesDatabase = {
    fma: 'images/fma.webp.jpg',
    opm: 'images/opm.webp.jpg',
    codegeass: 'images/codegeass.webp.jpg',
    yourname: 'images/yourname.webp.jpg'
};

genreCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const genreKey = card.getAttribute('data-genre-key');
        if (genresContentDatabase[genreKey] && genrePanelTitleText && genrePanelSubText && genrePanelBodyText) {
            genrePanelTitleText.innerText = genresContentDatabase[genreKey].title;
            genrePanelSubText.innerText = genresContentDatabase[genreKey].sub;
            genrePanelBodyText.innerText = genresContentDatabase[genreKey].body;
        }

        if (genreImagesDatabase[genreKey] && previewImage && battleFrame) {
            previewImage.src = genreImagesDatabase[genreKey];
            battleFrame.classList.remove('animate-pop');
            void battleFrame.offsetWidth; 
            battleFrame.classList.add('animate-pop');
        }
    });
});