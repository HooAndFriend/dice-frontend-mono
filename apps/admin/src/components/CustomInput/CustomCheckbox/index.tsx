import React, { ChangeEvent, useEffect, useState } from 'react';

interface CheckboxProps {
  item?: { label: string; value: string }[];
  name?: string;
  value: string[];
  onChange: (value: string[]) => void;
}

const CustomCheckbox = ({ item, value, onChange, name }: CheckboxProps) => {
  const [allChecked, setAllChecked] = useState(false);

  // 전체 체크 여부
  useEffect(() => {
    if (allChecked) { onChange(item?.map((i) => i.value) || []); }
    else {onChange(value.filter((val) => val !== '전체'));}
  }, [allChecked]);

  const handleChange = (itemValue: string) => {
    let updatedValues: string[];

    if (itemValue === '전체') {
      setAllChecked(!allChecked);
      if (!allChecked) {
        updatedValues = item?.map((i) => i.value) || [];
      } else {
        updatedValues = [];
      }
    } else { 
      updatedValues = value.includes(itemValue)
        ? value.filter((val) => val !== itemValue)
        : [...value, itemValue];

      if (
        updatedValues.length === (item?.length || 0) - 1 &&
        !updatedValues.includes('전체')
      ) {
        updatedValues.push('전체');
        setAllChecked(true);
      } else {
        setAllChecked(false);
      }
    }

    onChange(updatedValues);
  };

  return (
    <div className="flex items-center">
      {item?.map((checkboxItem, index) => ( 
        <div key={index} className="flex items-center">
          <input
            name={name}
            type="checkbox"
            checked={value.includes(checkboxItem.value)}
            onChange={() => handleChange(checkboxItem.value)}
            className="mx-2"
          />
          <label>{checkboxItem.label}</label>
        </div>
      ))}
    </div>
  );
};

export default CustomCheckbox;
