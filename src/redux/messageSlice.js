import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../api/axios"

export const fetchMessages = createAsyncThunk(
    "messages/fetchMessages",
    async(_, {isRejectedWithValue}) => {
        try {
            const res = await axios.get("/messages")
            return res.data
        } catch (error) {
            return isRejectedWithValue(error?.response?.data?.message || error.message)
        }
    }
)

export const createMessage = createAsyncThunk(
    "messages/createMessage",
    async(messageData, {isRejectedWithValue}) => {
        try {
            const res = await axios.post("/messages", messageData)

            return res.data
        } catch (error) {
            return isRejectedWithValue(error?.response?.data?.message || error.message)
        }
    }
)

export const deleteMessage = createAsyncThunk(
    "messages/deleteMessage",
    async(id, {rejectWithValue}) => {
        try {
            const res = await axios.delete(`/messages/${id}`)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error.message)
        }
    }
)

const messageSlice = createSlice({
    name:"messages",
    initialState:{
        messages: [],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers: (builder) => 
        builder
    .addCase(fetchMessages.pending, (state) => {
        state.loading = true
    })
    .addCase(fetchMessages.fulfilled, (state,action) => {
        state.loading = false
        state.messages = action.payload
    })
    .addCase(fetchMessages.rejected, (state,action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase(createMessage.pending, (state) => {
        state.loading = true
    })
    .addCase(createMessage.fulfilled, (state,action) => {
        state.loading = false
        state.messages.push(action.payload)
    })
    .addCase(createMessage.rejected, (state,action) => {
        state.loading = false
        state.loading = action.payload
    })
    .addCase(deleteMessage.pending, (state) => {
        state.loading = true
    })
    .addCase(deleteMessage.fulfilled, (state,action) => {
        state.loading = false
        state.messages = state.messages.filter(msg => msg._id !== action.payload)
    })
    .addCase(deleteMessage.rejected, (state,action) => {
        state.loading = false
        state.error = action.payload
    })
})



export default messageSlice.reducer


