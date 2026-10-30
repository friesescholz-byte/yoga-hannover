import React, { useState, useEffect } from 'react';
import { Search, X, Calendar, BookOpen, User, Phone, MapPin, ArrowRight } from 'lucide-react';
import { COURSES } from '../data/courses';
import { SCHEDULE } from '../data/schedule';

export default function SearchModal({ isOpen, onClose, onSelectCourse, onOpenContact }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(false); // toggle handled by parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredCourses = COURSES.filter(c => 
    c.title.toLowerCase().includes(normalizedQuery) ||
    c.focus.toLowerCase().includes(normalizedQuery) ||
    c.description.toLowerCase().includes(normalizedQuery)
  );

  const filteredSchedule = SCHEDULE.filter(s =>
    s.day.toLowerCase().includes(normalizedQuery) ||
    s.course.toLowerCase().includes(normalizedQuery) ||
    s.venue.toLowerCase().includes(normalizedQuery) ||
    s.city.toLowerCase().includes(normalizedQuery)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-earth-950/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-sand-50 rounded-2xl shadow-float border border-sand-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-sand-200 gap-3">
          <Search className="w-5 h-5 text-earth-600" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kurs, Termin oder Ort suchen... (z. B. Yin Yoga, Freitag, VitaList)"
            className="w-full bg-transparent text-earth-900 placeholder:text-earth-500/70 text-base focus:outline-none"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-sand-200 text-earth-500 transition-colors"
            aria-label="Suche schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4 text-sm">
          {/* Kurse */}
          {filteredCourses.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-earth-500 mb-2 px-2">
                Yoga-Kurse
              </div>
              <div className="space-y-1">
                {filteredCourses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onClose();
                      const el = document.getElementById('kurse');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-sand-200 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sage/10 text-sage flex items-center justify-center font-serif text-sm">
                        {c.number}
                      </div>
                      <div>
                        <div className="font-medium text-earth-900 group-hover:text-sage transition-colors">{c.title}</div>
                        <div className="text-xs text-earth-600">{c.focus}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-earth-400 group-hover:text-sage group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Termine */}
          {filteredSchedule.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-earth-500 mb-2 px-2">
                Wochentermine &amp; Orte
              </div>
              <div className="space-y-1">
                {filteredSchedule.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onClose();
                      const el = document.getElementById('termine');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-sand-200 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sand-200 text-earth-700 flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-earth-900 group-hover:text-sage transition-colors">{s.day} · {s.time}</div>
                        <div className="text-xs text-earth-600">{s.course} bei {s.venue}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-earth-400 group-hover:text-sage group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="pt-2 border-t border-sand-200">
            <div className="text-xs font-semibold uppercase tracking-wider text-earth-500 mb-2 px-2">
              Schnellzugriff
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onClose();
                  const el = document.getElementById('kontakt');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-earth-800 text-xs font-medium transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-sage" />
                <span>Probestunde anfragen</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  const el = document.getElementById('ueber-mich');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-earth-800 text-xs font-medium transition-colors"
              >
                <User className="w-3.5 h-3.5 text-sage" />
                <span>Über Shivani lesen</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-sand-100 border-t border-sand-200 flex items-center justify-between text-[11px] text-earth-500">
          <span>Tipp: <kbd className="px-1.5 py-0.5 rounded bg-sand-200 font-mono text-[10px]">ESC</kbd> zum Schließen</span>
          <span>Yoga Hannover · Linden &amp; Südstadt</span>
        </div>
      </div>
    </div>
  );
}
