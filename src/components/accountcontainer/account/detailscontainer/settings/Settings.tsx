import React, { useState, useEffect } from 'react';
import '../../../../../App.css';
import { MdModeEdit } from 'react-icons/md';
import { MdLock } from 'react-icons/md';
import Switch from '../../../../ui/switch/Switch';
import ChangePassword from './ChangePassword';
import UpdateSuccessModal from './UpdateSuccessModel';
import { RouteConstants } from '../../../../../constants';
import { useNavigate } from 'react-router-dom';
import { AllSettingsState, UserSettingsState, SettingsData, UserSettings } from "../../../../../states";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSettingsService } from '../../../../../services';
import WIPDrawer from '../../../../mapContainer/mapOptions/WIPDrawer';
import Select, { SelectSize } from '../../../../ui/select/Select';

interface SettingsProps { }



const Settings: React.FC<SettingsProps> = () => {

    // handle edit
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    // all settings's data
    const settings: SettingsData = useRecoilValue(AllSettingsState);
    const [usersettings, setUserSettings] = useRecoilState<UserSettings>(UserSettingsState);
    const [isChecked, setIsChecked] = useState(usersettings?.email_notification);
    const settingsService = useSettingsService();

    const handleUpdateClick = () => {
        handleDrawer(false);
    };

    const handleDrawer = (open: boolean) => {
        setOpen(open);
    }
    // handle edit setting
    const handleEditClick = (editMode?: boolean) => {
        setEditMode(editMode!);
        setIsDisabled(!editMode);
    };
    //function to get logged users
    const getLoggedUserSettings = () => {
        settingsService.getUserSettings().then((response) => {
            if (response) {
                setUserSettings(response);
            }
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
        <div className='container bg-white w-90 h-100 mt-4 detail-container me-5'>
            <div className="row w-100 h-10 d-flex flex-row justify-content-between pt-3 pl-4">
                <h5 className='mt-2 col-2'>Settings</h5>
                <div className='mt-2 col-10 d-flex justify-content-end'>
                    <button className='btn btn-outline-secondary width-fit-content-button me-2 fs-13' onClick={() => handleEditClick(!editMode)}>
                        <MdModeEdit className='me-1 mb-1 color-black' fontSize={20} /> Edit Setting
                        {/* { editMode ? 
                            ('Save Setting') : 
                            ( <><ModeEditIcon className='mx-1 mb-1 color-black' /> 'Edit Setting'</> )
                        } */}
                    </button>
                    <button className='btn btn-outline-secondary width-fit-content-button fs-13' onClick={() => handleDrawer(true)}>
                        <MdLock className='me-1 mb-1 color-black' fontSize={20} />
                        Change Password
                    </button>
                </div>
            </div>
            <hr />
            <div className="row w-100 h-90">
                <div className='col-5 d-flex justify-content-start flex-column text-justify m-4'>
                    <h6 className='mt-2 text-start'>Language Preference</h6>
                    <Select
                        options={settings?.languages}
                        value={usersettings?.language}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='language'
                    />
                    <h6 className='mt-2 text-start'>Currency Preference</h6>
                    <Select
                        options={settings?.currencies}
                        value={usersettings?.currency}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='currency'
                    />
                    <h6 className='mt-2 text-start'>Location Focus</h6>
                    <Select
                        options={settings?.locations}
                        value={usersettings?.location}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='location'
                    />
                    <h6 className='mt-2 text-start'>Notifications</h6>
                    <div className='d-flex justify-content-between align-items-center px-3 py-2 input-div'>
                        <h6 className='color-black m-0' >Receive email notifications</h6>
                        <Switch
                            isChecked={isChecked}
                            toggleSwitch={toggleSwitch}
                            name='email_notification'
                        />
                    </div>
                </div>
            </div>
            {open && (<ChangePassword open={open} handleUpdateClick={handleUpdateClick} handleDrawer={handleDrawer} handleShowModal={handleShowModal} />)}
            {editMode && (<WIPDrawer open={editMode} title='Edit Settings' closeWIPDrawer={handleEditClick} />)}
            {showModal && <UpdateSuccessModal showModal={showModal} handleShowModal={handleShowModal} />}
        </div>
    )
}

export default Settings;

