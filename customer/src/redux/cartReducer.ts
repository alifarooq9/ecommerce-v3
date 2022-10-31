export interface ItemState {
  id: number;
}

const initialState = {
  id: 0,
};

export type Action = { type: "ADD_ITEM"; payload: number };

export const cartReducers = (
  state: ItemState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "ADD_ITEM": {
      return { ...state, id: state.id + action.payload };
    }

    default:
      return state;
  }
};
