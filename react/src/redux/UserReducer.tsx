import { createSlice } from "@reduxjs/toolkit";

interface User{
    email: string;
    firstName: string;
    lastName: string;
}

const userReducer = createSlice({
    name:'user',
    initialState:{} as User,
    reducers:{
        addUser(state, action) {
            // console.log('Payload recebido:', action.payload)
            
            const { email, firstName, lastName } = action.payload;
            return { ...state, email, firstName, lastName };
        }
    }
})

export default userReducer.reducer;
export const {addUser} = userReducer.actions;

export const useInformations = (state: {user: User}) => state.user

