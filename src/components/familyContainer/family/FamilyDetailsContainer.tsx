import React, { useEffect } from 'react';
import '../../../styles/main.css';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../../ui/typography/Body';
import { useMapHelpers } from '../../../helpers';
import { useSearchParams } from 'react-router-dom';
import { useMapsService } from '../../../services';

interface FamilyDetailsContainerProps {
    selectedData: any; // Update with appropriate type
}

const FamilyDetailsContainer: React.FC<FamilyDetailsContainerProps> = ({ selectedData }) => {
    const { getCurrencyWithSymbol } = useMapHelpers();
    const [searchParams, setSearchParams] = useSearchParams();
    const mapServices = useMapsService();

    useEffect(() => {
        mapServices?.getCifData(Number(searchParams.get('geo_code')!));
    }, []);
    return (
        <div className='col-6 py-2 my-3 no-scrollbar' style={{ height: '98%', overflow: 'auto' }}>
            <Card size={CardSize.default} variant={CardVariant.bordered} classname='mb-5 mt-1 p-3'>
                <div className='d-flex flex-row justify-content-between pb-1'>
                    <div className="d-flex flex-column align-items-start justify-content-start text-start">
                        <Heading
                            title={selectedData?.familyName}
                            type={TypographyType.h4}
                            colour={TypographyColor.dark}
                            classname='mb-0'
                        />
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.dark}
                            classname='mt-0' >
                            {selectedData?.district}, {selectedData?.state}, {selectedData?.country}
                        </Body>
                    </div>
                    <div className="d-flex flex-column align-items-end justify-content-start  text-end">
                        <span className='fs-14 me-1 bold-text color-green'>{getCurrencyWithSymbol(selectedData?.familyDetails?.householdSpend, selectedData?.familyDetails?.spendUOM)}</span>
                        <Body
                            type={BodyType.p4}
                            color={BodyColor.secondary}
                        >
                            Annual Household Spend on Education
                        </Body>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between my-2">
                    {
                        selectedData?.familyDetails?.familyMembers &&
                        <div className="d-flex flex-row justify-content-center align-items-center">
                            <Heading
                                title={selectedData?.familyDetails?.familyMembers}
                                type={TypographyType.h5}
                                colour={TypographyColor.dark}
                                classname='m-0 me-1'
                            />
                            <Body
                                type={BodyType.p4}
                                color={BodyColor.secondary}
                                classname='m-0'>
                                Family members
                            </Body>
                        </div>
                    }
                    {
                        selectedData?.familyDetails?.householdSpend &&
                        <div className="d-flex flex-row justify-content-center align-items-center">
                            <Heading
                                title={getCurrencyWithSymbol(selectedData?.familyDetails?.householdSpend, selectedData?.familyDetails?.spendUOM)}
                                type={TypographyType.h5}
                                colour={TypographyColor.dark}
                                classname='m-0 me-1'
                            />
                            <Body
                                type={BodyType.p4}
                                color={BodyColor.secondary}
                                classname='m-0'>
                                Household Spend
                            </Body>

                        </div>
                    }
                    {
                        selectedData?.familyDetails?.householdBorrowing &&
                        <div className="d-flex flex-row justify-content-center align-items-center">
                            <Heading
                                title={getCurrencyWithSymbol(selectedData?.familyDetails?.householdBorrowing, selectedData?.familyDetails?.borrowUOM)}
                                type={TypographyType.h5}
                                colour={TypographyColor.dark}
                                classname='m-0 me-1'
                            />
                            <Body
                                type={BodyType.p4}
                                color={BodyColor.secondary}
                                classname='m-0'>
                                Household Borrowing
                            </Body>

                        </div>
                    }
                    {
                        selectedData?.familyDetails?.householdIncome &&
                        <div className="d-flex flex-row align-items-center">
                            <Heading
                                title={getCurrencyWithSymbol(selectedData?.familyDetails?.householdIncome, selectedData?.familyDetails?.incomeUOM)}
                                type={TypographyType.h5}
                                colour={TypographyColor.dark}
                                classname='m-0 me-1'
                            />
                            <Body
                                type={BodyType.p4}
                                color={BodyColor.secondary}
                                classname='m-0'>
                                Household Income
                            </Body>
                        </div >
                    }
                </div >
                <div className="card-body text-start">
                    {selectedData?.image && selectedData?.image[0] &&
                        <img src={selectedData?.image[0]} alt="Family" width="100%" height="auto" className='imgBorderRadious my-2' />
                    }
                    {selectedData?.description && selectedData?.description[0]
                        && <Body
                            type={BodyType.p3}
                            color={BodyColor.secondary}
                        >
                            {selectedData?.description[0]}
                        </Body>
                    }
                    <div className='d-flex flex-row justify-content-around my-2'>
                        {selectedData?.image && selectedData?.image[1] &&
                            <img src={selectedData?.image[1]} alt="Family" width="50%" height="auto" className='imgBorderRadious me-1' />
                        }
                        {selectedData?.image && selectedData?.image[2] &&
                            <img src={selectedData?.image[2]} alt="Family" width="50%" height="auto" className='imgBorderRadious' />
                        }
                    </div>
                    {selectedData?.description && selectedData?.description[1]
                        && <Body
                            type={BodyType.p3}
                            color={BodyColor.secondary}
                        >
                            {selectedData?.description[1]}
                        </Body>
                    }
                </div>
            </Card >
        </div >
    );
};

export default FamilyDetailsContainer;
