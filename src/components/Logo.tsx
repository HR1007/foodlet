import { asset } from '../lib/asset'

/** Foodlet mark — the Logo frame exported from Figma (transparent PNG). */
export function LogoMark({ size = 48 }: { size?: number }) {
  return <img className="logo__mark" src={asset('img/logo.png')} alt="" width={size} height={size} />
}

export function Logo({ tone = 'dark', size = 48 }: { tone?: 'dark' | 'orange'; size?: number }) {
  return (
    <span className={`logo logo--${tone}`}>
      <LogoMark size={size} />
      <span className="logo__word">食錢包 Foodlet</span>
    </span>
  )
}
