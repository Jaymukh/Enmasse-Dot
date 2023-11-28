/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import React, { useState, useEffect, useRef } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';

// CSS
import '../../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';

// Utilities
import * as Constants from '../../../utils/constants/Constants';

interface FamiliesSortingProps {
	handlePaginationData: (data: any) => void;
}

const FamiliesSorting = ({ handlePaginationData }: FamiliesSortingProps) => {
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [selectedItem, setSelectedItem] = useState<Constants.FamiliesSortingItem | null>(Constants.familiesSortingItems[0]);

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		Boolean(anchorEl) ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
	};

	const handleClickMenuItem = (item: Constants.FamiliesSortingItem) => {
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
							className='family-menu-item d-flex'
							onClick={() => handleClickMenuItem(item)}
						>
							<Heading
								title={item.text}
								colour={selectedItem === item ? TypographyColor.primary : TypographyColor.dark}
								type={TypographyType.h5}
							/>
						</li>
					))}
				</ul>)
			}
			<span className={selectedItem ? 'green-circle' : ''}></span>
			
		</div >
	);
}

export default FamiliesSorting;
