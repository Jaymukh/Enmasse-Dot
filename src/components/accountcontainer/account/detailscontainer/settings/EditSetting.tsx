import React from 'react'
import '../../../../../styles/main.css';
import Drawer from '../../../../ui/Drawer';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import WorkInProgressImage from '../../../../../utils/images/work_in_progress.svg';
import Body, {BodyType, BodyColor } from '../../../../ui/typography/Body';

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
                        <img src={WorkInProgressImage} className="card-img-top" alt="Work In Progress" width="100%" />
                        <div className="card-body">
                            <Heading
                                title='Work in progress'
                                type={TypographyType.h6}
                                colour={TypographyColor.dark}
                            />
                            <Body 
                            type={BodyType.p3}
                            color={BodyColor.dark}
                            classname=''>
                            Our team is actively developing these features for the upcoming updates. Keep an eye out for more information.
                        </Body>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default EditSetting;
