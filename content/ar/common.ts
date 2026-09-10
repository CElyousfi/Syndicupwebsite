import type { SiteContent } from "../types";

/**
 * Terminologie retenue, une fois pour toutes :
 *   copropriété → الملكية المشتركة · syndic → المتصرف · lot → قسم
 *   tantièmes → الأنصبة · assemblée générale → الجمع العام · PV → المحضر
 *   appel de fonds → طلب الأموال · charges → التحملات · exercice → السنة المحاسبية
 *   justificatif → الوثيقة المثبتة · impayés → المتأخرات
 * Les slugs d'URL restent en français : ce sont des identifiants de route.
 */

export const common: SiteContent["common"] = {
  brandSuffix: "برنامج تصرف مغربي",
  demoCta: "حجز عرض توضيحي",
  whatsappCta: "راسلنا على واتساب",
  demoShort: "عرض توضيحي",
  bookDemo: "حجز",
  openArrow: "فتح ←",
  seeHow: "اكتشف الطريقة ←",
  menuLabel: "القائمة",
  skipToContent: "الانتقال إلى المحتوى",
  whatsapp: "واتساب",
  whatsappMessage: "السلام عليكم، أتصرف في ملكية مشتركة وأود معرفة المزيد عن SyndicUp.",
  phone: "+212600000000",
  phoneDisplay: "+212 6 00 00 00 00",
  mockupCaption: "نموذج من المنتج",
};

export const nav: SiteContent["nav"] = {
  features: "الوظائف",
  who: "لمن",
  resources: "الموارد",
  pricing: "الأثمنة",
  security: "الأمان",
  groups: {
    product: "المنتج",
    who: "لمن",
    resources: "الموارد",
    company: "الشركة",
  },
  featureLinks: [
    {
      href: "/comptabilite-annexes",
      icon: "annexes",
      title: "المحاسبة والملاحق",
      desc: "الملاحق الاثنا عشر للمرسوم 2.23.700، مُولَّدة تلقائياً.",
      badge: "أساسي",
    },
    {
      href: "/appels-de-fonds-recouvrement",
      icon: "appels",
      title: "طلبات الأموال والتحصيل",
      desc: "التوزيع حسب الأنصبة، التذكيرات، الوصولات.",
    },
    {
      href: "/assemblees-generales",
      icon: "ag",
      title: "الجموع العامة",
      desc: "الاستدعاء، النصاب، التصويت، محضر مؤرَّخ.",
    },
    {
      href: "/depenses-justificatifs",
      icon: "depenses",
      title: "النفقات والوثائق المثبتة",
      desc: "لا نفقة بدون فاتورتها المرفقة.",
    },
    {
      href: "/application-residents",
      icon: "residents",
      title: "تطبيق القاطنين",
      desc: "الرصيد، الطلبات، الحوادث، الوثائق.",
    },
    {
      href: "/gardien-et-loge",
      icon: "gardien",
      title: "الحارس والمقصورة",
      desc: "حوادث بالصور، دوريات، صندوق صغير.",
    },
    {
      href: "/location-courte-duree",
      icon: "lcd",
      title: "الكراء قصير المدى",
      desc: "إقامات مصرَّح بها، حصة الماء والنفايات.",
      badge: "متفرد",
    },
    {
      href: "/multi-residences-cabinets",
      icon: "multi",
      title: "إقامات متعددة",
      desc: "محفظة كاملة، شاشة قيادة واحدة.",
    },
    {
      href: "/fonctionnalites",
      icon: "overview",
      title: "نظرة شاملة ←",
      desc: "كل المنتج في صفحة واحدة.",
    },
  ],
  whoLinks: [
    {
      href: "/pour-syndic-benevole",
      icon: "benevole",
      title: "المتصرف المتطوع",
      desc: "تدبّر عمارتك مساءً. مجاني تحت 30 قسماً.",
    },
    {
      href: "/pour-cabinet-syndic",
      icon: "cabinet",
      title: "مكتب التصرف",
      desc: "عشر، خمسون، مائة إقامة تحت الانتداب.",
    },
    {
      href: "/pour-promoteurs",
      icon: "promoteur",
      title: "المنعشون العقاريون",
      desc: "تسليم إقامة مُدبَّرة منذ اليوم الأول.",
    },
  ],
  resourceLinks: [
    {
      href: "/ressources/guide-decret-2-23-700",
      title: "دليل المرسوم 2.23.700",
      desc: "ما يفرضه النص، بلغة واضحة.",
      badge: "دليل",
    },
    {
      href: "/ressources/les-12-annexes-expliquees",
      title: "شرح الملاحق الاثني عشر",
      desc: "وظيفة كل بيان، ومن يقرأه.",
    },
    {
      href: "/ressources/calculateur-categorie-copropriete",
      title: "حاسبة الصنف",
      desc: "التزاماتك حسب حجم ملكيتك.",
      badge: "أداة",
    },
    {
      href: "/ressources/modele-convocation-ag",
      title: "نموذج استدعاء الجمع العام",
      desc: "قابل للتحميل، بالعربية والفرنسية.",
    },
    {
      href: "/ressources/modele-pv-ag",
      title: "نموذج محضر الجمع العام",
      desc: "بنية كاملة وقابلة للاحتجاج بها.",
    },
    {
      href: "/ressources/checklist-cloture-2026",
      title: "قائمة اختتام 2026",
      desc: "الخطوات الأربع عشرة قبل جمعك العام.",
    },
    {
      href: "/ressources",
      title: "مركز الموارد ←",
      desc: "أدلة، نماذج، أدوات، مدونة.",
    },
  ],
  companyLinks: [
    { href: "/tarifs", label: "الأثمنة" },
    { href: "/securite", label: "الأمان" },
    { href: "/a-propos", label: "من نحن" },
    { href: "/contact", label: "اتصل بنا" },
  ],
};

