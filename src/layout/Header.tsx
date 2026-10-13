import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Logo } from '../components/Logo'
import { ButtonLink } from '../components/Button'
import { HEADER_CTA, NAV } from '../content/site'
import './Header.css'

export default function Header() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)
  const reduce = useReducedMotion()

  // close the mobile menu whenever the route changes
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="header">
      <div className="header__inner container">
        <Link to="/" className="header__brand" aria-label="食錢包 Foodlet 首頁">
          <Logo />
        </Link>

        <nav className="header__nav" aria-label="主選單">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end className="header__link">
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && <motion.span layoutId="nav-underline" className="header__underline" transition={{ duration: reduce ? 0 : 0.3, ease: [0.77, 0, 0.175, 1] }} />}
                </>
              )}
            </NavLink>
          ))}
          <ButtonLink to={HEADER_CTA.to} size="small" arrow className="header__cta">
            {HEADER_CTA.label}
          </ButtonLink>
        </nav>

        <button type="button" className="header__toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? '關閉選單' : '開啟選單'}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="header__sheet"
            aria-label="主選單"
            initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(-8px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0, transform: reduce ? 'none' : 'translateY(-8px)' }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end className="header__sheet-link">
                {item.label}
              </NavLink>
            ))}
            <ButtonLink to={HEADER_CTA.to} arrow>
              {HEADER_CTA.label}
            </ButtonLink>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
