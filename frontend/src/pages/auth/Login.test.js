import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import '@testing-library/jest-dom';
import Login from './Login';


jest.mock('../../components/logo', () => () => <div data-testid="logo" />);
jest.mock('./LoginForm', () => () => <div data-testid="login-form" />);
jest.mock('../../hooks/useResponsive', () => () => false); // forcer mobile

describe('Login Page', () => {
  test('renders login page content', () => {
    render(
       <HelmetProvider> 
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </HelmetProvider>
    );

    
    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByText("Don’t have an account?")).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
