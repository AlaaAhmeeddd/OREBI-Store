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
        },
        increaseQuantity: (state, action)=>{
            const existingProduct = state?.productData.find((product: ProductProps)=>{
                return product?._id === action?.payload?._id 
            })
            if(existingProduct) existingProduct.quantity++
        },
        decreaseQuantity: (state, action)=>{
            const existingProduct = state?.productData.find((product: ProductProps)=>{
                return product?._id === action?.payload?._id 
            })
            if(existingProduct && existingProduct.quantity === 1 ) existingProduct.quantity = 1
            else existingProduct!.quantity--
        },
        resetQuantity: (state)=>{
            state.productData = []
        },
        deleteProduct: (state, action)=>{
            state.productData = state.productData.filter(
                (item)=> item?._id !== action.payload._id
            )
        }
    }
})

export const { addToCard, increaseQuantity, decreaseQuantity, resetQuantity, deleteProduct } = orebiSlice.actions
export default orebiSlice.reducer