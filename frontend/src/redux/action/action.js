export const saveCompany = (company) =>  {
    return (dispatch) =>{
        dispatch({
            type: "SAVE_COMPANY",
            payload: company
        })
    }
}