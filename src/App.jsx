import { useEffect, useState } from 'react'
import DashboardScreen from './components/dashboard/DashboardScreen'
import OnboardingScreen from './components/onboarding/OnboardingScreen'
import { onboardingSlides } from './data/onboardingSlides'
import { checkApiHealth } from './lib/api'

function App() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [hasEnteredHome, setHasEnteredHome] = useState(false)
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
      setHasEnteredHome(true)
      return
    }

    setActiveSlide((currentSlide) => currentSlide + 1)
  }

  function skipOnboarding() {
    setHasEnteredHome(true)
  }

  function selectSlide(index) {
    setActiveSlide(index)
  }

  if (hasEnteredHome) {
    return <DashboardScreen />
  }

  return (
    <OnboardingScreen
      activeSlide={activeSlide}
      apiStatus={apiStatus}
      onContinue={continueOnboarding}
      onSkip={skipOnboarding}
      onSelectSlide={selectSlide}
      slide={onboardingSlides[activeSlide]}
      totalSlides={onboardingSlides.length}
    />
  )
}

export default App
