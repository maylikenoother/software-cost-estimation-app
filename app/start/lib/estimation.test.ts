import { calculateEstimate, createEmptyInventory } from "./estimation";

describe("calculateEstimate", () => {
  it("uses the standard component weights once per function type", () => {
    const inventory = createEmptyInventory();
    inventory.EI.average = 2;
    inventory.EO.high = 1;
    inventory.ILF.low = 1;
    const result = calculateEstimate({
      inventory,
      generalCharacteristics: Array(14).fill(0),
      productivityHoursPerFP: 10,
      hourlyRate: 100,
      contingencyPercent: 20,
      teamSize: 2,
      uncertaintyPercent: 25,
    });

    expect(result.unadjustedFunctionPoints).toBe(22);
    expect(result.valueAdjustmentFactor).toBe(0.65);
    expect(result.adjustedFunctionPoints).toBe(14.3);
    expect(result.deliveryHours).toBe(143);
    expect(result.totalCost).toBe(17160);
  });
});
