import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import { Controller, useForm } from "react-hook-form";
const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const Calendar = ({ sendDataToParent }) => {
  const digits = persian_fa.digits;
  const persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ];
  const arabicNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [dateValue, setValue] = useState();
  const { control } = useForm();
  const dateHandler = (date, { input, isTyping }) => {
    if (!isTyping) {
      if (date != null) {
        for (let i = 0; i < persianNumbers.length; i++) {
          date = date.toString().replace(persianNumbers[i], arabicNumbers[i]);
        }

        date = date.replace(/\//g, "-");
      }
      return setValue(date);
    } // user selects the date from the calendar and no needs for validation.

    let value = input.value;

    for (let digit of digits) {
      value = value.replace(new RegExp(digit, "g"), digits.indexOf(digit));
    }

    const strings = value.split("/");
    const numbers = strings.map(Number);
    const [year, month, day] = numbers;

    if (input.value && numbers.some((number) => isNaN(number))) {
      return false; //in case user enter something other than digits
    }

    if (month > 12 || month < 0) return false; //month < 0 in case user want to type 01
    if (day < 0 || (date && day > date.day)) return false;
    if (strings.some((val) => val.startsWith("00"))) return false;
    if (date != null) {
      for (let i = 0; i < persianNumbers.length; i++) {
        date = date.toString().replace(persianNumbers[i], arabicNumbers[i]);
      }

      date = date.replace(/\//g, "-");
    }
    setValue(date);
    sendDataToParent(dateValue);
  };
  return (
    <Controller
      control={control}
      name="date"
      rules={{ required: true }} //optional
      render={({
        field: { onChange, name, value },
        formState: { errors }, //optional, but necessary if you want to show an error message
      }) => (
        <>
          <DatePicker
            weekDays={weekDays}
            className="bg-dark"
            animations={[
              transition({
                from: 35,
                transition:
                  "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
              }),
            ]}
            minDate="1300/01/01"
            maxDate="1403/02/15"
            value={dateValue || ""}
            onChange={dateHandler}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
          />
          {errors && errors[name] && errors[name].type === "required" && (
            //if you want to show an error message
            <span>تاریخ وارد شده مشکل دارد</span>
          )}
        </>
      )}
    />
  );
};

export default Calendar;
