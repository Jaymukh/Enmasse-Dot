import React from 'react'
import '../../../../../App.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import WorkInProgressImage from '../../../../../utils/images/work_in_progress.svg';

interface EditSettingProps {
    editMode: boolean;
    handleEditClick: (editMode: boolean) => void;
}

const EditSetting: React.FC<EditSettingProps> = ({ editMode, handleEditClick }) => {
    return (
        <div className=''>
            <Drawer
                anchor='right'
                open={editMode}
                onClose={() => handleEditClick(false)}
                className='edit-profile-drawer-width edit-profile-drawer-padding'
            >
                <Box className='d-flex flex-wrap justify-content-between mb-2'>
                    <h5 className=''>
                        Edit Setting
                    </h5>
                    <button className='bg-white border-0'>
                        <CloseIcon onClick={() => handleEditClick(false)} />
                    </button>
                </Box>
                <Box className='d-flex justify-content-center flex-column'>
                    <div className="d-flex justify-content-center p-5">
                        <div className="" style={{ width: '18rem' }}>
                            <img src={WorkInProgressImage} className="card-img-top" alt="Image" width="100%" />
                            <div className="card-body">
                                <h5 className="card-title">Work in progress</h5>
                                <p className="card-text">Our team is actively developing these features for the upcoming updates. Keep an eye out for more information.</p>
                            </div>
                        </div>
                    </div>
                </Box>
            </Drawer>
        </div>
    )
}

export default EditSetting;
