document.addEventListener("DOMContentLoaded", () => {
    const notifications = [
        { id: 1, message: "🎉 AI Challenge event starts tomorrow!", date: "2025-04-01" },
        { id: 2, message: "🏆 Cultural Fest registration ends soon.", date: "2025-04-02" },
        { id: 3, message: "⚽ New Cricket Tournament announced.", date: "2025-04-03" },
        { id: 4, message: "💻 Join the coding bootcamp this weekend!", date: "2025-04-04" },
        { id: 5, message: "📸 Photography Club meetup on Friday.", date: "2025-04-05" }
    ];

    const notificationsList = document.getElementById("notifications-list");

    if (notifications.length === 0) {
        notificationsList.innerHTML = "<p>No new notifications available.</p>";
    } else {
        notifications.forEach((notification) => {
            const notificationItem = document.createElement("div");
            notificationItem.classList.add("notification-item");
            notificationItem.innerHTML = `<p>${notification.message} <span class="notification-date">(${notification.date})</span></p>`;
            notificationsList.appendChild(notificationItem);
        });
    }
});

function logout() {
    fetch("/logout", { 
        method: "POST", 
        credentials: "same-origin" 
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("You have been logged out successfully!");
            window.location.href = "/login"; // Redirect to login page
        } else {
            alert("Logout failed. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        window.location.href = "/login"; // Fallback logout
    });
}

// Ensure the function is globally available
window.logout = logout;
