/**
 * Estimating model: IFPUG-style functional size inventory + planning assumptions.
 * This is a transparent planning aid, not a fixed-price quote or a certified FP count.
 */
export const FUNCTION_TYPES = ["EI", "EO", "EQ", "ILF", "EIF"] as const;
export const COMPLEXITIES = ["low", "average", "high"] as const;

export type FunctionType = (typeof FUNCTION_TYPES)[number];
export type Complexity = (typeof COMPLEXITIES)[number];
export type FunctionalInventory = Record<FunctionType, Record<Complexity, number>>;

export const FUNCTION_LABELS: Record<FunctionType, { name: string; description: string }> = {
  EI: { name: "External inputs", description: "User or system data entering the application" },
  EO: { name: "External outputs", description: "Reports, exports, notifications, or calculated outputs" },
  EQ: { name: "External inquiries", description: "Read-only searches or lookups with immediate responses" },
  ILF: { name: "Internal logical files", description: "Logical data groups maintained by this application" },
  EIF: { name: "External interface files", description: "Logical data groups used but maintained elsewhere" },
};

// Standard IFPUG weight table for the five functional component types.
export const IFPUG_WEIGHTS: Record<FunctionType, Record<Complexity, number>> = {
  EI: { low: 3, average: 4, high: 6 },
  EO: { low: 4, average: 5, high: 7 },
  EQ: { low: 3, average: 4, high: 6 },
  ILF: { low: 7, average: 10, high: 15 },
  EIF: { low: 5, average: 7, high: 10 },
};

export const GENERAL_SYSTEM_CHARACTERISTICS = [
  "Data communications",
  "Distributed processing",
  "Performance objectives",
  "Heavily used configuration",
  "Transaction rate",
  "Online data entry",
  "End-user efficiency",
  "Online update",
  "Complex processing",
  "Reusability",
  "Installation ease",
  "Operational ease",
  "Multiple sites",
  "Facilitate change",
] as const;

export type EstimateInput = {
  inventory: FunctionalInventory;
  generalCharacteristics: number[];
  productivityHoursPerFP: number;
  hourlyRate: number;
  contingencyPercent: number;
  teamSize: number;
  uncertaintyPercent: number;
};

export type EstimateBreakdown = {
  unadjustedFunctionPoints: number;
  totalDegreeOfInfluence: number;
  valueAdjustmentFactor: number;
  adjustedFunctionPoints: number;
  deliveryHours: number;
  baseLabourCost: number;
  contingencyCost: number;
  totalCost: number;
  lowRange: number;
  highRange: number;
  indicativeWeeks: number;
};

const nonNegative = (value: number) => (Number.isFinite(value) && value > 0 ? value : 0);
const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum);

export const createEmptyInventory = (): FunctionalInventory =>
  FUNCTION_TYPES.reduce((inventory, type) => {
    inventory[type] = { low: 0, average: 0, high: 0 };
    return inventory;
  }, {} as FunctionalInventory);

export const calculateEstimate = (input: EstimateInput): EstimateBreakdown => {
  const unadjustedFunctionPoints = FUNCTION_TYPES.reduce((total, type) => {
    const componentPoints = COMPLEXITIES.reduce(
      (sum, complexity) => sum + nonNegative(input.inventory[type][complexity]) * IFPUG_WEIGHTS[type][complexity],
      0,
    );
    return total + componentPoints;
  }, 0);

  const totalDegreeOfInfluence = input.generalCharacteristics.reduce(
    (total, rating) => total + clamp(Math.round(nonNegative(rating)), 0, 5),
    0,
  );
  const valueAdjustmentFactor = 0.65 + totalDegreeOfInfluence * 0.01;
  const adjustedFunctionPoints = unadjustedFunctionPoints * valueAdjustmentFactor;
  const deliveryHours = adjustedFunctionPoints * nonNegative(input.productivityHoursPerFP);
  const baseLabourCost = deliveryHours * nonNegative(input.hourlyRate);
  const contingencyCost = baseLabourCost * clamp(input.contingencyPercent, 0, 100) / 100;
  const totalCost = baseLabourCost + contingencyCost;
  const uncertainty = clamp(input.uncertaintyPercent, 0, 100) / 100;
  const teamCapacityHoursPerWeek = Math.max(1, nonNegative(input.teamSize)) * 32;

  return {
    unadjustedFunctionPoints,
    totalDegreeOfInfluence,
    valueAdjustmentFactor,
    adjustedFunctionPoints,
    deliveryHours,
    baseLabourCost,
    contingencyCost,
    totalCost,
    lowRange: totalCost * (1 - uncertainty),
    highRange: totalCost * (1 + uncertainty),
    indicativeWeeks: deliveryHours / teamCapacityHoursPerWeek,
  };
};
