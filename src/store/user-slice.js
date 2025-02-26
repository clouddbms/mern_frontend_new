import {createSlice} from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:'userslice',
    initialState:{
        experts:[],
        users:[]
    },
    reducers:{
        deleteExpert(state,action){
            const newexperts= state.experts.filter((expert) => expert._id !== action.payload);  
            state.experts=newexperts
        },
        getExperts(state,action){
            
            state.experts=action.payload
            
            
        },
        getUsers(state,action){
          state.users=action.payload
        
        },
        addExpert(state,action){
           
            state.experts.push(action.payload)
        },
        addUser(state,action){
           
            state.users.push(action.payload)
        },
        updateExpertsdetails(state,action){
            state.experts[action.payload].is_blocked=!state.experts[action.payload].is_blocked
        }
    }
})
export const {deleteExpert,getExperts,getUsers,addExpert,addUser,updateExpertsdetails}=userSlice.actions;
export default userSlice;