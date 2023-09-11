import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
//import userEvent from "@testing-library/user-event";
import Invite from './Invite';

// Mock the Constants module
jest.mock('../../../../../utils/constants/Constants', () => ({
  inviteData: [
    {
        name: 'JAY',
        email: 'jay@gmail.com',
        role: 'Admin',
        company: 'Enmasse',
        companyType: 'Enmasse'
    },
    // Add more data as needed
  ]
}));

describe('Invite Component', () => {
  it('Renders the component without errors', () => {
    render(<Invite />);
    // Add assertions to check if the component renders without errors
  });
  it('Clicking the "Invite New" button opens the Invite New modal', () => {
    render(<Invite />);
    const InviteButton = screen.getByTestId('NewInvite');
    fireEvent.click(InviteButton);
    console.log(screen.debug());
    const InviteNewModal = screen.getByTestId("InviteNew");
    expect(InviteNewModal).toBeInTheDocument();
  });

  it('Clicking the "Delete" button opens the ConfirmDelete modal', () => {
    render(<Invite />);
    const deleteButton = screen.getByTestId('DeleteSweepIcon');
    fireEvent.click(deleteButton);
    // console.log(screen.debug());
    const confirmDeleteModal = screen.getByTestId('ConfirmDelete');
    expect(confirmDeleteModal).toBeInTheDocument();
  });
  // Add more test cases as needed
});
