// Club data
const clubsData = {
  'DATA SCIENCE CLUB': {
    img: '/static/images/data-science.jpg',
    about: 'The Data Science Club empowers students to explore data analytics, machine learning, and AI through hands-on projects.',
    events: ['DataHack 2024', 'AI for Good Workshop', 'Machine Learning Bootcamp'],
    eventImages: ['/static/images/datahack.jpg', '/static/images/ai-workshop.jpg', '/static/images/ml-bootcamp.jpg'],
    coordinator: 'Kireeti Reddy',
    secretary: 'Madhu Kadam',
    members: 135,
  },
  'SPORTS CLUB': {
    img: '/static/images/sports-club.jpg',
    about: 'The Sports Club promotes physical fitness and teamwork through a variety of indoor and outdoor activities.',
    events: ['Inter-College Sports Meet', 'Marathon 2024', 'Cricket Tournament'],
    eventImages: ['/static/images/sports-meet.jpg', '/static/images/marathon.jpg', '/static/images/cricket-tournament.jpg'],
    coordinator: 'Jyothsna',
    secretary: 'Nithish Kumar',
    members: 200,
  },
  'CULTURAL CLUB': {
    img: '/static/images/cultural-club.jpg',
    about: 'The Cultural Club celebrates diversity by organizing vibrant festivals, art shows, and music events.',
    events: ['Annual Cultural Fest', 'Music Night', 'Art and Dance Fiesta'],
    eventImages: ['/static/images/cultural-fest.jpg', '/static/images/music-night.jpg', '/static/images/art-dance.jpg'],
    coordinator: 'Sanjita G',
    secretary: 'Kunal Tiwari',
    members: 160,
  },
  'NCC CLUB': {
    img: '/static/images/ncc-club.jpg',
    about: 'The NCC Club instills discipline, leadership, and patriotism in students through rigorous training.',
    events: ['NCC Drill Training', 'Patriotic Day Celebration', 'Leadership Workshop'],
    eventImages: ['/static/images/ncc-drill.jpg', '/static/images/patriotic-day.jpg', '/static/images/leadership.jpg'],
    coordinator: 'Abhiram',
    secretary: 'Samarthya',
    members: 120,
  },
  'ROBOTICS CLUB': {
    img: '/static/images/robotics-club.jpg',
    about: 'The Robotics Club focuses on designing and building intelligent systems through automation and robotics.',
    events: ['RoboWar 2024', 'Drone Workshop', 'AI Robotics Challenge'],
    eventImages: ['/static/images/robowar.jpg', '/static/images/drone-workshop.jpg', '/static/images/ai-challenge.jpg'],
    coordinator: 'Rohit Mehta',
    secretary: 'Priya Singh',
    members: 140,
  },
  'FASHION CLUB': {
    img: '/static/images/fashion-club.jpg',
    about: 'The Fashion Club fosters creativity by exploring trends, design, and personal style.',
    events: ['Annual Fashion Show', 'Style Showcase', 'Trendsetters Workshop'],
    eventImages: ['/static/images/fashion-show.jpg', '/static/images/style-showcase.jpg', '/static/images/trendsetters.jpg'],
    coordinator: 'Sophia Khan',
    secretary: 'Megha Kapoor',
    members: 110,
  },
};

console.log("JavaScript loaded!");  // This should appear in the console


// Show Club Details
function showClubDetails(clubName) {
  const club = clubsData[clubName];
  document.getElementById('club-name').innerText = clubName;
  document.getElementById('club-img').src = club.img;
  document.getElementById('club-about').innerText = club.about;
  const eventsList = document.getElementById('club-events');
  eventsList.innerHTML = '';

  // Add Previous Events with Images
  club.events.forEach((event, index) => {
      const li = document.createElement('li');
      
      // Add event text
      li.innerText = event;
      
      // Add event image below the text
      const eventImg = document.createElement('img');
      eventImg.src = club.eventImages[index];
      eventImg.alt = event;
      
      // Add image below the text
      li.appendChild(document.createElement('br')); // Line break
      li.appendChild(eventImg);
      eventsList.appendChild(li);
  });

  document.getElementById('club-coordinator').innerText = club.coordinator;
  document.getElementById('club-secretary').innerText = club.secretary;
  document.getElementById('club-members').innerText = club.members;

  document.getElementById('clubDetails').style.display = 'block';
}

// Hide Club Details
function hideDetails() {
  document.getElementById('clubDetails').style.display = 'none';
}

// Toggle Dropdown
function toggleDropdown() {
  const dropdown = document.getElementById("dropdownPopup");
  dropdown.style.left = dropdown.style.left === "0px" ? "-350px" : "0px"; // Adjusted for the new position
}

document.getElementById("clubregistrationForm").addEventListener("submit", function(e) {
  e.preventDefault();  // Prevent form from submitting the default way

  console.log("Submitting club registration form...");

  const data = {
      studentName: document.getElementById("studentName").value,
      studentEmail: document.getElementById("studentEmail").value,
      studentPhonenumber: document.getElementById("studentPhonenumber").value,
      studentClub: document.getElementById("studentClub").value,
      studentDepartment: document.getElementById("studentDepartment").value,
      studentSemester: document.getElementById("studentSemester").value
  };

  console.log("Sending data:", data);  // Debug output

  fetch("/club_register", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
      if (result.success) {
          alert("Success: " + result.message);
          document.getElementById("clubregistrationForm").reset();  // Clear the form
      } else {
          alert("Registration failed: " + result.message);
      }
  })
  .catch(error => {
      console.error("Error submitting registration:", error);
      alert("An error occurred while submitting the form.");
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
window.logout= logout;
