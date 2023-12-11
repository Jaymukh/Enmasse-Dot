// External libraries
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// CSS
import '../../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../../ui/typography/Body';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';

// Utilities
import { useMapHelpers } from '../../../helpers';
import { useMapsService } from '../../../services';

interface FamilyDetailsContainerProps {
    selectedData: any; // Update with appropriate type
}

const FamilyDetailsContainer: React.FC<FamilyDetailsContainerProps> = ({ selectedData }) => {
    const { getCurrencyWithSymbol, getCoreSolutions } = useMapHelpers();
    const [searchParams, setSearchParams] = useSearchParams();
    const mapServices = useMapsService();

    useEffect(() => {
        mapServices?.getCifData(Number(searchParams.get('geo_code')!));
    }, []);
    
    return (
        <div className='col-lg-8 col-md-8 col-sm-12 py-2 my-3 no-scrollbar' style={{ height: '100%', overflow: 'auto' }}>
            <Card size={CardSize.default} variant={CardVariant.contained} classname='mb-5 mt-1 p-3'>
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
                            {selectedData?.address}
                        </Body>
                    </div>
                    <div className="d-flex flex-column align-items-end justify-content-start  text-end">
                        {getCoreSolutions(selectedData?.familyDetails)?.name &&
                            <>
                                <Heading
                                    title={getCoreSolutions(selectedData?.familyDetails)?.value}
                                    type={TypographyType.h5}
                                    colour={TypographyColor.primary}
                                    classname='me-1 my-0'
                                />
                                <Body
                                    type={BodyType.p4}
                                    color={BodyColor.secondary}
                                >
                                    Annual Household Spend on {getCoreSolutions(selectedData?.familyDetails)?.name}
                                </Body>
                            </>
                        }
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between my-2">

                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <Heading
                            title={getCurrencyWithSymbol(selectedData?.familyDetails?.familyMembers)}
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
                </div >
                <div className="card-body text-start">
                    {selectedData?.image && selectedData?.image[0] &&
                        <img src={selectedData?.image[0]} alt="Family" width="100%" height="auto" className='rounded imgBorderRadious my-2' />
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
                            <img src={selectedData?.image[1]} alt="Family" width="50%" height="auto" className='rounded imgBorderRadious me-1' />
                        }
                        {selectedData?.image && selectedData?.image[2] &&
                            <img src={selectedData?.image[2]} alt="Family" width="50%" height="auto" className='rounded imgBorderRadious' />
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
