import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "../api/axios"

export const fetchAbout = createAsyncThunk(
    "about/fetchAbout",
    async(_, {isRejectedWithValue}) => {
        try {
            const response = await axios.get("/about")
            return response.data
        } catch (error) {
            return isRejectedWithValue(error?.response?.data?.message || error.message)
        }
    }
)

export const createAbout = createAsyncThunk(
    "about/createAbout",
    async(aboutData, {isRejectedWithValue}) => {
        try {
            const response = await axios.post("/about",aboutData)
            return response.data
        } catch (error) {
            return isRejectedWithValue(error?.response?.data?.message || error.message)          
        }
    }
)

export const updateAbout = createAsyncThunk("about/updateAbout", 
    async({id,aboutData}, {isRejectedWithValue}) => {
        try {
            const response = await axios.put(`/about/${id}`, aboutData)
            return response.data
        } catch (error) {
            isRejectedWithValue(error?.response?.data?.message || error.message)
        }
    }
)

const aboutSlice = createSlice({
    name:"about",
    initialState:{
        about: null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAbout.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchAbout.fulfilled, (state,action) => {
            state.loading = false
            state.about = action.payload
        })
        .addCase(fetchAbout.rejected, (state,action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase(createAbout.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(createAbout.fulfilled, (state,action) => {
            state.loading = false
            state.about = action.payload
        })
        .addCase(createAbout.rejected, (state,action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase(updateAbout.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(updateAbout.fulfilled, (state,action) => {
            state.loading = false
            state.about = action.payload
        })
        .addCase(updateAbout.rejected, (state,action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default aboutSlice.reducer