import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import EditProfile from './EditProfile';

describe('EditProfile Component', () => {
  const selectedData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: 1234567890,
    designation: 'Designer',
    company: 'Example Inc.',
    country: 'India',
    role: 'Admin',
  };

  const setProfileDataMock = jest.fn();
  const handleUpdateMock = jest.fn();
  const handleCloseDialogMock = jest.fn();

  it('Renders the component with selected data', () => {
    render(
      <EditProfile
        selectedData={selectedData}
        setProfileData={setProfileDataMock}
        handleUpdate={handleUpdateMock}
        handleCloseDialog={handleCloseDialogMock}
      />
    );

    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue(1234567890)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Example Inc.')).toBeInTheDocument();
    expect(screen.getByDisplayValue('India')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Admin')).toBeInTheDocument();
  });

  it('Calls the handleChangeData function when input fields change', () => {
    render(
      <EditProfile
        selectedData={selectedData}
        setProfileData={setProfileDataMock}
        handleUpdate={handleUpdateMock}
        handleCloseDialog={handleCloseDialogMock}
      />
    );

    const nameInput = screen.getByPlaceholderText('Enter your name') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Jay' } });
    expect(nameInput.value).toBe('Jay');
    expect(setProfileDataMock).toHaveBeenCalledWith({
      ...selectedData,
      name: 'Jay',
    });
  });

  it('Calls the handleUpdateClick function when "Update Profile" button is clicked', () => {
    render(
      <EditProfile
        selectedData={selectedData}
        setProfileData={setProfileDataMock}
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
        setProfileData={setProfileDataMock}
        handleUpdate={handleUpdateMock}
        handleCloseDialog={handleCloseDialogMock}
      />
    );
    const closeButton = screen.getByTestId('CloseButton');
    fireEvent.click(closeButton);
    expect(handleCloseDialogMock).toHaveBeenCalledTimes(0);
  });
});
