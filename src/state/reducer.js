// src/store.js
import { createStore } from 'redux';

// Action types
const ADD_TODO = 'ADD_TODO';

// Action creators
export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: text,
});

// Initial state
const initialState = {
  todos: [],
};

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    default:
      return state;
  }
};

// Create store
const store = createStore(rootReducer);

export default store;
