import { createSlice } from "@reduxjs/toolkit";


//don't write like :- initialState = [] if you want to store an array of oject
const initialState = {
    images: [],
}

const imagesSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        addArrayofImages(state, action){
            console.log(action.payload)
            state.images = action.payload
            console.log(state.images)
        },
        addImage(state, action){
            console.log(action.payload+' reducer add single');
            state.images = [...state.images, action.payload]
        },
        increCount(state, action){
            //var obj = state.images.findOne((image)=> image == action.payload)
            //if(obj){
            //    obj.viewcount = obj.viewcount+1
            //}
            console.log(action.payload)
            const prevcount = state.images.find((image)=> image._id == action.payload._id).viewcount


            console.log(prevcount);

            state.images = state.images.map((image) => image._id == action.payload._id ? {...image, viewcount: prevcount+1} : image)

            console.log(state.images)
            
        }
    }
})

export const {addArrayofImages, addImage, increCount,searchimages} = imagesSlice.actions

export const selectImages = (state) => {
    return state.image.images
}

export default imagesSlice.reducer;