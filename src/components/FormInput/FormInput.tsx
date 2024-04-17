import {FC} from 'react';
import c from "./FormInput.module.css";

interface iFromInput {
  value: string
  onChange: (string: string) => void
  isDarkTheme?: boolean
  placeholder?: string
  text?: string
  comment?: string
  type?: 'number' | 'text'
}

const FormInput:FC<iFromInput> = ({value, onChange, isDarkTheme= false, placeholder = 'Название задачи', text, comment, type = 'text'}) => {
  return (
    <label className={`${c.formLabel} ${isDarkTheme ? c.darkTheme : ''}`}>
      {comment && <div className={c.comment}>{comment}</div>}
      {text && <span className={c.span}>{text}</span>}
      <input
        required
        className={c.formInput}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={({target}) => onChange(target.value)}
      />
    </label>
  );
};

export default FormInput;