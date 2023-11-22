/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import '../../../styles/main.css';
import { storiesSelectOptions } from '../../../utils/constants/Constants';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import Select, { SelectSize } from '../../ui/select/Select';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import { useStoriesService } from '../../../services';
import { storiesState } from "../../../states";
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useRecoilState } from "recoil";
import { useNavigate, useSearchParams } from 'react-router-dom';
import familySkeleton from '../../../utils/images/family-skeleton.png';
import FamiliesSorting from './FamiliesSorting';
import { RouteConstants } from '../../../constants';
import { useMapHelpers } from '../../../helpers';

const FamiliesDetailsContainer = () => {
    const navigate = useNavigate();
    const storiesService = useStoriesService();
    const [searchParams, setSearchParams] = useSearchParams();
    const [stories] = useRecoilState(storiesState);
    const { getCurrencyWithSymbol, getSelectedObject } = useMapHelpers();
    const [paginationData, setPaginationData] = useState<any>(getSelectedObject());
    // const setSpinner = useSetRecoilState(spinnerState);
    // const { getCurrencyWithSymbol } = useMapHelpers();
    // const [previousDisabled, setPreviousDisabled] = useState(true);
    // const [nextDisabled, setNextDisabled] = useState(true);
    // const [paginationData, setPaginationData] = useState<{ geoCode: number, pageNumber: number, storiesPerPage: number }>({ geoCode: Number(searchParams.get('geo_code')), pageNumber: 1, storiesPerPage: 2 });
    const [iterator, setIterator] = useState(0);
    const [totalStoryInfo, setTotalStoryInfo] = useState<{ totalStories: number, totalPages: number }>({ totalStories: 0, totalPages: 0 })

    const handleChangeData = (event: any) => {
        const value = Number(event.target.value);
        setPaginationData((prevPaginationData: any) => ({
            ...prevPaginationData,
            storiespp: value,
            page_no: 1
        }));
        setIterator(0);
    };

    const handleFamilyVisible = (data: any, index: number) => {
        searchParams.set('story_id', (index + 1).toString());
        setSearchParams(searchParams);
        navigate({
            pathname: RouteConstants.story_details,
            search: `?${searchParams.toString()}`,
        });
    };

    const handleNextClick = () => {
        setPaginationData((prevData: any) => ({
            ...prevData,
            page_no: paginationData.page_no + 1
        }));
        setIterator(iterator + 1);

    };
    const handlePreviousClick = () => {
        setPaginationData((prevData: any) => ({
            ...prevData,
            page_no: paginationData.page_no - 1
        }));
        setIterator(iterator - 1);
    };

    const handlePaginationData = (data: any) => {
        let newPaginationData = { ...paginationData };
        delete newPaginationData['reverse'];
        data.forEach((item: any) => newPaginationData = { ...newPaginationData, ...item });
        setPaginationData(newPaginationData);
    }

    useEffect(() => {
        setTotalStoryInfo({
            totalPages: Math.ceil(totalStoryInfo.totalStories / paginationData.storiespp),
            totalStories: stories.totalStories
        });
    }, [stories.totalStories, paginationData, totalStoryInfo.totalStories])

    useEffect(() => {
        if (paginationData) {
            storiesService.getAllStories(paginationData);
            const currentParams = new URLSearchParams();
            for (const key in paginationData) {
                if (paginationData[key]) {
                    currentParams.set(key, paginationData[key].toString());
                }
            }
            setSearchParams(currentParams);
        }
    }, [paginationData])

    return (
        <div className='col-9 ps-4 mb-5 py-0 h-100'>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <Heading
                    title={`Families in ${stories?.properties?.name}`}
                    type={TypographyType.h2}
                    colour={TypographyColor.dark}
                    classname='text-start mt-4 ms-2'
                />
                <FamiliesSorting handlePaginationData={handlePaginationData} />
            </div>
            <div className='w-100 h-100 mb-5 pb-5 w-100 d-flex flex-column justify-content-between no-scrollbar' style={{ overflow: 'auto' }}>
                <div className='row m-0 p-0 w-100' style={{ marginBottom: '5rem' }}>
                    {stories?.family?.map((data, index) => (
                        <div className='col-4 px-0 cursor-pointer'>
                            <Card size={CardSize.medium} variant={CardVariant.bordered} classname='m-2 mb-4' onClick={() => handleFamilyVisible(data, index)}>
                                <img className="rounded-top" style={{ width: '100%', height: '60%', objectFit: 'cover', minHeight: '9rem' }} src={data?.image && data?.image[0] ? data?.image[0] : familySkeleton} alt={data?.familyName} />
                                <div className="text-start p-3">
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <Heading
                                            title={data?.familyName}
                                            type={TypographyType.h3}
                                            colour={TypographyColor.dark}
                                            classname='text-start'
                                        />
                                        <p className='mx-0 mb-1 fs-11 color-green-0 bg-green-1 px-2 py-1 rounded'>{data?.familyDetails.familyMembers ? data?.familyDetails.familyMembers : '_ _'} Members</p>
                                    </div>
                                    <p className="card-text text-left fs-12 mb-2">{data?.district}, {data?.state}, {data?.country}</p>
                                    {(data?.familyDetails.familyMembers) &&
                                        (<div>
                                            <p className='mx-0 mb-1 fs-11'><span className='fs-14 me-1 bold-text color-green-0'>{getCurrencyWithSymbol(data?.familyDetails.householdSpend, data?.familyDetails.spendUOM)}</span>Annual Household Spend on Education</p>
                                        </div>)
                                    }
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
                <div className="w-100 bg-white m-0 mb-5 d-flex flex-row justify-content-between rounded p-2 ms-2">
                    <div className='w-auto d-flex flex-row justify-content-start align-items-center'>
                        <p className='fs-12 m-2'>Stories per page</p>
                        <Select
                            options={storiesSelectOptions}
                            onChange={(e) => handleChangeData(e)}
                            value={paginationData.storiespp}
                            labelKey='key'
                            valueKey='value'
                            size={SelectSize.small}
                            name='role'
                            classname='width-5 ps-2'
                        />
                        <p className='fs-12 my-2 ms-2'>{iterator * paginationData.storiespp + 1} - {((iterator * paginationData.storiespp + paginationData.storiespp) < (stories?.totalStories)) ? (iterator * paginationData.storiespp + paginationData.storiespp) : (stories?.totalStories)} of {stories?.totalStories} items</p>
                    </div>
                    <div className='w-auto d-flex flex-row justify-content-around align-items-center'>
                        <Button
                            theme={paginationData.page_no === 1 ? ButtonTheme.muted : ButtonTheme.primary}
                            size={ButtonSize.default}
                            variant={ButtonVariant.transparent}
                            disabled={paginationData.page_no === 1}
                            onClick={() => handlePreviousClick()}
                            classname='m-0 h-auto'
                        >
                            <BsArrowLeft className='me-2 mb-1' fontSize={22} />
                            Previous
                        </Button>
                        <div className='d-flex flex-row justify-content-around align-items-center mx-2 h-auto fs-12'>
                            <span className='border rounded mx-1 px-2 py-1'>{paginationData?.page_no}</span>  of {totalStoryInfo.totalPages}
                        </div>
                        <Button
                            theme={paginationData.page_no === totalStoryInfo.totalPages ? ButtonTheme.muted : ButtonTheme.primary}
                            size={ButtonSize.default}
                            variant={ButtonVariant.transparent}
                            disabled={paginationData.page_no === totalStoryInfo.totalPages}
                            onClick={() => handleNextClick()}
                            classname=' m-0'
                        >
                            Next
                            <BsArrowRight className='ms-2 mb-1' fontSize={22} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FamiliesDetailsContainer;
