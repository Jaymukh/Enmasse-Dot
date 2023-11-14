import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import Invite from "./Invite";
import userEvent from '@testing-library/user-event';
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from 'react-router-dom';
import { APIS } from '../../../../../constants'; // Make sure to import your constants correctly
import { RecoilRoot } from 'recoil'; // Import RecoilRoot to provide the Recoil state

const server = setupServer(
  rest.get(APIS.USERS.GET_ALL_USERS, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          company: "enmasse",
          company_type: "Enmasse",
          country: "India",
          designation: "Manager",
          email_id: "kartik@enmasse.world",
          name: "Kartik Parija",
          phone_number: "8777675655",
          role: "Admin",
          status: "Active",
          user_id: "0d8a42e5-91f4-4f65-bca3-5695c5a0b249"
        }
      ])
    );
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
jest.setTimeout(10000);

test('renders the table with user data', async () => {
  render(
    <MemoryRouter>
      <RecoilRoot>
        <Invite />
      </RecoilRoot>
    </MemoryRouter>
  );
  expect(await screen.findByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Role')).toBeInTheDocument();
  expect(screen.getByText('Company')).toBeInTheDocument();
  expect(await screen.findByText('Company type')).toBeInTheDocument();
  expect(screen.getByText('Action')).toBeInTheDocument();
  expect(await screen.findByText(/(\bKartik Parija\b)/i)).toBeInTheDocument();
  expect(await screen.findByText((content) => {
    return content.includes('Admin');
  })).toBeInTheDocument();
  const company = screen.getByText('enmasse');
  expect(company).toBeInTheDocument();
  expect(await screen.findByText((content) => {
    return content.includes('Enmasse');
  })).toBeInTheDocument();
});

// test('opens the InviteNew dialog on "Invite New" button click', async () => {
//   const handleOpenInviteNewMock = jest.fn();
//   handleOpenInviteNewMock(() => "true");
//   render(
//     <MemoryRouter>
//       <RecoilRoot>
//         <Invite />
//       </RecoilRoot>
//     </MemoryRouter>
//   );
//   const inviteNewButton = screen.getByTestId('InviteNewBtn1');
//   //const inviteNewButton =await waitFor(() => screen.findByTestId('InviteNewBtn'));
//   fireEvent.click(inviteNewButton);
//   expect(handleOpenInviteNewMock.mock.calls).toHaveLength(1);
//   const InviteNewModal = await waitFor(() => screen.findByTestId("InviteNewid"),{ timeout: 5000 });
//   expect(InviteNewModal).toBeInTheDocument();
//   expect(await waitFor(() => screen.findByText('Invite New'),{ timeout: 5000 })).toBeInTheDocument();
// });

it('should filter user suggestions when searching', () => {
  render(<MemoryRouter>
    <RecoilRoot>
      <Invite />
    </RecoilRoot>
  </MemoryRouter>);
  const searchInput = screen.getByPlaceholderText('Search');
  fireEvent.change(searchInput, { target: { value: 'Sudha' } });
  // Ensure that the component behaves as expected based on state changes
  // You can assert the component's behavior here, such as checking if it displays the filtered suggestions.
});

// test('clicking the "Edit" button calls handleEditClick with the correct row and open the editModel', async () => {

//   const expectedRow = {
//     company: "enmasse",
//     company_type: "Enmasse",
//     country: "India",
//     designation: "Manager",
//     email_id: "kartik@enmasse.world",
//     name: "Kartik Parija",
//     phone_number: "8777675655",
//     role: "Admin",
//     status: "Active",
//     user_id: "0d8a42e5-91f4-4f65-bca3-5695c5a0b249"
//   }

//   const mockHandleEditClick = jest.fn();
//   mockHandleEditClick(expectedRow);

//   render(
//     <MemoryRouter>
//       <RecoilRoot>
//         <Invite />
//       </RecoilRoot>
//     </MemoryRouter>
//   );
//   // const EditInvite = await waitFor(() => {
//   //   const editButton = screen.getByTestId('EditIconBtn');
//   //   expect(editButton).toBeInTheDocument();
//   //   return editButton;
//   // });
//   const EditInvite = await waitFor(() => screen.findByTestId('EditIconBtn'));
//   fireEvent.click(EditInvite);
//   expect(mockHandleEditClick).toHaveBeenCalledTimes(1);
//   expect(mockHandleEditClick).toHaveBeenCalledWith(expectedRow);
//   const EditInviteModal = screen.getByTestId('InviteEdit');
//   expect(EditInviteModal).toBeInTheDocument();
// });

test('clicking the "Delete" button calls openConfirmDeleteModal with the correct row and open the CinformDeleteModel', async () => {
  const expectedRow = {
    company: "enmasse",
    company_type: "Enmasse",
    country: "India",
    designation: "Manager",
    email_id: "kartik@enmasse.world",
    name: "Kartik Parija",
    phone_number: "8777675655",
    role: "Admin",
    status: "Active",
    user_id: "0d8a42e5-91f4-4f65-bca3-5695c5a0b249"
  }
  const userid = "0d8a42e5-91f4-4f65-bca3-5695c5a0b249"
  const mockopenConfirmDeleteModal = jest.fn();
  mockopenConfirmDeleteModal(true, userid);

  render(
    <MemoryRouter>
      <RecoilRoot>
        <Invite />
      </RecoilRoot>
    </MemoryRouter>
  );
  const DeleteInvite = await waitFor(() => screen.findByTestId('DeleteIcon'));
  fireEvent.click(DeleteInvite);
  expect(mockopenConfirmDeleteModal).toHaveBeenCalledTimes(1);
  const DeleteInviteModal = screen.getByTestId('ConfirmDelete');
  expect(DeleteInviteModal).toBeInTheDocument();
});

