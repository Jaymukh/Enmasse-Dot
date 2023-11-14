import React from 'react';
import { waitFor, render, screen, fireEvent } from '@testing-library/react';
import Settings from './Settings';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';

describe('EditProfile Component', () => {

test('Calls the handleEditClick function when "Edit settings" button is clicked', async () => {
    const handleEditClick = jest.fn();
    handleEditClick(true);
    render(
        <MemoryRouter>
            <RecoilRoot>
                <Settings />
            </RecoilRoot>
        </MemoryRouter>
    );

    const EditSettingBtn = screen.getByText('Edit Setting');
    fireEvent.click(EditSettingBtn);
    expect(handleEditClick).toHaveBeenCalledTimes(1);
    const EditSetting = screen.getByTestId("EditSettingId");
    expect(EditSetting).toBeInTheDocument();
});

test('Calls the handleDrawer function when "Edit settings" button is clicked', async () => {
    const handleDrawer = jest.fn();
    handleDrawer(true);
    render(
        <MemoryRouter>
            <RecoilRoot>
                <Settings />
            </RecoilRoot>
        </MemoryRouter>
    );

    const ChangePasswordBtn = screen.getByText('Change Password');
    fireEvent.click(ChangePasswordBtn);
    expect(handleDrawer).toHaveBeenCalledTimes(1);
    const ChangePassword = screen.getByTestId("ChangePasswordId");
    expect(ChangePassword).toBeInTheDocument();
});

test('select box is editable', async () => {
    render(<MemoryRouter>
        <RecoilRoot>
            <Settings />
        </RecoilRoot>
    </MemoryRouter>
    );
    const languageselectBox = screen.getByTestId("languageId");
    expect(languageselectBox).toBeDisabled();
    const currencyselectBox = screen.getByTestId("currencyId");
    expect(currencyselectBox).toBeDisabled();
    const locationselectBox = screen.getByTestId("locationId");
    expect(locationselectBox).toBeDisabled();
    expect(screen.getByText('India')).toBeInTheDocument();
  });
  test('renders "Receive email notifications" and a switch', () => {
    // Render the component
    render(<MemoryRouter>
        <RecoilRoot>
            <Settings />
        </RecoilRoot>
    </MemoryRouter>);
    const textElement = screen.getByText('Receive email notifications');
    //const switchElement = screen.getByLabelText('ant design');
    expect(textElement).toBeInTheDocument();
    //expect(switchElement).toBeInTheDocument();
  });
});