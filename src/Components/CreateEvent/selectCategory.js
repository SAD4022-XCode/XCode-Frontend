import React from 'react';
import chroma from 'chroma-js';

import Select, { StylesConfig } from 'react-select';
const colourOptions = [
    { value: 'management', label: 'مدیریت', color: '#00B8D9',},
    { value: 'business', label: 'کسب و کار', color: '#0052CC'},
    { value: 'entrepreneurship', label: 'کارآفرینی', color: '#5243AA' },
    { value: 'financial', label: 'مالی', color: '#FF5630', isFixed: true },
    { value: 'technical', label: 'فنی، مهندسی و صنعت', color: '#FF8B00' },
    { value: 'technology', label: 'تکنولوژی', color: '#FFC400' },
    { value: 'personal_development_and_family', label: 'توسعه فردی و خانواده', color: '#36B37E' },
    { value: 'educational', label: 'تحصیلی', color: '#00875A' },
    { value: 'humanities', label: 'علوم انسانی', color: '#253858' },
    { value: 'medical', label: 'پزشکی', color: '#666666' },
    { value: 'cultural_artistic', label: 'فرهنگی هنری', color: '#00B8D9'},
    { value: 'basic_sciences', label: 'علوم پایه', color: '#0052CC'},
    { value: 'tourism', label: 'گردشگری', color: '#5243AA' },
    { value: 'entertainment', label: 'سرگرمی', color: '#FF5630',},
    { value: 'sports', label: 'ورزشی', color: '#FF8B00' },
    { value: 'religious_and_social', label: 'مذهبی و مناسبتی', color: '#FFC400' },
    { value: 'other', label: 'غیره', color: '#36B37E' },
];


const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',
  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles = {
  control: (styles) => ({ ...styles, color: '#1f2029',
  backgroundColor: '#1f2029',height:"48px",
  border: '1px solid',
    borderColor: '#ced4da',
    borderRadius: '8px',
    '&:hover': {
      borderColor: '#ffeba7'
    },
    }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
  singleValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      color: data.color,
      alignItems: 'center',
      display: 'flex',
      ':before': {
        backgroundColor: data.color,
        borderRadius: 10,
        content: '" "',
        display: 'block',
        marginRight: 8, // اضافه کردن فاصله به سمت راست متن
        marginLeft: 5,
        height: 10,
        width: 10,
      }
    };
  },
  
};

const SelectCategory=({selectedCategory, setSelectedCategory}) => {
    return (
        <Select
            defaultValue={colourOptions[2]}
            onChange={setSelectedCategory}
            options={colourOptions}
            styles={colourStyles}
        />
    );
    
}
export default SelectCategory;
  