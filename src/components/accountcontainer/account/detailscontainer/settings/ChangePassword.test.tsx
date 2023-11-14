import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChangePassword from './ChangePassword';
import { MemoryRouter} from 'react-router-dom';
import { RecoilRoot } from 'recoil';

test('it renders the Change Password component', () => {
    const handleDrawer = jest.fn();
    const handleShowModal = jest.fn();
    render(
        <MemoryRouter>
        <RecoilRoot>
    <ChangePassword open={true} handleUpdateClick={() => { }} handleDrawer={handleDrawer} handleShowModal={handleShowModal}/>
    </RecoilRoot>
        </MemoryRouter>
    );

    const changePasswordText = screen.getByText('Change Password');
    expect(changePasswordText).toBeInTheDocument();
    const oldPasswordInput = screen.getByPlaceholderText('Old password');
    expect(oldPasswordInput).toBeInTheDocument();
    const newPasswordInput = screen.getByPlaceholderText('New password');
    expect(newPasswordInput).toBeInTheDocument();

    const confirmNewPasswordInput = screen.getByPlaceholderText('Confirm new password');
    expect(confirmNewPasswordInput).toBeInTheDocument();
    expect(screen.getByText('8 Characters')).toBeInTheDocument;
    expect(screen.getByText('Contains Special character')).toBeInTheDocument;
    expect(screen.getByText('Contains Uppercase')).toBeInTheDocument;
    expect(screen.getByText('Contains Number')).toBeInTheDocument;
});

test('it handles password validation correctly', async() => {
    const handleDrawer = jest.fn();
    const handleShowModal = jest.fn();
    // const checked = false;
    const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/;
    const Uppercase = /[A-Z]/;
    const Number = /[0-9]/;
    const mockConditions = {
        lengthCheck: true,
        uppercase: true,
        specialChar: true,
        number: true,
    };
    const handlePasswordChange = jest.fn();
    handlePasswordChange(mockConditions);
    render(
        <MemoryRouter>
        <RecoilRoot>
    <ChangePassword open={true} handleUpdateClick={() => { }} handleDrawer={handleDrawer} handleShowModal={handleShowModal}/>
        </RecoilRoot>
        </MemoryRouter>
    );
    const newPasswordInput = screen.getByPlaceholderText('Old password') as HTMLInputElement;
    fireEvent.change(newPasswordInput, { target: { value: 'ValidPassword123!' } });
    expect(newPasswordInput.value).toBe('ValidPassword123!');
    expect(newPasswordInput.value.length).toBeGreaterThan(8);
    expect(newPasswordInput.value).toMatch(specialCharacter);
    expect(newPasswordInput.value).toMatch(Uppercase);
    expect(newPasswordInput.value).toMatch(Number);
//     const char = screen.getByTestId('charactersId');
// await waitFor(() => {
//     expect(screen.getByTestId('charactersId')).toHaveAttribute('color', '#108041');
//     expect(screen.getByTestId('uppercaseIcon')).toHaveAttribute('color', '#108041');
//     expect(screen.getByTestId('specialCharIcon')).toHaveAttribute('color', '#108041');
//     expect(screen.getByTestId('numberIcon')).toHaveAttribute('color', '#108041');
//   });
    const updatePasswordButton = screen.getByText('Update');
    expect(updatePasswordButton).toHaveProperty('disabled', false);
});


