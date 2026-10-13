import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, Eye, EyeOff, Sparkles } from 'lucide-react'
import { Button, ButtonLink } from '../components/Button'
import { LogoMark } from '../components/Logo'
import { useToast } from '../components/Toast'
import { asset } from '../lib/asset'
import { clearDemo, collect, readDemo, writeDemo } from '../lib/demo'
import { FIRST_NFT, LOADING, SIGNUP } from '../content/join'
import './JoinPage.css'

type Step = 'form' | 'loading' | 'nft'
type Claim = 'ready' | 'claiming' | 'claimed'
type Field = keyof typeof SIGNUP.fields

const EASE_OUT = [0.23, 1, 0.32, 1] as const
const LOADING_MS = 1800
const CLAIM_MS = 1400

const VALIDATORS: Record<Field, (v: string) => boolean> = {
  name: (v) => v.trim().length > 0,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  phone: (v) => /^09\d{8}$/.test(v.replace(/[\s-]/g, '')),
  password: (v) => v.length >= 8,
}

export default function JoinPage() {
  const saved = readDemo()
  const [step, setStep] = useState<Step>(saved ? 'nft' : 'form')
  const [claim, setClaim] = useState<Claim>(saved?.collected.cookie ? 'claimed' : 'ready')
  const [name, setName] = useState(saved?.name ?? '')
  const reduce = useReducedMotion()

  const restart = () => {
    clearDemo()
    setName('')
    setClaim('ready')
    setStep('form')
  }

  return (
    <section className="join" style={{ backgroundImage: `url(${asset('img/hero-breakfast.webp')})` }}>
      <div className="join__inner container">
        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(16px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              exit={{ opacity: 0, transform: reduce ? 'none' : 'translateY(-12px)' }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              <SignupForm
                onDone={(n) => {
                  setName(n)
                  writeDemo({ name: n, collected: {} })
                  setStep('loading')
                }}
              />
            </motion.div>
          )}
          {step === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <LoadingArrow onDone={() => setStep('nft')} />
            </motion.div>
          )}
          {step === 'nft' && (
            <motion.div key="nft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <FirstNft
                name={name}
                claim={claim}
                onClaim={() => {
                  setClaim('claiming')
                  window.setTimeout(() => {
                    setClaim('claimed')
                    collect('cookie')
                  }, CLAIM_MS)
                }}
                onRestart={restart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- form */

function SignupForm({ onDone }: { onDone: (name: string) => void }) {
  const [values, setValues] = useState<Record<Field, string>>({ name: '', email: '', phone: '', password: '' })
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [agree, setAgree] = useState(false)
  const [agreeError, setAgreeError] = useState(false)
  const [reveal, setReveal] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const firstRef = useRef<HTMLInputElement>(null)

  useEffect(() => firstRef.current?.focus(), [])

  const invalid = (f: Field) => touched[f] && !VALIDATORS[f](values[f])
  const allValid = (Object.keys(VALIDATORS) as Field[]).every((f) => VALIDATORS[f](values[f])) && agree

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true, password: true })
    setAgreeError(!agree)
    const firstBad = (Object.keys(VALIDATORS) as Field[]).find((f) => !VALIDATORS[f](values[f]))
    if (firstBad) {
      document.getElementById(`join-${firstBad}`)?.focus()
      return
    }
    if (!agree) return
    onDone(values.name.trim())
  }

  return (
    <form className="signup" onSubmit={submit} noValidate>
      <h1 className="signup__title">
        <LogoMark size={32} />
        {SIGNUP.title}
      </h1>

      {(Object.keys(SIGNUP.fields) as Field[]).map((f, i) => {
        const meta = SIGNUP.fields[f]
        const bad = invalid(f)
        const ok = touched[f] && !bad
        return (
          <div key={f} className="signup__field">
            <label htmlFor={`join-${f}`} className="signup__label">
              <span>{meta.label}</span>
              <span className="signup__req">{SIGNUP.required}</span>
            </label>
            <div className={`signup__box${bad ? ' is-error' : ''}${ok ? ' is-ok' : ''}`}>
              <input
                ref={i === 0 ? firstRef : undefined}
                id={`join-${f}`}
                name={f}
                type={f === 'password' ? (reveal ? 'text' : 'password') : f === 'email' ? 'email' : f === 'phone' ? 'tel' : 'text'}
                autoComplete={f === 'password' ? 'new-password' : f === 'phone' ? 'tel' : f}
                inputMode={f === 'phone' ? 'numeric' : undefined}
                placeholder={meta.placeholder}
                value={values[f]}
                onChange={(e) => setValues((v) => ({ ...v, [f]: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, [f]: true }))}
                aria-invalid={bad || undefined}
                aria-describedby={bad ? `join-${f}-err` : undefined}
              />
              {f === 'password' && (
                <button type="button" className="signup__eye" onClick={() => setReveal((r) => !r)} aria-label={reveal ? '隱藏密碼' : '顯示密碼'}>
                  {reveal ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
            </div>
            {bad && (
              <p id={`join-${f}-err`} className="signup__error" role="alert">
                {meta.error}
              </p>
            )}
          </div>
        )
      })}

      <div className="signup__agree">
        <label className="signup__check">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => {
              setAgree(e.target.checked)
              if (e.target.checked) setAgreeError(false)
            }}
          />
          <span className="signup__checkbox" aria-hidden>
            <Check size={14} strokeWidth={3} />
          </span>
          {SIGNUP.agree[0]}
        </label>
        <button type="button" className="signup__terms" onClick={() => setShowTerms((s) => !s)} aria-expanded={showTerms}>
          {SIGNUP.agree[1]}
        </button>
      </div>
      {showTerms && <p className="signup__terms-text">{SIGNUP.terms}</p>}
      {agreeError && (
        <p className="signup__error" role="alert">
          {SIGNUP.agreeError}
        </p>
      )}

      <button type="submit" className={`signup__submit${allValid ? ' is-ready' : ''}`}>
        {SIGNUP.submit}
      </button>
    </form>
  )
}

/* ---------------------------------------------------------------- loading */

/**
 * Figma Landing Page_loading shows a big yellow cursor arrow on the photo.
 * Here it taps twice (press feedback) while the wallet is "created", then moves on.
 */
function LoadingArrow({ onDone }: { onDone: () => void }) {
  const doneRef = useRef(onDone)
  useEffect(() => {
    doneRef.current = onDone
  })
  useEffect(() => {
    const t = window.setTimeout(() => doneRef.current(), LOADING_MS)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <div className="loading" role="status" aria-live="polite">
      <svg className="loading__arrow" viewBox="0 0 120 120" aria-hidden>
        <path d="M20 14 L102 52 L64 62 L50 102 Z" fill="#fbbc5d" stroke="#fff" strokeWidth="6" strokeLinejoin="round" />
      </svg>
      <span className="loading__ripple" aria-hidden />
      <p className="loading__label">{LOADING.label}</p>
    </div>
  )
}

/* ---------------------------------------------------------------- first NFT */

function FirstNft({ name, claim, onClaim, onRestart }: { name: string; claim: Claim; onClaim: () => void; onRestart: () => void }) {
  const reduce = useReducedMotion()
  const toast = useToast()
  const announced = useRef(claim === 'claimed')

  useEffect(() => {
    if (claim === 'claimed' && !announced.current) {
      announced.current = true
      toast(FIRST_NFT.toast)
    }
  }, [claim, toast])

  return (
    <div className="nft-stage">
      <motion.h1
        className="nft-stage__title"
        initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(12px)' }}
        animate={{ opacity: 1, transform: 'translateY(0px)' }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <motion.span
          className="nft-stage__emoji"
          aria-hidden
          initial={{ opacity: 0, transform: reduce ? 'none' : 'scale(0.6) rotate(-20deg)' }}
          animate={{ opacity: 1, transform: 'scale(1) rotate(0deg)' }}
          transition={{ type: 'spring', duration: 0.6, bounce: 0.5, delay: 0.25 }}
        >
          😚
        </motion.span>
        {name ? FIRST_NFT.titleNamed(name) : FIRST_NFT.title}
      </motion.h1>

      <motion.div
        className={`claim-card is-${claim}`}
        initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(24px) scale(0.96)' }}
        animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
        transition={{ type: 'spring', duration: 0.7, bounce: 0.2, delay: 0.1 }}
      >
        <div className="claim-card__art">
          <img src={asset('img/nft-cookie.webp')} alt={FIRST_NFT.nftAlt} width={640} height={640} />
          {claim === 'claimed' && !reduce && <Burst />}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {claim === 'claimed' ? (
            <motion.div
              key="claimed"
              initial={{ opacity: 0, transform: 'scale(0.9)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              transition={{ type: 'spring', duration: 0.45, bounce: 0.3 }}
            >
              <Button variant="primary" size="normal" disabled>
                <Check size={16} /> {FIRST_NFT.claimed}
              </Button>
            </motion.div>
          ) : (
            <motion.div key="claim" exit={{ opacity: 0, transform: 'scale(0.95)' }} transition={{ duration: 0.15 }}>
              <Button size="normal" loading={claim === 'claiming'} onClick={onClaim}>
                {claim === 'claiming' ? FIRST_NFT.claiming : FIRST_NFT.claim}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {claim === 'claimed' && (
          <motion.div
            className="nft-stage__next"
            initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(8px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.35 }}
          >
            <ButtonLink to="/wallet" arrow>
              {FIRST_NFT.wallet}
            </ButtonLink>
            <ButtonLink to="/" variant="secondary">
              {FIRST_NFT.home}
            </ButtonLink>
            <Button variant="tertiary" onClick={onRestart}>
              {FIRST_NFT.reset}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** One-shot celebration when the NFT lands — rare, first-time moment (delight tier). */
function Burst() {
  const sparks = Array.from({ length: 10 }, (_, i) => i)
  return (
    <div className="burst" aria-hidden>
      {sparks.map((i) => {
        const angle = (i / sparks.length) * Math.PI * 2
        const dist = 150 + (i % 3) * 22
        return (
          <motion.span
            key={i}
            className="burst__spark"
            initial={{ opacity: 1, transform: 'translate(0px, 0px) scale(0.6)' }}
            animate={{ opacity: 0, transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(1)` }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
          >
            <Sparkles size={18} />
          </motion.span>
        )
      })}
    </div>
  )
}
