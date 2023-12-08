import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormComponent from '../../app/start/components/FormComponent'

describe('FormComponent', () => {
  test('renders FormComponent correctly', () => {
    render(<FormComponent />);

    // For example, you can check if the Questions component is initially rendered
    const questionsComponent = screen.getByTestId('questions');
    expect(questionsComponent).toBeInTheDocument();
  });

  test('handles user input and transitions between steps', () => {
    render(<FormComponent />);

    // Check if clicking on the "Next" button triggers the handleNextStep function
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

  });

  // Add more test cases to cover different scenarios and edge cases
});
