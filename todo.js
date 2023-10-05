
const { default: axios } = require("axios");
const {createStore,applyMiddleware} = require("redux");
const thunk = require("redux-thunk").default;
//Constant
const GET_TODO_REQUEST = "GET_TODO_REQUEST";
const GET_TODO_SUCCESS = "GET_TODO_SUCCESS";
const GET_TODO_FAILED = "GET_TODO_FAILED";
const URL = "https://jsonplaceholder.typicode.com/todos"

const initialState = {
    todos : [],
    isloading : false,
    error : null
}
//Action 
const getTodoRequest = ()=>{
    return({
        type : GET_TODO_REQUEST
    })
}

const getTodoFailed = (error)=>{
    return({
        type : GET_TODO_FAILED,
        payload : error
    })
}

const getTodoSuccess = (todos)=>{
    return({
        type : GET_TODO_SUCCESS,
        payload : todos
    })
}

const fatchData = () =>{
    return(dispatch)=>{
        dispatch(getTodoRequest)
        axios.get(URL)
        .then((request)=>{
            const todos = request.data
            const titles = todos.map((todo)=>todo.title);
            dispatch(getTodoSuccess(titles))
            
        })
        .catch((error)=>{
            const errorMessage = error.message;
            dispatch(getTodoFailed(errorMessage))
    })
    }
}

// Reducer
const todosReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_TODO_REQUEST:
            return({
                ...state,
                isloading : true
            });
        case GET_TODO_SUCCESS:
            return({
               ...state,
               isloading : false,
               todos : action.payload
            });

        case GET_TODO_FAILED:
            return({
                ...state,
                isloading : false,
                error : action.payload
            });
        default:
            return state;
    }
}
//Store
const store = createStore(todosReducer,applyMiddleware(thunk))

store.subscribe(()=>{
    console.log(store.getState())
})

store.dispatch(fatchData())