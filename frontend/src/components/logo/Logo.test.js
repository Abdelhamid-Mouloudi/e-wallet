
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import Logo from './Logo';


const theme = createTheme();


const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </BrowserRouter>
);

// Mock process.env.PUBLIC_URL
const originalEnv = process.env;
beforeEach(() => {
  jest.resetModules();
  process.env = {
    ...originalEnv,
    PUBLIC_URL: '/test-public'
  };
});

afterEach(() => {
  process.env = originalEnv;
});

describe('Logo Component', () => {
  describe('Rendering', () => {
    test('renders logo image correctly', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logoImg = screen.getByRole('img');
      expect(logoImg).toBeInTheDocument();
      expect(logoImg).toHaveAttribute('src', '/test-public/logo.png');
    });

    test('applies default styles', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logoImg = screen.getByRole('img');
      
      expect(logoImg).toHaveStyle('width: 60px');
      expect(logoImg).toHaveStyle('height: 60px');
      expect(logoImg).toHaveStyle('cursor: pointer');
    });

    test('applies custom sx styles', () => {
      const customSx = { width: 80, height: 80, borderRadius: '50%' };
      
      render(
        <TestWrapper>
          <Logo sx={customSx} />
        </TestWrapper>
      );

      const logoImg = screen.getByRole('img');
      expect(logoImg).toHaveStyle('width: 80px');
      expect(logoImg).toHaveStyle('height: 80px');
      expect(logoImg).toHaveStyle('border-radius: 50%');
    });
  });

  describe('Link Behavior', () => {
    test('renders as link by default', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logoLink = screen.getByRole('link');
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute('href', '/');
    });

    test('logo image is inside the link', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logoLink = screen.getByRole('link');
      const logoImg = screen.getByRole('img');
      
      expect(logoLink.contains(logoImg)).toBe(true);
    });

    test('does not render as link when disabledLink is true', () => {
      render(
        <TestWrapper>
          <Logo disabledLink={true} />
        </TestWrapper>
      );

      const logoImg = screen.getByRole('img');
      expect(logoImg).toBeInTheDocument();
      
  
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    test('renders as link when disabledLink is false', () => {
      render(
        <TestWrapper>
          <Logo disabledLink={false} />
        </TestWrapper>
      );

      const logoLink = screen.getByRole('link');
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute('href', '/');
    });
  });

  describe('Props', () => {


    test('handles undefined sx prop', () => {
      render(
        <TestWrapper>
          <Logo sx={undefined} />
        </TestWrapper>
      );

      const logoImg = screen.getByRole('img');
      expect(logoImg).toBeInTheDocument();
    });

    test('handles empty sx prop', () => {
      render(
        <TestWrapper>
          <Logo sx={{}} />
        </TestWrapper>
      );

      const logoImg = screen.getByRole('img');
      expect(logoImg).toBeInTheDocument();
    });
  });


  describe('Environment Variables', () => {
    test('uses PUBLIC_URL from environment', () => {
      process.env.PUBLIC_URL = '/custom-path';
      
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logoImg = screen.getByRole('img');
      expect(logoImg).toHaveAttribute('src', '/custom-path/logo.png');
    });

    test('handles empty PUBLIC_URL', () => {
      process.env.PUBLIC_URL = '';
      
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logoImg = screen.getByRole('img');
      expect(logoImg).toHaveAttribute('src', '/logo.png');
    });
  });

  describe('Accessibility', () => {
    test('logo image has no alt text by default (decorative)', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logoImg = screen.getByRole('img');
      expect(logoImg).not.toHaveAttribute('alt');
    });

    test('logo link is keyboard accessible', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logoLink = screen.getByRole('link');
      expect(logoLink).toHaveAttribute('href', '/');
      
      // Link should be focusable
      logoLink.focus();
      expect(logoLink).toHaveFocus();
    });
  });

  describe('Integration', () => {
    test('works with complex sx props', () => {
      const complexSx = {
        width: { xs: 40, md: 60 },
        height: { xs: 40, md: 60 },
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.1)'
        }
      };
      
      render(
        <TestWrapper>
          <Logo sx={complexSx} />
        </TestWrapper>
      );

      const logoImg = screen.getByRole('img');
      expect(logoImg).toBeInTheDocument();
    });

  });
});