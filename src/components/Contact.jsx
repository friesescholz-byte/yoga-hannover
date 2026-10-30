import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const TURNSTILE_SITEKEY = "0x4AAAAAAFlh0mSR0eMxTxR9";

export default function Contact({ preselectedCourse }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'Probestunde allgemein',
    message: ''
  });

  const [turnstileToken, setTurnstileToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    if (preselectedCourse) {
      setFormData(prev => ({ ...prev, course: preselectedCourse }));
    }
  }, [preselectedCourse]);

  // Turnstile Widget Initialisierung mit StrictMode-Schutz
  useEffect(() => {
    let interval;

    const renderWidget = () => {
      if (turnstileRef.current && window.turnstile && !widgetIdRef.current) {
        try {
          turnstileRef.current.innerHTML = '';
          widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
            sitekey: TURNSTILE_SITEKEY,
            callback: (token) => {
              setTurnstileToken(token);
              setErrorMessage('');
            },
            'expired-callback': () => setTurnstileToken(''),
            theme: 'light',
          });
          if (interval) clearInterval(interval);
        } catch (e) {
          console.error("Turnstile render error:", e);
        }
      }
    };

    renderWidget();

    if (!widgetIdRef.current) {
      interval = setInterval(() => {
        if (window.turnstile) {
          renderWidget();
        }
      }, 150);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {}
        widgetIdRef.current = null;
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    if (!turnstileToken) {
      setErrorMessage('Bitte bestätigen Sie kurz den Cloudflare Spam-Schutz.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          turnstileToken
        })
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSubmitted(true);
      } else {
        // Fallback for dev / offline mode: if backend API not running in vite dev without worker, simulate success or show message
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          // Dev preview fallback
          setSubmitted(true);
        } else {
          setErrorMessage(resData.error || 'Fehler beim Senden. Bitte versuchen Sie es erneut oder rufen Sie direkt an.');
        }
      }
    } catch (err) {
      console.warn("API request failed:", err);
      // In local dev without backend worker, handle smoothly
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('trycloudflare.com')) {
        setSubmitted(true);
      } else {
        setErrorMessage('Verbindung fehlgeschlagen. Bitte kontaktiere uns direkt per E-Mail oder Telefon.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="py-24 sm:py-32 bg-sand-100 border-t border-sand-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct Contact & Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-earth-600 font-medium mb-3">
                Verbindung aufnehmen
              </p>
              <h2 className="text-3xl sm:text-5xl font-serif text-earth-950 font-normal leading-[1.15] mb-6">
                Bereit für deine erste <span className="italic text-sage">Stunde</span>?
              </h2>
              <p className="text-base sm:text-lg text-earth-700 font-light leading-relaxed mb-10">
                Ob Probestunde in der Gruppe, individuelles Einzeltraining oder eine 
                Frage zu den Kursen: Schreibe mir gerne oder rufe mich direkt an.
              </p>

              {/* Direct Channels */}
              <div className="space-y-6">
                <a
                  href="tel:017623733020"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-sand-50 border border-sand-300/80 hover:border-sage transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-sage/10 text-sage flex items-center justify-center flex-shrink-0 group-hover:bg-sage group-hover:text-sand-50 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-earth-500 font-medium">Telefon &amp; WhatsApp</div>
                    <div className="text-base font-semibold text-earth-900 mt-0.5">0176 23733020</div>
                    <div className="text-xs text-earth-600">Mo – Sa erreichbar</div>
                  </div>
                </a>

                <a
                  href="mailto:c.siegmund@gmx.net"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-sand-50 border border-sand-300/80 hover:border-sage transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-sage/10 text-sage flex items-center justify-center flex-shrink-0 group-hover:bg-sage group-hover:text-sand-50 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-earth-500 font-medium">E-Mail</div>
                    <div className="text-base font-semibold text-earth-900 mt-0.5">c.siegmund@gmx.net</div>
                    <div className="text-xs text-earth-600">Antwort in der Regel binnen 24 Stunden</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-sand-50 border border-sand-300/80">
                  <div className="w-10 h-10 rounded-xl bg-sand-200 text-earth-700 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-earth-500 font-medium">Hauptstandort</div>
                    <div className="text-base font-semibold text-earth-900 mt-0.5">VitaList Balance</div>
                    <div className="text-xs text-earth-600">Bernhard-Caspar-Straße 10, 30453 Hannover</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 p-5 rounded-2xl bg-sand-200/50 border border-sand-300/70 text-xs text-earth-600 font-light leading-relaxed">
              <span className="font-semibold text-earth-800">Hinweis zur Anmeldung:</span> Da die Gruppen klein gehalten werden, 
              sind die Plätze limitiert. Nach deiner Anfrage bestätige ich dir den Termin persönlich.
            </div>
          </div>

          {/* Right Column: Clean Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-sand-50 rounded-3xl p-8 sm:p-12 border border-sand-300/90 shadow-card">
              
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-sage/10 text-sage flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-earth-950 mb-3">
                    Vielen Dank für deine Nachricht!
                  </h3>
                  <p className="text-sm sm:text-base text-earth-700 max-w-md mx-auto leading-relaxed mb-8">
                    Ich habe deine Anfrage erhalten und melde mich zeitnah bei dir, um 
                    deinen Termin oder deine Probestunde zu besprechen.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setTurnstileToken('');
                    }}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-sand-50 bg-sage hover:bg-sage-dark transition-colors"
                  >
                    Weitere Nachricht senden
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div>
                    <h3 className="text-2xl font-serif text-earth-950 mb-1">
                      Probestunde oder Kursplatz anfragen
                    </h3>
                    <p className="text-xs text-earth-600">
                      Unverbindliche Anfrage. Ich melde mich persönlich bei dir.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-earth-700 mb-2">
                      Dein Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Vor- und Nachname"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-sand-100 border border-sand-300 text-earth-900 placeholder:text-earth-400 text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-all"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-earth-700 mb-2">
                        E-Mail-Adresse *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@beispiel.de"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-sand-100 border border-sand-300 text-earth-900 placeholder:text-earth-400 text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-earth-700 mb-2">
                        Telefonnummer (optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="0176 1234567"
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^[0-9+\s()/-]*$/.test(val)) {
                            setFormData({ ...formData, phone: val });
                          }
                        }}
                        className="w-full px-4 py-3.5 rounded-xl bg-sand-100 border border-sand-300 text-earth-900 placeholder:text-earth-400 text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-all"
                      />
                    </div>
                  </div>

                  {/* Course Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-earth-700 mb-2">
                      Gewünschter Kurs / Anliegen *
                    </label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-sand-100 border border-sand-300 text-earth-900 text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-all"
                    >
                      <option value="Probestunde allgemein">Allgemeine Probestunde (Schnuppern)</option>
                      <option value="Hatha Yoga & Rücken (Dienstag 17:30)">Dienstag: Rücken Yoga (Yoga im Suraya)</option>
                      <option value="Yin & Restore (Freitag 18:30)">Freitag: Yin &amp; Restore (VitaList Linden)</option>
                      <option value="Personal Yoga 1:1">Personal Yoga (1:1 Einzeltraining)</option>
                      <option value="Frage oder Workshop">Sonstige Frage / Workshop</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-earth-700 mb-2">
                      Deine Nachricht (optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Gibt es körperliche Besonderheiten oder Termine, die dir am besten passen?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-sand-100 border border-sand-300 text-earth-900 placeholder:text-earth-400 text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-all resize-none"
                    />
                  </div>

                  {/* Cloudflare Turnstile Spam-Schutz */}
                  <div className="pt-2">
                    <div ref={turnstileRef} className="my-2" />
                    <p className="text-[11px] text-earth-500 mt-1">
                      Geschützt durch Cloudflare Turnstile Spam-Prävention.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-sand-50 bg-sage hover:bg-sage-dark disabled:opacity-50 disabled:cursor-not-allowed shadow-subtle hover:shadow-card transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Wird gesendet...</span>
                      ) : (
                        <>
                          <span>Anfrage absenden</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-center text-[11px] text-earth-500">
                    Deine Daten werden vertraulich behandelt und ausschließlich zur Bearbeitung deiner Anfrage verwendet.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
