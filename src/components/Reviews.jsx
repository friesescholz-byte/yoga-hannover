import React from 'react';
import { Star, ExternalLink, Quote } from 'lucide-react';
import { REVIEWS } from '../data/schedule';

export default function Reviews() {
  const googleReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJoaJtGUp0sEcRfyMMC1CvEaM";

  return (
    <section className="py-24 sm:py-32 bg-sand-200/30 border-t border-sand-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Google Rating */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-earth-600 font-medium mb-3">
              Erfahrungen &amp; Stimmen
            </p>
            <h2 className="text-3xl sm:text-5xl font-serif text-earth-950 font-normal leading-[1.15]">
              Was Teilnehmer in Hannover <span className="italic text-sage">erleben</span>.
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-ochre">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-earth-800 hover:text-sage transition-colors"
            >
              <span>Google Bewertungen</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="bg-sand-50 rounded-3xl p-8 border border-sand-300/80 shadow-subtle flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-sage/40 mb-4" />
                <p className="text-base font-serif italic text-earth-900 leading-relaxed mb-6">
                  „{review.text}“
                </p>
              </div>

              <div className="pt-4 border-t border-sand-200">
                <div className="font-semibold text-sm text-earth-900">{review.author}</div>
                <div className="text-xs text-earth-500 mt-0.5">{review.context}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
