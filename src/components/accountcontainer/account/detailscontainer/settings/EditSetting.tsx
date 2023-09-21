import React from 'react'
import '../../../../../App.css';
import Drawer from '../../../../ui/Drawer';
import WorkInProgressImage from '../../../../../utils/images/work_in_progress.svg';

interface EditSettingProps {
    editMode: boolean;
    handleEditClick: (editMode: boolean) => void;
}

const EditSetting: React.FC<EditSettingProps> = ({ editMode, handleEditClick }) => {
    return (
        <Drawer
                id='edit-setting'
                title='Edit Setting'
                isOpen={editMode}
                toggleFunction={handleEditClick}
            >
                <div className='d-flex justify-content-center flex-column'>
                    <div className="d-flex justify-content-center p-5">
                        <div className="" style={{ width: '18rem' }}>
                            <img src={WorkInProgressImage} className="card-img-top" alt="Image" width="100%" />
                            <div className="card-body">
                                <h5 className="card-title">Work in progress</h5>
                                <p className="card-text">Our team is actively developing these features for the upcoming updates. Keep an eye out for more information.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
    )
}

export default EditSetting;
