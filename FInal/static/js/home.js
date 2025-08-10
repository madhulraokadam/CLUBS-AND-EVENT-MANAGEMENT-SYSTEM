// Home Page JavaScript

// Ensure smooth navigation for navigation buttons
document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome Back! Page loaded successfully.");

    document.querySelectorAll(".btnNav").forEach(button => {
        button.addEventListener("click", () => {
            let route = button.getAttribute("data-route");
            if (!route) {
                console.error("Route not found for button:", button);
                return;
            }
            window.location.href = route; // Redirect using Flask route
        });
    });
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
