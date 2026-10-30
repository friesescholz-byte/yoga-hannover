import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MEDIA } from '../data/media';

export default function About() {
  return (
    <section id="ueber-mich" className="py-24 sm:py-32 bg-sand-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Authentic Portrait Framing (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Portrait */}
              <div className="relative rounded-3xl overflow-hidden border border-sand-300 shadow-card bg-sand-200 aspect-[3/4]">
                <img 
                  src={MEDIA.portrait} 
                  alt="Shivani Claudia Siegmund – Yogalehrerin Hannover" 
                  className="w-full h-full object-cover object-center filter saturate-[0.98]"
                />
              </div>

              {/* Subtile Verankerung unten */}
              <div className="mt-4 px-2 flex items-center justify-between text-xs text-earth-600">
                <span className="font-serif italic text-sm text-earth-800">Shivani Claudia Siegmund</span>
                <span>Yogalehrerin (BYV)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text & Story (7 cols) */}
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.25em] text-earth-600 font-medium mb-3">
              Persönlichkeit &amp; Weg
            </p>
            
            <h2 className="text-3xl sm:text-5xl font-serif text-earth-950 font-normal leading-[1.15] mb-6">
              „Yoga ist nicht nur Bewegung – Yoga ist <span className="italic text-sage">Präsenz</span> in jedem Augenblick.“
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-earth-700 font-light leading-relaxed mb-8">
              <p>
                Hallo, ich bin Shivani. Als zertifizierte Yogalehrerin (BYV, 420 Stunden integrales 
                Yoga – Yoga der Synthese nach der Tradition von Swami Sivananda) begleitet mich dieser 
                Weg seit vielen Jahren. Yoga hat mir geholfen, sowohl körperliche Widerstandskraft als 
                auch eine tiefe innere Ruhe im Alltag zu bewahren.
              </p>
              <p>
                In meinem Unterricht verbinde ich kraftvolles Hatha Yoga, regenerierendes Yin Yoga, 
                gezielte Atemführung (Pranayama) und Meditation zu einer ganzheitlichen Erfahrung. 
                Ohne Dogmen, ohne Leistungsanspruch – dafür mit spürbarer Hingabe, fundierter 
                anatomischer Ausrichtung und Wärme.
              </p>
              <p className="font-normal text-earth-900">
                Mein tiefes Anliegen in Hannover ist einfach: Dich genau dort abzuholen, wo du 
                heute stehst, und dir einen sicheren Raum zum Durchatmen zu schenken.
              </p>
            </div>

            {/* Qualifications Box */}
            <div className="p-6 rounded-2xl bg-sand-50 border border-sand-300/80 mb-8">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-earth-900 mb-2">
                Fundierte Ausbildung &amp; Zertifizierung
              </h4>
              <p className="text-xs sm:text-sm text-earth-600 font-light leading-relaxed">
                420 Stunden staatlich anerkannte Ausbildung im Berufsverband der Yoga Vidya Lehrer/innen (BYV). 
                Kontinuierliche Weiterbildungen in Faszien-Yoga, Pranayama-Techniken und individueller Rückenprävention.
              </p>
            </div>

            {/* CTA */}
            <div>
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-sand-50 bg-sage hover:bg-sage-dark shadow-subtle transition-all duration-300 group"
              >
                <span>Persönliche Probestunde anfragen</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
