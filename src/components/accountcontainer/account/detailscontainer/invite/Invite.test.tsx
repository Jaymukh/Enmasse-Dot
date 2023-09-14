// import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// //import userEvent from "@testing-library/user-event";
// import Invite from './Invite';

// // Mock the Constants module
// jest.mock('../../../../../utils/constants/Constants', () => ({
//   inviteData: [
//     {
//         name: 'JAY',
//         email: 'jay@gmail.com',
//         role: 'Admin',
//         company: 'Enmasse',
//         companyType: 'Enmasse'
//     },
//     // Add more data as needed
//   ]
// }));

// describe('Invite Component', () => {
//   it('Renders the component without errors', () => {
//     render(<Invite 
//         handleOpenInviteNew = {()=>{}}
//         handleConfirmDeleteModal = {() => {}}
//         handleEditClick = {() => {}}/>);
//     // Add assertions to check if the component renders without errors
//   });

//   it('Clicking the "Invite New" button opens the Invite New modal', () => {
//     const handleOpenInviteNewMock = jest.fn();
//     render(<Invite
//         handleConfirmDeleteModal = {() => {}}
//         handleEditClick = {() => {}} 
//         handleOpenInviteNew={handleOpenInviteNewMock}/>);
        
//     const InviteButton = screen.getByTestId('NewInvite');
//     fireEvent.click(InviteButton);
//     expect(handleOpenInviteNewMock).toHaveBeenCalledTimes(0);
//     const InviteNewModal = screen.getByTestId("InviteNew");
//     expect(InviteNewModal).toBeInTheDocument();
//   });

// it('Clicking the "EditInvite" button opens the EditInvite modal', () => {
//     const handleEditClickMock = jest.fn();
//     render(<Invite handleEditClick={handleEditClickMock} 
//         handleConfirmDeleteModal = {() => {}}
//         handleOpenInviteNew = {()=>{}}
//     />);
//     const EditInvite = screen.getByTestId('EditIcon'); // Use the correct data-testid
//     fireEvent.click(EditInvite);
//     expect(handleEditClickMock).toHaveBeenCalledTimes(0);
//     const EditInviteModal = screen.getByTestId('InviteEdit');
//     expect(EditInviteModal).toBeInTheDocument();
//   });

//   it('Clicking the "Delete" button opens the ConfirmD elete modal', () => {
//     const handleConfirmDeleteModalMock = jest.fn();
//     render(<Invite
//         handleOpenInviteNew = {()=>{}}
//         handleConfirmDeleteModal = {handleConfirmDeleteModalMock}
//         handleEditClick = {() => {}}
//         />);
//     const deleteButton = screen.getByTestId('DeleteSweepIcon');
//     fireEvent.click(deleteButton);
//    // console.log(screen.debug());
//     expect(handleConfirmDeleteModalMock).toHaveBeenCalledTimes(0);
    
//      const confirmDeleteModal = screen.getByTestId('ConfirmDelete');
//      expect(confirmDeleteModal).toBeInTheDocument();
//   });

//   it('Renders the table with correct data', () => {
//     // Mock the data for your test
//     const inviteData = [
//       {
//         name: 'JAY',
//         role: 'Admin',
//         company: 'Enmasse',
//         companyType: 'Enmasse',
//         email: 'jay@gmail.com'
//       }
//       // Add more data rows as needed
//     ];

//     render(<Invite 
//         handleEditClick={() => {}} 
//         handleOpenInviteNew = {()=>{}}
//         handleConfirmDeleteModal = {()=>{}}
//         />);

//     // Ensure that the table is present
//     const table = screen.getByRole('table');
//     expect(table).toBeInTheDocument();

//     // Ensure that the table headers are present
//     const tableHeaders = screen.getAllByRole('columnheader');
//     expect(tableHeaders).toHaveLength(5); // 5 headers

//     // Ensure that the data rows are present and match the number of items in inviteData
//     const dataRows = screen.getAllByRole('row');
//     expect(dataRows).toHaveLength(inviteData.length + 1); // Plus one for the header row

//     // Ensure that each data cell contains the expected content
//     inviteData.forEach((row, index) => {
//         const dataCells = screen.getAllByTestId('cells');  // Match by exact name
//         console.log(dataCells.length);
//         expect(dataCells).toHaveLength(1); // 5 data cells per row
//         expect(dataCells[0]).toHaveTextContent(row.name);
//         // const emailcell = screen.getAllByTestId("emailcell");
//         // expect(emailcell[0]).toHaveTextContent(row.email);
//         const rolecell = screen.getAllByTestId("rolecell");
//         expect(rolecell[0]).toHaveTextContent(row.role);
//         const companycell = screen.getAllByTestId("cellsCompany");
//         expect(companycell[0]).toHaveTextContent(row.company);
//         const companycellType = screen.getAllByTestId("cellsCompanyType");
//         expect(companycellType[0]).toHaveTextContent(row.companyType);
//         // You can also test the buttons within the last data cell if needed
//       });
//   });
// });
