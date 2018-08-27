
const initialState = {
    count: 0
}
const add = (state = initialState, action) => {
    console.log(state, action)
    switch (action.type) {
        case 'ADD':
            const {count} = state;
            return {
                ...state,
                count: count+1,
            }
        default:
            return state
    }
}

export default add;