import '../../../styles/mapcontainer/mapoptions/PrimarySelect.css';
import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';


interface SelectBoxProps {
	handleChange: (event: SelectChangeEvent) => void;
	options: any;
	selected: string;
	primary?: boolean;
}

function SelectBox({ handleChange, options, selected, primary }: SelectBoxProps) {
	return (
		<div className='primary-select-box'>
			<Select
				sx={{ borderColor: 'common.white' }}
				value={selected}
				onChange={handleChange}
				className={primary ? 'select ps-3' : 'secondary-select'}
				size='small'
				placeholder='SELECT'
			>
				{options.map((option: any) => (
					<MenuItem key={option.isoCode} value={option.name} className="menu-font-size">
						{option.name}
					</MenuItem>
				))}
			</Select>
		</div>
	);
}

export default SelectBox;
