import React, { useState, useEffect } from 'react';
import Drawer from '../../../../ui/Drawer';
import * as Constants from '../../../../../utils/constants/Constants';
import '../../../../../App.css';
import { useRecoilValue } from "recoil";
import { useSettingsService } from '../../../../../services';
import { AllSettingsState, User } from "../../../../../states";
import Select, { SelectSize } from '../../../../ui/select/Select';

interface EditInviteProps {
    selectedData: User;
    handleCloseDialog: () => void;
    handleUpdate: (updatedRow: User) => void;
}

const EditInvite: React.FC<EditInviteProps> = ({
    selectedData,
    handleCloseDialog,
    handleUpdate
}) => {
    // all settings's data
    const settingsService = useSettingsService();
    const settings = useRecoilValue(AllSettingsState);

    //function to get all the settings details
    useEffect(() => {
        settingsService.getAllSettings();
    }, []);

    // State variables for managing the input
    const [updatedData, setUpdatedData] = useState<User>(selectedData);

    const handleChangeData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const name = e.target.name as keyof User; // Explicitly cast to the known keys of User
        const value = e.target.value;
        setUpdatedData({ ...updatedData, [name]: value });
    }

    const handleUpdateClick = () => {
        handleUpdate(updatedData);
    };
    return (
        <div className=''>
            <Drawer
                id='edit'
                title='Edit'
                isOpen={selectedData !== null}
                toggleFunction={handleCloseDialog}
            >
                <div className='d-flex justify-content-center flex-column mx-3'>
                    <h6 className='mt-1 font-87-5 text-start'>Name</h6>
                    <input type="text" placeholder="Enter your name" value={updatedData.name} name='name'
                        onChange={(e) => handleChangeData(e)} className='mb-2  p-2 btn-outline-black drawer-input-box-height' />
                    <h6 className='mt-1 font-87-5 text-start'>Email</h6>
                    <input type="email" placeholder="Enter your Email ID" value={updatedData.email_id} name='email_id'
                        onChange={(e) => handleChangeData(e)} className='mb-2  p-2 btn-outline-black drawer-input-box-height' />
                    <h6 className='mt-1 font-87-5 text-start'>Role</h6>
                    <Select
                        options={settings?.roles}
                        onChange={(e) => handleChangeData(e)}
                        value={updatedData?.role}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='role'
                    />
                    <h6 className='mt-1 font-87-5 text-start'>Company</h6>
                    <Select
                        options={Constants?.company}
                        value={updatedData?.company}
                        labelKey='value'
                        valueKey='value'
                        size={SelectSize.large}
                        name='company'
                    />
                    <h6 className='mt-1 font-87-5 text-start'>CompanyType</h6>
                    <Select
                        options={settings?.company_types}
                        value={updatedData?.company_type}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='company_type'
                    />
                    <button className='btn-black bg-dark border-0 drawer-input-box-height mt-2 mb-3 my-4' onClick={handleUpdateClick}>Update</button>
                </div>
            </Drawer>
        </div>
    );
}

export default EditInvite;

