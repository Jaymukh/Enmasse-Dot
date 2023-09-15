import React, { useState, useEffect } from 'react';
import '../../../../../App.css';
import EditInvite from './EditInvite';
import InviteNew from './InviteNew';
import ConfirmDelete from './ConfirmDelete';
import { IoMdAdd } from 'react-icons/io';
import { MdModeEdit } from 'react-icons/md';
import { MdDeleteSweep } from 'react-icons/md';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { usersState, loggedUserState, User } from "../../../../../states";
import { useRecoilState, useRecoilValue } from "recoil";
import { useUserService } from '../../../../../services';
import { toast } from 'react-toastify';


export default function Invite() {
	const [selectedData, setSelectedData] = useState<User | null>(null);
	const [openInviteNew, setOpenInviteNew] = useState(false);
	const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

	// all user's data
	const [users, setUsers] = useRecoilState(usersState);
	const userService = useUserService();
	const loggedUser = useRecoilValue(loggedUserState);

	//function to get all the users
	useEffect(() => {
		userService.getAll();
	}, []);

	const handleEditClick = (row: User) => {
		setSelectedData(row);
	};
	const handleCloseDialog = () => {
		setSelectedData(null);
	};
	const handleUpdate = (updatedRow: User) => {
		userService.editInvite(updatedRow)
			.then((response) => {
				if (response) {
					console.log('response', response);
					setUsers((prevData) =>
						prevData.map((row) => (
							row.user_id === updatedRow.user_id ? updatedRow : row
						))
					);
					userService.getAll();
					handleCloseDialog();
					toast.success('Successfully Updated.');
				}
			})
			.catch(error => {
				toast.error(error);
			});
	};


	// invite new drawer
	const handleOpenInviteNew = () => {
		setOpenInviteNew(true);
	};
	const handleCloseInviteNew = () => {
		setOpenInviteNew(false);
	};

	// Confirm Delete Model
	const openConfirmDeleteModal = (showConfirmDeleteModal: boolean, user_id: string) => {
		setShowConfirmDeleteModal(showConfirmDeleteModal);
		setSelectedUserId(user_id);
	};
	const closeConfirmDeleteModal = () => {
		setShowConfirmDeleteModal(false);
	};
	
	// function for Delete
	const handleDeleteClick = () => {
		userService.deleteInvite(selectedUserId!)
			.then((response) => {
				if (response) {
					userService.getAll();
					setShowConfirmDeleteModal(false);
				}
			})
			.catch(error => {
				toast.error(error);
			});
	};

	return (
		<div className='container bg-white w-90 h-100 mt-4 detail-container me-5'>
			<div className="row w-100 h-10 d-flex flex-row justify-content-between pt-3 pl-4">
				<h5 className='mt-2 col-2'>Invite</h5>
				<button className='btn btn-outline-secondary width-fit-content-button' onClick={handleOpenInviteNew} ><IoMdAdd className='me-1 text-dark' fontSize={22} />Invite New</button>
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
							{users.map((row) => (
								<TableRow
									key={row.name}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">{row.name}<br />{row.email_id} </TableCell>
									<TableCell component="th" align="center" scope="row" sx={{ fontSize: '16px' }}><div className='color-green'>{row.role}</div></TableCell>
									<TableCell component="th" align="center" scope="row">{row.company}</TableCell>
									<TableCell component="th" align="center" scope="row">{row.company_type}</TableCell>
									<TableCell align="center" className='' >
										<button type='submit' className='btn-white' onClick={() => handleEditClick(row)}>
											<MdModeEdit className='color-gray' fontSize={20} />
										</button>
										<button type='submit' className='btn-white' onClick={() => openConfirmDeleteModal(true, row.user_id)}>
											<MdDeleteSweep className='color-orange ms-2' fontSize={20} />
										</button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			{selectedData &&
				<EditInvite selectedData={selectedData} handleCloseDialog={handleCloseDialog} handleUpdate={handleUpdate} />}

			{openInviteNew &&
				<InviteNew openInviteNew={openInviteNew} handleCloseInviteNew={handleCloseInviteNew} />}

			{showConfirmDeleteModal &&
				<ConfirmDelete showConfirmDeleteModal={showConfirmDeleteModal}
					closeConfirmDeleteModal={closeConfirmDeleteModal} handleDeleteClick={handleDeleteClick} />}
		</div>



	)
}

