import React,{useRef, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../redux-store/actions';
import { itemType } from "../lib/constant";
const Modal = () =>{
    const modalRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const data = useSelector((state:{value:itemType|null}) => {return state?.value;}); // Access Redux state

    const handleRemoveItem = () => {
        dispatch(removeItem()); // Dispatch action to remove the item;
     };

     useEffect(() => {
        if (data) {
          modalRef.current?.focus();
        }
      }, [data]);


    return (
        <>
            <div
            aria-label = "modal"
            className={`modal fade ${data ? 'show' : ''}`}
            tabIndex={-1}
            role="dialog"
            style={{ display: data ? 'block' : 'none' }}
            aria-hidden={!data}
            ref={modalRef}
        >
                <div className="modal-dialog" role="document" tabIndex={1}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" aria-label="product-title">{data?.title}</h5>
                            <button
                                type="button"
                                tabIndex={1}
                                className="close m-2"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={handleRemoveItem}
                            >
                                <span aria-hidden="true">Close &times; </span>
                            </button>
                        </div>
                        <div className="modal-body" aria-label="product-description">
                            <p>{data?.description}</p>
                            <p><strong>Category:</strong> {data?.category}</p>
                            <p><strong>Price:</strong> {data?.price}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" 
                                tabIndex={2 }
                                className="btn btn-secondary" onClick={handleRemoveItem}>
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