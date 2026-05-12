# architect-lp

This is an Astro + Tailwind landing page project configured to deploy to GitHub Pages.

Deployment options

1. Automatic (recommended) — GitHub Actions
   - The repository includes a workflow at `.github/workflows/gh-pages.yml` that builds the site on push to `main` and publishes the `dist/` directory to the `gh-pages` branch. No extra secrets are required — the action uses the built-in `GITHUB_TOKEN`.

2. Local deploy (optional)
   - Install dev dependencies and deploy from your machine:

     ```powershell
     npm ci; npm install --save-dev gh-pages; npm run deploy
     ```

   - Or install `gh-pages` once globally:

     ```powershell
     npm install -g gh-pages; npm run predeploy; gh-pages -d dist
     ```

Notes

- Make sure to update the `homepage` field in `package.json` with your GitHub username (replace `<your-github-username>`).
- The Astro `base` option in `astro.config.mjs` is set to `/architect-lp/` so static assets load correctly from GitHub Pages. If you rename the repository or publish as a user/organization page, update this accordingly.
