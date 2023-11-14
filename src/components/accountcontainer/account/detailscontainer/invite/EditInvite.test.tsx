import React from 'react';
import { render, screen, fireEvent, waitFor, getByTestId, queryAllByTestId, getAllByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditInvite from './EditInvite';
import { APIS } from '../../../../../constants';
import { setupServer } from "msw/node";
import { rest } from "msw";
import { act } from 'react-dom/test-utils';
import { MemoryRouter} from 'react-router-dom';
import { RecoilRoot } from 'recoil'; 


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

describe('EditInvite component', () => {
    const selectedData = {
        name: 'Kartik Parija',
        email_id: 'kartik@enmasse.world',
        company: 'Enmasse',
        company_type: 'Enmasse',
        role: 'Admin',
        phone_number: 6526256278,
        designation: 'Manager',
        country: 'India',
        user_id: '1',
        status: 'Active',
    };

    const handleCloseDialog = jest.fn();
    const handleUpdate = jest.fn();
    it('renders without errors and with row data', async () => {
        render(
            <MemoryRouter>
                <RecoilRoot>
                    <EditInvite
                        selectedData={selectedData}
                        handleCloseDialog={() => { }}
                        handleUpdate={() => { }}
                    />
                </RecoilRoot>
            </MemoryRouter>
        );
        // Assertions for elements
        expect(screen.getByText('Edit')).toBeInTheDocument();
        const nameInput = screen.getByPlaceholderText('Enter your name');
        act(() => {
            userEvent.clear(nameInput);
        userEvent.type(nameInput, 'Kartik Parija1');
        expect(nameInput).toHaveValue('Kartik Parija1');
          });
        const emailInput = screen.getByPlaceholderText('Enter your Email ID');
        act(() => {
            userEvent.clear(emailInput);
        userEvent.type(emailInput, 'kartik@enmasse.world');
        expect(emailInput).toHaveValue('kartik@enmasse.world');
          });
        const selectBox = screen.getByTestId('companyId') as HTMLSelectElement;
        act(() => {
            fireEvent.change(selectBox, { target: { value: 'enmasse' } });
        expect(selectBox.value).toBe('enmasse');
          });
        
        expect(await screen.findByText('Admin')).toBeInTheDocument();
        const companyTypeSelect = await waitFor(() =>
            screen.getByTestId('companytypeId') as HTMLSelectElement
        );
        act(() => {
            fireEvent.change(companyTypeSelect, { target: { value: 'Enmasse' } });
            expect(companyTypeSelect.value).toBe('Enmasse');
          });
    });

    it('Clicking the "Update" button triggers the handleUpdateClick function', () => {
        const handleUpdateMock = jest.fn();
        const updatedData = {
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
        const handleUpdateClickMock = jest.fn();
        handleUpdateClickMock();
        render(
            <MemoryRouter>
            <RecoilRoot>
                <EditInvite
                    handleUpdate={handleUpdateMock}
                    selectedData={selectedData}
                    handleCloseDialog={() => { }}
                />
            </RecoilRoot>
            </MemoryRouter>
        );
        const updateButton = screen.getByText('Update');
        act(() => {
            fireEvent.click(updateButton);
            expect(handleUpdateClickMock).toHaveBeenCalledTimes(1);
          });
        
    });

    it('updates input fields and triggers handleUpdateClick', async () => {
        
        const { getByTestId, getByPlaceholderText, getByText, getByDisplayValue } = render(
            <MemoryRouter>
            <RecoilRoot>
                <EditInvite selectedData={selectedData} handleCloseDialog={handleCloseDialog} handleUpdate={handleUpdate} />
            </RecoilRoot>
            </MemoryRouter>
        );
        const nameInput = getByPlaceholderText('Enter your name');
        act(() => {
            fireEvent.change(nameInput, { target: { value: 'New Name' } });
          });
        
        const emailInput = getByPlaceholderText('Enter your Email ID');
        act(() => {
            fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } });
          });
        const roleSelect = await waitFor(() =>
            screen.getByText('Admin') as HTMLSelectElement
        );
        act(() => {
            fireEvent.change(roleSelect, { target: { value: 'Admin' } });
          });
        const selectBox = getByTestId('companyId');
        act(() => {
            fireEvent.change(selectBox, { target: { value: 'Enmasse' } });
          });
        const companyTypeSelect = await waitFor(() =>
            screen.getByTestId('companytypeId') as HTMLSelectElement
        );
        act(() => {
            fireEvent.change(companyTypeSelect, { target: { value: 'Enmasse' } });
          });
        const updateButton = getByText('Update');
        act(() => {
            fireEvent.click(updateButton);
            expect(handleUpdate).toHaveBeenCalledWith({
                ...selectedData,
                name: 'New Name',
                email_id: 'newemail@example.com',
                role: 'Admin',
                company: 'Enmasse',
                company_type: 'Enmasse',
            });
          });
        
        
    });
});


