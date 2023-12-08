import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SecondScreenForm from '../../app/start/components/SecondScreenForm';

describe('SecondScreenForm component', () => {
  const formData = {
    secondScreenName: '',
    secondInputFields: '',
    secondDataComplexity: ''
  };

  const handleChangeInput = jest.fn();
  const handlePrevStep = jest.fn();
  const handleNextStep = jest.fn();
  const handleSubmitFormData = jest.fn();

  test('renders SecondScreenForm component correctly', () => {
    render(
      <SecondScreenForm
        formData={formData}
        handleChangeInput={handleChangeInput}
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handleSubmitFormData={handleSubmitFormData}
      />
    );

    // Check if a form element is present
    const formElement = screen.getByTestId('secondScreen-form');
    expect(formElement).toBeInTheDocument();

    // Check if the heading is present
    const heading = screen.getByText(/Second Screen Details/i);
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
    expect(screenName.value).toBe(formData.secondScreenName);

    const inputFields = screen.getByLabelText(/Number of Input Fields/i) as HTMLInputElement;
    expect(inputFields).toBeInTheDocument();
    expect(inputFields.value).toBe(formData.secondInputFields);

    const dataComplexity = screen.getByLabelText(/How complex is the data processing?/i) as HTMLSelectElement;
    expect(dataComplexity).toBeInTheDocument();
    expect(dataComplexity.value).toBe(formData.secondDataComplexity);

    // Check if clicking on the "Previous" button triggers the handlePrevStep function
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    expect(handlePrevStep).toHaveBeenCalled();

 
  });
});
