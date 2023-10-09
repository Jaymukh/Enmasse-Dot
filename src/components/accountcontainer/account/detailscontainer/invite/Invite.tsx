/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import '../../../../../App.css';
import EditInvite from './EditInvite';
import InviteNew from './InviteNew';
import ConfirmDelete from './ConfirmDelete';
import { IoMdAdd } from 'react-icons/io';
import { MdModeEdit } from 'react-icons/md';
import { MdDeleteSweep } from 'react-icons/md';
import { usersState, User, spinnerState } from "../../../../../states";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useUserService } from '../../../../../services';
import { toast } from 'react-toastify';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import InviteSent from './InviteSent'; import Search from '../../../../ui/search/Search';
import { error } from 'console';

interface NewData {
	name: string | undefined;
	email_id: string | undefined;
	role: string | undefined;
	company: string | undefined;
	company_type: string | undefined;
}

export default function Invite() {
	const [selectedData, setSelectedData] = useState<User | null>(null);
	const [openInviteNew, setOpenInviteNew] = useState(false);
	const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState<string>('');
	const [newData, setNewData] = useState<NewData>({
		name: undefined,
		email_id: undefined,
		role: 'Admin',
		company: 'enmasse',
		company_type: 'Enmasse',
	});

	// all user's data
	const userService = useUserService();
	const [users, setUsers] = useRecoilState(usersState);
	const [openInviteSent, setOpenInviteSent] = useState(false);
	const [spinner, setSpinner] = useRecoilState(spinnerState);

	const handleChangeData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		e.preventDefault();
		var name = e.target.name;
		var value = e.target.value;
		setNewData({ ...newData, [name]: value });
	}
	//function to get all the users
	useEffect(() => {
		setSpinner(true);
		userService.getAll();
	}, []);

	const handleEditClick = (row: User) => {
		setSelectedData(row);
	};
	const handleCloseDialog = () => {
		setSelectedData(null);
	};
	const handleUpdate = (updatedRow: User) => {
		setSpinner(true);
		userService.editInvite(updatedRow)
			.then((response) => {
				if (response) {
					setUsers((prevData) =>
						prevData.map((row) => (
							row.user_id === updatedRow.user_id ? updatedRow : row
						))
					);
					setSpinner(false);
					userService.getAll();
					handleCloseDialog();
					toast.success('Successfully Updated.');

				}
			})
			.catch(error => {
				setSpinner(false);
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

	// searchbar function
	const [searchTerm, setSearchTerm] = useState('');
	const [suggestions, setSuggestions] = useState<User[]>([]);

	const handleInputChange = (value: string) => {
		setSearchTerm(value);
		// Filter the suggestions based on the input value
		const filteredSuggestions = users.filter((data) =>
			data.name.toLowerCase().includes(value.toLowerCase()) || data.company.toLowerCase().includes(value.toLowerCase()) || data.company_type.toLowerCase().includes(value.toLowerCase()) || data.email_id.toLowerCase().includes(value.toLowerCase()) || data.role.toLowerCase().includes(value.toLowerCase())
		);
		setSuggestions(filteredSuggestions);
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
		setSpinner(true);
		userService.deleteInvite(selectedUserId!)
			.then((response) => {
				if (response) {
					userService.getAll();
					setSpinner(false);
					setShowConfirmDeleteModal(false);
				}
			})
			.catch(error => {
				setSpinner(false);
				const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
				toast.error(errorMsg);
			});
	};

	return (
		<div className='container bg-white mt-4 me-5 px-0' style={{ height: '90%' }}>
			<div className="row mx-0 w-100 h-10 d-flex flex-row justify-content-between align-items-center pt-3 pe-4">
				<Heading
					title='Invite'
					type={TypographyType.h2}
					colour={TypographyColor.dark}
					classname='col-2 ms-3 text-start'
				/>
				<div className='col-8 d-flex flex-row justify-content-end align-items-center'>
					<Search
						handleInputChange={handleInputChange}
						value={searchTerm}
						suggestions={suggestions}
						hideSuggestionBox={true}
						placeholderValue= 'Search'
					/>
					<Button
						theme={ButtonTheme.secondary}
						size={ButtonSize.default}
						variant={ButtonVariant.contained}
						onClick={() => handleOpenInviteNew()}
						classname='ms-2'
					>
						<IoMdAdd className='me-1' fontSize={22} />
						Invite New
					</Button>
				</div>
			</div>
			<hr className='mb-4' />
			<div className="w-auto mx-4 d-flex justify-content-center m-auto">
				{!spinner && <div className='dashboard-table-container w-100'>
					<table className=''>
						<thead>
							<tr>
								<th className='text-start fs-14 font-weight-bold'>Name</th>
								<th className='text-center fs-14 font-weight-bold'>Role</th>
								<th className='text-center fs-14 font-weight-bold'>Company</th>
								<th className='text-center fs-14 font-weight-bold'>Company type</th>
								<th className='text-center fs-14 font-weight-bold'>Action</th>
							</tr>
						</thead>
						<tbody>
							{suggestions.length > 0 ? (
								suggestions.map((row) => (
									<tr
										key={row.name}
										className='table-row-height'
									>
										<td className='text-start fs-14'>{row.name}<br /><span className='fs-12 text-muted'>{row.email_id} </span></td>
										<td className='text-center fs-14'><div className='color-green'>{row.role}</div></td>
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
								))
							) : (
								users.map((row) => (
									<tr
										key={row.name}
										className='table-row-height'
									>
										<td className='text-start fs-14'>{row.name}<br /><span className='fs-12 text-muted'>{row.email_id} </span></td>
										<td className='text-center fs-14'><div className='color-green'>{row.role}</div></td>
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
								))
							)}
						</tbody>

					</table>
				</div>}
			</div>
			{selectedData &&
				<EditInvite selectedData={selectedData} handleCloseDialog={handleCloseDialog} handleUpdate={handleUpdate} />}

			{openInviteNew &&
				<InviteNew openInviteNew={openInviteNew} newData={newData} handleChangeData={handleChangeData} handleCloseInviteNew={handleCloseInviteNew} setOpenInviteSent={setOpenInviteSent} />}

			{openInviteSent &&
				<InviteSent openInviteSent={openInviteSent} setOpenInviteSent={setOpenInviteSent} email={newData.email_id} />}

			{showConfirmDeleteModal &&
				<ConfirmDelete showConfirmDeleteModal={showConfirmDeleteModal}
					closeConfirmDeleteModal={closeConfirmDeleteModal} handleDeleteClick={handleDeleteClick} />}
		</div>
	)
}

