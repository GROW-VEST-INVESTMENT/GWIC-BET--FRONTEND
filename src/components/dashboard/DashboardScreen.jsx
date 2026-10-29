import { useEffect, useMemo, useState } from 'react'
import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clock3,
  Gamepad2,
  History,
  House,
  ListChecks,
  Ellipsis,
  Radio,
  ReceiptText,
  RefreshCw,
  Search,
  Ticket,
  Trophy,
  UserRound,
} from 'lucide-react'
import brandLogo from '../../assets/gwic-bet-logo.png'
import haalandImage from '../../assets/dashboard/hero-haaland.jpg'
import sakaImage from '../../assets/dashboard/hero-saka.jpg'
import footballMatchImage from '../../assets/dashboard/hero-football-match.jpg'
import basketballImage from '../../assets/dashboard/hero-basketball.jpg'
import tennisImage from '../../assets/dashboard/hero-tennis.jpg'
import { getDashboardData } from '../../lib/api'

const fallbackHeroSlides = [
  {
    id: 'manchester-city',
    league: 'Premier League',
    sport: 'Football',
    team: 'Manchester City',
    player: 'Erling Haaland',
    image: haalandImage,
    imagePosition: 'left 20%',
    imageSize: '145% auto',
  },
  {
    id: 'arsenal',
    league: 'Premier League',
    sport: 'Football',
    team: 'Arsenal',
    player: 'Bukayo Saka',
    image: sakaImage,
    imagePosition: 'left 18%',
    imageSize: '110% auto',
  },
]

const categories = [
  { name: 'Live', Icon: Radio },
  { name: 'Football', sportIcon: 'football' },
  { name: 'Basketball', sportIcon: 'basketball' },
  { name: 'Tennis', sportIcon: 'tennis' },
  { name: 'Esports', Icon: Gamepad2 },
]

const bottomTabs = [
  { name: 'Home', Icon: House },
  { name: 'Live', Icon: Radio },
  { name: 'Betslip', Icon: ReceiptText },
  { name: 'My Bets', Icon: History },
  { name: 'More', Icon: Ellipsis },
]

function getTeamName(team) {
  return team.name
}

function TeamBadge({ team }) {
  if (team.logoUrl) {
    return (
      <img
        alt=""
        className="size-6 shrink-0 object-contain sm:size-8"
        loading="lazy"
        src={team.logoUrl}
      />
    )
  }

  const initials = team.name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <span
      aria-hidden="true"
      className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[9px] font-bold text-white/75 sm:size-8 sm:text-[10px]"
    >
      {initials}
    </span>
  )
}

function formatKickoff(kickoffAt) {
  if (!kickoffAt) return 'Schedule not available'

  const kickoff = new Date(kickoffAt)
  if (Number.isNaN(kickoff.getTime())) return 'Schedule not available'

  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(kickoff)
}

