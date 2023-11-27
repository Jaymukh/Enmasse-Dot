/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import EditInvite from './EditInvite';
import InviteNew from './InviteNew';
import ConfirmDelete from './ConfirmDelete';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { MdModeEdit } from 'react-icons/md';
import '../../../../../styles/main.css';
import { MdDeleteSweep } from 'react-icons/md';
import { usersState, User, spinnerState, errorState } from "../../../../../states";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useUserService } from '../../../../../services';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import InviteSent from './InviteSent'; import Search from '../../../../ui/search/Search';

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
		company: undefined,
		role: 'Admin',
		company_type: 'Enmasse',
	});

	// all user's data
	const userService = useUserService();
	const [users, setUsers] = useRecoilState(usersState);
	const [openInviteSent, setOpenInviteSent] = useState(false);
	const [spinner, setSpinner] = useRecoilState(spinnerState);
	const setError = useSetRecoilState(errorState);

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
			.then((response: any) => {
				if (response) {
					setUsers((prevData) =>
						prevData.map((row) => (
							row.user_id === updatedRow.user_id ? updatedRow : row
						))
					);
					setSpinner(false);
					userService.getAll();
					handleCloseDialog();
					setError({ type: 'Success', message: 'Successfully Updated.' });
				}
			})
			.catch(error => {
				setSpinner(false);
				const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
				setError({ type: 'Error', message: errorMsg });
			});
	};


	// invite new drawer
	const handleOpenInviteNew = () => {
		setOpenInviteNew(true);
	};
	const handleCloseInviteNew = () => {
		setOpenInviteNew(false);
	};
	const handleInviteSentModal = () => {
		setOpenInviteSent(false);
		setNewData({
			name: undefined,
			email_id: undefined,
			company: undefined,
			role: 'Admin',
			company_type: 'Enmasse',
		});
	}

	// searchbar function
	const [searchTerm, setSearchTerm] = useState('');
	const [suggestions, setSuggestions] = useState<User[]>([]);

	const handleInputChange = (value: string) => {
		setSearchTerm(value.toLowerCase());
		const filteredSuggestions = users?.filter(data =>
			Object.values(data).some(prop =>
				prop && prop.toString().toLowerCase().includes(searchTerm)
			)
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
				setError({ type: 'Error', message: errorMsg });
			});
	};

	return (
		<div className='container bg-white mt-4 me-5 px-0' style={{ height: '90%' }}>
			<div className="row mx-0 w-100 h-10 d-flex flex-row justify-content-between align-items-center pt-3 pe-4">
				<Heading
					title='Invite'
					type={TypographyType.h2}
					colour={TypographyColor.dark}
					classname='col-2 ms-3 text-start ps-2'
				/>
				<div className='col-8 d-flex flex-row justify-content-end align-items-center px-0'>
					<Search
						handleInputChange={handleInputChange}
						value={searchTerm}
						suggestions={suggestions}
						hideSuggestionBox={true}
						placeholderValue='Search'
						classname='height-2-25'
					/>
					<Button
						theme={ButtonTheme.secondary}
						size={ButtonSize.default}
						variant={ButtonVariant.bordered}
						onClick={() => handleOpenInviteNew()}
						classname='ms-2'
					>
						<MdPersonAddAlt1 className='me-1' fontSize={22} />
						Invite New
					</Button>
				</div>
			</div>
			<hr className='mb-4' />
			<div className="w-auto h-75 mx-4 d-flex justify-content-center m-auto overflow-hidden">
				{!spinner &&
					<div className='dashboard-table-container w-100'>
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
											<td className='text-start fs-14'>{row.name}<br /><span className='fs-12 text-muted'>{row.email_id}</span></td>
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
				<InviteNew openInviteNew={openInviteNew} newData={newData} setNewData={setNewData} handleChangeData={handleChangeData} handleCloseInviteNew={handleCloseInviteNew} setOpenInviteSent={setOpenInviteSent} />}

			{openInviteSent &&
				<InviteSent openInviteSent={openInviteSent} handleInviteSentModal={handleInviteSentModal} email={newData.email_id} />}

			{showConfirmDeleteModal &&
				<ConfirmDelete showConfirmDeleteModal={showConfirmDeleteModal}
					closeConfirmDeleteModal={closeConfirmDeleteModal} handleDeleteClick={handleDeleteClick} />}
		</div>
	)
}

