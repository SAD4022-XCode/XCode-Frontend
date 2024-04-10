import * as yup from "yup"

export const createEventValidationSchema = yup.object().shape({
    eventName: yup.string().min(3,"نام رویداد حداقل شامل 3 کاراکتر باید باشد").max(30,"نام رویداد حداکثر شامل 30 کاراکتر باید باشد").required("یک نام برای رویداد انتخاب کنید"),
    ssn: yup.string("").min(10,"کدملی شامل 10 عدد است").max(10,"کدملی شامل 10 عدد است").required("لطفا کدملی خود را وارد کنید"),
    phoneNumber :yup.string("").min(12,"شماره تلفن شامل 12 عدد است").max(12,"شماره تلفن شامل 12 عدد است").required("لطفا شماره تلفن خود را وارد کنید"),
    eventDescription: yup.string().min(20,"توضیحات حداقل باید 20 کاراکتر باشد").max(500,"توضیحات حداکثر می تواند شامل 500 کاراکتر باشد").required("لطفا در مورد جزئیات رویداد خود بنویسید")
});