# Current UAP News Ingestion Workflow

Purpose: keep `data/current_news.js` as a source-linked archive of recent public UAP/UFO releases, reporting, and official records.

## Intake Rules

- Prefer official releases, committee letters, agency portals, court records, and primary documents.
- Use reputable news coverage when it adds public context or identifies specific media/documents.
- Do not add claims that are not supported by the linked source.
- Keep each item scoped to one public event, release, article, document, or source package.
- Use absolute `https://` URLs only.

## Required Fields

Each item in `CURRENT_UAP_NEWS` should include:

```javascript
{
    id: "news-YYYY-MM-DD-short-slug",
    source: "current-news",
    title: "Reader-facing title",
    refNumber: "NEWS-YYYY-MM-DD-SOURCE",
    date: "YYYY-MM-DD",
    pages: 1,
    classification: "PUBLIC",
    fileType: "article",
    fileSize: "News article",
    author: "Publisher or agency",
    location: "Washington, D.C.",
    relatedCases: [],
    tags: ["current-news"],
    summary: "One sentence grounded in the source.",
    description: "Short archive note with no unsupported conclusions.",
    url: "https://example.com/source"
}
```

## App Intake Helper

The app now includes a `News Intake` utility panel. It generates a correctly shaped draft object from title, date, author, URL, and summary fields.

Use it for drafting, then review the generated object against the checklist below before adding it to `data/current_news.js`.

## Review Checklist

- URL opens and points to the cited source.
- Date is the publication or release date, not the ingestion date.
- Summary and description are paraphrased, source-backed, and conservative.
- Tags include `current-news` and any release identifier such as `release-02`.
- Related cases use existing case ids only.
- No raw HTML is added to fields.

## Validation

Run these after edits:

```powershell
node --check data/current_news.js
node --check js/data-loader.js
```

Then start the local app and verify:

- Archives can show current news entries through `UFO_DATA.archiveDocuments`.
- Theater Mode Signal Watch uses the newest dated item.
- No console errors appear from malformed URLs or missing fields.
