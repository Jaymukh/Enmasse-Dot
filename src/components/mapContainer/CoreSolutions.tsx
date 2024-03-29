// External libraries
import React, { ChangeEvent, useState } from "react";
import { useRecoilValue } from 'recoil';
import { MdChat, MdLayers } from "react-icons/md";
import { IoChevronForwardSharp } from 'react-icons/io5';
import { PiRadioButtonLight } from 'react-icons/pi';

// CSS
import '../../styles/main.css';

// Components
import RequestLayers from "./RequestLayers";
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyType, TypographyColor } from '../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';
import InfoPanel from '../ui/InfoPanel';
import Switch from '../ui/switch/Switch';
import { Legend } from '../ui/legend/Legend';
import { mapFeatureState } from '../../states';

// Utilities
import * as Constants from '../../utils/constants/Constants';


interface Option {
    label: string;
    key: number;
    type: string;
}

interface CoreSolutionsProps {
    handleChangeRb: (event: ChangeEvent<HTMLInputElement>, option: Constants.Option) => void;
    selectedRb: number;
    isChecked: any;
    toggleSwitch: (event?: React.ChangeEvent<HTMLInputElement>) => void;
    options: Option[];
}

const CoreSolutions: React.FC<CoreSolutionsProps> = ({
    handleChangeRb,
    selectedRb,
    isChecked,
    toggleSwitch,
    options,
}) => {
    const mapFeatures = useRecoilValue(mapFeatureState);
    const [requestLayersDrawerOpen, setRequestLayersDrawerOpen] = useState(false);

    const handleRequestLayersDrawer = (contactUsDrawerOpen: boolean) => {
        setRequestLayersDrawerOpen(contactUsDrawerOpen);
    };
    const handleAnchorClick = (anchor: string) => {
        // For scroll to the anchor/id
        document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='margin-left-3 d-flex flex-column justify-content-between h-100' style={{ overflowX: 'hidden', overflowY: 'auto' }} >
            <div className='margin-top-3'>
                <div className={`margin-top-1 bg-white padding-left-right-2 padding-top-bottom-2 ${!options?.length ? 'disabled-div' : ''}`}>
                    <div className='d-flex align-items-center justify-content-between flexWrap'>
                        <div className='d-flex align-items-center flexWrap'>
                            <PiRadioButtonLight fontSize={22} />
                            <Heading
                                title='Core Solutions'
                                type={TypographyType.h4}
                                colour={TypographyColor.dark}
                                classname='margin-top-bottom-0 margin-left-2 text-start overflow-wrap-anywhere'
                            />
                            <InfoPanel fontSize={20} text='Core Solutions have a strong tendency to grow together' classname='margin-right-1' />
                        </div>
                        <Switch
                            isChecked={isChecked?.coreSolution}
                            toggleSwitch={toggleSwitch}
                            name='coreSolution'
                        />
                    </div>
                </div>
                {isChecked?.coreSolution && options?.length > 0 &&
                    <div className="bg-white margin-top-1 padding-3">
                        {options?.map((option: Option) => (
                            <div className="d-flex flex-row justify-content-start align-items-center margin-top-bottom-2 margin-left-1 flexWrap" key={option.label}>
                                <a href="#" className="" onClick={() => handleAnchorClick(option.type)} style={{ textDecoration: 'none', fontSize: '0.875rem', fontFamily: '"Poppins-Regular", sans-serif', display: 'flex', alignItems: 'center' }}>
                                    <input
                                        id={`radio-${option.key}`}
                                        className="margin-right-2 input-rb"
                                        size={1.5}
                                        type="radio"
                                        value={option.key}
                                        checked={selectedRb === option.key}
                                        onChange={(event) => handleChangeRb(event, option)}
                                    />
                                    <label htmlFor={`radio-${option.key}`}>{option.label}</label>
                                </a>                                
                            </div>
                        ))}
                    </div>
                }
                <div className={`d-flex justify-content-between align-items-center bg-white margin-top-3 padding-left-right-2 padding-top-bottom-2 flexWrap ${!mapFeatures.featuredStories?.featuredStories?.length ? 'disabled-div' : ''}`}>
                    <div className='d-flex align-items-center flexWrap'>
                        <MdChat className='' fontSize={20} />
                        <Heading
                            title='View Stories'
                            type={TypographyType.h4}
                            colour={TypographyColor.dark}
                            classname='margin-top-bottom-0 margin-left-right-2 text-start overflow-wrap-anywhere'
                        />
                        <InfoPanel fontSize={20} text='Real stories from the field help put the numbers in the right context' />
                    </div>
                    <Switch
                        isChecked={isChecked?.viewStories}
                        toggleSwitch={toggleSwitch}
                        name='viewStories'
                    />
                </div>
                <div className="d-flex justify-content-between align-items-center bg-white margin-top-3 padding-left-right-2 padding-top-bottom-2 flexWrap">
                    <div className='d-flex align-items-center flexWrap'>
                        <MdLayers fontSize={22} />
                        <Heading
                            title='Request Layers'
                            type={TypographyType.h4}
                            colour={TypographyColor.dark}
                            classname='margin-top-bottom-0 margin-left-right-2 text-start overflow-wrap-anywhere'
                        />
                        <InfoPanel fontSize={20} text='Let us know if you would like further overlays here' />
                    </div>
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.default}
                        variant={ButtonVariant.transparent}
                        onClick={() => handleRequestLayersDrawer(true)}
                        classname='h-auto padding-0'
                    >
                        <IoChevronForwardSharp fontSize={22} />
                    </Button>
                </div>
            </div>
            <div className='margin-bottom-3'>
                <Legend />
            </div>

            {requestLayersDrawerOpen && <RequestLayers requestLayersDrawerOpen={requestLayersDrawerOpen} handleRequestLayersDrawer={handleRequestLayersDrawer} />}
        </div>
    );
}

export default CoreSolutions;
