import React, { useState } from 'react';
import '../../../../../App.css';
import * as Constants from '../../../../../utils/constants/Constants'
import EditInvite from './EditInvite';
import InviteNew from './InviteNew';
import ConfirmDelete from './ConfirmDelete';
import AddIcon from '@mui/icons-material/Add';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

interface InviteData {
	name: string;
	email: string;
	role: string;
	company: string;
	companyType: string;
}

export default function Invite() {
	const [inviteData, setInviteData] = useState<InviteData[]>(Constants.inviteData);
	const [selectedData, setSelectedData] = useState<InviteData | null>(null);
	const [openInviteNew, setOpenInviteNew] = useState(false);
	const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	const handleEditClick = (row: InviteData) => {
		setSelectedData(row);
	};
	const handleCloseDialog = () => {
		setSelectedData(null);
	};
	const handleUpdate = (updatedRow: InviteData) => {
		setInviteData(prevData =>
			prevData.map(row => (row.email === updatedRow.email ? updatedRow : row))
		);
		handleCloseDialog();
	};

	const handleOpenInviteNew = () => {
		setOpenInviteNew(true);
	};
	const handleCloseInviteNew = () => {
		setOpenInviteNew(false);
	};

	const handleConfirmDeleteModal = (show: boolean, index: number) => {
		setShowConfirmDeleteModal(show);
		setSelectedIndex(index);
	};

	const handleDeleteClick = () => {
		if (selectedIndex !== null) {
			const updatedData = [...inviteData];
			updatedData.splice(selectedIndex, 1);
			setInviteData(updatedData);
			handleConfirmDeleteModal(false, -1); // Pass -1 instead of null or undefined
		}
	};


	return (
		<div className='container bg-white w-90 h-100 mt-4 detail-container me-5'>
			<div className="row w-100 h-10 d-flex flex-row justify-content-between pt-3 pl-4">
				<h5 className='mt-2 col-2'>Invite</h5>
				<button data-testid="NewInvite" className='btn btn-outline-secondary width-fit-content-button' onClick={handleOpenInviteNew} ><AddIcon className='mx-1 mb-1 text-dark' />Invite New</button>
			</div>
			<hr />
			<div className="row w-100 d-flex justify-content-center m-auto invite-table-drawer">
				<TableContainer component={Paper} className='invite-table-width '>
					<Table sx={{ minWidth: 650, marginBottom: '5rem' }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="left" variant='head' sx={{ fontWeight: '600' }}>Name</TableCell>
								<TableCell align="center" variant='head' sx={{ fontWeight: '600' }}>Role</TableCell>
								<TableCell align="center" variant='head' sx={{ fontWeight: '600' }}>Company</TableCell>
								<TableCell align="center" variant='head' sx={{ fontWeight: '600' }}>Company Type</TableCell>
								<TableCell align="center" variant='head' sx={{ fontWeight: '600' }}>Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{inviteData.map((row, index) => (
								<TableRow
									key={row.name}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">{row.name}<br />{row.email} </TableCell>
									<TableCell component="th" align="center" scope="row" sx={{ fontSize: '16px' }}><div className='color-green'>{row.role}</div></TableCell>
									<TableCell component="th" align="center" scope="row">{row.company}</TableCell>
									<TableCell component="th" align="center" scope="row">{row.companyType}</TableCell>
									<TableCell align="center" className='' >
										<button className='btn-white'>
											<EditIcon className='color-gray' onClick={() => handleEditClick(row)} />
										</button>
										<button className='btn-white'>
											<DeleteSweepIcon className='color-orange fs-5 ms-2' onClick={() => handleConfirmDeleteModal(true, index)} />
										</button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			{selectedData &&
				<EditInvite
					selectedData={selectedData}
					handleCloseDialog={handleCloseDialog}
					handleUpdate={handleUpdate}
				/>}

			{openInviteNew &&
				<InviteNew 
					openInviteNew={openInviteNew}  
					handleCloseInviteNew={handleCloseInviteNew} 
					inviteData={inviteData} 
					setInviteData={setInviteData}
					data-testid="InviteNew" 
				/>}

			{showConfirmDeleteModal &&
				<ConfirmDelete 
					showConfirmDeleteModal={showConfirmDeleteModal}
					handleConfirmDeleteModal={handleConfirmDeleteModal}
					handleDeleteClick={handleDeleteClick} 
					data-testid="ConfirmDelete"
				/>}
		</div>

	)
}

