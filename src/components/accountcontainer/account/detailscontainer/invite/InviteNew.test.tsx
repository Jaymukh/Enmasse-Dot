// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import InviteNew from './InviteNew';

// describe('InviteNew component', () => {
//     // const selectedData = {
//     //   name: 'Kartik Parija',
//     //   email: 'kartik@enmasse.world',
//     //   company: 'Enmasse',
//     //   companyType: 'Enmasse',
//     //   role: 'Admin'
//     // };

//     it('renders without errors', () => {
//         render(
//             <InviteNew
//                 openInviteNew={true}
//                 handleCloseInviteNew={() => { }}
//                 inviteData={[]}
//                 setInviteData={() => { }}
//             />
//         );

//         // Assertions for elements
//         expect(screen.getByTestId('IdInvite')).toBeInTheDocument();
//         expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
//         expect(screen.getByPlaceholderText('Enter your Email ID')).toBeInTheDocument();
//         // Add similar assertions for other elements
//     });
//     it('updates name input correctly', () => {

//         render(
//             <InviteNew
//                 openInviteNew={true}
//                 handleCloseInviteNew={() => { }}
//                 inviteData={[]}
//                 setInviteData={() => { }}
//             />
//         );

//         const nameInput = screen.getByPlaceholderText('Enter your name');
//         userEvent.clear(nameInput);
//         userEvent.type(nameInput, 'Kartik Parija');
//         // Assertion for updated value
//         expect(nameInput).toHaveValue('Kartik Parija');
//     });
//     it('updates email input correctly', () => {
//         render(
//             <InviteNew
//                 openInviteNew={true}
//                 handleCloseInviteNew={() => { }}
//                 inviteData={[]}
//                 setInviteData={() => { }}
//             />
//         );

//         const emailInput = screen.getByPlaceholderText('Enter your Email ID');
//         userEvent.clear(emailInput);
//         userEvent.type(emailInput, 'kartik@enmasse.world');
//         // Assertion for updated value
//         expect(emailInput).toHaveValue('kartik@enmasse.world');
//     });
//     it('updates role input correctly', () => {
//         render(
//             <InviteNew
//                 openInviteNew={true}
//                 handleCloseInviteNew={() => { }}
//                 inviteData={[]}
//                 setInviteData={() => { }}
//             />
//         );

//         const emailInput = screen.getByPlaceholderText('Enter your role');
//         userEvent.clear(emailInput);
//         userEvent.type(emailInput, 'Admin');
//         // Assertion for updated value
//         expect(emailInput).toHaveValue('Admin');
//     });
//     it('Selecting an option company', () => {
//         render(
//             <InviteNew
//                 openInviteNew={true}
//                 handleCloseInviteNew={() => { }}
//                 inviteData={[]}
//                 setInviteData={() => { }}
//             />
//         );
//         const selectBox = screen.getByTestId('SelectCompanyId') as HTMLSelectElement;
//         // Simulate selecting an option
//         fireEvent.change(selectBox, { target: { value: 'Enmasse' } });

//         // Verify that the option has been selected
//         expect(selectBox.value).toBe('Enmasse');
//     });

//     it('Selecting an option companyType', () => {
//         render(
//             <InviteNew
//             openInviteNew={true}
//             handleCloseInviteNew={() => { }}
//             inviteData={[]}
//             setInviteData={() => { }}
//         />
//         );
//         const selectBox = screen.getByTestId('SelectCompanyTypeId') as HTMLSelectElement;
//         // Simulate selecting an option
//         fireEvent.change(selectBox, { target: { value: 'Enmasse' } });
      
//         // Verify that the option has been selected
//         expect(selectBox.value).toBe('Enmasse');
//       });

//       it('Handles form submission correctly', () => {
//         const setInviteDataMock = jest.fn();
//         const handleCloseInviteNewMock = jest.fn();
    
//         render(
//           <InviteNew
//             openInviteNew={true}
//             handleCloseInviteNew={handleCloseInviteNewMock}
//             inviteData={[]}
//             setInviteData={setInviteDataMock}
//           />
//         );
    
//         // Get the "Invite" button
//         const inviteButton = screen.getByTestId('InviteNewBtn');
    
//         // Simulate user input
//         fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
//           target: { value: 'John Doe' },
//         });
//         fireEvent.change(screen.getByPlaceholderText('Enter your Email ID'), {
//           target: { value: 'john@example.com' },
//         });
//         fireEvent.change(screen.getByPlaceholderText('Enter your role'), {
//           target: { value: 'Admin' },
//         });
    
//         fireEvent.change(screen.getByTestId('SelectCompanyId'), {
//           target: { value: 'Enmasse' },
//         });
//         fireEvent.change(screen.getByTestId('SelectCompanyTypeId'), {
//           target: { value: 'Enmasse' },
//         });
    
//         // Simulate form submission
//         fireEvent.click(inviteButton);
    
//         // Assert that the setInviteDataMock and handleCloseInviteNewMock were called
//         expect(setInviteDataMock).toHaveBeenCalledWith([
//           {
//             name: 'John Doe',
//             email: 'john@example.com',
//             company: 'Enmasse',
//             companyType: 'Enmasse',
//             role: 'Admin',
//           },
//         ]);
//         expect(handleCloseInviteNewMock).toHaveBeenCalled();
//       });
// });