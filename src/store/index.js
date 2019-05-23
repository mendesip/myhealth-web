import {createStore} from 'redux';

function reducer(){
    return {
        patient: null,
        ncds: null,
        registers: null
    };
}

const store = createStore(reducer);

export default store;