#!/usr/bin/env node
import process from 'node:process';

const SIZES = {
  square: { width: 1024, height: 1024 },
  portrait: { width: 832, height: 1216 },
  landscape: { width: 1216, height: 832 },
  tall: { width: 704, height: 1408 },
};

const DEFAULT_PROMPT = 'festive birthday greeting card design, vibrant celebratory composition with balloons, confetti, layered cake, candles, ribbons and floral accents, soft gradient background, decorative typography placeholder area, cheerful joyful aesthetic, polished print-ready greeting card layout';
const DEFAULT_SIZE = 'portrait';
const STYLE = 'cinematic';

function parseArgs(argv) {
  const args = { prompt: null, size: DEFAULT_SIZE, token: null, ref: null };
  const rest = argv.slice(2);
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === '--size') { args.size = rest[++i]; }
    else if (a === '--token') { args.token = rest[++i]; }
    else if (a === '--ref') { args.ref = rest[++i]; }
    else if (!a.startsWith('--') && args.prompt === null) { args.prompt = a; }
  }
  return args;
}

async function createTask({ token, prompt, size, ref }) {
  const dims = SIZES[size] || SIZES[DEFAULT_SIZE];
  const body = {
    storyId: 'DO_NOT_USE',
    jobType: 'universal',
    rawPrompt: [{ type: 'freetext', value: prompt, weight: 1 }],
    width: dims.width,
    height: dims.height,
    meta: { entrance: 'PICTURE,VERSE' },
    context_model_series: '8_image_edit',
  };
  if (ref) {
    body.inherit_params = { collection_uuid: ref, picture_uuid: ref };
  }
  const res = await fetch('https://api.talesofai.com/v3/make_image', {
    method: 'POST',
    headers: {
      'x-token': token,
      'x-platform': 'nieta-app/web',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`make_image failed: ${res.status} ${text}`);
  }
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    const data = await res.json();
    if (typeof data === 'string') return data;
    if (data && data.task_uuid) return data.task_uuid;
    throw new Error(`Unexpected response: ${JSON.stringify(data)}`);
  }
  const text = (await res.text()).trim().replace(/^"|"$/g, '');
  return text;
}

async function pollTask({ token, taskUuid }) {
  const url = `https://api.talesofai.com/v1/artifact/task/${taskUuid}`;
  for (let i = 0; i < 90; i++) {
    const res = await fetch(url, {
      headers: {
        'x-token': token,
        'x-platform': 'nieta-app/web',
        'content-type': 'application/json',
      },
    });
    if (res.ok) {
      const data = await res.json();
      const status = data.task_status;
      if (status && status !== 'PENDING' && status !== 'MODERATION') {
        return data;
      }
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error('Task polling timed out');
}

async function main() {
  const { prompt: promptArg, size, token: tokenFlag, ref } = parseArgs(process.argv);
  const TOKEN = tokenFlag;

  if (!TOKEN) {
    console.error('\n✗ Token required. Pass via: --token YOUR_TOKEN');
    console.error('  Get yours at: https://www.neta.art/open/');
    process.exit(1);
  }

  const prompt = promptArg || DEFAULT_PROMPT;

  try {
    const taskUuid = await createTask({ token: TOKEN, prompt, size, ref });
    const result = await pollTask({ token: TOKEN, taskUuid });
    let imageUrl = null;
    if (Array.isArray(result.artifacts) && result.artifacts.length > 0) {
      imageUrl = result.artifacts[0].url;
    }
    if (!imageUrl && result.result_image_url) {
      imageUrl = result.result_image_url;
    }
    if (!imageUrl) {
      console.error('No image URL in response:', JSON.stringify(result));
      process.exit(1);
    }
    console.log(imageUrl);
    process.exit(0);
  } catch (err) {
    console.error(`\n✗ ${err.message}`);
    process.exit(1);
  }
}

main();
