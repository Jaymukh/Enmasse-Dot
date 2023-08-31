import '../../../styles/mapcontainer/mapoptions/PrimarySelect.css';
import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function SelectBox({ handleChange, options, selected, primary }) {
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
				{options.map((option) => (
					<MenuItem key={option.isoCode} value={option.name} className="menu-font-size">
						{option.name}
					</MenuItem>
				))}
			</Select>
		</div>
	);
}

export default SelectBox;
