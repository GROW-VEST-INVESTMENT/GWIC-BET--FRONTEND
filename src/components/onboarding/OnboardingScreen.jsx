import { ArrowRight } from 'lucide-react'
import welcomeBackdrop from '../../assets/onboarding-athletes.jpg'
import BrandLogo from './BrandLogo'
import FeatureHighlights from './FeatureHighlights'

function OnboardingScreen({
  activeSlide,
  isComplete,
  onContinue,
  onRestart,
  onSelectSlide,
  onSkip,
  slide,
  totalSlides,
}) {
  return (
    <main className="relative mx-auto flex min-h-svh w-full max-w-[591px] flex-col overflow-hidden bg-[#020b16] px-[6.4%] pt-[3.4vw] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_55%_45%,rgba(0,51,50,0.3),transparent_58%),linear-gradient(180deg,#061629_0%,#020b16_48%,#03101c_100%)]"
      />

      <header className="relative z-10 mt-[9.8vw] flex items-center justify-between gap-3">
        <BrandLogo />
        <p className="text-right text-[1.9vw] font-extrabold leading-[1.65] tracking-[0.9vw] text-[#c3ff40]">
          PLAY SMARTER.
          <br />
          WIN BIGGER.
        </p>
      </header>

      <section aria-live="polite" className="relative z-10 mt-[8.6vw]">
        <p className="text-[2.4vw] font-extrabold tracking-[0.68vw] text-[#c0ff38]">
          {isComplete ? 'WELCOME TO GWIC BET' : slide.eyebrow}
        </p>
        <h1 className="mt-1 flex flex-wrap items-baseline gap-x-[2.7vw] text-[11vw] font-black leading-[1.02] tracking-[-2px]">
          {isComplete ? (
            <>
              <span>YOU&apos;RE</span>
              <span className="text-[#b5ff36]">READY</span>
            </>
          ) : (
            <>
              <span>{slide.title}</span>
              <span className="text-[#b5ff36]">{slide.accent}</span>
            </>
          )}
        </h1>
        <p className="mt-[2.4vw] max-w-[52vw] text-[3.4vw] font-bold leading-[1.35] text-[#eef0f7]">
          {isComplete
            ? 'Your next big moment starts here.'
            : slide.description}
        </p>
      </section>

      <section
        aria-label="GWIC BET sports and gaming"
        className="relative -mx-[6.4vw] mt-[-4px] h-[min(87.6vw,518px)] min-h-[300px] overflow-hidden"
      >
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[center_45%]"
          src={welcomeBackdrop}
        />
        {slide.image && (
          <img
            alt={slide.imageAlt}
            className="absolute inset-0 h-full w-full object-contain object-bottom"
            key={slide.image}
            src={slide.image}
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#020b16_100%)]" />
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#020b16]/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#020b16]/60 to-transparent" />
      </section>

      <section aria-label="Ways to play" className="relative z-10 mt-[1vw]">
        <FeatureHighlights />
      </section>

      <nav
        aria-label="Onboarding progress"
        className="relative z-10 mt-[6.6vw] flex items-center justify-center gap-[5vw]"
      >
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            aria-label={`Go to onboarding step ${index + 1}`}
            aria-current={activeSlide === index ? 'step' : undefined}
            className={`size-[1.9vw] rounded-full transition-colors ${
              activeSlide === index ? 'bg-[#b5ff36]' : 'bg-[#43526c]'
            }`}
            key={index}
            onClick={() => onSelectSlide(index)}
            type="button"
          />
        ))}
      </nav>

      <div className="relative z-10 mt-[4vw]">
        <button
          className="flex min-h-[10.2vw] w-full items-center justify-center gap-[2vw] rounded-full bg-[#b5ff36] px-6 text-[2.9vw] font-black text-[#07121b] transition hover:bg-[#c5ff66] active:scale-[0.99]"
          onClick={isComplete ? onRestart : onContinue}
          type="button"
        >
          {isComplete ? 'Start again' : 'Get Started'}
          {!isComplete && <ArrowRight aria-hidden="true" className="size-[4.2vw]" />}
        </button>
        <button
          className="mx-auto mt-[4.2vw] block px-4 py-[0.7vw] text-[2.4vw] font-semibold text-[#d3d5e0] transition hover:text-white"
          onClick={isComplete ? onRestart : onSkip}
          type="button"
        >
          {isComplete ? 'Back to welcome' : 'Skip'}
        </button>
      </div>
    </main>
  )
}

export default OnboardingScreen
