// External libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from "recoil";
import { MdModeEdit } from 'react-icons/md';
import { MdLock } from 'react-icons/md';

// CSS
import '../../../../../styles/main.css';

// Components
import Switch from '../../../../ui/switch/Switch';
import Select, { SelectSize } from '../../../../ui/select/Select';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../../../../ui/typography/Body';
import ChangePassword from './ChangePassword';
import UpdateSuccessModal from './UpdateSuccessModel';
import WIPDrawer from '../../../../mapContainer/WIPDrawer';
import { AllSettingsState, UserSettingsState, errorState, spinnerState } from "../../../../../states";

// Utilities
import { RouteConstants } from '../../../../../constants';
import { useSettingsService } from '../../../../../services'

const Settings = () => {
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [open, setOpen] = useState(false);
    // all settings's data
    const settingsService = useSettingsService();    
    const [settings, setSettings] = useRecoilState(AllSettingsState);
    const [usersettings, setUserSettings] = useRecoilState(UserSettingsState);
    const [isChecked, setIsChecked] = useState(usersettings?.email_notification);
    const setSpinner = useSetRecoilState(spinnerState);
    const setError = useSetRecoilState(errorState);

    const handleUpdateClick = () => {
        handleDrawer(false);
    };

    const handleDrawer = (open: boolean) => {
        setOpen(open);
    }
    // handle edit setting
    const handleEditClick = (editMode?: boolean) => {
        setEditMode(editMode!);
    };
    const handleShowModal = (flag: boolean, navigateFlag?: boolean) => {
        setShowModal(flag);
        if (navigateFlag) {
            navigate(RouteConstants.login);
        }
    }

    const toggleSwitch = () => {
        setIsChecked(!isChecked);
    };

    const fetchAllSettings = () => {
        setSpinner(true);
        settingsService.getAllSettings().then((response) => {
            if (response) {
                setSettings(response);
                setSpinner(false);
            }
        }).catch(error => {
            setSpinner(false);
            const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
            setError({ type: 'Error', message: errorMsg });
        });
    }

    const fetchUserSettings = () => {
        setSpinner(true);
        settingsService.getUserSettings().then((response) => {
            if (response) {
                setUserSettings(response);
                setSpinner(false);
            }
        }).catch(error => {
            setSpinner(false);
            const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
            setError({ type: 'Error', message: errorMsg });

        });
    }

    //function to get all the user's setting
    useEffect(() => {
        fetchAllSettings();
        fetchUserSettings();
    }, []);


    return (
        <div className='container bg-white mt-4 me-5 px-0' style={{ height: '90%' }}>
            <div className="w-100 mx-0 h-10 d-flex flex-row justify-content-between align-items-center pt-3 pe-4">
                {/* <h5 className='mt-2 col-2 ms-3 text-start'>Settings</h5> */}
                <Heading
                    title='Settings'
                    type={TypographyType.h2}
                    colour={TypographyColor.dark}
                    classname='col-2 ms-3 ps-2 text-start'
                />
                <div className='col d-flex justify-content-end '>
                    <Button
                        theme={ButtonTheme.secondary}
                        size={ButtonSize.default}
                        variant={ButtonVariant.bordered}
                        onClick={() => handleEditClick(!editMode)}
                    >
                        <MdModeEdit className='me-1 mb-1' fontSize={20} />
                        Edit Settings
                    </Button>
                    <Button
                        theme={ButtonTheme.secondary}
                        size={ButtonSize.default}
                        variant={ButtonVariant.bordered}
                        onClick={() => handleDrawer(true)}
                        classname='ms-2'
                    >
                        <MdLock className='me-1 mb-1' fontSize={20} />
                        Change password
                    </Button>
                </div>
            </div>
            <hr />
            <div className="row w-100 h-90 mx-0">
                <div className='col-5 d-flex justify-content-start flex-column text-justify mb-4 mx-4 px-0'>
                    <Heading
                        title='Language Preference'
                        colour={TypographyColor.dark}
                        type={TypographyType.h5}
                        classname='mt-2 text-start'
                    />
                    <Select
                        options={settings?.languages}
                        value={usersettings?.language}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='language'
                        disabled={true}
                    />
                    <Heading
                        title='Currency Preference'
                        colour={TypographyColor.dark}
                        type={TypographyType.h5}
                        classname='mt-2 text-start'
                    />
                    <Select
                        options={settings?.currencies}
                        value={usersettings?.currency}
                        labelKey='name'
                        valueKey='symbol'
                        size={SelectSize.large}
                        name='currency'
                        disabled={true}
                    />
                    <Heading
                        title='Location Focus'
                        colour={TypographyColor.dark}
                        type={TypographyType.h5}
                        classname='mt-2 text-start'
                    />
                    <Select
                        options={settings?.locations}
                        value={usersettings?.location}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='location'
                        disabled={true}
                    />
                    <Heading
                        title='Notifications'
                        colour={TypographyColor.dark}
                        type={TypographyType.h5}
                        classname='mt-2 text-start'
                    />
                    <div className={`d-flex justify-content-between align-items-center px-2 py-2 input-div disabled-div`} aria-disabled={true}>
                        <Body
                            type={BodyType.p2}
                            color={BodyColor.dark}
                            classname=''>Receive email notifications</Body>

                        <Switch
                            isChecked={usersettings?.email_notification}
                            toggleSwitch={toggleSwitch}
                            name='email_notification'
                            disabled={true}
                        />
                    </div>
                </div>
            </div>
            {/* drawer for edit setting */}
            {editMode && (<WIPDrawer open={editMode} title='Edit Settings' closeWIPDrawer={handleEditClick} />)}
            {/* drawer for change Password */}
            {open && (<ChangePassword open={open} handleUpdateClick={handleUpdateClick} handleDrawer={handleDrawer} handleShowModal={handleShowModal} />)}
            {/* modal for success message */}
            {showModal && <UpdateSuccessModal showModal={showModal} handleShowModal={handleShowModal} />}
        </div>
    )
}

export default Settings;

