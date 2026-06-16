# AI Study Companion

An immersive, full-stack learning platform designed to elevate your study sessions with built-in active recall flashcards, quiz generators, Pomodoro work-play intervals, and dynamic synthetic focus soundscapes (including binaural beat generators).

---

## 🚀 Quick Local Setup Guide for Students

Follow these simple steps to run this application inside **Visual Studio Code (VSCode)** on your local machine.

### 📋 Prerequisites & Installation

To run this application locally, you will need to install the following core software:

1. **Visual Studio Code (VSCode)**
   - The primary code editor we will use to write, view, and execute our code.
   - [Download and Install VSCode](https://code.visualstudio.com/)

2. **Node.js (LTS Version v18.x or v20.x)**
   - Node.js functions as our local server runtime, and comes bundled with **npm** (Node Package Manager) to download framework libraries.
   - [Download and Install Node.js](https://nodejs.org/)
   - *How to verify installation:* Open your computer's terminal (or command prompt) and run:
     ```bash
     node -v
     npm -v
     ```
     *(Both commands should output a version number, e.g., `v20.11.0` and `10.2.4`).*

---

### 🔌 Recommended VSCode Extensions (Optional but highly recommended)
To make editing code easier, open VSCode, click on the **Extensions** icon on the left sidebar (or press `Ctrl+Shift+X` / `Cmd+Shift+X`), search for, and install these helpful extensions:

* **Tailwind CSS IntelliSense** (by Tailwind Labs): Provides auto-completion and syntax suggestions for styling classes.
* **Prettier - Code formatter** (by Prettier): Automatically formats your files on save to keep the layout tidy.
* **ESLint** (by Microsoft): Helps detect syntax errors or missing imports instantly while you edit.

---

---

### ⚙️ Step-by-Step Installation

#### 1. Unzip and Open in VSCode
- Export or download the project ZIP file from AI Studio.
- Extract the ZIP directory to a folder on your computer.
- Open VSCode, click **File > Open Folder...**, and select the extracted folder.

#### 2. Install Project Dependencies
Open your integrated VSCode terminal (`` Ctrl + ` `` or **Terminal > New Terminal** in the top menu) and run the standard install command:
```bash
npm install
```
This downloads and registers all dependencies (such as React, Tailwind CSS, Express, and Lucide icons).

#### 3. Setup Your Local Environment Secrets
- In the file tree, locate the `.env.example` file.
- Create a copy of it in the same directory and rename it to exactly `.env`.
- Open `.env` and configure your API key to access smart features:
  ```env
  GEMINI_API_KEY="your-actual-api-key-here"
  APP_URL="http://localhost:3000"
  PORT=3000
  ```
  *(Note: You can obtain a free API key securely from Google AI Studio).*

---

### 🖥️ How to Run the Application

You can run the application in two different modes. Choose the one that fits your learning style!

#### Option A: Run as a Web Application (Recommended)
This boots up the custom local Express and Vite development servers under one singular framework.

1. Run the local development command:
   ```bash
   npm run dev
   ```
2. Open your web browser and go to:
   ```text
   http://localhost:3000
   ```

#### Option B: Run as a Desktop App (Electron)
Take your study sessions completely offline or run them in a dedicated system utility window on your taskbar.

1. Ensure the app has been built once for static assets:
   ```bash
   npm run build
   ```
2. Launch the desktop version:
   ```bash
   npm run desktop:start
   ```

---

### 🛠️ Available Scripts Quick Reference

These commands can be run directly from your VSCode command bar/terminal:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Spins up the full-stack system locally at `http://localhost:3000`. |
| `npm run build` | Bundles and optimizes the production build files inside the `dist/` directory. |
| `npm run start` | Serves the production bundle on a local port. |
| `npm run lint` | Runs the TypeScript compiler check to verify type safety and prevent syntax errors. |
| `npm run desktop:start` | Boots the native window client of the companion on Windows or macOS. |

---

## 🧠 Smart Features Included

- **🧠 Focus Soundscapes with Live Web-Synth:** Play pure binaural beats (40 Hz frequency difference between left and right channels) and rich mathematical pink noise synthesized locally inside your browser interface to maximize brain alertness.
- **🎧 Cloud Audio Streams:** Put your own active study music streaming links (direct `.mp3` / `.wav` audio endpoints) directly into the stream module.
- **⏱️ Pomodoro Loop Intervaller:** Study in bursts with configurable work and play intervals.
- **📚 Active Quiz & Recall Cards:** Generate dynamic cards to reinforce knowledge concepts.
