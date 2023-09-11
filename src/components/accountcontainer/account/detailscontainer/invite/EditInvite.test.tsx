// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import EditInvite from './EditInvite';

// describe('EditInvite component', () => {
//   const selectedData = {
//     name: 'Kartik Parija',
//     email: 'kartik@enmasse.world',
//     company: 'Enmasse',
//     companyType: 'Enmasse',
//     role: 'Admin'
//   };

//   it('renders without errors', () => {
//     render(
//       <EditInvite
//         selectedData={selectedData}
//         handleCloseDialog={() => {}}
//         handleUpdate={() => {}}
//       />
//     );

//     // Assertions for elements
//     expect(screen.getByText('Edit')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Enter your Email ID')).toBeInTheDocument();
//     // Add similar assertions for other elements
//   });

//   it('updates name input correctly', () => {
  
//     render(
//       <EditInvite
//         selectedData={selectedData}
//         handleCloseDialog={() => {}}
//         handleUpdate={() => {}}
//       />
//     );

//     const nameInput = screen.getByPlaceholderText('Enter your name');
//     userEvent.clear(nameInput);
//     userEvent.type(nameInput, 'Kartik Parija');
//     // Assertion for updated value
//     expect(nameInput).toHaveValue('Kartik Parija');
//   });
  
 

//   it('updates email input correctly', () => {
//     render(
//       <EditInvite
//         selectedData={selectedData}
//         handleCloseDialog={() => {}}
//         handleUpdate={() => {}}
//       />
//     );

//     const emailInput = screen.getByPlaceholderText('Enter your Email ID');
//     userEvent.clear(emailInput);
//     userEvent.type(emailInput, 'kartik@enmasse.world');

//     // Assertion for updated value
//     expect(emailInput).toHaveValue('kartik@enmasse.world');
//   });

//   it('updates role input correctly', () => {
//     render(
//       <EditInvite
//         selectedData={selectedData}
//         handleCloseDialog={() => {}}
//         handleUpdate={() => {}}
//       />
//     );

//     const emailInput = screen.getByPlaceholderText('Enter your role');
//     userEvent.clear(emailInput);
//     userEvent.type(emailInput, 'Admin');

//     // Assertion for updated value
//     expect(emailInput).toHaveValue('Admin');
//   });

//   it('Selecting an option company', () => {
//     render(
//       <EditInvite
//         selectedData={selectedData}
//         handleCloseDialog={() => {}}
//         handleUpdate={() => {}}
//       />
//     );
//     const selectBox = screen.getByTestId('company-placeholder') as HTMLSelectElement;
//     // Simulate selecting an option
//     fireEvent.change(selectBox, { target: { value: 'Enmasse' } });
  
//     // Verify that the option has been selected
//     expect(selectBox.value).toBe('Enmasse');
//   });
//   it('Selecting an option companyType', () => {
//     render(
//       <EditInvite
//         selectedData={selectedData}
//         handleCloseDialog={() => {}}
//         handleUpdate={() => {}}
//       />
//     );
//     const selectBox = screen.getByTestId('companytype-placeholder') as HTMLSelectElement;
//     // Simulate selecting an option
//     fireEvent.change(selectBox, { target: { value: 'Enmasse' } });
  
//     // Verify that the option has been selected
//     expect(selectBox.value).toBe('Enmasse');
//   });

//   it('Clicking the "Update" button triggers the handleUpdateClick function', () => {
//     const handleUpdateMock = jest.fn();
  
//     render(
//       <EditInvite 
//       handleUpdate={handleUpdateMock} 
//       selectedData={selectedData}
//       handleCloseDialog={() => {}}
//       />
//     );
//     const updateButton = screen.getByText('Update');
//     // Simulate a click event on the button 
//     fireEvent.click(updateButton);
//     // Assert that handleUpdateMock was called
//     expect(handleUpdateMock).toHaveBeenCalledTimes(1);
//   })


// });


