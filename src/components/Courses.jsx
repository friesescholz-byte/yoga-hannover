import React from 'react';
import { Clock, ArrowRight, Quote } from 'lucide-react';
import { COURSES } from '../data/courses';
import { MEDIA } from '../data/media';

export default function Courses({ onSelectCourse }) {
  return (
    <section id="kurse" className="relative py-28 sm:py-36 bg-sand-100 overflow-hidden">
      
      {/* Atmosphärische Meditation-Silhouette aus dem Original-Entwurf im Hintergrund */}
      <div className="absolute top-12 right-0 w-96 h-96 pointer-events-none opacity-[0.05] select-none translate-x-1/4">
        <img 
          src={MEDIA.meditation} 
          alt="" 
          className="w-full h-full object-contain filter grayscale"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-earth-600 font-medium mb-3">
              Praxis &amp; Formate
            </p>
            <h2 className="text-3xl sm:text-5xl font-serif text-earth-950 font-normal leading-[1.15]">
              Finde den Weg, der zu deinem <span className="italic text-sage">Körper</span> spricht.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-earth-600 max-w-sm font-light leading-relaxed">
            Ob dynamisch kräftigend, tief entspannend oder in exklusiver 1:1 Begleitung – jeder Kurs 
            ist eine Einladung zur Regeneration.
          </p>
        </div>

        {/* 4 Spacious Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="bg-sand-50/90 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-sand-300/80 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header row with Number and Duration */}
                <div className="flex items-center justify-between border-b border-sand-200 pb-5 mb-6">
                  <span className="font-serif text-2xl text-sage">
                    {course.number}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-earth-600 font-medium">
                    <Clock className="w-3.5 h-3.5 text-sage" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-earth-950 mb-2">
                  {course.title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-earth-500 font-medium mb-5">
                  {course.focus}
                </p>

                <p className="text-sm sm:text-base text-earth-700 font-light leading-relaxed mb-8">
                  {course.description}
                </p>

                {/* Key Benefits */}
                <ul className="space-y-3 mb-8 pt-4 border-t border-sand-200/60">
                  {course.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-earth-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage mt-2 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-sand-200 flex items-center justify-between">
                <span className="text-xs text-earth-500 italic font-serif">
                  {course.level}
                </span>
                <a
                  href="#kontakt"
                  onClick={() => onSelectCourse && onSelectCourse(course.title)}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-earth-900 hover:text-sage transition-colors group-hover:translate-x-0.5"
                >
                  <span>Anfragen</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Eleganter Übergang zur Termine-Sektion */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none overflow-hidden">
        <svg 
          viewBox="0 0 1440 64" 
          fill="none" 
          preserveAspectRatio="none"
          className="w-full h-full text-sand-200/60 fill-current"
        >
          <path d="M0,64 L1440,0 L1440,64 L0,64 Z" />
        </svg>
      </div>

    </section>
  );
}
