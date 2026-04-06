import { existsSync } from 'node:fs';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Конфігурація ─────────────────────────────────────────────────────────────

const SOURCE_DIR = path.resolve(__dirname, '../public/images');
const THUMB_DIR = path.resolve(__dirname, '../public/images/thumbs');

const THUMB_CONFIG = {
    width: 640, // px — достатньо для картки 320px при 2x DPI
    quality: 82, // WebP quality (0–100)
    format: 'webp', // конвертуємо у WebP для максимальної стиснення
};

const SUPPORTED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);

// ── Утиліти ───────────────────────────────────────────────────────────────────

/**
 * Повертає ім'я файлу мініатюри для вхідного файлу.
 * "My Photo 1.png" → "My Photo 1.webp"
 */
const getThumbName = (filename) => {
    const ext = path.extname(filename);
    return filename.slice(0, -ext.length) + '.' + THUMB_CONFIG.format;
};

// ── Основна логіка ────────────────────────────────────────────────────────────

const run = async () => {
    if (!existsSync(SOURCE_DIR)) {
        console.error(`❌  SOURCE_DIR не знайдено: ${SOURCE_DIR}`);
        process.exit(1);
    }

    await mkdir(THUMB_DIR, { recursive: true });

    const allFiles = await readdir(SOURCE_DIR);
    const imageFiles = allFiles.filter((f) => {
        const ext = path.extname(f).toLowerCase();
        return SUPPORTED_EXTENSIONS.has(ext) && !f.startsWith('.thumbs');
    });

    if (imageFiles.length === 0) {
        console.warn('⚠️  Зображень не знайдено у', SOURCE_DIR);
        return;
    }

    console.log(`\n🖼  Знайдено ${imageFiles.length} зображень. Генеруємо мініатюри...\n`);

    const results = await Promise.allSettled(
        imageFiles.map(async (filename) => {
            const sourcePath = path.join(SOURCE_DIR, filename);
            const thumbName = getThumbName(filename);
            const thumbPath = path.join(THUMB_DIR, thumbName);

            await sharp(sourcePath)
                .resize({
                    width: THUMB_CONFIG.width,
                    withoutEnlargement: true, // не збільшуємо маленькі зображення
                })
                .webp({ quality: THUMB_CONFIG.quality })
                .toFile(thumbPath);

            return { filename, thumbName };
        })
    );

    let success = 0;
    let failed = 0;

    results.forEach((result) => {
        if (result.status === 'fulfilled') {
            console.log(`  ✅  ${result.value.filename}  →  thumbs/${result.value.thumbName}`);
            success++;
        } else {
            console.error(`  ❌  Помилка:`, result.reason?.message ?? result.reason);
            failed++;
        }
    });

    console.log(`\n📦  Готово: ${success} успішно, ${failed} помилок.`);
    console.log(`📁  Мініатюри збережено у: ${THUMB_DIR}\n`);
};

run();
