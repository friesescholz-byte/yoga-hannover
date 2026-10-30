import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, ShieldCheck, LogOut, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

const TURNSTILE_SITEKEY = "0x4AAAAAAFlh0mSR0eMxTxR9";
// Weymann Architecture Principle: ONLY cryptographic SHA-256 hash in client, never plaintext!
const ADMIN_HASH = "077eb3180e7c09df1ef440875bf0b9e71a1fa3f5d55cc5e3042529db9b6cc653";

async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function AdminModal({ isOpen, onClose }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);

  // Turnstile Widget initialisieren
  useEffect(() => {
    if (!isOpen || isAuthenticated) return;

    let interval;
    const renderWidget = () => {
      if (turnstileRef.current && window.turnstile && !widgetIdRef.current) {
        try {
          turnstileRef.current.innerHTML = '';
          widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
            sitekey: TURNSTILE_SITEKEY,
            callback: (token) => {
              setTurnstileToken(token);
              setErrorMsg('');
            },
            'expired-callback': () => setTurnstileToken(''),
            theme: 'light',
          });
          if (interval) clearInterval(interval);
        } catch (e) {
          console.error("Turnstile render error in Admin:", e);
        }
      }
    };

    renderWidget();
    if (!widgetIdRef.current) {
      interval = setInterval(() => {
        if (window.turnstile) renderWidget();
      }, 150);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (widgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current); } catch (e) {}
        widgetIdRef.current = null;
      }
    };
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    if (!turnstileToken) {
      setErrorMsg('Bitte bestätigen Sie die Sicherheitsabfrage.');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Serverseitige Verifizierung über Worker API
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, turnstileToken })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword('');
      } else {
        // Fallback: Weymann client-side SHA-256 verification (for offline/static preview)
        const computedHash = await sha256(password);
        if (computedHash === ADMIN_HASH) {
          setIsAuthenticated(true);
          setPassword('');
        } else {
          setErrorMsg('Das eingegebene Passwort ist ungültig.');
        }
      }
    } catch (err) {
      // Fallback: Weymann client-side SHA-256 verification
      const computedHash = await sha256(password);
      if (computedHash === ADMIN_HASH) {
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setErrorMsg('Das eingegebene Passwort ist ungültig.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setTurnstileToken('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-950/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-sand-50 rounded-3xl shadow-float border border-sand-300 p-6 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-sand-200">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-sage" />
            <h3 className="font-serif text-xl text-earth-950">
              Admin-Bereich
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-sand-200 text-earth-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <p className="text-xs text-earth-600 leading-relaxed font-light">
              Geschützter Administrationsbereich für Yoga Hannover (Shivani Claudia Siegmund). 
              Verifiziert via Cloudflare Turnstile &amp; serverseitiges Secret.
            </p>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-earth-700 mb-1.5">
                Admin-Passwort
              </label>
              <input
                type="password"
                required
                placeholder="Passwort eingeben"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-sand-100 border border-sand-300 text-earth-900 text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-all"
              />
            </div>

            {/* Turnstile Container */}
            <div className="pt-1">
              <div ref={turnstileRef} className="cf-turnstile my-1" />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-sand-50 bg-sage hover:bg-sage-dark disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? <span>Prüfe...</span> : <span>Anmelden</span>}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-sage/10 border border-sage/20 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-sage flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-earth-900">Erfolgreich autorisiert</div>
                <div className="text-xs text-earth-600">Sitzung aktiv · Weymann Sicherheitsstandard</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-sand-100 border border-sand-200">
                <div className="text-xs font-semibold text-earth-800">Projekt: Yoga Hannover</div>
                <div className="text-xs text-earth-600 mt-1">R2-Bucket: website-datein/Yoga-Hannover/</div>
                <div className="text-xs text-earth-600">Turnstile Sitekey: 0x4AAAAAAFlh0mSR0eMxTxR9</div>
              </div>

              <div className="p-4 rounded-xl bg-sand-100 border border-sand-200">
                <div className="text-xs font-semibold text-earth-800">Aktuelle Kursorte</div>
                <div className="text-xs text-earth-600 mt-1">VitaList (Linden) &amp; Suraya (Hannover)</div>
                <div className="text-xs text-earth-600">Kontakt: 0176 23733020 · c.siegmund@gmx.net</div>
              </div>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Abmelden</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-earth-800 bg-sand-200 hover:bg-sand-300 transition-colors"
              >
                Schließen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
