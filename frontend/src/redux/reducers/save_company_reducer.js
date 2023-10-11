const reducer = (state = "",action) => {
    switch(action.type){
        case "SAVE_COMPANY":
            return action.payload;
        default:
            return state;
    }
}

export default reducer;