function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Your image filenames
const imageData = [
  "boston.jpg", "firstBostonDay.jpg", "prom1.jpg",
  "floridaBurger.jpg", "floridaSunsetAna.jpg", "pumpkinCarve.jpg",
  "pumpkinsLit.jpg", "bostonHeartRoof.jpg", "chilis.jpg", "crib1.jpg", "crib2.jpg", "daraBday.jpg", "floridaBeachKiss.jpg", "floridaSunsetAna.jpg", "floridaSunsetUs.jpg", "highGummy.jpg", "kissingBooth.jpg", "lobster.jpg", "prom2.jpg", "prudential.jpg", "sparkler.jpg", "steaks.jpg", "takatoDrink.jpg"
];

// Row container IDs
const rows = ["row1", "row2", "row3"];

// Loop through each row
rows.forEach(id => {
  const container = document.getElementById(id);
  if (!container) {
    console.error("Missing container with id:", id);
    return;
  }

  const randomized = shuffle([...imageData]);
  const duplicated = randomized.concat(randomized, randomized); // Triple for long loop

  duplicated.forEach(src => {
    const img = document.createElement("img");
    img.src = "assets/images/2024/" + src;
    img.alt = "";
    container.appendChild(img);
  });
});

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

document.addEventListener("DOMContentLoaded", () => {
  const catContainer = document.getElementById("cat-container");
  const bubble = document.getElementById("cat-bubble");
  const meow = document.getElementById("meow-sound");

  catContainer.addEventListener("click", () => {
    meow.currentTime = 0;
    meow.play();

    bubble.style.opacity = 1;

    setTimeout(() => {
      bubble.style.opacity = 0;
    }, 1500);
  });
});