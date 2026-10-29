import { ArrowRight, Sparkles } from 'lucide-react'
import welcomeBackdrop from '../../assets/onboarding-athletes.jpg'
import BrandLogo from './BrandLogo'
import DesktopFeatureHighlights from './DesktopFeatureHighlights'

function DesktopOnboardingScreen({
  activeSlide,
  apiStatus,
  isComplete,
  onContinue,
  onRestart,
  onSelectSlide,
  onSkip,
  slide,
  totalSlides,
}) {
  return (
    <div className="relative hidden min-h-svh w-full flex-col overflow-hidden bg-[#040c18] text-white lg:flex">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_76%_38%,rgba(0,97,77,0.2),transparent_35%),radial-gradient(ellipse_at_15%_85%,rgba(22,51,79,0.25),transparent_40%),linear-gradient(135deg,#061321_0%,#030a13_58%,#07121d_100%)]"
      />

      <header className="relative z-10 mx-auto flex h-20 w-full max-w-[1500px] shrink-0 items-center justify-between border-b border-white/[0.08] px-10 xl:px-16">
        <BrandLogo desktop />
        <div className="flex items-center gap-8">
          <p className="hidden text-right text-xs font-extrabold leading-relaxed tracking-[0.28em] text-[#c3ff40] xl:block">
            PLAY SMARTER.
            <br />
            WIN BIGGER.
          </p>
          <span className="h-8 w-px bg-white/15" />
          <span
            aria-label={
              apiStatus === 'connected'
                ? 'Backend and database connected'
                : apiStatus === 'checking'
                  ? 'Checking backend connection'
                  : 'Backend unavailable'
            }
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/60"
            role="status"
          >
            <span
              className={`size-2 rounded-full ${
                apiStatus === 'connected'
                  ? 'bg-[#b5ff36]'
                  : apiStatus === 'checking'
                    ? 'animate-pulse bg-amber-300'
                    : 'bg-rose-400'
              }`}
            />
            {apiStatus === 'connected'
              ? 'API connected'
              : apiStatus === 'checking'
                ? 'Connecting'
                : 'API unavailable'}
          </span>
          <span className="h-8 w-px bg-white/15" />
          <span className="min-w-16 font-mono text-sm font-semibold tracking-widest text-white/60">
            {isComplete
              ? 'DONE'
              : `${String(activeSlide + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`}
          </span>
          <button
            className="text-sm font-semibold text-white/70 transition hover:text-white"
            onClick={isComplete ? onRestart : onSkip}
            type="button"
          >
            {isComplete ? 'Back to welcome' : 'Skip intro'}
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid w-full max-w-[1500px] flex-1 grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] items-center gap-10 px-10 py-6 xl:gap-16 xl:px-16">
        <section aria-live="polite" className="min-w-0 py-6">
          <p className="flex items-center gap-3 text-xs font-extrabold tracking-[0.3em] text-[#b5ff36]">
            <span className="h-px w-8 bg-[#b5ff36]" />
            {isComplete ? 'WELCOME TO GWIC BET' : slide.eyebrow}
          </p>

          <h1 className="mt-7 flex flex-wrap items-baseline gap-x-4 text-[clamp(4rem,6vw,6.75rem)] font-black leading-[0.92] tracking-[-0.065em]">
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

          <p className="mt-7 max-w-[32rem] text-lg font-medium leading-relaxed text-[#c9d1dc]">
            {isComplete
              ? 'Your next big moment starts here.'
              : slide.description}
          </p>

          <button
            className="mt-10 inline-flex min-h-14 min-w-60 items-center justify-center gap-3 rounded-full bg-[#b5ff36] px-8 text-base font-black text-[#07121b] shadow-[0_12px_40px_rgba(181,255,54,0.15)] transition hover:bg-[#c5ff66] hover:shadow-[0_16px_48px_rgba(181,255,54,0.23)] active:scale-[0.99]"
            onClick={isComplete ? onRestart : onContinue}
            type="button"
          >
            {isComplete ? 'Start again' : 'Get Started'}
            {!isComplete && <ArrowRight aria-hidden="true" size={20} />}
          </button>

          <nav
            aria-label="Onboarding progress"
            className="mt-10 flex items-center gap-2"
          >
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                aria-label={`Go to onboarding step ${index + 1}`}
                aria-current={activeSlide === index ? 'step' : undefined}
                className={`h-1.5 rounded-full transition-all ${
                  activeSlide === index
                    ? 'w-10 bg-[#b5ff36]'
                    : 'w-5 bg-white/20 hover:bg-white/45'
                }`}
                key={index}
                onClick={() => onSelectSlide(index)}
                type="button"
              />
            ))}
            <span className="ml-3 text-xs font-semibold tracking-widest text-white/40">
              {String(activeSlide + 1).padStart(2, '0')}
              <span className="px-1.5 text-white/20">/</span>
              {String(totalSlides).padStart(2, '0')}
            </span>
          </nav>
        </section>

        <section
          aria-label="GWIC BET sports and gaming"
          className="relative isolate h-[min(60svh,620px)] min-h-[390px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#081522] shadow-[0_32px_100px_rgba(0,0,0,0.45)]"
        >
          <img
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[center_43%]"
            src={welcomeBackdrop}
          />
          {slide.image && (
            <img
              alt={slide.imageAlt}
              className="absolute inset-0 h-full w-full object-contain object-bottom p-8"
              key={slide.image}
              src={slide.image}
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,10,19,0.32)_0%,transparent_32%,transparent_55%,rgba(2,10,19,0.86)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(2,10,19,0.35)_100%)]" />

          <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#06111f]/70 px-4 py-2 text-[10px] font-bold tracking-[0.22em] text-white/90 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-[#b5ff36] shadow-[0_0_10px_#b5ff36]" />
            THE GWIC EXPERIENCE
          </span>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 xl:p-9">
            <div>
              <p className="text-[10px] font-bold tracking-[0.28em] text-[#b5ff36]">
                ALL THE ACTION. ONE PLACE.
              </p>
              <p className="mt-2 text-xl font-extrabold tracking-tight text-white xl:text-2xl">
                Find your next favorite game.
              </p>
            </div>
            <span className="hidden size-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md xl:flex">
              <Sparkles aria-hidden="true" size={20} />
            </span>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mx-auto w-full max-w-[1500px] shrink-0 px-10 pb-8 xl:px-16">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[10px] font-bold tracking-[0.25em] text-white/45">
            BUILT FOR EVERY KIND OF PLAYER
          </p>
          <span className="text-[10px] font-semibold tracking-[0.18em] text-white/30">
            SPORTS · LIVE · CASINO · REWARDS
          </span>
        </div>
        <DesktopFeatureHighlights />
      </footer>
    </div>
  )
}

export default DesktopOnboardingScreen
