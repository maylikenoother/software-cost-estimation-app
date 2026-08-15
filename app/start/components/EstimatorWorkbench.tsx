"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  COMPLEXITIES,
  FUNCTION_LABELS,
  FUNCTION_TYPES,
  GENERAL_SYSTEM_CHARACTERISTICS,
  calculateEstimate,
  createEmptyInventory,
  type Complexity,
  type FunctionType,
  type FunctionalInventory,
} from "../lib/estimation";

const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const decimal = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 1 });

const NumberInput = ({ value, min = 0, max, step = 1, onChange, label, help }: {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  label: string;
  help?: string;
  onChange: (value: number) => void;
}) => (
  <label className="field">
    <span>{label}</span>
    <input
      aria-label={label}
      type="number"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
    />
    {help ? <small>{help}</small> : null}
  </label>
);

export default function EstimatorWorkbench() {
  const [inventory, setInventory] = useState<FunctionalInventory>(createEmptyInventory);
  const [generalCharacteristics, setGeneralCharacteristics] = useState<number[]>(() => Array(14).fill(0));
  const [productivityHoursPerFP, setProductivityHoursPerFP] = useState(12);
  const [hourlyRate, setHourlyRate] = useState(85);
  const [contingencyPercent, setContingencyPercent] = useState(20);
  const [teamSize, setTeamSize] = useState(2);
  const [uncertaintyPercent, setUncertaintyPercent] = useState(25);
  const [showAdjustment, setShowAdjustment] = useState(false);

  const breakdown = useMemo(
    () => calculateEstimate({ inventory, generalCharacteristics, productivityHoursPerFP, hourlyRate, contingencyPercent, teamSize, uncertaintyPercent }),
    [inventory, generalCharacteristics, productivityHoursPerFP, hourlyRate, contingencyPercent, teamSize, uncertaintyPercent],
  );

  const updateInventory = (type: FunctionType, complexity: Complexity, value: number) => {
    setInventory((current) => ({ ...current, [type]: { ...current[type], [complexity]: Math.max(0, value) } }));
  };

  const updateCharacteristic = (index: number, value: number) => {
    setGeneralCharacteristics((current) => current.map((rating, ratingIndex) => ratingIndex === index ? Math.min(5, Math.max(0, value)) : rating));
  };

  const resetEstimator = () => {
    setInventory(createEmptyInventory());
    setGeneralCharacteristics(Array(14).fill(0));
    setProductivityHoursPerFP(12);
    setHourlyRate(85);
    setContingencyPercent(20);
    setTeamSize(2);
    setUncertaintyPercent(25);
  };

  return (
    <main className="estimator-shell">
      <header className="estimator-nav">
        <Link href="/" className="brand-mark"><span>SC</span> Scope &amp; Cost</Link>
        <div className="nav-actions">
          <Link href="#method">How it works</Link>
          <button type="button" className="text-button" onClick={resetEstimator}>Reset inputs</button>
        </div>
      </header>

      <section className="estimator-intro">
        <div>
          <p className="eyebrow">Transparent planning estimate</p>
          <h1>Put a defensible number<br /><em>behind the first conversation.</em></h1>
          <p className="lede">Size the functional scope, make your delivery assumptions visible, and leave with an effort range—not a mysterious single number.</p>
        </div>
        <aside className="method-note">
          <span className="note-icon">01</span>
          <p><strong>Built around function points.</strong> Count what the software must do, then turn that size into effort using your team&apos;s productivity and rate.</p>
        </aside>
      </section>

      <div className="estimator-layout">
        <section className="input-column" aria-label="Estimation inputs">
          <div className="section-heading"><span>01</span><div><p>Functional inventory</p><h2>What will the software do?</h2></div></div>
          <p className="section-copy">Enter the count for each function type at low, average, or high complexity. The model applies the standard Function Point weight for each row.</p>

          <div className="inventory-table" role="table" aria-label="Function point inventory">
            <div className="inventory-head" role="row"><span>Component</span>{COMPLEXITIES.map((complexity) => <span key={complexity}>{complexity}</span>)}</div>
            {FUNCTION_TYPES.map((type) => (
              <div className="inventory-row" key={type} role="row">
                <div><strong>{type}</strong><span>{FUNCTION_LABELS[type].name}</span><small>{FUNCTION_LABELS[type].description}</small></div>
                {COMPLEXITIES.map((complexity) => (
                  <input key={complexity} aria-label={`${FUNCTION_LABELS[type].name} ${complexity} count`} type="number" min="0" step="1" value={inventory[type][complexity]} onChange={(event) => updateInventory(type, complexity, Number(event.target.value))} />
                ))}
              </div>
            ))}
          </div>

          <div className="section-heading compact"><span>02</span><div><p>Commercial assumptions</p><h2>Make the cost drivers explicit.</h2></div></div>
          <div className="assumption-grid">
            <NumberInput label="Hours per function point" value={productivityHoursPerFP} min={1} max={80} onChange={setProductivityHoursPerFP} help="Use your team’s benchmark where available." />
            <NumberInput label="Blended hourly rate (£)" value={hourlyRate} min={1} max={2000} onChange={setHourlyRate} help="Include the roles needed to deliver the work." />
            <NumberInput label="Contingency (%)" value={contingencyPercent} min={0} max={100} onChange={setContingencyPercent} help="Risk allowance applied after base labour cost." />
            <NumberInput label="Delivery team size" value={teamSize} min={1} max={50} onChange={setTeamSize} help="Used only for indicative calendar duration." />
            <NumberInput label="Estimate range (±%)" value={uncertaintyPercent} min={0} max={100} onChange={setUncertaintyPercent} help="Wider ranges are more honest early in discovery." />
          </div>

          <button type="button" className="adjustment-toggle" aria-expanded={showAdjustment} onClick={() => setShowAdjustment((open) => !open)}>
            <span>03</span><strong>Fine-tune system characteristics</strong><i>{showAdjustment ? "−" : "+"}</i>
          </button>
          {showAdjustment ? (
            <div className="characteristics-card">
              <p>Rate each characteristic from 0 (not relevant) to 5 (strong influence). Together, they produce the visible Value Adjustment Factor.</p>
              <div className="characteristics-grid">
                {GENERAL_SYSTEM_CHARACTERISTICS.map((label, index) => (
                  <label key={label} className="slider-field"><span>{label}</span><div><input type="range" min="0" max="5" step="1" value={generalCharacteristics[index]} onChange={(event) => updateCharacteristic(index, Number(event.target.value))} /><b>{generalCharacteristics[index]}</b></div></label>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <aside className="estimate-panel" aria-live="polite">
          <p className="eyebrow">Current planning range</p>
          <div className="range"><span>{money.format(breakdown.lowRange)}</span><i>to</i><strong>{money.format(breakdown.highRange)}</strong></div>
          <p className="range-caption">Central estimate: <b>{money.format(breakdown.totalCost)}</b></p>
          <div className="primary-metric"><span>Adjusted function points</span><strong>{decimal.format(breakdown.adjustedFunctionPoints)}</strong><small>Functional size after system adjustment</small></div>
          <dl className="estimate-metrics">
            <div><dt>Unadjusted size</dt><dd>{decimal.format(breakdown.unadjustedFunctionPoints)} FP</dd></div>
            <div><dt>Value adjustment factor</dt><dd>{breakdown.valueAdjustmentFactor.toFixed(2)}</dd></div>
            <div><dt>Delivery effort</dt><dd>{decimal.format(breakdown.deliveryHours)} hours</dd></div>
            <div><dt>Indicative duration</dt><dd>{decimal.format(breakdown.indicativeWeeks)} weeks</dd></div>
            <div><dt>Base labour cost</dt><dd>{money.format(breakdown.baseLabourCost)}</dd></div>
            <div><dt>Contingency</dt><dd>{money.format(breakdown.contingencyCost)}</dd></div>
          </dl>
          <div id="method" className="method-card"><strong>How this is calculated</strong><p>Unadjusted Function Points are the weighted sum of inputs, outputs, inquiries, internal files, and external interfaces. The 14 system ratings produce a Value Adjustment Factor of <b>0.65 + 0.01 × TDI</b>. Adjusted FP × hours per FP × rate gives base labour cost; contingency and an uncertainty band are shown separately.</p></div>
          <p className="disclaimer">For planning and comparison only. Calibrate the productivity, rate, and risk assumptions against your own delivery history before treating this as a commercial quote.</p>
        </aside>
      </div>
    </main>
  );
}
