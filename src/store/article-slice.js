import {createSlice} from '@reduxjs/toolkit';

//ArticleSlice defines reducers for deleting, adding, setting a articles array
const articleSlice=createSlice({
    name:'allArticles',
    initialState:{
        articles:[]
    },
    reducers:{
        deleteArticle(state,action){
            const newarticles= state.articles.filter((article) => article._id !== action.payload);  
            state.articles=newarticles
        },
        setArticles(state,action){     
            state.articles=action.payload
        },
        addArticle(state,action){
            state.articles.push(action.payload)
        }
    }
})
export const {setArticles,deleteArticle,addArticle}=articleSlice.actions;
export default articleSlice;