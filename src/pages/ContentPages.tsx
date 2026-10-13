import { motion, useReducedMotion } from 'motion/react'
import { ChartPie, FileCheck, HandCoins, Vote } from 'lucide-react'
import type { ReactNode } from 'react'
import { ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { JetpackFlyer, TokenCoin } from '../components/motionArt'
import {
  AnimatedChart,
  Articles,
  CtaBanner,
  FeatureCards,
  Illustration,
  NftCard,
  Partners,
  Section,
  SectionHead,
  Signature,
  Split,
  StatsBand,
} from '../components/sections'
import { BLOCKCHAIN_NFT, ONE_CARD, ONE_STOP, ROADMAP, TEAM_NOTE, TECH, WHY_LOVE } from '../content/shared'
import { BUSINESS, FEATURES, INNOVATION } from '../content/pages'
import './ContentPages.css'

/** Page hero used by 功能介紹 and 創新模式: animated art + headline block. */
function PageHero({ art, accent, title, body, tone }: { art: ReactNode; accent: string; title: string; body: readonly string[]; tone: 'silver' | 'cream' }) {
  const reduce = useReducedMotion()
  return (
    <section className={`page-hero sec--${tone}`}>
      <div className="container page-hero__inner">
        <div className="page-hero__art">{art}</div>
        <motion.div
          className="page-hero__copy"
          initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(16px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
        >
          <p className="page-hero__accent">{accent}</p>
          <h1>{title}</h1>
          {body.map((p) => (
            <p key={p.slice(0, 12)} className="page-hero__body">
              {p}
            </p>
          ))}
          <Signature name={TEAM_NOTE.name} role={TEAM_NOTE.bio} />
        </motion.div>
      </div>
    </section>
  )
}

export function FeaturesPage() {
  return (
    <>
      <PageHero tone="silver" art={<AnimatedChart label="一週營養攝取的長條圖逐步升高，趨勢線往上" />} {...FEATURES.hero} />
      <Section>
        <SectionHead title={ONE_STOP.title} sub={ONE_STOP.sub} />
        <FeatureCards cards={ONE_STOP.cards} />
      </Section>
      <Section tone="cream">
        <Split media={<Illustration src="img/nft-phones.webp" alt="三支手機螢幕上分別是漢堡、披薩與雞腿的像素 NFT" width={800} height={800} className="illus--tile" />}>
          <h2 className="split__title">{BLOCKCHAIN_NFT.title}</h2>
          <p className="split__accent">{BLOCKCHAIN_NFT.accent}</p>
          <p className="split__note">{BLOCKCHAIN_NFT.note}</p>
        </Split>
      </Section>
      <Articles />
      <CtaBanner />
    </>
  )
}

export function InnovationPage() {
  return (
    <>
      <PageHero tone="cream" art={<TokenCoin />} {...INNOVATION.hero} />
      <Section>
        <Split reverse media={<Illustration src="img/mobile-login.webp" alt="拿著手機展示安全登入畫面的人物插圖" width={744} height={972} />}>
          <h2 className="split__title accent">{WHY_LOVE.title}</h2>
          <p className="split__lead">{WHY_LOVE.body}</p>
        </Split>
      </Section>
      <Section tone="cream">
        <Split media={<NftCard src="img/nft-burger.webp" alt="金色像素框裡的漢堡 NFT" />}>
          <h2 className="split__title accent">{TECH.title}</h2>
          <ul className="split__points">
            {TECH.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Signature name={INNOVATION.techRole.person} role={INNOVATION.techRole.role} />
        </Split>
      </Section>
      <Section>
        <Split reverse media={<Illustration src="img/laptop-order.webp" alt="站在筆電旁、螢幕顯示點餐 App 的人物插圖" width={800} height={800} className="illus--tile" />}>
          <h2 className="split__title accent">{ROADMAP.title}</h2>
          <p className="split__lead">{ROADMAP.body}</p>
          <ButtonLink to="/business" arrow>
            看商業模式
          </ButtonLink>
        </Split>
      </Section>
      <CtaBanner />
    </>
  )
}

const BIZ_ICONS = { split: ChartPie, proof: FileCheck, share: HandCoins, vote: Vote }

export function BusinessPage() {
  return (
    <>
      <section className="biz-hero">
        <div className="container">
          <JetpackFlyer />
          <ul className="biz-cards">
            {BUSINESS.cards.map((c, i) => {
              const Icon = BIZ_ICONS[c.icon]
              return (
                <Reveal as="li" key={c.title} index={i} className="biz-card">
                  <Icon size={26} strokeWidth={1.6} className="biz-card__icon" aria-hidden />
                  <h2>{c.title}</h2>
                  <p>{c.body}</p>
                </Reveal>
              )
            })}
          </ul>
          <Reveal className="biz-hero__statement">
            <p>{BUSINESS.statement}</p>
            <Signature name={TEAM_NOTE.name} role={TEAM_NOTE.bio} />
          </Reveal>
        </div>
      </section>
      <Section>
        <Split media={<Illustration src="img/kiosk.webp" alt="兩位顧客在自助點餐機前點餐的插圖" width={900} height={886} />}>
          <h2 className="split__title accent">{ONE_CARD.title}</h2>
          <p className="split__lead">{ONE_CARD.body}</p>
        </Split>
      </Section>
      <StatsBand />
      <Partners />
      <CtaBanner />
    </>
  )
}
