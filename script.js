// ===== Track Data =====
const tracks = [
  // SONGS folder
  { id: "1", title: "Ik Vaari Aa", mood: "dreamy", audioUrl: "SONGS/Ik Vaari Aa 128 Kbps.mp3" },
  { id: "2", title: "Insane", mood: "energetic", audioUrl: "SONGS/Insane 128 Kbps.mp3" },
  { id: "3", title: "Jab Tak", mood: "calm", audioUrl: "SONGS/Jab Tak 128 Kbps.mp3" },
  { id: "4", title: "Main Tera Boyfriend", mood: "uplifting", audioUrl: "SONGS/Main Tera Boyfriend 128 Kbps.mp3" },
  { id: "5", title: "Phir Kabhi", mood: "dreamy", audioUrl: "SONGS/Phir Kabhi 128 Kbps.mp3" },
  { id: "6", title: "Sab Tera", mood: "calm", audioUrl: "SONGS/Sab Tera 128 Kbps.mp3" },
  { id: "7", title: "Sahiba", mood: "dreamy", audioUrl: "SONGS/Sahiba 128 Kbps.mp3" },
  { id: "8", title: "Soch Na Sake", mood: "calm", audioUrl: "SONGS/Soch Na Sake 128 Kbps.mp3" },
  { id: "9", title: "Sulthan", mood: "energetic", audioUrl: "SONGS/Sulthan 128 Kbps.mp3" },
  { id: "10", title: "Laal Pari", mood: "uplifting", audioUrl: "SONGS/128-Laal Pari - Housefull 5 128 Kbps.mp3" },
  { id: "11", title: "Tujhe Kitna Chahne Lage", mood: "calm", audioUrl: "SONGS/Tujhe Kitna Chahne Lage 128 Kbps.mp3" },
  { id: "12", title: "With You", mood: "focus", audioUrl: "SONGS/With You 128 Kbps.mp3" },

  // NEW SONGS folder
  { id: "13", title: "Aabaad Barbaad", mood: "dreamy", audioUrl: "NEW SONGS/Aabaad Barbaad 128 Kbps.mp3" },
  { id: "14", title: "Dil Chori", mood: "energetic", audioUrl: "NEW SONGS/Dil Chori 128 Kbps.mp3" },
  { id: "15", title: "Heeriye", mood: "uplifting", audioUrl: "NEW SONGS/Heeriye 128 Kbps.mp3" },
  { id: "16", title: "Janiye Chor Nikal Ke Bhaga", mood: "energetic", audioUrl: "NEW SONGS/Janiye Chor Nikal Ke Bhaga 128 Kbps.mp3" },
  { id: "17", title: "Jugraafiya", mood: "calm", audioUrl: "NEW SONGS/Jugraafiya 128 Kbps.mp3" },
  { id: "18", title: "Mehabooba", mood: "energetic", audioUrl: "NEW SONGS/Mehabooba 128 Kbps.mp3" },
  { id: "19", title: "Money Money", mood: "energetic", audioUrl: "NEW SONGS/Money Money 128 Kbps.mp3" },
  { id: "20", title: "Pehle Bhi Main", mood: "calm", audioUrl: "NEW SONGS/Pehle Bhi Main 128 Kbps.mp3" },
  { id: "21", title: "Sulthan (New)", mood: "energetic", audioUrl: "NEW SONGS/Sulthan 128 Kbps.mp3" },
  { id: "22", title: "Tera Ban Jaunga", mood: "dreamy", audioUrl: "NEW SONGS/Tera Ban Jaunga 128 Kbps.mp3" },
  { id: "23", title: "With You (New)", mood: "focus", audioUrl: "NEW SONGS/With You 128 Kbps.mp3" }
];


const moodIcons = {
  calm: "😌",
  focus: "🎯",
  energetic: "⚡",
  dreamy: "🌙",
  uplifting: "🌟"
};

// ===== State =====
let currentTrackIndex = -1;
let isPlaying = false;
let currentMoodFilter = "all";
let audio = new Audio();
let playlists = JSON.parse(localStorage.getItem("soundscape_playlists")) || [];
let currentPlaylistId = null;
let showPlaylistPanel = false;

