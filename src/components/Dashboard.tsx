import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setFilter } from "../store/userSlice";
import { RootState, AppDispatch } from "../store/store";
import { Table, Form, InputGroup } from "react-bootstrap";

const Dashboard = () => {
	const dispatch: AppDispatch = useDispatch();
	const userState = useSelector((state: RootState) => state.user);

	const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTimeout(() => {
			dispatch(setFilter(e.target.value));
		}, 300);
	};
	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	return (
		<div className='dashboard'>
			<h1 className='dashboard__label pt-3'>Dashboard</h1>
			<InputGroup className='input-group pt-3'>
				<Form.Control placeholder='Search your name, user name, email or phone...' onChange={handleSearchInput} />
			</InputGroup>
			<div className='dashboard__main-container pt-3'>
				<Table striped bordered hover variant='light'>
					<thead>
						<tr>
							<th>Name</th>
							<th>User Name</th>
							<th>Email</th>
							<th>Phone</th>
						</tr>
					</thead>
					<tbody>
						{userState.filteredUsers.map(user => (
							<tr key={user.email}>
								<td>{user.name}</td>
								<td>{user.username}</td>
								<td>{user.email}</td>
								<td>{user.phone}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</div>
	);
};
export default Dashboard;
