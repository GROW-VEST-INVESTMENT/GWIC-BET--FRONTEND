const configuredApiUrl = import.meta.env.VITE_API_URL?.trim()

const apiBaseUrl = configuredApiUrl
  ? configuredApiUrl.replace(/\/+$/, '')
  : import.meta.env.DEV
    ? ''
    : null

export async function checkApiHealth() {
  if (apiBaseUrl === null) {
    throw new Error('VITE_API_URL is not configured for this deployment.')
  }

  const response = await fetch(`${apiBaseUrl}/api/health`)
  const health = await response.json()

  if (!response.ok || health.status !== 'ok') {
    throw new Error('The API or its database is unavailable.')
  }

  return health
}

export async function getDashboardData({ signal } = {}) {
  if (apiBaseUrl === null) {
    throw new Error('VITE_API_URL is not configured for this deployment.')
  }

  const response = await fetch(`${apiBaseUrl}/api/dashboard`, { signal })

  if (response.status === 404 || response.status === 501) {
    throw new Error('Sports data API is not connected yet.')
  }

  let payload
  try {
    payload = await response.json()
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new Error('Sports data API returned an invalid response.')
  }

  if (!response.ok) {
    throw new Error(payload.error || 'Could not load sports data.')
  }

  if (
    payload === null ||
    typeof payload !== 'object' ||
    !Array.isArray(payload.matches)
  ) {
    throw new Error('Sports data API returned an invalid response.')
  }

  const matchesAreValid = payload.matches.every(
    (match) =>
      match !== null &&
      typeof match === 'object' &&
      typeof match.id === 'string' &&
      typeof match.sport === 'string' &&
      typeof match.league === 'string' &&
      typeof match.status === 'string' &&
      typeof match.homeTeam?.name === 'string' &&
      typeof match.awayTeam?.name === 'string' &&
      (match.odds === undefined ||
        (Array.isArray(match.odds) &&
          match.odds.every(
            (odd) =>
              typeof odd.selection === 'string' &&
              typeof odd.value === 'number' &&
              Number.isFinite(odd.value),
          ))) &&
      (match.score === undefined ||
        (match.score !== null &&
          typeof match.score === 'object' &&
          Number.isFinite(match.score.home) &&
          Number.isFinite(match.score.away))),
  )

  if (!matchesAreValid) {
    throw new Error('Sports data API returned matches in an invalid format.')
  }

  return payload
}
