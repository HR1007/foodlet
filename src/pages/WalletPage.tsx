import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, Coins, Copy, Lock, Sparkles, Trophy, Wallet, X } from 'lucide-react'
import { Button, ButtonLink } from '../components/Button'
import { useToast } from '../components/Toast'
import { asset } from '../lib/asset'
import { clearDemo, collect, readDemo, type DemoState, type NftId } from '../lib/demo'
import { NFTS, WALLET, type NftMeta } from '../content/wallet'
import './WalletPage.css'

type Filter = 'all' | 'owned' | 'locked'
const EASE_OUT = [0.23, 1, 0.32, 1] as const

/** Fake but stable wallet address derived from the visitor's name. */
function addressFor(name: string) {
  let h = 2166136261
  for (const c of name || 'foodlet') h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  const hex = (h >>> 0).toString(16).padStart(8, '0')
  return `0xF00D…${hex.slice(0, 4)}`
}

export default function WalletPage() {
  const [state, setState] = useState<DemoState | null>(readDemo)
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<NftMeta | null>(null)
  const [justUnlocked, setJustUnlocked] = useState<NftId | null>(null)
  const toast = useToast()
  const reduce = useReducedMotion()

  if (!state || !state.collected.cookie) {
    return (
      <section className="wallet wallet--empty">
        <div className="container wallet-empty">
          <span className="wallet-empty__icon">
            <Wallet size={36} />
          </span>
          <h1>{WALLET.empty.title}</h1>
          <p>{WALLET.empty.body}</p>
          <ButtonLink to="/join" size="normal" arrow>
            {WALLET.empty.cta}
          </ButtonLink>
        </div>
      </section>
    )
  }

  const owned = NFTS.filter((n) => state.collected[n.id])
  const points = owned.reduce((sum, n) => sum + n.points, 0)
  const visible = NFTS.filter((n) => (filter === 'all' ? true : filter === 'owned' ? state.collected[n.id] : !state.collected[n.id]))
  const address = addressFor(state.name)

  const unlock = (n: NftMeta) => {
    setState({ ...collect(n.id) })
    setJustUnlocked(n.id)
    toast(WALLET.unlocked(n.name))
    window.setTimeout(() => setJustUnlocked(null), 1200)
  }

  return (
    <section className="wallet">
      <div className="container">
        <motion.header
          className="wallet-card"
          initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(16px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <div className="wallet-card__head">
            <img src={asset('img/logo.png')} alt="" width={44} height={44} />
            <div>
              <p className="wallet-card__eyebrow">{WALLET.title}</p>
              <h1>{WALLET.greeting(state.name)}</h1>
            </div>
          </div>
          <dl className="wallet-card__stats">
            <div>
              <dt>
                <Trophy size={16} /> {WALLET.stats.collected}
              </dt>
              <dd>
                {owned.length} <small>/ {NFTS.length}</small>
              </dd>
            </div>
            <div>
              <dt>
                <Coins size={16} /> {WALLET.stats.points}
              </dt>
              <dd>{points.toLocaleString('en-US')}</dd>
            </div>
            <div>
              <dt>
                <Wallet size={16} /> {WALLET.stats.address}
              </dt>
              <dd className="wallet-card__addr">
                {address}
                <button
                  type="button"
                  aria-label="複製錢包地址"
                  onClick={() => {
                    navigator.clipboard?.writeText(address).catch(() => {})
                    toast('已複製錢包地址（Demo）')
                  }}
                >
                  <Copy size={14} />
                </button>
              </dd>
            </div>
          </dl>
          <div className="wallet-progress" role="progressbar" aria-valuemin={0} aria-valuemax={NFTS.length} aria-valuenow={owned.length} aria-label={WALLET.progress(owned.length, NFTS.length)}>
            <span style={{ transform: `scaleX(${owned.length / NFTS.length})` }} />
          </div>
          <p className="wallet-card__progress-label">{WALLET.progress(owned.length, NFTS.length)}</p>
        </motion.header>

        <p className="wallet__sub">{WALLET.sub}</p>

        <div className="wallet-filters" role="tablist" aria-label="篩選收藏">
          {(Object.keys(WALLET.filters) as Filter[]).map((f) => (
            <button key={f} type="button" role="tab" aria-selected={filter === f} className={`wallet-filter${filter === f ? ' is-active' : ''}`} onClick={() => setFilter(f)}>
              {WALLET.filters[f]}
              {filter === f && <motion.span layoutId="wallet-filter-bg" className="wallet-filter__bg" transition={{ duration: reduce ? 0 : 0.25, ease: [0.77, 0, 0.175, 1] }} />}
            </button>
          ))}
        </div>

        <motion.ul layout className="nft-grid">
          <AnimatePresence initial={false}>
            {visible.map((n, i) => {
              const has = Boolean(state.collected[n.id])
              return (
                <motion.li
                  key={n.id}
                  layout
                  initial={{ opacity: 0, transform: 'scale(0.96)' }}
                  animate={{ opacity: 1, transform: 'scale(1)' }}
                  exit={{ opacity: 0, transform: 'scale(0.96)' }}
                  transition={{ duration: 0.25, ease: EASE_OUT, delay: i * 0.04 }}
                  className={`nft-tile${has ? '' : ' is-locked'}${justUnlocked === n.id ? ' is-new' : ''}`}
                >
                  <button type="button" className="nft-tile__art" onClick={() => has && setOpen(n)} disabled={!has} aria-label={has ? `查看 ${n.name}` : `${n.name}（${WALLET.locked}）`}>
                    <img src={asset(n.img)} alt="" width={640} height={640} loading="lazy" />
                    {!has && (
                      <span className="nft-tile__lock">
                        <Lock size={22} />
                      </span>
                    )}
                    {justUnlocked === n.id && !reduce && <Sparkle />}
                  </button>
                  <div className="nft-tile__body">
                    <div className="nft-tile__title">
                      <h2>{n.name}</h2>
                      <span className={`rarity rarity--${n.rarity}`}>{n.rarity}</span>
                    </div>
                    {has ? (
                      <p className="nft-tile__meta">
                        <Check size={14} /> {new Date(state.collected[n.id]!).toLocaleDateString('zh-TW')} 取得 · +{n.points} 點
                      </p>
                    ) : (
                      <>
                        <p className="nft-tile__quest">任務：{n.quest}</p>
                        <Button size="small" variant="secondary" onClick={() => unlock(n)}>
                          {WALLET.simulate}
                        </Button>
                      </>
                    )}
                  </div>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>

        <div className="wallet__foot">
          <p>{WALLET.note}</p>
          <Button
            variant="tertiary"
            size="small"
            onClick={() => {
              clearDemo()
              setState(null)
              toast(WALLET.resetDone)
            }}
          >
            {WALLET.reset}
          </Button>
        </div>
      </div>

      <AnimatePresence>{open && <NftDetail nft={open} date={state.collected[open.id]!} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}

function Sparkle() {
  return (
    <span className="nft-tile__burst" aria-hidden>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2
        return (
          <motion.span
            key={i}
            initial={{ opacity: 1, transform: 'translate(0px,0px) scale(0.6)' }}
            animate={{ opacity: 0, transform: `translate(${Math.cos(a) * 110}px, ${Math.sin(a) * 110}px) scale(1)` }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            <Sparkles size={16} />
          </motion.span>
        )
      })}
    </span>
  )
}

/** Detail sheet — a modal, so it stays centered (not trigger-anchored). */
function NftDetail({ nft, date, onClose }: { nft: NftMeta; date: string; onClose: () => void }) {
  const reduce = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCloseRef.current()
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      prev?.focus()
    }
  }, [])

  return createPortal(
    <motion.div
      className="nft-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="nft-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nft-modal-title"
        initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(12px) scale(0.97)' }}
        animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
        exit={{ opacity: 0, transform: reduce ? 'none' : 'translateY(8px) scale(0.98)' }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
      >
        <button ref={closeRef} type="button" className="nft-modal__close" onClick={onClose} aria-label={WALLET.detail.close}>
          <X size={20} />
        </button>
        <div className="nft-modal__art">
          <img src={asset(nft.img)} alt={`${nft.name} NFT`} width={640} height={640} />
        </div>
        <div className="nft-modal__info">
          <span className={`rarity rarity--${nft.rarity}`}>{nft.rarity}</span>
          <h2 id="nft-modal-title">{nft.name}</h2>
          <h3>{WALLET.detail.perks}</h3>
          <ul className="nft-modal__perks">
            {nft.perks.map((p) => (
              <li key={p}>
                <Check size={14} /> {p}
              </li>
            ))}
          </ul>
          <h3>{WALLET.detail.chain}</h3>
          <dl className="nft-modal__chain">
            <div>
              <dt>{WALLET.detail.token}</dt>
              <dd>{nft.token}</dd>
            </div>
            <div>
              <dt>{WALLET.detail.date}</dt>
              <dd>{new Date(date).toLocaleString('zh-TW', { dateStyle: 'medium', timeStyle: 'short' })}</dd>
            </div>
            <div>
              <dt>{WALLET.detail.rarity}</dt>
              <dd>{nft.rarity}</dd>
            </div>
          </dl>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
