import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { Activity, ChartPie, ChevronDown, Gift, Handshake, Image as ImageIcon, Store, UserRound, Users, Wallet } from 'lucide-react'
import { Reveal } from './Reveal'
import { ButtonLink } from './Button'
import { asset } from '../lib/asset'
import { useToast } from './Toast'
import { CTA_BANNER, DEMO_TOAST } from '../content/site'
import { PARTNERS, STATS, WEB3_ARTICLES } from '../content/shared'
import './sections.css'

const ICONS = { user: UserRound, image: ImageIcon, chart: ChartPie, store: Store, handshake: Handshake, users: Users, gift: Gift, activity: Activity, wallet: Wallet }
export type IconName = keyof typeof ICONS

type Tone = 'white' | 'cream' | 'silver'

export function Section({ tone = 'white', children, className = '', id }: { tone?: Tone; children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`sec sec--${tone} ${className}`}>
      <div className="container">{children}</div>
    </section>
  )
}

export function SectionHead({ title, sub }: { title: ReactNode; sub?: ReactNode }) {
  return (
    <Reveal className="sec-head">
      <h2 className="sec-head__title">{title}</h2>
      {sub && <p className="sec-head__sub">{sub}</p>}
    </Reveal>
  )
}

/** Illustration on one side, copy on the other — the most common Figma block. */
export function Split({ media, children, reverse = false, mediaClass = '' }: { media: ReactNode; children: ReactNode; reverse?: boolean; mediaClass?: string }) {
  return (
    <div className={`split${reverse ? ' split--reverse' : ''}`}>
      <Reveal className={`split__media ${mediaClass}`}>{media}</Reveal>
      <Reveal className="split__copy" index={1}>
        {children}
      </Reveal>
    </div>
  )
}

export function Signature({ name, role }: { name: string; role: string }) {
  return (
    <p className="signature">
      <span className="signature__name">{name}</span>
      <span className="signature__role">{role}</span>
    </p>
  )
}

export function Illustration({ src, alt, width, height, float = false, className = '' }: { src: string; alt: string; width: number; height: number; float?: boolean; className?: string }) {
  return <img className={`illus${float ? ' illus--float' : ''} ${className}`} src={asset(src)} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
}

/** Pixel-art NFT shown on its dark card. */
export function NftCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="nft-card">
      <img src={asset(src)} alt={alt} width={640} height={640} loading="lazy" decoding="async" />
    </div>
  )
}

export function FeatureCards({ cards }: { cards: readonly { icon: IconName; title: string; points: readonly string[] }[] }) {
  return (
    <ul className="feature-cards">
      {cards.map((c, i) => {
        const Icon = ICONS[c.icon]
        return (
          <Reveal as="li" key={c.title} index={i} className="feature-card">
            <Icon className="feature-card__icon" size={28} strokeWidth={1.6} aria-hidden />
            <h3>{c.title}</h3>
            <ul>
              {c.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Reveal>
        )
      })}
    </ul>
  )
}

/** Count-up when the stat scrolls into view. Reduced motion shows the final value. */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400)
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, value])

  return (
    <span ref={ref} className="stat__value">
      {(reduce ? value : shown).toLocaleString('en-US')}
    </span>
  )
}

export function StatsBand() {
  return (
    <Section tone="cream" className="stats">
      <div className="stats__inner">
        <Reveal className="stats__head">
          <h2>
            {STATS.title[0]}
            <br />
            <span className="accent">{STATS.title[1]}</span>
          </h2>
          <p>{STATS.sub}</p>
        </Reveal>
        <ul className="stats__grid">
          {STATS.items.map((s, i) => {
            const Icon = ICONS[s.icon]
            return (
              <Reveal as="li" key={s.label} index={i} className="stat">
                <Icon className="stat__icon" size={32} strokeWidth={1.6} aria-hidden />
                <span>
                  <CountUp value={s.value} />
                  <span className="stat__label">{s.label}</span>
                </span>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}

export function Articles() {
  const toast = useToast()
  return (
    <Section>
      <SectionHead title={WEB3_ARTICLES.title} sub={WEB3_ARTICLES.sub} />
      <ul className="articles">
        {WEB3_ARTICLES.items.map((a, i) => (
          <Reveal as="li" key={a.quote} index={i} className="article">
            <div className="article__img">
              <img src={asset(a.img)} alt={a.alt} width={800} height={600} loading="lazy" decoding="async" />
            </div>
            <div className="article__body">
              <p>{a.quote}</p>
              <button type="button" className="article__more" onClick={() => toast(DEMO_TOAST)}>
                {WEB3_ARTICLES.more} <span aria-hidden>→</span>
              </button>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}

export function Partners() {
  return (
    <Section>
      <SectionHead title={PARTNERS.title} sub={PARTNERS.sub} />
      <Reveal>
        <ul className="partners" aria-label="合作夥伴（虛構品牌）">
          {PARTNERS.names.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <p className="partners__note">{PARTNERS.note}</p>
      </Reveal>
    </Section>
  )
}

export function CtaBanner() {
  return (
    <Section tone="silver" className="cta">
      <Reveal className="cta__inner">
        <Illustration src="img/wallet.webp" alt="" width={866} height={694} float className="cta__img" />
        <h2>{CTA_BANNER.title}</h2>
        <ButtonLink to="/join" size="normal" arrow>
          {CTA_BANNER.button}
        </ButtonLink>
      </Reveal>
    </Section>
  )
}

export function Faq({ title, groups, media }: { title: string; groups: readonly { label: string; q: string; a: string }[]; media: ReactNode }) {
  const [open, setOpen] = useState(0)
  return (
    <Split media={media}>
      <h2 className="split__title accent">❓ {title}</h2>
      <ul className="faq">
        {groups.map((g, i) => {
          const isOpen = open === i
          return (
            <li key={g.q} className={`faq__item${isOpen ? ' is-open' : ''}`}>
              <span className="faq__label">{g.label}</span>
              <button type="button" className="faq__q" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>Q: {g.q}</span>
                <ChevronDown size={18} className="faq__chev" aria-hidden />
              </button>
              <div id={`faq-${i}`} className="faq__a" role="region">
                <div>
                  <p>A: {g.a}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </Split>
  )
}

/**
 * Replaces the Lottie "chart animation": bars grow from the baseline when the
 * chart scrolls into view, then a trend line draws across. Pure SVG + CSS.
 */
export function AnimatedChart({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const bars = [38, 52, 46, 68, 60, 82, 74]
  return (
    <div ref={ref} className={`chart${inView ? ' is-in' : ''}`} role="img" aria-label={label}>
      <svg viewBox="0 0 360 260">
        <rect x="8" y="8" width="344" height="244" rx="20" fill="#fff" />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="36" x2="332" y1={60 + i * 44} y2={60 + i * 44} stroke="#f5f7fa" strokeWidth="2" />
        ))}
        {bars.map((h, i) => (
          <rect key={i} className="chart__bar" style={{ transitionDelay: `${i * 70}ms` }} x={44 + i * 41} y={224 - h * 2} width="26" height={h * 2} rx="6" fill={i === bars.length - 2 ? '#fbbc5d' : '#263238'} />
        ))}
        <polyline className="chart__line" points="57,170 98,142 139,154 180,112 221,126 262,82 303,96" fill="none" stroke="#fe7551" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
        <g className="chart__coin">
          <circle cx="300" cy="44" r="18" fill="#fbbc5d" />
          <text x="300" y="50" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff">
            $
          </text>
        </g>
      </svg>
    </div>
  )
}
