import React, { useState } from 'react';

const CityList = ({ selectedProvince, setSelectedProvince,selectedCity,setSelectedCity }) => {
    const provinces = [
        {name: "تهران", cities: ["احمدآبادمستوفي", "ادران", "اسلام آباد", "اسلام شهر", "اكبرآباد", "اميريه", "انديشه", "اوشان", "آبسرد", "آبعلي", "باغستان", "باقر شهر", "برغان", "بومهن", "پارچين", "پاكدشت", "پرديس", "پرند", "پس قلعه", "پيشوا", "تجزيه مبادلات لشكر", "تهران", "جاجرود", "چرمسازي سالاريه", "چهاردانگه", "حسن آباد", "حومه گلندوك", "خاتون آباد", "خاوه", "خرمدشت", "دركه", "دماوند", "رباط كريم", "رزگان", "رودهن", "ري", "سعيدآباد", "سلطان آباد", "سوهانك", "شاهدشهر", "شريف آباد", "شمس آباد", "شهر قدس", "شهرآباد", "شهرجديدپرديس", "شهرقدس(مويز)", "شهريار", "شهرياربردآباد", "صالح آباد", "صفادشت", "فرودگاه امام خميني", "فرون آباد", "فشم", "فيروزكوه", "قرچك", "قيام دشت", "كهريزك", "كيلان", "گلدسته", "گلستان (بهارستان)", "گيلاوند", "لواسان", "لوسان بزرگ", "مارليك", "مروزبهرام", "ملارد", "منطقه 11 پستي تهران", "منطقه 13 پستي تهران", "منطقه 14 پستي تهران", "منطقه 15 پستي تهران", "منطقه 16 پستي تهران", "منطقه 17 پستي تهران", "منطقه 18 پستي تهران", "منطقه 19 پستي تهران", "نسيم شهر (بهارستان)", "نصيرآباد", "واوان", "وحيديه", "ورامين", "وهن آباد"]},
        {name: "گیلان", cities: ["احمد سرگوراب", "اسالم", "اسكلك", "اسلام آباد", "اطاقور", "املش", "آبكنار", "آستارا", "آستانه اشرفيه", "بازاراسالم", "بازارجمعه شاندرمن", "برهسر", "بلترك", "بلسبنه", "بندرانزلي", "پاشاكي", "پرهسر", "پلاسي", "پونل", "پيربست لولمان", "توتكابن", "جوكندان", "جيرنده", "چابكسر", "چاپارخانه", "چوبر", "خاچكين", "خشك بيجار", "خطبه سرا", "خمام", "ديلمان", "رانكوه", "رحيم آباد", "رستم آباد", "رشت", "رضوان شهر", "رودبار", "رودسر", "سراوان", "سنگر", "سياهكل", "شاندرمن", "شفت", "صومعه سرا", "طاهر گوداب", "طوللات", "فومن", "قاسم آبادسفلي", "كپورچال", "كلاچاي", "كوچصفهان", "كومله", "كياشهر", "گشت", "لاهيجان", "لشت نشا", "لنگرود", "لوشان", "لولمان", "لوندويل", "ليسار", "ماسال", "ماسوله", "منجيل", "هشتپر ـ طوالش", "واجارگاه"]},
        {name: "آذربایجان شرقی", cities: ["ابشاحمد", "اذغان", "اسب فروشان", "اسكو", "اغچه ريش", "اقمنار", "القو", "اهر", "ايلخچي", "آذرشهر", "باسمنج", "بخشايش ـ كلوانق", "بستان آباد", "بناب", "بناب جديد ـ مرند", "تبريز", "ترك", "تسوج", "جلفا", "خامنه", "خداآفرين", "خسروشهر", "خضرلو", "خلجان", "سبلان", "سراب", "سردرود", "سيس", "شادبادمشايخ", "شبستر", "شربيان", "شرفخانه", "شهر جديد سهند", "صوفيان", "عجب شير", "قره اغاج ـ چاراويماق", "قره بابا", "كردكندي", "كليبر", "كندرود", "كندوان", "گوگان", "مراغه", "مرند", "ملكان", "ممقان", "ميانه", "هاديشهر", "هريس", "هشترود", "هوراند", "ورزقان"]    },
        {name: "خوزستان", cities: ["اروندكنار", "اميديه", "انديمشك", "اهواز", "ايذه", "آبادان", "آغاجاري", "باغ ملك", "بندرامام خميني", "بهبهان", "جايزان", "جنت مكان", "چمران ـ شهرك طالقاني", "حميديه", "خرمشهر", "دزآب", "دزفول", "دهدز", "رامشير", "رامهرمز", "سربندر", "سردشت", "سماله", "سوسنگرد ـ دشت آزادگان", "شادگان", "شرافت", "شوش", "شوشتر", "شيبان", "صالح مشطت", "كردستان بزرگ", "گتوند", "لالي", "ماهشهر", "مسجد سليمان", "ملاثاني", "ميانكوه", "هفتگل", "هنديجان", "هويزه", "ويس"]    },
        {name: "فارس", cities: [" بيضا", "اردكان ـ سپيدان", "ارسنجان", "استهبان", "اشكنان ـ اهل", "اقليد", "اكبرآبادكوار", "اوز", "ايزدخواست", "آباده", "آباده طشك", "بالاده", "بانش", "بنارويه", "بهمن", "بوانات", "بوانات(سوريان)", "بيرم", "جنت شهر(دهخير)", "جهرم", "جويم", "حاجي آباد ـ زرين دشت", "حسن آباد", "خرامه", "خرمی", "خشت", "خنج", "خيرآبادتوللي", "داراب", "داريان", "دهرم", "رونيز ", "زاهدشهر", "زرقان", "سروستان", "سعادت شهر ـ پاسارگاد", "سيدان", "ششده", "شهر جديد صدرا", "شيراز", "صغاد", "صفاشهر ـ خرم بيد", "طسوج", "علاءمرودشت", "فدامي", "فراشبند", "فسا", "فيروزآباد", "فيشور", "قادرآباد", "قائميه", "قطب آباد", "قطرويه", "قير و كارزين", "كازرون", "كام فيروز", "كلاني", "كنارتخته", "كوار", "گراش", "گويم", "لار ـ لارستان", "لامرد", "مبارك آباد", "مرودشت", "مشكان", "مصيري ـ رستم", "مظفري", "مهر", "ميمند", "نورآباد ـ ممسني", "ني ريز", "وراوي"]    },
        {name: "اصفهان", cities: ["ابريشم", "ابوزيدآباد", "اردستان", "اريسمان", "اژيه", "اسفرجان", "اسلام آباد", "اشن", "اصغرآباد", "اصفهان", "امين آباد", "ايمان شهر", "آران وبيدگل", "بادرود", "باغ بهادران", "بهارستان", "بوئين ومياندشت", "پيربكران", "تودشك", "تيران", "جعفرآباد", "جندق", "جوجيل", "چادگان", "چرمهين", "چمگردان", "حسن اباد", "خالدآباد", "خميني شهر", "خوانسار", "خوانسارك", "خور", "خوراسگان", "خورزوق", "داران ـ فريدن", "درچه پياز", "دستگردوبرخوار", "دهاقان", "دهق", "دولت آباد", "ديزيچه", "رزوه", "رضوان شهر", "رهنان", "زاينده رود", "زرين شهر ـ لنجان", "زواره", "زيار", "زيبا شهر", "سپاهان شهر", "سده لنجان", "سميرم", "شاهين شهر", "شهرضا", "شهرك صنعتي مورچ", "شهرك مجلسي", "شهرک صنعتي محمودآباد", "طالخونچه", "عسگران", "علويچه", "غرغن", "فرخي", "فريدون شهر", "فلاورجان", "فولادشهر", "فولادمباركه", "قهد ريجان", "كاشان", "كليشادوسودرجان", "كمشچه", "كوهپايه", "گز", "گلپايگان", "گلدشت", "گلشهر", "گوگد", "مباركه", "مهاباد", "مورچه خورت", "ميمه", "نائين", "نجف آباد", "نصر آباد", "نطنز", "نيك آباد", "هرند", "ورزنه", "ورنامخواست", "ویلاشهر"]    },
        {name: "خراسان رضوی", cities: ["ابدال آباد", "ازادوار", "باجگيران", "باخرز", "باسفر", "بجستان", "بردسكن", "برون", "بزنگان", "بند قرائ", "بيدخت", "تايباد", "تربت جام", "تربت حيدريه", "جغتاي", "جنگل", "چمن آباد", "چناران", "خليل آباد", "خواف", "داورزن", "درگز", "دولت آباد ـ زاوه", "رادكان", "رشتخوار", "رضويه", "ريوش(كوهسرخ)", "سبزوار", "سرخس", "سلطان آباد", "سنگان", "شانديز", "صالح آباد", "طرقبه ـ بينالود", "طوس سفلي", "فريمان", "فيروزه ـ تخت جلگه", "فيض آباد ـ مه ولات", "قاسم آباد", "قدمگاه", "قوچان", "كاخك", "كاشمر", "كلات", "گلبهار", "گناباد", "لطف آباد", "مشهد", "مشهدريزه", "مصعبي", "نشتيفان", "نقاب ـ جوين", "نيشابور", "نيل شهر"]    },
        {name: "قزوین", cities: ["َآوج", "ارداق", "اسفرورين", "اقباليه", "الوند ـ البرز", "آبگرم", "آبيك", "آقابابا", "بوئين زهرا", "بیدستان", "تاكستان", "حصاروليعصر", "خاكعلي", "خرم دشت", "دانسفهان", "سيردان", "شال", "شهر صنعتي البرز", "ضياآباد", "قزوين", "ليا", "محمديه", "محمود آباد نمونه", "معلم كلايه", "نرجه"]    },
        {name: "سمنان", cities: ["ارادان", "اميريه", "ايوانكي", "بسطام", "بيارجمند", "خيرآباد", "دامغان", "درجزين", "سرخه", "سمنان", "شاهرود", "شهميرزاد", "گرمسار", "مجن", "مهدي شهر", "ميامي", "ميغان"]    },
        {name: "قم", cities: ["دستجرد", "سلفچگان", "شهر جعفریه", "قم", "قنوات", "كهك"]    },
        {name: "مرکزی", cities: ["اراک", "آستانه", "آشتیان", "تفرش", "توره", "جاورسیان", "خسروبیک", "خشک رود", "خمین", "خنداب", "دلیجان", "ریحان علیا", "زاویه", "ساوه", "شازند", "شهراب", "شهرک مهاجران", "فرمهین", "کمیجان", "مامونیه ـ زرندیه", "محلات", "میلاجرد", "هندودر"]},
        {name: "زنجان", cities: ["آب بر ـ طارم", "ابهر", "اسفجین", "پری", "حلب", "خرمدره", "دستجرده", "دندی", "زرین آباد ـ ایجرود", "زرین رود", "زنجان", "سلطانیه", "صائین قلعه", "قیدار", "گرماب", "گیلوان", "ماهنشان", "همایون", "هیدج"]},
        {name: "مازندران", cities: ["اسلام آباد", "اميركلا", "ايزدشهر", "آمل", "آهنگركلا", "بابل", "بابلسر", "بلده", "بهشهر", "بهنمير", "پل سفيد ـ سوادكوه", "تنكابن", "جويبار", "چالوس", "چمستان", "خرم آباد", "خوشرودپی", "رامسر", "رستم كلا", "رويانشهر", "زاغمرز", "زرگر محله", "زيرآب", "سادات محله", "ساري", "سرخرود", "سلمانشهر", "سنگده", "سوا", "سورك", "شيرگاه", "شيرود", "عباس آباد", "فريدون كنار", "قائم شهر", "كلارآباد", "كلاردشت", "كيا كلا", "كياسر", "گزنك", "گلوگاه", "گهرباران", "محمودآباد", "مرزن آباد", "مرزي كلا", "نشتارود", "نكاء", "نور", "نوشهر"]},
        {name: "گلستان", cities: ["انبار آلوم", "اينچه برون", "آزادشهر", "آق قلا", "بندر گز", "بندرتركمن", "جلين", "خان ببين", "راميان", "سيمين شهر", "علي آباد", "فاضل آباد", "كردكوي", "كلاله", "گاليكش", "گرگان", "گميش تپه", "گنبدكاوس", "مراوه تپه", "مينودشت"]},
        {name: "اردبیل", cities: ["ابي بيگلو", "اردبيل", "اصلاندوز", "بيله سوار", "پارس آباد", "تازه كند انگوت", "جعفرآباد", "خلخال", "سرعين", "شهرك شهيد غفاري", "كلور", "كوارئيم", "گرمي ", "گيوي ـ كوثر", "لاهرود", "مشگين شهر", "نمين", "نير", "هشتجين"]},
        {name: "آذربایجان غربی", cities: ["اروميه", "اشنويه", "ايواوغلي", "بازرگان", "بوكان", "پسوه", "پلدشت", "پيرانشهر", "تازه شهر", "تكاب", "چهاربرج قديم", "خوي", "ديزج", "ديزجديز", "ربط", "زيوه", "سردشت", "سلماس", "سيلوانا", "سيلوه", "سيه چشمه ـ چالدران", "شاهين دژ", "شوط", "قره ضياء الدين ـ چايپاره", "قوشچي", "كشاورز (اقبال)", "ماكو", "محمد يار", "محمودآباد", "مهاباد", "مياندوآب", "مياوق", "ميرآباد", "نقده", "نوشين شهر"]},
        {name: "همدان", cities: ["ازندريان", "اسدآباد", "اسلام آباد", "بهار", "پايگاه نوژه", "تويسركان", "دمق", "رزن", "سامن", "سركان", "شيرين سو", "صالح آباد", "فامنين", "قروه درجزين", "قهاوند", "كبودرآهنگ", "گيان", "لالجين", "ملاير", "نهاوند", "همدان"]},
        {name: "کردستان", cities: ["اورامانتخت", "بانه", "بلبان آباد", "بيجار", "دلبران", "دهگلان", "ديواندره", "سروآباد", "سريش آباد", "سقز", "سنندج", "قروه", "كامياران", "مريوان", "موچش"]},
        {name: "کرمانشاه", cities: ["اسلام آباد غرب", "باينگان", "بيستون", "پاوه", "تازه آباد ـ ثلاث باباجاني", "جوانرود", "روانسر", "ريجاب", "سراب ذهاب", "سرپل ذهاب", "سنقر", "صحنه", "فرامان", "فش", "قصرشيرين", "كرمانشاه", "كنگاور", "گيلانغرب", "نودشه", "هرسين", "هلشي"]},
        {name: "لرستان", cities: ["ازنا", "الشتر ـ سلسله", "اليگودرز", "برخوردار", "بروجرد", "پل دختر", "تقي آباد", "چغلوندی", "چقابل", "خرم آباد", "دورود", "زاغه", "سپيددشت", "شول آباد", "كوناني", "كوهدشت", "معمولان", "نورآباد ـ دلفان", "واشيان نصيرتپه"]},
        {name: "بوشهر", cities: ["ابدان", "اهرم ـ تنگستان", "آباد", "آبپخش", "بادوله", "برازجان ـ دشتستان", "بردخون", "بندردير", "بندرديلم", "بندرريگ", "بندركنگان", "بندرگناوه", "بوشهر", "تنگ ارم", "جزيره خارك", "جم", "چغارك", "خورموج ـ دشتي", "دلوار", "ريز", "سعدآباد", "شبانكاره", "شنبه", "شول", "عالی شهر", "عسلويه", "كاكي", "كلمه", "نخل تقي", "وحدتيه"]},
        {name: "کرمان", cities: ["اختيارآباد", "ارزوئیه", "امين شهر", "انار", "باغين", "بافت", "بردسير", "بلوك", "بم", "بهرمان", "پاريز", "جواديه فلاح", "جوشان", "جيرفت", "چترود", "خانوك", "دوساري", "رابر", "راور", "راين", "رفسنجان", "رودبار", "ريگان", "زرند", "زنگي آباد", "سرچشمه", "سريز", "سيرجان", "شهربابك", "صفائيه", "عنبرآباد", "فارياب", "فهرج", "قلعه گنج", "كاظم آباد", "كرمان", "كهنوج", "كهنوج( مغزآباد)", "كوهبنان", "كيان شهر", "گلباف", "ماهان", "محمدآباد ـ ريگان", "محي آباد", "منوجان", "نجف شهر", "نگار"]},
        {name: "هرمزگان", cities: ["ابوموسي", "ايسين", "بستك", "بندرخمير", "بندرعباس", "بندرلنگه", "بندزك كهنه", "پارسيان", "پدل", "پل شرقي", "تياب", "جاسك", "جزيره سيري", "جزيره لاوان", "جزيره هنگام", "جزيرهلارك", "جناح", "چارك", "حاجي آباد", "درگهان", "دشتي", "دهبارز ـ رودان", "رويدر", "زيارت علي", "سردشت ـ بشاگرد", "سندرك", "سيريك", "فارغان", "فين", "قشم", "كنگ", "كيش", "ميناب"]},
        {name: "چهارمحال و بختیاری", cities: ["اردل", "آلوني", "باباحيدر", "بروجن", "بلداجي", "بن", "جونقان", "چالشتر", "چلگرد ـ كوهرنگ", "دزك", "دستنائ", "دشتك", "سامان", "سودجان", "سورشجان", "شلمزار ـ كيار", "شهركرد", "فارسان", "فرادنبه", "فرخ شهر", "كیان", "گندمان", "گهرو", "لردگان", "مال خليفه", "ناغان", "هاروني", "هفشجان", "وردنجان"]},
        {name: "یزد", cities: ["ابركوه", "احمدآباد", "اردكان", "بافق", "بفروئيه", "بهاباد", "تفت", "حميديا", "زارچ", "شاهديه", "صدوق", "طبس", "عشق آباد", "فراغه", "مروست", "مهريز", "ميبد", "نير", "هرات ـ خاتم", "يزد"]},
        {name: "سیستان و بلوچستان", cities: ["اسپكه", "ايرانشهر", "بزمان", "بمپور", "بنت", "بنجار", "پسكو", "تيموراباد", "جالق", "چابهار", "خاش", "دوست محمد ـ هيرمند", "راسك", "زابل", "زابلي", "زاهدان", "زهك", "ساربوك", "سراوان", "سرباز", "سنگان", "سوران ـ سيب سوران", "سيركان", "فنوج", "قصرقند", "كنارك", "كيتج", "گلمورتي ـ دلگان", "گوهركوه", "محمدآباد", "ميرجاوه", "نصرت آباد", "نگور", "نيك شهر", "هيدوچ"]},
        {name: "ایلام", cities: ["اركواز", "ارمو", "ايلام", "ايوان", "آبدانان", "آسمان آباد", "بدره", "توحيد", "چشمه شيرين", "چوار", "دره شهر", "دهلران", "سرابله ـ شيروان و چرداول", "شباب", "شهرك اسلاميه", "لومار", "مهران", "موسيان", "ميمه"]},
        {name: "کهگلویه و بویراحمد", cities: ["باشت", "پاتاوه", "چرام", "دهدشت ـ كهگيلويه", "دوگنبدان ـ گچساران", "ديشموك", "سپيدار", "سوق", "سي سخت ـ دنا", "قلعه رئيسي", "لنده", "ليكك", "مادوان", "ياسوج ـ 7591"]},
        {name: "خراسان شمالی", cities: ["اسفراين", "ايور", "آشخانه ـ مانه و سلمقان", "بجنورد", "جاجرم", "درق", "راز", "شوقان", "شيروان", "فاروج", "گرمه"]},
        {name: "خراسان جنوبی", cities: ["ارسك", "اسديه ـ درميان", "آرين شهر", "آيسك", "بشرويه", "بیرجند", "حاجي آباد", "خضري دشت بياض", "خوسف", "زهان", "سر بیشه", "سرايان", "سه قلعه", "فردوس", "قائن ـ قائنات", "گزيک", "مود", "نهبندان", "نیمبلوك"]},
        {name: "البرز", cities:["هشتگرد-ساوجبلاغ","نظرآباد","مشکین دشت","ماهدشت","گرمدره","کوهسار-چندار","کمال شهر","کرج","طالقان","شهر جدید هشتگرد","سیف آباد","چهارباغ","آسارا","اشتهارد"]},
    ];


    const handleSelectedProvince = (event) => {
        setSelectedProvince(event.target.value);
    };

    const handleSelectedCity = (event) => {
        setSelectedCity(event.target.value);
    };

    const citiesOptions = provinces.find(province => province.name === selectedProvince)?.cities || [];

    return (
        <div className='city-list-container'>
            <div className='col-6'>
                <select value={selectedProvince} onChange={handleSelectedProvince} className='province-city'>
                    <option value="">لطفا استان را انتخاب نمایید</option>
                    {provinces.map((province, index) => (
                        <option key={index} value={province.name}>{province.name}</option>
                    ))}
                </select>
            </div>
            <div className='col-6'>
                <select value={selectedCity} onChange={handleSelectedCity} className='province-city'>
                    <option value="">لطفا شهر را انتخاب نمایید</option>
                    {citiesOptions.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default CityList;


