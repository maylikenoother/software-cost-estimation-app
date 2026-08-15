import Link from "next/link";

export default function HomePage() {
  return (
    <main className="landing-shell">
      <nav className="landing-nav"><span className="brand-mark"><b>SC</b> Scope &amp; Cost</span><Link href="/start">Open estimator →</Link></nav>
      <section className="landing-hero">
        <p className="eyebrow">Function Point planning tool</p>
        <h1>Better software conversations begin with <em>visible assumptions.</em></h1>
        <p>Turn a functional inventory into a practical effort and cost range. No black box, no pretend precision.</p>
        <Link className="landing-cta" href="/start">Build an estimate <span>→</span></Link>
      </section>
      <section className="landing-principles"><article><span>01</span><h2>Size scope</h2><p>Count functions rather than guessing from screen count alone.</p></article><article><span>02</span><h2>Show drivers</h2><p>Productivity, rate, risk, and team capacity remain editable.</p></article><article><span>03</span><h2>Keep a range</h2><p>Use uncertainty deliberately while requirements are still moving.</p></article></section>
    </main>
  );
}
