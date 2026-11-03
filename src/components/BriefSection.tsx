import { BookOpen, Camera, FileOutput, Search, Wrench } from 'lucide-react'
import { RUBRIC } from '../data'

export function BriefSection() {
  return <section id="brief" className="work-section brief-section" aria-labelledby="brief-title">
    <div className="section-topline"><span>Assignment brief</span><span>Individual audit · suggested effort 8–12 hours</span></div>
    <h2 id="brief-title">Read the platform like a UX evaluator.</h2>
    <p className="section-intro">Select one contemporary platform and evaluate a bounded set of realistic tasks. You will first recognize successful heuristic deployment, then diagnose defects and propose plausible alternatives. A screenshot is evidence—not an explanation.</p>
    <div className="brief-flow">
      <div><Search size={21} /><span>01</span><h3>Scope</h3><p>Choose one platform and two or three core task flows. Record its URL, device, and audit date.</p></div>
      <div><Camera size={21} /><span>02</span><h3>Recognize</h3><p>Document three distinct strengths for every heuristic: 30 examples with screenshots and reasoning.</p></div>
      <div><Wrench size={21} /><span>03</span><h3>Diagnose & redesign</h3><p>Analyze five defects, map each to one or more heuristics, rate severity, and show a better alternative.</p></div>
      <div><FileOutput size={21} /><span>04</span><h3>Synthesize & export</h3><p>Identify patterns and priorities, reflect on the method, then export the complete submission package.</p></div>
    </div>
    <div className="brief-columns">
      <div>
        <h3>Eligible platforms</h3>
        <p>Government service · e-commerce platform · university website · food delivery platform · social media platform.</p>
        <h3>Evidence rules</h3>
        <ul className="check-list">
          <li>Use one selected platform throughout the audit.</li>
          <li>Make each example meaningfully different; do not reuse one screen or feature merely to fill a quota.</li>
          <li>Crop screenshots with marquee or freehand selection so the relevant detail is readable.</li>
          <li>Record what is observed separately from why it demonstrates or violates the heuristic.</li>
          <li>Use the contemporary AI lens only where such a feature exists; otherwise audit the canonical rule.</li>
          <li>Every defect needs a primary heuristic, optional secondary mappings, severity, user impact, and a visual alternative.</li>
        </ul>
      </div>
      <div>
        <h3>Quality expectations</h3>
        <p>Make claims that the image and task context can support. A strong entry identifies the design mechanism, links it explicitly to the heuristic, and explains the consequence for the user.</p>
        <h3>Defect severity</h3>
        <p><strong>0</strong> no problem · <strong>1</strong> cosmetic · <strong>2</strong> minor · <strong>3</strong> major · <strong>4</strong> catastrophic. Justify ratings using frequency, persistence, and impact.</p>
        <h3>Ethics, privacy & access</h3>
        <p>Do not include passwords, private messages, payment details, or other people’s personal data. Use test accounts and non-destructive tasks where possible. Do not fabricate platform behavior or examples.</p>
      </div>
    </div>
    <details className="rubric-details">
      <summary><BookOpen size={18} /> View the 100-point grading rubric</summary>
      <div className="table-scroll"><table><thead><tr><th>Criterion</th><th>What earns full credit</th><th>Points</th></tr></thead><tbody>{RUBRIC.map(item => <tr key={item.criterion}><td>{item.criterion}</td><td>{item.description}</td><td>{item.points}</td></tr>)}</tbody></table></div>
    </details>
  </section>
}
