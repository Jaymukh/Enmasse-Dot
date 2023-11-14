// UpdateSuccessModal.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UpdateSuccessModal from './UpdateSuccessModel';

describe('UpdateSuccessModal component', () => {
  it('renders with initial data', () => {
    const showModal = true;
    const handleShowModal = jest.fn();
    render(
      <UpdateSuccessModal showModal={showModal} handleShowModal={handleShowModal} />
    );
    // Add assertions based on your modal content
    expect(screen.getByAltText('Created Successfully GIF')).toBeInTheDocument();
    expect(screen.getByText('Password changed')).toBeInTheDocument();
    expect(screen.getByText('Password for your account updated successfully')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('handles continue button click', () => {
    const showModal = true;
    const handleShowModal = jest.fn();
    render(
      <UpdateSuccessModal showModal={showModal} handleShowModal={handleShowModal} />
    );
    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);
    expect(handleShowModal).toHaveBeenCalledWith(false, true);
  });
});
