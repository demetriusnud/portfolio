function updateClock(id, timezone) {
    const clockElement = document.getElementById(id);
    const now = new Date();
    const options = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const timeString = now.toLocaleTimeString('en-US', options);
    clockElement.textContent = timeString;
}

function updateAllClocks() {
    updateClock('london-clock', 'Europe/London');
    updateClock('tel-aviv-clock', 'Asia/Jerusalem');
    updateClock('new-york-clock', 'America/New_York');
    updateClock('paris-clock', 'Europe/Paris');
}

// Update clocks every second
setInterval(updateAllClocks, 1000);

// Initialize clocks immediately
updateAllClocks();