// -----------------------------
// DAILY SEED + RANDOMNESS
// -----------------------------
function getDailySeed() {
    const today = new Date();
    return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
}

function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// -----------------------------
// CHAOS EVENTS
// -----------------------------
const commonEvents = [
    "You accidentally started a cult.",
    "You found $20 on the ground.",
    "Your phone fell but didn't crack.",
    "You got chased by a goose.",
    "You unlocked god-tier luck.",
    "You said 'trust me' and it actually worked.",
    "You dodged a disaster without realizing it.",
    "You became the main character today.",
    "You glitched out of social awkwardness.",
    "You rolled a secret +10 charisma buff.",
    "You accidentally speedran your morning routine.",
    "You got jump‑scared by your own reflection.",
    "You remembered something embarrassing from 5 years ago.",
    "You leveled up in social confidence for 12 minutes.",
    "You dodged a group chat argument like a ninja.",
    "You found a snack you forgot you bought.",
    "You avoided a cringe moment by pure luck.",
    "You got a random burst of motivation at the worst time.",
    "You unlocked temporary main‑character lighting.",
    "You successfully pretended to understand the assignment."

];

const rareEvents = [
    "You triggered a minor timeline shift.",
    "You gained temporary plot armor.",
    "You avoided a catastrophe by pure instinct.",
    "You unlocked a forbidden chaos multiplier.",
    "You caused a butterfly effect somewhere else.",
    "You briefly existed in two timelines at once.",
    "You received a cryptic message from future‑you.",
    "You glitched through an awkward conversation flawlessly.",
    "You triggered a hidden luck algorithm.",
    "You caused a minor cosmic ripple without noticing.",
    "You gained +50 intuition for one important decision.",
    "You unknowingly avoided a parallel‑universe disaster.",
    "You tapped into forbidden probability.",
    "You rolled a rare chaos resonance.",
    "You momentarily became an NPC in someone else's story."

];

const legendaryEvents = [
    "You achieved MAXIMUM CHAOS.",
    "You broke the simulation for 0.2 seconds.",
    "Reality bent slightly in your favor.",
    "You rolled a once-in-a-lifetime chaos surge.",
    "You became the chosen agent of entropy.",
    "You achieved ABSOLUTE CHAOS SYNCHRONIZATION.",
    "You bent probability so hard it apologized.",
    "You unlocked a secret developer‑only luck tier.",
    "You caused a cosmic event that will be studied for centuries.",
    "You rolled a mathematically impossible outcome.",
    "You briefly controlled the simulation's source code.",
    "You became the focal point of universal entropy.",
    "You triggered a legendary chaos cascade.",
    "You reached the mythical 0.0001% luck bracket.",
    "You shattered the boundary between fate and randomness."

    
];

function getChaosEvent(bonusRollNumber = 0) {
    if (bonusRollNumber > 0) {
        const r = Math.random();

        if (bonusRollNumber === 3) {
            if (r < 0.10) return legendaryEvents[Math.floor(Math.random() * legendaryEvents.length)];
            if (r < 0.30) return rareEvents[Math.floor(Math.random() * rareEvents.length)];
            return commonEvents[Math.floor(Math.random() * commonEvents.length)];
        }

        if (r < 0.01) return legendaryEvents[Math.floor(Math.random() * legendaryEvents.length)];
        if (r < 0.10) return rareEvents[Math.floor(Math.random() * rareEvents.length)];
        return commonEvents[Math.floor(Math.random() * commonEvents.length)];
    }

    const seed = getDailySeed();
    const r = seededRandom(seed + 3);

    if (r < 0.01) return legendaryEvents[Math.floor(seededRandom(seed + 10) * legendaryEvents.length)];
    if (r < 0.10) return rareEvents[Math.floor(seededRandom(seed + 11) * rareEvents.length)];
    return commonEvents[Math.floor(seededRandom(seed + 12) * commonEvents.length)];
}

// -----------------------------
// CHAOS GENERATOR
// -----------------------------
function generateDailyChaos(bonusRollNumber = 0) {
    const seed = getDailySeed();
    const luck = Math.floor(seededRandom(seed) * 100);
    const risk = Math.floor(seededRandom(seed + 1) * 100);
    const stability = Math.floor(seededRandom(seed + 2) * 100);

    const chaosScore = Math.floor((luck + risk + (100 - stability)) / 3);
    const chaosEvent = getChaosEvent(bonusRollNumber);

    return { luck, risk, stability, chaosScore, chaosEvent };
}

