const images = [
  "assets/images/2024/boston.jpg",
  "assets/images/2024/firstBostonDay.jpg",
  "assets/images/2024/prom1.jpg",
  "assets/images/2024/floridaBurger.jpg",
  "assets/images/2024/floridaSunsetAna.jpg",
  "assets/images/2025/kimballWaterfallUs.jpg",
"assets/images/2024/pumpkinCarve.jpg",
"assets/images/2025/kimballWaterfallAna.jpg",
"assets/images/2024/pumpkinsLit.jpg",
"assets/images/2024/bostonHeartRoof.jpg",
"assets/images/2025/crabHat1.jpg",
"assets/images/2025/crabHat2.jpg",
"assets/images/2024/sparkler.jpg",
"assets/images/2024/highGummy.jpg",
"assets/images/2025/timesSquareAna.jpg",
"assets/images/2025/nyFamily.jpg",
"assets/images/2025/anaFamilyGma.jpg",
"assets/images/2025/riverKiss1.jpg",
"assets/images/2025/superstar1.jpg",
  // Add more image paths
];

let index = 0;
const slideshow = document.getElementById("slideshow");

// Initialize
slideshow.style.backgroundImage = `url(${images[index]})`;

setInterval(() => {
  index = (index + 1) % images.length;
  slideshow.style.backgroundImage = `url(${images[index]})`;
}, 7000); // Change image every 7 seconds

const heartLayer = document.getElementById("heart-layer");

function createHeart(x, y, size, angle, isSpecial = false) {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.fontSize = `${size}px`;
  heart.style.setProperty('--angle', angle);
  heart.style.setProperty('--x-move', `${Math.random() * 40 - 20}px`);
  heart.style.setProperty('--y-move', `${Math.random() * 60 - 30}px`);
  heart.style.setProperty('--duration', `${10 + Math.random() * 10}s`);

  if (isSpecial) {
    heart.innerHTML = "💖"; // Special heart
    heart.style.color = "#ff69b4"; // Hot pink
    heart.style.cursor = "pointer";
    heart.style.pointerEvents = "auto";

    heart.addEventListener("click", () => {
  // Add wobble animation
  heart.classList.add("wobble");

  // Remove wobble class after animation ends
  setTimeout(() => {
    heart.classList.remove("wobble");
  }, 400);
  
// Generate confetti with random outward direction
for (let i = 0; i < 30; i++) {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti");
  confetti.style.left = `${heart.offsetLeft + heart.offsetWidth / 2}px`;
  confetti.style.top = `${heart.offsetTop + heart.offsetHeight / 2}px`;
  confetti.style.backgroundColor = getRandomColor();
  document.body.appendChild(confetti);

  // Random angle and distance
  const angle = Math.random() * 2 * Math.PI;
  const distance = 80 + Math.random() * 80;
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  // Force reflow so the transition applies
  confetti.offsetHeight;

  // Trigger animation
  confetti.style.transform = `translate(${x}px, ${y}px) scale(0.6) rotate(${Math.random() * 720}deg)`;
  confetti.style.opacity = "0";

  // Remove after animation
  setTimeout(() => {
    confetti.remove();
  }, 2000);
}

  // Show love note
  setTimeout(() => {
    document.getElementById("love-note").style.display = "flex";
  }, 500);
});

// Helper function
function getRandomColor() {
  const colors = ["#ff69b4", "#ffc0cb", "#ffb6c1", "#ffe4e1", "#fff0f5"];
  return colors[Math.floor(Math.random() * colors.length)];
}

  } else {
    heart.innerHTML = "💗";
    heart.style.pointerEvents = "none";
  }

  heartLayer.appendChild(heart);
}


function placeSpecialHeart() {
  const postitContainer = document.querySelector(".postit-container");
  const postitRect = postitContainer.getBoundingClientRect();

  let x, y;
  const maxAttempts = 50;
  let attempts = 0;

  do {
    x = Math.random() * window.innerWidth;
    y = Math.random() * window.innerHeight;
    attempts++;
  } while (
    x > postitRect.left - 60 &&
    x < postitRect.right + 60 &&
    y > postitRect.top - 60 &&
    y < postitRect.bottom + 60 &&
    attempts < maxAttempts
  );

  createHeart(x, y, 36, 0, true);
}

// Create 59 regular hearts
for (let i = 0; i < 59; i++) {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  const size = 16 + Math.random() * 24;
  const angle = Math.floor(Math.random() * 6) - 3;
  createHeart(x, y, size, angle);
}

// Add 1 special heart safely
placeSpecialHeart();

document.addEventListener('DOMContentLoaded', () => {
  const recordPlayer = document.getElementById('record-player');
  const audio = document.getElementById('record-audio');

  if (!recordPlayer || !audio) return;

  // Initialize with paused state style
  recordPlayer.classList.add('paused');

  // Toggle play/pause on click
  recordPlayer.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      recordPlayer.classList.remove('paused');
    } else {
      audio.pause();
      recordPlayer.classList.add('paused');
    }
  });

  // Also toggle on keyboard 'Enter' or 'Space' key for accessibility
  recordPlayer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      recordPlayer.click();
    }
  });

  // Pause spinning if audio ends or is paused by other means
  audio.addEventListener('pause', () => {
    recordPlayer.classList.add('paused');
  });

  audio.addEventListener('play', () => {
    recordPlayer.classList.remove('paused');
  });
});