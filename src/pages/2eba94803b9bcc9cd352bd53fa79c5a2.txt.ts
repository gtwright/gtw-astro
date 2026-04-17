export const prerender = true;
import { createIndexNowKeyRoute } from '@jdevalk/astro-seo-graph';
import { INDEXNOW_KEY } from '../consts';

export const GET = createIndexNowKeyRoute({ key: INDEXNOW_KEY });
