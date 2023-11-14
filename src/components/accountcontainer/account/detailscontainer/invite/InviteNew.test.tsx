import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InviteNew from './InviteNew';

import { APIS } from '../../../../../constants';
import { setupServer } from "msw/node";
import { MemoryRouter} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { rest } from "msw";
import { act } from 'react-dom/test-utils';
const server = setupServer(
  rest.post(APIS.USERS.INVITE_NEW, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Post request successful' }));
  }),
  rest.get(APIS.SETTINGS.GET_ALL_SETTINGS, (req, res, ctx) => {
    return res(
      ctx.json({
        company_types: [
          {
            id: 1,
            name: "Enmasse",
            hq: "Singapore",
            company_size: 40,
            website: "https://enmasse.world",
            no_of_users: 40,
            description: "Enmasse World"
          }
        ],
        roles: [
          {
            id: 1,
            name: "Admin",
            description: "Administrator with full access rights"
          },
          {
            id: 2,
            name: "User",
            description: "User with partial access rights"
          }
        ]
      })

    );
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate
}));

describe('EditInvite component', () => {
  const handleCloseInviteNew = jest.fn();
  const openInviteNew = jest.fn();
  openInviteNew(true);
  const handleChangeData = jest.fn();
  handleChangeData();
  const setNewData = jest.fn();
  const NewData = { 
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
  it('rendered without error', async () => {
    const setOpenInviteNew = jest.fn();
    setOpenInviteNew(true);
    const {getByPlaceholderText } = render(
      <MemoryRouter>
        <RecoilRoot>
          <InviteNew handleCloseInviteNew={handleCloseInviteNew} openInviteNew={true} setOpenInviteSent={() => setOpenInviteNew(true)} newData={NewData} handleChangeData={handleChangeData} setNewData={(NewData) => setNewData(NewData)}/>
        </RecoilRoot>
      </MemoryRouter>
    );
    expect(getByPlaceholderText('Enter your name')).toBeInTheDocument;
    expect(getByPlaceholderText('Enter your Email ID')).toBeInTheDocument;
    expect(await waitFor(() => screen.getByTestId('companytypeId') as HTMLSelectElement)).toBeInTheDocument;
    expect(await waitFor(() => screen.getByTestId('roleId') as HTMLSelectElement)).toBeInTheDocument;
    expect(screen.getByTestId('BtnInvite')).toBeInTheDocument;
    expect(screen.getByText('Note: Admins will be able to invite users to the platform')).toBeInTheDocument
  });

  it('updates input fields and triggers handleUpdateClick', async () => {
    const newData = {
      email_id: "test@gmail.com",
        name: "test",
        company: "xyz",
        designation: "xyz",
        country: "India",
        company_type: "Enmasse",
        phone_number: "8919682369",
        role: "User"
    };
    
    const setOpenInviteNew = jest.fn();
    setOpenInviteNew(true);
    const inviteNewMock = jest.fn();
    inviteNewMock(newData);
    const mockhandleSubmitInviteNew = jest.fn();
    mockhandleSubmitInviteNew();
    const handleCloseInviteNew=jest.fn();
    const mockedToast = "Something went wrong. Please try again."
    const { getByTestId, getByPlaceholderText, getByText, getByDisplayValue } = render(
      <MemoryRouter>
        <RecoilRoot>
        <InviteNew handleCloseInviteNew={handleCloseInviteNew} openInviteNew={true} setOpenInviteSent={() => setOpenInviteNew(true)} newData={newData} handleChangeData={handleChangeData} setNewData={(newData) => setNewData(newData)}/>
        </RecoilRoot>
      </MemoryRouter>
    );
    const nameInput = getByPlaceholderText('Enter your name');
    act(() => {
      fireEvent.change(nameInput, { target: { value: 'test1' } });
    });

    const emailInput = getByPlaceholderText('Enter your Email ID');
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    });


    const roleSelect = await waitFor(() =>
      screen.getByText('Admin') as HTMLSelectElement
    );

    act(() => {
      fireEvent.change(roleSelect, { target: { value: 'User' } });
    });
    const selectBox = await waitFor(() =>
      screen.getByTestId('companyId') as HTMLSelectElement
    );
    //const selectBox = screen.getByTestId('companyId');
    act(() => {
      fireEvent.change(selectBox, { target: { value: 'xyz' } });
    });

    const companyTypeSelect = await waitFor(() =>
      screen.getByTestId('companytypeId') as HTMLSelectElement
    );
    act(() => {
      fireEvent.change(companyTypeSelect, { target: { value: 'Enmasse' } });
    });

    const inviteButton = getByTestId('BtnInvite');
    act(() => {
      fireEvent.click(inviteButton);
      
      expect(inviteNewMock).toHaveBeenCalledWith({
        ...newData,
        email_id: "test@gmail.com",
        name: "test",
        company: "xyz",
        designation: "xyz",
        country: "India",
        company_type: "Enmasse",
        phone_number: "8919682369",
        role: "User"
      });
      expect(mockhandleSubmitInviteNew).toHaveBeenCalledTimes(1);
    expect(setOpenInviteNew).toHaveBeenCalledWith(true);
    });
  });

});

