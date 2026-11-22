import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the hero and every section', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /portfolio/i })).toBeInTheDocument();
  ['about', 'skills', 'projects', 'contact'].forEach((id) => expect(document.getElementById(id)).toBeInTheDocument());
});
