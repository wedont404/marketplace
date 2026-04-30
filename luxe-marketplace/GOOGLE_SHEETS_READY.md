# Google Sheets Ready Notes

This project is now prepared for a Google Sheets + Apps Script flow.

## Frontend changes already made

- API POST requests now send `action` inside JSON for Apps Script compatibility.
- Pricing is displayed in Rwandan Francs.
- Registration flow was added.
- Three editable admin profiles were added:
  - Tresor
  - Cyusa
  - Asly
- Admin workspace now includes:
  - editable admin style cards
  - index.html preview showcase area
  - database connection menu

## Next step after Apps Script deployment

When you deploy your Apps Script Web App, place the URL into:

`.env.local`

```env
NEXT_PUBLIC_API_URL=YOUR_APPS_SCRIPT_WEB_APP_URL
```

Then restart the Next.js dev server.