export const cta: SiteContent["cta"] = {
  kicker: "جاهز للانطلاق",
  title: "جادّ بشأن ملكيتك المشتركة؟",
  lede: "جمعك العام المقبل يمكن أن يكون أول جمع لا يُناقَش فيه رقم واحد.",
  primary: "حجز عرض توضيحي",
  secondary: "راسلنا على واتساب",
  note: "عرض توضيحي في عشرين دقيقة، بالعربية أو بالفرنسية. الاسم، الهاتف، عدد الأقسام — لا غير.",
  image: "/images/residence-hero.jpg",
  bullets: [
    "استرجاع معطياتك مجاناً",
    "مجاني تحت 30 قسماً، بدون حد زمني",
    "بدون التزام، قابل للفسخ شهرياً",
  ],
};

export const notFound: SiteContent["notFound"] = {
  crumb: "صفحة غير موجودة",
  title: "هذه الصفحة غير موجودة.",
  lede: "قد يكون الرابط قديماً، أو أن العنوان تغيّر. إليك مداخل الموقع.",
  cards: [
    { href: "/", title: "الرئيسية ←", desc: "المنتج في صفحة واحدة." },
    { href: "/fonctionnalites", title: "الوظائف ←", desc: "الوحدات التسع بالتفصيل." },
    { href: "/tarifs", title: "الأثمنة ←", desc: "الثمن، بدون استمارة." },
    { href: "/ressources", title: "الموارد ←", desc: "أدلة، نماذج، حاسبة." },
  ],
};

export const footer: SiteContent["footer"] = {
  tagline: "برنامج لتدبير الملكية المشتركة، صُمِّم بالمغرب، للقانون المغربي.",
  product: "المنتج",
  resources: "الموارد",
  company: "الشركة",
  productLinks: [
    { href: "/fonctionnalites", label: "نظرة شاملة" },
    { href: "/comptabilite-annexes", label: "المحاسبة والملاحق" },
    { href: "/appels-de-fonds-recouvrement", label: "طلبات الأموال" },
    { href: "/assemblees-generales", label: "الجموع العامة" },
    { href: "/depenses-justificatifs", label: "النفقات والوثائق المثبتة" },
    { href: "/application-residents", label: "تطبيق القاطنين" },
    { href: "/gardien-et-loge", label: "الحارس والمقصورة" },
    { href: "/location-courte-duree", label: "الكراء قصير المدى" },
    { href: "/multi-residences-cabinets", label: "إقامات متعددة" },
  ],
  resourceLinks: [
    { href: "/ressources/guide-decret-2-23-700", label: "دليل المرسوم 2.23.700" },
    { href: "/ressources/les-12-annexes-expliquees", label: "شرح الملاحق الاثني عشر" },
    { href: "/ressources/calculateur-categorie-copropriete", label: "حاسبة الصنف" },
    { href: "/ressources/modele-convocation-ag", label: "نموذج الاستدعاء" },
    { href: "/ressources/modele-pv-ag", label: "نموذج المحضر" },
    { href: "/ressources/checklist-cloture-2026", label: "قائمة اختتام 2026" },
    { href: "/ressources", label: "مركز الموارد" },
  ],
  companyLinks: [
    { href: "/a-propos", label: "من نحن" },
    { href: "/tarifs", label: "الأثمنة" },
    { href: "/securite", label: "الأمان" },
    { href: "/demo", label: "حجز عرض توضيحي" },
    { href: "/contact", label: "اتصل بنا" },
    { href: "/pour-syndic-benevole", label: "للمتصرف المتطوع" },
    { href: "/pour-cabinet-syndic", label: "لمكاتب التصرف" },
    { href: "/pour-promoteurs", label: "للمنعشين العقاريين" },
  ],
  legal: "SYNDICUP SARL · الدار البيضاء · س.ت 000000 · التعريف الموحد 000000000000000",
  rights: "بالفرنسية والعربية · © 2026",
};

export const detailCommon: SiteContent["detailCommon"] = {
  outputsTitle: "ما تنتجه هذه الوحدة",
  furtherTitle: "لمعرفة المزيد",
};

export const articleCommon: SiteContent["articleCommon"] = {
  crumbHome: "الرئيسية",
  crumbResources: "الموارد",
};
