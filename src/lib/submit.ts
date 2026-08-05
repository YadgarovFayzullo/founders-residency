import type { FormValues } from './form'

export type ApplicationPayload = FormValues & {
  /** Human-readable versions of the coded choices, for the sheet. */
  statusLabel: string
  commitmentLabel: string
  submittedAt: string
}

const ENDPOINT = import.meta.env.VITE_SHEETS_ENDPOINT as string | undefined
const TIMEOUT_MS = 15_000

/**
 * Posts an application to the Google Apps Script web app that appends it to
 * the sheet. See apps-script/Code.gs for the receiving end and README.md for
 * the deployment steps.
 */
export async function submitApplication(
  payload: ApplicationPayload,
): Promise<void> {
  if (!ENDPOINT) {
    if (import.meta.env.DEV) {
      console.warn(
        'VITE_SHEETS_ENDPOINT is not set — the application was logged instead of sent.',
        payload,
      )
      await new Promise((resolve) => setTimeout(resolve, 700))
      return
    }
    throw new Error('Ariza qabul qilish manzili sozlanmagan')
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      // text/plain keeps this a CORS "simple request". Apps Script web apps
      // do not answer the preflight that application/json would trigger.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      signal: controller.signal,
    })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const result = (await response.json().catch(() => null)) as {
      ok?: boolean
      error?: string
    } | null

    if (result && result.ok === false) {
      throw new Error(result.error ?? 'Sheet rejected the application')
    }
  } finally {
    clearTimeout(timeout)
  }
}
