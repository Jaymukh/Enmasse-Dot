/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate, useSearchParams } from 'react-router-dom';

// CSS
import '../../../styles/main.css';

// Components
import FamilyDetailsContainer from './FamilyDetailsContainer';
import DistrictSidebar from './DistrictSidebar';
import FamilySidePanel from './FamilySidePanel';
import { storiesState } from '../../../states';

// Utilities
import { RouteConstants } from '../../../constants';
import { useStoriesService } from '../../../services';
import { useMapHelpers } from '../../../helpers';
import FamilyHeader from '../FamilyHeader';

interface FamilyProps {
    selectedFamily: number;
    handleCarouselSlide: (selectedFamily: number) => void;
    selectedData: any;
    handleBackClick: () => void;
    iterator: number;
}

const Family = () => {
    const navigate = useNavigate();
    const storiesService = useStoriesService();
    const stories = useRecoilValue(storiesState);
    const [searchParams, setSearchParams] = useSearchParams();
    const { getSelectedObject } = useMapHelpers();
    const [pageInfo, setPageInfo] = useState<any>(getSelectedObject());
    const [selectedStory, setSelectedStory] = useState<{ index: number, story: any }>({ index: Number(searchParams.get('story_id')) - 1, story: {} });

    const handleCarouselSlide = (index: number) => {
        setPageInfo({
            ...pageInfo,
            story_id: (index + 1)
        })
        setSelectedStory({
            index: index,
            story: stories?.family[index]
        });
    };

    const handleBackClick = () => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete('story_id');
        navigate({
            pathname: RouteConstants.stories,
            search: `?${currentParams.toString()}`,
        });
    }

    useEffect(() => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete('story_id');
        let queryParams: any = {};
        currentParams.toString().split('&').forEach((param) => {
            let [key, value]: any = param.split('=');
            value = Number(value) ? Number(value) : value;
            queryParams[key] = value;
        });
        storiesService.getAllStories(queryParams);
    }, []);

    useEffect(() => {
        if (pageInfo.story_id && stories?.family && stories?.family.length > 0) {
            setSelectedStory((prevData: any) => ({
                ...prevData,
                story: stories?.family[pageInfo.story_id - 1]
            }));
        }
    }, [pageInfo.story_id, stories?.family]);

    useEffect(() => {
        if (pageInfo) {
            const currentParams = new URLSearchParams();
            for (const key in pageInfo) {
                if (pageInfo[key]) {
                    currentParams.set(key, pageInfo[key].toString());
                }
            }
            setSearchParams(currentParams);
        }
    }, [pageInfo]);

    return (
        <div className='row w-100 m-0'>
            <div className='col-9 p-0'>
                <FamilyHeader />
                <div className='row w-100 m-0' style={{ height: '86.25vh' }}>
                    <FamilySidePanel selectedStory={selectedStory} handleCarouselSlide={handleCarouselSlide} iterator={pageInfo.story_id} handleBackClick={handleBackClick} />
                    <FamilyDetailsContainer selectedData={selectedStory?.story} />
                </div>
            </div>
            <div className='col-3 p-0 bg-white' style={{ height: '91.75rem' }}>
                <DistrictSidebar />
            </div>
        </div>
    );
}

export default Family;
