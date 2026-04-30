# Luxe Marketplace

Premium frontend-only marketplace built with Next.js App Router, React, Tailwind CSS, Framer Motion, Lucide icons, and a Google Sheets / Apps Script backend pattern.

Google Sheets target currently planned around:

`1M67XJtour1UwVTOnJow1tiy3Te_e6SHYfjrd9w_G0cw`

## Included

- Homepage with premium dark visual direction
- Marketplace page with search and filters
- Product details page
- About and Contact pages
- Login page with future-ready role-based auth mock
- User dashboard
- Team Workspace / Contributor Portal
- Google Sheets API utility layer with local fallback data

## Demo login

- Admin: `tresor@luxe.rw` / `tresor123`
- Admin: `cyusa@luxe.rw` / `cyusa123`
- Admin: `asly@luxe.rw` / `asly123`
- Contributor: `contributor@luxe.rw` / `demo123`

## Google Sheets / Apps Script setup

Set `NEXT_PUBLIC_API_URL` to your deployed Apps Script web app URL.

Supported action patterns in the frontend:

- `?action=getTemplates`
- `?action=getTemplate&id=001`
- `?action=addOrder`
- `?action=sendMessage`
- `?action=getContributors`
- `?action=getUploads`
- `?action=getUsers`
- `?action=uploadTemplate`
- `?action=loginUser`
- `?action=registerUser`
- `?action=getAdminProfiles`
- `?action=saveAdminProfile`
- `?action=getHtmlShowcases`
- `?action=getDbConnections`

## Suggested Sheets

- `Templates`
- `Orders`
- `Users`
- `Messages`
- `Reviews`
- `Contributors`
- `Uploads`

## Run locally

```bash
npm install
npm run dev
```

## Apps Script

Paste-ready Apps Script files are in:

`google-apps-script/`
