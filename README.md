# 🛸 XENOARCHIVE // Global UFO Encounter Database

An interactive 3D globe visualization documenting UFO/UAP encounters worldwide, aggregating declassified government sources, FOIA releases, MUFON cases, and international databases.

## 🌐 Live Features

- **Interactive 3D Globe** - Three.js holographic Earth with clickable encounter markers
- **Multi-Source Aggregation** - Project Blue Book, Black Vault, MUFON, NUFORC, AARO, international files
- **Tiered Classification** - Color-coded markers by evidence quality and strangeness
- **Timeline Navigation** - Explore cases from 1947 to present
- **Document Linking** - Direct access to declassified source materials
- **Alien Ship UI** - Immersive command deck interface theme

## 📊 Data Sources

### US Government Programs
| Program | Years | Cases | Status |
|---------|-------|-------|--------|
| Project Sign | 1948 | ~200 | Declassified |
| Project Grudge | 1949-52 | 244 | Declassified |
| Project Blue Book | 1952-69 | 12,618 | Declassified |
| AATIP/AAWSAP | 2007-17 | Classified | Partially Released |
| UAPTF | 2017-22 | ~400+ | Ongoing |
| AARO | 2022+ | Active | Current |

### Civilian Organizations
| Organization | Founded | Cases | URL |
|--------------|---------|-------|-----|
| MUFON | 1969 | 120,000+ | mufon.com |
| NUFORC | 1974 | 170,000+ | nuforc.org |
| The Black Vault | 1996 | 3.8M+ pages | theblackvault.com |

### International Sources
- 🇬🇧 UK MOD Files (~12,000 cases)
- 🇫🇷 GEIPAN France (~2,500 cases)
- 🇧🇷 Brazil Archives (~3,000 cases)
- 🇨🇱 Chile CEFAA (Active)
- 🇨🇦 Canada DND (Declassified)
- 🇦🇺 Australia RAAF (Historical)

## 🚀 Quick Start

1. Open `index.html` in a modern browser
2. Globe auto-rotates - click markers to view case details
3. Use sidebar filters to browse by source/classification
4. Timeline bar navigates through UFO history

## 📁 Project Structure

```
ufo-globe/
├── index.html          # Main application (self-contained)
├── README.md           # This file
├── data/
│   └── sources.json    # Data source configurations
└── assets/
    └── (optional icons/images)
```

## 🔌 API Integration Points

### NUFORC Dataset
```javascript
// GitHub processed dataset with coordinates
const NUFORC_DATA = 'https://github.com/timothyrenner/nuforc_sightings_data';
// Hugging Face: https://huggingface.co/datasets/kcimc/NUFORC
```

### Black Vault CIA Collection
```javascript
const CIA_UFO_ARCHIVE = {
  original: 'https://documents.theblackvault.com/documents/cia/CIAUFO-CD-FULLCONTENTS.zip',
  searchable: 'https://documents.theblackvault.com/documents/cia/CIAUFO-COLLECTION-SEARCHABLE.zip'
};
```

### MUFON CMS
```javascript
// Requires MUFON API access
const MUFON_CMS = 'https://mufoncms.com';
```

## 🎨 Customization

### Color Scheme (CSS Variables)
```css
:root {
  --cyan-glow: #00ffd4;      /* Primary accent */
  --magenta-glow: #ff00aa;   /* Secondary accent */
  --gold-ancient: #ffd700;   /* AATIP era */
  --blue-project: #00aaff;   /* Blue Book era */
  --red-alert: #ff3355;      /* Tier 1 cases */
}
```

### Adding New Cases
```javascript
UFO_CASES.push({
  id: 'unique-id',
  name: 'Case Name',
  location: 'City, Country',
  lat: 0.0000,
  lng: 0.0000,
  date: 'YYYY-MM-DD',
  shape: 'Disc/Triangle/Light/etc',
  tier: 1, // 1-4
  source: 'bluebook', // source code
  summary: 'Description...',
  documents: [{ name: '', type: '', url: '' }]
});
```

## 📜 License

Educational/research use. Data sourced from public FOIA releases and civilian databases.

## 🔗 Key Resources

- [National Archives - Project Blue Book](https://www.archives.gov/research/military/air-force/ufos)
- [The Black Vault](https://www.theblackvault.com)
- [NUFORC](https://nuforc.org)
- [MUFON](https://www.mufon.com)
- [AARO Official](https://www.aaro.mil)
- [UK National Archives UFO Files](https://www.nationalarchives.gov.uk/ufos/)
- [GEIPAN France](https://www.cnes-geipan.fr/)
