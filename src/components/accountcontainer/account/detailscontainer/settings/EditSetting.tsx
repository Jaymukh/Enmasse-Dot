import React from 'react'
import '../../../../../App.css';
import Drawer from '../../../../ui/Drawer';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
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
                            <Heading
                                title='Work in progress'
                                type={TypographyType.h5}
                                colour={TypographyColor.dark}
                            />
                            <p className="card-text">Our team is actively developing these features for the upcoming updates. Keep an eye out for more information.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default EditSetting;