// ===== DOM Elements =====
const trackListEl = document.getElementById("trackList");
const nowPlayingEl = document.getElementById("nowPlaying");
const nowPlayingTitleEl = document.getElementById("nowPlayingTitle");
const nowPlayingMoodEl = document.getElementById("nowPlayingMood");
const playPauseBtnEl = document.getElementById("playPauseBtn");
const prevBtnEl = document.getElementById("prevBtn");
const nextBtnEl = document.getElementById("nextBtn");
const progressFillEl = document.getElementById("progressFill");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volumeSliderEl = document.getElementById("volumeSlider");
const moodInputEl = document.getElementById("moodInput");
const detectMoodBtnEl = document.getElementById("detectMoodBtn");
const moodResultEl = document.getElementById("moodResult");
const detectedMoodEl = document.getElementById("detectedMood");
const detectedModeEl = document.getElementById("detectedMode");
const startSessionBtnEl = document.getElementById("startSessionBtn");
const playlistPanelEl = document.getElementById("playlistPanel");
const playlistListEl = document.getElementById("playlistList");
const togglePlaylistBtnEl = document.getElementById("togglePlaylistBtn");
const createPlaylistBtnEl = document.getElementById("createPlaylistBtn");
const newPlaylistNameEl = document.getElementById("newPlaylistName");
const addToPlaylistBtnEl = document.getElementById("addToPlaylistBtn");

// ===== Utility Functions =====
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function getFilteredTracks() {
  if (currentPlaylistId) {
    const playlist = playlists.find(p => p.id === currentPlaylistId);
    if (playlist) {
      return tracks.filter(t => playlist.trackIds.includes(t.id));
    }
  }
  if (currentMoodFilter === "all") return tracks;
  return tracks.filter(t => t.mood === currentMoodFilter);
}

function savePlaylists() {
  localStorage.setItem("soundscape_playlists", JSON.stringify(playlists));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});


// ===== Playlist Functions =====
function createPlaylist(name) {
  if (!name.trim()) return;
  const playlist = {
    id: generateId(),
    name: name.trim(),
    trackIds: [],
    createdAt: Date.now()
  };
  playlists.push(playlist);
  savePlaylists();
  renderPlaylists();
  if (newPlaylistNameEl) newPlaylistNameEl.value = "";
}

function deletePlaylist(playlistId) {
  playlists = playlists.filter(p => p.id !== playlistId);
  if (currentPlaylistId === playlistId) {
    currentPlaylistId = null;
  }
  savePlaylists();
  renderPlaylists();
  renderTracks();
}

function addTrackToPlaylist(trackId, playlistId) {
  const playlist = playlists.find(p => p.id === playlistId);
  if (playlist && !playlist.trackIds.includes(trackId)) {
    playlist.trackIds.push(trackId);
    savePlaylists();
    renderPlaylists();
  }
}

function removeTrackFromPlaylist(trackId, playlistId) {
  const playlist = playlists.find(p => p.id === playlistId);
  if (playlist) {
    playlist.trackIds = playlist.trackIds.filter(id => id !== trackId);
    savePlaylists();
    renderPlaylists();
    if (currentPlaylistId === playlistId) {
      renderTracks();
    }
  }
}

function selectPlaylist(playlistId) {
  currentPlaylistId = playlistId;
  currentMoodFilter = "all";
  document.querySelectorAll(".mood-filter-chip").forEach(c => c.classList.remove("active"));
  document.querySelector('[data-mood="all"]')?.classList.add("active");
  renderPlaylists();
  renderTracks();
}

function clearPlaylistSelection() {
  currentPlaylistId = null;
  renderPlaylists();
  renderTracks();
}

function renderPlaylists() {
  if (!playlistListEl) return;

  playlistListEl.innerHTML = `
    <div class="playlist-item ${!currentPlaylistId ? 'active' : ''}" data-action="all">
      <span class="playlist-icon">🎵</span>
      <span class="playlist-name">All Tracks</span>
      <span class="playlist-count">${tracks.length}</span>
    </div>
    ${playlists.map(playlist => `
      <div class="playlist-item ${currentPlaylistId === playlist.id ? 'active' : ''}" data-id="${playlist.id}">
        <span class="playlist-icon">📁</span>
        <span class="playlist-name">${playlist.name}</span>
        <span class="playlist-count">${playlist.trackIds.length}</span>
        <button class="playlist-delete-btn" data-delete="${playlist.id}">🗑️</button>
      </div>
    `).join("")}
  `;

  // Add click handlers
  document.querySelectorAll(".playlist-item").forEach(item => {
    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("playlist-delete-btn")) return;
      const id = item.dataset.id;
      const action = item.dataset.action;
      if (action === "all") {
        clearPlaylistSelection();
      } else if (id) {
        selectPlaylist(id);
      }
    });
  });

  document.querySelectorAll(".playlist-delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.delete;
      if (confirm("Delete this playlist?")) {
        deletePlaylist(id);
      }
    });
  });
}

