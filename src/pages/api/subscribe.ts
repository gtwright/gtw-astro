import type { APIRoute } from 'astro';
import { BUTTONDOWN_API_KEY } from 'astro:env/server';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ClientResponse =
  | { ok: true; status: 'created' | 'existing' }
  | { ok: false; error: 'invalid' | 'server' };

function json(body: ClientResponse, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...(init.headers ?? {}),
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let payload: { email?: unknown; website?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid' }, { status: 200 });
  }

  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const honeypot = typeof payload.website === 'string' ? payload.website : '';

  if (honeypot) {
    return json({ ok: true, status: 'created' });
  }

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return json({ ok: false, error: 'invalid' });
  }

  const referrerUrl = request.headers.get('referer') ?? undefined;

  try {
    const res = await fetch('https://api.buttondown.com/v1/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Token ${BUTTONDOWN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        ...(referrerUrl ? { referrer_url: referrerUrl } : {}),
      }),
    });

    if (res.status === 201 || res.status === 200) {
      const body = (await res.json().catch(() => ({}))) as {
        type?: string;
        firewall_reasons?: Array<{ code?: string; reason?: string }>;
        creation_date?: string;
      };

      if (body.type === 'blocked' || (body.firewall_reasons?.length ?? 0) > 0) {
        return json({ ok: false, error: 'invalid' });
      }

      return json({ ok: true, status: 'created' });
    }

    if (res.status === 400) {
      const text = await res.text();
      if (/already|exist|duplicate/i.test(text)) {
        return json({ ok: true, status: 'existing' });
      }
      return json({ ok: false, error: 'invalid' });
    }

    console.error('Buttondown subscribe failed', res.status, await res.text().catch(() => ''));
    return json({ ok: false, error: 'server' });
  } catch (err) {
    console.error('Buttondown subscribe threw', err);
    return json({ ok: false, error: 'server' });
  }
};