// -----------------------------
// DOM ELEMENTS
// -----------------------------
const guessInput = document.getElementById("guessInput");
const submitGuessBtn = document.getElementById("submitGuess");
const revealSection = document.getElementById("revealSection");
const shareSection = document.getElementById("shareSection");

const stat1El = document.getElementById("stat1");
const stat2El = document.getElementById("stat2");
const stat3El = document.getElementById("stat3");
const chaosEventEl = document.getElementById("chaosEvent");
const finalScoreEl = document.getElementById("finalScore");
const streakTextEl = document.getElementById("streakText");

const shareButton = document.getElementById("shareButton");
const bonusBtn = document.getElementById("bonusRollButton");

// -----------------------------
// STREAK LOGIC
// -----------------------------
function getStoredStreak() {
    const streak = Number(localStorage.getItem("streak") || 0);
    const lastDate = Number(localStorage.getItem("lastDate") || 0);
    const today = getDailySeed();

    if (lastDate === 0) return 0;
    if (today === lastDate) return streak;
    if (today === lastDate + 1) return streak;

    return 0;
}

function updateStreakOnPlay(isCorrect) {
    const today = getDailySeed();
    const lastDate = Number(localStorage.getItem("lastDate") || 0);
    let streak = Number(localStorage.getItem("streak") || 0);

    if (!isCorrect) {
        // Wrong guess resets streak immediately
        streak = 0;
    } else {
        // Correct guess increases streak instantly
        if (lastDate === today) {
            // Already played today, do nothing
        } else {
            streak += 1;
        }
    }

    localStorage.setItem("streak", streak);
    localStorage.setItem("lastDate", today);

    return streak;
}


// -----------------------------
// REVEAL ANIMATION
// -----------------------------
function animateReveal(chaos, streak, isBonus = false) {
    revealSection.classList.remove("hidden");
    revealSection.classList.add("visible");

    stat1El.textContent = "";
    stat2El.textContent = "";
    stat3El.textContent = "";
    chaosEventEl.textContent = "";
    finalScoreEl.textContent = "";
    streakTextEl.textContent = "";

    setTimeout(() => stat1El.textContent = `Luck: ${chaos.luck}`, 200);
    setTimeout(() => stat2El.textContent = `Risk: ${chaos.risk}`, 500);
    setTimeout(() => stat3El.textContent = `Stability: ${chaos.stability}`, 800);

    setTimeout(() => {
        let eventText = chaos.chaosEvent;
        if (isBonus) eventText += " (Bonus roll)";
        chaosEventEl.textContent = eventText;
    }, 1100);

    setTimeout(() => {
        finalScoreEl.textContent = `Chaos Score: ${chaos.chaosScore}`;
        streakTextEl.textContent = `Streak: ${streak} day${streak === 1 ? "" : "s"}`;
        shareSection.classList.remove("hidden");
    }, 1400);
}

function revealResults() {
    const chaos = generateDailyChaos(0);
    const streak = getStoredStreak() || 1;
    animateReveal(chaos, streak, false);
}

// -----------------------------
// DAILY LOCK
// -----------------------------
function hasPlayedToday() {
    const savedDate = Number(localStorage.getItem("dailyDate") || 0);
    const today = getDailySeed();
    return savedDate === today;
}

function lockToday(guess) {
    const today = getDailySeed();
    localStorage.setItem("dailyGuess", guess);
    localStorage.setItem("dailyDate", today);
    return updateStreakOnPlay();
}

// -----------------------------
// BONUS ROLLS (NO ADS)
// -----------------------------
function getBonusRollsUsed() {
    const today = getDailySeed();
    const savedDate = Number(localStorage.getItem("bonusRollsDate") || 0);

    if (savedDate !== today) {
        localStorage.setItem("bonusRollsUsed", 0);
        localStorage.setItem("bonusRollsDate", today);
        return 0;
    }

    return Number(localStorage.getItem("bonusRollsUsed") || 0);
}

function useBonusRoll() {
    const today = getDailySeed();
    let used = getBonusRollsUsed();
    used += 1;

    localStorage.setItem("bonusRollsUsed", used);
    localStorage.setItem("bonusRollsDate", today);

    return used;
}

function updateBonusButtonUI() {
    const used = getBonusRollsUsed();
    const left = 3 - used;

    if (left <= 0) {
        bonusBtn.textContent = "No Bonus Rolls Left Today";
        bonusBtn.disabled = true;
        return;
    }

    bonusBtn.textContent = `Bonus Roll (${left} left)`;
    bonusBtn.disabled = false;
}

