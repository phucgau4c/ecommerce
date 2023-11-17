import { useLocation } from 'react-router';

import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import MenuLeft from './components/Layout/MenuLeft';
import MenuLeftAccount from './components/Layout/MenuLeftAccount';
import Carousel from './components/Layout/Carousel';
import { GlobalProvider } from './context/GlobalContext';

function App({ children }) {
  let params = useLocation();
  return (
    <>
      <GlobalProvider>
        <Header />
        {params.pathname === '/' && <Carousel />}
        <section>
          <div className="container">
            <div className="row">
              {params.pathname.includes('account') ? (
                <MenuLeftAccount />
              ) : (
                params.pathname !== '/product/cart' && <MenuLeft />
              )}

              {children}
            </div>
          </div>
        </section>
        <Footer />
      </GlobalProvider>
    </>
  );
}

export default App;
