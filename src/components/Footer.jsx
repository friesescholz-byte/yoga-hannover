import React from 'react';
import { Lock, Phone, Mail, MapPin } from 'lucide-react';
import { MEDIA } from '../data/media';

export default function Footer({ onOpenLegal, onOpenAdmin }) {
  return (
    <footer className="bg-sand-50 border-t border-sand-300/80 pt-16 pb-12 text-earth-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-sand-200">
          
          {/* Col 1: Brand & Logo (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={MEDIA.logoDark} 
                alt="Yoga Hannover Logo" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-earth-700 font-light leading-relaxed max-w-sm">
              Achtsame Hatha- und Yin-Yoga Kurse sowie individuelles Personal Training 
              im Herzen von Hannover mit Shivani Claudia Siegmund (420h BYV zertifiziert).
            </p>
            <div className="text-xs text-earth-500 font-light">
              Mitglied im Bund der Yoga Vidya Lehrer/innen (BYV)
            </div>
          </div>

          {/* Col 2: Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-earth-900">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm font-light text-earth-700">
              <li>
                <a href="#philosophie" className="hover:text-sage transition-colors">
                  Philosophie
                </a>
              </li>
              <li>
                <a href="#kurse" className="hover:text-sage transition-colors">
                  Kursformate &amp; Einzeltraining
                </a>
              </li>
              <li>
                <a href="#termine" className="hover:text-sage transition-colors">
                  Wochenplan &amp; Standorte
                </a>
              </li>
              <li>
                <a href="#ueber-mich" className="hover:text-sage transition-colors">
                  Über Shivani
                </a>
              </li>
              <li>
                <a href="#kontakt" className="hover:text-sage transition-colors">
                  Probestunde anfragen
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Standorte & Kontakt (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-earth-900">
              Kursorte in Hannover
            </h4>
            <div className="text-sm font-light text-earth-700 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
                <span>
                  <strong>VitaList Balance:</strong><br />
                  Bernhard-Caspar-Straße 10, 30453 Hannover
                </span>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Yoga im Suraya:</strong><br />
                  Hannover
                </span>
              </div>
              <div className="pt-2 flex flex-col gap-1 text-xs text-earth-600">
                <a href="tel:017623733020" className="hover:text-earth-900 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-sage" />
                  <span>0176 23733020</span>
                </a>
                <a href="mailto:c.siegmund@gmx.net" className="hover:text-earth-900 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-sage" />
                  <span>c.siegmund@gmx.net</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-earth-600 gap-4">
          <div>
            © 2026 Yoga Hannover · Shivani Claudia Siegmund. Website by{' '}
            <a 
              href="https://scholz-friese-webdesign.de/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-earth-900 font-medium hover:text-sage underline underline-offset-4 decoration-sand-300"
            >
              Scholz &amp; Friese
            </a>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => onOpenLegal('impressum')}
              className="hover:text-earth-950 transition-colors"
            >
              Impressum
            </button>
            <button
              onClick={() => onOpenLegal('datenschutz')}
              className="hover:text-earth-950 transition-colors"
            >
              Datenschutz
            </button>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 text-earth-400 hover:text-earth-800 transition-colors"
              title="Admin-Bereich"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
