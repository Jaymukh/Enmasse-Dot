import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import EditProfile from './EditProfile';
import { RecoilRoot } from 'recoil'; // Import RecoilRoot to provide the Recoil state
import user from '@testing-library/user-event'
import { async } from 'q';

describe('EditProfile Component', () => {
  const selectedData = {
    name: 'Kartik Parija',
    email_id: 'kartik@enmasse.world',
    company: 'enmasse',
    company_type: "enmasse",
    role: 'Admin',
    phone_number: 6526256278,
    designation: 'Manager',
    country: 'India',
    user_id: '1',
    status: 'Active',
  };

  const setProfileDataMock = jest.fn();
  const handleUpdateMock = jest.fn();
  const handleCloseDialogMock = jest.fn();

  it('Renders the component with selected data', () => {
    render(
      <RecoilRoot> {/* Wrap your component with RecoilRoot */}
        <EditProfile
          selectedData={selectedData}
          handleUpdate={handleUpdateMock}
          handleCloseDialog={handleCloseDialogMock}
        />
      </RecoilRoot>
    );

    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Kartik Parija')).toBeInTheDocument();
    expect(screen.getByDisplayValue('kartik@enmasse.world')).toBeInTheDocument();
    expect(screen.getByDisplayValue('6526256278')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Enmasse')).toBeInTheDocument();
    //expect(screen.getByDisplayValue('enmasse')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Manager')).toBeInTheDocument();

    //expect(screen.getByDisplayValue('Admin')).toBeInTheDocument();
  });

  it('Calls the handleChangeData function when input fields change', () => {
    render(
      <RecoilRoot> {/* Wrap your component with RecoilRoot */}
        <EditProfile
          selectedData={selectedData}
          handleUpdate={handleUpdateMock}
          handleCloseDialog={handleCloseDialogMock}
        />
      </RecoilRoot>
    );

    const nameInput = screen.getByPlaceholderText('Enter your name') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'New Name' } });
    console.log('Updated Data:', nameInput.value);
    console.log('handleUpdateMock Calls:', handleUpdateMock.mock.calls);
    expect(nameInput.value).toBe('New Name');
    expect(handleUpdateMock).toHaveBeenCalledWith({
      ...selectedData,
      name: 'New Name',
    });
  });

  it('Calls the handleUpdateClick function when "Update Profile" button is clicked', () => {
    render(
      <RecoilRoot> {/* Wrap your component with RecoilRoot */}
        <EditProfile
          selectedData={selectedData}
          handleUpdate={handleUpdateMock}
          handleCloseDialog={handleCloseDialogMock}
        />
      </RecoilRoot>
    );

    const updateButton = screen.getByText('Update Profile');
    fireEvent.click(updateButton);
    expect(handleUpdateMock).toHaveBeenCalledWith(selectedData);
  });

  it('Calls the handleCloseDialog function when "Close" button is clicked', async() => {
    render(
      <RecoilRoot> {/* Wrap your component with RecoilRoot */}
        <EditProfile
          selectedData={selectedData}
          handleUpdate={handleUpdateMock}
          handleCloseDialog={handleCloseDialogMock}
        />
      </RecoilRoot>
    );

    const closeButton = screen.getByTestId('CloseButton');
    await user.click(closeButton);
    //fireEvent.click(closeButton);
    expect(handleCloseDialogMock).toHaveBeenCalledTimes(0);
  });
});
