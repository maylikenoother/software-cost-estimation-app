import { render, screen } from '@testing-library/react'
import Home from '../../app/page'
import '@testing-library/jest-dom'

describe('Home Component', () => {
  test('renders content correctly', () => {
    render(<Home />);

    // Check if the component renders the title
    const titleElement = screen.getByText(/Software Cost Estimation/i);
    expect(titleElement).toBeInTheDocument();

    // Check if the component renders the description
    const descriptionElement = screen.getByText(/Calculate the cost of your software project/i);
    expect(descriptionElement).toBeInTheDocument();

    // Check if the "Start Estimation" link is present
    const startEstimationLink = screen.getByRole('link', { name: /Start Estimation/i });
    expect(startEstimationLink).toBeInTheDocument();

  });
});
