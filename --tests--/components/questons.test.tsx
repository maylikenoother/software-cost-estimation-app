import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Questions from '../../app/start/components/Questions';

test('renders Questions component correctly', () => {
  const formData = {
    softwareType: '',
    noIntegrationRequired: '',
    screens: ''
  };

  render(<Questions formData={formData} handleChangeInput={jest.fn()} />);

  // Check if a form element is present
  const formElement = screen.getByTestId('questions-form');
  expect(formElement).toBeInTheDocument();

  // Check if the main heading is present
  const mainHeading = screen.getByText(/Software Cost Estimation/i);
  expect(mainHeading).toBeInTheDocument();

  // Check if the form elements are present
  const softwareTypeLabel = screen.getByText(/What type of software are you developing?/i);
  expect(softwareTypeLabel).toBeInTheDocument();
  const externalSystemsLabel = screen.getByText(/How many external systems will the software have?/i);
  expect(externalSystemsLabel).toBeInTheDocument();
  const screensLabel = screen.getByText(/How many screens will the software have?/i);
  expect(screensLabel).toBeInTheDocument();

  // Check if the "Next" button is present
  const nextButton = screen.getByText('Next');
  expect(nextButton).toBeInTheDocument();
});
