import { access, cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const clientDir = path.join(dist, 'client');
const serverDir = path.join(dist, 'server');

const staticDirectories = ['assets', 'css', 'data', 'js'];
const staticFiles = ['index.html', 'cases.json', 'sources.json'];
const embeddedExtensions = new Set(['.css', '.html', '.js', '.json', '.md', '.txt']);

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function toRoute(filePath) {
  const relative = path.relative(root, filePath).split(path.sep).join('/');
  return `/${relative}`;
}

function contentTypeFor(route) {
  const ext = path.extname(route).toLowerCase();
  const types = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.md': 'text/markdown; charset=utf-8',
    '.mp3': 'audio/mpeg',
    '.png': 'image/png',
    '.txt': 'text/plain; charset=utf-8'
  };
  return types[ext] || 'application/octet-stream';
}

async function copyIfPresent(source, target) {
  if (await exists(source)) {
    await cp(source, target, { recursive: true });
  }
}

await rm(dist, { recursive: true, force: true });
await mkdir(serverDir, { recursive: true });
await mkdir(clientDir, { recursive: true });

for (const directory of staticDirectories) {
  await copyIfPresent(path.join(root, directory), path.join(clientDir, directory));
}

for (const file of staticFiles) {
  await copyIfPresent(path.join(root, file), path.join(clientDir, file));
}

const embeddedAssets = {};
const candidateFiles = [
  ...staticFiles.map((file) => path.join(root, file)),
  ...(await Promise.all(staticDirectories.map(async (directory) => {
    const source = path.join(root, directory);
    return await exists(source) ? collectFiles(source) : [];
  }))).flat()
];

for (const filePath of candidateFiles) {
  if (!embeddedExtensions.has(path.extname(filePath).toLowerCase())) continue;
  const route = toRoute(filePath);
  embeddedAssets[route] = {
    body: await readFile(filePath, 'utf8'),
    contentType: contentTypeFor(route)
  };
}

const workerSource = `const EMBEDDED_ASSETS = ${JSON.stringify(embeddedAssets)};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

function safePathname(url) {
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    pathname = url.pathname;
  }

  if (!pathname || pathname === '/') return '/index.html';
  if (!pathname.startsWith('/')) pathname = '/' + pathname;
  if (pathname.includes('\\\\0') || pathname.split('/').includes('..')) return null;
  if (pathname.endsWith('/')) return pathname + 'index.html';
  return pathname;
}

function responseFromEmbedded(route, status = 200) {
  const asset = EMBEDDED_ASSETS[route] || EMBEDDED_ASSETS['/index.html'];
  return new Response(asset.body, {
    status,
    headers: {
      ...SECURITY_HEADERS,
      'Content-Type': asset.contentType,
      'Cache-Control': route === '/index.html' ? 'no-cache' : 'public, max-age=3600'
    }
  });
}

function withSecurityHeaders(response) {
  const next = new Response(response.body, response);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    next.headers.set(key, value);
  }
  return next;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const route = safePathname(url);

    if (!route) {
      return new Response('Bad request', { status: 400, headers: SECURITY_HEADERS });
    }

    if (EMBEDDED_ASSETS[route]) {
      return responseFromEmbedded(route);
    }

    if (env?.ASSETS?.fetch) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return withSecurityHeaders(assetResponse);
      }
    }

    const acceptsHtml = request.headers.get('Accept')?.includes('text/html');
    if (acceptsHtml) {
      return responseFromEmbedded('/index.html');
    }

    return new Response('Not found', { status: 404, headers: SECURITY_HEADERS });
  }
};
`;

await writeFile(path.join(serverDir, 'index.js'), workerSource);

console.log(`Built UFO Command Deck for Sites with ${Object.keys(embeddedAssets).length} embedded text assets.`);
