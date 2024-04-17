import {FC, PropsWithChildren} from "react";
import c from './FormInputGroup.module.css';

const FormInputGroup:FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={c.group}>
      {children}
    </div>
  );
};

export default FormInputGroup;