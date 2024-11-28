import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../redux-store/actions';
import { itemType } from "../lib/constant";
const Modal = () =>{
    const dispatch = useDispatch();
  const data = useSelector((state:{value:itemType|null}) => {return state?.value;}); // Access Redux state
console.log(data,"datasds")
 

  const handleRemoveItem = () => {
    dispatch(removeItem()); // Dispatch action to decrement counter
  };


    return (
        <>
            <div
            className={`modal fade ${data ? 'show' : ''}`}
            tabIndex={-1}
            role="dialog"
            style={{ display: data ? 'block' : 'none' }}
            aria-hidden={!data}
        >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{data?.title}</h5>
                            <button
                                type="button"
                                className="close m-2"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={handleRemoveItem}
                            >
                                <span aria-hidden="true">Close &times; </span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{data?.description}</p>
                            <p><strong>Category:</strong> {data?.category}</p>
                            <p><strong>Price:</strong> {data?.price}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleRemoveItem}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;