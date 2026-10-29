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
