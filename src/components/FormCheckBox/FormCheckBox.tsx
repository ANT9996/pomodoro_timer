import {FC} from 'react';
import c from './FormCheckBox.module.css'

interface iFormCheckBox {
  checked: boolean
  onChange: (value: boolean) => void
  isDarkTheme: boolean
  text?: string
}

const FormCheckBox:FC<iFormCheckBox> = ({checked, onChange, isDarkTheme, text}) => {

  return (
    <label className={`${c.label} ${isDarkTheme ? c.darkTheme : ''}`}>
      {text && <span className={c.span}>{text}</span>}
      <input type="checkbox" checked={checked} onChange={({target}) => onChange(target.checked)}/>
    </label>
  );
};

export default FormCheckBox;