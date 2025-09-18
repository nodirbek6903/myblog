import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../api/axios"

export const fetchPortfolios = createAsyncThunk(
    "portfolio/fetchPortfolio",
    async(_, {rejectWithValue}) => {
        try {
            const res = await axios.get("/portfolio")
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error.message)
        }
    }
)
export const fetchPortfolioById = createAsyncThunk(
    "portfolio/fetchPortfolioById",
    async(id, {rejectWithValue}) => {
        try {
            const res = await axios.get(`/portfolio/${id}`)
        return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error.message)
        }
    }
)

export const createPortfolio = createAsyncThunk(
    "portfolio/createPortfolio",
    async(portfolioData, {rejectWithValue}) => {
        try {
            const res = await axios.post("/portfolio", portfolioData)

            return res.data
        } catch (error) {
            rejectWithValue(error?.response?.data?.message || error.message)
        }
    }
)

export const updatePortfolio = createAsyncThunk(
    "portfolio/updatePortfolio",
    async({id,data}, {rejectWithValue}) => {
        try {
            const res = await axios.put(`/portfolio/${id}`, data)

            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error.message)
        }
    }
)

export const deletePortfolio = createAsyncThunk(
    "portfolio/deletePortfolio",
    async(id,{rejectWithValue}) => {
        try {
            const res = await axios.delete(`/portfolio/${id}`)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error.message)
        }
    }
)

const portfolioSlice = createSlice({
    name: "portfolio",
    initialState: {
        portfolios: [],
        selectedPortfolio:null,
        loading: false,
        error:null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPortfolios.pending, (state) => {
            state.loading = true
            // state.error = null
        })
        .addCase(fetchPortfolios.fulfilled, (state,action) => {
            state.loading = false
            state.portfolios = action.payload
        })
        .addCase(fetchPortfolios.rejected, (state,action) => {
            state.loading = false
            state.error = action.payload
        })
        
        .addCase(fetchPortfolioById.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchPortfolioById.fulfilled, (state,action) => {
            state.loading = false
            state.selectedPortfolio  = action.payload
        })
        .addCase(fetchPortfolioById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Create
            .addCase(createPortfolio.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createPortfolio.fulfilled, (state, action) => {
                state.loading = false
                state.portfolios.push(action.payload) // yangi portfolio qo‘shildi
            })
            .addCase(createPortfolio.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
             // Update
            .addCase(updatePortfolio.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updatePortfolio.fulfilled, (state, action) => {
                state.loading = false
                const index = state.portfolios.findIndex(
                    (portfolio) => portfolio._id === action.payload._id
                )
                if (index !== -1) {
                    state.portfolios[index] = action.payload
                }
            })
            .addCase(updatePortfolio.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Delete
            .addCase(deletePortfolio.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deletePortfolio.fulfilled, (state, action) => {
                state.loading = false
                state.portfolios = state.portfolios.filter(
                    (portfolio) => portfolio._id !== action.payload._id
                )
            })
            .addCase(deletePortfolio.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default portfolioSlice.reducer
