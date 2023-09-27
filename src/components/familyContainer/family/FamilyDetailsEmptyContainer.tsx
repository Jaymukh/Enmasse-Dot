import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../utils/lotties/lotties.json';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';


interface FamilyDetailsEmptyContainerProps {
    selectedData: any;
    handleBackClick: () => void;
}

const FamilyDetailsEmptyContainer: React.FC<FamilyDetailsEmptyContainerProps> = ({ selectedData, handleBackClick }) => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    return (
        <div className='col-6 py-2 my-3' style={{ height: '98%', overflow: 'auto' }}>
            <Card size={CardSize.default} variant={CardVariant.bordered} classname='mb-5 py-3 mt-1'>
            {/* <div className='card fam-details-card white-bg mb-3 my-4'> */}
                <div className='d-flex flex-row mx-2 p-3'>
                    <h5 className="card-title">{selectedData.properties.familyName}</h5>
                    <h6 className="card-title text-muted mx-2 my-1">{selectedData.address}</h6>
                </div>
                <div className="card-body d-flex flex-column justify-content-center align-items-center pt-0">
                    <Lottie
                        options={defaultOptions}
                        height={200}
                        width={200}
                    />
                    <p className=" card-text OneFamilyCardText p-1 my-2 fs-20">Building conversations, capturing stories</p>
                    <Button
                        theme={ButtonTheme.secondary}
                        size={ButtonSize.default}
                        variant={ButtonVariant.contained}
                        onClick={() => handleBackClick()}
                    >
                        View all families
                    </Button>
                </div>
            {/* </div> */}
            </Card>
        </div >
    )
}

export default FamilyDetailsEmptyContainer;
