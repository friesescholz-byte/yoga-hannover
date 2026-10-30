import React from 'react';
import { Calendar, MapPin, ExternalLink, ArrowRight, Clock } from 'lucide-react';
import { SCHEDULE, PARTNERS } from '../data/schedule';
import { MEDIA } from '../data/media';

export default function Schedule() {
  return (
    <section id="termine" className="relative py-28 sm:py-36 bg-sand-200/60 overflow-hidden">
      
      {/* Atmosphärisches Hintergrundbild: Zen-Steine aus dem Original-Entwurf */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img 
          src={MEDIA.zen} 
          alt="" 
          className="w-full h-full object-cover object-center opacity-15 filter blur-[0.8px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sand-200/95 via-sand-200/85 to-sand-200/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <p className="text-xs uppercase tracking-[0.25em] text-earth-600 font-medium mb-3">
            Wochenplan &amp; Standorte
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif text-earth-950 font-normal leading-[1.15]">
            Deine wöchentlichen <span className="italic text-sage">Termine</span> in Hannover.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-earth-700 font-light leading-relaxed">
            Feste Zeiten, vertraute Räume. Bitte melde dich vorab kurz an, 
            damit wir deinen Platz auf der Matte reservieren können.
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SCHEDULE.map((item, idx) => (
            <div 
              key={idx}
              className="bg-sand-50/90 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-sand-300/90 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Day & Time header */}
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-sand-200">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-3xl text-earth-950">
                      {item.day}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-sage bg-sage/10 px-3 py-1.5 rounded-full">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time}</span>
                  </div>
                </div>

                {/* Course Name & Focus */}
                <h3 className="text-2xl font-serif text-earth-900 mb-1">
                  {item.course}
                </h3>
                <p className="text-xs uppercase tracking-wider text-earth-500 font-medium mb-4">
                  {item.focus}
                </p>

                {/* Venue & Location */}
                <div className="bg-sand-100/90 rounded-2xl p-4 mb-6 border border-sand-200/80">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-earth-900 text-sm">{item.venue}</div>
                      {item.address && (
                        <div className="text-xs text-earth-600 mt-0.5">{item.address}</div>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-earth-700 font-light leading-relaxed mb-6">
                  {item.note}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-6 border-t border-sand-200 flex items-center justify-between">
                {item.mapsUrl ? (
                  <a
                    href={item.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-earth-600 hover:text-earth-900 transition-colors"
                  >
                    <span>Route auf Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-earth-500">Hannover Stadt</span>
                )}

                <a
                  href="#kontakt"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-earth-900 hover:text-sage transition-colors group"
                >
                  <span>Platz anfragen</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Partners & Further Collaborations */}
        <div className="bg-sand-50/90 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-sand-300/80">
          <div className="max-w-2xl mb-8">
            <h4 className="text-xl sm:text-2xl font-serif text-earth-950 mb-2">
              Kooperationen &amp; weitere Kursorte
            </h4>
            <p className="text-xs sm:text-sm text-earth-600 font-light leading-relaxed">
              Neben den festen wöchentlichen Stunden finden regelmäßige Workshops und Kurse in 
              bewährten Hannoveraner Studios und Bildungseinrichtungen statt:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PARTNERS.map((partner, i) => (
              <div 
                key={i} 
                className="p-4 rounded-2xl bg-sand-100/80 border border-sand-200 text-center flex flex-col justify-center"
              >
                <span className="font-medium text-xs sm:text-sm text-earth-900">{partner.name}</span>
                <span className="text-[11px] text-earth-500 mt-0.5">{partner.note}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Eleganter Übergang zur Über-Mich-Sektion */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none overflow-hidden">
        <svg 
          viewBox="0 0 1440 64" 
          fill="none" 
          preserveAspectRatio="none"
          className="w-full h-full text-sand-100 fill-current"
        >
          <path d="M0,0 C360,64 1080,64 1440,0 L1440,64 L0,64 Z" />
        </svg>
      </div>

    </section>
  );
}
