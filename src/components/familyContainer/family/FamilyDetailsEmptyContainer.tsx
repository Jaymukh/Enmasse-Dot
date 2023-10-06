import React from 'react';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import CheckGIF from "../../../utils/images/CheckMarkGIF.gif";


interface FamilyDetailsEmptyContainerProps {
    selectedData: any;
    handleBackClick: () => void;
}

const FamilyDetailsEmptyContainer: React.FC<FamilyDetailsEmptyContainerProps> = ({ selectedData, handleBackClick }) => {

    return (
        <div className='col-6 py-2 my-3' style={{ height: '98%', overflow: 'auto' }}>
            <Card size={CardSize.default} variant={CardVariant.bordered} classname='mb-5 py-3 mt-1'>
                {/* <div className='card fam-details-card white-bg mb-3 my-4'> */}
                <div className='d-flex flex-row mx-2 p-3'>
                    <Heading
                        title={selectedData.properties.familyName}
                        type={TypographyType.h3}
                        colour={TypographyColor.dark}
                    />
                    <h6 className="card-title text-muted mx-2 my-1">{selectedData.address}</h6>
                </div>
                <div className="card-body d-flex flex-column justify-content-center align-items-center pt-0">
                    <div className='d-flex justify-content-center'>
                        <img src={CheckGIF} alt="Created Successfully GIF" height={200} width={200} ></img>
                    </div>
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
