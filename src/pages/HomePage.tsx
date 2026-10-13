import { motion, useReducedMotion } from 'motion/react'
import { Handshake, Store, UserRound } from 'lucide-react'
import { ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'
import {
  AnimatedChart,
  Articles,
  CtaBanner,
  Faq,
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
import { asset } from '../lib/asset'
import { AUDIENCE, FAQ, HERO, INTRO } from '../content/home'
import { BLOCKCHAIN_NFT, CORE, ONE_CARD, ONE_STOP, ROADMAP, TEAM_NOTE, TECH, WHY_LOVE } from '../content/shared'
import './HomePage.css'

const AUDIENCE_ICONS = { user: UserRound, store: Store, handshake: Handshake }

export default function HomePage() {
  const reduce = useReducedMotion()

  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ backgroundImage: `url(${asset('img/hero-breakfast.webp')})` }}>
        <div className="hero__inner container">
          <motion.div
            className="hero__copy"
            initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(16px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1>
              {HERO.title[0]}
              <br />
              <span className="accent">{HERO.title[1]}</span>
            </h1>
            <p>{HERO.sub}</p>
            <ButtonLink to="/join" size="normal" arrow>
              {HERO.cta}
            </ButtonLink>
          </motion.div>
          <motion.div
            className="hero__art"
            initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(24px) scale(0.96)' }}
            animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
            transition={{ type: 'spring', duration: 0.9, bounce: 0.2, delay: 0.15 }}
          >
            <Illustration src="img/wallet.webp" alt="塞滿卡片的黃色錢包、金幣與揮手的上班族插圖" width={866} height={694} float />
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <Section tone="cream">
        <Split media={<Illustration src="img/laptop-order.webp" alt="站在筆電旁、螢幕顯示點餐 App 的人物插圖" width={800} height={800} className="illus--tile" />}>
          <p className="split__lead">{INTRO.body}</p>
          <Signature name="Foodlet" role={TEAM_NOTE.bio} />
        </Split>
      </Section>

      {/* One-stop integration */}
      <Section>
        <SectionHead title={ONE_STOP.title} sub={ONE_STOP.sub} />
        <FeatureCards cards={ONE_STOP.cards} />
      </Section>

      {/* Blockchain × NFT */}
      <Section tone="cream">
        <Split media={<Illustration src="img/nft-phones.webp" alt="三支手機螢幕上分別是漢堡、披薩與雞腿的像素 NFT" width={800} height={800} className="illus--tile" />}>
          <h2 className="split__title">{BLOCKCHAIN_NFT.title}</h2>
          <p className="split__accent">{BLOCKCHAIN_NFT.accent}</p>
          <p className="split__note">{BLOCKCHAIN_NFT.note}</p>
        </Split>
      </Section>

      {/* One card */}
      <Section>
        <Split media={<Illustration src="img/kiosk.webp" alt="兩位顧客在自助點餐機前點餐的插圖" width={900} height={886} />}>
          <h2 className="split__title accent">{ONE_CARD.title}</h2>
          <p className="split__lead">{ONE_CARD.body}</p>
          <ButtonLink to="/business" arrow>
            了解更多
          </ButtonLink>
        </Split>
      </Section>

      {/* Audience */}
      <Section tone="silver">
        <SectionHead title={AUDIENCE.title} sub={AUDIENCE.sub} />
        <ul className="audience">
          {AUDIENCE.groups.map((g, i) => {
            const Icon = AUDIENCE_ICONS[g.icon]
            return (
              <Reveal as="li" key={g.title} index={i} className="audience__col">
                <span className="audience__icon">
                  <Icon size={26} strokeWidth={1.6} aria-hidden />
                </span>
                <h3>{g.title}</h3>
                <ul>
                  {g.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </ul>
      </Section>

      <StatsBand />

      {/* Why love */}
      <Section>
        <Split reverse media={<Illustration src="img/mobile-login.webp" alt="拿著手機展示安全登入畫面的人物插圖" width={744} height={972} />}>
          <h2 className="split__title accent">{WHY_LOVE.title}</h2>
          <p className="split__lead">{WHY_LOVE.body}</p>
          <ButtonLink to="/innovation" arrow>
            了解更多
          </ButtonLink>
        </Split>
      </Section>

      {/* NFT showcase — tech */}
      <Section tone="cream">
        <Split media={<NftCard src="img/nft-cookie.webp" alt="金色像素框裡的巧克力餅乾 NFT" />}>
          <h2 className="split__title accent">{TECH.title}</h2>
          <ul className="split__points">
            {TECH.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Signature name={TECH.person} role={TECH.role} />
        </Split>
      </Section>

      {/* Roadmap */}
      <Section>
        <Split reverse media={<AnimatedChart label="每週營養攝取逐步提升的長條圖與趨勢線" />}>
          <h2 className="split__title accent">{ROADMAP.title}</h2>
          <p className="split__lead">{ROADMAP.body}</p>
          <ButtonLink to="/features" arrow>
            了解更多
          </ButtonLink>
        </Split>
      </Section>

      {/* NFT showcase — core mechanism */}
      <Section tone="cream">
        <Split media={<NftCard src="img/nft-taco.webp" alt="金色像素框裡的塔可 NFT" />}>
          <h2 className="split__title accent">{CORE.title}</h2>
          {CORE.paragraphs.map((p) => (
            <p key={p.slice(0, 12)} className="split__text">
              {p}
            </p>
          ))}
          <Signature name={CORE.person} role={CORE.role} />
        </Split>
      </Section>

      <Articles />

      <Section tone="cream">
        <Faq title={FAQ.title} groups={FAQ.groups} media={<NftCard src="img/nft-donut.webp" alt="金色像素框裡的甜甜圈 NFT" />} />
      </Section>

      <Partners />
      <CtaBanner />
    </>
  )
}
