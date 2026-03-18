# AGENTS.md

## Cursor Cloud specific instructions

### Project Overview

This is a vanilla HTML/CSS/JS UNO card game with **zero dependencies** — no package manager, no build tools, no frameworks. All source files (`index.html`, `style.css`, `script.js`) live at the repository root.

### Running the App

Serve files with Python's built-in HTTP server:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080` in a browser. Once `index.html` exists, the page loads automatically; otherwise the server shows a directory listing.

### Lint / Test / Build

- **No lint, test, or build tooling is configured.** The project's development rules (see `README.md`) explicitly prohibit frameworks and external dependencies.
- Code correctness is verified by opening the app in a browser and interacting with the game.

### Caveats

- The project is in early stages; not all source files may exist yet. Check the task list in `README.md` for current progress.
- There is no hot-reload. After editing files, refresh the browser manually.
