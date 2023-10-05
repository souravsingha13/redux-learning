
const {createStore} = require("redux")
//Constant
const GET_PRODUCT = "GET_PRODUCT"
const ADD_PRODUCT = "ADD_PRODUCT"

const initialProduct = {
    product : ["sugar","salt"],
    productCount : 2
}
//Action 
const getProduct = ()=>{
    return({
        type : GET_PRODUCT
    })
}

const addProduct = (product)=>{
    return({
        type : ADD_PRODUCT,
        payload : product
    })
}
// Reducer
const productReducer = (state = initialProduct, action) =>{
    switch(action.type){
        case GET_PRODUCT:
            return({
                ...state
            });
        case ADD_PRODUCT:
            return({
                product : [...state.product,action.payload],
                productCount : state.productCount + 1
            });
        default:
            return state;
    }
}
//Store
const store = createStore(productReducer)

store.subscribe(()=>{
    console.log(store.getState())
})

store.dispatch(getProduct())
store.dispatch(addProduct("cream"))