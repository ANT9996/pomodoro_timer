import {FC, PropsWithChildren} from 'react';
import {layout} from './Layout.module.css'
const Layout: FC<PropsWithChildren> = ({children}) => {
  return (
    <main className={`container ${layout}`}>
      {children}
    </main>
  );
};

export default Layout;