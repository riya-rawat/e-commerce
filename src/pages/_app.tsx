
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/globals.scss'; 
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../common/redux-store/store'
import { SWRConfig } from 'swr';
import { localStorageCache } from '../common/lib/localstorageCache';

function MyApp({ Component, pageProps }: AppProps) {
  const cache = localStorageCache();
  return (
    <SWRConfig value={{ provider: () => cache }}>
      <Provider store={store}><Component {...pageProps} /></Provider>;
    </SWRConfig>
  )
}

export default MyApp;