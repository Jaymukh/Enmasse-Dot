import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChangePassword from './ChangePassword';

test('it renders the Change Password component', () => {
    const handleDrawer = jest.fn();
    render(<ChangePassword open={true} handleUpdateClick={() => { }} handleDrawer={handleDrawer} />);

    const changePasswordText = screen.getByText('Change Password');
    expect(changePasswordText).toBeInTheDocument();
    const oldPasswordInput = screen.getByPlaceholderText('Enter your current password');
    expect(oldPasswordInput).toBeInTheDocument();
    const newPasswordInput = screen.getByPlaceholderText('Enter your new password');
    expect(newPasswordInput).toBeInTheDocument();

    const confirmNewPasswordInput = screen.getByPlaceholderText('Re-enter your password here');
    expect(confirmNewPasswordInput).toBeInTheDocument();
    expect(screen.getByText('8 Characters')).toBeInTheDocument;
    expect(screen.getByText('Contains special character')).toBeInTheDocument;
    expect(screen.getByText('Contains Uppercase')).toBeInTheDocument;
    expect(screen.getByText('Contains Numbers')).toBeInTheDocument;
});

test('it handles password validation correctly', () => {
    const handleDrawer = jest.fn();
    // const checked = false;
    const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/;
    const Uppercase = /[A-Z]/;
    const Number = /[0-9]/;

    render(<ChangePassword open={true} handleUpdateClick={() => { }} handleDrawer={handleDrawer} />);
    const newPasswordInput = screen.getByPlaceholderText('Enter your new password') as HTMLInputElement;
    fireEvent.input(newPasswordInput, { target: { value: 'ValidPassword123!' } });
    expect(newPasswordInput.value.length).toBeGreaterThan(8);
    expect(newPasswordInput.value).toMatch(specialCharacter);
    expect(newPasswordInput.value).toMatch(Uppercase);
    expect(newPasswordInput.value).toMatch(Number);
    // Ensure that the checkboxes for password validation are checked
    expect(screen.getByTestId('charactersId')).toHaveProperty('checked', true);
    expect(screen.getByTestId('SpecialcharactersId')).toHaveProperty('checked', true);
    expect(screen.getByTestId('UppercaseId')).toHaveProperty('checked', true);
    expect(screen.getByTestId('NumbersId')).toHaveProperty('checked', true);
    const updatePasswordButton = screen.getByText('Update Password');
    //expect(updatePasswordButton).toHaveProperty('disabled', false);
});

// test('it updates the oldPassword state correctly', () => {
//     const handleDrawer = jest.fn();
//     render(
//       <ChangePassword
//         open={true}
//         handleUpdateClick={() => {}}
//         handleDrawer={handleDrawer}
//       />
//     );
  
//     // Select the "Old Password" input and enter a value
//     const oldPasswordInput = screen.getByPlaceholderText('Enter your current password') as HTMLInputElement;
//     fireEvent.change(oldPasswordInput, { target: { value: 'MyOldPassword' } });
  
//     // Check if the oldPassword state is updated correctly
//     expect(oldPasswordInput.value).toBe('MyOldPassword');
//   });
  
  
  
  
  
  

// test('it handles password confirmation correctly', () => {
//     const handleDrawer = jest.fn();
//     render(<ChangePassword open={true} handleUpdateClick={() => { }} handleDrawer={handleDrawer} />);

//     // Select the "New Password" input and enter a valid password
//     const newPasswordInput = screen.getByPlaceholderText('Enter your new password') as HTMLInputElement;
//     fireEvent.input(newPasswordInput, { target: { value: 'ValidPassword123!' } });

//     // Select the "Confirm Password" input and enter a matching password
//     const confirmNewPasswordInput = screen.getByPlaceholderText('Re-enter your password here') as HTMLInputElement;
//     fireEvent.input(confirmNewPasswordInput, { target: { value: 'ValidPassword123!' } });

//     // Check if the "disabled" property is set to false
//     const updatePasswordButton = screen.getByText('Update Password');
//     expect(updatePasswordButton).toHaveProperty('disabled', false);
//     // Ensure there is no error message for password confirmation
//     const errorText = screen.queryByText('Password does not match!');
//     expect(errorText).toBeNull();

//     // Ensure the "Update Password" button is enabled
//     //const updatePasswordButton = screen.getByText('Update Password');
//     //expect(updatePasswordButton).toHaveProperty('disabled', true);
// });