function SportIcon({ sport, Icon }) {
  if (Icon) {
    return <Icon aria-hidden="true" className="size-6 sm:size-7" strokeWidth={1.8} />
  }

  const paths = {
    football: (
      <>
        <circle cx="16" cy="16" r="13" />
        <path d="m16 9 5 3.6-1.9 5.8h-6.2L11 12.6 16 9Z" />
        <path d="m11 12.6-4-1.2m2.8 7-2.5 4.2m12.8-5.2 4.2 2.4m-9.2-10.8V4m5 8.6 3.4-3m-9.6 9.6-.6 5.2m3.7-5.2 4 3.1" />
      </>
    ),
    basketball: (
      <>
        <circle cx="16" cy="16" r="13" />
        <path d="M16 3v26M3 16h26M7 7c7 5 11 13 12 22M25 7c-7 5-11 13-12 22" />
      </>
    ),
    tennis: (
      <>
        <circle cx="16" cy="16" r="13" />
        <path d="M7 4c7 5 10 12 9 21m9-25c-7 5-10 12-9 21" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className="size-6 sm:size-7"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 32 32"
    >
      {paths[sport]}
    </svg>
  )
}

function MatchCard({ match }) {
  const isLive = match.status.toLowerCase() === 'live'
  const hasScore =
    match.score &&
    Number.isFinite(match.score.home) &&
    Number.isFinite(match.score.away)

  return (
    <article className="rounded-[14px] border border-[#17354b] bg-[#061522]/90 px-2.5 py-2.5 shadow-[0_8px_28px_rgba(0,0,0,0.12)] sm:rounded-2xl sm:p-5">
      <div className="flex min-h-6 items-center justify-between gap-3 border-b border-white/[0.08] pb-2">
        <div className="flex min-w-0 items-center gap-2 text-xs text-[#b8c5d6]">
          {isLive ? (
            <span className="rounded-md bg-rose-500 px-2 py-1 text-[10px] font-extrabold tracking-wide text-white">
              LIVE
            </span>
          ) : (
            <span className="text-[11px] font-medium">
              {formatKickoff(match.kickoffAt)}
            </span>
          )}
          {isLive && (
            <span className="truncate text-[11px]">
              {match.minute ? `${match.minute}’` : 'Live now'}
            </span>
          )}
        </div>
        <span className="flex max-w-[52%] min-w-0 items-center gap-1.5 truncate text-right text-[11px] font-medium text-[#c8d1df] sm:text-xs">
          <Trophy aria-hidden="true" className="size-3.5 shrink-0 text-white/80" />
          <span className="truncate">{match.league}</span>
        </span>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto] items-center gap-2 py-2 sm:gap-4 sm:py-4">
        <div className="min-w-0 space-y-1">
          {[match.homeTeam, match.awayTeam].map((team, index) => (
            <div
              className="flex min-w-0 items-center gap-2"
              key={`${getTeamName(team)}-${index}`}
            >
              <TeamBadge team={team} />
              <span className="truncate text-[13px] font-semibold text-white sm:text-base">
                {getTeamName(team)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex min-w-8 flex-col items-center gap-1 border-l border-white/10 pl-3 text-sm font-bold tabular-nums text-white sm:min-w-12 sm:gap-3 sm:pl-4 sm:text-base">
          {hasScore ? (
            <>
              <span>{match.score.home}</span>
              <span>{match.score.away}</span>
            </>
          ) : (
            <Clock3
              aria-label="Score not available"
              className="size-4 text-white/35 sm:size-5"
            />
          )}
        </div>

        <div className="flex min-w-0 flex-col items-center gap-1">
          {isLive ? (
            <>
              <span className="rounded-md bg-[#b5ff36]/15 px-2 py-1 text-[10px] font-bold text-[#b5ff36]">
                LIVE
              </span>
              <span className="whitespace-nowrap text-[9px] text-[#c3ccda]">
                {match.period || 'In play'}
                {match.minute ? ` • ${match.minute}’` : ''}
              </span>
            </>
          ) : (
            <span className="whitespace-nowrap text-[10px] text-[#bdc8d7]">
              {formatKickoff(match.kickoffAt)}
            </span>
          )}
        </div>
        <ChevronRight
          aria-hidden="true"
          className="size-4 text-[#c8d1df] sm:size-5"
        />
      </div>

      {match.odds?.length > 0 && (
        <div className="grid grid-cols-3 gap-1.5 border-t border-white/[0.08] pt-2 sm:gap-2 sm:pt-3">
          {match.odds.map(({ selection, value }) => (
            <div
              className="flex min-h-8 items-center justify-between gap-1 rounded-lg border border-[#1c3e55] bg-[#091c2a] px-2.5 py-1.5 text-[11px] sm:min-h-11 sm:px-3 sm:text-xs"
              key={selection}
            >
              <span className="font-medium text-[#b8c5d6]">{selection}</span>
              <span className="font-extrabold tabular-nums text-[#b5ff36]">
                {value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </article>
  )
}

function EmptyState({ title, description, Icon }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-[#1a3549] bg-[#061522]/65 px-6 py-10 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-[#b5ff36]/10 text-[#b5ff36]">
        <Icon aria-hidden="true" className="size-6" />
      </span>
      <h3 className="mt-4 text-base font-bold text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#9eacbd]">
        {description}
      </p>
    </div>
  )
}

function MatchFeedMessage({ title, description, onRetry }) {
  return (
    <div className="flex min-h-[88px] items-center gap-3 rounded-[14px] border border-[#17354b] bg-[#061522]/90 px-4 py-3 sm:min-h-28">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#b5ff36]/10 text-[#b5ff36]">
        <CalendarDays aria-hidden="true" className="size-[18px]" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-[#9eacbd]">
          {description}
        </p>
      </div>
      {onRetry && (
        <button
          aria-label="Retry loading matches"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:bg-white/[0.06]"
          onClick={onRetry}
          type="button"
        >
          <RefreshCw aria-hidden="true" className="size-4" />
        </button>
      )}
    </div>
  )
}

function DashboardScreen() {
  const [matches, setMatches] = useState([])
  const [loadState, setLoadState] = useState('loading')
  const [loadError, setLoadError] = useState('')
  const [retryCount, setRetryCount] = useState(0)
  const [activeCategory, setActiveCategory] = useState('Live')
  const [activeTab, setActiveTab] = useState('Home')
  const [heroSlideIndex, setHeroSlideIndex] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const heroSlides = useMemo(() => {
    if (matches.length === 0) return fallbackHeroSlides

    return matches.slice(0, 5).map((match, index) => ({
      id: match.id,
      league: match.league,
      sport: match.sport,
      match,
      image:
        match.sport.toLowerCase() === 'basketball'
          ? basketballImage
          : match.sport.toLowerCase() === 'tennis'
            ? tennisImage
            : footballMatchImage,
      imagePosition: index % 2 === 0 ? 'center 45%' : 'center 58%',
      imageSize: 'cover',
    }))
  }, [matches])

  useEffect(() => {
    const controller = new AbortController()

    getDashboardData({ signal: controller.signal })
      .then(({ matches: liveMatches }) => {
        setMatches(liveMatches)
        setLoadState('loaded')
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        console.error('Could not load live sports data:', error.message)
        setLoadError(error.message)
        setLoadState('error')
      })

    return () => controller.abort()
  }, [retryCount])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setHeroSlideIndex((index) => (index + 1) % heroSlides.length)
    }, 5000)

    return () => window.clearTimeout(timeout)
  }, [heroSlideIndex, heroSlides.length])

  const visibleMatches = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return matches
      .filter((match) => {
        const matchesCategory =
          activeCategory === 'Live'
            ? activeTab === 'Home' || match.status.toLowerCase() === 'live'
            : match.sport.toLowerCase() === activeCategory.toLowerCase()
        const searchableText = [
          match.league,
          match.sport,
          getTeamName(match.homeTeam),
          getTeamName(match.awayTeam),
        ]
          .join(' ')
          .toLowerCase()

        return matchesCategory && (!query || searchableText.includes(query))
      })
      .sort((left, right) => {
        const leftIsLive = left.status.toLowerCase() === 'live'
        const rightIsLive = right.status.toLowerCase() === 'live'
        return Number(rightIsLive) - Number(leftIsLive)
      })
  }, [activeCategory, activeTab, matches, searchQuery])

  const liveMatchCount = matches.filter(
    (match) => match.status.toLowerCase() === 'live',
  ).length
  const activeHeroSlideIndex = heroSlideIndex % heroSlides.length
  const heroSlide = heroSlides[activeHeroSlideIndex]
  const featuredMatch = heroSlide.match
  const featuredMatchTitle = featuredMatch
    ? `${getTeamName(featuredMatch.homeTeam)} vs ${getTeamName(featuredMatch.awayTeam)}`
    : heroSlide.league
  const featuredMatchDetail = featuredMatch
    ? featuredMatch.score
      ? `${featuredMatch.score.home} - ${featuredMatch.score.away}${
          featuredMatch.status.toLowerCase() === 'live' ? ' · LIVE' : ''
        }`
      : featuredMatch.status.toLowerCase() === 'live'
        ? 'LIVE'
        : formatKickoff(featuredMatch.kickoffAt)
    : heroSlide.player
      ? heroSlide.player
      : 'Explore fixtures and league news'

  const isSportsTab = activeTab === 'Home' || activeTab === 'Live'
  const title = activeTab === 'Live' ? 'Live Matches' : 'Top Matches'

  return (
    <div className="min-h-svh bg-[#020b16] text-white">
      <header className="sticky top-0 z-30 border-b border-[#142d40] bg-[#020b16]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-[1080px] items-center justify-between gap-4 px-4 sm:h-[90px] sm:px-7">
          <img
            alt="GWIC BET"
            className="h-auto w-[clamp(136px,36vw,176px)] shrink-0"
            src={brandLogo}
          />
          <div className="flex items-center gap-1 sm:gap-2">
            {searchOpen && (
              <input
                autoFocus
                aria-label="Search matches"
                className="w-[min(42vw,260px)] rounded-xl border border-[#1b3d53] bg-[#071827] px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#b5ff36]/60"
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search teams or leagues"
                value={searchQuery}
              />
            )}
            <button
              aria-label={searchOpen ? 'Close match search' : 'Search matches'}
              className="flex size-10 items-center justify-center rounded-full text-white/80 transition hover:bg-white/[0.07] hover:text-white"
              onClick={() => {
                setSearchOpen((open) => !open)
                setSearchQuery('')
              }}
              type="button"
            >
              <Search aria-hidden="true" className="size-5" />
            </button>
            <button
              aria-label="Notifications"
              className="relative flex size-10 items-center justify-center rounded-full text-white/80 transition hover:bg-white/[0.07] hover:text-white"
              onClick={() => setActiveTab('More')}
              type="button"
            >
              <Bell aria-hidden="true" className="size-5" />
            </button>
            <button
              aria-label="Profile and account"
              className="flex items-center gap-1 rounded-full text-white/85 transition hover:text-white"
              onClick={() => setActiveTab('More')}
              type="button"
            >
              <span className="flex size-10 items-center justify-center overflow-hidden rounded-full border-2 border-[#b5ff36] bg-[radial-gradient(circle_at_50%_32%,#516b7a_0%,#1b2c3b_48%,#07111d_100%)] shadow-[0_0_12px_rgba(181,255,54,0.12)]">
                <UserRound
                  aria-hidden="true"
                  className="size-[22px] text-[#e4edf4]"
                  strokeWidth={1.8}
                />
              </span>
              <ChevronDown aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1080px] px-4 pb-28 pt-3 sm:px-7 sm:pt-7">
        {activeTab === 'Home' && (
          <section
            aria-roledescription="carousel"
            className="relative isolate h-[clamp(164px,42vw,270px)] overflow-hidden rounded-[16px] border border-[#17415a] bg-[#071927] sm:rounded-[20px]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-20 bg-no-repeat transition-[background-position] duration-700 ease-in-out"
              style={{
                backgroundImage: `url(${heroSlide.image})`,
                backgroundPosition: heroSlide.imagePosition,
                backgroundSize: heroSlide.imageSize,
              }}
            />
            {heroSlide.player && (
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,10,19,0.96)_0%,rgba(2,10,19,0.78)_34%,rgba(2,10,19,0.22)_74%,rgba(2,10,19,0.04)_100%),linear-gradient(0deg,rgba(2,10,19,0.58),transparent_65%)]"
              />
            )}
            {!heroSlide.player && (
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,10,19,0.94)_0%,rgba(2,10,19,0.76)_43%,rgba(2,10,19,0.08)_100%),linear-gradient(0deg,rgba(2,10,19,0.34),transparent_60%)]" />
            )}
            <div className="flex h-full items-center px-4 py-2 sm:px-9 sm:py-7">
              <div className="max-w-md">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#06111f]/70 px-3 py-1.5 text-[10px] font-bold tracking-[0.18em] text-white/90">
                  <span className="size-1.5 rounded-full bg-[#b5ff36]" />
                  {heroSlide.league.toUpperCase()}
                </span>
                <h1 className="mt-2 max-w-sm text-[clamp(1.5rem,6.2vw,2.5rem)] font-black leading-tight tracking-tight">
                  {heroSlide.team || featuredMatchTitle}
                  {featuredMatch && (
                    <>
                      <br />
                      <span className="text-[#b5ff36]">
                        {featuredMatchDetail}
                      </span>
                    </>
                  )}
                </h1>
                {!featuredMatch && (
                  <p className="mt-1 text-xs font-medium text-white/75 sm:text-sm">
                    {featuredMatchDetail}
                  </p>
                )}
                {featuredMatch && (
                  <p className="mt-1 text-xs font-medium text-white/75 sm:text-sm">
                    {heroSlide.sport}
                  </p>
                )}
                <button
                  className="mt-3 inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[#b5ff36] px-4 text-xs font-extrabold text-[#07121b] transition hover:bg-[#c5ff66] sm:mt-5 sm:min-h-11 sm:gap-2 sm:px-5 sm:text-sm"
                  onClick={() => {
                    setActiveCategory(heroSlide.sport)
                    document.getElementById('match-list')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }}
                  type="button"
                >
                  {featuredMatch
                    ? 'View match'
                    : heroSlide.team
                      ? 'Explore Football'
                      : `Explore ${heroSlide.league}`}
                  <ChevronRight aria-hidden="true" className="size-4" />
                </button>
              </div>
            </div>
            <nav
              aria-label="Featured clubs and matches"
              className="absolute bottom-3 right-4 z-10 flex items-center gap-2 sm:bottom-4 sm:right-6"
            >
              {heroSlides.map(({ id, league }, index) => (
                <button
                  aria-label={`Show ${heroSlides[index].team || league} slide`}
                  aria-current={activeHeroSlideIndex === index ? 'true' : undefined}
                  className={`size-2 rounded-full transition-all ${
                    activeHeroSlideIndex === index
                      ? 'bg-[#b5ff36]'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  key={id}
                  onClick={() => setHeroSlideIndex(index)}
                  type="button"
                />
              ))}
            </nav>
          </section>
        )}

        {isSportsTab ? (
          <>
            <nav
              aria-label="Filter sports"
              className="mt-3 grid grid-cols-5 gap-2 pb-1 sm:mt-6 sm:gap-3"
            >
              {categories.map(({ name, Icon, sportIcon }) => {
                const isActive = activeCategory === name
                return (
                  <button
                    aria-pressed={isActive}
                    className={`flex min-w-0 flex-col items-center justify-center gap-1.5 rounded-2xl border px-1 py-2.5 transition sm:gap-2.5 sm:px-3 sm:py-4 ${
                      isActive
                        ? 'border-[#aaff38]/70 bg-[#b5ff36]/[0.07] text-[#b5ff36] shadow-[inset_0_-2px_0_#b5ff36]'
                        : 'border-[#142f43] bg-[#061522] text-[#d3dbea] hover:border-[#31536a]'
                    }`}
                    key={name}
                    onClick={() => setActiveCategory(name)}
                    type="button"
                  >
                    <SportIcon Icon={Icon} sport={sportIcon} />
                    <span className="text-[10px] font-medium leading-none sm:text-xs">
                      {name}
                    </span>
                    {name === 'Live' && liveMatchCount > 0 && (
                      <span className="sr-only">
                        {liveMatchCount} live matches
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>

            <section className="mt-4 scroll-mt-24 sm:mt-6" id="match-list">
              <div className="mb-3 flex items-center justify-between gap-4">
                <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                  {title}
                </h2>
                <button
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#b5ff36] transition hover:text-[#d0ff75] sm:text-sm"
                  onClick={() => {
                    setActiveCategory('Live')
                    document.getElementById('match-list')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }}
                  type="button"
                >
                  {loadState === 'loaded' && matches.length > 0
                    ? `${visibleMatches.length} matches`
                    : 'See all'}
                  <ChevronRight aria-hidden="true" className="size-4" />
                </button>
              </div>

              {loadState === 'loading' && (
                <div
                  aria-label="Loading sports data"
                  className="flex min-h-44 items-center justify-center rounded-2xl border border-[#17354b] bg-[#061522]/80 sm:min-h-56"
                  role="status"
                >
                  <span className="flex items-center gap-3 text-sm text-[#b8c5d6]">
                    <RefreshCw aria-hidden="true" className="size-4 animate-spin" />
                    Loading live sports data…
                  </span>
                </div>
              )}

              {loadState === 'error' && (
                <MatchFeedMessage
                  description={loadError}
                  onRetry={() => {
                    setLoadState('loading')
                    setLoadError('')
                    setRetryCount((count) => count + 1)
                  }}
                  title="Match data isn’t available yet"
                />
              )}

              {loadState === 'loaded' && visibleMatches.length > 0 && (
                <div className="space-y-3">
                  {visibleMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              )}

              {loadState === 'loaded' && matches.length === 0 && (
                <MatchFeedMessage
                  description="Matches will appear here when the live sports feed is available."
                  title="No matches to show"
                />
              )}

              {loadState === 'loaded' &&
                matches.length > 0 &&
                visibleMatches.length === 0 && (
                  <EmptyState
                    description={
                      searchQuery
                        ? 'Try another team, league, or search term.'
                        : 'There are no matches in this category right now.'
                    }
                    Icon={Search}
                    title="No matching events"
                  />
                )}
            </section>
          </>
        ) : (
          <section className="pt-8">
            <h1 className="mb-5 text-2xl font-extrabold">
              {activeTab === 'Betslip'
                ? 'Betslip'
                : activeTab === 'My Bets'
                  ? 'My Bets'
                  : 'More'}
            </h1>
            <EmptyState
              description={
                activeTab === 'Betslip'
                  ? 'Your selections will appear here when betting and betslip services are connected.'
                  : activeTab === 'My Bets'
                    ? 'Your placed bets will appear here when account and betting services are connected.'
                    : 'Account and additional services will appear here when they are available.'
              }
              Icon={
                activeTab === 'Betslip'
                  ? Ticket
                  : activeTab === 'My Bets'
                    ? ListChecks
                    : UserRound
              }
              title={
                activeTab === 'Betslip'
                  ? 'Your betslip is empty'
                  : activeTab === 'My Bets'
                    ? 'No bet history yet'
                    : 'More services coming soon'
              }
            />
          </section>
        )}
      </main>

      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-[#142d40] bg-[#020b16]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl"
      >
        <div className="mx-auto grid h-[68px] max-w-[720px] grid-cols-5 px-2">
          {bottomTabs.map(({ name, Icon }) => {
            const isActive = activeTab === name
            const isLive = name === 'Live' && liveMatchCount > 0

            return (
              <button
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition ${
                  isActive ? 'text-[#b5ff36]' : 'text-[#aebbd0]'
                }`}
                key={name}
                onClick={() => {
                  setActiveTab(name)
                  if (name === 'Live') setActiveCategory('Live')
                  if (name === 'Home') {
                    setActiveCategory('Live')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
                type="button"
              >
                <Icon
                  aria-hidden="true"
                  className={`size-6 transition-[filter,transform] ${
                    isActive ? 'drop-shadow-[0_0_7px_rgba(181,255,54,0.3)]' : ''
                  }`}
                  strokeWidth={2.2}
                />
                {isLive && (
                  <span className="absolute left-1/2 top-1 size-2 -translate-x-1/2 rounded-full bg-rose-500" />
                )}
                <span>{name}</span>
                {isActive && (
                  <span className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-[#b5ff36]" />
                )}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default DashboardScreen
