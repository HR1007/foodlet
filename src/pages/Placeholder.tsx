/** Temporary page body until each page is built in its own phase. */
export default function Placeholder({ title }: { title: string }) {
  return (
    <section className="container" style={{ padding: 'var(--space-9) 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: 'var(--h2)', lineHeight: 'var(--h2-lh)' }}>{title}</h1>
      <p style={{ color: 'var(--grey)', marginTop: 'var(--space-3)' }}>此頁面建置中</p>
    </section>
  )
}
