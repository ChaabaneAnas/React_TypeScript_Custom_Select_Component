import { useState } from 'react';
import styles from './select.module.css';

type SelectOption = {
  label: string;
  value: number;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[] | []) => void;
};

type SelectProps = { options: SelectOption[] } & (
  | SingleSelectProps
  | MultipleSelectProps
);

function Select({ multiple, options, value, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActiveIndex, setActiveIndex] = useState<number | undefined>();
  const [isHighlighted, setIsHighlighted] = useState<number>(0);

  function ontoggel() {
    setIsOpen((prev) => !prev);
    setIsHighlighted(0);
  }

  function onblurr() {
    setIsOpen(false);
    setIsHighlighted(0);
  }

  function onClose() {
    multiple ? onChange([]) : onChange(undefined);
  }

  function onSelect(index: number, option: SelectOption) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((v) => v !== option));
      } else onChange([...value, option]);
    } else onChange(option);
    setActiveIndex(index);
    setIsHighlighted(0);
  }

  function isSelected(option: SelectOption) {
    return multiple ? value.includes(option) : value === option;
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
      <span>
        {multiple
          ? value.map((v) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(NaN, v);
                }}
                key={v.value}
              >
                {v.label} &times;
              </button>
            ))
          : value?.label}
      </span>
      <button onClick={onClose} className={styles['close-btn']}>
        &times;
      </button>
      <div className={styles.devider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.active : ''}`}>
        {options.map((option, index) => (
          <li
            className={`${styles.option} ${
              isSelected(option) ? styles.selected : ''
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
