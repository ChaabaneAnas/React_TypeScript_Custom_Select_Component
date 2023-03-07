import { useEffect, useRef, useState } from 'react';
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
  const [isHighlighted, setIsHighlighted] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (e.target !== containerRef.current) return;
      switch (e.code) {
        case 'Enter':
        case 'Space':
          setIsOpen((prev) => !prev);
          if (isOpen) onSelect(NaN, options[isHighlighted]);
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          if (e.code === 'ArrowUp' && isHighlighted > 0) {
            setIsHighlighted((prev) => prev - 1);
          }
          if (e.code === 'ArrowDown' && isHighlighted < options.length - 1) {
            setIsHighlighted((prev) => prev + 1);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    };
    containerRef.current?.addEventListener('keydown', handler);

    return () => {
      containerRef.current?.removeEventListener('keydown', handler);
    };
  }, [isOpen, isHighlighted, options]);

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
      ref={containerRef}
      onClick={ontoggel}
      onBlur={onblurr}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>
        {multiple
          ? value.map((v) => (
              <button
                className={styles.badge}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(NaN, v);
                }}
                key={v.value}
              >
                {v.label}
                <span className={styles['remove-btn']}> &times; </span>
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
