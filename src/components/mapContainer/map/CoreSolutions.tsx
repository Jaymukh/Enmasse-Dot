import React, { ChangeEvent } from "react";
import { BsFillChatLeftFill } from 'react-icons/bs';
import * as Constants from '../../../utils/constants/Constants';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#000000',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

interface CoreSolutionsProps {
    handleViewStories: (checked: boolean) => void;
    handleChangeRb: (event: ChangeEvent<HTMLInputElement>, option: Constants.Option) => void;
    selectedRb: number;
}

const CoreSolutions: React.FC<CoreSolutionsProps> = ({
    handleViewStories,
    handleChangeRb,
    selectedRb,
}) => {
    const options = Constants.options;

    return (
        <div className="ms-4 fit-content-div top-0 start-0" style={{ position: "absolute" }}>
            <div className="mt-4 mx-1 bg-white p-3 core-sol-div">
                <h6 className="fw-bold mx-2 input-rb-header pe-3">Core Solutions</h6>
                <div className="pe-3">
                    {options.map((option) => (
                        <div className="d-flex flex-row justify-content-start">
                            <label key={option.label} className="my-1 rb-label">
                                <input
                                    className="mx-2 input-rb"
                                    size={1.5}
                                    type="radio"
                                    value={option.key}
                                    checked={selectedRb === option.key}
                                    onChange={(event) => handleChangeRb(event, option)}
                                />
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="d-flex flex-row bg-white mt-2 mx-1 px-3 py-2 core-sol-div">
                <BsFillChatLeftFill size={16} color="#7F7F7F" className="mt-1" />
                <p className="paragraph mx-2 fs-12">View Stories</p>
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} onChange={(event) => handleViewStories(event.target.checked)} />
            </div>
        </div>
    );
}

export default CoreSolutions;
