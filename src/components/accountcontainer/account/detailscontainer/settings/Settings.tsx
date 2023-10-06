import React, { useState, useEffect } from 'react';
import '../../../../../App.css';
import { MdModeEdit } from 'react-icons/md';
import { MdLock } from 'react-icons/md';
import Switch from '../../../../ui/switch/Switch';
import ChangePassword from './ChangePassword';
import UpdateSuccessModal from './UpdateSuccessModel';
import { RouteConstants } from '../../../../../constants';
import { useNavigate } from 'react-router-dom';
import { AllSettingsState, UserSettingsState, SettingsData, UserSettings, spinnerState } from "../../../../../states";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useSettingsService } from '../../../../../services';
import WIPDrawer from '../../../../mapContainer/WIPDrawer';
import Select, { SelectSize } from '../../../../ui/select/Select';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';

interface SettingsProps { }



const Settings: React.FC<SettingsProps> = () => {

    // handle edit
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [open, setOpen] = useState(false);
    // all settings's data
    const settings: SettingsData = useRecoilValue(AllSettingsState);
    const [usersettings, setUserSettings] = useRecoilState<UserSettings>(UserSettingsState);
    const [isChecked, setIsChecked] = useState(usersettings?.email_notification);
    const settingsService = useSettingsService();
    const setSpinner = useSetRecoilState(spinnerState);

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
    //function to get logged users
    const getLoggedUserSettings = () => {
        setSpinner(true);
        settingsService.getUserSettings().then((response) => {
            if (response) {
                setUserSettings(response);
                setSpinner(false);
            }
        }).catch(error => {
            setSpinner(false);
        });
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

    //function to get all the users
    useEffect(() => {
        settingsService.getAllSettings();
        getLoggedUserSettings();
    }, []);

    return (
        <div className='container bg-white mt-4 me-5 px-0' style={{ height: '90%' }}>
            <div className="w-100 mx-0 h-10 d-flex flex-row justify-content-between align-items-center pt-3 pe-4">
                {/* <h5 className='mt-2 col-2 ms-3 text-start'>Settings</h5> */}
                <Heading
					title='Settings'
					type={TypographyType.h2}
					colour={TypographyColor.dark}
					classname='col-2 ms-3 text-start'
				/>
                <div className='col d-flex justify-content-end '>
                    <Button
                        theme={ButtonTheme.secondary}
                        size={ButtonSize.default}
                        variant={ButtonVariant.contained}
                        onClick={() => handleEditClick(!editMode)}
                    >
                        <MdModeEdit className='me-1 mb-1' fontSize={20} />
                        Edit Setting
                    </Button>
                    <Button
                        theme={ButtonTheme.secondary}
                        size={ButtonSize.default}
                        variant={ButtonVariant.contained}
                        onClick={() => handleDrawer(true)}
                        classname='ms-2'
                    >
                        <MdLock className='me-1 mb-1' fontSize={20} />
                        Change Password
                    </Button>
                </div>
            </div>
            <hr />
            <div className="row w-100 h-90 mx-0">
                <div className='col-5 d-flex justify-content-start flex-column text-justify mb-4 mx-4 px-0'>
                    <h6 className='mt-2 text-start'>Language Preference</h6>
                    <Select
                        options={settings?.languages}
                        value={usersettings?.language}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='language'
                        disabled={!editMode}
                    />
                    <h6 className='mt-2 text-start'>Currency Preference</h6>
                    <Select
                        options={settings?.currencies}
                        value={usersettings?.currency}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='currency'
                        disabled={!editMode}
                    />
                    <h6 className='mt-2 text-start'>Location Focus</h6>
                    <Select
                        options={settings?.locations}
                        value={usersettings?.location}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='location'
                        disabled={!editMode}
                    />
                    <h6 className='mt-2 text-start'>Notifications</h6>
                    <div className='d-flex justify-content-between align-items-center px-3 py-2 input-div'>
                        <h6 className='color-black m-0' >Receive email notifications</h6>
                        <Switch
                            isChecked={usersettings?.email_notification}
                            toggleSwitch={toggleSwitch}
                            name='email_notification'
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

