import { useEffect, useState } from 'react'
import OnboardingScreen from './components/onboarding/OnboardingScreen'
import { onboardingSlides } from './data/onboardingSlides'
import { checkApiHealth } from './lib/api'

function App() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [apiStatus, setApiStatus] = useState('checking')

  useEffect(() => {
    let isMounted = true

    checkApiHealth()
      .then(() => {
        if (isMounted) setApiStatus('connected')
      })
      .catch((error) => {
        console.error('Backend health check failed:', error.message)
        if (isMounted) setApiStatus('unavailable')
      })

    return () => {
      isMounted = false
    }
  }, [])

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
      apiStatus={apiStatus}
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
