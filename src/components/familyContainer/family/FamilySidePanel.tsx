// External libraries
import React from 'react';
import { useRecoilState } from "recoil";
import { MdOutlineArrowBack, MdOutlineArrowForward } from 'react-icons/md';
import { IoIosArrowRoundForward } from "react-icons/io";


// CSS
import '../../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../../ui/typography/Body';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';
import StaticMap from '../../ui/maps/StaticMap';
import { Legend } from '../../ui/legend/Legend';
import { storiesState } from "../../../states";

// Utilities
import familySkeleton from '../../../utils/images/family-skeleton.png';

interface FamilySidePanelProps {
    selectedStory: { index: number, story: any };
    handleCarouselSlide: (index: number) => void;
    iterator: number;
    handleBackClick: () => void;
}

const FamilySidePanel: React.FC<FamilySidePanelProps> = ({ selectedStory, handleCarouselSlide, iterator, handleBackClick }) => {
    const [stories] = useRecoilState(storiesState);

    return (
        <div className='col-lg-4 col-md-4 col-sm-12 d-flex flex-column my-4 px-3 h-auto'>
            <Card size={CardSize.default} variant={CardVariant.contained} classname='py-3 mx-0 white-bg'>
                <Heading
                    title={stories?.properties?.region}
                    colour={TypographyColor.dark}
                    type={TypographyType.h5}
                    classname='text-start m-0'
                />
                <div className='map-container-sm d-flex mx-auto justify-content-start'>
                    <StaticMap coordinates={selectedStory?.story?.geometry?.coordinates} />
                </div>
                <Legend classname='mt-2' />
            </Card>
            <div className='d-flex flex-row justify-content-center align-items-center my-3 w-100' >
                <button className="PrevBtn"
                    onClick={() => handleCarouselSlide((selectedStory?.index - 1 + stories?.family.length) % stories?.family.length)}
                    type="button"
                >
                    <MdOutlineArrowBack className="iconNextPrev" aria-hidden="true" fontSize={20} />
                </button>
                <div className="h-100" style={{ width: '95%' }}>
                    {stories?.family?.map((data, index) => (
                        <div className={`carousel-item h-100 ${index === selectedStory?.index ? ' active' : ''}`} key={index}>
                            <div className="d-flex flex-row align-items-center h-100 w-100 rounded">
                                <img src={data?.image && data?.image[0] ? data?.image[0] : familySkeleton} width="100" height="100" className="d-block carousel-img rounded-start bg-white" alt="Family" />
                                <div className="d-flex flex-column align-items-start justify-content-center my-auto ps-3 pe-2 w-100 h-100 rounded-end bg-white">
                                    <div className='d-flex flex-row justify-content-end align-items-center w-100 m-auto my-0 py-0' >
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.dark}
                                        >
                                            {iterator}/{stories?.family.length}
                                        </Body>
                                    </div>
                                    <Heading
                                        title={data?.familyName}
                                        type={TypographyType.h4}
                                        colour={TypographyColor.dark}
                                        classname='text-start m-0'
                                    />
                                    <Body
                                        type={BodyType.p3}
                                        color={BodyColor.secondary}
                                        classname='my-1 text-start'
                                    >
                                        {data?.address}
                                    </Body>
                                    <button className='border-0 bg-white color-green m-0 fs-10 p-0 ff-poppins-medium' onClick={handleBackClick}>View all<IoIosArrowRoundForward fontSize={20} fontWeight={500} className='ms-1' /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="NextBtn"
                    onClick={() => handleCarouselSlide((selectedStory?.index + 1 + stories?.family.length) % stories?.family.length)}
                    type="button"
                >
                    <MdOutlineArrowForward className='iconNextPrev' fontSize={20}  aria-hidden="true"></MdOutlineArrowForward>
                </button>
            </div>
        </div >
    );
}

export default FamilySidePanel;
