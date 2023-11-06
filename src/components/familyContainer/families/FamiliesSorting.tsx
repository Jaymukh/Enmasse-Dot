/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import '../../../App.css';
import { BiMenuAltLeft } from 'react-icons/bi';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import * as Constants from '../../../utils/constants/Constants';
import { useNavigate } from 'react-router-dom';
import { loggedUserState, visiblePanelState } from '../../../states';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useUserService } from '../../../services';



const FamiliesSorting = () => {
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const navigate = useNavigate();
	const userService = useUserService();
	const loggedUser = useRecoilValue(loggedUserState);
	const setVisiblePanel = useSetRecoilState(visiblePanelState);

	useEffect(() => {
		userService.getUserDetails();
	}, []);

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		Boolean(anchorEl) ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
	};

	const handleClickMenuItem = (event: React.MouseEvent<HTMLElement>, route: string) => {
		setVisiblePanel('/' + route);
		handleClose();
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

    const handleClickOutside = (event: { target: any; }) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            handleClose();
        }
    };

	useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

	return (
		<div className='account-menu' ref={menuRef}>
            <Button
                    theme={ButtonTheme.primary}
                    size={ButtonSize.small}
                    variant={ButtonVariant.transparent}
                    onClick={(e) => handleMenuClick(e)}
                    classname='m-0 h-auto'
                >
                    <BiMenuAltLeft fontSize={22} />                    
                </Button>
			{Boolean(anchorEl) &&
				(<ul className='account-menu-dropdown '>
					{Constants.familiesSortingItems.map((item) => (
						<li
							key={item.key}
							className='menu-item d-flex fs-16'
							onClick={(event) => handleClickMenuItem(event, (item.text)?.toLowerCase())}
						>
							<span>{item.text}</span>
						</li>
					))}
				</ul>)
			}
		</div >
	);
}

export default FamiliesSorting;
