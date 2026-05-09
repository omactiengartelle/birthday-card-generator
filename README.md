# Birthday Card Generator

Generate beautiful AI-powered birthday card designs, e-cards, and birthday party invitations from text descriptions. Describe the mood, theme, colors, characters, and decorations you want — balloons, cakes, candles, confetti, ribbons, florals — and get a polished, print-ready greeting card image back. Perfect for personalized birthday cards for kids, adults, friends, family, coworkers, milestone birthdays (1st, 16th, 21st, 30th, 50th), birthday Instagram posts, WhatsApp greetings, Etsy printable card sellers, and party planners.

Powered by the Neta AI image generation API (api.talesofai.com) — the same service as neta.art/open.

## Install

```bash
npx skills add omactiengartelle/birthday-card-generator
```

Or via ClawHub:

```bash
clawhub install birthday-card-generator
```

## Usage

```bash
node birthdaycardgenerator.js "your description here" --token YOUR_TOKEN
```

### Examples

Generate a default festive portrait card:

```bash
node birthdaycardgenerator.js "festive birthday greeting card with balloons, confetti, and a layered cake" --token YOUR_TOKEN
```

A child's birthday card in landscape:

```bash
node birthdaycardgenerator.js "cute kids birthday card, pastel colors, cartoon animals around a giant cupcake, rainbow background" --size landscape --token YOUR_TOKEN
```

A milestone 50th birthday card:

```bash
node birthdaycardgenerator.js "elegant 50th birthday card, gold and black palette, champagne flutes, sparkles, sophisticated typography area" --token YOUR_TOKEN
```

Reuse the style of a previous generation:

```bash
node birthdaycardgenerator.js "birthday card for coworker, modern minimalist" --ref <picture_uuid> --token YOUR_TOKEN
```

## Options

| Option | Description | Default |
| --- | --- | --- |
| (positional) | The text prompt describing the card | built-in festive prompt |
| `--size` | One of `portrait`, `landscape`, `square`, `tall` | `portrait` |
| `--token` | Your Neta API token | (required) |
| `--ref` | A reference image UUID for style inheritance | none |

### Sizes

| Name | Dimensions |
| --- | --- |
| `square` | 1024 × 1024 |
| `portrait` | 832 × 1216 |
| `landscape` | 1216 × 832 |
| `tall` | 704 × 1408 |

## Output

Returns a direct image URL.

## Token setup

This skill requires a Neta API token. Get a free trial token at <https://www.neta.art/open/>.

Pass the token to the script using the `--token` flag:

```bash
node birthdaycardgenerator.js "your prompt" --token YOUR_TOKEN
```

You can also expand a shell variable inline:

```bash
node birthdaycardgenerator.js "your prompt" --token "$NETA_TOKEN"
```

The `--token` flag is the only way to provide the token — the script does not read environment variables or local files.

This skill requires a Neta API token (free trial available at https://www.neta.art/open/).

## Example Output

```bash
node birthdaycardgenerator.js "festive birthday greeting card design, vibrant celebratory composition with balloons, confetti, layered cake, candles, ribbons and floral accents, soft gradient background, decorative typography placeholder area, cheerful joyful aesthetic, polished print-ready greeting card layout"
```

![Example output](https://oss.talesofai.cn/picture/7e309d28-424d-4566-a974-e20ebddb9609.webp)

> Prompt: *"festive birthday greeting card design, vibrant celebratory composition with balloons, confetti, layered cake, candles, ribbons and floral accents, soft gradient background, decorative typography placeholder area, cheerful joyful aesthetic, polished print-ready greeting card layout"*
