/** Demo-only persistence for the sign-up flow. Nothing leaves the browser. */
const KEY = 'foodlet-demo'

export type DemoState = { name: string; claimed: boolean }

export function readDemo(): DemoState | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as DemoState) : null
  } catch {
    return null
  }
}

export function writeDemo(state: DemoState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // storage unavailable (private mode) — the flow still works for this visit
  }
}

export function clearDemo() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}
