import React, { useState } from 'react';
import { families } from '../../../utils/constants/Constants';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import Select, { SelectSize } from '../../ui/select/Select';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

interface FamiliesDetailsContainerProps {
    handleFamilyVisible: (index: number) => void;
}


const FamiliesDetailsContainer: React.FC<FamiliesDetailsContainerProps> = ({ handleFamilyVisible }) => {
    const [visibleStories, setVisibleStories] = useState('25');
    const stories = [
        { key: '25', name: '25' },
        { key: '50', name: '50' },
        { key: '75', name: '75' }
    ];
    const handleChangeData = (event: any) => {
        setVisibleStories(event.target.value);

    }
    return (
        <div className='col-9 ps-2 mb-5 pb-5 h-100'>
            <Heading
                title={`Families in ${families.place}`}
                type={TypographyType.h2}
                colour={TypographyColor.dark}
                classname='text-start mt-4'
            />
            <div className='w-100 h-75 mb-5 pb-5 w-100 d-flex justify-content-around' style={{ overflow: 'auto' }}>
                <div className='row mb-5 pb-5 w-100' style={{ marginBottom: '5rem' }}>
                    {families.family.map((data, index) => (
                        <div className='col-4 px-0 cursor-pointer'>
                            <Card size={CardSize.medium} variant={CardVariant.bordered} classname='m-2 mb-4' onClick={() => handleFamilyVisible(index)}>
                                <img className="rounded-top" style={{ width: '100%', height: '60%', objectFit: 'cover' }} src={data.properties.image} alt="Family image" />
                                <div className="text-start p-3">
                                    <Heading
                                        title={data.properties.familyName}
                                        type={TypographyType.h3}
                                        colour={TypographyColor.dark}
                                        classname='text-start'
                                    />
                                    <p className="card-text text-left fs-14 my-2">{data.properties.district}, {data.properties.state}, {data.properties.country}</p>
                                    {(data.properties.familyDetails) &&
                                        (<div>
                                            <p className='mx-0 mb-1 fs-11'><span className='fs-14 me-1 bold-text'>{data.properties.familyDetails.familyMembers ? data.properties.familyDetails.familyMembers : '_ _'}</span> Family Members</p>
                                            <p className='mx-0 mb-1 fs-11'><span className='fs-14 me-1 bold-text  color-green'>{data.properties.familyDetails.householdSpend ? data.properties.familyDetails.householdSpend : '_ _'}</span> Household Spend</p>
                                            <p className='mx-0 mb-1 fs-11'><span className='fs-14 me-1 bold-text'>{data.properties.familyDetails.householdIncome ? data.properties.familyDetails.householdIncome : '_ _'}</span> Household Income</p>
                                        </div>)
                                    }
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-100 h-25 bg-white my-5 d-flex flex-row justify-content-between">
                <div className='w-50 d-flex flex-row'>
                    <p className='fs-12'>Stories per page</p>
                    <Select
                        options={stories}
                        onChange={(e) => handleChangeData(e)}
                        value={visibleStories}
                        labelKey='key'
                        valueKey='key'
                        size={SelectSize.small}
                        name='role'
                        classname='w-25'
                    />
                    <p className='fs-12'>1-25 of 500 items</p>
                </div>
                <div className='w-50 d-flex flex-row justify-content-around align-items-center'>
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.default}
                        variant={ButtonVariant.transparent}
                        classname='m-0 h-auto'
                    >
                        <BsArrowLeft className='me-2 mb-1' fontSize={22} />
                        Previous
                    </Button>
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.default}
                        variant={ButtonVariant.transparent}
                        classname=' '
                    >
                        Next
                        <BsArrowRight className='ms-2 mb-1' fontSize={22} />
                        
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default FamiliesDetailsContainer;
