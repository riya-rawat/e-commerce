
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/globals.scss'; 
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../common/redux-store/store'
function MyApp({ Component, pageProps }: AppProps) {

  return (
  <Provider store={store}><Component {...pageProps} /></Provider>);
}

export default MyApp;