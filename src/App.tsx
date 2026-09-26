import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  Leaf,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  ArrowRight,
  Star,
  Sparkles,
  Check,
  Building2,
  Home,
} from 'lucide-react';
import {
  GOOGLE_REVIEWS,
  ROOM_STANDARDS,
  CLUJ_NEIGHBORHOODS,
  BUSINESS_ADDRESS,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_NUMBER,
} from './data/cleaningData';
import { PriceCalculator, QuoteSummary } from './components/PriceCalculator';
import { WhatsAppBookingModal } from './components/WhatsAppBookingModal';
import { WhatsAppIcon, GoogleGLogo, ResilientImage } from './components/BrandIcons';

import heroLivingRoomImg from './assets/images/hero_cluj_living_room_1790411123366.jpg';
import residentialDetailImg from './assets/images/cleaning_residential_detail_1790411135818.jpg';
import commercialOfficeImg from './assets/images/cleaning_commercial_office_1790411148898.jpg';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeQuote, setActiveQuote] = useState<QuoteSummary | null>(null);
  const [activeRoomTab, setActiveRoomTab] = useState<string>(ROOM_STANDARDS[0].id);

  // Quick Contact Form State in Footer Section
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSpace, setContactSpace] = useState('Apartament 1-2 Camere');
  const [contactNeighborhood, setContactNeighborhood] = useState(CLUJ_NEIGHBORHOODS[0]);
  const [contactError, setContactError] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const calculatorSectionRef = useRef<HTMLElement | null>(null);

  const scrollToCalculator = () => {
    calculatorSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleOpenWhatsAppModal = (quote?: QuoteSummary) => {
    setActiveQuote(quote || null);
    setBookingModalOpen(true);
  };

  const handleDirectContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = contactPhone.replace(/\D/g, '');
    if (digits.length < 9) {
      setContactError('Introdu un număr de telefon valid (minim 9 cifre).');
      return;
    }
    setContactError('');
    setContactSubmitted(true);
  };

  const activeRoomStandard =
    ROOM_STANDARDS.find((r) => r.id === activeRoomTab) || ROOM_STANDARDS[0];

  const defaultWhatsAppHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Bună ziua X-Harmony Cleaning! Doresc să programez o curățenie în Cluj-Napoca. Îmi puteți oferi mai multe detalii?'
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] pb-16 md:pb-0">
      {/* Top Bar Contract: Strict 3-zone header (Non-sticky on mobile to respect 15% mobile sticky cap; sticky on desktop) */}
      <header className="relative md:sticky md:top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 font-display whitespace-nowrap"
          >
            X-Harmony Cleaning
          </a>

          {/* Zone 2: 5 clean text navigation links */}
          <nav
            aria-label="Navigare principală"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            <a
              href="#calculator"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Calculator Preț
            </a>
            <a
              href="#recenzii"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Recenzii Google
            </a>
            <a
              href="#beneficii"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Beneficii
            </a>
            <a
              href="#protocol"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Protocol Curățenie
            </a>
            <a
              href="#contact"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${PHONE_TEL}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 font-mono-num whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <button
              type="button"
              onClick={() => handleOpenWhatsAppModal()}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Programează Rapid
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 1. HERO SECTION (Mobile-First + 1440px Desktop Architectural Layout) */}
        <section className="relative bg-slate-900 text-white overflow-hidden border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: High-Converting Copy & CTAs (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Availability & Google Maps Social Proof Row */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  {/* Subtle glowing green badge for "Disponibil în Cluj-Napoca" */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    <span className="whitespace-nowrap">Disponibil în Cluj-Napoca</span>
                  </div>

                  {/* Prominent Social Proof Badge */}
                  <a
                    href="#recenzii"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 hover:border-slate-600 text-xs font-semibold text-amber-300 transition-colors"
                  >
                    <GoogleGLogo className="w-3.5 h-3.5 shrink-0" />
                    <span className="whitespace-nowrap">
                      ⭐ 5.0 din 5 stele (5/5 pe Google Maps)
                    </span>
                  </a>
                </div>

                {/* Primary Headline */}
                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12] font-display"
                  style={{ textWrap: 'balance' }}
                >
                  Servicii de Curățenie Profesionale în Cluj-Napoca
                </h1>

                {/* Subheadline */}
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Transformăm fiecare spațiu într-un mediu impecabil și proaspăt.
                  Economisește timp pentru ceea ce contează cu adevărat.
                </p>

                {/* Primary & Secondary CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => handleOpenWhatsAppModal()}
                    className="py-4 px-6 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-sm sm:text-base rounded-xl transition-all duration-150 flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/50 cursor-pointer whitespace-nowrap"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-slate-950 shrink-0" />
                    <span>Programează O Curățenie Pe WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={scrollToCalculator}
                    className="py-4 px-6 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-sm sm:text-base rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>Calculează Prețul Rapid</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
                  </button>
                </div>

                {/* Unboxed Trust Metadata Row (Zero-Pill Discipline) */}
                <div className="pt-4 border-t border-slate-800/90 flex flex-wrap items-center gap-y-2 gap-x-3 text-xs sm:text-sm text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    Echipamente industriale și soluții ecologice incluse
                  </span>
                  <span aria-hidden="true" className="text-slate-600">
                    ·
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    Personal verificat și instruit
                  </span>
                  <span aria-hidden="true" className="text-slate-600">
                    ·
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono-num">
                    Str. B.P. Hasdeu, Cluj-Napoca
                  </span>
                </div>
              </div>

              {/* Right Column: High-Impact 16:9 Architectural Hero Image + Guarantee Overlay (5 cols) */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-800 shadow-2xl">
                  <div className="aspect-16/10 sm:aspect-16/9 lg:aspect-4/3 w-full relative">
                    <ResilientImage
                      src={heroLivingRoomImg}
                      alt="Apartament modern impecabil curățat în Cluj-Napoca de echipa X-Harmony Cleaning"
                      className="w-full h-full object-cover"
                      fallbackTitle="X-Harmony Cleaning · Cluj-Napoca"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

                    {/* Bottom Scrim Info */}
                    <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold text-emerald-400">
                          Rezidențial & Comercial în Cluj-Napoca
                        </p>
                        <p className="text-sm font-bold text-white mt-0.5">
                          Standard Hotelier de 5 Stele la Tine Acasă sau la Birou
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="block text-[11px] text-slate-300">Scor Clienți</span>
                        <span className="text-base font-extrabold font-mono-num text-amber-400">
                          5.0 / 5.0 ★
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. QUICK INSTANT PRICE CALCULATOR SECTION */}
        <section
          id="calculator"
          ref={calculatorSectionRef}
          className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16"
        >
          <div className="max-w-3xl mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm font-semibold text-emerald-700">
              01. Calculator Instant de Preț
            </p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 font-display"
              style={{ textWrap: 'balance' }}
            >
              Calculează Prețul Rapid Pentru Spațiul Tău din Cluj-Napoca
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
              Selectează tipul proprietății și nivelul de curățenie dorit pentru a
              vedea instant intervalul estimat de preț în RON, durata intervenției și
              lista operațiunilor incluse.
            </p>
          </div>

          <PriceCalculator onRequestQuote={handleOpenWhatsAppModal} />
        </section>

        {/* 3. GOOGLE MAPS TRUST & REVIEWS SECTION (Claim-to-Proof Adjacency) */}
        <section
          id="recenzii"
          className="py-14 sm:py-20 bg-slate-100/80 border-y border-slate-200/80 scroll-mt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header with Google Maps Summary Card */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <p className="text-xs sm:text-sm font-semibold text-emerald-700">
                  02. Reputație Verificată pe Google Maps
                </p>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 font-display"
                  style={{ textWrap: 'balance' }}
                >
                  Ce Spun Clienții din Cluj-Napoca Despre X-Harmony Cleaning
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                  Fiecare intervenție este verificată pe baza unei fișe de control.
                  Păstrăm un scor impecabil de 5.0 din 5 stele pe Google Maps datorită
                  punctualității și atenției la detalii.
                </p>
              </div>

              {/* Authentic Google Maps Rating Summary Box */}
              <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex items-center gap-4 self-start lg:self-auto shrink-0">
                <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <GoogleGLogo className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-extrabold font-mono-num text-slate-900">
                      5.0
                    </span>
                    <div className="flex items-center text-amber-400" aria-label="5 din 5 stele">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    5.0 din 5 stele · 100% recenzii pozitive pe Google Maps
                  </p>
                </div>
              </div>
            </div>

            {/* 3 Verified Client Review Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GOOGLE_REVIEWS.map((review) => (
                <article
                  key={review.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    {/* Reviewer Header */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-900 text-emerald-400 font-bold text-sm flex items-center justify-center shrink-0 font-display">
                          {review.initials}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">
                            {review.author}
                          </h3>
                          <p className="text-xs text-slate-500">
                            {review.location} · {review.verifiedSource}
                          </p>
                        </div>
                      </div>
                      <GoogleGLogo className="w-4 h-4 shrink-0" />
                    </div>

                    {/* Stars & Rating Badge */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-amber-400">
                        {[...Array(review.rating)].map((_, idx) => (
                          <Star
                            key={idx}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold font-mono-num text-slate-700">
                        ({review.ratingText})
                      </span>
                    </div>

                    {/* Exact Client Quote */}
                    <blockquote className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                      “{review.quote}”
                    </blockquote>
                  </div>

                  {/* Unboxed Metadata Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>{review.context}</span>
                    <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Client Verificat
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. KEY BENEFITS BENTO GRID & VISUAL CAPABILITIES */}
        <section
          id="beneficii"
          className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16"
        >
          <div className="max-w-3xl mb-10">
            <p className="text-xs sm:text-sm font-semibold text-emerald-700">
              03. De Ce Să Alegi X-Harmony Cleaning
            </p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 font-display"
              style={{ textWrap: 'balance' }}
            >
              Trei Piloni de Calitate Pentru Locuințe și Spații Comerciale
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Folosim aspiratoare profesionale cu filtrare HEPA, generatoare de abur
              și detergenți ecologici certificați, protejând suprafețele delicate din
              casa sau biroul tău.
            </p>
          </div>

          {/* Key Benefits Grid (3 Core Benefits + 2 Asymmetric Visual Showcases) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Benefit 1: Atenție La Detalii */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    Atenție La Detalii
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                    Echipă profesionistă instruită pentru curățenie impecabilă.
                  </p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  De la plinte, întrerupătoare și balamale până la detartrarea
                  bateriilor sanitare și degresarea hotei, fiecare zonă este verificată
                  la finalul intervenției împreună cu supervizorul de echipă.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                <span>Fișă de verificare în 40+ puncte</span>
                <span className="font-mono-num font-semibold text-slate-900">100% Garanție</span>
              </div>
            </div>

            {/* Benefit 2: Produse Ecologice */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    Produse Ecologice
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                    Soluții sigure pentru copii, animale de companie și mediul înconjurător.
                  </p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Utilizăm soluții profesionale biodegradabile și hipoalergenice, fără
                  vapori toxici sau reziduuri iritante. Suprafața rămâne perfect
                  igienizată și sigură pentru întreaga familie.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                <span>Detergenți non-toxici certificați UE</span>
                <span className="font-semibold text-emerald-700">Pet & Kids Safe</span>
              </div>
            </div>

            {/* Benefit 3: Flexibilitate & Rapiditate */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    Flexibilitate & Rapiditate
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                    Ne pliem după programul tău din Cluj-Napoca și împrejurimi.
                  </p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Intervenim la orele stabilite de tine — inclusiv în weekend sau în
                  afara programului de lucru pentru birouri și spații comerciale din
                  Cluj-Napoca, Florești, Baciu și Apahida.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                <span>Luni – Sâmbătă · 08:00 – 20:00</span>
                <span className="font-mono-num font-semibold text-slate-900">Răspuns &lt; 15m</span>
              </div>
            </div>

            {/* Asymmetric Bento Row 2: Residential vs Commercial Visual Cards */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-12">
              <div className="sm:col-span-5 aspect-4/3 sm:aspect-auto relative">
                <ResilientImage
                  src={residentialDetailImg}
                  alt="Curățenie rezidențială în detaliu pentru apartamente și case în Cluj-Napoca"
                  className="w-full h-full object-cover"
                  fallbackTitle="Curățenie Rezidențială Cluj"
                />
              </div>
              <div className="sm:col-span-7 p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold">
                    <Home className="w-3.5 h-3.5" />
                    <span>Divizia Rezidențială Cluj-Napoca</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 font-display">
                    Apartamente, Case & Vile
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Curățenie generală, de întreținere sau după constructor. Aducem
                    toate consumabilele, lavetele codate pe culori și aspiratoarele
                    profesionale.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={scrollToCalculator}
                    className="text-xs font-bold text-slate-900 hover:text-emerald-700 inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Vezi tarifele pentru locuințe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-12">
              <div className="sm:col-span-5 aspect-4/3 sm:aspect-auto relative">
                <ResilientImage
                  src={commercialOfficeImg}
                  alt="Curățenie spații comerciale și birouri în Cluj-Napoca"
                  className="w-full h-full object-cover"
                  fallbackTitle="Curățenie Birouri Cluj"
                />
              </div>
              <div className="sm:col-span-7 p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Divizia Corporate & B2B</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 font-display">
                    Birouri, Clinici & Spații Comerciale
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Abonamente flexibile cu facturare deductibilă, intervenții matinale
                    sau de seară și aprovizionare constantă cu consumabile igienice.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenWhatsAppModal()}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Solicită ofertă personalizată B2B</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. INTERACTIVE ROOM-BY-ROOM PROTOCOL SECTION */}
        <section
          id="protocol"
          className="py-14 sm:py-20 bg-white border-y border-slate-200 scroll-mt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div className="max-w-2xl">
                <p className="text-xs sm:text-sm font-semibold text-emerald-700">
                  04. Transparență Totală
                </p>
                <h2
                  className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-display"
                  style={{ textWrap: 'balance' }}
                >
                  Protocolul X-Harmony Pe Fiecare Încăpere
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2">
                  Folosim lavete din microfibră codate pe culori (diferite pentru baie,
                  bucătărie și mobilier) pentru a preveni contaminarea încrucișată.
                </p>
              </div>

              {/* Interactive Segmented Control (Functional Filter Buttons) */}
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl self-start">
                {ROOM_STANDARDS.map((room) => {
                  const active = activeRoomTab === room.id;
                  return (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => setActiveRoomTab(room.id)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all duration-150 cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {room.title.split('&')[0].trim()}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    {activeRoomStandard.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    {activeRoomStandard.subtitle}
                  </p>
                </div>
                <span className="text-xs font-mono-num text-slate-600">
                  Timp mediu: {activeRoomStandard.durationNote}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {activeRoomStandard.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-white border border-slate-200/80 rounded-xl p-4"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-mono-num text-xs font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. LOCATION, DIRECT CALLBACK & CONTACT SECTION */}
        <section
          id="contact"
          className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Cluj-Napoca Location Info, Neighborhoods & Direct Actions (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-emerald-700">
                  05. Locație & Contact Direct
                </p>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 font-display"
                  style={{ textWrap: 'balance' }}
                >
                  Suntem Aproape de Tine în Cluj-Napoca
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                  Cu sediul operațional pe Strada Bogdan Petriceicu Hasdeu, echipele
                  noastre ajung rapid în toate cartierele din Cluj-Napoca și zona
                  metropolitană.
                </p>
              </div>

              {/* Address & Phone Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500">
                      Adresă Sediu Cluj-Napoca
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                      {BUSINESS_ADDRESS}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Deplasare gratuită a echipei și echipamentelor în municipiul Cluj-Napoca
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-slate-500">
                      Telefon & WhatsApp Programări
                    </span>
                    <div className="mt-1 flex flex-wrap items-center gap-3">
                      <a
                        href={`tel:${PHONE_TEL}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono-num font-bold text-sm transition-colors whitespace-nowrap"
                      >
                        <Phone className="w-4 h-4 text-emerald-400" />
                        <span>{PHONE_DISPLAY}</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleOpenWhatsAppModal()}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        <span>Scrie pe WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Neighborhood coverage list (Unboxed clean layout) */}
              <div className="bg-slate-100/80 border border-slate-200/80 rounded-2xl p-5">
                <p className="text-xs font-bold text-slate-800 mb-2.5">
                  Cartiere acoperite zilnic în Cluj-Napoca și împrejurimi:
                </p>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-slate-600">
                  {CLUJ_NEIGHBORHOODS.map((hood) => (
                    <div key={hood} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{hood}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Validated Lead Capture / Instant Callback Card (6 cols) */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
              <div className="pb-5 border-b border-slate-100">
                <span className="text-xs font-semibold text-emerald-700">
                  Confirmare Telefonică în 15 Minute
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5 font-display">
                  Solicită un Apel de Programare
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Lasă-ne numărul tău de telefon și te sunăm imediat pentru a stabili
                  ziua, ora și prețul exact pentru spațiul tău.
                </p>
              </div>

              {contactSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    Cererea ta a fost înregistrată cu succes!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Un coordonator X-Harmony Cleaning te va apela la numărul{' '}
                    <strong className="font-mono-num text-slate-900">{contactPhone}</strong>{' '}
                    pentru curățenia din zona <strong className="text-slate-900">{contactNeighborhood}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactPhone('');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Trimite o altă solicitare
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDirectContactSubmit} className="mt-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Numele tău
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Ex: Maria Ionescu"
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Număr de telefon *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => {
                          setContactPhone(e.target.value);
                          if (contactError) setContactError('');
                        }}
                        placeholder="0740 191 693"
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 font-mono-num focus:border-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-space"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Tipul spațiului
                      </label>
                      <select
                        id="contact-space"
                        value={contactSpace}
                        onChange={(e) => setContactSpace(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none"
                      >
                        <option value="Apartament 1-2 Camere">Apartament 1-2 Camere</option>
                        <option value="Apartament 3-4 Camere">Apartament 3-4 Camere</option>
                        <option value="Casă / Vilă">Casă / Vilă</option>
                        <option value="Spațiu Comercial / Birou">Spațiu Comercial / Birou</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-hood"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Cartier Cluj-Napoca
                      </label>
                      <select
                        id="contact-hood"
                        value={contactNeighborhood}
                        onChange={(e) => setContactNeighborhood(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none"
                      >
                        {CLUJ_NEIGHBORHOODS.map((hood) => (
                          <option key={hood} value={hood}>
                            {hood}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {contactError && (
                    <p className="text-xs text-red-600 font-medium">{contactError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 px-5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Trimite Cererea de Programare</span>
                  </button>

                  <p className="text-[11px] text-slate-500 text-center">
                    Datele tale sunt folosite exclusiv pentru confirmarea programării în Cluj-Napoca.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* QUIET FOOTER WITH ADDRESS & PHONE */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
            <div className="md:col-span-5 space-y-3">
              <span className="text-lg font-extrabold text-white font-display tracking-tight">
                X-Harmony Cleaning
              </span>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
                Servicii profesionale de curățenie rezidențială și comercială în
                Cluj-Napoca. Echipă verificată, produse ecologice și garanția
                calității la fiecare intervenție.
              </p>
              <p className="text-xs text-emerald-400 font-medium">
                ⭐ 5.0 din 5 stele (5/5 pe Google Maps) · Disponibil în Cluj-Napoca
              </p>
            </div>

            <div className="md:col-span-4 space-y-2 text-xs sm:text-sm">
              <p className="font-bold text-white">Locație & Contact</p>
              <p className="text-slate-300 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_ADDRESS}</span>
              </p>
              <p className="text-slate-300 flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="font-mono-num font-bold text-white hover:text-emerald-400 transition-colors"
                >
                  {PHONE_DISPLAY}
                </a>
              </p>
            </div>

            <div className="md:col-span-3 space-y-2 text-xs sm:text-sm">
              <p className="font-bold text-white">Navigare Rapidă</p>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <a href="#calculator" className="hover:text-white transition-colors">
                    Calculator Preț Rapid
                  </a>
                </li>
                <li>
                  <a href="#recenzii" className="hover:text-white transition-colors">
                    Recenzii Clienți Cluj
                  </a>
                </li>
                <li>
                  <a href="#beneficii" className="hover:text-white transition-colors">
                    Beneficii & Echipamente
                  </a>
                </li>
                <li>
                  <a href="#protocol" className="hover:text-white transition-colors">
                    Protocol pe Încăperi
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} X-Harmony Cleaning Cluj-Napoca. Toate drepturile rezervate.</p>
            <p>{BUSINESS_ADDRESS} · Tel: {PHONE_DISPLAY}</p>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BAR AT THE BOTTOM FOR MOBILE ("Sunați Acum" | "Trimite Mesaj pe WhatsApp") */}
      {/* Strictly 60px tall (~7% of mobile viewport height, well under the 15% Mobile Sticky Cap) */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-3 py-2">
        <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
          <a
            href={`tel:${PHONE_TEL}`}
            className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-slate-700 transition-colors whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Sunați Acum</span>
          </a>

          <a
            href={defaultWhatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              handleOpenWhatsAppModal();
            }}
            className="py-2.5 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4 text-slate-950 shrink-0" />
            <span className="truncate">Trimite Mesaj pe WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Interactive WhatsApp Quote & Instant Callback Modal */}
      <WhatsAppBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialQuote={activeQuote}
      />
    </div>
  );
}
