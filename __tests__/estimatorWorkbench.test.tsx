import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EstimatorWorkbench from "../app/start/components/EstimatorWorkbench";

describe("EstimatorWorkbench", () => {
  it("presents transparent Function Point planning inputs and a zero-scope state", () => {
    render(<EstimatorWorkbench />);

    expect(screen.getByRole("heading", { name: /put a defensible number/i })).toBeInTheDocument();
    expect(screen.getByRole("table", { name: /function point inventory/i })).toBeInTheDocument();
    expect(screen.getByText("Central estimate:")).toHaveTextContent("£0");
    expect(screen.getByText(/0\.65 \+ 0\.01 × TDI/i)).toBeInTheDocument();
  });

  it("recalculates scope and resets the functional inventory", () => {
    render(<EstimatorWorkbench />);
    const averageInputs = screen.getByLabelText("External inputs average count") as HTMLInputElement;

    fireEvent.change(averageInputs, { target: { value: "2" } });

    expect(screen.getByText("Unadjusted size").parentElement).toHaveTextContent("8 FP");
    expect(screen.getByText("Central estimate:")).toHaveTextContent("£6,365");

    fireEvent.click(screen.getByRole("button", { name: /reset inputs/i }));

    expect(averageInputs).toHaveValue(0);
    expect(screen.getByText("Central estimate:")).toHaveTextContent("£0");
  });

  it("reveals the fourteen system characteristic controls on demand", () => {
    render(<EstimatorWorkbench />);

    fireEvent.click(screen.getByRole("button", { name: /fine-tune system characteristics/i }));

    expect(screen.getAllByRole("slider")).toHaveLength(14);
    expect(screen.getByRole("button", { name: /fine-tune system characteristics/i })).toHaveAttribute("aria-expanded", "true");
  });
});
