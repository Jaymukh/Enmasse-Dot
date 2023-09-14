import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import EditProfile from './EditProfile';

describe('EditProfile Component', () => {
  const selectedData = {
    name: 'Kartik Parija',
    email_id: 'kartik@enmasse.world',
    company: 'enmasse',
    company_type : "enmasse",
    role: 'Admin',
    phone_number: 6526256278,
    designation: 'Manager',
    country: 'India',
    user_id:'1',
    status: 'Active'
  };

  const handleUpdateMock = jest.fn();
  const handleCloseDialogMock = jest.fn();

  it('Renders the component with selected data', () => {
    render(
      <EditProfile
        selectedData={selectedData}
        handleUpdate={handleUpdateMock}
        handleCloseDialog={handleCloseDialogMock}
      />
    );

    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Admin')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Designer')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Example Inc.')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Type A')).toBeInTheDocument();
  });

  it('Calls the handleChangeData function when input fields change', () => {
    render(
      <EditProfile
        selectedData={selectedData}
        handleUpdate={handleUpdateMock}
        handleCloseDialog={handleCloseDialogMock}
      />
    );

    const nameInput = screen.getByPlaceholderText('Enter your name') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'New Name' } });
    expect(nameInput.value).toBe('New Name');
  });

  it('Calls the handleUpdateClick function when "Update Profile" button is clicked', () => {
    render(
      <EditProfile
        selectedData={selectedData}
        handleUpdate={handleUpdateMock}
        handleCloseDialog={handleCloseDialogMock}
      />
    );

    const updateButton = screen.getByText('Update Profile');
    fireEvent.click(updateButton);
    expect(handleUpdateMock).toHaveBeenCalledWith(selectedData);
  });

  it('Calls the handleCloseDialog function when "Close" button is clicked', () => {
    render(
      <EditProfile
        selectedData={selectedData}
        handleUpdate={handleUpdateMock}
        handleCloseDialog={handleCloseDialogMock}
      />
    );

    const closeButton = screen.getByTestId('CloseButton');
    fireEvent.click(closeButton);
    expect(handleCloseDialogMock).toHaveBeenCalledTimes(1);
  });
});
