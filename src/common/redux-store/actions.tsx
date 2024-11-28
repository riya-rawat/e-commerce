
import { itemType } from '../lib/constant';
  
  export const removeItem = () => ({
    type: 'remove_product_details',
  });
  
  export const setItem = (value:itemType) => ({
    type: 'set_product_details',
    payload: value,
  });