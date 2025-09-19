import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../api/axios"

export const fetchBlogs = createAsyncThunk(
    "blog/fetchBlogs",
    async(_, {rejectWithValue}) => {
        try {
            const res = await axios.get("/blogs")
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message ||error.message)
        }
    }
)
export const fetchByIdBlog = createAsyncThunk(
    "blog/fetchByIdBlog",
    async(id, {rejectWithValue}) => {
        try {
            const res = await axios.get(`/blogs/${id}`)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message ||error.message)
        }
    }
)

export const createBlogs = createAsyncThunk(
    "blog/createBlogs",
    async(data, {rejectWithValue}) => {
        try {
            const res = await axios.post("/blogs", data)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message ||error.message)
        }
    }
)

export const updateByIdBlog = createAsyncThunk(
    "blog/updateByIdBlog",
    async({id,data}, {rejectWithValue}) => {
        try {
            const res = await axios.put(`/blogs/${id}`,data)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message ||error.message)
        }
    }
)

export const deleteBlogs = createAsyncThunk(
    "blog/deleteBlogs",
    async(id, {rejectWithValue}) => {
        try {
            const res = await axios.delete(`/blogs/${id}`)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message ||error.message)
        }
    }
)

const initialState = {
    blogs:[],
    selectedBlog:[],
    loading: false,
    error:null
}

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchBlogs.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchBlogs.fulfilled, (state,action) => {
            state.loading = false
            state.blogs = action.payload
        })
        .addCase(fetchBlogs.rejected, (state,action) => {
            state.loading = false
            state.error = action.payload
        })
        // fetchById blogs
        .addCase(fetchByIdBlog.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchByIdBlog.fulfilled, (state,action) => {
            state.loading = false
            state.selectedBlog = action.payload
        })
        .addCase(fetchByIdBlog.rejected, (state,action) => {
            state.loading = false
            state.error = action.payload
        })
        // create blogs
        .addCase(createBlogs.pending, (state) => {
            state.loading = true
        })
        .addCase(createBlogs.fulfilled, (state,action) => {
            state.loading = false
            state.blogs.push(action.payload)
        })
        .addCase(createBlogs.rejected, (state,action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase(updateByIdBlog.pending, (state) => {
            state.loading = true
        })
        .addCase(updateByIdBlog.fulfilled, (state,action) => {
            state.loading = false
            const index = state.blogs.findIndex(b => b._id === action.payload._id)
            if(index !== -1){
                state.blogs[index] = action.payload
            }
        })
        .addCase(updateByIdBlog.rejected, (state,action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase(deleteBlogs.pending, (state) => {
            state.loading = true
        })
        .addCase(deleteBlogs.fulfilled, (state,action) => {
            state.loading = false
            state.blogs = state.blogs.filter(b => b._id !== action.payload._id)
        })
        .addCase(deleteBlogs.rejected, (state,action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default blogSlice.reducer