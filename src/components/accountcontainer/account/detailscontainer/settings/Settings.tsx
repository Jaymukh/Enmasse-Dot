/* eslint-disable react-hooks/exhaustive-deps */
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
import { AllSettingsState, UserSettingsState, spinnerState } from "../../../../../states";

// Utilities
import { RouteConstants } from '../../../../../constants';
import { useSettingsService } from '../../../../../services'
import InfoPanel from '../../../../ui/InfoPanel';
import { useMapHelpers } from '../../../../../helpers';

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
    const { getErrorMsg } = useMapHelpers();

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
            getErrorMsg(error);
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
            getErrorMsg(error);
        });
    }

    //function to get all the user's setting
    useEffect(() => {
        fetchAllSettings();
        fetchUserSettings();
    }, []);


    return (
        <div className='container bg-white margin-top-4 margin-right-5 padding-left-right-0' style={{ height: '90%' }}>
            <div className="w-100 margin-left-right-0 h-10 d-flex flex-row justify-content-between align-items-center padding-top-3 padding-right-4">
                {/* <h5 className='margin-top-2 col-2 margin-left-3 text-start'>Settings</h5> */}
                <Heading
                    title='Settings'
                    type={TypographyType.h2}
                    colour={TypographyColor.dark}
                    classname='col-2 margin-left-3 padding-left-2 text-start'
                />
                <div className='col d-flex justify-content-end '>
                    <Button
                        theme={ButtonTheme.secondary}
                        size={ButtonSize.default}
                        variant={ButtonVariant.bordered}
                        onClick={() => handleEditClick(!editMode)}
                    >
                        <MdModeEdit className='margin-right-1 margin-bottom-1' fontSize={20} />
                        Edit Settings
                    </Button>
                    <Button
                        theme={ButtonTheme.secondary}
                        size={ButtonSize.default}
                        variant={ButtonVariant.bordered}
                        onClick={() => handleDrawer(true)}
                        classname='margin-left-2'
                    >
                        <MdLock className='margin-right-1 margin-bottom-1' fontSize={20} />
                        Change password
                    </Button>
                </div>
            </div>
            <hr />
            <div className="row w-100 h-90 margin-left-right-0">
                <div className='col-5 d-flex justify-content-start flex-column text-justify margin-bottom-4 margin-left-right-4 padding-left-right-0'>
                    <div className='d-flex flex-row justify-content-start align-items-center'>
                        <Heading
                            title='Language Preference'
                            colour={TypographyColor.dark}
                            type={TypographyType.h5}
                            classname='margin-top-2 text-start'
                        />
                        <InfoPanel fontSize={20} text='Change your language' />
                    </div>
                    <Select
                        options={settings?.languages}
                        value={usersettings?.language}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='language'
                        disabled={true}
                    />
                    <div className='d-flex flex-row justify-content-start align-items-center'>
                        <Heading
                            title='Currency Preference'
                            colour={TypographyColor.dark}
                            type={TypographyType.h5}
                            classname='margin-top-2 text-start'
                        />
                        <InfoPanel fontSize={20} text='Change currency' />
                    </div>
                    <Select
                        options={settings?.currencies}
                        value={usersettings?.currency}
                        labelKey='name'
                        valueKey='symbol'
                        size={SelectSize.large}
                        name='currency'
                        disabled={true}
                    />
                    <div className='d-flex flex-row justify-content-start align-items-center'>
                        <Heading
                            title='Location Focus'
                            colour={TypographyColor.dark}
                            type={TypographyType.h5}
                            classname='margin-top-2 text-start'
                        />
                        <InfoPanel fontSize={20} text='Change your location' />
                    </div>
                    <Select
                        options={settings?.locations}
                        value={usersettings?.location}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='location'
                        disabled={true}
                    />
                    <div className='d-flex flex-row justify-content-start align-items-center'>
                        <Heading
                            title='Notifications'
                            colour={TypographyColor.dark}
                            type={TypographyType.h5}
                            classname='margin-top-2 text-start'
                        />
                        <InfoPanel fontSize={20} text='Turn on/off Notification' />
                    </div>
                    <div className={`d-flex justify-content-between align-items-center padding-left-right-2 padding-top-bottom-2 input-div disabled-div`} aria-disabled={true}>
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

