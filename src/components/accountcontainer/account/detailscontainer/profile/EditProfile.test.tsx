import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import EditProfile from './EditProfile';
import { RecoilRoot } from 'recoil'; // Import RecoilRoot to provide the Recoil state
import user from '@testing-library/user-event'
import { APIS } from '../../../../../constants';
import { setupServer } from "msw/node";
import { MemoryRouter } from 'react-router-dom';
import { rest } from "msw";
import { act } from 'react-dom/test-utils';


const server = setupServer(
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

describe('EditProfile Component', () => {
  const selectedData = {
    email_id: "dots_admin@enmasse.world",
    user_id: "dbf1d5e0-d4ad-4664-9f86-d89555e79cef",
    name: "DOTS Admin",
    company: "enmasse",
    designation: "Manager",
    country: "India",
    company_type: "Enmasse",
    phone_number: 7676526331,
    role: "Admin",
    status: "Active"
};

  const setProfileDataMock = jest.fn();
  const handleUpdateMock = jest.fn();
  const handleCloseDialog = jest.fn();
  // handleCloseDialog(null);

  it('Renders the component with selected data', async() => {
    render(
      <RecoilRoot> {/* Wrap your component with RecoilRoot */}
        <EditProfile
          selectedData={selectedData}
          handleUpdate={handleUpdateMock}
          handleCloseDialog={handleCloseDialog} 
        />
      </RecoilRoot>
    );
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    expect(screen.getByDisplayValue('DOTS Admin')).toBeInTheDocument();
    expect(screen.getByDisplayValue('dots_admin@enmasse.world')).toBeInTheDocument();
    expect(screen.getByDisplayValue('7676526331')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Enmasse')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Manager')).toBeInTheDocument();
    expect(await screen.findByText('Admin')).toBeInTheDocument();
    //expect(screen.getByDisplayValue('Enmasse')).toBeInTheDocument();
  });
  it('Calls the handleUpdateClick function when "Update Profile" button is clicked', async() => {
    render(
      <RecoilRoot> {/* Wrap your component with RecoilRoot */}
        <EditProfile
          selectedData={selectedData}
          handleUpdate={handleUpdateMock}
          handleCloseDialog={handleCloseDialog}
        />
      </RecoilRoot>
    );
    const nameInput = screen.getByPlaceholderText('Enter your name');
    act(() => {
        fireEvent.change(nameInput, { target: { value: 'New Name' } });
      });
    
    const emailInput = screen.getByPlaceholderText('Enter your Email ID');
    act(() => {
        fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } });
      });
      const phoneNumberInput = screen.getByPlaceholderText('Enter your Phone number');
    act(() => {
        fireEvent.change(phoneNumberInput, { target: { value: "9676526331" } });
      });
    const roleSelect = await waitFor(() =>
        screen.getByText('Admin') as HTMLSelectElement
    );
    act(() => {
        fireEvent.change(roleSelect, { target: { value: 'Admin' } });
      });

      const designationSelect = screen.getByPlaceholderText('Enter your designation');
    act(() => {
        fireEvent.change(designationSelect, { target: { value: "Manager" } });
      });

    const selectBox = screen.getByTestId('company-placeholder');
    act(() => {
        fireEvent.change(selectBox, { target: { value: 'Enmasse' } });
      });
    const companyTypeSelect = await waitFor(() =>
        screen.getByTestId('companytype-placeholder') as HTMLSelectElement
    );
    act(() => {
        fireEvent.change(companyTypeSelect, { target: { value: 'Enmasse' } });
      });
    const updateButton = screen.getByText('Update Profile');
    act(() => {
        fireEvent.click(updateButton);
        expect(handleUpdateMock).toHaveBeenCalledWith({
            ...selectedData,
            name: 'New Name',
            email_id: 'newemail@example.com',
            role: 'Admin',
            company: 'Enmasse',
            company_type: 'Enmasse',
            designation: "Manager",
            phone_number: "9676526331",

        });
      });
  });

  it('Calls the handleCloseDialog function when "Close" button is clicked', async () => {
    render(
      <RecoilRoot> {/* Wrap your component with RecoilRoot */}
        <EditProfile
          selectedData={selectedData}
          handleUpdate={handleUpdateMock}
          handleCloseDialog={handleCloseDialog}
        />
      </RecoilRoot>
    );

    const closeButton = screen.getByTestId('CloseButton');
    fireEvent.click(closeButton);
    expect(handleCloseDialog).toHaveBeenCalledTimes(1);
  });
});
