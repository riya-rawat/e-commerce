import React from "react";
import styles from "../../assets/css/card.module.scss";
import Image from 'next/image';
import { itemType } from '../lib/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setItem} from '../redux-store/actions';
import Modal from "./modal";

const Cards = (props:{key:string|number;data:itemType}) =>{
    const dispatch = useDispatch();
    const data = useSelector((state:{value:itemType|null}) => {return state;}); // Access Redux state

    const handleSetItem = () => {
        dispatch(setItem(props?.data)); // Dispatch action to increment counter
      };
    return (
        <>
            <div className={`col-md-4 col-12 ${styles.productCard}`} >
                <div className="card w-100 h-100 p-20" onClick={handleSetItem}>
                    <div className={`${styles.productImages} d-block content-slide-img-container1`}>
                        <Image
                            src={props?.data?.image}
                            alt={props?.data?.title}
                            width={50}
                            height={100}
                            layout="responsive"  // This makes the image responsive
                            priority={false}  // Set false for lazy loading
                            loading="lazy"
                            className={`${styles['card-img'] }`}
                        />
                    </div>
                    <div className={styles.productDetails}>
                        <h5 className={styles['card-title']}>{props?.data.title}</h5>
                        <p className="card-text">{props?.data?.price}</p>
                    </div>
                </div>
            </div>

            {data?.value && <Modal />}
        </>
    )
}

export default Cards;