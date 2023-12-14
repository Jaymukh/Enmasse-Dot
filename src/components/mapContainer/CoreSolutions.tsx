import '../../styles/main.css';
import React, { ChangeEvent, useState } from "react";
import * as Constants from '../../utils/constants/Constants';
import Switch from '../ui/switch/Switch';
import { MdChat } from "react-icons/md";
import { MdLayers } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { IoChevronForwardSharp } from 'react-icons/io5';
import { PiRadioButtonLight } from 'react-icons/pi';
import { Legend } from '../ui/legend/Legend';
import { mapFeatureState } from '../../states';
import { useRecoilValue } from 'recoil';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import RequestLayers from "./RequestLayers";
import { Heading, TypographyType, TypographyColor } from '../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';
import InfoPanel from '../ui/InfoPanel';

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

    return (
        <div className='ms-3 d-flex flex-column justify-content-between h-100' >
            <div className='mt-3'>
                <div className={`mt-1 bg-white px-2 py-2 ${!options?.length ? 'disabled-div' : ''}`}>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='d-flex align-items-center'>
                            <PiRadioButtonLight fontSize={22} />
                            <Heading
                                title='Core Solutions'
                                type={TypographyType.h4}
                                colour={TypographyColor.dark}
                                classname='my-0 ms-2 text-start'
                            />
                        </div>
                        <InfoPanel fontSize={20} text='Core Solutions have a strong tendency to grow together' classname='me-1' />
                        <Switch
                            isChecked={isChecked?.coreSolution}
                            toggleSwitch={toggleSwitch}
                            name='coreSolution'
                        />
                    </div>
                </div>
                {isChecked?.coreSolution && options?.length > 0 &&
                    <div className="bg-white mt-1 py-3 px-3">
                        {options?.map((option: Option) => (
                            <div className="d-flex flex-row justify-content-start align-items-center my-2 ms-1" key={option.label}>
                                <input
                                    className="me-2 input-rb"
                                    size={1.5}
                                    type="radio"
                                    value={option.key}
                                    checked={selectedRb === option.key}
                                    onChange={(event) => handleChangeRb(event, option)}
                                />
                                <Body
                                    type={BodyType.p2}
                                    color={BodyColor.dark}
                                    classname='text-start'
                                >
                                    {option.label}
                                </Body>
                            </div>
                        ))}
                    </div>
                }
                <div className={`d-flex justify-content-between align-items-center bg-white mt-3 px-2 py-2 ${!mapFeatures.featuredStories?.featuredStories?.length ? 'disabled-div' : ''}`}>
                    <div className='d-flex align-items-center'>
                        <MdChat className='' fontSize={20} />
                        <Heading
                            title='View Stories'
                            type={TypographyType.h4}
                            colour={TypographyColor.dark}
                            classname='my-0 mx-2 text-start'
                        />
                        <InfoPanel fontSize={20} text='Real stories from the field help put the numbers in the right context' />
                    </div>
                    <Switch
                        isChecked={isChecked?.viewStories}
                        toggleSwitch={toggleSwitch}
                        name='viewStories'
                    />
                </div>
                <div className="d-flex justify-content-between align-items-center bg-white mt-3 px-2 py-2">
                    <div className='d-flex align-items-center'>
                        <MdLayers fontSize={22} />
                        <Heading
                            title='Request Layers'
                            type={TypographyType.h4}
                            colour={TypographyColor.dark}
                            classname='my-0 mx-2 text-start'
                        />
                        <InfoPanel fontSize={20} text='Let us know if you would like further overlays here' />
                    </div>
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.default}
                        variant={ButtonVariant.transparent}
                        onClick={() => handleRequestLayersDrawer(true)}
                        classname='h-auto p-0'
                    >
                        <IoChevronForwardSharp fontSize={22} />
                    </Button>
                </div>
            </div>
            <div className='mb-3'>
                <Legend hasLegendValue={true} />
            </div>

            {requestLayersDrawerOpen && <RequestLayers requestLayersDrawerOpen={requestLayersDrawerOpen} handleRequestLayersDrawer={handleRequestLayersDrawer} />}
        </div>
    );
}

export default CoreSolutions;
