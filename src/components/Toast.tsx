import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import './Toast.css'

const ToastContext = createContext<(message: string) => void>(() => {})

/** Small status toast — used for links that have no destination in the demo. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  const show = useCallback((text: string) => {
    window.clearTimeout(timer.current)
    setMessage(text)
    timer.current = window.setTimeout(() => setMessage(null), 2200)
  }, [])

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="toast-region" role="status" aria-live="polite">
        <AnimatePresence>
          {message && (
            <motion.div
              key={message}
              className="toast"
              initial={{ opacity: 0, transform: 'translateY(-100%)' }}
              animate={{ opacity: 1, transform: 'translateY(0%)' }}
              exit={{ opacity: 0, transform: 'translateY(-100%)' }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
