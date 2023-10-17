import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ConfirmDelete from './ConfirmDelete';

describe('ConfirmDelete Component', () => {
  it('Renders the component with confirmation modal hidden by default', () => {
    const handleConfirmDeleteModalMock = jest.fn();
    const handleDeleteClickMock = jest.fn();
    const closeConfirmDeleteModalMock = jest.fn();

    render(
      <ConfirmDelete
        showConfirmDeleteModal={false}
        closeConfirmDeleteModal={closeConfirmDeleteModalMock}
        handleDeleteClick={handleDeleteClickMock}
      />
    );

    const confirmDeleteModal = screen.queryByTestId('ConfirmDelete');
    expect(confirmDeleteModal).toBeInTheDocument();
    expect(confirmDeleteModal).toHaveStyle({ display: 'block' });
  });

  it('Renders the component with confirmation modal shown when `showConfirmDeleteModal` is true', () => {
    const handleConfirmDeleteModalMock = jest.fn();
    const handleDeleteClickMock = jest.fn();
    const closeConfirmDeleteModalMock = jest.fn();

    render(
      <ConfirmDelete
        showConfirmDeleteModal={true}
        closeConfirmDeleteModal={closeConfirmDeleteModalMock}
        handleDeleteClick={handleDeleteClickMock}
      />
    );

    const confirmDeleteModal = screen.getByTestId('ConfirmDelete');
    expect(confirmDeleteModal).toBeInTheDocument();
    expect(confirmDeleteModal).toHaveStyle({ display: 'block' });
  });

  it('Calls the `handleDeleteClick` function when "Delete" button is clicked', () => {
    const handleConfirmDeleteModalMock = jest.fn();
    const handleDeleteClickMock = jest.fn();
    const closeConfirmDeleteModalMock = jest.fn();
    render(
      <ConfirmDelete
        showConfirmDeleteModal={true}
        closeConfirmDeleteModal={closeConfirmDeleteModalMock}
        handleDeleteClick={handleDeleteClickMock}
      />
    );

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(handleDeleteClickMock).toHaveBeenCalledTimes(1);
  });

  it('Calls the `handleConfirmDeleteModal` function with false when "Cancel" button is clicked', () => {
    const handleConfirmDeleteModalMock = jest.fn();
    const handleDeleteClickMock = jest.fn();
    const closeConfirmDeleteModalMock = jest.fn();
    render(
      <ConfirmDelete
        showConfirmDeleteModal={true}
       closeConfirmDeleteModal={closeConfirmDeleteModalMock}
        handleDeleteClick={handleDeleteClickMock}
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(closeConfirmDeleteModalMock).toBeCalledTimes(1);
  });
});
