import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Receipt from '../../app/start/components/Receipt';

describe('Receipt component', () => {
  const formData = {
    userName: 'John Doe',
    userEmail: 'john@example.com',
    appDescription: 'A sample app',
  };

  const handlePrevStep = jest.fn();

  test('renders Receipt component correctly', () => {
    render(
      <Receipt
        formData={formData}
        handlePrevStep={handlePrevStep}
        totalCost={totalCost}
        costPerFP={costPerFP}
        totalFunctionPoint={totalFunctionPoint}
      />
    );

    // Check if the heading is present
    const heading = screen.getByText(/Congratulations/i);
    expect(heading).toBeInTheDocument();

    // Check if the paragraph is present
    const paragraph = screen.getByText(/Your Estimation Details/i);
    expect(paragraph).toBeInTheDocument();

    // Check if the form elements are present
    const userNameLabel = screen.getByText(/Name:/i);
    expect(userNameLabel).toBeInTheDocument();

    const userEmailLabel = screen.getByText(/Email:/i);
    expect(userEmailLabel).toBeInTheDocument();

    const appDescriptionLabel = screen.getByText(/App Description:/i);
    expect(appDescriptionLabel).toBeInTheDocument();

    // Check if the values are rendered
  const totalCostText = screen.getByText(/Total Cost/);
  expect(totalCostText).toBeInTheDocument();

  const costPerFPText = screen.getByText(/Cost per Function Point/)
  expect(costPerFPText).toBeInTheDocument();

  const totalFunctionPointText = screen.getByText(/Total Function Points/);
  expect(totalFunctionPointText).toBeInTheDocument();

     // Check if clicking on the "Previous" button triggers the handlePrevStep function
     const prevButton = screen.getByText('Previous');
     fireEvent.click(prevButton);
     expect(handlePrevStep).toHaveBeenCalled();
  });
});
