'use client'
import styles from "../assets/css/page.module.scss";
import Cards from "../common/components/cards";
import { fetchData, fetcher} from '../common/lib/Util';
import useSWR from 'swr';
import { apiUrl, productPropType,itemType } from "../common/lib/constant";
import Modal from "../common/components/modal";
import { Fragment } from "react";
export async function getServerSideProps() {
  const res = await fetchData(apiUrl);
  return { props: { initialData:{res} } };
}

export default function Home(props:productPropType) {
  const initialData = props?.initialData?.res || [];
  const { data, error } = useSWR(apiUrl, fetcher,{
    fallbackData:initialData,
    revalidateOnFocus: false, // Re-fetch the data when the window is focused
    dedupingInterval: 1800000, // Cache deduplication (prevents duplicate requests within this time interval)
    refreshInterval: 1800000, // Automatically refresh the data every 30 minutes (in ms) 
  }
);

  if (error) return <div>Error loading products</div>;

  return (
    <>
      <div className="container">
        <h1 className={styles.pageHeading}>All Products</h1>
        <div className="row" data-testid="produc-row">
          {data?.map((item: itemType) => {
            return <Fragment key={item?.id}><Cards data={item}/></Fragment>;
          })}
          {data?.length === 0 && <p>No Products Available</p>}
        </div>
      </div>
      <Modal />
    </>
  );
}