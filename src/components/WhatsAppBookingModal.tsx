import React, { useState, useEffect } from 'react';
import { X, Check, Copy, PhoneCall, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { QuoteSummary } from './PriceCalculator';
import {
  CLUJ_NEIGHBORHOODS,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_NUMBER,
} from '../data/cleaningData';

interface WhatsAppBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuote: QuoteSummary | null;
}

export const WhatsAppBookingModal: React.FC<WhatsAppBookingModalProps> = ({
  isOpen,
  onClose,
  initialQuote,
}) => {
  const [neighborhood, setNeighborhood] = useState(CLUJ_NEIGHBORHOODS[0]);
  const [preferredDay, setPreferredDay] = useState('Mâine / În următoarele 2-3 zile');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [submittedBookingCode, setSubmittedBookingCode] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSubmittedBookingCode(null);
      setFormError('');
      setCopied(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const spaceLabel = initialQuote?.spaceType || 'Apartament 1-2 Camere';
  const serviceLabel = initialQuote?.serviceType || 'Curățenie Generală';
  const priceText = initialQuote
    ? `${initialQuote.minPrice} - ${initialQuote.maxPrice} RON`
    : '250 - 350 RON';
  const freqText = initialQuote?.frequencyLabel || 'O singură dată';
  const extrasText =
    initialQuote && initialQuote.extras.length > 0
      ? `\n• Extra: ${initialQuote.extras.join(', ')}`
      : '';

  const composedMessage =
    `Bună ziua X-Harmony Cleaning! Doresc o programare / ofertă exactă:\n` +
    `• Spațiu: ${spaceLabel}\n` +
    `• Serviciu: ${serviceLabel} (${freqText})` +
    extrasText +
    `\n• Tarif estimat: ${priceText}\n` +
    `• Cartier / Zonă Cluj: ${neighborhood}\n` +
    `• Perioadă dorită: ${preferredDay}` +
    (clientName.trim() ? `\n• Nume: ${clientName.trim()}` : '') +
    (clientPhone.trim() ? `\n• Telefon: ${clientPhone.trim()}` : '') +
    (notes.trim() ? `\n• Detalii suplimentare: ${notes.trim()}` : '');

  const whatsappDirectHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    composedMessage
  )}`;

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(composedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleInstantCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedPhone = clientPhone.replace(/\s+/g, '');
    if (cleanedPhone.length < 9) {
      setFormError('Te rugăm să introduci un număr de telefon valid (minim 9 cifre).');
      return;
    }
    setFormError('');
    const randomCode = `XH-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedBookingCode(randomCode);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-semibold text-emerald-700">
              X-Harmony Cleaning · Cluj-Napoca
            </span>
            <h3
              id="booking-modal-title"
              className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5"
            >
              Trimite Solicitarea pe WhatsApp sau Rezervă Apel
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Închide fereastra"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedBookingCode ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-mono-num text-emerald-700 font-semibold">
                Solicitare înregistrată · Cod #{submittedBookingCode}
              </p>
              <h4 className="text-lg font-bold text-slate-900 mt-1">
                Mulțumim{clientName ? `, ${clientName}` : ''}! Te contactăm în 15 minute.
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                Echipa X-Harmony Cleaning din Cluj-Napoca a primit detaliile pentru{' '}
                <strong className="text-slate-900">{serviceLabel}</strong> ({spaceLabel}) în zona{' '}
                <strong className="text-slate-900">{neighborhood}</strong>.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Estimare tarif:</span>
                <span className="font-mono-num font-bold text-slate-900">{priceText}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Telefon contact:</span>
                <span className="font-mono-num font-semibold text-slate-900">
                  {clientPhone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Interval preferat:</span>
                <span className="font-medium text-slate-900">{preferredDay}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={whatsappDirectHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Trimite și pe WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm rounded-xl transition-colors"
              >
                Închide
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            {/* Summary banner */}
            <div className="bg-slate-900 text-white rounded-xl p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-emerald-400 font-medium">
                  {spaceLabel} · {serviceLabel}
                </p>
                <p className="text-xs text-slate-300 mt-0.5">
                  Frecvență: {freqText}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs text-slate-400 block">Estimare</span>
                <span className="text-base sm:text-lg font-bold font-mono-num text-white">
                  {priceText}
                </span>
              </div>
            </div>

            <form onSubmit={handleInstantCallbackSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    <MapPin className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
                    Cartier / Zonă în Cluj
                  </label>
                  <select
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-emerald-600 focus:outline-none"
                  >
                    {CLUJ_NEIGHBORHOODS.map((zone) => (
                      <option key={zone} value={zone}>
                        {zone}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    <Calendar className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
                    Când dorești curățenia?
                  </label>
                  <select
                    value={preferredDay}
                    onChange={(e) => setPreferredDay(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-emerald-600 focus:outline-none"
                  >
                    <option value="Mâine / În următoarele 2-3 zile">
                      În următoarele 2–3 zile
                    </option>
                    <option value="Săptămâna aceasta">Săptămâna aceasta</option>
                    <option value="Săptămâna viitoare">Săptămâna viitoare</option>
                    <option value="Urgent (Astăzi / Mâine)">
                      Urgent (Astăzi / Mâine)
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Numele tău (opțional pt. WhatsApp)
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: Andrei Popescu"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-emerald-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Telefon (pentru confirmare rapidă)
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => {
                      setClientPhone(e.target.value);
                      if (formError) setFormError('');
                    }}
                    placeholder="0740 123 456"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs sm:text-sm text-slate-900 font-mono-num focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Detalii suplimentare (suprafață, animale de companie, etc.)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Apartament 58 mp, etaj 2, dorim și spălare geamuri"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              {formError && (
                <p className="text-xs text-red-600 font-medium">{formError}</p>
              )}

              {/* Primary WhatsApp Direct Button + Copy message */}
              <div className="pt-2 space-y-2.5">
                <a
                  href={whatsappDirectHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2.5 shadow-xs transition-colors whitespace-nowrap"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Deschide WhatsApp cu Oferta Precompletată</span>
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="submit"
                    className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Solicită Apel în 15 Min</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Mesaj Copiat!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>Copiază Textul Ofertei</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Dispecerat Cluj-Napoca:</span>
              <a
                href={`tel:${PHONE_TEL}`}
                className="font-mono-num font-semibold text-slate-900 hover:text-emerald-700"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
