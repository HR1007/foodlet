import { useState, type FormEvent } from 'react'
import { Camera, Globe, MessageCircle, Play, Send } from 'lucide-react'
import { Logo } from '../components/Logo'
import { useToast } from '../components/Toast'
import { DEMO_TOAST, FOOTER } from '../content/site'
import './Footer.css'

const SOCIAL = [
  { icon: Camera, label: 'Instagram' },
  { icon: Globe, label: 'Dribbble' },
  { icon: MessageCircle, label: 'Twitter' },
  { icon: Play, label: 'YouTube' },
]

export default function Footer() {
  const toast = useToast()
  const [email, setEmail] = useState('')

  const subscribe = (e: FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return toast(FOOTER.newsletter.invalid)
    setEmail('')
    toast(FOOTER.newsletter.thanks)
  }

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <Logo tone="orange" size={56} />
          <p className="footer__copy">
            {FOOTER.copyright[0]}
            <br />
            {FOOTER.copyright[1]}
          </p>
          <ul className="footer__social" aria-label={FOOTER.social}>
            {SOCIAL.map(({ icon: Icon, label }) => (
              <li key={label}>
                <button type="button" aria-label={label} onClick={() => toast(DEMO_TOAST)}>
                  <Icon size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__cols">
          {FOOTER.columns.map((col) => (
            <div key={col.title} className="footer__col">
              <h2>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l}>
                    <button type="button" onClick={() => toast(DEMO_TOAST)}>
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <form className="footer__col footer__news" onSubmit={subscribe}>
            <h2>{FOOTER.newsletter.title}</h2>
            <label className="footer__input">
              <span className="visually-hidden">Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={FOOTER.newsletter.placeholder} />
              <button type="submit" aria-label={FOOTER.newsletter.submit}>
                <Send size={14} />
              </button>
            </label>
          </form>
        </div>
      </div>
      <p className="footer__note container">{FOOTER.demoNote}</p>
    </footer>
  )
}
