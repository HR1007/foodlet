import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type Props = {
  children: ReactNode
  /** order within a group — each step adds a 60ms stagger */
  index?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
}

/**
 * Scroll reveal for the long landing pages (marketing → "explanation").
 * Fades and rises 24px once, when the block first enters the viewport.
 * Reduced motion keeps the fade and drops the movement.
 */
export function Reveal({ children, index = 0, className, as = 'div' }: Props) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(24px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: index * 0.06 }}
    >
      {children}
    </Tag>
  )
}
