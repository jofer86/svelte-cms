import { dev } from '$app/environment';

export const SITE_URL = dev ? 'http://localhost:5173' : process.env.SITE_URL;