function giveBonusRoll() {
    const used = getBonusRollsUsed();
    const nextRollNumber = used + 1;

    const chaos = generateDailyChaos(nextRollNumber);
    const streak = getStoredStreak() || 1;

    animateReveal(chaos, streak, true);

    useBonusRoll();
    updateBonusButtonUI();
}

// -----------------------------
// EVENT LISTENERS
// -----------------------------
submitGuessBtn.addEventListener("click", () => {
    if (hasPlayedToday()) return;

    const guess = Number(guessInput.value);

    if (!guess || guess < 1 || guess > 100) {
        guessInput.classList.add("shake");
        setTimeout(() => guessInput.classList.remove("shake"), 400);
        return;
    }

    const streak = lockToday(guess);
    const chaos = generateDailyChaos(0);

    animateReveal(chaos, streak, false);

    guessInput.disabled = true;
    submitGuessBtn.disabled = true;
    submitGuessBtn.textContent = "Come back tomorrow";
});

bonusBtn.addEventListener("click", giveBonusRoll);

window.addEventListener("load", () => {
    updateBonusButtonUI();

    if (hasPlayedToday()) {
        guessInput.disabled = true;
        submitGuessBtn.disabled = true;
        submitGuessBtn.textContent = "Come back tomorrow";
        revealResults();
    }
});

// -----------------------------
// SHARE BUTTON
// -----------------------------
shareButton.addEventListener("click", async () => {
    const chaos = generateDailyChaos(0);
    const guess = localStorage.getItem("dailyGuess") || "?";
    const streak = getStoredStreak() || 1;

    const text = `Daily Chaos - ${new Date().toDateString()}
My Guess: ${guess}
Chaos Score: ${chaos.chaosScore}
Event: ${chaos.chaosEvent}
Streak: ${streak} day${streak === 1 ? "" : "s"}

Play here: https://daily-chaos.vercel.app/`;

    try {
        await navigator.clipboard.writeText(text);
        shareButton.textContent = "Copied!";
        setTimeout(() => (shareButton.textContent = "Copy Result"), 1500);
    } catch (e) {
        alert("Result copied. If not, try manually selecting and copying.");
    }
});


// -----------------------------
// TUTORIAL
// -----------------------------
function shouldShowTutorial() {
    return !localStorage.getItem("tutorialSeen");
}

function showTutorial() {
    document.getElementById("tutorialOverlay").classList.remove("hidden");
}

function hideTutorial() {
    document.getElementById("tutorialOverlay").classList.add("hidden");
    localStorage.setItem("tutorialSeen", "true");
}

document.getElementById("closeTutorial").addEventListener("click", hideTutorial);

window.addEventListener("load", () => {
    if (shouldShowTutorial()) {
        showTutorial();
    }
});

// -----------------------------
// BOTTOM BANNER AD
// -----------------------------
function loadBottomBanner() {
    const bannerContainer = document.getElementById("bottomBanner");

    bannerContainer.innerHTML = `
<script>
  atOptions = {
    'key' : 'fdd2690a7ed7720cb91d712d7e7539e0',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
<\/script>
<script src="https://www.highperformanceformat.com/fdd2690a7ed7720cb91d712d7e7539e0/invoke.js"><\/script>
    `;
}

loadBottomBanner();

// -----------------------------
// SECRET RESET SHORTCUT
// -----------------------------
window.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.metaKey && event.code === "Digit0") {
        event.preventDefault();
        localStorage.setItem("bonusRollsUsed", 0);
        updateBonusButtonUI();
        alert("Admin Mode: Bonus rolls reset!");
    }
});

// ---------- Full Reset Shortcut (Cmd + Option + 0) ----------
window.addEventListener("keydown", (event) => {
    const isMac = navigator.platform.toUpperCase().includes("MAC");

    // Command + Option + 0 on Mac
    if (isMac && event.metaKey && event.altKey && event.code === "Digit0") {
        event.preventDefault();
        fullReset();
    }
});

// ---------- Full Reset Function ----------
function fullReset() {
    // Clear EVERYTHING the game uses
    localStorage.removeItem("playerGuess");
    localStorage.removeItem("bonusRollsUsed");
    localStorage.removeItem("hasGuessedToday");
    localStorage.removeItem("streak");
    localStorage.removeItem("dailySeed"); // optional

    // Re-enable input
    const input = document.getElementById("guessInput");
    if (input) {
        input.disabled = false;
        input.value = "";
    }

    // Reset UI
    updateBonusButtonUI();

    alert("Admin Reset Complete — you can enter a new number.");
}

