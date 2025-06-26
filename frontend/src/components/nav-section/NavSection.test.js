import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import NavSection from './NavSection';


jest.mock('./styles', () => ({
  StyledNavItem: (props) => <div {...props} />,
  StyledNavItemIcon: ({ children }) => <span data-testid="icon">{children}</span>,
}));

describe('NavSection', () => {
  const mockData = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <span>📊</span>,
    },
    {
      title: 'Profile',
      path: '/profile',
      icon: <span>👤</span>,
      info: <span data-testid="info">NEW</span>,
    },
  ];

  test('renders list of navigation items', () => {
    render(
      <MemoryRouter>
        <NavSection data={mockData} />
      </MemoryRouter>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();


    expect(screen.getAllByTestId('icon')).toHaveLength(2);

   
    expect(screen.getByTestId('info')).toHaveTextContent('NEW');
  });

  
});
