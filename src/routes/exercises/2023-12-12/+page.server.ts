import type { PageServerLoad } from './$types';
import { url, route } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

// Get the directory of the pages
let cwd = process.cwd();
const pagesDirectory = path.join(process.cwd(), './src/routes/exercises');
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


