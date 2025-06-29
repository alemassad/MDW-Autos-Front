import Footer from "../Footer";
import Header from "../Header";
import globalStyles from "../../pages/Pages.module.css";

const Layout = ({children}: {children: | string | number | React.ReactElement<unknown,string | React.JSXElementConstructor<unknown>>}) => {
  return (
    <div className={globalStyles.container} style={{width: '100vw', minWidth: '100vw', maxWidth: '100vw'}}>
      <Header />
      <main className={globalStyles.main} style={{width: '100%'}}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;