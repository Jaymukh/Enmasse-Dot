import React from 'react';
import '../../../styles/main.css';
import * as Constants from '../../../utils/constants/Constants';
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { loggedUserState, visiblePanelState } from '../../../states';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';


const SideBar = () => {
    const navigate = useNavigate();
    const loggedUser = useRecoilValue(loggedUserState);
    const [visiblePanel, setVisiblePanel] = useRecoilState(visiblePanelState);

    const handleItemClick = (data: string) => {
        setVisiblePanel('/' + data);
        navigate('/' + data);
    }

    return (
        <div className='account-sidebar col-3 p-0 pe-3 h-100'>
            <div className="h-100 bg-white full-height d-flex flex-column justify-content-between w-100" style={{ height: '81.5vh' }}>
                <ul className='sidebar-ul'>
                    {Constants.sidebarData.map((data, index) => (
                        (loggedUser.role === 'Admin' || data.index !== 2) && (
                            <li className='p-0 m-0' key={index}>
                                <button
                                    className={`list-item-button ${'/' + (data.option).toLowerCase() === visiblePanel ? 'li-selected' : 'li-not-selected'
                                        }`}
                                    onClick={() => handleItemClick((data.option).toLowerCase())}
                                >
                                    <span className='mx-3 li-icon'>{data.icon}</span>
                                    <Heading
                                        title={data.option}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h4}
                                    />
                                </button>
                            </li>)
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SideBar;
