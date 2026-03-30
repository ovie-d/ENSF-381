import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sweet scoop heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/sweet scoop/i);
  expect(headingElement).toBeInTheDocument();
});
