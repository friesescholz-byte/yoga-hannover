import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Phone } from 'lucide-react';
import { MEDIA } from '../data/media';

export default function Header({ onOpenSearch, onOpenContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Philosophie', href: '#philosophie' },
    { label: 'Kurse', href: '#kurse' },
    { label: 'Termine & Orte', href: '#termine' },
    { label: 'Über Shivani', href: '#ueber-mich' },
    { label: 'Kontakt', href: '#kontakt' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-sand-50/95 backdrop-blur-md shadow-subtle border-b border-sand-200/80 py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <img 
              src={MEDIA.logoDark} 
              alt="Yoga Hannover Logo" 
              className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]" 
            />
            <div className="hidden sm:block border-l border-sand-300 pl-3">
              <span className="block text-xs font-semibold uppercase tracking-wider text-earth-800">
                Yoga Hannover
              </span>
              <span className="block text-[11px] text-earth-500 font-serif italic">
                Shivani Claudia Siegmund
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-earth-700 hover:text-sage transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center space-x-3">
            {/* Search Trigger (Rule 9: Discreet Lupe im Header) */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-full text-earth-600 hover:text-earth-900 hover:bg-sand-200/70 transition-all duration-200 focus:outline-none"
              title="Kurse & Termine suchen (Cmd+K)"
              aria-label="Suche öffnen"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Direct Phone / Contact CTA */}
            <a
              href="tel:017623733020"
              className="hidden lg:flex items-center gap-1.5 text-xs text-earth-600 hover:text-earth-900 px-3 py-2 rounded-full hover:bg-sand-200/50 transition-colors"
              title="Telefonisch anfragen"
            >
              <Phone className="w-3.5 h-3.5 text-sage" />
              <span>0176 23733020</span>
            </a>

            {/* Main CTA */}
            <a
              href="#kontakt"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-sand-50 bg-sage hover:bg-sage-dark shadow-sm transition-all duration-300 hover:shadow-card"
            >
              Probestunde
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-earth-700 hover:bg-sand-200/60 focus:outline-none"
              aria-label="Menü umschalten"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-sand-50 rounded-2xl border border-sand-200 shadow-card animate-fade-in">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-base font-medium text-earth-800 hover:bg-sand-200/70 hover:text-sage transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-sand-200 flex flex-col gap-2">
                <a
                  href="#kontakt"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-sand-50 bg-sage hover:bg-sage-dark transition-colors"
                >
                  Probestunde anfragen
                </a>
                <a
                  href="tel:017623733020"
                  className="w-full text-center px-4 py-2.5 rounded-full text-xs text-earth-700 bg-sand-200 hover:bg-sand-300 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-sage" />
                  <span>0176 23733020</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
