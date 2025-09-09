let countdownInterval;

function startCountdown() {
    clearInterval(countdownInterval);
    const eventDate = new Date(document.getElementById("eventDate").value);
    const message = document.getElementById("message");

    if (isNaN(eventDate.getTime())) {
        message.textContent = "Please select a valid date.";
        return;
    }

    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate.getTime() - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            message.textContent = "🎉 The event has started!";
            updateCountdown(0, 0, 0, 0);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        updateCountdown(days, hours, minutes, seconds);
        message.textContent = "";
    }, 1000);
}

function updateCountdown(d, h, m, s) {
    document.getElementById("days").textContent = String(d).padStart(2, '0');
    document.getElementById("hours").textContent = String(h).padStart(2, '0');
    document.getElementById("minutes").textContent = String(m).padStart(2, '0');
    document.getElementById("seconds").textContent = String(s).padStart(2, '0');
}