function togglePlaylistPanel() {
  showPlaylistPanel = !showPlaylistPanel;
  if (playlistPanelEl) {
    playlistPanelEl.classList.toggle("hidden", !showPlaylistPanel);
  }
}

function showAddToPlaylistMenu(trackId, buttonEl) {
  
  document.querySelectorAll(".add-to-playlist-menu").forEach(m => m.remove());

  if (playlists.length === 0) {
    alert("Create a playlist first!");
    return;
  }

  const menu = document.createElement("div");
  menu.className = "add-to-playlist-menu";
  menu.innerHTML = `
    <div class="menu-header">Add to Playlist</div>
    ${playlists.map(p => `
      <div class="menu-item" data-playlist="${p.id}" data-track="${trackId}">
        ${p.trackIds.includes(trackId) ? "✓ " : ""}${p.name}
      </div>
    `).join("")}
  `;

  buttonEl.parentElement.appendChild(menu);

  menu.querySelectorAll(".menu-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      const playlistId = item.dataset.playlist;
      const tId = item.dataset.track;
      const playlist = playlists.find(p => p.id === playlistId);
      if (playlist.trackIds.includes(tId)) {
        removeTrackFromPlaylist(tId, playlistId);
      } else {
        addTrackToPlaylist(tId, playlistId);
      }
      menu.remove();
    });
  });

  // Close menu on click outside
  setTimeout(() => {
    document.addEventListener("click", function closeMenu(e) {
      if (!menu.contains(e.target)) {
        menu.remove();
        document.removeEventListener("click", closeMenu);
      }
    });
  }, 0);
}

// ===== Render Functions =====
function renderTracks() {
  const filteredTracks = getFilteredTracks();

  const headerText = currentPlaylistId
    ? `Playlist: ${playlists.find(p => p.id === currentPlaylistId)?.name || ""}`
    : "Tracks";

  document.querySelector(".tracks-section .section-header h2").textContent = headerText;

  trackListEl.innerHTML = filteredTracks.length === 0
    ? `<div class="empty-state">No tracks in this playlist. Add some!</div>`
    : filteredTracks.map(track => `
    <div class="track-card ${currentTrackIndex === tracks.indexOf(track) && isPlaying ? 'playing' : ''}" 
         data-id="${track.id}">
      <div class="track-icon ${track.mood}">${moodIcons[track.mood]}</div>
      <div class="track-info">
        <div class="track-title">${track.title}</div>
        <div class="track-meta">
          <span class="track-mood">${track.mood}</span>
          <span>--:--</span>

        </div>
      </div>
      <button class="track-add-btn" data-track="${track.id}" title="Add to playlist">➕</button>
      <button class="track-play-btn">${currentTrackIndex === tracks.indexOf(track) && isPlaying ? '⏸️' : '▶️'}</button>
    </div>
  `).join("");

  // Add click handlers
  document.querySelectorAll(".track-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.classList.contains("track-add-btn") || e.target.classList.contains("track-play-btn")) return;
      const trackId = card.dataset.id;
      const trackIndex = tracks.findIndex(t => t.id === trackId);
      if (trackIndex === currentTrackIndex && isPlaying) {
        pauseTrack();
      } else {
        playTrack(trackIndex);
      }
    });
  });

  document.querySelectorAll(".track-play-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = btn.closest(".track-card");
      const trackId = card.dataset.id;
      const trackIndex = tracks.findIndex(t => t.id === trackId);
      if (trackIndex === currentTrackIndex && isPlaying) {
        pauseTrack();
      } else {
        playTrack(trackIndex);
      }
    });
  });

  document.querySelectorAll(".track-add-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const trackId = btn.dataset.track;
      showAddToPlaylistMenu(trackId, btn);
    });
  });
}

