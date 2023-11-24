/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import '../../../App.css';
import '../../../styles/main.css';
import { BiMenuAltLeft } from 'react-icons/bi';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import * as Constants from '../../../utils/constants/Constants';
import { useNavigate } from 'react-router-dom';
import { useStoriesService, useUserService } from '../../../services';
import { FamiliesSortingItem } from '../../../utils/constants/Constants';

interface FamiliesSortingProps {
	handlePaginationData: (data: any) => void;
}

const FamiliesSorting = ({ handlePaginationData }: FamiliesSortingProps) => {
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [selectedItem, setSelectedItem] = useState<FamiliesSortingItem | null>(Constants.familiesSortingItems[0]);
	const navigate = useNavigate();

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		Boolean(anchorEl) ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
	};

	const handleClickMenuItem = (item: FamiliesSortingItem) => {
		const param = item.param;
		handlePaginationData(param);
		setSelectedItem(item);
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
		<div className='family-menu' ref={menuRef}>
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
				(<ul className='family-menu-dropdown '>
					{Constants.familiesSortingItems.map((item) => (
						<li
							key={item.key}
							className={`family-menu-item d-flex fs-16 ${selectedItem === item ? 'color-green' : ''}`}
							onClick={() => handleClickMenuItem(item)}
						>
							<span>{item.text}</span>
						</li>
						
					))}
				</ul>)
			}
			<span className={selectedItem ? 'green-circle' : ''}></span>			
		</div >
	);
}

export default FamiliesSorting;
