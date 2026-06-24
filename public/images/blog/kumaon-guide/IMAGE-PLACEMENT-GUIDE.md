# Blog Post Image Placement Guide
## /blog/kumaon-himalayas-travel-guide-wellness-2026

Copy all 12 WebP files into your project at:
`/public/images/blog/kumaon-guide/`

---

## Image Map

| File | Role in Blog Post | Alt Text (SEO) |
|------|-------------------|----------------|
| `01-panchachuli-peaks-sunrise-munsiyari.webp` | **HERO IMAGE** — top of post | Panchachuli peaks at sunrise from Munsiyari, Kumaon Himalayas |
| `02-khaliya-top-sunrise-panorama.webp` | Section: Khaliya Top trek | Khaliya Top sunrise panorama, Munsiyari, Uttarakhand |
| `03-oak-forest-trail-munsiyari.webp` | Section: Forest trails / nature walks | Oak and pine forest trail near Munsiyari, Kumaon |
| `04-lichen-park-kumaon-closeup.webp` | Section: Lichen Park / biodiversity | Lichen Park close-up, ancient oak forest, Kumaon Himalayas |
| `05-bhotia-shauka-woman-weaving.webp` | Section: Bhotia/Shauka culture | Bhotia Shauka woman weaving traditional textile, Darma Valley |
| `06-adi-kailash-parvati-sarovar-reflection.webp` | Section: Adi Kailash pilgrimage | Adi Kailash Jolingkong lake Parvati Sarovar, Pithoragarh |
| `07-om-parvat-sacred-himalaya.webp` | Section: Om Parvat / sacred peaks | Om Parvat sacred Himalaya, natural Om symbol in snow |
| `08-kasar-devi-temple-sunset.webp` | Section: Kasar Devi / spiritual Almora | Kasar Devi temple at sunset, Almora, Kumaon |
| `09-kumaoni-food-spread-traditional.webp` | Section: Kumaoni cuisine | Traditional Kumaoni food spread — aloo ke gutke, mandua roti, bhaang ki chutney |
| `10-himalayan-monal-pheasant-kumaon.webp` | Section: Wildlife / birdwatching | Himalayan Monal pheasant pair, state bird of Uttarakhand |
| `11-mountain-road-munsiyari-town.webp` | Section: Getting there / Munsiyari town | Munsiyari town with Panchachuli peaks backdrop, Kumaon |
| `12-small-group-trekkers-himalaya.webp` | Section: About our retreats / CTA | Small group trekkers Himalayan expedition, Himalayan Serenity Travel |

---

## Suggested Blog Structure with Image Placement

```
[HERO: 01-panchachuli-peaks-sunrise-munsiyari.webp]

# The Complete Guide to Kumaon Himalayas: Wellness, Culture & Adventure 2026

## Why Kumaon? (Beyond Rishikesh)
...text...

## Getting to Munsiyari
[11-mountain-road-munsiyari-town.webp]
...text...

## Khaliya Top: The Sunrise Trek
[02-khaliya-top-sunrise-panorama.webp]
...text...

## Forest Bathing in Ancient Oak Trails
[03-oak-forest-trail-munsiyari.webp]
...text...

## Lichen Park: Kumaon's Hidden Gem
[04-lichen-park-kumaon-closeup.webp]
...text...

## The Bhotia & Shauka People of Darma Valley
[05-bhotia-shauka-woman-weaving.webp]
...text...

## Sacred Peaks: Adi Kailash Yatra
[06-adi-kailash-parvati-sarovar-reflection.webp]
...text...

## Om Parvat: Where Nature Writes the Divine
[07-om-parvat-sacred-himalaya.webp]
...text...

## Kasar Devi & the Spiritual Energy of Almora
[08-kasar-devi-temple-sunset.webp]
...text...

## Kumaoni Cuisine: What You'll Eat
[09-kumaoni-food-spread-traditional.webp]
...text...

## Wildlife: The Himalayan Monal
[10-himalayan-monal-pheasant-kumaon.webp]
...text...

## Travel with Himalayan Serenity: Small Groups, Real Experiences
[12-small-group-trekkers-himalaya.webp]
...CTA to /retreats/panchachuli-wellness...
```

---

## React/JSX Usage in Your Blog Component

```jsx
<img
  src="/images/blog/kumaon-guide/01-panchachuli-peaks-sunrise-munsiyari.webp"
  alt="Panchachuli peaks at sunrise from Munsiyari, Kumaon Himalayas"
  width={1600}
  height={972}
  loading="eager"   // hero image — load immediately
  className="w-full h-[60vh] object-cover rounded-xl"
/>

// All other images use loading="lazy":
<img
  src="/images/blog/kumaon-guide/02-khaliya-top-sunrise-panorama.webp"
  alt="Khaliya Top sunrise panorama, Munsiyari, Uttarakhand"
  width={1200}
  height={675}
  loading="lazy"
  className="w-full rounded-xl my-8"
/>
```

---

## Sizes Summary
| File | Dimensions | Size |
|------|-----------|------|
| 01-panchachuli-peaks-sunrise-munsiyari.webp | 1600×972 | 248 KB |
| 02-khaliya-top-sunrise-panorama.webp | 1200×675 | 86 KB |
| 03-oak-forest-trail-munsiyari.webp | 1200×800 | 330 KB |
| 04-lichen-park-kumaon-closeup.webp | 1200×800 | 233 KB |
| 05-bhotia-shauka-woman-weaving.webp | 1200×1803 | 207 KB |
| 06-adi-kailash-parvati-sarovar-reflection.webp | 1080×605 | 87 KB |
| 07-om-parvat-sacred-himalaya.webp | 1000×650 | 93 KB |
| 08-kasar-devi-temple-sunset.webp | 700×400 | 62 KB |
| 09-kumaoni-food-spread-traditional.webp | 1200×675 | 133 KB |
| 10-himalayan-monal-pheasant-kumaon.webp | 1200×800 | 210 KB |
| 11-mountain-road-munsiyari-town.webp | 600×400 | 42 KB |
| 12-small-group-trekkers-himalaya.webp | 1200×800 | 178 KB |
| **TOTAL** | | **1,910 KB** (was 6,111 KB — **69% savings**) |
