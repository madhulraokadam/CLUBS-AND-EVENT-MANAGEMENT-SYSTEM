document.addEventListener("DOMContentLoaded", function () {
    // Get the stored username from localStorage
    const storedUsername = localStorage.getItem("loggedInUser");

    // Check if the username exists
    if (storedUsername) {
        document.getElementById("username").innerText = storedUsername;
    }
});

// Function to save profile (to be implemented later)
function saveProfile() {
    const updatedData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phoneNo: document.getElementById("phoneNo").value,
        course: document.getElementById("course").value,
        semester: document.getElementById("semester").value
    };

    // Here you would typically send the updatedData to your backend to save it
    console.log("Profile updated:", updatedData);
    alert("Profile updated successfully!");
}

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
