export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 32,
    title: 'YARC (yet another redux counter)'
}

export function increment(amount = 1) {
    return {
        type: INCREMENT,
        payload: amount
    }
}

export function decrement(amount = 1) {
    return {
        type: DECREMENT,
        payload: amount
    }
}

interface CounterAction {
    payload: number;
    type: string;
}

export default function counterReducer(state = initialState,
    action: CounterAction) {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                data: state.data + 1 //action.payload
            }
        case DECREMENT:
            return {
                ...state,
                data: state.data - action.payload
            }
        default: return state;
    }
}