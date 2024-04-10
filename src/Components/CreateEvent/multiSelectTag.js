import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
const Tags = [
  { label: 'برنامه نویسی' ,value:"برنامه نویسی"},
  { label: 'تکنولوژی' ,value:"تکنولوژی"},
  { label: 'جاوااسکریپت' ,value:"جاوااسکزیپن"},
  { label: 'پایتون' ,value:"پایتون"},
  { label: 'شبکه' ,value:"شبکه"},
  { label: 'هوش مصنوعی' ,value:"هوش مصنوعی"},
  { label: 'لینوکس' ,value:"لینوکس"},
];


const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: '1px solid',
    borderColor: state.isFocused ? '#3BEA18' : state.isSelected ? '#F71500' : '#ced4da',
    borderRadius: '8px',
    '&:hover': {
      borderColor: '#ffeba7'
    },
    minHeight:"48px",
    color: '#1f2029',
    backgroundColor: '#1f2029',
    
   
  
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#A72A28' : 'transparent',
    color: state.isSelected ? '#fff' : '#000',
    
    '&:hover': {
      backgroundColor: '#F9E508',
      color: '#fff'
    }
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: '#ffeba7', // Change the background color of selected items
    color:"#000000",
    borderRadius: '2px',
    marginRight: '5px',
    height:'25px',
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: '#333333', // Change the text color of the label of selected items
    // padding: '2px 16px'
    padding: '4px 15px 0px 0px',
    
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    color: '#000', // Change the color of the "x" icon for removing selected items
    marginLeft: '0',
      '&:hover': {
      backgroundColor: '#FE6759', // Change the background color of the "x" icon on hover
      color: '#FF0000',
      
    }
  }),
  input: (provided, state) => ({
    ...provided,
    color: '#c4c3ca' // Change the text color of the input when typing
  }),

  // سایر استایل‌ها...
  menuList: (provided, state) => ({
    ...provided,
    paddingTop: '4px', // تنظیم فاصله بالا
    paddingBottom: '4px', // تنظیم فاصله پایین
  }),
 

};

 

const MultiSelectTag=({selectedTags, setSelectedTags}) => {

  const handleChange = (selectedItems) => {
    if (selectedItems.length <= 5) {
      setSelectedTags(selectedItems);
    }
  }
  return (
    <div className="select-tag mt-2">
      <CreatableSelect 
        isClearable 
        isMulti 
        formatCreateLabel={(inputValue) => `افزودن: ${inputValue}`} 
        value={selectedTags}
        onChange={handleChange}
        options={Tags}  
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