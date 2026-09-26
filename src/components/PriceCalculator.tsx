import React, { useState, useMemo } from 'react';
import {
  SPACE_OPTIONS,
  SERVICE_OPTIONS,
  FREQUENCY_OPTIONS,
  EXTRA_OPTIONS,
  SpaceType,
  ServiceType,
  FrequencyType,
  WHATSAPP_NUMBER,
} from '../data/cleaningData';
import { WhatsAppIcon } from './BrandIcons';
import { Check, Clock, Users, Sparkles, SlidersHorizontal } from 'lucide-react';

export interface QuoteSummary {
  spaceType: SpaceType;
  serviceType: ServiceType;
  frequencyLabel: string;
  extras: string[];
  minPrice: number;
  maxPrice: number;
  estimatedHours: string;
  teamSize: string;
  whatsappUrl: string;
  whatsappMessage: string;
}

interface PriceCalculatorProps {
  onRequestQuote: (quote: QuoteSummary) => void;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({ onRequestQuote }) => {
  const [selectedSpace, setSelectedSpace] = useState<SpaceType>('Apartament 1-2 Camere');
  const [selectedService, setSelectedService] = useState<ServiceType>('Curățenie de Întreținere');
  const [selectedFrequency, setSelectedFrequency] = useState<FrequencyType>('once');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculation = useMemo<QuoteSummary>(() => {
    const spaceObj =
      SPACE_OPTIONS.find((s) => s.id === selectedSpace) || SPACE_OPTIONS[0];
    const serviceObj =
      SERVICE_OPTIONS.find((s) => s.id === selectedService) || SERVICE_OPTIONS[0];
    const freqObj =
      FREQUENCY_OPTIONS.find((f) => f.id === selectedFrequency) ||
      FREQUENCY_OPTIONS[0];

    const extrasMin = selectedExtras.reduce((sum, extraId) => {
      const ex = EXTRA_OPTIONS.find((e) => e.id === extraId);
      return sum + (ex ? ex.priceMin : 0);
    }, 0);

    const extrasMax = selectedExtras.reduce((sum, extraId) => {
      const ex = EXTRA_OPTIONS.find((e) => e.id === extraId);
      return sum + (ex ? ex.priceMax : 0);
    }, 0);

    const rawMin = spaceObj.baseMin * serviceObj.multiplier * freqObj.factor + extrasMin;
    const rawMax = spaceObj.baseMax * serviceObj.multiplier * freqObj.factor + extrasMax;

    // Round to nearest 10 RON for clean pricing
    const minPrice = Math.round(rawMin / 10) * 10;
    const maxPrice = Math.round(rawMax / 10) * 10;

    const chosenExtraLabels = selectedExtras
      .map((id) => EXTRA_OPTIONS.find((e) => e.id === id)?.label)
      .filter((l): l is string => Boolean(l));

    const extrasLine =
      chosenExtraLabels.length > 0
        ? `\n• Opțiuni extra: ${chosenExtraLabels.join(', ')}`
        : '';

    const whatsappMessage =
      `Bună ziua X-Harmony Cleaning! Doresc o ofertă exactă pentru:\n` +
      `• Tip spațiu: ${selectedSpace} (${spaceObj.typicalArea})\n` +
      `• Tip serviciu: ${selectedService}\n` +
      `• Frecvență: ${freqObj.label}` +
      extrasLine +
      `\n• Estimare calculator: ${minPrice} - ${maxPrice} RON\n` +
      `Vă rog să îmi comunicați disponibilitatea în Cluj-Napoca. Mulțumesc!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    return {
      spaceType: selectedSpace,
      serviceType: selectedService,
      frequencyLabel: freqObj.label,
      extras: chosenExtraLabels,
      minPrice,
      maxPrice,
      estimatedHours: spaceObj.baseHours,
      teamSize: spaceObj.teamSize,
      whatsappUrl,
      whatsappMessage,
    };
  }, [selectedSpace, selectedService, selectedFrequency, selectedExtras]);

  const currentServiceObj =
    SERVICE_OPTIONS.find((s) => s.id === selectedService) || SERVICE_OPTIONS[0];
  const currentSpaceObj =
    SPACE_OPTIONS.find((s) => s.id === selectedSpace) || SPACE_OPTIONS[0];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left column: Interactive Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-7">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <label className="text-sm font-semibold text-slate-900">
                1. Alege tipul de spațiu
              </label>
              <span className="text-xs text-slate-500">
                Suprafață orientativă: {currentSpaceObj.typicalArea}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SPACE_OPTIONS.map((space) => {
                const isSelected = selectedSpace === space.id;
                return (
                  <button
                    key={space.id}
                    type="button"
                    onClick={() => setSelectedSpace(space.id)}
                    className={`group text-left px-4 py-3.5 rounded-xl border transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50/70 text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold whitespace-nowrap truncate">
                        {space.label}
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {space.typicalArea} · {space.baseHours}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Type of Service */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <label className="text-sm font-semibold text-slate-900">
                2. Selectează tipul de serviciu
              </label>
              <span className="text-xs text-slate-500">
                Echipamente și soluții incluse
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SERVICE_OPTIONS.map((service) => {
                const isSelected = selectedService === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedService(service.id)}
                    className={`text-left px-4 py-3.5 rounded-xl border transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50/70 text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold whitespace-nowrap truncate">
                        {service.label}
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-1.5 line-clamp-2 ${
                        isSelected ? 'text-emerald-50' : 'text-slate-500'
                      }`}
                    >
                      {service.shortDesc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Frequency */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <label className="text-sm font-semibold text-slate-900">
                3. Frecvența intervenției
              </label>
              <span className="text-xs text-emerald-700 font-medium">
                Reducere până la 15% la abonament
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2.5 p-1.5 bg-slate-100 rounded-xl">
              {FREQUENCY_OPTIONS.map((freq) => {
                const isSelected = selectedFrequency === freq.id;
                return (
                  <button
                    key={freq.id}
                    type="button"
                    onClick={() => setSelectedFrequency(freq.id)}
                    className={`px-3 py-2.5 rounded-lg text-center transition-all duration-150 focus-visible:outline-2 focus-visible:outline-emerald-600 ${
                      isSelected
                        ? 'bg-white text-slate-900 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900 font-medium'
                    }`}
                  >
                    <div className="text-xs sm:text-sm whitespace-nowrap truncate">
                      {freq.label}
                    </div>
                    <div className="text-[11px] text-emerald-700 mt-0.5 hidden sm:block truncate">
                      {freq.discountLabel}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Optional Extra Services */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <SlidersHorizontal className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-semibold text-slate-900">
                4. Servicii suplimentare opționale
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {EXTRA_OPTIONS.map((extra) => {
                const active = selectedExtras.includes(extra.id);
                return (
                  <button
                    key={extra.id}
                    type="button"
                    onClick={() => toggleExtra(extra.id)}
                    className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border text-left transition-all duration-150 ${
                      active
                        ? 'border-emerald-600 bg-emerald-50/70 text-slate-900'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate">{extra.label}</p>
                      <p className="text-[11px] text-slate-500 font-mono-num">
                        +{extra.priceMin}–{extra.priceMax} RON
                      </p>
                    </div>
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                        active
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {active && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: Instant Dynamic Price Output & Included Checklist (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs text-slate-400 pb-4 border-b border-slate-800">
              <span>Estimare Instantă Preț</span>
              <span>Cluj-Napoca & Metropolitan</span>
            </div>

            <div className="mt-5">
              <p className="text-xs text-emerald-400 font-medium">
                {selectedSpace} · {selectedService}
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono-num text-white">
                  {calculation.minPrice} - {calculation.maxPrice} RON
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5">
                Preț orientativ complet (include detergenți ecologici, echipamente profesionale și deplasarea în Cluj-Napoca).
              </p>
            </div>

            {/* Meta metrics: duration & team */}
            <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="block text-slate-400">Durată estimată</span>
                  <span className="font-semibold text-white font-mono-num">
                    {calculation.estimatedHours}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="block text-slate-400">Echipă alocată</span>
                  <span className="font-semibold text-white">
                    {calculation.teamSize}
                  </span>
                </div>
              </div>
            </div>

            {/* Included operations list */}
            <div className="mt-5 pt-5 border-t border-slate-800">
              <p className="text-xs font-semibold text-slate-200 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Operațiuni incluse în {selectedService}:
              </p>
              <ul className="space-y-2">
                {currentServiceObj.includedTasks.map((task, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Primary Instant Quote CTA */}
          <div className="pt-2 space-y-2.5">
            <button
              type="button"
              onClick={() => onRequestQuote(calculation)}
              className="w-full py-3.5 px-5 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-2.5 shadow-sm cursor-pointer whitespace-nowrap"
            >
              <WhatsAppIcon className="w-5 h-5 text-slate-950 shrink-0" />
              <span>Solicită Oferta Exactă pe WhatsApp</span>
            </button>
            <p className="text-[11px] text-center text-slate-400">
              Răspuns rapid în 10–15 minute · Fără obligații de plată în avans
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
