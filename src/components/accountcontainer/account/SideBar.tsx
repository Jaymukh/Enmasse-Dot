import React from 'react';
import '../../../styles/main.css';
import * as Constants from '../../../utils/constants/Constants';
import { useRecoilState } from "recoil";
import { useNavigate } from 'react-router-dom';
import { visiblePanelState } from '../../../states';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';


const SideBar = () => {
    const navigate = useNavigate();
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
                        <li className='p-0 m-0' key={index}>
                            <button
                                className={`list-item-button ${'/' + (data.option).toLowerCase() === visiblePanel ? 'li-selected' : ''
                                    }`}
                                onClick={() => handleItemClick((data.option).toLowerCase())}
                            >
                                <span className='mx-3 li-icon'>{data.icon}</span>
                                <span>{data.option}</span>
                            </button>
                        </li>
                    ))}
                </ul>
                {/* <div className='justify-content-start'>
                    <Button
                        theme={ButtonTheme.secondary}
                        size={ButtonSize.medium}
                        variant={ButtonVariant.transparent}
                    >
                        <HelpIcon className='mx-1 mb-1 color-black ' />
                        Help & Support
                    </Button>
                </div> */}
            </div>
        </div>
    );
}

export default SideBar;
