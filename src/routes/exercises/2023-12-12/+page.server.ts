import type { PageServerLoad } from './$types';
import fs from 'fs';
import path from 'path';

// Get the directory of the pages
let cwd = process.cwd();
console.log(`🚀 ~ file: +page.server.ts:7 ~ cwd:`, cwd)
console.log(`🚀 ~ file: +page.server.ts:9 ~ process:`, process)
const pagesDirectory = path.join(process.cwd(), './src/routes/exercises');
console.log(`🚀 ~ file: +page.server.ts:9 ~ pagesDirectory:`, pagesDirectory)
// Read the directory and filter out non-directory files

const pages = fs.readdirSync(pagesDirectory).filter(file => {
    return fs.statSync(path.join(pagesDirectory, file)).isDirectory();
});

export const load = (async () => {
    return {
        props: {
            pages
        }
    };
}) satisfies PageServerLoad;


