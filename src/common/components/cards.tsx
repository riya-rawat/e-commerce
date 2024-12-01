import React from "react";
import styles from "../../assets/css/card.module.scss";
import Image from 'next/image';
import { itemType } from '../lib/constant';
import { useDispatch } from 'react-redux';
import { setItem} from '../redux-store/actions';


const Cards = (props:{data:itemType}) =>{
    const dispatch = useDispatch();
    const handleSetItem = () => {
        dispatch(setItem(props?.data)); // Dispatch action to set the data;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEnter = (event: any) =>{
        if(event?.key === 'Enter') dispatch(setItem(props?.data)); 
    }

    return (
        <>
            <div className={`col-md-4 col-12 ${styles.productCard}`} >
                <span className="card w-100 h-100 p-20" tabIndex={0} role="link" aria-label={props?.data?.title} onClick={handleSetItem} onKeyDown={(event)=>handleEnter(event)}>
                    <div className={`${styles.productImages} d-block content-slide-img-container1`}>
                        <Image
                            src={props?.data?.image}
                            alt={props?.data?.title}
                            width={50}
                            height={100}
                            layout="responsive"  // This makes the image responsive
                            loading="lazy"
                            className={`${styles['card-img'] }`}
                        />
                    </div>
                    <div className={styles.productDetails}>
                        <h5 className={styles['card-title']}>{props?.data.title}</h5>
                        <p className="card-text">{props?.data?.price}</p>
                    </div>
                </span>
            </div>
        </>
    )
}

export default Cards;