# Portfolio Starter

A personal portfolio with a project showcase, work timeline, and a real working contact form (JSON-file persistence + password-guarded admin viewer).

## What's inside

```
portfolio/
  server.js                   # express + /api/contact + /admin
  lib/messages.js             # JSON-file store at lib/data/messages.json
  routes/contact.js           # POST /api/contact (validated)
  routes/admin.js             # GET /admin/messages (Basic auth, ADMIN_PASSWORD env)
  public/index.html           # hero + selected work + about + timeline + contact
  public/app.js               # contact form submit
  public/styles.css           # dark theme, accent #f59e0b
```

## Start it locally

```bash
npm install
npm start
```

Open http://localhost:3000.

## Customizing

Replace placeholder content directly in `public/index.html`: your name, projects, timeline entries, links. The hero still uses "Your Name" — that's the first thing to swap.

## Contact form persistence

Submissions land in `lib/data/messages.json` on EFS — they survive restarts.

## Admin viewer

Set `ADMIN_PASSWORD` as an env var (VibeKit `/env`). Then hit `/admin/messages` with HTTP Basic auth (any username, the password you set). Returns JSON.

## Ask the agent

- "Send me an email when someone submits the contact form."
- "Add a /blog section to my portfolio."
- "Swap the gradient project images for real screenshots — I'll paste links."
