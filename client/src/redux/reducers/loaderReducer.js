const initialState = { loading: false };

const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_START':
            return { ...state, loading: true };
        case 'LOADING_END':
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default loaderReducer;
