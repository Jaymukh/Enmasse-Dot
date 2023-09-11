// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import EditProfile from './EditProfile';

// describe('EditProfile component', () => {
//   const selectedData = {
//     name: 'John Doe',
//     email: 'john@example.com',
//     phone: '1234567890',
//     country: 'India',
//     company: 'Company XYZ',
//     designation: 'Developer',
//     role: 'Admin',
//   };
  
//   it('should render EditProfile component with initial data', () => {
//     render(
//       <EditProfile
//         selectedData={selectedData}
//         setProfileData={() => {}}
//         handleUpdate={() => {}}
//         handleCloseDialog={() => {}}
//       />
//     );
//     expect(screen.getByText('Edit Profile')).toBeInTheDocument();
//     // expect(getByText('Edit Profile')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Enter your name')).toHaveValue('John Doe');
//     expect(screen.getByPlaceholderText('Enter your Email ID')).toHaveValue('john@example.com');
//     expect(screen.getByPlaceholderText('Enter your phone number')).toHaveValue('1234567890');
//     expect(screen.getByDisplayValue('India')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Business Name')).toHaveValue('Company XYZ');
//     expect(screen.getByPlaceholderText('Email ID')).toHaveValue('Developer');
//     expect(screen.getByDisplayValue('Admin')).toBeInTheDocument();
//   });

//   it('should update the profile data when input fields are changed', () => {
//     const handleUpdate = jest.fn();
//     render(
//       <EditProfile
//         selectedData={selectedData}
//         setProfileData={() => {}}
//         handleUpdate={handleUpdate}
//         handleCloseDialog={() => {}}
//       />
//     );

//     const nameInput = screen.getByPlaceholderText('Enter your name');
//     fireEvent.change(nameInput, { target: { value: 'New Name' } });

//     const emailInput = screen.getByPlaceholderText('Enter your Email ID');
//     fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } });

//     // Add similar fireEvent calls for other input fields...

//     const updateButton = screen.getByText('Update Profile');
//     fireEvent.click(updateButton);

//     expect(handleUpdate).toHaveBeenCalledWith({
//       name: 'New Name',
//       email: 'newemail@example.com',
//       // Include other updated fields...
//     });
//   });

//   // Add more test cases for other interactions and scenarios...

// });
