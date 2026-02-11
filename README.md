# Task Timer Booker

A mobile-friendly stopwatch web app for timing and booking specific tasks.

## Run locally

Because this app is plain HTML/CSS/JS, you can open `index.html` directly in your browser.

Or run a local server:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Test on iPhone (Safari)

### Option 1: Test from your computer over Wi‑Fi

1. Make sure your computer and iPhone are on the same Wi‑Fi network.
2. In this project folder, start the server so it listens on all interfaces:

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

3. Find your computer's local IP address.
   - macOS: `ipconfig getifaddr en0` (or check System Settings → Network)
   - Linux: `hostname -I`
4. On your iPhone, open Safari and go to:

```text
http://YOUR_COMPUTER_IP:4173
```

Example: `http://192.168.1.25:4173`

> If it doesn't load, check your computer firewall settings and allow incoming connections on port `4173`.

### Option 2: Deploy and test from anywhere

Deploy the files (`index.html`, `styles.css`, `app.js`) to any static host (GitHub Pages, Netlify, Vercel), then open that URL on your iPhone.

### Optional: Add to Home Screen

In Safari, tap **Share** → **Add to Home Screen** to launch it like an app.

## Features

- Start timing a named task.
- Stop and book the timed task as a record.
- Persist booked tasks in local storage.
- Clear all bookings.
