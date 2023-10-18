import React, { useState, useEffect } from 'react';
import '../../../styles/main.css';
import { families } from '../../../utils/constants/Constants';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import Select, { SelectSize } from '../../ui/select/Select';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { BiMenuAltLeft } from 'react-icons/bi';
import { useStoriesService } from '../../../services';
import { storiesState, spinnerState } from "../../../states";
import { useRecoilState, useSetRecoilState } from "recoil";
import familySkeleton from '../../../utils/images/family-skeleton.png';
interface FamiliesDetailsContainerProps {
    handleFamilyVisible: (data: any ,index: number) => void;
}


const FamiliesDetailsContainer: React.FC<FamiliesDetailsContainerProps> = ({ handleFamilyVisible }) => {
    //function to get all the stories
    const storiesService = useStoriesService();
    const [stories] = useRecoilState(storiesState);
    const setSpinner = useSetRecoilState(spinnerState);
    const [previousDisabled, setPreviousDisabled] = useState(true);
    const [nextDisabled, setNextDisabled] = useState(true);
    const [paginationData, setPaginationData] = useState<{ geoCode: number, pageNumber: number, storiesPerPage: number }>({ geoCode: 1, pageNumber: 1, storiesPerPage: 2 });
    const [iterator, setIterator] = useState(0);

    const storiesSelectOptions = [
        { key: 2, value: 2 },
        { key: 5, value: 5 },
        { key: 10, value: 10 }
    ];
    const handleChangeData = (event: any) => {
        const value = Number(event.target.value);
        setPaginationData((prevPaginationData) => ({
            ...prevPaginationData,
            storiesPerPage: value,
            pageNumber: 1
        }));
        setIterator(0);
    };


    const totalStories = stories.totalStories;
    const totalPages = Math.ceil(totalStories / paginationData.storiesPerPage);

    const handlePreviousDisabled = () => {
        if (paginationData.pageNumber === 1) {
            setPreviousDisabled(true);
        }
        else {
            setPreviousDisabled(false);
        }
    };
    const handleNextDisabled = () => {
        if (paginationData.pageNumber === totalPages) {
            setNextDisabled(true);
        }
        else {
            setNextDisabled(false);
        }
    };
    const handleNextClick = () => {
        paginationData.pageNumber = paginationData.pageNumber + 1;
        setIterator(iterator+1);
        storiesService.getAllStories(paginationData);

    };
    const handlePreviousClick = () => {
        paginationData.pageNumber = paginationData.pageNumber - 1;
        setIterator(iterator-1);
        storiesService.getAllStories(paginationData);

    };

    useEffect(() => {
        setSpinner(true);
        handlePreviousDisabled();
        handleNextDisabled();
        storiesService.getAllStories(paginationData);
    }, [paginationData.storiesPerPage, paginationData.pageNumber]);

    return (
        <div className='col-9 ps-2 mb-5 pb-5 h-100'>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <Heading
                    title={`Families in ${families.place}`}
                    type={TypographyType.h2}
                    colour={TypographyColor.dark}
                    classname='text-start mt-4'
                /><BiMenuAltLeft fontSize={22} />
            </div>

            <div className='w-100 h-75 mb-5 pb-5 w-100 d-flex justify-content-around' style={{ overflow: 'auto' }}>
                <div className='row mb-5 pb-5 w-100' style={{ marginBottom: '5rem' }}>
                    {stories?.family?.map((data, index) => (
                        <div className='col-4 px-0 cursor-pointer'>
                            <Card size={CardSize.medium} variant={CardVariant.bordered} classname='m-2 mb-4' onClick={() => handleFamilyVisible(data, index)}>
                                <img className="rounded-top" style={{ width: '100%', height: '60%', objectFit: 'cover' }} src={data.properties.image ? data.properties.image : familySkeleton} alt="Family image" />
                                <div className="text-start p-3">
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <Heading
                                            title={data.properties.familyName}
                                            type={TypographyType.h3}
                                            colour={TypographyColor.dark}
                                            classname='text-start'
                                        />
                                        <p className='mx-0 mb-1 fs-11 color-green-0 bg-green-7 px-2 py-1 rounded'>{data.properties.familyDetails.familyMembers ? data.properties.familyDetails.familyMembers : '_ _'} Members</p>
                                    </div>
                                    <p className="card-text text-left fs-12 mb-2">{data.properties.district}, {data.properties.state}, {data.properties.country}</p>
                                    {(data.properties.familyDetails.familyMembers) &&
                                        (<div>
                                            <p className='mx-0 mb-1 fs-11'><span className='fs-14 me-1 bold-text color-green-0'>${data.properties.familyDetails.householdSpend ? data.properties.familyDetails.householdSpend : '_ _'}</span>Annual Household Spend on Education</p>
                                        </div>)
                                    }
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-100 bg-white my-5 d-flex flex-row justify-content-between rounded p-2">
                <div className='w-auto d-flex flex-row justify-content-start align-items-center'>
                    <p className='fs-12 m-2'>Stories per page</p>
                    <Select
                        options={storiesSelectOptions}
                        onChange={(e) => handleChangeData(e)}
                        value={paginationData.storiesPerPage}
                        labelKey='key'
                        valueKey='value'
                        size={SelectSize.small}
                        name='role'
                        classname='width-5 ps-2'
                    />
                    <p className='fs-12 my-2 ms-2'>{iterator*paginationData.storiesPerPage+1} - {iterator*paginationData.storiesPerPage+paginationData.storiesPerPage} of {stories?.totalStories} items</p>
                </div>
                <div className='w-auto d-flex flex-row justify-content-around align-items-center'>
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.default}
                        variant={ButtonVariant.transparent}
                        disabled={previousDisabled}
                        onClick={() => handlePreviousClick()}
                        classname='m-0 h-auto'
                    >
                        <BsArrowLeft className='me-2 mb-1' fontSize={22} />
                        Previous
                    </Button>
                    <div className='d-flex flex-row justify-content-around align-items-center mx-2 h-auto fs-12'>
                        <span className='border rounded mx-1 px-2 py-1'>{paginationData?.pageNumber}</span>  of {totalPages}
                    </div>
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.default}
                        variant={ButtonVariant.transparent}
                        disabled={nextDisabled}
                        onClick={() => handleNextClick()}
                        classname=' m-0'
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
