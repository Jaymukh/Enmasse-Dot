import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InviteSent from './InviteSent';

describe('InviteSent component', () => {
  it('renders correctly and closes the modal on button click', () => {
    const setOpenInviteSentMock = jest.fn();
    setOpenInviteSentMock(false);
    const { getByText, getByAltText } = render(
      <InviteSent openInviteSent={true} setOpenInviteSent={setOpenInviteSentMock} email="test@example.com" />
    );
    expect(getByText('Invite sent')).toBeInTheDocument();
    expect(getByText('Invite sent to "test@example.com" with login and password.')).toBeInTheDocument();
    expect(getByAltText('Created Successfully GIF')).toBeInTheDocument();
    expect(setOpenInviteSentMock).toHaveBeenCalledWith(false);
  });
});
