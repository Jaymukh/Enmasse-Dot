import '../../../styles/mapcontainer/mapoptions/PrimarySelect.css';
import React, { ChangeEvent } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface Option {
	isoCOde: string;
    name: string;
  }
  
  interface SelectBoxProps {
    handleChange: (event: SelectChangeEvent) => void;
    options: Option[];
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
