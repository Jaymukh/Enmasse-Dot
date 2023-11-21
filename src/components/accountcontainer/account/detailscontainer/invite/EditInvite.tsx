/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Drawer from '../../../../ui/Drawer';
import '../../../../../App.css';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useSettingsService } from '../../../../../services';
import { AllSettingsState, User, errorState } from "../../../../../states";
import Select, { SelectSize } from '../../../../ui/select/Select';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Input } from '../../../../ui/input/Input';

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
    const setError = useSetRecoilState(errorState);

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
        if(updatedData.name && updatedData.email_id && updatedData.company && updatedData.role && updatedData.company_type){
            handleUpdate(updatedData);
        }        
        else{
            setError({ type: 'Error', message: 'All fields are mendatory!' });
        }
    };
    return (
        <div className=''>
            <Drawer
                id='edit'
                title='Edit'
                isOpen={selectedData !== null}
                toggleFunction={handleCloseDialog}
            >
                <div className='d-flex justify-content-center flex-column'>
                    <h6 className='mt-1 font-87-5 text-start'>Name*</h6>
                    <Input
                        type="text"
                        placeholder="Enter your name"
                        value={updatedData.name}
                        name='name'
                        onChange={(e) => handleChangeData(e)}
                    />
                    <h6 className='mt-1 font-87-5 text-start'>Email*</h6>
                    <Input
                        type="email"
                        placeholder="Enter your Email ID"
                        value={updatedData.email_id}
                        name='email_id'
                        onChange={(e) => handleChangeData(e)}
                    />
                    <h6 className='mt-1 font-87-5 text-start'>Company*</h6>
                    <Input
                        type="text"
                        placeholder="Enter your company"
                        value={updatedData?.company}
                        name='company'
                        onChange={(e) => handleChangeData(e)}
                    />
                    {/* <Select
                        options={Constants?.company}
                        value={updatedData?.company}
                        labelKey='value'
                        valueKey='value'
                        size={SelectSize.large}
                        name='company'
                    /> */}
                    <h6 className='mt-1 font-87-5 text-start'>CompanyType*</h6>
                    <Select
                        options={settings?.company_types}
                        value={updatedData?.company_type}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='company_type'
                    />
                    <h6 className='mt-1 font-87-5 text-start'>Role*</h6>
                    <Select
                        options={settings?.roles}
                        onChange={(e) => handleChangeData(e)}
                        value={updatedData?.role}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='role'
                    />
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.large}
                        variant={ButtonVariant.bordered}
                        onClick={() => handleUpdateClick()}
                        classname='my-4 height-3'
                    >
                        Update
                    </Button>
                </div>
            </Drawer>
        </div>
    );
}

export default EditInvite;

