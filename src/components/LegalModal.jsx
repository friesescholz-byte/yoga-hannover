import React from 'react';
import { X } from 'lucide-react';

export default function LegalModal({ type, onClose }) {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-950/50 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[85vh] bg-sand-50 rounded-3xl shadow-float border border-sand-300 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-sand-200">
          <h3 className="font-serif text-2xl text-earth-950">
            {type === 'impressum' ? 'Impressum' : 'Datenschutzerklärung'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-sand-200 text-earth-600 transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-earth-800 leading-relaxed font-light">
          {type === 'impressum' ? (
            <>
              <div>
                <h4 className="font-semibold text-earth-950 text-base mb-2">Angaben gemäß § 5 DDG (ehemals TMG)</h4>
                <p>
                  <strong>Shivani Claudia Siegmund – Yoga Hannover</strong><br />
                  Bernhard-Caspar-Straße 10<br />
                  30453 Hannover<br />
                  Deutschland
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-earth-950 text-base mb-2">Kontakt</h4>
                <p>
                  Telefon: 0176 23733020<br />
                  E-Mail: c.siegmund@gmx.net
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-earth-950 text-base mb-2">Berufsbezeichnung &amp; berufsrechtliche Regelungen</h4>
                <p>
                  Berufsbezeichnung: Yogalehrerin (BYV)<br />
                  Zertifiziert durch: Bund der Yoga Vidya Lehrer/innen (BYV)<br />
                  Verliehen in: Bundesrepublik Deutschland
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-earth-950 text-base mb-2">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h4>
                <p>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-earth-950 text-base mb-2">Haftung für Inhalte</h4>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den 
                  allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht 
                  verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen 
                  zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-earth-950 text-base mb-2">Haftung für Links</h4>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                  Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
                  verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-semibold text-earth-950 text-base mb-2">1. Datenschutz auf einen Blick</h4>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
                  passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
                  persönlich identifiziert werden können.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-earth-950 text-base mb-2">2. Verantwortliche Stelle</h4>
                <p>
                  Verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
                  <strong>Shivani Claudia Siegmund – Yoga Hannover</strong><br />
                  Bernhard-Caspar-Straße 10<br />
                  30453 Hannover<br />
                  Telefon: 0176 23733020<br />
                  E-Mail: c.siegmund@gmx.net
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-earth-950 text-base mb-2">3. Hosting &amp; Content Delivery Network (Cloudflare)</h4>
                <p>
                  Diese Website wird über <strong>Cloudflare Pages</strong> (Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA) gehostet. 
                  Zur Gewährleistung der Sicherheit und Auslieferung verarbeitet Cloudflare Protokolldaten und IP-Adressen im Rahmen 
                  einer Auftragsverarbeitung gemäß Art. 28 DSGVO unter Einsatz der Standardvertragsklauseln der EU-Kommission.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-earth-950 text-base mb-2">4. Datenerfassung auf dieser Website</h4>
                <p>
                  <strong>Kontaktformular &amp; E-Mail-Anfragen:</strong> Wenn Sie uns per Kontaktformular oder E-Mail Anfragen 
                  zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten 
                  zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten verarbeiten wir 
                  auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse 
                  an einer effektiven Bearbeitung der an uns gerichteten Anfragen).
                </p>
                <p className="mt-3">
                  <strong>Cloudflare Turnstile (Spam-Schutz):</strong> Zur Absicherung unserer Formulare gegen Spam und Missbrauch 
                  nutzen wir Cloudflare Turnstile. Turnstile analysiert das Nutzerverhalten ohne Verwendung von Tracking-Cookies Dritter. 
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (Schutz unserer Website vor Bots und automatisierten Angriffen).
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-earth-950 text-base mb-2">5. Ihre Rechte als betroffene Person</h4>
                <p>
                  Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren 
                  Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder 
                  Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der 
                  im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen 
                  Aufsichtsbehörde (Landesbeauftragte für den Datenschutz Niedersachsen) zu.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-sand-100 border-t border-sand-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-earth-800 bg-sand-200 hover:bg-sand-300 transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
}
