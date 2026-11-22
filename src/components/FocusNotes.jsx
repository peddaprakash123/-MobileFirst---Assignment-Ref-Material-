import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { FOCUS_NOTES_SLIDES } from '../data/sampleTasks';

export const FocusNotes = ({ pendingCount, completionRate }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const totalSlides = FOCUS_NOTES_SLIDES.length;
  const activeSlide = FOCUS_NOTES_SLIDES[activeSlideIndex];

  const handlePrev = () => {
    setActiveSlideIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlideIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const desktopPercent = activeSlide.cardPercent;
  const mobilePercent =
    activeSlide.id === 1 ? completionRate : activeSlide.cardPercent;

  return (
    <section
      id="focus-notes"
      aria-roledescription="carousel"
      aria-label="Focus Notes"
      className="w-full"
    >
      {/* Desktop & Tablet Carousel Banner (152px min height) */}
      <div className="hidden sm:flex relative w-full min-h-[152px] rounded-2xl bg-gradient-to-r from-[#5D4BEE] via-[#543FE8] to-[#4B36E0] px-7 py-6 items-center justify-between gap-6 overflow-hidden shadow-sm">
        {/* Subtle Decorative Background Circles matching Figma */}
        <div
          className="pointer-events-none absolute -right-12 -top-16 w-56 h-56 rounded-full bg-white/[0.06]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-24 -bottom-20 w-44 h-44 rounded-full bg-white/[0.05]"
          aria-hidden="true"
        />

        {/* Left Copy & Slide Dash Indicators */}
        <div className="relative z-10 flex-1 min-w-0 flex flex-col justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/75 tabular-nums mb-1.5">
              FOCUS NOTES <span className="mx-2 opacity-50">·</span>{' '}
              {activeSlide.stepLabel}
            </p>
            <h2 className="font-display font-bold text-xl md:text-[23px] text-white tracking-tight leading-snug">
              {activeSlide.title}
            </h2>
            <p className="text-xs md:text-[13px] text-white/80 mt-1">
              {activeSlide.subtitle}
            </p>
          </div>

          {/* 3 Indicator Dashes */}
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Choose a focus note slide"
          >
            {FOCUS_NOTES_SLIDES.map((slide, idx) => {
              const isCurrent = idx === activeSlideIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`Slide ${idx + 1} of ${totalSlides}`}
                  onClick={() => setActiveSlideIndex(idx)}
                  className="group -mx-1.5 -my-2.5 flex h-6 items-center justify-center px-1.5 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span
                    className={`h-1 rounded-full transition-all ${
                      isCurrent
                        ? 'w-7 bg-white'
                        : 'w-5 bg-white/30 group-hover:bg-white/55'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Tilted Mini Task Card + Circular Prev / Next Controls */}
        <div className="relative z-10 flex items-center gap-5 shrink-0">
          {/* Tilted Floating Mini Preview Card */}
          <div
            className="hidden md:block relative w-[224px] select-none"
            aria-hidden="true"
          >
            {/* Tilted translucent back layer */}
            <div className="absolute inset-0 -translate-x-2 translate-y-1.5 -rotate-[4deg] rounded-2xl bg-white/20" />

            <div className="relative bg-white rounded-2xl px-4 py-3.5 shadow-lg rotate-[2.5deg]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[10px] bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0">
                  <Check size={16} strokeWidth={2.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                    {activeSlide.cardEyebrow}
                  </p>
                  <p className="text-[13px] font-bold text-[#0F172A] truncate mt-0.5">
                    {activeSlide.cardTitle}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2.5">
                <div className="flex-1 h-1.5 bg-[#EEF2FF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#5B4AF5] rounded-full transition-all duration-300"
                    style={{ width: `${desktopPercent}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-[#5B4AF5] tabular-nums">
                  {desktopPercent}%
                </span>
              </div>
            </div>
          </div>

          {/* Circular Prev / Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous focus note"
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next focus note"
              className="w-9 h-9 rounded-full bg-white hover:bg-white/95 text-[#5B4AF5] shadow-sm flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Compact Banner (390px design) */}
      <div className="sm:hidden relative w-full rounded-2xl bg-gradient-to-r from-[#5D4BEE] via-[#543FE8] to-[#4B36E0] p-5 text-white overflow-hidden shadow-sm">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/75 tabular-nums">
              {activeSlide.id === 1
                ? 'GOOD AFTERNOON'
                : `FOCUS NOTES · ${activeSlide.stepLabel}`}
            </p>
            <h2 className="font-display font-bold text-[20px] text-white leading-snug mt-1">
              {activeSlide.title.replace('.', '')}
            </h2>
            <p className="text-xs text-white/85 mt-1">
              {activeSlide.id === 1
                ? `${pendingCount} ${
                    pendingCount === 1 ? 'task' : 'tasks'
                  } waiting for your attention.`
                : activeSlide.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous focus note"
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next focus note"
              className="w-9 h-9 rounded-full bg-white text-[#5B4AF5] flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Dynamic Completion Bar */}
        <div className="mt-4 flex items-center gap-3">
          <div
            className="flex-1 h-2 bg-white/25 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={mobilePercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Task completion progress"
          >
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${mobilePercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-white tabular-nums">
            {mobilePercent}%
          </span>
        </div>

        {/* Mobile Slide Indicator Dashes */}
        <div
          className="mt-3 flex items-center gap-1.5"
          role="tablist"
          aria-label="Choose a focus note slide"
        >
          {FOCUS_NOTES_SLIDES.map((slide, idx) => {
            const isCurrent = idx === activeSlideIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                aria-label={`Slide ${idx + 1} of ${totalSlides}`}
                onClick={() => setActiveSlideIndex(idx)}
                className="group -mx-1.5 -my-2.5 flex h-6 items-center justify-center px-1.5 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span
                  className={`h-1 rounded-full transition-all ${
                    isCurrent ? 'w-5 bg-white' : 'w-3 bg-white/30'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
