import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeightQuestions from '../../app/start/components/WeightQuestions';

describe('WeightQuestions component', () => {
  const formData = {
    backupRecovery: '',
    dataCommunication: '',
    distributedProcessing: '',
    performance: '',
    operationalEnvironment: '',
    dataEntry: '',
    multipleScreenEntry: '',
    masterFiles: '',
    complexFiles: '',
    internalProcessing: '',
    reusableCode: '',
    conversion: '',
    multipleInstallation: '',
    easyUse: '',
  };

  const handleChangeInput = jest.fn();
  const handlePrevStep = jest.fn();
  const handleNextStep = jest.fn();

  test('renders WeightQuestions component correctly', () => {
    render(
      <WeightQuestions
        formData={formData}
        handleChangeInput={handleChangeInput}
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
      />
    );

    // Check if the main heading is present
    const paragraph = screen.getByText(/Please rate the following questions on a scale where 0 means irrelevant and 5 means very important./i);
    expect(paragraph).toBeInTheDocument();

   // Check if a form element is present
   const formElement = screen.getByTestId('weightQuestions-form');
   expect(formElement).toBeInTheDocument();

    // Check if the radio buttons are present
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(14 * 6); // 14 questions with 6 options each

    // Check if the "Previous" button is present
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeInTheDocument();

    // Check if the "Next" button is present and initially disabled
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();

    // Check if clicking on the "Previous" button triggers the handlePrevStep function
    fireEvent.click(prevButton);
    expect(handlePrevStep).toHaveBeenCalled();
  });
});
