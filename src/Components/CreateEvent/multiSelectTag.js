import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
const options = [
  { label: 'برنامه نویسی' ,value:"برنامه نویسی"},
  { label: 'تکنولوزی' ,value:"تکنولوژی"},
  { label: 'جاوااسکریپت' ,value:"جاوااسکزیپن"},
  { label: 'پایتون' ,value:"پایتون"},
  { label: 'شبکه' ,value:"شبکه"},
  { label: 'هوش مصنوعی' ,value:"هوش مصنوعی"},
  { label: 'لینوکس' ,value:"لینوکس"},
];


const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: '2px solid',
    borderColor: state.isFocused ? '#007bff' : state.isSelected ? '#F71500' : '#ced4da',
    borderRadius: '8px',
    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0,123,255,.25)' : null,
    '&:hover': {
      borderColor: '#007bff'
    }
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#A72A28' : 'transparent',
    color: state.isSelected ? '#fff' : '#000',
    '&:hover': {
      backgroundColor: '#EDDE37',
      color: '#fff'
    }
  })
};



const MultiSelectTag=({selectedOptions, setSelectedOptions}) => {

  const handleChange = (selectedItems) => {
    if (selectedItems.length <= 5) {
      setSelectedOptions(selectedItems);
    }
  }
  return (
    <div className="select-tag form-group mt-2">
      <CreatableSelect 
        isClearable 
        isMulti 
        value={selectedOptions}
        onChange={handleChange}
        options={options}  
        closeMenuOnSelect={false}
        components={animatedComponents}
        maxMenuHeight={300}
        styles={customStyles}
        placeholder="تگ های مورد نظر خود را انتخاب کنید"
        required={false}
      />
    </div>
  );
}

export default MultiSelectTag;