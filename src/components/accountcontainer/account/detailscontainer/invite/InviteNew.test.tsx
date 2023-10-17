import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InviteNew from './InviteNew';
import { RecoilRoot } from 'recoil';
import { APIS } from '../../../../../constants';
import { setupServer } from "msw/node";
import { MemoryRouter } from 'react-router-dom';
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

describe('EditInvite component', () => {
  const handleCloseInviteNew = jest.fn();
  it('rendered without error', async () => {
    const { getByTestId, getByPlaceholderText, getByText, getByDisplayValue } = render(
      <MemoryRouter>
        <RecoilRoot>
          <InviteNew handleCloseInviteNew={handleCloseInviteNew} openInviteNew={true}/>
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
        company_type: "Tech Corp",
        phone_number: "8919682369",
        role: "User"
    };
    const inviteNewMock = jest.fn();
    inviteNewMock(newData);
    const mockhandleSubmitInviteNew = jest.fn();
    mockhandleSubmitInviteNew();
    const { getByTestId, getByPlaceholderText, getByText, getByDisplayValue } = render(
      <MemoryRouter>
        <RecoilRoot>
          <InviteNew handleCloseInviteNew={handleCloseInviteNew} openInviteNew={true} />
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
    const selectBox = getByTestId('companyId');
    act(() => {
      fireEvent.change(selectBox, { target: { value: 'xyz' } });
    });

    const companyTypeSelect = await waitFor(() =>
      screen.getByTestId('companytypeId') as HTMLSelectElement
    );
    act(() => {
      fireEvent.change(companyTypeSelect, { target: { value: 'Tech Corp' } });
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
        company_type: "Tech Corp",
        phone_number: "8919682369",
        role: "User"
      });
      expect(mockhandleSubmitInviteNew).toHaveBeenCalledTimes(1);
      expect(handleCloseInviteNew).toHaveBeenCalledTimes(1);
    });
  });

});

