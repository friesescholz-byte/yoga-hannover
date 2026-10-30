import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Courses from './components/Courses';
import Schedule from './components/Schedule';
import About from './components/About';
import QuoteBanner from './components/QuoteBanner';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import LegalModal from './components/LegalModal';
import AdminModal from './components/AdminModal';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState(null); // 'impressum' | 'datenschutz' | null
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleSelectCourse = (courseTitle) => {
    setSelectedCourse(courseTitle);
    const contactEl = document.getElementById('kontakt');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-sand-100 flex flex-col selection:bg-sage/15 selection:text-earth-950 font-sans">
      
      {/* Header */}
      <Header 
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenContact={() => {
          const el = document.getElementById('kontakt');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero />
        <Philosophy />
        <Courses onSelectCourse={handleSelectCourse} />
        <Schedule />
        <About />
        <QuoteBanner />
        <Reviews />
        <Contact preselectedCourse={selectedCourse} />
      </main>

      {/* Footer */}
      <Footer 
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Modals & Dialogs */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        onSelectCourse={handleSelectCourse}
      />

      <LegalModal 
        type={legalModalType} 
        onClose={() => setLegalModalType(null)} 
      />

      <AdminModal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />

    </div>
  );
}
