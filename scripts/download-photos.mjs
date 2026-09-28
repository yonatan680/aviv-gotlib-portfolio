import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve("D:/Aviv photo web 1");
const OUT = path.join(ROOT, "public", "work");
const raw = await readFile(path.join(ROOT, "scripts", "photo-urls.json"), "utf8");
const URLS = JSON.parse(raw.replace(/^\uFEFF/, ""));

await mkdir(OUT, { recursive: true });

const concurrency = 8;
let index = 0;
let ok = 0;
let fail = 0;

async function worker() {
	while (index < URLS.length) {
		const i = index++;
		const dest = path.join(OUT, `${String(i + 1).padStart(3, "0")}.jpg`);
		if (existsSync(dest)) {
			ok++;
			continue;
		}
		const url = `${URLS[i]}=w1400`;
		try {
			const res = await fetch(url, {
				headers: {
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
					Referer: "https://photos.google.com/",
					Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
				},
			});
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const buf = Buffer.from(await res.arrayBuffer());
			if (buf.length < 2000) throw new Error(`tiny ${buf.length}`);
			await writeFile(dest, buf);
			ok++;
			if ((i + 1) % 20 === 0) console.log(`saved ${i + 1}/${URLS.length}`);
		} catch (err) {
			fail++;
			console.error(`fail ${i + 1}:`, err.message);
		}
	}
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));
console.log(JSON.stringify({ total: URLS.length, ok, fail }));
