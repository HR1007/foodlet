import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import './Button.css'

type Variant = 'primary' | 'secondary' | 'tertiary'
type Size = 'normal' | 'medium' | 'small'

type Common = {
  variant?: Variant
  size?: Size
  arrow?: boolean
  loading?: boolean
  children: ReactNode
}

const cls = (variant: Variant, size: Size, loading?: boolean, extra?: string) =>
  ['btn', `btn--${variant}`, `btn--${size}`, loading && 'is-loading', extra].filter(Boolean).join(' ')

function Inner({ arrow, loading, children }: Pick<Common, 'arrow' | 'loading' | 'children'>) {
  return (
    <>
      <span>{children}</span>
      {loading ? <LoaderCircle className="btn__spin" size={16} aria-hidden /> : arrow && <ArrowRight className="btn__arrow" size={16} aria-hidden />}
    </>
  )
}

/** Button from the Figma Buttons frame: Primary / Secondary / Tertiary × Normal / Medium / Small. */
export function Button({ variant = 'primary', size = 'medium', arrow, loading, children, className, disabled, ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cls(variant, size, loading, className)} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      <Inner arrow={arrow} loading={loading}>
        {children}
      </Inner>
    </button>
  )
}

export function ButtonLink({ variant = 'primary', size = 'medium', arrow, children, className, ...rest }: Omit<Common, 'loading'> & LinkProps) {
  return (
    <Link className={cls(variant, size, false, className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  )
}
