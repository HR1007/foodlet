/** Demo-only persistence for the sign-up flow and the wallet. Nothing leaves the browser. */
const KEY = 'foodlet-demo'

export type NftId = 'cookie' | 'taco' | 'donut' | 'burger'

export type DemoState = {
  name: string
  /** NFT id → ISO date it was collected */
  collected: Partial<Record<NftId, string>>
}

/** v1 stored `{ name, claimed }` — upgrade it in place. */
type Legacy = { name: string; claimed?: boolean }

export function readDemo(): DemoState | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as DemoState & Legacy
    if (data.collected) return data
    return { name: data.name, collected: data.claimed ? { cookie: new Date().toISOString() } : {} }
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

export function collect(id: NftId) {
  const s = readDemo() ?? { name: '', collected: {} }
  if (!s.collected[id]) s.collected[id] = new Date().toISOString()
  writeDemo(s)
  return s
}
