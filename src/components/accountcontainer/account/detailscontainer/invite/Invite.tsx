/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import '../../../../../App.css';
import EditInvite from './EditInvite';
import InviteNew from './InviteNew';
import ConfirmDelete from './ConfirmDelete';
import { IoMdAdd } from 'react-icons/io';
import { MdModeEdit } from 'react-icons/md';
import { MdDeleteSweep } from 'react-icons/md';
import { usersState, User } from "../../../../../states";
import { useRecoilState } from "recoil";
import { useUserService } from '../../../../../services';
import { toast } from 'react-toastify';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Spinner } from '../../../../ui/spinner/Spinner';

export default function Invite() {
	const [selectedData, setSelectedData] = useState<User | null>(null);
	const [openInviteNew, setOpenInviteNew] = useState(false);
	const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState<string>('');

	// all user's data
	const [users, setUsers] = useRecoilState(usersState);
	const userService = useUserService();

	//function to get all the users
	useEffect(() => {
		userService.getAll().then(response => {
			setUsers(response);
		});
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
				const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
				toast.error(errorMsg);
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
				{
					const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
					toast.error(errorMsg);
				};
			});
	};

	return (
		<div className='container bg-white mt-4 me-5 px-0' style={{ height: '90%' }}>
			<div className="row mx-0 w-100 h-10 d-flex flex-row justify-content-between pt-3 pe-4">
				<h5 className='mt-2 col-2 ms-3 text-start'>Invite</h5>
				<Button
					theme={ButtonTheme.secondary}
					size={ButtonSize.default}
					variant={ButtonVariant.contained}
					onClick={() => handleOpenInviteNew()}
				>
					<IoMdAdd className='me-1' fontSize={22} />
					Invite New
				</Button>
			</div>
			<hr className='mb-4'/>
			<div className="w-auto mx-4 d-flex justify-content-center m-auto">
				<div className='dashboard-table-container w-100'>
					<table className=''>
						<thead>
							<tr>
								<th className='text-start fs-12'>Name</th>
								<th className='text-center fs-12'>Role</th>
								<th className='text-center fs-12'>Company</th>
								<th className='text-center fs-12'>Company type</th>
								<th className='text-center fs-12'>Action</th>
							</tr>
						</thead>
						<tbody>
							{users.map((row) => (
								<tr
									key={row.name}
									className='table-row-height'
								>
									<td className='text-start fs-14'>{row.name}<br /><span className='fs-12 text-muted'>{row.email_id} </span></td>
									<td className='text-center fs-12'><div className='color-green'>{row.role}</div></td>
									<td className='text-center fs-14'>{row.company}</td>
									<td className='text-center fs-14'>{row.company_type}</td>
									<td className='text-center'>
										<Button
											theme={ButtonTheme.muted}
											size={ButtonSize.default}
											variant={ButtonVariant.transparent}
											onClick={() => handleEditClick(row)}
										>
											<MdModeEdit fontSize={20} />
										</Button>
										<Button
											theme={ButtonTheme.warning}
											size={ButtonSize.default}
											variant={ButtonVariant.transparent}
											onClick={() => openConfirmDeleteModal(true, row.user_id)}
										>
											<MdDeleteSweep fontSize={20} />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
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

