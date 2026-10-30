import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MEDIA } from '../data/media';

export default function Philosophy() {
  const pillars = [
    {
      num: '01',
      title: 'Präsenz statt Perfektion',
      lead: 'Yoga ist kein Wettbewerb um akrobatische Posen.',
      text: 'Bei mir musst du nicht flexibel sein, um mit Yoga zu beginnen. Jeder Körper hat seine eigene Anatomie und Tagesform. Wir praktizieren achtsam, sodass du lernst, wieder auf die feinen Signale deines Körpers zu hören – ohne Ehrgeiz, sondern mit wohlwollender Neugier.'
    },
    {
      num: '02',
      title: 'Kleine Gruppen & geschützter Raum',
      lead: 'Persönliche Nähe statt überfüllter Fitnessstudio-Säle.',
      text: 'Ich halte die Teilnehmerzahl bewusst überschaubar. Nur so kann ich auf Fehlhaltungen eingehen, sanfte Korrekturen anbieten und gewährleisten, dass du dich in jeder Phase der Stunde sicher, gesehen und geborgen fühlst.'
    },
    {
      num: '03',
      title: 'Gezielte Entlastung für Rücken & Nervensystem',
      lead: 'Eine heilsame Symbiose aus Kraft und Loslassen.',
      text: 'Durch die Verbindung von stärkendem Hatha Yoga, tiefgreifender Yin-Faszienarbeit und bewusster Atemlenkung (Pranayama) lösen wir Nackenverspannungen und Stressknoten nachhaltig auf. Du gehst spürbar aufgerichteter und gelassener von der Matte.'
    }
  ];

  return (
    <section id="philosophie" className="relative py-28 sm:py-36 bg-sand-200/50 overflow-hidden">
      
      {/* Atmosphärisches Hintergrundbild: Kerze & Ruhe aus dem Entwurf */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img 
          src={MEDIA.candles} 
          alt="" 
          className="w-full h-full object-cover object-center opacity-15 filter blur-[0.5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sand-200/95 via-sand-200/80 to-sand-200/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <p className="text-xs uppercase tracking-[0.25em] text-earth-600 font-medium mb-3">
            Philosophie &amp; Haltung
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif text-earth-950 font-normal leading-[1.15]">
            Ein Raum, um einfach <span className="italic text-sage">zu sein</span>.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-earth-700 font-light leading-relaxed">
            In einer Welt, die ständige Leistung und Erreichbarkeit einfordert, bietet dir meine 
            Praxis in Hannover einen verlässlichen Ankerpunkt. Hier musst du nichts beweisen.
          </p>
        </div>

        {/* 3 Spacious Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {pillars.map((p) => (
            <div 
              key={p.num} 
              className="relative flex flex-col justify-between pt-8 border-t border-sand-300/80 bg-sand-50/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-subtle hover:shadow-card transition-all duration-300"
            >
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-sage/80 block mb-6">
                  {p.num}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-earth-950 mb-3">
                  {p.title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-earth-500 font-medium mb-4">
                  {p.lead}
                </p>
                <p className="text-sm sm:text-base text-earth-700 font-light leading-relaxed">
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Breathing Element */}
        <div className="mt-16 sm:mt-24 rounded-2xl overflow-hidden border border-sand-300 shadow-sm bg-sand-50/90 backdrop-blur-sm p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h4 className="text-2xl font-serif text-earth-900 mb-2">
              Möchtest du herausfinden, ob dieser Weg zu dir passt?
            </h4>
            <p className="text-sm text-earth-600 font-light leading-relaxed">
              Komm einfach zu einer unverbindlichen Schnupperstunde vorbei oder melde dich vorab 
              telefonisch für ein persönliches Kennenlernen.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-sand-50 bg-earth-900 hover:bg-earth-800 transition-colors group"
            >
              <span>Probestunde vereinbaren</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>

      {/* Eleganter Übergang in die Kurs-Sektion */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none overflow-hidden">
        <svg 
          viewBox="0 0 1440 64" 
          fill="none" 
          preserveAspectRatio="none"
          className="w-full h-full text-sand-100 fill-current"
        >
          <path d="M0,0 C480,64 960,64 1440,0 L1440,64 L0,64 Z" />
        </svg>
      </div>

    </section>
  );
}
