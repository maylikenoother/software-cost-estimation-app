import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FirstScreenForm from '../../app/start/components/FirstScreenForm';

describe('FirstScreenForm component', () => {
  const formData = {
    firstScreenName: '',
    firstInputFields: '',
    firstDataComplexity: ''
  };

  const handleChangeInput = jest.fn();
  const handleNextStep = jest.fn();
  const handlePrevStep = jest.fn();

  test('renders FirstScreenForm component correctly', () => {
    render(
      <FirstScreenForm
        formData={formData}
        handleChangeInput={handleChangeInput}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
      />
    );

    // Check if a form element is present
    const formElement = screen.getByTestId('firstScreen-form');
    expect(formElement).toBeInTheDocument();

    // Check if the heading is present
    const heading = screen.getByText(/First Screen/i);
    expect(heading).toBeInTheDocument();

    // Check if the form elements are present
    const screenNameLabel = screen.getByText(/Screen Name/i);
    expect(screenNameLabel).toBeInTheDocument();
    const inputFieldsLabel = screen.getByText(/Number of Input Fields/i);
    expect(inputFieldsLabel).toBeInTheDocument();
    const dataComplexityLabel = screen.getByText(/How complex is the data processing?/i);
    expect(dataComplexityLabel).toBeInTheDocument();

    // Check if the input fields are present and have the correct initial values
    const screenName = screen.getByLabelText(/Screen Name/i) as HTMLInputElement;
    expect(screenName).toBeInTheDocument();
    expect(screenName.value).toBe(formData.firstScreenName);

    const inputFields = screen.getByLabelText(/Number of Input Fields/i) as HTMLInputElement;
    expect(inputFields).toBeInTheDocument();
    expect(inputFields.value).toBe(formData.firstInputFields);

    const dataComplexity = screen.getByLabelText(/How complex is the data processing?/i) as HTMLSelectElement;
    expect(dataComplexity).toBeInTheDocument();
    expect(dataComplexity.value).toBe(formData.firstDataComplexity);


    
    // Check if clicking on the "Previous" button triggers the handlePrevStep function
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    expect(handlePrevStep).toHaveBeenCalled();

    // Check if the "Next" button is present and initially disabled
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });
  
});
