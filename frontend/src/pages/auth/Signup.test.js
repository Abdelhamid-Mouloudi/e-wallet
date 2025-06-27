

import React from 'react';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import Signup from './Signup';
import '@testing-library/jest-dom';


jest.mock('./SignupForm', () => () => <div data-testid="signup-form">Mocked SignupForm</div>);
jest.mock('../../components/logo', () => () => <div data-testid="logo">Logo</div>);

describe('Signup Page', () => {
  test('renders signup page content', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </HelmetProvider>
    );

   
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByText('Login')).toHaveAttribute('href', '/login');
    expect(screen.getByTestId('signup-form')).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
