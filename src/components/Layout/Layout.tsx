import {FC, PropsWithChildren} from 'react';
import c from './Layout.module.css'
const Layout: FC<PropsWithChildren> = ({children}) => {
  return (
    <main className={`container ${c.layout}`}>
      {children}
    </main>
  );
};

export default Layout;