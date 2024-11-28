
import { itemType } from '../lib/constant';
interface selectedItemState {
  value: itemType | null;

}

const initialState: selectedItemState = {
  value: null,

};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectedProductReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'remove_product_details':
        return {
          ...state,
          value: null,
        };
      case 'set_product_details':
        return {
          ...state,
          value: action.payload,
        };
      default:
        return state;
    }
  };



export default selectedProductReducer;