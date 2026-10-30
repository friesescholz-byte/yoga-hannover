import React from 'react';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { MEDIA } from '../data/media';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-36 overflow-hidden bg-sand-100">
      
      {/* Atmosphärisches Hintergrundbild aus dem Entwurf (Edel & Dezent eingearbeitet) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img 
          src={MEDIA.hero} 
          alt="" 
          className="w-full h-full object-cover object-center opacity-20 filter blur-[1px] scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Mehrschichtiger, sanfter Sand-Verlauf für perfekte Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-b from-sand-100/95 via-sand-100/80 to-sand-100" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-sand-100/40 to-sand-100" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Monumentale redaktionelle Typografie */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-earth-600 font-medium mb-5 sm:mb-6">
            Yoga Hannover · Shivani Claudia Siegmund
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-serif text-earth-950 font-normal tracking-tight leading-[1.08] mb-6 sm:mb-8">
            Raum für Stille.<br />
            <span className="italic font-normal text-sage">Kraft für deinen Alltag.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-earth-700 font-light leading-relaxed max-w-2xl mx-auto mb-10 sm:mb-12">
            Achtsame Hatha- und Yin-Yoga-Praxis im Herzen von Hannover. 
            Löse tiefsitzende Verspannungen im Rücken, beruhige dein Nervensystem 
            und finde zu neuer mentaler Klarheit – in persönlichen, kleinen Gruppen.
          </p>

          {/* Ruhige Call-to-Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <a
              href="#termine"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-sand-50 bg-sage hover:bg-sage-dark shadow-subtle hover:shadow-card transition-all duration-300 group"
            >
              <span>Termine &amp; Orte ansehen</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="#kontakt"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-medium text-earth-800 bg-sand-50 hover:bg-sand-200 border border-sand-300 transition-all duration-300"
            >
              Probestunde anfragen
            </a>
          </div>
        </div>

        {/* Großformatige, gerahmte Bildkomposition (Agency Editorial Standard) */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-sand-300/80 shadow-card bg-sand-200 aspect-[16/9] sm:aspect-[21/9]">
            <img 
              src={MEDIA.praxis} 
              alt="Shivani Claudia Siegmund bei der achtsamen Yogapraxis" 
              className="w-full h-full object-cover object-center filter saturate-[0.95]"
            />
            {/* Sanfter warmer Verlauf für Textkontrast im Fußbereich */}
            <div className="absolute inset-0 bg-gradient-to-t from-earth-950/65 via-earth-950/15 to-transparent pointer-events-none" />

            {/* Dezent integrierte Verankerung am unteren Bildrand */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 flex flex-wrap items-center justify-between text-sand-50 gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sand-200 flex-shrink-0" />
                <span>VitaList (Linden) &amp; Yoga im Suraya</span>
              </div>
              <div className="flex items-center gap-2 text-sand-200 font-light">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>Dienstags &amp; Freitags · Einstieg jederzeit möglich</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Ruhige Vertrauensanker im minimalistischen Dreiklang */}
        <div className="mt-14 sm:mt-16 pt-10 border-t border-sand-300/70 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-start justify-center sm:justify-start gap-3">
              <span className="font-serif text-lg text-sage">01</span>
              <div>
                <h4 className="text-sm font-semibold text-earth-900">420h BYV Zertifiziert</h4>
                <p className="text-xs text-earth-600 mt-0.5">Integrales Yoga nach Tradition von Swami Sivananda</p>
              </div>
            </div>

            <div className="flex items-start justify-center sm:justify-start gap-3">
              <span className="font-serif text-lg text-sage">02</span>
              <div>
                <h4 className="text-sm font-semibold text-earth-900">Kleine Kursgruppen</h4>
                <p className="text-xs text-earth-600 mt-0.5">Persönliche Haltungskorrekturen ohne Anonymität</p>
              </div>
            </div>

            <div className="flex items-start justify-center sm:justify-start gap-3">
              <span className="font-serif text-lg text-sage">03</span>
              <div>
                <h4 className="text-sm font-semibold text-earth-900">Kein Leistungsdruck</h4>
                <p className="text-xs text-earth-600 mt-0.5">Achtsames Üben für deinen ganz individuellen Körper</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Eleganter, weicher Übergang in die nächste Sektion */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 pointer-events-none overflow-hidden">
        <svg 
          viewBox="0 0 1440 96" 
          fill="none" 
          preserveAspectRatio="none"
          className="w-full h-full text-sand-200/50 fill-current"
        >
          <path d="M0,32 C360,80 1080,0 1440,48 L1440,96 L0,96 Z" />
        </svg>
      </div>

    </section>
  );
}
