# Estimation Methodology

## Purpose

Scope & Cost is a transparent early-planning tool. It produces an indicative effort and cost range, not a fixed commercial quote or a certified Function Point count.

## Calculation sequence

1. The user inventories External Inputs, External Outputs, External Inquiries, Internal Logical Files, and External Interface Files by low, average, or high complexity.
2. The calculator applies the standard IFPUG weight table to derive **Unadjusted Function Points**.
3. Fourteen general system characteristics are rated from 0 to 5. Their total degree of influence produces the visible **Value Adjustment Factor**: `0.65 + 0.01 × TDI`.
4. **Adjusted Function Points × productivity hours per FP** produces estimated delivery effort.
5. **Effort × blended hourly rate** produces base labour cost. An explicit contingency and an uncertainty range are then shown separately.

The tool intentionally keeps productivity, rate, contingency, team size, and uncertainty editable. Estimates should be calibrated against the delivery organisation’s own historical data before use in budgeting or contracting.

## Source basis

- IFPUG describes Function Points as a logical measure of software size derived from functionality requested by and delivered to the user. It identifies inputs, outputs, inquiries, internal data, and external interface data as core functional components. <https://ifpug.org/ifpug-standards/fpa>
- Carnegie Mellon Software Engineering Institute explains that credible cost estimates need a size metric, cost drivers, and an explicit mathematical relationship. It notes that uncertainty should be documented and that models should be calibrated to relevant organisational data. <https://www.sei.cmu.edu/blog/software-cost-estimation-explained/>
- COSMIC describes functional size as a basis for measuring productivity and estimating software effort, while noting that a standard method is not a substitute for context-specific calibration. <https://cosmic-sizing.org/>
