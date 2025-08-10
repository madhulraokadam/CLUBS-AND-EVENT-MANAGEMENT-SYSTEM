// Show Event Details when Enroll is clicked
function showEventDetails(eventName, imageUrl, enrolledCount) {
    // Set event details dynamically
    document.getElementById("eventTitle").innerText = eventName;
    document.getElementById("eventImage").src =  '/static/images/' + imageUrl;
    document.getElementById("eventDescription").innerText =
        "Explore and participate in " + eventName + " to gain experience and have fun!";
    document.getElementById("enrolledCount").innerText = enrolledCount;

    // Show event details and enrollment form
    document.getElementById("eventDetails").style.display = "block";
    document.getElementById("enrollForm").style.display = "flex";
    document.getElementById("successMessage").style.display = "none";

    // Scroll smoothly to event details
    document.getElementById("eventDetails").scrollIntoView({ behavior: "smooth" });
}
function submitForm(event) {
    event.preventDefault();
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phoneNumber").value;
    const department = document.getElementById("department").value;
    const semester = document.getElementById("semester").value;
    const eventName = document.getElementById("eventTitle").innerText;
    if (fullName && email && phone && department && semester && eventName) {
    fetch("/event_register", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        name: fullName,
        email,
        phone,
        department,
        semester,
        eventName
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
        alert("✅ " + data.message);
        document.getElementById("enrollForm").reset();
        document.getElementById("successMessage").style.display = "block";
        document.getElementById("enrollForm").style.display = "none";
        } else {
        alert("Error: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong. Try again.");
    });
    } else {
    alert("Please fill in all fields.");
    }
}

// Reset form fields after submission
function resetFormFields() {
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
}

// Increment enrolled count dynamically
function incrementEnrolledCount() {
    let enrolledCountElement = document.getElementById("enrolledCount");
    let currentCount = parseInt(enrolledCountElement.innerText);
    enrolledCountElement.innerText = currentCount + 1;
}

// Hide event details and reset form when navigating away
function resetEventDetails() {
    document.getElementById("eventDetails").style.display = "none";
    document.getElementById("enrollForm").style.display = "none";
    document.getElementById("successMessage").style.display = "none";
}

// Reset event details on page load or navigation
window.onload = function () {
    resetEventDetails();
};
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
