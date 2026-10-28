import { useState } from 'react'
import OnboardingScreen from './components/onboarding/OnboardingScreen'
import { onboardingSlides } from './data/onboardingSlides'

function App() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  function continueOnboarding() {
    if (activeSlide === onboardingSlides.length - 1) {
      setIsComplete(true)
      return
    }

    setActiveSlide((currentSlide) => currentSlide + 1)
  }

  function skipOnboarding() {
    setIsComplete(true)
  }

  function selectSlide(index) {
    setActiveSlide(index)
    setIsComplete(false)
  }

  function restartOnboarding() {
    setActiveSlide(0)
    setIsComplete(false)
  }

  return (
    <OnboardingScreen
      activeSlide={activeSlide}
      isComplete={isComplete}
      onContinue={continueOnboarding}
      onRestart={restartOnboarding}
      onSkip={skipOnboarding}
      onSelectSlide={selectSlide}
      slide={onboardingSlides[activeSlide]}
      totalSlides={onboardingSlides.length}
    />
  )
}

export default App
