// import '../../styles/headercontainer/Header.css';
import React from 'react';
// import Divider from '@mui/material/Divider';
// import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';
// import SearchIcon from '@mui/icons-material/Search';
// import { RiQuestionnaireFill } from 'react-icons/ri';
// import AccountOptions from './AccountOptions';
// import Notifications from './Notifications';
// import RequestDetails from './RequestDetails';
// import ShareLocation from './ShareLocation';

function Header({}) {
	return (
		<div className="Header d-flex flex-wrap justify-content-between mx-3 mt-3 border-bottom">
			<div className="d-flex flex-wrap justify-content-between mb-3">
				<div className="d-flex flex-wrap mx-3">
					<h3 className='mx-3'>enmasse</h3>
					{/* <Divider orientation="vertical" className='mx-1'/> */}
					<h6 className='mx-3 mt-2'>D.O.T.S</h6>
				</div>
            </div>
				{/* <TextField
						className='header-search-bar'
						search
						placeholder='Search by location'
						size='small'
						InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon/>
                              </InputAdornment>
                            ),
                          }}
					></TextField>
			</div>
			<div className="d-flex flex-wrap justify-content-between mx-4">
				<ShareLocation/>
				<RequestDetails/>
				<Divider orientation="vertical" className='mx-3'/>
				<RiQuestionnaireFill fontSize={25} className='mx-2 header-icon' />
				<Notifications className='mx-2 header-icon'/>
				<AccountOptions className='mx-2' handleMapDisplay={handleMapDisplay}/>
			</div> */}
		</div>
	);
}

export default Header;