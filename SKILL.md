---
name: birthday-card-generator
description: Generate beautiful AI-powered birthday card designs, e-cards, and birthday party invitations with festive themes, custom illustrations, balloons, cakes, and decorative greetings. Perfect for personalized birthday cards for kids, adults, friends, family, coworkers, milestone birthdays (1st, 16th, 21st, 30th, 50th), birthday Instagram posts, WhatsApp greetings, Etsy printable card sellers, and party planners looking for unique birthday wishes graphics via the Neta AI image generation API (free trial at neta.art/open).
tools: Bash
---

# Birthday Card Generator

Generate beautiful AI-powered birthday card designs, e-cards, and birthday party invitations with festive themes, custom illustrations, balloons, cakes, and decorative greetings. Perfect for personalized birthday cards for kids, adults, friends, family, coworkers, milestone birthdays (1st, 16th, 21st, 30th, 50th), birthday Instagram posts, WhatsApp greetings, Etsy printable card sellers, and party planners looking for unique birthday wishes graphics.

## Token

Requires a Neta API token (free trial at <https://www.neta.art/open/>). Pass it via the `--token` flag.

```bash
node <script> "your prompt" --token YOUR_TOKEN
```

## When to use
Use when someone asks to generate or create ai birthday card generator images.

## Quick start
```bash
node birthdaycardgenerator.js "your description here" --token YOUR_TOKEN
```

## Options
- `--size` — `portrait`, `landscape`, `square`, `tall` (default: `portrait`)
- `--ref` — reference image UUID for style inheritance

## Install
```bash
npx skills add omactiengartelle/birthday-card-generator
```
