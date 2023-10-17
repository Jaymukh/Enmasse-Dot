
import { waitFor, render, screen, fireEvent } from '@testing-library/react';
import Profile from './Profile';
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from 'react-router-dom';
import { APIS } from '../../../../../constants'; // Make sure to import your constants correctly
import { RecoilRoot } from 'recoil'; // Import RecoilRoot to provide the Recoil state

const server = setupServer(
    rest.get(APIS.USERS.GET_LOGGED_USER, (req, res, ctx) => {
        return res(
            ctx.json(
                {
                    email_id: "dots_admin@enmasse.world",
                    user_id: "dbf1d5e0-d4ad-4664-9f86-d89555e79cef",
                    name: "DOTS Admin",
                    company: "enmasse",
                    designation: "Manager",
                    country: "India",
                    company_type: "Enmasse",
                    phone_number: "7676526331",
                    role: "Admin",
                    status: "Active"
                }

            )
        );
    })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders with user data', async () => {
    render(
        <MemoryRouter>
            <RecoilRoot>
                <Profile />
            </RecoilRoot>
        </MemoryRouter>
    );
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('Role:')).toBeInTheDocument();
    expect(screen.getByText('Phone:')).toBeInTheDocument();
    expect(screen.getByText('Company Name:')).toBeInTheDocument();
    expect(screen.getByText('Email Id:')).toBeInTheDocument();
    expect(screen.getByText('Designation:')).toBeInTheDocument();
    expect(screen.getByText('Country:')).toBeInTheDocument();
    expect(await waitFor(() => screen.getByText("dots_admin@enmasse.world"))).toBeInTheDocument();
    expect(screen.getByText("DOTS Admin")).toBeInTheDocument();
    expect(screen.getByText("Manager")).toBeInTheDocument();
    expect(screen.getByText("7676526331")).toBeInTheDocument();
    expect(screen.getByText("enmasse")).toBeInTheDocument();
    expect(screen.getByText("India")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
});
it('opens EditProfile when "Edit Profile" button is clicked', () => {
    render(
        <MemoryRouter>
            <RecoilRoot>
                <Profile />
            </RecoilRoot>
        </MemoryRouter>
    );
    const handleEditClick = jest.fn();
    handleEditClick();
    const editProfileButton = screen.getByText('Edit Profile');
    fireEvent.click(editProfileButton);
    expect(handleEditClick).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('EditProfileId')).toBeInTheDocument();
});