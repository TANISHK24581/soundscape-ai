# 🎧 SoundScape AI

SoundScape AI is a smart, offline-first music web application designed to support **focus, productivity, and mental well-being**.  
Instead of being just a music player, it acts as a **personal audio companion** that understands mood, learns listening behavior, and adapts over time — all while respecting user privacy.

---


🔗 **Live App:**  
https://soundscape-ecru.vercel.app/

## ✨ Key Features

### 🔮 AI Mood Detector
Users can describe how they are feeling in natural language.  
The AI Mood Detector analyzes keywords in the input and recommends:
- A suitable **mood** (calm, focus, energetic, dreamy, uplifting)
- An appropriate **listening mode**

This helps users quickly start the right kind of session without manually searching.

---

### 🧬 Focus DNA (Behavior-Based Learning)
SoundScape AI gradually builds a **Focus DNA profile** by observing how users listen to music.

It learns from:
- Track completions
- Pauses
- Skips
- Session duration
- Time of day

Over time, this allows the app to understand:
- Which moods help the user focus best
- Average focus session length
- Peak productivity time

All learning happens **locally in the browser**.

---

### ⚡ Smart Session Mode
With one click, Smart Session automatically:
- Chooses the best mood based on Focus DNA
- Considers time of day and recent distractions
- Starts an optimized focus session instantly

This removes decision fatigue and helps users stay consistent.

---

### 🎯 Focus Modes
Predefined modes for common use cases:
- **Study Mode** – calm, deep-focus music
- **Focus Mode** – productivity-oriented tracks
- **Relax Mode** – unwinding and stress relief

Each mode filters music and starts playback automatically.

---

### 📁 Custom Playlists
Users can:
- Create multiple playlists
- Add or remove tracks easily
- Play music from a specific playlist

Playlists are stored using browser storage and work completely offline.

---

### 🎵 Music Player
Includes a full-featured audio player with:
- Play / pause / next / previous controls
- Real-time progress bar
- Volume control
- Actual track duration loaded from audio metadata

---

### 🔐 Privacy & Offline-First
- No backend
- No servers
- No tracking
- No user data collection

All data (Focus DNA, playlists, preferences) is stored locally using `localStorage`.

---

## 🛠️ Tech Stack

- **HTML** – Semantic structure
- **CSS** – Modern UI with animations and gradients
- **JavaScript** – App logic, AI rules, and state management
- **Web Audio API** – Audio playback and metadata handling
- **LocalStorage** – Persistent offline data

---

## 🧠 How the AI Works

This project uses **explainable, rule-based AI logic**:
- Keyword matching for mood detection
- Behavioral scoring for Focus DNA
- Time-based and distraction-aware decisions for Smart Sessions

No black-box models — every decision is transparent and debuggable.

---

## 🚀 Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/soundscape-ai.git

## 👤 Author
Developed by **Tanishk Singh Yadav**  

