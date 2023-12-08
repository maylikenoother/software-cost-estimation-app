import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EstimateScreen from '../../app/start/components/EstimateScreen';

describe('EstimateScreen component', () => {
  const formData = {
    userName: '',
    userEmail: '',
    appDescription: '',
  };

  const handleChangeInput = jest.fn();
  const handlePrevStep = jest.fn();
  const handleSubmitFormData = jest.fn();
  const handleCostPerFPChange = jest.fn();
  const saveData = jest.fn();

  const totalCost = 1000; 
  const costPerFP = 1; 

  test('renders EstimateScreen component correctly', () => {
    render(
      <EstimateScreen
        formData={formData}
        handleChangeInput={handleChangeInput}
        handlePrevStep={handlePrevStep}
        handleSubmitFormData={handleSubmitFormData}
        totalCost={totalCost}
        handleCostPerFPChange={handleCostPerFPChange}
        costPerFP={costPerFP}
        saveData={saveData}
      />
    );

    // Check if the heading is present
    const heading = screen.getByText(/Estimation/i);
    expect(heading).toBeInTheDocument();

    // Check if the total cost is displayed
    const totalCostText = screen.getByText(`Estimated Cost: ${totalCost}`);
    expect(totalCostText).toBeInTheDocument();

    // Check if the form elements are present
    const userNameLabel = screen.getByText(/Your Name/i);
    expect(userNameLabel).toBeInTheDocument();
    const userEmailLabel = screen.getByText(/Your Email/i);
    expect(userEmailLabel).toBeInTheDocument();
    const appDescriptionLabel = screen.getByText(/App Description/i);
    expect(appDescriptionLabel).toBeInTheDocument();

    // Check if the input fields are present and have the correct initial values
    const userNameInput = screen.getByLabelText(/Your Name/i) as HTMLInputElement;
    expect(userNameInput).toBeInTheDocument();
    expect(userNameInput.value).toBe(formData.userName);

    const userEmailInput = screen.getByLabelText(/Your Email/i) as HTMLInputElement;
    expect(userEmailInput).toBeInTheDocument();
    expect(userEmailInput.value).toBe(formData.userEmail);

    const appDescriptionInput = screen.getByLabelText(/App Description/i) as HTMLTextAreaElement;
    expect(appDescriptionInput).toBeInTheDocument();
    expect(appDescriptionInput.value).toBe(formData.appDescription);
    
     // Check if clicking on the "Previous" button triggers the handlePrevStep function
     const prevButton = screen.getByText('Previous');
     fireEvent.click(prevButton);
     expect(handlePrevStep).toHaveBeenCalled();

  });
});
