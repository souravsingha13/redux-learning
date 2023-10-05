const {createStore,applyMiddleware} = require("redux")
const { default: logger } = require("redux-logger")
// Defining constant
const INCREMENT = "INCREMENT"
const DECREMENT = "DECREMENT"
const RESET = "RESET"
const INCREMENT_BY_VALUE = "INCREMENT_BY_VALUE"
const ADD_USER = "ADD_USER"

// States
const initialCounterState = {
    count : 0,
};

const initalUserState = {
    user : [{name : "Sourav Singha"}]
};

// Action -> object ->{types,payload}

const incrementCount = () =>{
    return({
        type : INCREMENT,
    });
};

const decrementCount = () =>{
    return({
        type : DECREMENT,
    });
};
const resetCount = () =>{
    return({
        type : RESET,
    });
};
const incrementByValue = (value) =>{
    return({
        type : INCREMENT_BY_VALUE,
        payload : value
    });
};

const addUser = () =>{
    return({
        type : ADD_USER,
        payload : {name : "Sushanta"}
    });
};

// Create counter reducer

const counterReducer = (state = initialCounterState,action) =>{

    switch(action.type){

        case INCREMENT:
            return({
                ...state,
                count : state.count + 1,
            });
        
        case DECREMENT:
            return({
                ...state,
                count : state.count - 1,
            });
        case RESET:
            return({
                ...state,
                count : 0,
            });
        case INCREMENT_BY_VALUE:
            return({
                ...state,
                count : state.count + action.payload,
            });
        
        default:
            return state

    }
}
//store
const store = createStore(counterReducer,applyMiddleware(logger));

store.subscribe(()=>{
    console.log(store.getState())
})

store.dispatch(incrementCount())
store.dispatch(incrementCount())
store.dispatch(decrementCount())
store.dispatch(resetCount())
store.dispatch(incrementByValue(5))