import * as yup from "yup"

export const createEventValidationSchema = yup.object().shape({
    eventName: yup.string().min(3,"نام رویداد حداقل شامل 3 کاراکتر باید باشد").max(30,"نام رویداد حداکثر شامل 30 کاراکتر باید باشد").required("یک نام برای رویداد انتخاب کنید"),
    ssn: yup.string("").matches(/^\d{10}$/, 'کدملی باید شامل 10 عدد باشد').required("لطفا کدملی خود را وارد کنید"),
    phoneNumber :yup.string("").matches(/^\d{11}$/, 'شماره تلفن باید شامل 11 عدد باشد').required("لطفا شماره تلفن خود را وارد کنید"),
    eventDescription: yup.string().min(20,"توضیحات حداقل باید 20 کاراکتر باشد").max(500,"توضیحات حداکثر می تواند شامل 500 کاراکتر باشد").required("لطفا در مورد جزئیات رویداد خود بنویسید"),
    ticketCount : yup.number().positive("عددی مثبت وارد کنید").max(10000,"رویداد حداکثر 10هزار بلیت می تواند داشته باشد").required("تعداد بلیت را مشخص کنید"),
    ticketPrice : yup.number().positive("عددی مثبت وارد کنید").max(10000000,"بلیت رویداد حداکثر می تواند 10میلیون باشد").required("قیمت بلیت را وارد کنید"),
    eventLink: yup.string().max(150,"حداکثر طول لینک 150 کاراکتر است").matches(/^(http:\/\/|https:\/\/)(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,}(\/\S*)?$/, 'لینک معتبر نیست').required('لطفاً لینک را وارد کنید'),
});