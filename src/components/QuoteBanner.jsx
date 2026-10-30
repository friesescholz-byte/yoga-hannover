import React from 'react';
import { Quote } from 'lucide-react';
import { MEDIA } from '../data/media';

export default function QuoteBanner() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden bg-earth-950 text-sand-50">
      
      {/* Hintergrundbild: Stimmungsvolle Kerze & Ruhe aus dem alten Entwurf */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img 
          src={MEDIA.candles} 
          alt="" 
          className="w-full h-full object-cover object-center opacity-25 filter blur-[1px] scale-105"
        />
        {/* Dunkler, warmer Vignette-Verlauf für edlen Kontrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-earth-950/90 via-earth-950/75 to-earth-950/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-sand-100 via-transparent to-sand-200/30 opacity-10" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-sand-400/60 mx-auto mb-6" />

        <blockquote className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal leading-[1.2] tracking-tight mb-8">
          „Yoga ist nicht nur Bewegung –<br className="hidden sm:block" />
          <span className="italic text-sand-200 font-light"> Yoga ist Präsenz in jedem Moment.</span>“
        </blockquote>

        <div className="flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-[0.2em] text-sand-300/80">
          <span className="w-8 h-px bg-sand-400/40" />
          <span>Shivani Claudia Siegmund · Yoga Hannover</span>
          <span className="w-8 h-px bg-sand-400/40" />
        </div>

      </div>

      {/* Sanfter Übergang oben und unten */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-sand-100 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-sand-200/30 to-transparent pointer-events-none" />

    </section>
  );
}
