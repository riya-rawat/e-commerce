// import Image from "next/image";
import styles from "../assets/css/page.module.scss";
import Cards from "../common/components/cards";
import { fetchData, fetcher} from '../common/lib/Util';
import useSWR from 'swr';
import { apiUrl, productPropType,itemType } from "../common/lib/constant";

export async function getServerSideProps() {
  const res = await fetchData(apiUrl);
  return { props: { initialData:{res} } };
}

export default function Home(props:productPropType) {
  const initialData = props?.initialData?.res;
  const { data: products, error } = useSWR(apiUrl, fetcher, {
    fallbackData:initialData,
    revalidateOnFocus: false, // Re-fetch the data when the window is focused
    dedupingInterval: 1800000, // Cache deduplication (prevents duplicate requests within this time interval)
    refreshInterval: 1800000, // Automatically refresh the data every 30 minutes (in ms) 
  });

  if (error) return <div>Error loading products</div>;

  return (
    <div className="container">
      <h1 className={styles.pageHeading}>All Products</h1>
      <div className="row" data-testid="produc-row">
        {products?.map((item: itemType) => {
          return <Cards key={item?.id} data={item}/>;
        })}
        {products?.length === 0 && <p>No Products Available</p>}
      </div>
    </div>
  );
}