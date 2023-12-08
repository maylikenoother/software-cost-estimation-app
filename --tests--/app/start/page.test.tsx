import { render, screen } from '@testing-library/react'
import Page from '../../../app/start/page'
import '@testing-library/jest-dom'

describe('Page Component', () => {
  test('renders FormComponent correctly', () => {
    render(<Page />);

    // Check if the FormComponent is rendered
    const formComponentElement = screen.getByTestId('form-component');
    expect(formComponentElement).toBeInTheDocument();

  });
});
