import { motion, useReducedMotion } from 'motion/react'
import { asset } from '../lib/asset'
import './motionArt.css'

/**
 * Replaces the LottieFiles "bitcoin" animation: a Foodlet token coin turning on
 * its vertical axis. Predetermined loop → CSS animation (runs off the main thread).
 */
export function TokenCoin() {
  return (
    <div className="coin-stage" role="img" aria-label="旋轉中的 Foodlet 代幣金幣">
      <div className="coin">
        <div className="coin__face coin__face--front">
          <CoinFace />
        </div>
        <div className="coin__face coin__face--back">
          <CoinFace />
        </div>
      </div>
      <div className="coin-shadow" />
    </div>
  )
}

function CoinFace() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden>
      <defs>
        <radialGradient id="coin-g" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="0.55" stopColor="#fbbc5d" />
          <stop offset="1" stopColor="#e09a2f" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="#d98b1f" />
      <circle cx="100" cy="100" r="88" fill="url(#coin-g)" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="#fff3c4" strokeWidth="5" strokeDasharray="4 9" opacity="0.8" />
      <path d="M78 58h50v16H96v18h28v16H96v34H78z" fill="#fff" />
      <path d="M78 58h50v16H96v18h28v16H96v34H78z" fill="none" stroke="#d98b1f" strokeWidth="3" />
    </svg>
  )
}

/**
 * Replaces the LottieFiles "businessman flies up" animation: the generated
 * jetpack illustration flies in once, then hovers with drifting speed lines.
 */
export function JetpackFlyer() {
  const reduce = useReducedMotion()
  return (
    <div className="flyer">
      <span className="flyer__line flyer__line--1" />
      <span className="flyer__line flyer__line--2" />
      <span className="flyer__line flyer__line--3" />
      <motion.div
        className="flyer__body"
        initial={{ opacity: 0, transform: reduce ? 'none' : 'translate(-60px, 40px)' }}
        animate={{ opacity: 1, transform: 'translate(0px, 0px)' }}
        transition={{ type: 'spring', duration: 1, bounce: 0.25 }}
      >
        <img src={asset('img/jetpack.webp')} alt="背著噴射背包、握拳向前飛行的上班族插圖" width={1100} height={784} />
      </motion.div>
    </div>
  )
}
