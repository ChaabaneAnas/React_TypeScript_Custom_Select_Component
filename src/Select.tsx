import { useState } from 'react';
import styles from './select.module.css';

type SelectOption = {
  label: string;
  value: number;
};

type SelectProps = {
  options: SelectOption[];
  value: SelectOption;
  onchange: (value: SelectOption | undefined) => void;
};

function Select({ options, value, onchange }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActiveIndex, setActiveIndex] = useState<number | undefined>();
  const [isHighlighted, setIsHighlighted] = useState<number>(0);

  console.log(isActiveIndex, isHighlighted);
  function ontoggel() {
    setIsOpen((prev) => !prev);
    setIsHighlighted(0);
  }

  function onblurr() {
    setIsOpen(false);
    setIsHighlighted(0);
  }

  function onClose(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onchange(undefined);
  }

  function onSelect(index: number, option: SelectOption) {
    onchange(option);
    setActiveIndex(index);
    setIsHighlighted(0);
  }

  function onHover(index: number) {
    setIsHighlighted(index);
  }

  return (
    <div
      onClick={ontoggel}
      onBlur={onblurr}
      tabIndex={0}
      className={styles.container}
    >
      <span>{value?.label}</span>
      <button onClick={onClose} className={styles['close-btn']}>
        &times;
      </button>
      <div className={styles.devider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.active : ''}`}>
        {options.map((option, index) => (
          <li
            className={`${styles.option} ${
              isActiveIndex === index ? styles.selected : ''
            } ${isHighlighted === index ? styles.highlighted : ''}`}
            onClick={() => onSelect(index, option)}
            key={option.value}
            onMouseEnter={() => onHover(index)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Select;
