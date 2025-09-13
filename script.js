const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

// 🎶 Playlist
const songs = [
  { title: "Song1", artist: "Hariharan,Gulshan kumar", src: "song1.mp3" },
  { title: "Song2", artist: "Alone", src: "song2.mp3" },
  { title: "Song3", artist: "Tremoxbeatz", src: "song3.mp3" }
];

let songIndex = 0;

// Load song
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;

  // Update playlist highlight
  document.querySelectorAll("#playlist li").forEach((li, i) => {
    li.classList.toggle("active", i === songIndex);
  });
}

// Play song
function playSong() {
  audio.play();
  playBtn.textContent = "⏸";
}

// Pause song
function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶";
}

// Next song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Prev song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // Time display
  let mins = Math.floor(currentTime / 60);
  let secs = Math.floor(currentTime % 60);
  if (secs < 10) secs = "0" + secs;
  currentTimeEl.textContent = `${mins}:${secs}`;

  let dMins = Math.floor(duration / 60);
  let dSecs = Math.floor(duration % 60);
  if (dSecs < 10) dSecs = "0" + dSecs;
  if (!isNaN(dMins)) durationEl.textContent = `${dMins}:${dSecs}`;
}

// Set progress bar on click
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Volume control
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Playlist
songs.forEach((song, i) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    songIndex = i;
    loadSong(songs[songIndex]);
    playSong();
  });
  playlistEl.appendChild(li);
});

// Event listeners
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong); // autoplay next

// Load first song
loadSong(songs[songIndex]);
