const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

// Turnstile Serverseitige Verifizierung
async function verifyTurnstile(token, secret, ip) {
  if (!token || !secret) return false;
  try {
    const formData = new FormData();
    formData.append('secret', secret);
    formData.append('response', token);
    if (ip) formData.append('remoteip', ip);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });
    const result = await res.json();
    return !!result.success;
  } catch (err) {
    console.error('Turnstile verification error:', err);
    return false;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // OPTIONS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const clientIp = request.headers.get('CF-Connecting-IP') || '';

    // 1. Kontaktformular Endpunkt
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { name, email, phone, course, message, turnstileToken } = body;

        // Pflichtfelder prüfen
        if (!name || !email) {
          return jsonResponse({ success: false, error: 'Bitte füllen Sie alle Pflichtfelder aus.' }, 400);
        }

        // Turnstile validieren
        const secret = env.TURNSTILE_SECRET_KEY;
        const isValidTurnstile = await verifyTurnstile(turnstileToken, secret, clientIp);
        if (!isValidTurnstile) {
          return jsonResponse({ success: false, error: 'Spam-Schutz Validierung fehlgeschlagen.' }, 403);
        }

        // E-Mail-Versand via Resend (falls RESEND_API_KEY konfiguriert)
        if (env.RESEND_API_KEY) {
          try {
            await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                from: 'Yoga Hannover <anfrage@friese-scholz.de>',
                to: ['c.siegmund@gmx.net'],
                reply_to: email,
                subject: `Neue Yoga-Anfrage: ${course} von ${name}`,
                html: `
                  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E5DFD7; border-radius: 12px; background-color: #FBF9F5;">
                    <h2 style="color: #34493D; margin-top: 0;">Neue Kursanfrage über Yoga Hannover</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                      <tr><td style="padding: 6px 0; color: #666; width: 140px;"><strong>Name:</strong></td><td>${name}</td></tr>
                      <tr><td style="padding: 6px 0; color: #666;"><strong>E-Mail:</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
                      <tr><td style="padding: 6px 0; color: #666;"><strong>Telefon:</strong></td><td>${phone || 'Keine Angabe'}</td></tr>
                      <tr><td style="padding: 6px 0; color: #666;"><strong>Kurs / Anliegen:</strong></td><td><strong>${course}</strong></td></tr>
                    </table>
                    <div style="background-color: #FFFFFF; padding: 15px; border-radius: 8px; border: 1px solid #E5DFD7;">
                      <strong>Nachricht:</strong><br />
                      <p style="white-space: pre-wrap; margin: 8px 0 0 0; color: #333;">${message || 'Keine Nachricht angegeben.'}</p>
                    </div>
                  </div>
                `
              })
            });
          } catch (mailErr) {
            console.error('Mail notification error:', mailErr);
          }
        }

        return jsonResponse({ 
          success: true, 
          message: 'Deine Anfrage wurde erfolgreich übermittelt. Shivani meldet sich zeitnah bei dir.' 
        });

      } catch (err) {
        console.error('Contact API Error:', err);
        return jsonResponse({ success: false, error: 'Interner Serverfehler.' }, 500);
      }
    }

    // 2. Admin Login Endpunkt (Weymann Architektur)
    if (url.pathname === '/api/admin/login' && request.method === 'POST') {
      try {
        const { password, turnstileToken } = await request.json();
        
        // Turnstile validieren
        const secret = env.TURNSTILE_SECRET_KEY;
        const isValidTurnstile = await verifyTurnstile(turnstileToken, secret, clientIp);
        if (!isValidTurnstile) {
          return jsonResponse({ success: false, error: 'Sicherheitsprüfung fehlgeschlagen.' }, 403);
        }

        // Passwort gegen verschlüsseltes Secret im Worker prüfen
        const configuredPw = env.Passwort || env.ADMIN_PASSWORD;
        if (!configuredPw) {
          return jsonResponse({ success: false, error: 'Server-Konfiguration unvollständig.' }, 500);
        }

        if (password === configuredPw) {
          return jsonResponse({ success: true, message: 'Authentifizierung erfolgreich.' });
        } else {
          return jsonResponse({ success: false, error: 'Ungültiges Passwort.' }, 401);
        }

      } catch (err) {
        console.error('Admin Login Error:', err);
        return jsonResponse({ success: false, error: 'Fehler bei der Authentifizierung.' }, 500);
      }
    }

    // Fallback: Statische Assets
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not found', { status: 404 });
  }
};