function updateNowPlaying() {
  if (currentTrackIndex === -1) {
    nowPlayingEl.classList.add("hidden");
    return;
  }

  const track = tracks[currentTrackIndex];
  nowPlayingEl.classList.remove("hidden");
  nowPlayingTitleEl.textContent = track.title;
  nowPlayingMoodEl.textContent = `${moodIcons[track.mood]} ${track.mood}`;
  playPauseBtnEl.textContent = isPlaying ? "⏸️" : "▶️";
  durationEl.textContent = audio.duration
  ? formatTime(audio.duration)
  : "--:--";

}

// ===== Audio Controls =====
function playTrack(index) {
  if (index < 0 || index >= tracks.length) return;
  
  const track = tracks[index];
  currentTrackIndex = index;

  audio.src = track.audioUrl;
  audio.play().catch(err => {
    console.log("Audio playback requires user interaction or valid audio file:", err);
  });

  isPlaying = true;
  updateNowPlaying();
  renderTracks();
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  updateNowPlaying();
  renderTracks();
}

function togglePlayPause() {
  if (isPlaying) {
    pauseTrack();
  } else if (currentTrackIndex !== -1) {
    audio.play();
    isPlaying = true;
    updateNowPlaying();
    renderTracks();
  }
}

function playNext() {
  const filtered = getFilteredTracks();
  if (filtered.length === 0) return;
  const currentInFiltered = filtered.findIndex(t => tracks.indexOf(t) === currentTrackIndex);
  const nextInFiltered = (currentInFiltered + 1) % filtered.length;
  const nextTrack = filtered[nextInFiltered];
  playTrack(tracks.indexOf(nextTrack));
}

function playPrev() {
  const filtered = getFilteredTracks();
  if (filtered.length === 0) return;
  const currentInFiltered = filtered.findIndex(t => tracks.indexOf(t) === currentTrackIndex);
  const prevInFiltered = currentInFiltered <= 0 ? filtered.length - 1 : currentInFiltered - 1;
  const prevTrack = filtered[prevInFiltered];
  playTrack(tracks.indexOf(prevTrack));
}

