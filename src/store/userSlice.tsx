import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserApi } from "./getUserApi";

interface User {
	name: string;
	username: string;
	email: string;
	phone: number;
}

interface UserState {
	users: User[];
	filteredUsers: User[];
	filter: {
		name?: string;
		username?: string;
		email?: string;
		phone?: number;
	};
	loading: boolean;
}

const initialState: UserState = {
	users: [],
	filteredUsers: [],
	filter: {},
	loading: false,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	const users = await getUserApi();
	return users;
});

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setFilter(state, action: PayloadAction<string>) {
			const searchFilter = action.payload.toLowerCase();
			state.filteredUsers = state.users.filter(user => {
				return (
					user.name.toLowerCase().includes(searchFilter) ||
					user.username.toLowerCase().includes(searchFilter) ||
					user.email.toLowerCase().includes(searchFilter) ||
					user.phone.toString().includes(searchFilter)
				);
			});
		},
		setUsers(state, action: PayloadAction<User[]>) {
			(state.users = action.payload), (state.filteredUsers = action.payload);
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUsers.pending, state => {
				state.loading = true;
			})
			.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
				state.loading = false;
				state.users = action.payload;
				state.filteredUsers = action.payload;
			})
			.addCase(fetchUsers.rejected, state => {
				state.loading = false;
			});
	},
});

export const { setFilter, setUsers } = userSlice.actions;
export default userSlice.reducer;
