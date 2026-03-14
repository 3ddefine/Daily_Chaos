document.addEventListener("DOMContentLoaded", () => {
    // --- UNIQUE PLAYER ID ---
    if (!localStorage.getItem("playerId")) {
        localStorage.setItem("playerId", crypto.randomUUID());
    }

    const playerId = localStorage.getItem("playerId");

    // --- SEND TRACKING PING ---
    async function trackPlayer() {
        try {
            await fetch("/api/dau", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: playerId })
            });
        } catch (e) {
            console.error("Track error", e);
        }
    }

    trackPlayer();

    // --- DAU OVERLAY BOX ---
    const dauBox = document.createElement("div");
    dauBox.style.position = "fixed";
    dauBox.style.bottom = "20px";
    dauBox.style.right = "20px";
    dauBox.style.padding = "12px 16px";
    dauBox.style.background = "rgba(0,0,0,0.85)";
    dauBox.style.color = "white";
    dauBox.style.borderRadius = "8px";
    dauBox.style.fontSize = "14px";
    dauBox.style.fontFamily = "monospace";
    dauBox.style.zIndex = "9999";
    dauBox.style.display = "none";
    dauBox.textContent = "DAU: loading...";
    document.body.appendChild(dauBox);

    // --- FETCH DAU ---
    async function fetchDAU() {
        try {
            const res = await fetch("/api/dau");
            const data = await res.json();
            dauBox.textContent = `DAU: ${data.dau}`;
        } catch (e) {
            dauBox.textContent = "DAU: error";
        }
    }

    // --- TOGGLE OVERLAY ---
    function toggleDAU() {
        if (dauBox.style.display === "none") {
            dauBox.style.display = "block";
            fetchDAU();
        } else {
            dauBox.style.display = "none";
        }
    }

    // --- KEYBOARD SHORTCUT (CMD + SHIFT + 0) ---
    document.addEventListener("keydown", (e) => {
        if (e.metaKey && e.shiftKey && e.key === "0") {
            toggleDAU();
        }
    });
});
