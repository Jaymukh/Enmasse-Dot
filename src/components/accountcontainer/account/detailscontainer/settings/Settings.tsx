import React, { useState, useEffect } from 'react';
import '../../../../../App.css';
import { MdModeEdit } from 'react-icons/md';
import { MdLock } from 'react-icons/md';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
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
    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
            '& .MuiSwitch-thumb': {
                width: 15,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
                transform: 'translateX(12px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#000000',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 12,
            height: 12,
            borderRadius: 6,
            transition: theme.transitions.create(['width'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor:
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
            boxSizing: 'border-box',
        },
    }));

    // handle edit
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    // all settings's data
    const settings: SettingsData = useRecoilValue(AllSettingsState);
    const [usersettings, setUserSettings] = useRecoilState<UserSettings>(UserSettingsState);
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
                    <h6 className='mt-2 text-start'>Language</h6>
                    <Select
                        options={settings?.languages}
                        value={usersettings?.language}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='language'
                    />
                    <h6 className='mt-2 text-start'>Currency</h6>
                    <Select
                        options={settings?.currencies}
                        value={usersettings?.currency}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='currency'
                    />
                    <h6 className='mt-2 text-start'>Location</h6>
                    <Select
                        options={settings?.locations}
                        value={usersettings?.location}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='location'
                    />
                    <Stack direction="row" alignItems="center" className='btn-outline-black d-flex justify-content-between mt-4 inputBoxHeight'>
                        <h6 className='color-black' >Receive email notifications</h6>
                        <AntSwitch name='email_notification' inputProps={{ 'aria-label': 'ant design' }} checked={usersettings.email_notification} />
                    </Stack>
                </div>
            </div>
            {open && (<ChangePassword open={open} handleUpdateClick={handleUpdateClick} handleDrawer={handleDrawer} handleShowModal={handleShowModal} />)}
            {editMode && (<WIPDrawer open={editMode} title='Edit Settings' closeWIPDrawer={handleEditClick} />)}
            {showModal && <UpdateSuccessModal showModal={showModal} handleShowModal={handleShowModal} />}
        </div>
    )
}

export default Settings;

