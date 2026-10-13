import { useLayoutEffect } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Header from './Header'
import Footer from './Footer'

/**
 * Page transition: purpose is "preventing a jarring change" between routes.
 * Old page fades out, new one fades/rises in — ease-out, kept short.
 */
export default function Layout() {
  const location = useLocation()
  const outlet = useOutlet()
  const reduce = useReducedMotion()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname])

  return (
    <>
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(12px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          exit={{ opacity: 0, transform: 'translateY(0px)' }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}
