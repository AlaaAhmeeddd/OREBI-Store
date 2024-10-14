import { ProductProps } from "@/type"
import { createSlice } from "@reduxjs/toolkit"

const initialState: storeState = {
    productData: []
}

interface storeState {
    productData: ProductProps[]
}

export const orebiSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addToCard: (state, action)=>{
            const existingProduct = state?.productData.find((product: ProductProps)=>{
                return product?._id === action?.payload?._id 
            })
            if(existingProduct){
                existingProduct.quantity += action.payload.quantity
            } else {
                state.productData.push(action.payload);
            }
        }
    }
})

export const { addToCard } = orebiSlice.actions
export default orebiSlice.reducer