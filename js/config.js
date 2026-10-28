/**
 * Central Configuration File — Dr. Yasmine Fikry Emara
 * Medical Clinic Website (Obstetrics & Gynecology)
 * 
 * IMPORTANT:
 * All verified clinical data, contact flags, branch operating hours,
 * and integration points are managed here.
 * Do not invent credentials, awards, phone numbers, or availability.
 */

const SITE_CONFIG = {
  // 1. Doctor Information & Verified Credentials
  doctor: {
    fullName: "د. ياسمين فكري عمارة",
    shortName: "د. ياسمين فكري",
    title: "استشاري أمراض النساء والتوليد والعقم",
    subTitle: "رعاية طبية نسائية متخصصة بأعلى معايير الأمان والخصوصية",
    credentials: [
      {
        title: "ماجستير أمراض النساء والتوليد",
        institution: "كلية طب القصر العيني – جامعة القاهرة",
        verified: true,
      },
      {
        title: "عضوية الجمعية المصرية لأمراض النساء والتوليد",
        institution: "مسجل وفق الملف المنشور على منصة إكشف الطبية",
        verified: true,
      },
      {
        title: "استشاري معتمد لأمراض النساء والتوليد والعقم",
        institution: "خبرة في رعاية الأمومة وعلاج مشكلات الإنجاب وصحة المرأة",
        verified: true,
      }
    ],
    biography: "د. ياسمين فكري عمارة، استشاري أمراض النساء والتوليد والعقم، حاصلة على ماجستير أمراض النساء والتوليد من كلية طب القصر العيني بجامعة القاهرة. تشمل مجالات عملها متابعة الحمل وصحة المرأة، وتشخيص وعلاج أمراض النساء، ومتابعة حالات تأخر الإنجاب، وتقديم الرعاية الطبية خلال المراحل المختلفة من حياة المرأة بأسلوب طبي متكامل ومطمئن.",
    photoPath: "assets/doctor-yasmine.png",
    photoAlt: "صورة دكتورة ياسمين فكري عمارة استشاري أمراض النساء والتوليد",
    experienceYears: null, // Left null intentionally: unverified publicly
  },

  // 2. Third-Party Verified Ratings & Verification Notes
  ratings: {
    platform: "فيزيتا (Vezeeta)",
    score: "4.8",
    maxScore: "5",
    visitorsRecorded: "339 زائرًا مسجلاً بالصفحة",
    verificationDate: "29 أكتوبر 2026",
    disclaimer: "التقييمات مأخوذة من منصات حجز طبية موثقة وفق التحديث الأخير وليست إحصاءً دائمًا أو نتائج مضمونة.",
    vezeetaUrl: "https://www.vezeeta.com/ar/dr/%D8%AF%D9%83%D8%AA%D9%88%D8%B1%D8%A9-%D9%8A%D8%A7%D8%B3%D9%85%D9%8A%D9%86-%D9%81%D9%83%D8%B1%D9%89-%D9%86%D8%B3%D8%A7%D8%A1-%D9%88%D8%AA%D9%88%D9%84%D9%8A%D8%AF",
    ekshefUrl: "https://ekshef.com/dr-43955/%D8%AF%D9%83%D8%AA%D9%88%D8%B1%D8%A9-%D9%8A%D8%A7%D8%B3%D9%85%D9%8A%D9%86-%D9%81%D9%83%D8%B1%D9%8A-%D8%AA%D8%AE%D8%B5%D8%B5-%D9%86%D8%B3%D8%A7%D8%A1-%D9%88%D8%AA%D9%88%D9%84%D9%8A%D8%AF"
  },

  // 3. Clinic Branches & Working Hours
  branches: {
    mubtadiyan: {
      id: "mubtadiyan",
      name: "عيادة المبتديان",
      subName: "السيدة زينب – القاهرة",
      governorate: "القاهرة",
      address: "30 شارع المبتديان، برج المبتديان، أمام صيدلية المنيرة، الدور السادس.",
      addressNote: "ملاحظة: رقم الشقة غير مدون بانتظام في السجلات العامة ويُرجى الاستعلام عند التأكيد.",
      mapsUrl: "https://maps.app.goo.gl/AibzPsbM3R4ueR1z8?g_st=ac",
      phone: "01223939081",
      phoneVerified: false, // Must be officially confirmed by clinic before enabling direct one-tap call
      phoneNotice: "رقم تاريخي منشور يتطلب التأكيد مع إدارة العيادة قبل اعتماده رسمياً",
      whatsapp: null,       // Set to Egypt international format e.g. "201223939081" once verified
      whatsappVerified: false,
      scheduleStatus: "pending_verification", // "pending_verification" | "active"
      pendingNotice: "مواعيد العيادة قيد التحديث — يُرجى التواصل لتأكيد المواعيد.",
      // Independent operating schedule configuration (for future activation):
      schedule: {
        openDays: [1, 3], // Example: Mon, Wed (0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat)
        hoursText: "يُحدد عند تأكيد الحجز",
        workingHours: {
          start: "18:00",
          end: "21:00"
        },
        appointmentDurationMinutes: 20,
        holidays: ["2026-10-06"]
      }
    },
    dokki: {
      id: "dokki",
      name: "عيادة الدقي – الكوثر كلينيك",
      subName: "الدقي – الجيزة",
      governorate: "الجيزة",
      address: "80 أ شارع مصدق، تقاطع محيي الدين أبو العز، أعلى بنك HSBC، الدور الثاني بعد الأرضي.",
      addressNote: "مركز الكوثر كلينيك التخصصي.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=80A%20Mossadak%20Street%20Al%20Kawthar%20Clinic%20Dokki",
      phone: "01044437797",
      phoneVerified: false, // Must be officially confirmed by clinic before enabling direct one-tap call
      phoneNotice: "رقم معلن بعيادات الكوثر كلينيك، يتطلب التأكيد المباشر قبل الحجز النهائي",
      whatsapp: null,       // Set e.g. "201044437797" once confirmed
      whatsappVerified: false,
      scheduleStatus: "pending_verification",
      pendingNotice: "مواعيد العيادة قيد التحديث — يُرجى التواصل لتأكيد المواعيد.",
      // Independent operating schedule configuration (for future activation):
      schedule: {
        openDays: [0, 2, 4], // Example: Sun, Tue, Thu
        hoursText: "يُحدد عند تأكيد الحجز",
        workingHours: {
          start: "17:00",
          end: "20:00"
        },
        appointmentDurationMinutes: 20,
        holidays: []
      }
    }
  },

  // 4. Medical Services (Accurate descriptions, no guaranteed outcome promises)
  services: [
    {
      id: "pregnancy-care",
      title: "متابعة الحمل والولادة",
      shortDesc: "متابعة مراحل الحمل خطوة بخطوة، والاطمئنان على صحة الأم ونمو الجنين، والرعاية قبل الولادة وبعدها.",
      fullDesc: "برنامج متكامل لمتابعة الحمل منذ الأسابيع الأولى، يشمل الفحوصات الدورية، السونار، متابعة العلامات الحيوية للأم ونمو الجنين، والتخطيط للولادة الآمنة الطبيعية أو القيصرية بما يضمن سلامة الأم والمولود.",
      icon: "maternity"
    },
    {
      id: "high-risk-pregnancy",
      title: "متابعة الحمل عالي الخطورة",
      shortDesc: "الرعاية والمتابعة الطبية الدقيقة للحالات التي تتطلب اهتمامًا طبيًا خاصًا.",
      fullDesc: "خطة متابعة مشددة لحالات ضغط الدم المرتفع مع الحمل، سكري الحمل، حالات الإجهاض المتكرر، الحمل بتوأم، أو التاريخ المرضي الخاص لضمان استقرار الحالة والوقاية من المضاعفات.",
      icon: "high-risk"
    },
    {
      id: "infertility",
      title: "تأخر الإنجاب والعقم",
      shortDesc: "تقييم شامل ومتابعة متخصصة لحالات تأخر الحمل ومشكلات الخصوبة للزوجين.",
      fullDesc: "فحص أسباب تأخر الإنجاب عبر التحاليل الهرمونية وفحوصات الرحم والتبويض، ووضع بروتوكولات علاجية مخصصة ومتابعة الخطة الطبية بما يناسب كل حالة بمصداقية ووضوح.",
      icon: "infertility"
    },
    {
      id: "pcos-ovulation",
      title: "متابعة التبويض وتكيس المبايض",
      shortDesc: "تشخيص دقيق ومتابعة منظمة لاضطرابات التبويض ومتلازمة تكيس المبايض (PCOS).",
      fullDesc: "تشخيص متلازمة تكيس المبايض، وتنظيم الدورة الشهرية، وعلاج الأعراض المصاحبة، وتنشيط ومتابعة التبويض بالسونار الدقيق لمساعدة السيدات الراغبات في الإنجاب.",
      icon: "ovulation"
    },
    {
      id: "gynecology",
      title: "أمراض النساء العامة",
      shortDesc: "الكشف الدوري وتشخيص وعلاج اضطرابات الدورة الشهرية والالتهابات والنزيف.",
      fullDesc: "فحص نسائي شامل، تشخيص وعلاج الالتهابات المتكررة، ألياف الرحم، أكياس المبايض، بطانة الرحم المهاجرة، ومتابعة التغيرات الهرمونية في مراحل سن الأمل.",
      icon: "gynecology"
    },
    {
      id: "family-planning",
      title: "وسائل تنظيم الأسرة",
      shortDesc: "الاستشارة الطبية لاختيار وسيلة منع الحمل الأنسب وفق الحالة الصحية الفردية.",
      fullDesc: "شرح الخيارات المتاحة (اللوالب بأنواعها، الحبوب، الحقن، الكبسولة)، وتركيب ومتابعة الوسائل بأمان تام بعد إجراء الفحوصات اللازمة للتحقق من ملاءمتها.",
      icon: "family-planning"
    },
    {
      id: "gynecological-surgery",
      title: "المناظير والجراحات النسائية",
      shortDesc: "التقييم الجراحي والتدخل عند وجود داعٍ طبي بأحدث التقنيات الجراحية والمناظير.",
      fullDesc: "إجراء العمليات النسائية الصغرى والكبرى ومناظير البطن والرحم التشخيصية والعلاجية (استئصال الألياف، كي المبايض، فك الالتصاقات) داخل مستشفيات مجهزة بأعلى درجات الأمان.",
      icon: "surgery"
    },
    {
      id: "premarital-counseling",
      title: "استشارات ما قبل الزواج",
      shortDesc: "استشارات وفحوصات شاملة للصحة الإنجابية والاطمئنان على الجاهزية للحمل والزواج.",
      fullDesc: "فحص طبي دوري للاطمئنان على الصحة العامة والإنجابية للمقبلات على الزواج، والإجابة عن كافة التساؤلات الطبية بخصوصية وسرية تامة وتوجيه النصائح الصحية الوقائية.",
      icon: "counseling"
    }
  ],

  // 5. Verified Testimonials (Attributed Excerpts with Sources & Dates)
  testimonials: [
    {
      id: 1,
      quote: "دكتورة جيدة جدا وفاهمة",
      patient: "آسيا س.",
      date: "14 يوليو 2026",
      source: "منصة إكشف",
      sourceUrl: "https://ekshef.com/dr-43955/%D8%AF%D9%83%D8%AA%D9%88%D8%B1%D8%A9-%D9%8A%D8%A7%D8%B3%D9%85%D9%8A%D9%86-%D9%81%D9%83%D8%B1%D9%8A-%D8%AA%D8%AE%D8%B5%D8%B5-%D9%86%D8%B3%D8%A7%D8%A1-%D9%88%D8%AA%D9%88%D9%84%D9%8A%D8%AF",
      verified: true
    },
    {
      id: 2,
      quote: "من افضل دكاترة ما شاء الله",
      patient: "عائشة ص.",
      date: "29 يناير 2026",
      source: "منصة إكشف",
      sourceUrl: "https://ekshef.com/dr-43955/%D8%AF%D9%83%D8%AA%D9%88%D8%B1%D8%A9-%D9%8A%D8%A7%D8%B3%D9%85%D9%8A%D9%86-%D9%81%D9%83%D8%B1%D9%8A-%D8%AA%D8%AE%D8%B5%D8%B5-%D9%86%D8%B3%D8%A7%D8%A1-%D9%88%D8%AA%D9%88%D9%84%D9%8A%D8%AF",
      verified: true
    },
    {
      id: 3,
      quote: "دكتورة كويسة جدا ومحترمة",
      patient: "آية ع.",
      date: "7 يناير 2025",
      source: "منصة إكشف",
      sourceUrl: "https://ekshef.com/dr-43955/%D8%AF%D9%83%D8%AA%D9%88%D8%B1%D8%A9-%D9%8A%D8%A7%D8%B3%D9%85%D9%8A%D9%86-%D9%81%D9%83%D8%B1%D9%8A-%D8%AA%D8%AE%D8%B5%D8%B5-%D9%86%D8%B3%D8%A7%D8%A1-%D9%88%D8%AA%D9%88%D9%84%D9%8A%D8%AF",
      verified: true
    },
    {
      id: 4,
      quote: "مريحة وممتازة جدا",
      patient: "عبير ع.",
      date: "2 يناير 2025",
      source: "منصة إكشف",
      sourceUrl: "https://ekshef.com/dr-43955/%D8%AF%D9%83%D8%AA%D9%88%D8%B1%D8%A9-%D9%8A%D8%A7%D8%B3%D9%85%D9%8A%D9%86-%D9%81%D9%83%D8%B1%D9%8A-%D8%AA%D8%AE%D8%B5%D8%B5-%D9%86%D8%B3%D8%A7%D8%A1-%D9%88%D8%AA%D9%88%D9%84%D9%8A%D8%AF",
      verified: true
    },
    {
      id: 5,
      quote: "حقيقى دكتورة اخلاق وعلم وخبرة",
      patient: "سوسن م.",
      date: "18 أبريل 2024",
      source: "منصة فيزيتا",
      sourceUrl: "https://www.vezeeta.com/ar/dr/%D8%AF%D9%83%D8%AA%D9%88%D8%B1%D8%A9-%D9%8A%D8%A7%D8%B3%D9%85%D9%8A%D9%86-%D9%81%D9%83%D8%B1%D9%89-%D9%86%D8%B3%D8%A7%D8%A1-%D9%88%D8%AA%D9%88%D9%84%D9%8A%D8%AF",
      verified: true
    }
  ],

  // 6. Frequently Asked Questions (Accurate, transparent, medically safe)
  faqs: [
    {
      q: "إزاي أقدر أحجز موعد كشف أو استشارة؟",
      a: "يمكنكِ تعبئة نموذج طلب الحجز في الموقع باختيار الخدمة والفرع والتاريخ المفضل، أو التواصل المباشر عبر أرقام العيادة أو صفحة الحجز على فيزيتا. يُرجى ملاحظة أن تقديم الطلب هو تحديد لموعدكِ المفضل، ويتم تأكيد الحجز بعد تواصل فريق العيادة معكِ."
    },
    {
      q: "فين مكان عيادة المبتديان بالتفصيل؟",
      a: "تقع عيادة المبتديان في: 30 شارع المبتديان، برج المبتديان، أمام صيدلية المنيرة، الدور السادس، السيدة زينب، القاهرة. يمكنكِ الضغط على زر الخريطة بالأسفل للوصول عبر خرائط Google مباشرة."
    },
    {
      q: "فين مكان عيادة الدقي بالتفصيل؟",
      a: "تقع في عيادات الكوثر كلينيك التخصصية: 80 أ شارع مصدق، تقاطع محيي الدين أبو العز، أعلى بنك HSBC، الدور الثاني بعد الأرضي، الدقي، الجيزة."
    },
    {
      q: "هل لازم أحجز قبل الزيارة للعيادة؟",
      a: "نعم، يُفضل دائماً تسجيل موعد مسبقاً لتنظيم أوقات الكشف وتجنب فترات الانتظار الطويلة، وللتأكد من توافق الموعد مع جدول مواعيد الدكتورة الأسبوعي في كل فرع."
    },
    {
      q: "هل الدكتورة بتتابع حالات الحمل عالي الخطورة؟",
      a: "نعم، تشمل مجالات اختصاص د. ياسمين فكري متابعة حالات الحمل عالي الخطورة، مثل ارتفاع ضغط الدم والسكري مع الحمل، وتاريخ الإجهاض المتكرر، ومتابعة نمو الجنين بدقة."
    },
    {
      q: "هل الدكتورة بتقدم استشارات وفحوصات لتأخر الإنجاب؟",
      a: "نعم، تقدم الدكتورة تقييماً طبياً شاملاً لأسباب تأخر الإنجاب وعلاج تكيس المبايض واضطرابات التبويض، ومتابعة بروتوكولات الخصوبة وتهيئة الرحم للحمل."
    },
    {
      q: "إزاي أعرف سعر الكشف؟",
      a: "تختلف رسوم الكشف والخدمات وفق الإجراء الطبي والفرع والمنصة المحجوز من خلالها. يمكنكِ الاستفسار عن الرسوم الدقيقة مباشرة عند تواصل فريق الاستقبال لتأكيد طلب موعدكِ."
    },
    {
      q: "هل الاستشارة الطبية متاحة أونلاين؟",
      a: "طلب الاستشارة عبر الموقع هو طلب استشارة طبية عامة؛ ويتم تحديد إمكانية وتفاصيل الاستشارات عن بُعد بعد التواصل المباشر مع إدارة العيادة لتقييم مدى ملاءمة الحالة الطبية لذلك."
    }
  ],

  // 7. Booking Request System Configuration
  booking: {
    // Primary contact communication channel configuration
    // When enabled with a verified number, sends request to WhatsApp
    whatsappEnabled: false, // Set to true once the doctor confirms her official WhatsApp Business number
    whatsappNumber: "",    // e.g., "201044437797" or "201223939081" (Egypt international format without + or spaces)
    defaultPreferredPeriods: [
      { id: "period_afternoon", label: "فترة مسائية أولى (5:00 م - 7:00 م)" },
      { id: "period_evening", label: "فترة مسائية ثانية (7:00 م - 9:00 م)" },
      { id: "period_flexible", label: "أي وقت مناسب وفق جدول العيادة" }
    ],
    // Primary services available for quick step selection
    appointmentServices: [
      { id: "checkup", label: "كشف نساء وتوليد", category: "كشف عام" },
      { id: "pregnancy", label: "متابعة حمل", category: "رعاية الأمومة" },
      { id: "fertility", label: "متابعة تأخر الإنجاب", category: "خصوبة وعقم" },
      { id: "consultation", label: "طلب استشارة طبية", category: "استشارة" }
    ]
  },

  // 8. Future Real Booking Backend API Contract (Ready for Integration)
  apiBackend: {
    enabled: false, // Remains false for frontend-only deployment
    baseUrl: "https://api.clinic-backend.example.com/v1",
    endpoints: {
      createRequest: "/appointments/request",
      checkAvailability: "/availability/slots",
      cancelRequest: "/appointments/cancel"
    },
    headers: {
      "Content-Type": "application/json"
    }
  },

  // 9. Static Site & SEO Metadata
  seo: {
    pageTitle: "د. ياسمين فكري عمارة | استشاري نساء وتوليد وعقم | عيادتا المبتديان والدقي",
    metaDescription: "تعرفي على خدمات د. ياسمين فكري عمارة، استشاري أمراض النساء والتوليد والعقم (القصر العيني)، ومعلومات عيادتي المبتديان والدقي وخطوات طلب حجز موعد.",
    canonicalUrl: "https://www.dryasminefikry.com/",
    siteName: "عيادة د. ياسمين فكري عمارة",
    locale: "ar_EG"
  }
};

// Freeze configuration in production-like runtime to prevent unintended mutations
if (typeof Object.freeze === "function") {
  Object.freeze(SITE_CONFIG);
}

