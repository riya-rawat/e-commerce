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
    initialData,
    revalidateOnFocus: false,
    refreshInterval: 60000, // Revalidate every minute
  });

  if (error) return <div>Error loading products</div>;

  return (
    <div className="container">
      <h1 className={styles.pageHeading}>All Products</h1>
      <div className="row">
        {products?.map((item: itemType) => {
          return <Cards key={item?.id} data={item}/>;
        })}
        {products?.length === 0 && <p>No Products Available</p>}
      </div>
    </div>
  );
}