// ===== Audio Events =====
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressFillEl.style.width = `${progress}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
});



// ===== Mood Filter =====
document.querySelectorAll(".mood-filter-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".mood-filter-chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    currentMoodFilter = chip.dataset.mood;
    currentPlaylistId = null; // Clear playlist selection when filtering by mood
    renderPlaylists();
    renderTracks();
  });
});

// ===== Focus Mode Cards =====
document.querySelectorAll(".focus-card .btn-focus").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const mode = btn.closest(".focus-card").dataset.mode;

    const moodMap = {
      study: "calm",
      focus: "focus",
      relax: "dreamy"
    };

    currentMoodFilter = moodMap[mode] || "all";
    currentPlaylistId = null;
    document.querySelectorAll(".mood-filter-chip").forEach(c => c.classList.remove("active"));
    document.querySelector(`[data-mood="${currentMoodFilter}"]`)?.classList.add("active");

    renderPlaylists();
    renderTracks();

    const filtered = getFilteredTracks();
    if (filtered.length > 0) {
      playTrack(tracks.indexOf(filtered[0]));
    }

    document.querySelectorAll(".focus-card").forEach(c => c.classList.remove("active"));
    btn.closest(".focus-card").classList.add("active");
  });
});

// ===== AI Mood Detector =====
function detectMood(text) {
  const lowerText = text.toLowerCase();

  const moodKeywords = {
  calm: [
    "relax", "peace", "calm", "stress", "anxiety", "sleep", "tired", "rest", "unwind",
    "slow", "quiet", "soothing", "breathe", "meditate", "relief", "ease", "cool",
    "light", "gentle", "comfort"
  ],

  focus: [
    "focus", "work", "study", "concentrate", "productive", "deadline", "project", "code",
    "exam", "assignment", "task", "deep", "attention", "research", "analyze", "learn",
    "practice", "revision"
  ],

  energetic: [
    "energy", "workout", "exercise", "gym", "dance", "party", "excited", "pump",
    "run", "training", "cardio", "move", "fast", "active", "power", "boost",
    "hype", "intense"
  ],

  dreamy: [
    "dream", "creative", "imagination", "art", "music", "romantic", "love", "gentle",
    "chill", "float", "soft", "ambient", "aesthetic", "calming", "peaceful",
    "mellow", "smooth"
  ],

  uplifting: [
    "happy", "joy", "celebrate", "motivation", "inspire", "positive", "good", "great",
    "smile", "cheer", "hope", "bright", "confident", "success", "achieve",
    "encourage", "win"
  ]
};


  let bestMood = "focus";
  let bestScore = 0;

  for (const [mood, keywords] of Object.entries(moodKeywords)) {
    const score = keywords.filter(kw => lowerText.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMood = mood;
    }
  }

  const modeMap = {
    calm: "relax",
    focus: "focus",
    energetic: "focus",
    dreamy: "relax",
    uplifting: "study"
  };

  return {
    mood: bestMood,
    mode: modeMap[bestMood]
  };
}

detectMoodBtnEl.addEventListener("click", () => {
  const text = moodInputEl.value.trim();
  if (!text) return;

  detectMoodBtnEl.disabled = true;
  detectMoodBtnEl.innerHTML = '<span class="btn-icon">⏳</span> Analyzing...';

  setTimeout(() => {
    const result = detectMood(text);

    detectedMoodEl.textContent = `${moodIcons[result.mood]} ${result.mood}`;
    detectedModeEl.textContent = `${result.mode} mode`;
    moodResultEl.classList.remove("hidden");

    detectMoodBtnEl.disabled = false;
    detectMoodBtnEl.innerHTML = '<span class="btn-icon">🔮</span> Detect My Mood';

    moodResultEl.dataset.mood = result.mood;
    moodResultEl.dataset.mode = result.mode;
  }, 1000);
});

startSessionBtnEl.addEventListener("click", () => {
  const mood = moodResultEl.dataset.mood;

  currentMoodFilter = mood;
  currentPlaylistId = null;
  document.querySelectorAll(".mood-filter-chip").forEach(c => c.classList.remove("active"));
  document.querySelector(`[data-mood="${mood}"]`)?.classList.add("active");

  renderPlaylists();
  renderTracks();

  const filtered = getFilteredTracks();
  if (filtered.length > 0) {
    playTrack(tracks.indexOf(filtered[0]));
  }

  moodInputEl.value = "";
  moodResultEl.classList.add("hidden");
});

// ===== Control Button Events =====
playPauseBtnEl.addEventListener("click", togglePlayPause);
prevBtnEl.addEventListener("click", playPrev);
nextBtnEl.addEventListener("click", playNext);

volumeSliderEl.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});

// ===== Progress Bar Click =====
document.querySelector(".progress-bar").addEventListener("click", (e) => {
  if (!audio.duration) return;
  const rect = e.target.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audio.currentTime = percent * audio.duration;
});

// ===== Playlist Panel Events =====
if (togglePlaylistBtnEl) {
  togglePlaylistBtnEl.addEventListener("click", togglePlaylistPanel);
}

if (createPlaylistBtnEl) {
  createPlaylistBtnEl.addEventListener("click", () => {
    const name = newPlaylistNameEl?.value || prompt("Enter playlist name:");
    if (name) createPlaylist(name);
  });
}
// ===== FOCUS DNA - Behavioral Profile System =====

// Initialize or load focus profile from localStorage
let focusProfile = JSON.parse(localStorage.getItem("soundscape_focus_profile")) || {
  totalSessions: 0,
  totalMinutes: 0,
  avgSessionMinutes: 0,
  moodCounts: { calm: 0, focus: 0, energetic: 0, dreamy: 0, uplifting: 0 },
  preferredMood: null,
  timeCounts: { morning: 0, afternoon: 0, evening: 0, night: 0 },
  bestTimeOfDay: null,
  pauseCount: 0,
  skipCount: 0,
  pauseTolerance: 0,
  skipTolerance: 0,
  lastSessionStart: null,
  recentDistractions: 0
};

// Session tracking state
let sessionStartTime = null;
let currentSessionMood = null;

// Save profile to localStorage
function saveFocusProfile() {
  localStorage.setItem("soundscape_focus_profile", JSON.stringify(focusProfile));
}

// Get current time of day category
function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 23) return "evening";
  return "night";
}

// Calculate distraction level (0-1 scale)
function getDistractionLevel() {
  const totalActions = focusProfile.pauseCount + focusProfile.skipCount;
  if (totalActions === 0) return 0;
  return Math.min(focusProfile.recentDistractions / 10, 1);
}

// Start tracking a new session
function startSessionTracking() {
  sessionStartTime = Date.now();
  currentSessionMood = currentMoodFilter !== "all" ? currentMoodFilter : null;
  focusProfile.lastSessionStart = sessionStartTime;
  focusProfile.recentDistractions = 0; // Reset for new session
  saveFocusProfile();
}

// Track successful track completion
function trackTrackCompletion() {
  if (!sessionStartTime) return;

  const track = tracks[currentTrackIndex];
  if (!track) return;

  const mood = track.mood;
  const timeOfDay = getTimeOfDay();
  const sessionMinutes = audio.duration / 60;

  // Update mood counts
  focusProfile.moodCounts[mood] = (focusProfile.moodCounts[mood] || 0) + 1;

  // Update time of day counts
  focusProfile.timeCounts[timeOfDay] = (focusProfile.timeCounts[timeOfDay] || 0) + 1;

  // Update session stats
  focusProfile.totalSessions++;
  focusProfile.totalMinutes += sessionMinutes;
  focusProfile.avgSessionMinutes = focusProfile.totalMinutes / focusProfile.totalSessions;

  // Calculate preferred mood (highest count)
  const moodEntries = Object.entries(focusProfile.moodCounts);
  const topMood = moodEntries.reduce((a, b) => b[1] > a[1] ? b : a);
  focusProfile.preferredMood = topMood[1] > 0 ? topMood[0] : null;

  // Calculate best time of day (highest count)
  const timeEntries = Object.entries(focusProfile.timeCounts);
  const topTime = timeEntries.reduce((a, b) => b[1] > a[1] ? b : a);
  focusProfile.bestTimeOfDay = topTime[1] > 0 ? topTime[0] : null;

  // Update tolerance scores (lower = more tolerant)
  focusProfile.pauseTolerance = focusProfile.pauseCount / Math.max(focusProfile.totalSessions, 1);
  focusProfile.skipTolerance = focusProfile.skipCount / Math.max(focusProfile.totalSessions, 1);

  saveFocusProfile();
  updateFocusDNADisplay();
}

// Track pause action
function trackPause() {
  focusProfile.pauseCount++;
  focusProfile.recentDistractions++;
  saveFocusProfile();
}

// Track skip action
function trackSkip() {
  focusProfile.skipCount++;
  focusProfile.recentDistractions++;
  saveFocusProfile();
}

// Generate human-readable insight
function generateInsight() {
  if (focusProfile.totalSessions < 3) {
    return "Keep listening to build your Focus DNA profile. Complete a few more sessions!";
  }

  const mood = focusProfile.preferredMood || "focus";
  const moodIcon = moodIcons[mood] || "🎵";
  const duration = Math.round(focusProfile.avgSessionMinutes);
  const timeOfDay = focusProfile.bestTimeOfDay || "evening";

  const timeLabels = {
    morning: "in the morning ☀️",
    afternoon: "in the afternoon 🌤️",
    evening: "in the evening 🌅",
    night: "at night 🌙"
  };

  let insight = `You focus best with ${moodIcon} ${mood} music for ~${duration} min ${timeLabels[timeOfDay]}.`;

  // Add distraction insight
  const avgDistractions = (focusProfile.pauseTolerance + focusProfile.skipTolerance) / 2;
  if (avgDistractions < 1) {
    insight += " You maintain excellent focus! 🎯";
  } else if (avgDistractions < 3) {
    insight += " Your focus is steady with occasional breaks.";
  } else {
    insight += " Try dreamy tracks for fewer distractions.";
  }

  return insight;
}

// Update Focus DNA display
function updateFocusDNADisplay() {
  const insightEl = document.getElementById("dnaInsight");
  const statsSessionsEl = document.getElementById("statSessions");
  const statsDurationEl = document.getElementById("statDuration");
  const statsMoodEl = document.getElementById("statMood");
  const statsTimeEl = document.getElementById("statTime");

  if (insightEl) {
    insightEl.innerHTML = `
      <span class="insight-icon">${focusProfile.totalSessions >= 3 ? "🧬" : "🔍"}</span>
      <p class="insight-text">${generateInsight()}</p>
    `;
  }

  if (statsSessionsEl) statsSessionsEl.textContent = focusProfile.totalSessions;
  if (statsDurationEl) statsDurationEl.textContent = focusProfile.avgSessionMinutes > 0
    ? `${Math.round(focusProfile.avgSessionMinutes)}m` : "--";
  if (statsMoodEl) statsMoodEl.textContent = focusProfile.preferredMood
    ? `${moodIcons[focusProfile.preferredMood]} ${focusProfile.preferredMood}` : "--";
  if (statsTimeEl) statsTimeEl.textContent = focusProfile.bestTimeOfDay || "--";
}

// ===== SMART SESSION STARTER =====

function determineSmartMood() {
  const timeOfDay = getTimeOfDay();
  const distractionLevel = getDistractionLevel();

  // Priority 1: High distractions → dreamy (calming)
  if (distractionLevel > 0.5) {
    return "dreamy";
  }

  // Priority 2: Check if we have confident profile data
  if (focusProfile.totalSessions >= 5 && focusProfile.preferredMood) {
    // Use preferred mood if confidence is high (>40% of sessions)
    const preferredCount = focusProfile.moodCounts[focusProfile.preferredMood];
    const confidence = preferredCount / focusProfile.totalSessions;
    if (confidence > 0.4) {
      return focusProfile.preferredMood;
    }
  }

  // Priority 3: Time-based defaults
  switch (timeOfDay) {
    case "morning":
    case "afternoon":
      return "focus";
    case "evening":
    case "night":
      return "calm";
    default:
      return "focus";
  }
}

function startSmartSession() {
  const smartMood = determineSmartMood();
  const smartBtn = document.getElementById("smartSessionBtn");

  // Visual feedback
  if (smartBtn) {
    smartBtn.classList.add("active");
    smartBtn.innerHTML = '<span class="btn-icon">⚡</span> Smart Session Active';
  }

  // Set mood filter
  currentMoodFilter = smartMood;
  currentPlaylistId = null;

  // Update mood filter UI
  document.querySelectorAll(".mood-filter-chip").forEach(c => c.classList.remove("active"));
  document.querySelector(`[data-mood="${smartMood}"]`)?.classList.add("active");

  // Render and start playback
  renderPlaylists();
  renderTracks();

  const filtered = getFilteredTracks();
  if (filtered.length > 0) {
    // Start session tracking
    startSessionTracking();

    // Play first track
    playTrack(tracks.indexOf(filtered[0]));
  }

  // Show notification
  const timeOfDay = getTimeOfDay();
  const duration = focusProfile.avgSessionMinutes > 0
    ? Math.round(focusProfile.avgSessionMinutes)
    : 25;

  console.log(`🧠 Smart Session: ${moodIcons[smartMood]} ${smartMood} mode | ${duration}min | ${timeOfDay}`);
}

// ===== Audio Events =====
audio.addEventListener("ended", () => {
  trackTrackCompletion(); // Focus DNA learning
  playNext();             // Normal playback flow
});


// Track pause events
audio.addEventListener("pause", () => {
  if (sessionStartTime) {
    trackPause();
  }
});


// Modify playNext and playPrev to track skips
const originalPlayNext = playNext;
playNext = function () {
  if (audio.currentTime > 5 && audio.currentTime < audio.duration * 0.8) {
    trackSkip();
  }

  originalPlayNext();
};

const originalPlayPrev = playPrev;
playPrev = function () {
  trackSkip();
  originalPlayPrev();
};

// ===== Smart Session Button Event =====
const smartSessionBtnEl = document.getElementById("smartSessionBtn");
if (smartSessionBtnEl) {
  smartSessionBtnEl.addEventListener("click", startSmartSession);
}

// ===== Initialize Focus DNA Display =====
updateFocusDNADisplay();

console.log("🧬 Focus DNA system initialized!");


// ===== Initialize =====
audio.volume = 0.8;
renderPlaylists();
renderTracks();

console.log("initialized");
