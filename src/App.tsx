import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Scroll,
  Info,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Droplet,
  Compass,
  Coins,
  History,
  FileText,
  UserCheck,
  Briefcase,
  Handshake,
  Image as ImageIcon,
  Heart,
  ExternalLink,
  MessageSquare,
  Bookmark,
  Share2,
  Video,
  Globe,
  Upload,
  CheckCircle2,
  Flag,
  User,
  ShoppingBag,
  Sliders,
  Sparkle,
  Factory,
  ClipboardList,
  Wrench,
  Bot,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Volume2,
  Zap,
  Landmark,
  MapPin,
  Download,
  Smartphone,
  AppWindow
} from "lucide-react";

// Auto-Pilot Autonomous Robot Steps configuration
const AUTOPILOT_STEPS = [
  {
    id: 1,
    title: "مرحله ۱: میدان مرکزی ابرشهر آفرینا و فرش عظیم تبریز",
    section: "afreenaPlaza" as const,
    action: "afreena",
    message: "ربات هوشمند در حال پرواز بر فراز ابرشهر آفرینا و فرود در میدان مرکزی بازار و فرش عظیم تبریز است...",
    duration: 7000
  },
  {
    id: 2,
    title: "مرحله ۲: ارزیابی و کارشناسی هوشمند فرش",
    section: "advisor" as const,
    action: "appraise",
    message: "ربات هوشمند در حال بارگذاری اطلاعات فرش تبریز و اجرای کارشناسی خودکار با هوش مصنوعی می‌باشد...",
    duration: 6000
  },
  {
    id: 3,
    title: "مرحله ۳: سفارش نمونه فیزیکی و ارزیابی نصاب‌ها",
    section: "samplesPanel" as const,
    action: "sample",
    message: "ربات خودکار به بخش نمونه‌گیری فیزیکی رفته و نظرات قیمت‌گذاری نصاب‌ها را پایش می‌کند...",
    duration: 6500
  },
  {
    id: 4,
    title: "مرحله ۴: شبیه‌ساز رنگرزی لاکی سنتی",
    section: "dyeSimulator" as const,
    action: "dye",
    message: "ربات در حال ترکیب روناس طبیعی و نیل برای رنگ‌آمیزی الیاف پشم و ابریشم در آزمایشگاه رنگرزی است...",
    duration: 6000
  },
  {
    id: 5,
    title: "مرحله ۵: کاوش غرفه کارخانجات فرش ماشینی",
    section: "machineCarpet" as const,
    action: "machine",
    message: "ربات هوشمند تنظیمات ماشین‌آلات ۱۲۰۰ شانه بلژیکی را آنالیز کرده و به غرفه‌ها سر می‌زند...",
    duration: 6000
  },
  {
    id: 6,
    title: "مرحله ۶: بازدید خودکار از حجره بنکداران",
    section: "sellerRoom" as const,
    action: "seller",
    message: "ربات هوشمند در حال مرور محصولات حجره ممتاز فرش دستباف مهدی و بازار آنلاین است...",
    duration: 6000
  },
  {
    id: 7,
    title: "مرحله ۷: تکمیل تور خودکار و هدایت هوشمند",
    section: "merchantSubmit" as const,
    action: "finish",
    message: "ربات هوشمند تمامی امکانات سامانه فرش بازار را خودکار اجرا نمود. می‌توانید کنترل دستی را تحویل بگیرید.",
    duration: 7000
  }
];

// Image Assets generated in previous turns
const IMAGES = {
  tabriz: "/src/assets/images/tabriz_carpet_1783498665368.jpg",
  kashan: "/src/assets/images/kashan_carpet_1783498680114.jpg",
  isfahan: "/src/assets/images/isfahan_carpet_1783498694196.jpg",
  qashqai: "/src/assets/images/qashqai_carpet_1783498737845.jpg",
  veteran: "/src/assets/images/bazaar_veteran_1783498707547.jpg",
  patriarch: "/src/assets/images/patriarch_portrait_1783721373830.jpg",
  afreenaCity: "/src/assets/images/afreena_metacity_1785914977893.jpg",
  afreenaPlaza: "/src/assets/images/afreena_tabriz_plaza_1785915295312.jpg"
};

// Types for the Appraisal response
interface AppraisalData {
  expertAppraisal: string;
  story: string;
  technicalSpecs: {
    knotDensity: string;
    rajClass: string;
    rarity: string;
  };
  valuation: {
    rangeTomans: string;
    rangeGoldSovereigns: string;
    justification: string;
  };
  maintenanceTips: string[];
}

// Preset carpets in gallery that user can load directly
const CARPET_GALLERY = [
  {
    id: "tabriz",
    name: "قالی سلطنتی شاه‌عباسی تبریز",
    image: IMAGES.tabriz,
    origin: "تبریز (آذربایجان)",
    raj: "۶۰ رج",
    material: "خامه مرینوس و ابریشم خالص",
    design: "لچک و ترنج شاه‌عباسی با حاشیه اسلیمی",
    length: "۳",
    width: "۲",
    age: "نوبافت",
    userNotes: "بافته شده با گره ترکی متقارن، رنگرزی کاملاً سنتی و گیاهی با قرمز روناس و سرمه‌ای نیل.",
    desc: "نمونه بی‌بدیل از هنر کلاسیک آذربایجان با تراکم فوق‌العاده بالا و درخشش خیره‌کننده ابریشم در ترنج میانی."
  },
  {
    id: "kashan",
    name: "محرابی اصیل کاشان (نقشه گلدانی قدیمی)",
    image: IMAGES.kashan,
    origin: "کاشان (اصفهان)",
    raj: "۴۵ رج",
    material: "کرک و پشم طبیعی روی تار پنبه",
    design: "طرح گلدانی محرابی (باغی)",
    length: "۴",
    width: "۳",
    age: "نیمه‌آنتیک (حدود ۴۰ سال)",
    userNotes: "حفظ شده در شرایط عالی، شیرازه طبیعی و دست‌دوز، رنگرزی با پوست گردو و برگ مو.",
    desc: "طرح پر از گل‌های شاه‌عباسی متراکم و حاشیه سرمه‌ای پررنگ که بازگوکننده عمق تاریخ کویر مرکزی ایران است."
  },
  {
    id: "isfahan",
    name: "فرش نفیس ابریشم اصفهان (گنبد مسجد شیخ لطف‌الله)",
    image: IMAGES.isfahan,
    origin: "اصفهان",
    raj: "۷۵ رج",
    material: "گل‌ابریشم و چله ابریشم خالص",
    design: "اسلیمی گنبدی (الهام گرفته از سقف مسجد شیخ لطف‌الله)",
    length: "۳",
    width: "۲",
    age: "نوبافت (اثر استادکار)",
    userNotes: "بافته شده با ریزترین گره‌های اصفهان بر روی چله ابریشم خالص، امضای کارگاه سنتی اصفهان در پایین فرش.",
    desc: "یک اثر هنری به تمام معنا که گردش دوار نقوش اسلیمی آن، یادآور ابدیت و زیبایی آسمانی گنبد معروف شیخ لطف‌الله است."
  },
  {
    id: "qashqai",
    name: "گلیم-فرش عشایری ایل قشقایی",
    image: IMAGES.qashqai,
    origin: "مناطق ییلاقی فارس (قشقایی)",
    raj: "۳۰ رج (ذهنی‌بافت)",
    material: "پشم در پشم (خامه و چله تماماً پشم دست‌ریس)",
    design: "طرح هندسی هبک‌لو با نقوش بز کوهی و مرغک",
    length: "۲.۵",
    width: "۱.۵",
    age: "نیمه‌آنتیک (میراث خانوادگی)",
    userNotes: "بافته شده توسط زنان هنرمند ایل قشقایی بدون نقشه (ذهنی‌بافت)، ریشه‌ها و منگوله‌های پشمی رنگارنگ جانبی.",
    desc: "روایتی زنده از کوچ عشایری، بافته شده با خامه ضخیم پشمی رنگ شده با روناس کوهی و پوست انار خشک."
  }
];

// Natural dye materials database for the simulator
const DYE_MATERIALS = [
  {
    id: "rwnas",
    name: "روناس (قرمز لاکی و روناسی)",
    colorClass: "bg-red-800",
    textCol: "text-red-800",
    source: "ریشه گیاه روناس وحشی صحرایی",
    poetry: "«سرخی لاکی ما از جگر سوخته است / روناس هنر به تار و پودش دوخته است»",
    desc: "رایحه‌ای از عمق بیابان؛ ریشه این گیاه پس از خشک شدن و آسیاب شدن، اصیل‌ترین قرمز فرش‌های سنتی ایران را می‌سازد که به مرور زمان زیباتر و درخشان‌تر می‌شود."
  },
  {
    id: "gordo",
    name: "پوست گردو (قهوه‌ای شتری و شتری تیره)",
    colorClass: "bg-amber-900",
    textCol: "text-amber-900",
    source: "پوست سبز و بیرونی میوه گردو",
    poetry: "«برگ مو و پوست گردو در سبوی رنگرزی / رنگ باران می‌نشیند بر چله با سر‌افرازی»",
    desc: "این پوسته سرشار از تانن است و قهوه‌ای خاکی و ملایم بسیار پایداری تولید می‌کند که بستر نقوش کویری و خاکی فرش‌های فلات مرکزی ایران است."
  },
  {
    id: "nil",
    name: "نیل (سرمه‌ای و لاجوردی)",
    colorClass: "bg-indigo-900",
    textCol: "text-indigo-900",
    source: "برگ گیاه نیل (ایندیگو طبیعی)",
    poetry: "«لاجورد آسمان در چله قالی دمید / تا نیل بر دل تارهای سپید آمد پدید»",
    desc: "شاه‌رنگ آرامش و ابدیت. نیل طبیعی آسمان شب کویر را به داخل حجره‌ها و خانه‌ها می‌آورد و حاشیه اکثر قالی‌های کهن ایرانی با این رنگ فاخر قاب‌بندی می‌شود."
  },
  {
    id: "asparak",
    name: "اسپرک (زرد طلایی و زرد قناری سنتی)",
    colorClass: "bg-amber-500",
    textCol: "text-amber-600",
    source: "گل و ساقه خشک‌شده گیاه اسپرک وحشی",
    poetry: "«زرد طلاییِ اسپرک چون نور خورشید بهار / تابیده بر دشت چمن‌زار نقشه نگار»",
    desc: "گیاهی روییده در دامنه‌های البرز که زرد طلایی بسیار پرطراوت و زنده‌ای تولید می‌کند. ترکیب آن با نیل سبز خوش‌رنگی می‌سازد که برای برگ‌ها استفاده می‌شود."
  },
  {
    id: "pust_anar",
    name: "پوست انار (مسی، زرد مایل به قهوه‌ای و زیتونی)",
    colorClass: "bg-amber-800 border border-yellow-700",
    textCol: "text-amber-800",
    source: "پوست خشک‌شده انار شیرین و ترش ساوه",
    poetry: "«شکوفه انار و پوست سرخ صدف‌آسا / جامه طلایی دوخته بر اندام اسلیمی زیبا»",
    desc: "پوست انار سرشار از خواص ضد‌ بید و رنگ دهی عالی است که به فرش‌های سنتی یک درخشش ملایم پاییزی هدیه می‌کند."
  }
];

export default function App() {
  // Input Form States
  const [origin, setOrigin] = useState("تبریز (آذربایجان)");
  const [raj, setRaj] = useState("۵۰ رج");
  const [material, setMaterial] = useState("خامه مرینوس و ابریشم");
  const [design, setDesign] = useState("لچک و ترنج شاه‌عباسی");
  const [length, setLength] = useState("۳");
  const [width, setWidth] = useState("۲");
  const [age, setAge] = useState("نوبافت");
  const [userNotes, setUserNotes] = useState("");
  const [selectedExpert, setSelectedExpert] = useState("mehdi"); // 'mehdi' | 'miri' | 'heritage' | 'decorator'

  // Loading & Results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appraisal, setAppraisal] = useState<AppraisalData | null>(null);
  const [historyLogs, setHistoryLogs] = useState<Array<{ name: string; date: string; data: AppraisalData; expert: string }>>([]);

  // Traditional Dyeing Simulator State
  const [selectedDye, setSelectedDye] = useState(DYE_MATERIALS[0]);

  // Tab selection
  const [activeSection, setActiveSection] = useState<"afreenaPlaza" | "advisor" | "sellerRoom" | "customWeave" | "dyeSimulator" | "gallery" | "merchantSubmit" | "handicrafts" | "machineCarpet" | "samplesPanel">("afreenaPlaza");

  // Appraisal fee & auction simulation state
  const [appraisalFeePaid, setAppraisalFeePaid] = useState(false);
  const [isPayingFee, setIsPayingFee] = useState(false);
  const [auctionSubmitSuccess, setAuctionSubmitSuccess] = useState(false);
  const [isSubmittingAuction, setIsSubmittingAuction] = useState(false);

  // Merchant Application Form
  const [merchantName, setMerchantName] = useState("");
  const [merchantPhone, setMerchantPhone] = useState("");
  const [merchantCity, setMerchantCity] = useState("");
  const [merchantSubmitSuccess, setMerchantSubmitSuccess] = useState(false);

  // Cooperation / Alliance states
  const [coopType, setCoopType] = useState("platform"); // 'platform' | 'international' | 'weaving' | 'machine' | 'academic' | 'media' | 'other'
  const [coopScope, setCoopScope] = useState("in-app"); // 'in-app' | 'out-app' | 'professional'
  const [coopCompany, setCoopCompany] = useState("");
  const [coopEmail, setCoopEmail] = useState("");
  const [coopWebsite, setCoopWebsite] = useState("");
  const [coopProposal, setCoopProposal] = useState("");
  const [coopFileName, setCoopFileName] = useState("");

  // Machine Carpet Factory States
  const [machineFactoryName, setMachineFactoryName] = useState("");
  const [machineFactoryBrand, setMachineFactoryBrand] = useState("");
  const [machineFactoryCity, setMachineFactoryCity] = useState("");
  const [machineFactoryLoom, setMachineFactoryLoom] = useState("Vandewiele HCPX2 (بلژیک)");
  const [machineFactoryDensity, setMachineFactoryDensity] = useState("۱۲۰۰ شانه (تراکم ۳۶۰۰)");
  const [machineFactoryPhone, setMachineFactoryPhone] = useState("");
  const [machineFactorySuccess, setMachineFactorySuccess] = useState(false);
  const [selectedFactoryBooth, setSelectedFactoryBooth] = useState("suleiman");

  // Sample & Installer Feedback States
  const [sampleName, setSampleName] = useState("");
  const [samplePhone, setSamplePhone] = useState("");
  const [sampleCarpetType, setSampleCarpetType] = useState("handwoven"); // 'handwoven' | 'machine'
  const [sampleAddress, setSampleAddress] = useState("");
  const [sampleImage, setSampleImage] = useState<string | null>(null);
  const [sampleImageName, setSampleImageName] = useState("");
  const [sampleRequestSuccess, setSampleRequestSuccess] = useState(false);
  const [isSubmittingSample, setIsSubmittingSample] = useState(false);

  // Installer & Marketplace Pricing Feedback states
  const [feedbackCategory, setFeedbackCategory] = useState("installer"); // 'installer' | 'real-market' | 'ai-market'
  const [feedbackCarpetImage, setFeedbackCarpetImage] = useState<string | null>(null);
  const [feedbackCarpetImageName, setFeedbackCarpetImageName] = useState("");
  const [feedbackCarpetDesc, setFeedbackCarpetDesc] = useState("");
  const [feedbackSubmitSuccess, setFeedbackSubmitSuccess] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  
  // Simulated feedback logs
  const [simulatedFeedbackList, setSimulatedFeedbackList] = useState<Array<{
    id: string;
    author: string;
    type: "installer" | "market" | "ai";
    rating: number;
    priceEstimation: string;
    comment: string;
    date: string;
  }>>([
    {
      id: "fb-1",
      author: "استاد اصغر بهرامی (نصاب پیشکسوت صنف تهران)",
      type: "installer",
      rating: 5,
      priceEstimation: "حدود ۱۲۰,۰۰۰,۰۰۰ تومان",
      comment: "با توجه به تصویر ریشه‌ها و الگوهای شیرازه در بافت، این یک کار تبریز اصل با رج‌شمار ۵۰ است. پیشنهاد می‌کنم نصب آن با آستری ضدلغزش مخصوص روی لمینت انجام شود.",
      date: "امروز، ۱۰ دقیقه پیش"
    },
    {
      id: "fb-2",
      author: "گروه ارزیابی بازار بزرگ فرش ایران (افراد حقیقی و بنکداران)",
      type: "market",
      rating: 4.5,
      priceEstimation: "۱۱۵,۰۰۰,۰۰۰ الی ۱۲۵,۰۰۰,۰۰۰ تومان",
      comment: "تقاضای فعلی بازار برای طرح لاکی با این ابعاد بسیار بالا است. در صورت تمایل به فروش فوری، بازه قیمتی فوق عادلانه و نقدشونده است.",
      date: "امروز، ۱ ساعت پیش"
    },
    {
      id: "fb-3",
      author: "موتور قیمت‌گذاری هوش مصنوعی فرش بازار (AI Core)",
      type: "ai",
      rating: 4.8,
      priceEstimation: "۱۱۸,۵۰۰,۰۰۰ تومان",
      comment: "تحلیل الگوهای رنگی و چگالی گره نشان‌دهنده اصالت بالای نقوش هریس است. ضریب خطای ارزش‌گذاری محاسباتی ۳.۲٪ می‌باشد.",
      date: "امروز، ۲ ساعت پیش"
    }
  ]);

  // Sellers Room Simulation State (Normal vs Pro)
  const [shopTier, setShopTier] = useState<"regular" | "pro">("regular");
  const [shopName, setShopName] = useState("حجره فرش دستباف مهدی");
  const [shopContact, setShopContact] = useState("۰۹۱۲۳۴۵۶۷۸۹");
  const [shopPhotos, setShopPhotos] = useState<string[]>([IMAGES.tabriz, IMAGES.kashan]);
  const [simulatedVideos, setSimulatedVideos] = useState<string[]>(["کیپ کارگاه تبریز", "بافت گره ترکی در کارگاه"]);
  const [activeShopTab, setActiveShopTab] = useState<"products" | "videos" | "translator">("products");

  // AI Translator state (Pro feature)
  const [translateInput, setTranslateInput] = useState("این فرش ۶۰ رج ابریشم اصفهان دارای رنگ لاکی طبیعی و پشم گوسفند دباغی شده درجه یک است.");
  const [translateOutput, setTranslateOutput] = useState("");
  const [targetLang, setTargetLang] = useState("English");
  const [translationType, setTranslationType] = useState<"machine" | "hand_knotted">("machine");
  const [translationLoading, setTranslationLoading] = useState(false);

  // Custom Portrait & Country Flag Weave Order States
  const [weaveType, setWeaveType] = useState<"portrait" | "flag">("portrait");
  const [selectedCountryFlag, setSelectedCountryFlag] = useState("ایران 🇮🇷");
  const [customWeaveSize, setCustomWeaveSize] = useState("۵۰ در ۷۰ سانتی‌متر (کوچک رومیزی)");
  const [customWeaveMaterial, setCustomWeaveMaterial] = useState("گل‌ابریشم اعلا (۷۰٪ ابریشم)");
  const [customWeaveStatus, setCustomWeaveStatus] = useState<string | null>(null);
  const [portraitPreviewUrl, setPortraitPreviewUrl] = useState<string | null>(null);

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [showPwaModal, setShowPwaModal] = useState(false);

  useEffect(() => {
    // Detect standalone PWA mode
    if (window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone) {
      setIsAppInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsAppInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setShowPwaModal(true);
    }
  };

  // Autonomous Robot / Auto-Pilot State
  const [autoPilotActive, setAutoPilotActive] = useState(false);
  const [autoPilotStep, setAutoPilotStep] = useState(0);
  const [autoPilotPlaying, setAutoPilotPlaying] = useState(true);
  const [autoPilotSpeed, setAutoPilotSpeed] = useState<1 | 1.5 | 2>(1);
  const autoPilotTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger voice synthesis or speech audio log when autopilot advances step
  const speakStepMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fa-IR';
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      } catch {
        // Fallback gracefully
      }
    }
  };

  // Auto-Pilot Step effect
  useEffect(() => {
    if (!autoPilotActive || !autoPilotPlaying) {
      if (autoPilotTimerRef.current) clearTimeout(autoPilotTimerRef.current);
      return;
    }

    const currentStepObj = AUTOPILOT_STEPS[autoPilotStep];
    if (currentStepObj) {
      // 1. Switch section
      setActiveSection(currentStepObj.section);
      
      // 2. Announce speech/cues
      speakStepMessage(currentStepObj.message);

      // 3. Execute step-specific mock actions automatically
      if (currentStepObj.action === "appraise") {
        setOrigin("تبریز (آذربایجان)");
        setRaj("۶۰ رج");
        setMaterial("خامه مرینوس و ابریشم خالص");
        setDesign("لچک و ترنج شاه‌عباسی با حاشیه اسلیمی");
        // Trigger auto appraisal after 1.2s
        setTimeout(() => {
          setAppraisal({
            expertAppraisal: "این فرش شاه‌عباسی تبریز با ۶۰ رج بافت گره ترکی، از اصیل‌ترین نمونه‌های موزه فرش بازار ایران است. ارزش مادی و معنوی فوق‌العاده بالایی دارد.",
            story: "بافته شده توسط استادکاران کهنه‌کار تبریز با صباغی روناس گیاهی و نیل خوزستان.",
            technicalSpecs: { knotDensity: "۶۴۰۰ گره در دسی‌متر مربع", rajClass: "۶۰ رج اعلا", rarity: "بسیار کمیاب و کلکسیونی" },
            valuation: { rangeTomans: "۱۴۰,۰۰۰,۰۰۰ الی ۱۶۰,۰۰۰,۰۰۰ تومان", rangeGoldSovereigns: "۲۸ سکه تمام بهار", justification: "تراکم گره بالا، استفاده از ابریشم ۷۰ درصد و گره متقارن ترکی" },
            maintenanceTips: ["استفاده از روفرشی مخمل نانو", "عدم شستشو با مواد شیمیایی اسیدی", "هوادهی سالانه در سایه"]
          });
          setAppraisalFeePaid(true);
        }, 1200);
      } else if (currentStepObj.action === "sample") {
        setSampleName("دکتر سیاوش (درخواست‌کننده خودکار نمونه)");
        setSamplePhone("۰۹۱۲۹۹۹۸۸۷۷");
        setSampleAddress("تهران، خیابان ولیعصر، برج فرش بازار");
        setSampleCarpetType("handwoven");
      } else if (currentStepObj.action === "dye") {
        setSelectedDye(DYE_MATERIALS[0]); // Madder Red
      } else if (currentStepObj.action === "machine") {
        setSelectedFactoryBooth("suleiman");
      } else if (currentStepObj.action === "seller") {
        setActiveShopTab("products");
      }

      // Schedule next step
      const stepDuration = currentStepObj.duration / autoPilotSpeed;
      autoPilotTimerRef.current = setTimeout(() => {
        if (autoPilotStep < AUTOPILOT_STEPS.length - 1) {
          setAutoPilotStep(prev => prev + 1);
        } else {
          // Finished full cycle
          setAutoPilotPlaying(false);
        }
      }, stepDuration);
    }

    return () => {
      if (autoPilotTimerRef.current) clearTimeout(autoPilotTimerRef.current);
    };
  }, [autoPilotActive, autoPilotStep, autoPilotPlaying, autoPilotSpeed]);

  const handleStartAutoPilot = () => {
    setAutoPilotStep(0);
    setAutoPilotActive(true);
    setAutoPilotPlaying(true);
  };

  const handleStopAutoPilot = () => {
    setAutoPilotActive(false);
    setAutoPilotPlaying(false);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  // Load preset specs from gallery into form
  const handleLoadPreset = (preset: typeof CARPET_GALLERY[0]) => {
    setOrigin(preset.origin);
    setRaj(preset.raj);
    setMaterial(preset.material);
    setDesign(preset.design);
    setLength(preset.length);
    setWidth(preset.width);
    setAge(preset.age);
    setUserNotes(preset.userNotes);
    
    // Switch tab to expert advisor
    setActiveSection("advisor");
    
    // Scroll to form smoothly
    const element = document.getElementById("advisor-cabin");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Submit appraisal request to Server Endpoint
  const handleRequestAppraisal = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAppraisal(null);
    setAppraisalFeePaid(false);

    try {
      const response = await fetch("/api/expert-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin,
          raj,
          material,
          design,
          length,
          width,
          age,
          userNotes,
          expertType: selectedExpert
        })
      });

      if (!response.ok) {
        throw new Error("ارتباط با بازار قطع شده است. لطفاً چند لحظه بعد تلاش کنید.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setAppraisal(data);
      
      // Save to local session log
      let expertName = "دایی مهدی";
      if (selectedExpert === "miri") expertName = "حاج حسین علی میری و پسران";
      if (selectedExpert === "heritage") expertName = "دپارتمان هریتج";
      if (selectedExpert === "decorator") expertName = "دکوراسیون (فرش و پرده)";

      setHistoryLogs(prev => [
        {
          name: `قالی ${origin} (${design})`,
          date: new Date().toLocaleTimeString("fa-IR"),
          data,
          expert: expertName
        },
        ...prev
      ]);

      // Scroll to certificate result
      setTimeout(() => {
        const resultSection = document.getElementById("certificate-view");
        if (resultSection) {
          resultSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "بروز خطای غیرمنتظره در بررسی مشخصات فرش.");
    } finally {
      setLoading(false);
    }
  };

  // Call Live AI Translator Endpoint
  const handleTranslateText = async () => {
    if (!translateInput.trim()) return;
    setTranslationLoading(true);
    setTranslateOutput("");

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: translateInput,
          targetLang,
          translationType
        })
      });

      if (!response.ok) {
        throw new Error("خطا در ترجمه.");
      }

      const data = await response.json();
      setTranslateOutput(data.translatedText || "مترجم موقتاً در دسترس نیست.");
    } catch (err: any) {
      console.error(err);
      setTranslateOutput("خطایی در ارتباط با سرور هوشمند مترجم رخ داد.");
    } finally {
      setTranslationLoading(false);
    }
  };

  const handleMerchantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchantName || !merchantPhone) return;
    setMerchantSubmitSuccess(true);
    setTimeout(() => {
      setMerchantSubmitSuccess(false);
      setMerchantName("");
      setMerchantPhone("");
      setMerchantCity("");
      setCoopType("platform");
      setCoopScope("in-app");
      setCoopCompany("");
      setCoopEmail("");
      setCoopWebsite("");
      setCoopProposal("");
      setCoopFileName("");
    }, 5000);
  };

  // Handle request for carpet sample
  const handleSampleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sampleName || !samplePhone) return;
    setIsSubmittingSample(true);
    setTimeout(() => {
      setIsSubmittingSample(false);
      setSampleRequestSuccess(true);
      setTimeout(() => {
        setSampleRequestSuccess(false);
        setSampleName("");
        setSamplePhone("");
        setSampleAddress("");
        setSampleImage(null);
        setSampleImageName("");
      }, 5000);
    }, 1500);
  };

  // Handle uploading and attaching image for price appraisal by installers/market
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingFeedback(true);
    setTimeout(() => {
      setIsSubmittingFeedback(false);
      setFeedbackSubmitSuccess(true);

      // Add a simulated review from the installer or market
      const newFeedback = {
        id: "fb-" + (simulatedFeedbackList.length + 1),
        author: feedbackCategory === "installer" 
          ? "مهندس قلی‌پور (نصاب و تکنیسین ارشد عایق‌سازی فرش)"
          : feedbackCategory === "real-market"
          ? "حجره معتمد تبریزی (تیم قیمت‌گذاری بنکداران تهران)"
          : "هوش مصنوعی ارزیاب شبکه‌ای (Farsh AI-V3)",
        type: feedbackCategory === "installer" ? "installer" as const : feedbackCategory === "real-market" ? "market" as const : "ai" as const,
        rating: 4.5 + Math.random() * 0.5,
        priceEstimation: feedbackCategory === "installer" ? "هزینه نصب محاسباتی: ۲,۵۰۰,۰۰۰ تومان" : "ارزیابی قیمت فرش: ۹۸,۰۰۰,۰۰۰ الی ۱۰۵,۰۰۰,۰۰۰ تومان",
        comment: `با بررسی دقیق تصویر ارسالی شما (${feedbackCarpetImageName || "تصویر ضمیمه"})، الگوهای تار و پود و گره‌های پشت کار نشان‌دهنده دستباف بودن و تراکم مرغوب است. ` + 
                 (feedbackCategory === "installer" 
                    ? "برای نصب روی دیوارهای گچی یا سطوح صاف کف، استفاده از گیره‌های فشاری برنجی ممهور توصیه می‌شود." 
                    : feedbackCategory === "real-market" 
                    ? "در بازار کنونی ارزش نقدی بالایی دارد و تقاضا مطلوب است." 
                    : "الگوریتم تطبیق تصویر شباهت ۹۴ درصدی به نقشه اسلیمی اصفهان را تایید می‌کند."),
        date: "هم‌اکنون"
      };

      setSimulatedFeedbackList(prev => [newFeedback, ...prev]);

      setTimeout(() => {
        setFeedbackSubmitSuccess(false);
        setFeedbackCarpetDesc("");
        setFeedbackCarpetImage(null);
        setFeedbackCarpetImageName("");
      }, 6000);
    }, 1800);
  };

  const handleSimulatePayment = () => {
    setIsPayingFee(true);
    setTimeout(() => {
      setIsPayingFee(false);
      setAppraisalFeePaid(true);
    }, 1800);
  };

  const handleSimulateAuctionCooperation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAuction(true);
    setTimeout(() => {
      setIsSubmittingAuction(false);
      setAuctionSubmitSuccess(true);
    }, 1500);
  };

  // Simulating photo uploads for Sandbox Shop
  const handleSimulatePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (shopTier === "regular" && shopPhotos.length >= 3) {
        alert("حجره‌های معمولی محدودیت آپلود حداکثر ۳ عکس دارند. برای ثبت تصاویر نامحدود، حساب خود را به حجره پرو (ویژه) ارتقا دهید!");
        return;
      }
      const newPhotoUrl = URL.createObjectURL(e.target.files[0]);
      setShopPhotos([...shopPhotos, newPhotoUrl]);
    }
  };

  // Simulating photo uploads for custom portrait rug
  const handleSimulatePortraitUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const portraitUrl = URL.createObjectURL(e.target.files[0]);
      setPortraitPreviewUrl(portraitUrl);
    }
  };

  // Calculate simulated custom rug price
  const calculateCustomWeavePrice = () => {
    let basePrice = 24000000; // Base portrait price
    if (weaveType === "flag") basePrice = 16000000; // Flags are easier

    if (customWeaveSize.includes("کوچک")) basePrice *= 0.8;
    if (customWeaveSize.includes("متوسط")) basePrice *= 1.2;
    if (customWeaveSize.includes("بزرگ")) basePrice *= 2.0;

    if (customWeaveMaterial.includes("تمام ابریشم")) basePrice *= 1.8;
    if (customWeaveMaterial.includes("کرک اعلا")) basePrice *= 1.1;

    return Math.round(basePrice).toLocaleString("fa-IR");
  };

  return (
    <div className="min-h-screen bg-[#fbf9f3] text-[#2d221e] flex flex-col selection:bg-lac selection:text-white" dir="rtl">
      
      {/* Golden Ornamental Header Bar */}
      <div className="h-2.5 bg-gradient-to-r from-lac via-amber-600 to-lac w-full shadow-md"></div>

      {/* PWA Direct Installation & Mobile App Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-100 py-2.5 px-4 text-xs shadow-inner border-b border-amber-500/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 max-w-2xl">
          <Smartphone className="w-4 h-4 text-amber-400 animate-pulse flex-shrink-0" />
          <span className="font-bold text-amber-300">دانلود اپلیکیشن مستقیم (PWA / اندروید و آیفون):</span>
          <span className="text-stone-300 hidden sm:inline">
            بدون نیاز به کافه بازار یا گوگل پلی، این برنامه کاملاً استاندارد و قابل نصب روی موبایل و رایانه است.
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isAppInstalled ? (
            <span className="bg-emerald-800/80 text-emerald-200 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>اپلیکیشن نصب شده است</span>
            </span>
          ) : (
            <button
              onClick={handleInstallClick}
              className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-extrabold px-3.5 py-1 rounded-xl text-xs flex items-center gap-1.5 shadow transition-transform transform active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-stone-950" />
              <span>نصب مستقیم اپلیکیشن (دانلود PWA)</span>
            </button>
          )}
        </div>
      </div>

      {/* Sacred Family Dedication Banner */}
      <div className="bg-gradient-to-r from-[#800000]/5 via-amber-50 to-[#800000]/5 border-b border-amber-600/10 py-6 px-4 text-stone-800 leading-relaxed relative overflow-hidden shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
          
          {/* Framed Portrait of the Late Father */}
          <div className="relative group flex-shrink-0">
            {/* Gilded/Ornamental Frame Layer */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-700 rounded-full blur-[1px] opacity-75 shadow-lg group-hover:opacity-90 transition-opacity"></div>
            <div className="relative bg-creme p-1 rounded-full border border-amber-500/30">
              <img 
                src={IMAGES.patriarch} 
                alt="شادروان حاج حسین علی میری" 
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover shadow-inner"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Tiny ribbon/badge indicating respects */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-lac text-amber-100 text-[9px] px-2.5 py-0.5 rounded-full font-serif font-bold shadow border border-amber-500/20 whitespace-nowrap">
              یادبود ابدی
            </div>
          </div>

          <div className="space-y-1.5 text-center md:text-right flex-grow">
            <div className="text-amber-800 font-serif text-[11px] font-bold tracking-widest">بِسمِ اللّهِ الرَّحْمَنِ الرَّحِیمِ</div>
            <p className="font-sans font-bold text-bazaar text-xs md:text-sm">
              این اثر هنری و پلتفرم فناورانه فرش‌بازار، تقدیم می‌گردد به پیشگاه منور و روح پرفتوح پدر بزرگوارم، تاجر نام‌آور و پیشکسوت نامدار صنعت و هنر فرش دستباف ایران،
            </p>
            <h2 className="text-sm md:text-base font-extrabold text-lac font-serif tracking-wide py-1">
              زنده یاد شادروان «حاج حسین علی میری»
            </h2>
            <p className="text-[10px] text-stone-500 max-w-2xl font-sans leading-relaxed">
              که سفره زندگی ما به برکت تار و پود مقدس فرش و رزق پاک این صنف شریف آراسته بود و یادش همواره در قلب ما زنده و جاویدان است. تقدیم به روان پاک پدر والامقام و گران‌قدرم.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Traditional Persian Arch & Logo Section */}
      <header className="relative py-8 px-4 bg-creme border-b border-amber-100 shadow-sm overflow-hidden">
        {/* Abstract vector backgrounds resembling classic floral carpet motifs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100/30 via-transparent to-transparent pointer-events-none rounded-full"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-100/30 via-transparent to-transparent pointer-events-none rounded-full"></div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-center md:text-right">
            {/* Elegant Vintage Emblem */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-lac/5 border border-lac/20 rounded-full text-lac text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>پلتفرم یکپارچه اصالت فرش دستباف و تجارت بین‌المللی</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-bazaar font-sans mb-2">
              فـرش بــازار
            </h1>
            <p className="text-stone-600 text-sm md:text-base max-w-xl leading-relaxed">
              تلاقی هنر آنتیک و فناوری کارآمد. کالبدشکافی علمی فرش، شبیه‌ساز پکیج‌های تجاری حجره‌داران و سفارش اختصاصی بافت پرچم و پرتره به دستان معجزه‌گر استادکاران.
            </p>
          </div>

          {/* Master Veteran Avatar / Quote Box */}
          <div className="flex items-center gap-4 bg-white p-3.5 rounded-2xl shadow-md border border-amber-100 max-w-sm">
            <img 
              src={IMAGES.veteran} 
              alt="دایی مهدی پیشکسوت بازار فرش" 
              className="w-16 h-16 rounded-full object-cover border-2 border-lac shadow"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-xs font-bold text-lac">نصیحت حجره دایی مهدی:</h3>
              <p className="text-xs text-stone-600 italic mt-1 leading-relaxed">
                «نور چشم دایی، هنر بافت فرش عشق است که گره به گره جان می‌گیرد. ما حجره معمولی و ویژه را ساختیم تا بازار را به دنیا پیوند بزنیم. عیار فرشت را امروز بسنج!»
              </p>
            </div>
          </div>
        </div>

        {/* Elegant Persian Tapestry Navigation Menu */}
        <div className="max-w-6xl mx-auto mt-8 flex flex-wrap justify-center items-center gap-2 border-b border-amber-200/50 pb-2">
          
          {/* Prominent Auto-Pilot CTA Button */}
          <button
            onClick={() => {
              if (autoPilotActive) {
                handleStopAutoPilot();
              } else {
                handleStartAutoPilot();
              }
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 shadow-md ${
              autoPilotActive
                ? "bg-amber-500 text-stone-950 shadow-amber-500/30 animate-pulse ring-2 ring-amber-300"
                : "bg-emerald-700 text-white hover:bg-emerald-800 transform hover:-translate-y-0.5"
            }`}
          >
            <Bot className="w-4 h-4 text-amber-200" />
            <span>{autoPilotActive ? "توقف ربات خودکار" : "🤖 اجرای خودکار ربات (بدون نیاز به دستکاری)"}</span>
          </button>

          {[
            { id: "afreenaPlaza", label: "میدان آفرینا و فرش عظیم تبریز", icon: Landmark },
            { id: "advisor", label: "اتاق کارشناسان (دایی مهدی و استادان)", icon: Scroll },
            { id: "sellerRoom", label: "شبیه‌ساز حجره معمولی و پرو", icon: ShoppingBag },
            { id: "customWeave", label: "سفارش بافت پرچم و پرتره", icon: Flag },
            { id: "handicrafts", label: "نمایشگاه صنایع‌دستی و حراج بین‌المللی", icon: Sparkles },
            { id: "dyeSimulator", label: "رنگرزی سنتی و لاکی", icon: Droplet },
            { id: "gallery", label: "مجموعه فرش‌های نفیس", icon: ImageIcon },
            { id: "machineCarpet", label: "غرفه و کارخانجات فرش ماشینی", icon: Factory },
            { id: "merchantSubmit", label: "پورتال همکاری و ائتلاف تجاری", icon: Handshake },
            { id: "samplesPanel", label: "درخواست نمونه و ارزیابی نصاب‌ها", icon: ClipboardList }
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-lac text-white shadow-md transform -translate-y-0.5"
                    : "text-stone-600 hover:text-lac hover:bg-lac/5"
                }`}
              >
                <IconComp className={`w-4 h-4 ${isActive ? "text-amber-300" : ""}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* FP New Meta Ecosystem Banner */}
      <div className="bg-gradient-to-r from-bazaar via-[#4a2e2b] to-bazaar text-[#fbf9f3] py-4 px-6 border-b border-amber-600/20 shadow-inner relative overflow-hidden">
        {/* Subtle decorative background lights */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-lac/10 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="bg-amber-500/10 border border-amber-400/30 p-2.5 rounded-xl flex-shrink-0 animate-pulse">
              <Globe className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-amber-500 text-bazaar text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  عضو رسمی اکوسیستم آفرینش
                </span>
                <span className="bg-lac/40 text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  FP New Meta & شهر توانا
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-1">
                فرش‌بازار: بال پرواز شهر جدید نیو متاورسی جهان
              </h3>
              <p className="text-xs text-amber-100/80 mt-0.5 leading-relaxed max-w-4xl">
                فرش‌بازار یکی از چندین برنامه کلیدی به‌وجودآورنده اکوسیستم آفرینش و شهر جدید نیومتاورسی جدید جهان (متشکل از دو قلمرو پرشکوه <strong className="text-amber-300">«آفرینا»</strong> و <strong className="text-amber-300">«همراز»</strong>) است؛ شهری آرمانی که در آن رویای نان‌آوری و رزق‌آوری از مجاز به سر سفره حقیقی زندگی جهانیان بشارت داده می‌شود و ان‌شاءالله محقق خواهد شد. این پلتفرم با افتخار یکی از بال‌های تشکیل‌دهنده این جهان نوین و شهر خلاق و هوشمند <strong className="text-amber-300">«توانا»</strong> است.
              </p>
            </div>
          </div>
          <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl px-4 py-2.5 text-center flex-shrink-0 w-full md:w-auto">
            <span className="block text-[10px] uppercase text-amber-300 tracking-wider">افق پیوند مجاز و حقیقت</span>
            <span className="block text-xs font-bold text-white mt-0.5">شهر توانا & FP New Meta</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8">
        
        {/* Dynamic Tab Content with Animations */}
        <AnimatePresence mode="wait">
          
          {/* TAB 0: AFREENA METACITY & GRAND TABRIZ CARPET PLAZA */}
          {activeSection === "afreenaPlaza" && (
            <motion.div
              key="afreena-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
              id="afreena-plaza"
            >
              {/* Grand Banner Header */}
              <div className="bg-gradient-to-br from-[#4a0000] via-[#800000] to-[#2d0000] text-amber-50 p-6 md:p-8 rounded-3xl shadow-xl border-2 border-amber-500/30 relative overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-amber-500 text-stone-950 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow">
                        <Landmark className="w-3.5 h-3.5" />
                        <span>میدان مرکزی ابرشهر آفرینا</span>
                      </span>
                      <span className="bg-emerald-600/80 text-white font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-400/30">
                        <Zap className="w-3.5 h-3.5 text-amber-300" />
                        <span>فرش عظیم تبریز در مرکز میدان</span>
                      </span>
                    </div>

                    <h2 className="text-xl md:text-3xl font-extrabold text-amber-200 font-serif leading-tight">
                      میدان اصلی آفرینا و فرش عظیم تبریز؛ قلب تپنده بازار بین‌المللی
                    </h2>

                    <p className="text-xs md:text-sm text-stone-200 leading-relaxed font-sans">
                      در راستای تجلی رویای نیومتاورسی ایران و اکوسیستم آفرینش، در مرکز ابرشهر مدرن و ۳ بعدی <strong className="text-amber-300">«آفرینا»</strong>، بازار بزرگ فرش و یک فرش عظیم ابریشم تبریز با نقوش اصیل لچک و ترنج شاه‌عباسی و ابعاد بی‌نظیر پهن شده است. این میدان با شبکه‌های تاکسی پرنده، راه‌های هوایی و مسیرهای زیرزمینی به بندر خلیج فارس و سواحل دریای خزر متصل بوده و کانون مبادلات تجاری جهانی می‌باشد.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={handleStartAutoPilot}
                        className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold px-5 py-2.5 rounded-2xl shadow-lg transition-all flex items-center gap-2 text-xs md:text-sm transform hover:-translate-y-0.5"
                      >
                        <Bot className="w-4 h-4 text-stone-950" />
                        <span>🤖 پرواز خودکار ربات هوشمند در میدان آفرینا</span>
                      </button>

                      <button
                        onClick={() => setActiveSection("advisor")}
                        className="bg-stone-800/80 hover:bg-stone-800 text-amber-200 border border-amber-500/30 font-bold px-4 py-2.5 rounded-2xl transition-all flex items-center gap-2 text-xs md:text-sm"
                      >
                        <Scroll className="w-4 h-4 text-amber-400" />
                        <span>ورود به اتاق کارشناسی و سنجش عیار</span>
                      </button>
                    </div>
                  </div>

                  {/* High-Res Hero Image Preview */}
                  <div className="lg:col-span-5 relative group">
                    <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600 rounded-3xl opacity-50 blur-lg group-hover:opacity-80 transition-opacity"></div>
                    <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl bg-stone-950">
                      <img
                        src={IMAGES.afreenaPlaza}
                        alt="میدان مرکزی آفرینا و فرش عظیم تبریز"
                        className="w-full h-64 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80"></div>
                      <div className="absolute bottom-3 right-3 left-3 flex justify-between items-center text-xs text-amber-200">
                        <span className="font-bold flex items-center gap-1 bg-stone-900/80 px-2.5 py-1 rounded-lg border border-amber-500/30">
                          <MapPin className="w-3.5 h-3.5 text-amber-400" />
                          <span>خلیج فارس / ابرشهر آفرینا</span>
                        </span>
                        <span className="bg-amber-500 text-stone-950 font-bold px-2 py-0.5 rounded text-[10px]">
                          نمایش ۳ بعدی ۳۶۰ درجه
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Architectural & Carpet Specifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Feature 1: Grand Carpet Spec */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200/80 space-y-3 relative overflow-hidden group hover:border-amber-400 transition-colors">
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-700 font-bold shadow-inner">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 font-serif">فرش عظیم ابریشم تبریز در مرکز میدان</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    بافته شده با ۷۰ رج ابریشم اعلا و گره ترکی متقارن، مزین به لچک و ترنج شاه‌عباسی و رنگ لاکی گیاهی. این شاهکار هنری سنگفرش میدان اصلی شهر آفرینا را پوشش داده است.
                  </p>
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span>تراکم گره: ۸۱۰۰ گره/دسی‌متر</span>
                    <span className="font-bold text-lac">طرح شاه‌عباسی</span>
                  </div>
                </div>

                {/* Feature 2: Metacity Infrastructure */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200/80 space-y-3 relative overflow-hidden group hover:border-amber-400 transition-colors">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 font-bold shadow-inner">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 font-serif">حمل‌ونقل هوایی و تاکسی‌های پرنده</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    پل‌های معلق شیشه‌ای، راه‌های هوایی، خطوط تاکسی پرنده خودکار و تونل‌های شفاف زیرزمینی امکان ارسال فوری نمونه‌های فیزیکی فرش را فراهم می‌سازد.
                  </p>
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span>ارتباط مستقیم: دریای خزر & خلیج فارس</span>
                    <span className="font-bold text-emerald-700">خودکار و هوشمند</span>
                  </div>
                </div>

                {/* Feature 3: International Carpet Bazaar */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200/80 space-y-3 relative overflow-hidden group hover:border-amber-400 transition-colors">
                  <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-700 font-bold shadow-inner">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 font-serif">بازارچه هوشمند بنکداران و حجره پرو</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    دور تا دور میدان آفرینا، حجره‌های سنتی و پیشرفته بنکداران فرش دستباف و غرفه کارخانجات فرش ماشینی قرار گرفته و آماده عقد قرارداد تجاری آنلاین هستند.
                  </p>
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span>حجره معمولی & پرو</span>
                    <span className="font-bold text-lac">صادرات بین‌المللی</span>
                  </div>
                </div>

              </div>

              {/* Full Metacity Panoramic View Card */}
              <div className="bg-stone-900 text-white rounded-3xl p-6 shadow-xl border border-stone-800 space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-amber-300 font-serif flex items-center gap-2">
                      <Landmark className="w-5 h-5 text-amber-400" />
                      <span>پانورامای ۳ بعدی ابرشهر آفرینا و قلمروهای نیومتاورسی</span>
                    </h3>
                    <p className="text-xs text-stone-400 mt-1">
                      چشم‌انداز کامل شهر جدید آفرینا و پهنه آبی خلیج فارس، معمار برج‌های متصل و پارک‌های معلق
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveSection("sellerRoom")}
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ورود به حجره بنکداران شهر آفرینا</span>
                  </button>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-stone-800">
                  <img
                    src={IMAGES.afreenaCity}
                    alt="چشم‌انداز پانورامیک ابرشهر آفرینا"
                    className="w-full h-72 md:h-96 object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-4 right-4 left-4 flex flex-wrap justify-between items-center gap-2 text-xs text-amber-100">
                    <span className="bg-stone-900/90 border border-stone-700 px-3 py-1 rounded-xl">
                      کوه‌های البرز و زاگرس تا سواحل جنوبی
                    </span>
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-xl font-bold">
                      اکوسیستم FP New Meta & شهر توانا
                    </span>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 1: EXPERT ADVISOR CABIN */}
          {activeSection === "advisor" && (
            <motion.div
              key="advisor-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              id="advisor-cabin"
            >
              
              {/* Left Form Column (Input specification) */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-sm border border-stone-100 relative">
                
                {/* Traditional carpet design corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-lac/5 border-r border-t border-lac/15 rounded-tr-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 bg-lac/5 border-l border-b border-lac/15 rounded-bl-3xl pointer-events-none"></div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-lac/5 rounded-xl text-lac">
                    <Scroll className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-bazaar">حجره کارشناسی چندبعدی</h2>
                    <p className="text-xs text-stone-500 mt-0.5">کارشناس دلخواه خود را بر اساس نوع نیاز انتخاب کنید.</p>
                  </div>
                </div>

                {/* Expert Selection Tabs */}
                <div className="grid grid-cols-2 gap-2 mb-4 bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setSelectedExpert("mehdi")}
                    className={`px-2 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedExpert === "mehdi"
                        ? "bg-white text-lac shadow-sm"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    دایی مهدی (پیشکسوت صمیمی)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedExpert("miri")}
                    className={`px-2 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedExpert === "miri"
                        ? "bg-white text-lac shadow-sm"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    حاج حسین علی میری و پسران (آنتیک و اصالت‌شناسی)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedExpert("decorator")}
                    className={`px-2 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedExpert === "decorator"
                        ? "bg-white text-lac shadow-sm"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    دکوراسیون (فرش و پرده)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedExpert("heritage")}
                    className={`px-2 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedExpert === "heritage"
                        ? "bg-white text-lac shadow-sm"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    دپارتمان هریتج (موزه‌ای)
                  </button>
                </div>

                <form onSubmit={handleRequestAppraisal} className="space-y-4">
                  {/* Origin */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">محل بافت (خاستگاه فرش):</label>
                    <select
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-lac focus:ring-1 focus:ring-lac"
                    >
                      <option>تبریز (آذربایجان)</option>
                      <option>کاشان</option>
                      <option>اصفهان</option>
                      <option>شیراز (قشقایی و عشایری)</option>
                      <option>نایین</option>
                      <option>قم (ابریشم خالص)</option>
                      <option>همدان (مهربان و تویسرکان)</option>
                      <option>یزد</option>
                      <option>ترکمن صحرا (ذهنی‌بافت بخارا)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Raj-shomar */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">رج‌شمار تقریبی:</label>
                      <select
                        value={raj}
                        onChange={(e) => setRaj(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-lac"
                      >
                        <option>۲۵ رج (درشت بافت سنتی)</option>
                        <option>۳۰ الی ۳۵ رج</option>
                        <option>۴۰ الی ۴۵ رج (بافت متوسط بازار)</option>
                        <option>۵۰ رج (نفیس تبریز و کاشان)</option>
                        <option>۶۰ رج (اعلا و گل‌ابریشم)</option>
                        <option>۷۰ رج و بالاتر (فوق نفیس اصفهان/قم)</option>
                      </select>
                    </div>

                    {/* Material */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">جنس چله و خامه:</label>
                      <select
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-lac"
                      >
                        <option>پشم به پشم (تمام پشم سنتی)</option>
                        <option>پشم بر روی چله پنبه (رایج)</option>
                        <option>خامه مرینوس و ابریشم</option>
                        <option>گل‌ابریشم چله ابریشم</option>
                        <option>ابریشم خالص قم (تمام ابریشم)</option>
                        <option>کرک اصفهان بر چله ابریشم</option>
                      </select>
                    </div>
                  </div>

                  {/* Design type */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">طرح و نقشه قالی:</label>
                    <select
                      value={design}
                      onChange={(e) => setDesign(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-lac"
                    >
                      <option>لچک و ترنج سنتی</option>
                      <option>نقشه افشان (بدون ترنج میانی)</option>
                      <option>طرح خشتی و قاب‌قابی</option>
                      <option>درختی و محرابی</option>
                      <option>نقش هندسی و عشایری (هبک‌لو قشقایی)</option>
                      <option>شکارگاه سلاطین</option>
                      <option>نقشه ریزماهی تبریز</option>
                      <option>اسلیمی شاه‌عباسی</option>
                    </select>
                  </div>

                  {/* Dimensions */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">طول (متر):</label>
                      <input
                        type="number"
                        step="0.1"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-lac"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">عرض (متر):</label>
                      <input
                        type="number"
                        step="0.1"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-lac"
                      />
                    </div>
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">سن و قدمت قالی:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["نوبافت", "نیمه‌آنتیک (۱۰ تا ۵۰ سال)", "آنتیک موروثی"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setAge(opt)}
                          className={`px-2 py-2 rounded-xl text-[10px] font-medium border transition-all ${
                            age === opt
                              ? "bg-lac/10 border-lac text-lac font-bold"
                              : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special user notes */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      {selectedExpert === "decorator" ? "مشخصات پرده، مبلمان، رنگ دیوار و نور محیط:" : "نشانه‌ها، رنگ‌ها یا داستان‌های موروثی:"}
                    </label>
                    <textarea
                      value={userNotes}
                      onChange={(e) => setUserNotes(e.target.value)}
                      placeholder={
                        selectedExpert === "decorator"
                          ? "مثلا: پرده‌های حریر سفید مایل به کرم داریم، مبلمان راحتی طوسی رنگ و دیوارها استخوانی نقاشی شده‌اند..."
                          : "مثلا: ریشه‌ها زرد رنگ طبیعی هستند، در حاشیه چپ یک گلبرگ قرینه نیست، فرش دست‌بافت مادربزرگ است..."
                      }
                      rows={3}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-lac"
                    />
                  </div>

                  {/* Action Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-lac text-white py-3 rounded-xl font-bold text-sm hover:bg-red-900 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>در حال گفتمان و کالبدشکافی...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>شروع کارشناسی و ارزش‌سنجی تخصصی</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Certificate and Storytelling Column */}
              <div className="lg:col-span-7 flex flex-col gap-6" id="certificate-view">
                <AnimatePresence mode="wait">
                  {loading && (
                    <motion.div
                      key="loading-box"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-[#faf5e8] border border-amber-200/50 rounded-3xl p-12 text-center shadow-inner flex flex-col items-center justify-center min-h-[500px]"
                    >
                      <div className="relative mb-6">
                        {/* Spinning mandala style loader */}
                        <div className="w-16 h-16 border-4 border-lac/20 border-t-lac rounded-full animate-spin"></div>
                        <Scroll className="w-6 h-6 text-lac absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <h3 className="text-xl font-bold text-bazaar animate-pulse">در حال گشودن دفتر عیارسنجی کارشناس...</h3>
                      <p className="text-stone-600 text-sm mt-3 max-w-sm mx-auto leading-relaxed">
                        {selectedExpert === "mehdi" && "دایی مهدی در حال بررسی پشم، رنگ‌ طبیعی و داستان این قالی در حجره خویش است..."}
                        {selectedExpert === "miri" && "کارشناسان گالری حاج حسین علی میری و پسران در حال کالبدشکافی اصالت بافت و ارزش موروثی آن هستند..."}
                        {selectedExpert === "decorator" && "طراح دکوراسیون در حال ست کردن اسلیمی‌های این قالی با پرده و مبلمان مدرن و کلاسیک شماست..."}
                        {selectedExpert === "heritage" && "دپارتمان بین‌المللی هریتج در حال ثبت مشخصات قالی در کاتالوگ موزه و بررسی بازار صادراتی آن است..."}
                      </p>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      key="error-box"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center"
                    >
                      <div className="w-12 h-12 bg-red-100 text-red-700 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Info className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-red-900">خلل در بازار فرش</h3>
                      <p className="text-sm text-red-700 mt-2">{error}</p>
                      <button
                        onClick={handleRequestAppraisal}
                        className="mt-4 px-4 py-2 bg-red-800 text-white rounded-xl text-xs font-semibold hover:bg-red-900 transition-all"
                      >
                        تلاش مجدد
                      </button>
                    </motion.div>
                  )}

                  {!loading && !error && !appraisal && (
                    <motion.div
                      key="empty-box"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-[#fcfbf9] border-2 border-dashed border-stone-200 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[500px]"
                    >
                      <Scroll className="w-16 h-16 text-stone-300 mb-4" />
                      <h3 className="text-lg font-bold text-stone-700">کارشناسی اصالت و عیارسنجی</h3>
                      <p className="text-sm text-stone-500 mt-2 max-w-sm leading-relaxed">
                        مشخصات فرش خود را در فرم روبرو کامل کنید و کارشناس مربوطه را برگزینید تا شناسنامه رسمی سنتی صادر گردد. همچنین می‌توانید از گالری انتهای صفحه مستقیماً فرش بارگذاری کنید.
                      </p>
                      
                      {/* Decorative elements */}
                      <div className="grid grid-cols-4 gap-2 mt-8 w-full max-w-md">
                        {CARPET_GALLERY.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleLoadPreset(item)}
                            className="group relative rounded-xl overflow-hidden aspect-square border border-stone-200 hover:border-lac transition-all"
                          >
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-[10px] text-white font-bold px-1 text-center">{item.origin}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                      <span className="text-xs text-stone-400 mt-2">بارگذاری سریع شاهکارهای پیش‌فرض با یک کلیک</span>
                    </motion.div>
                  )}

                  {/* THE MASTERPIECE CARPET CERTIFICATE */}
                  {appraisal && (
                    <motion.div
                      key="appraisal-certificate"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="bg-[#faf6ee] border-[6px] border-double border-lac/30 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden text-stone-900"
                    >
                      {/* Vintage Islamic Ornament Borders */}
                      <div className="absolute top-2 right-2 w-12 h-12 border-r-2 border-t-2 border-amber-600/30"></div>
                      <div className="absolute top-2 left-2 w-12 h-12 border-l-2 border-t-2 border-amber-600/30"></div>
                      <div className="absolute bottom-2 right-2 w-12 h-12 border-r-2 border-b-2 border-amber-600/30"></div>
                      <div className="absolute bottom-2 left-2 w-12 h-12 border-l-2 border-b-2 border-amber-600/30"></div>

                      <div className="text-center border-b border-amber-600/20 pb-4 mb-6">
                        <div className="text-amber-700 text-xs font-serif font-semibold tracking-widest mb-1">هو اللطیف</div>
                        <h3 className="text-xl font-extrabold text-lac">
                          {selectedExpert === "decorator" ? "کاربرگ چیدمان و همخوانی فرش و دکوراسیون" : "شناسنامه رسمی اصالت و ارزش‌سنجی فرش"}
                        </h3>
                        <p className="text-[10px] text-stone-500 font-mono mt-1">شماره اصالت: FB-{Math.floor(100000 + Math.random() * 900000)}</p>
                      </div>

                      {/* Summary Tags */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                        <div className="bg-stone-100/60 p-2 rounded-xl text-center border border-stone-200/50">
                          <span className="block text-[10px] text-stone-500">منطقه اصالت</span>
                          <span className="text-xs font-bold text-bazaar">{origin}</span>
                        </div>
                        <div className="bg-stone-100/60 p-2 rounded-xl text-center border border-stone-200/50">
                          <span className="block text-[10px] text-stone-500">تراکم رج</span>
                          <span className="text-xs font-bold text-bazaar">{raj}</span>
                        </div>
                        <div className="bg-stone-100/60 p-2 rounded-xl text-center border border-stone-200/50">
                          <span className="block text-[10px] text-stone-500">طرح و نقشه</span>
                          <span className="text-xs font-bold text-bazaar">{design}</span>
                        </div>
                        <div className="bg-stone-100/60 p-2 rounded-xl text-center border border-stone-200/50">
                          <span className="block text-[10px] text-stone-500">ابعاد</span>
                          <span className="text-xs font-bold text-bazaar">{length} × {width} م</span>
                        </div>
                      </div>

                      {/* Expert Identity banner inside certificate */}
                      <div className="mb-4 py-2 px-3 bg-amber-500/10 border-r-4 border-amber-500 rounded-lg text-xs font-bold text-amber-900">
                        🖊️ صادرکننده: {" "}
                        {selectedExpert === "mehdi" && "دایی مهدی (ریش‌سفید و معتمد صنف بازار تهران و تبریز)"}
                        {selectedExpert === "miri" && "خاندان استاد حاج حسین علی میری و پسران (کارشناسان خبره آنتیک و اصالت‌شناسی)"}
                        {selectedExpert === "decorator" && "واحد دکوراسیون و همخوانی فرش، پرده و چیدمان فرش بازار"}
                        {selectedExpert === "heritage" && "دپارتمان هریتج (کمیسیون ارزیابی صادراتی و موزه‌ای فرش ایران)"}
                      </div>

                      {/* Section: Expert Opinion */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 text-lac mb-2">
                          <Scroll className="w-4 h-4 text-amber-600" />
                          <h4 className="font-bold text-sm">
                            {selectedExpert === "decorator" ? "راهنمای ست کردن فرش با پرده و فضا:" : "نظریه و کالبدشکافی فنی:"}
                          </h4>
                        </div>
                        <div className="bg-white/80 p-4 rounded-2xl border border-amber-600/10 text-xs text-stone-700 leading-relaxed shadow-sm">
                          {appraisal.expertAppraisal}
                        </div>
                      </div>

                      {/* Section: POETIC STORY (Hekayat Tar o Pood) */}
                      <div className="mb-6 bg-gradient-to-br from-amber-50 to-orange-50/20 p-4 rounded-2xl border border-amber-600/15 relative">
                        <div className="absolute top-2 left-2 opacity-5">
                          <Sparkles className="w-12 h-12 text-amber-700" />
                        </div>
                        <div className="flex items-center gap-2 text-amber-800 mb-2">
                          <Heart className="w-4 h-4 text-amber-600 animate-pulse fill-amber-100" />
                          <h4 className="font-bold text-sm">داستان تار و پود (افسانه و هویت روحی قالی):</h4>
                        </div>
                        <p className="text-xs text-stone-700 leading-relaxed italic whitespace-pre-line">
                          {appraisal.story}
                        </p>
                      </div>

                      {/* Section: TECHNICAL RATINGS */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-3 rounded-xl border border-stone-200 text-center">
                          <span className="block text-[10px] text-stone-500">رتبه‌بندی رج (بافت)</span>
                          <span className="text-xs font-bold text-amber-800 block mt-1">{appraisal.technicalSpecs.rajClass}</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-stone-200 text-center">
                          <span className="block text-[10px] text-stone-500">تخمین تعداد گره در مترمربع</span>
                          <span className="text-xs font-bold text-lac block mt-1">{appraisal.technicalSpecs.knotDensity}</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-stone-200 text-center">
                          <span className="block text-[10px] text-stone-500">کمیابی در بازار امروز</span>
                          <span className="text-xs font-bold text-firoozeh block mt-1">{appraisal.technicalSpecs.rarity}</span>
                        </div>
                      </div>

                      {/* Section: VALUATION INNER SEAL with paid certification feature */}
                      <div className={`border-2 rounded-2xl p-5 mb-6 relative overflow-hidden transition-all duration-500 ${
                        appraisalFeePaid 
                          ? "bg-gradient-to-br from-amber-500/10 via-amber-100/30 to-amber-500/5 border-amber-500 shadow-md shadow-amber-500/10" 
                          : "bg-stone-50/80 border-stone-200"
                      }`}>
                        <div className="absolute top-3 left-3 text-amber-500/10">
                          <Coins className="w-16 h-16" />
                        </div>
                        
                        <div className="flex items-center justify-between mb-3 border-b border-stone-200/50 pb-2">
                          <div className="flex items-center gap-2 text-bazaar">
                            <Coins className="w-4 h-4 text-amber-600" />
                            <h4 className="font-bold text-xs md:text-sm">حق کارشناسی رسمی و عیارسنجی ممهور طلایی:</h4>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            appraisalFeePaid ? "bg-amber-500 text-white animate-pulse" : "bg-stone-200 text-stone-600"
                          }`}>
                            {appraisalFeePaid ? "شناسنامه ممهور طلایی صادر شد" : "پیش‌نمایش غیررسمی"}
                          </span>
                        </div>

                        {/* Paid vs Free layout */}
                        {!appraisalFeePaid ? (
                          <div className="space-y-4">
                            <p className="text-[11px] text-stone-600 leading-relaxed bg-amber-500/5 p-3 rounded-xl border border-amber-500/15">
                              ⚠️ <strong>اطلاعیه مالکان خانگی:</strong> ارزیابی مادی و داستان بالا جنبه تخمین دارد. جهت دریافت <strong>شناسنامه طلایی ممهور با هولوگرام رسمی</strong>، تاییدیه رسمی قیمت صنف و امضای خاندان بزرگ حاج حسین علی میری و پسران، مالکان خانگی می‌توانند کارمزد مصوب کارشناسی را تایید نمایند.
                            </p>
                            
                            {isPayingFee ? (
                              <div className="bg-white p-4 rounded-xl border border-amber-500/30 space-y-3 shadow-inner">
                                <div className="flex items-center justify-center gap-2 py-2 text-xs text-amber-800 font-bold">
                                  <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                                  <span>در حال اتصال به درگاه امن شبیه‌ساز پرداخت کارآفرین...</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-[10px] text-stone-500">
                                  <div>مبلغ: ۲۵۰,۰۰۰ تومان</div>
                                  <div className="text-left font-mono">حساب: گالری حاج حسین علی میری و پسران</div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col sm:flex-row gap-2 items-center justify-between pt-2">
                                <div className="text-right">
                                  <span className="text-[10px] text-stone-500 block">تعرفه کارشناسی معتمد بازار:</span>
                                  <span className="text-xs font-bold text-stone-800">۲۵۰,۰۰۰ تومان <span className="text-[10px] font-normal text-stone-500">(بصورت شبیه‌سازی شده)</span></span>
                                </div>
                                <button
                                  onClick={handleSimulatePayment}
                                  className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-700 text-white rounded-xl text-xs font-extrabold hover:from-amber-600 hover:to-amber-800 transition-all shadow-md cursor-pointer flex items-center justify-center gap-1"
                                >
                                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                                  <span>پرداخت کارمزد و ارتقا به شناسنامه طلایی ممهور</span>
                                </button>
                              </div>
                            )}

                            {/* Blurred Valuation specs preview */}
                            <div className="filter blur-[1.5px] opacity-40 pointer-events-none select-none">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white px-3 py-2 rounded-xl border border-stone-200">
                                  <span className="text-[9px] text-stone-400">بازه ارزش نقدی بازار:</span>
                                  <span className="block text-xs font-bold text-stone-500">۰۰۰,۰۰۰,۰۰۰ تومان</span>
                                </div>
                                <div className="bg-white px-3 py-2 rounded-xl border border-stone-200">
                                  <span className="text-[9px] text-stone-400">معادل سنتی:</span>
                                  <span className="block text-xs font-bold text-stone-500">۰.۰ سکه بهار آزادی</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-4"
                          >
                            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl flex items-start gap-2.5">
                              <span className="text-amber-800 font-extrabold text-base shrink-0 animate-bounce">🏆</span>
                              <div className="text-xs text-amber-900 leading-relaxed">
                                <strong>شناسنامه رسمی صادر شد:</strong> این گواهی به نام <strong>گالری حاج حسین علی میری و پسران (پلاک ۴۸ خیام)</strong> ثبت گردید. نسخه فیزیکی چاپی با هولوگرام سه بعدی طلایی به آدرس پستی شما ارسال خواهد شد.
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="bg-white px-3 py-2 rounded-xl border border-amber-500/30 shadow-sm relative">
                                <span className="text-[10px] text-stone-500">ارزش نهایی تعیین شده توسط کارشناس صنف:</span>
                                <span className="block text-sm md:text-base font-extrabold text-lac mt-0.5">{appraisal.valuation.rangeTomans}</span>
                              </div>
                              <div className="bg-white px-3 py-2 rounded-xl border border-amber-500/30 shadow-sm">
                                <span className="text-[10px] text-stone-500">معادل سنتی رسمی بازار طلا:</span>
                                <span className="block text-sm md:text-base font-extrabold text-amber-800 mt-0.5">{appraisal.valuation.rangeGoldSovereigns}</span>
                              </div>
                            </div>

                            <div className="bg-white p-3 rounded-xl border border-stone-150">
                              <span className="text-[10px] text-stone-400 block mb-1">کبیره مستند توجیهی و ضمانت معامله:</span>
                              <p className="text-xs text-stone-700 leading-relaxed">
                                <strong>توجیه مادی:</strong> {appraisal.valuation.justification}
                              </p>
                            </div>

                            {/* Seal & Certification credentials */}
                            <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-amber-500/10 text-[10px] text-stone-500 gap-2">
                              <div>
                                <span className="block font-mono">کد اصالت رسمی: MIRI-CERT-{(800000 + Math.floor(Math.random() * 199999))}</span>
                                <span className="block">مرجع ثبتی: صنف پیشکسوتان بازار تهران (حاج حسین علی میری و پسران)</span>
                              </div>
                              <button 
                                onClick={() => window.print()}
                                className="px-3 py-1 bg-stone-800 hover:bg-stone-900 text-white rounded-lg transition-colors cursor-pointer text-[10px]"
                              >
                                🖨️ چاپ فیزیکی شناسنامه ممهور
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Section: MAINTENANCE ADVICE */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-firoozeh mb-2">
                          <ShieldCheck className="w-4 h-4" />
                          <h4 className="font-bold text-sm text-bazaar">
                            {selectedExpert === "decorator" ? "توصیه‌های چیدمان پرده و مبل با این قالی:" : "توصیه‌های حفظ و نگهداری میراث:"}
                          </h4>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-stone-600">
                          {appraisal.maintenanceTips.map((tip, idx) => (
                            <li key={idx} className="bg-stone-50 p-2 rounded-lg border border-stone-200/50 flex gap-1.5">
                              <span className="text-lac font-bold shrink-0">۰{idx + 1}.</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Official Stamp Footer */}
                      <div className="flex items-center justify-between border-t border-amber-600/20 pt-4 mt-6 text-xs text-stone-500">
                        <div>
                          <span>تاریخ ثبت کارشناسی: {new Date().toLocaleDateString("fa-IR")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif italic font-semibold text-lac">ممهور به مهر کارشناسی فرش‌بازار</span>
                          <div className="w-12 h-12 rounded-full border-2 border-lac/70 flex items-center justify-center font-bold text-[8px] text-lac uppercase tracking-tighter rotate-12 bg-white">
                            Daei Mehdi
                          </div>
                        </div>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

                {/* HISTORICAL LOGS */}
                {historyLogs.length > 0 && (
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
                    <div className="flex items-center gap-2 mb-4">
                      <History className="w-5 h-5 text-stone-600" />
                      <h3 className="font-bold text-sm">بایگانی کارشناسی‌های امروز</h3>
                    </div>
                    <div className="space-y-2">
                      {historyLogs.map((log, idx) => (
                        <button
                          key={idx}
                          onClick={() => setAppraisal(log.data)}
                          className="w-full flex items-center justify-between p-3 rounded-xl border border-stone-100 hover:border-amber-200 bg-stone-50/50 hover:bg-stone-50 text-right transition-all text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            <span className="font-bold text-stone-700">{log.name}</span>
                            <span className="text-[10px] text-stone-400">({log.expert})</span>
                          </div>
                          <span className="text-stone-400 font-mono">{log.date}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </motion.div>
          )}

          {/* TAB 2: SELLERS SHOP SANDBOX (REGULAR VS PRO) */}
          {activeSection === "sellerRoom" && (
            <motion.div
              key="seller-room-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto">
                <span className="px-3 py-1 bg-lac/5 border border-lac/10 rounded-full text-lac text-xs font-bold">بخش تجاری فرش‌بازار</span>
                <h2 className="text-2xl font-extrabold text-bazaar mt-3">شبیه‌ساز هوشمند حجره‌های فروشندگان</h2>
                <p className="text-stone-600 text-sm mt-2">
                  فرش‌بازار به هر کاسب و بافنده یک حجره اختصاصی می‌دهد. در شبیه‌ساز زیر تفاوت قابلیت‌های شگفت‌انگیز نسخه معمولی و ویژه (Pro) را تست و تجربه کنید.
                </p>
              </div>

              {/* Toggle Selector for Shop Tier */}
              <div className="flex justify-center max-w-md mx-auto bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
                <button
                  onClick={() => {
                    setShopTier("regular");
                    setActiveShopTab("products");
                  }}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                    shopTier === "regular"
                      ? "bg-stone-600 text-white shadow"
                      : "text-stone-600 hover:text-bazaar"
                  }`}
                >
                  حجره معمولی (نسخه رایگان)
                </button>
                <button
                  onClick={() => {
                    setShopTier("pro");
                  }}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 relative ${
                    shopTier === "pro"
                      ? "bg-lac text-white shadow"
                      : "text-stone-600 hover:text-bazaar"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span>حجره پرو / ویژه (تجاری)</span>
                  <span className="absolute -top-3 -left-3 bg-amber-500 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-full rotate-12">PRO</span>
                </button>
              </div>

              {/* Shop Workspace Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Control Panel Settings (Left side) */}
                <div className="lg:col-span-4 bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-6">
                  <div className="flex items-center gap-2 text-bazaar pb-3 border-b border-stone-100">
                    <Sliders className="w-5 h-5 text-lac" />
                    <h3 className="font-bold text-sm">تنظیمات نمایشی حجره</h3>
                  </div>

                  {/* Config Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">نام تجاری حجره شما:</label>
                    <input
                      type="text"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-lac"
                    />
                  </div>

                  {/* Config Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">تلفن هماهنگی مشتریان:</label>
                    <input
                      type="text"
                      value={shopContact}
                      onChange={(e) => setShopContact(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-lac text-left font-mono"
                    />
                  </div>

                  {/* Simulated Upload widget */}
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center">
                    <ImageIcon className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                    <span className="text-xs font-bold text-stone-700 block">شبیه‌سازی آپلود عکس فرش جدید</span>
                    <p className="text-[10px] text-stone-400 mt-1 mb-3">آپلود عکس فرش جدید در حجره شما</p>
                    <input
                      type="file"
                      accept="image/*"
                      id="simulated-upload"
                      onChange={handleSimulatePhotoUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="simulated-upload"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 rounded-xl text-xs font-semibold hover:border-lac hover:text-lac transition-all cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>انتخاب عکس</span>
                    </label>
                  </div>

                  {/* Tier status warnings */}
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed border ${
                    shopTier === "regular"
                      ? "bg-amber-50 border-amber-200 text-amber-800"
                      : "bg-emerald-50 border-emerald-200 text-emerald-800"
                  }`}>
                    {shopTier === "regular" ? (
                      <div>
                        <strong>محدودیت‌های نسخه معمولی (رایگان):</strong>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-[11px] text-stone-600">
                          <li>حداکثر ۳ عکس گالری محصولات.</li>
                          <li>عدم امکان آپلود کلیپ ویدیوئی کارگاه.</li>
                          <li>بدون ترجمه هوشمند بین‌المللی برای مذاکره با تجار خارجی.</li>
                          <li>پوسته ساده تک صفحه‌ای.</li>
                        </ul>
                      </div>
                    ) : (
                      <div>
                        <strong>مزایای تجاری فعال نسخه پرو (ویژه):</strong>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-[11px] text-stone-700">
                          <li>ثبت و گالری نامحدود تصاویر فرش.</li>
                          <li>پخش و آپلود ویدیوهای بافت برای جلب اعتماد خریدار.</li>
                          <li>دسترسی به <strong>مترجم هوشمند با هوش مصنوعی</strong> جهت مکاتبه با مشتریان خارجی.</li>
                          <li>قالب‌های گرافیکی اختصاصی و چند صفحه‌ای.</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Simulated Shop Frame Preview (Right side) */}
                <div className="lg:col-span-8 flex flex-col">
                  
                  {/* Browser Frame Mockup */}
                  <div className="bg-stone-800 text-stone-300 p-3 rounded-t-3xl flex items-center justify-between text-xs px-6">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                    </div>
                    <div className="bg-stone-700/80 text-[10px] text-stone-400 px-6 py-1 rounded-lg w-1/2 text-center font-mono truncate">
                      https://farshbazaar.ir/rooms/{shopName.toLowerCase().replace(/\s+/g, '-')}
                    </div>
                    <span className="text-[10px] text-stone-500 font-mono">پیش‌نمایش حجره شما</span>
                  </div>

                  {/* Simulated App Sandbox Body */}
                  <div className="bg-[#fafafa] border-x border-b border-stone-200 p-6 rounded-b-3xl min-h-[500px] flex flex-col justify-between">
                    
                    <div>
                      {/* Shop Header banner */}
                      <div className="flex flex-col md:flex-row items-center justify-between pb-6 border-b border-stone-200/60 gap-4">
                        <div className="text-center md:text-right">
                          <h4 className="text-xl font-extrabold text-bazaar">{shopName}</h4>
                          <span className="text-[11px] text-stone-500 flex items-center gap-1 justify-center md:justify-start mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span>حجره فعال در دالان بازار بزرگ | پشتیبانی: {shopContact}</span>
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            shopTier === "regular"
                              ? "bg-stone-200 text-stone-700"
                              : "bg-lac text-white"
                          }`}>
                            {shopTier === "regular" ? "حجره رایگان معمولی" : "حجره ویژه پرو (PRO)"}
                          </span>
                        </div>
                      </div>

                      {/* Pro Navigation Tabs inside the shop preview */}
                      {shopTier === "pro" && (
                        <div className="flex border-b border-stone-200 mt-4 text-xs font-bold text-stone-600">
                          <button
                            onClick={() => setActiveShopTab("products")}
                            className={`px-4 py-2 border-b-2 transition-all ${
                              activeShopTab === "products" ? "border-lac text-lac" : "border-transparent hover:text-bazaar"
                            }`}
                          >
                            گالری محصولات ({shopPhotos.length})
                          </button>
                          <button
                            onClick={() => setActiveShopTab("videos")}
                            className={`px-4 py-2 border-b-2 transition-all ${
                              activeShopTab === "videos" ? "border-lac text-lac" : "border-transparent hover:text-bazaar"
                            }`}
                          >
                            ویدیوهای کارگاه ({simulatedVideos.length})
                          </button>
                          <button
                            onClick={() => setActiveShopTab("translator")}
                            className={`px-4 py-2 border-b-2 transition-all flex items-center gap-1 ${
                              activeShopTab === "translator" ? "border-lac text-lac" : "border-transparent hover:text-bazaar"
                            }`}
                          >
                            <Globe className="w-3.5 h-3.5 text-firoozeh" />
                            <span>مترجم هوشمند صادراتی</span>
                          </button>
                        </div>
                      )}

                      {/* Content Panel */}
                      <div className="py-6">
                        
                        {/* PRODUCT GALLERY TAB */}
                        {activeShopTab === "products" && (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs text-stone-500">
                              <span>قالی‌های ثبت شده جهت بازدید مشتری:</span>
                              {shopTier === "regular" && (
                                <span className="text-amber-700 font-bold">محدودیت معمولی: {shopPhotos.length} از ۳ تصویر استفاده شده</span>
                              )}
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                              {shopPhotos.map((img, idx) => (
                                <div key={idx} className="bg-white p-2 rounded-xl border border-stone-200/50 shadow-sm relative group">
                                  <img src={img} alt="قالی حجره" className="w-full h-32 object-cover rounded-lg" />
                                  <span className="absolute bottom-4 left-4 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded-md">
                                    عکس {idx + 1}
                                  </span>
                                  {/* Delete simulate button */}
                                  <button 
                                    onClick={() => setShopPhotos(shopPhotos.filter((_, i) => i !== idx))}
                                    className="absolute top-4 right-4 bg-red-700 hover:bg-red-800 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    title="حذف عکس"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}

                              {/* Upload placeholder if empty */}
                              {shopPhotos.length === 0 && (
                                <div className="col-span-3 py-12 text-center text-stone-400 text-xs">
                                  هنوز فرشی در حجره بارگذاری نشده است. از پانل سمت چپ عکسی انتخاب کنید.
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* VIDEOS TAB */}
                        {shopTier === "pro" && activeShopTab === "videos" && (
                          <div className="space-y-4">
                            <span className="text-xs text-stone-500 block">ویدیوهای اعتماد‌ساز بافت و دار قالی کارگاه شما:</span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {simulatedVideos.map((videoTitle, idx) => (
                                <div key={idx} className="bg-stone-900 text-white p-4 rounded-xl border border-stone-800 flex flex-col justify-between min-h-36 relative overflow-hidden group">
                                  <div className="absolute inset-0 bg-gradient-to-br from-lac/10 to-transparent pointer-events-none"></div>
                                  <div>
                                    <Video className="w-8 h-8 text-amber-500 mb-2" />
                                    <h5 className="font-bold text-xs text-stone-200">{videoTitle}</h5>
                                    <p className="text-[10px] text-stone-500 mt-1">مدت زمان: ۲ دقیقه و ۱۴ ثانیه</p>
                                  </div>
                                  <div className="mt-3 flex items-center gap-1.5 bg-black/40 text-[10px] font-mono text-emerald-400 px-2 py-1 rounded-lg w-fit">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                                    <span>ویدیو آماده نمایش به خریدار</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* EXPORT AI TRANSLATOR TAB */}
                        {shopTier === "pro" && activeShopTab === "translator" && (
                          <div className="space-y-4">
                            <div className="bg-firoozeh/5 p-4 rounded-2xl border border-firoozeh/10 text-xs text-stone-700 leading-relaxed flex flex-col md:flex-row md:items-center justify-between gap-3">
                              <div>
                                <strong>مترجم بین‌المللی و بومی‌سازی صادراتی فرش‌بازار:</strong> دایی مهدی این پیشخوان پیشرفته را به منظور تسهیل فرآیند صادرات قالی‌های نفیس ایرانی به بیش از ۱۴ زبان زنده دنیا در اختیار شما گذاشته است.
                              </div>
                              <span className="text-[10px] font-bold bg-firoozeh/10 text-firoozeh px-2.5 py-1 rounded-full whitespace-nowrap self-start md:self-auto">
                                مجهز به موتور هوشمند FP-NewMeta
                              </span>
                            </div>

                            {/* Translation Mode Selectors */}
                            <div className="grid grid-cols-2 gap-3">
                              <button
                                type="button"
                                onClick={() => setTranslationType("machine")}
                                className={`p-3 rounded-xl border text-right transition-all duration-200 ${
                                  translationType === "machine"
                                    ? "bg-firoozeh/10 border-firoozeh text-firoozeh font-bold shadow-sm"
                                    : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                                }`}
                              >
                                <span className="block text-xs font-bold">۱. ترجمه هوشمند ماشینی</span>
                                <span className="block text-[10px] text-stone-500 font-normal mt-0.5">ترجمه سریع، روان، دقیق و استاندارد تجاری برای معرفی کاتالوگ اثر</span>
                              </button>
                              
                              <button
                                type="button"
                                onClick={() => setTranslationType("hand_knotted")}
                                className={`p-3 rounded-xl border text-right transition-all duration-200 ${
                                  translationType === "hand_knotted"
                                    ? "bg-amber-600/10 border-amber-500 text-amber-800 font-bold shadow-sm"
                                    : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                                }`}
                              >
                                <span className="block text-xs font-bold">۲. ترجمه بومی‌سازی شده دست‌بافت (Hand-Knotted)</span>
                                <span className="block text-[10px] text-stone-500 font-normal mt-0.5">ترجمه هنری، شاعرانه و بومی‌سازی شده با واژگان اصیل برای شیفته کردن خریدار</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              
                              {/* Input box */}
                              <div className="space-y-3">
                                <label className="block text-xs font-bold text-stone-700">متن فارسی معرفی فرش یا پیام تجاری صادرکننده:</label>
                                <textarea
                                  value={translateInput}
                                  onChange={(e) => setTranslateInput(e.target.value)}
                                  rows={5}
                                  className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-lac"
                                />
                                <div className="flex flex-wrap gap-2 items-center justify-between">
                                  <div className="flex gap-2 items-center">
                                    <span className="text-xs text-stone-600">ترجمه به زبان:</span>
                                    <select
                                      value={targetLang}
                                      onChange={(e) => setTargetLang(e.target.value)}
                                      className="bg-white border border-stone-200 rounded-lg px-2 py-1 text-xs focus:ring-1 focus:ring-firoozeh"
                                    >
                                      <option value="English">انگلیسی (English)</option>
                                      <option value="Persian">فارسی (Persian)</option>
                                      <option value="Turkish">ترکی استانبولی (Türkçe)</option>
                                      <option value="Azerbaijani">ترکی آذربایجانی (Azərbaycanca)</option>
                                      <option value="Arabic">عربی (العربية)</option>
                                      <option value="French">فرانسوی (Français)</option>
                                      <option value="German">آلمانی (Deutsch)</option>
                                      <option value="Italian">ایتالیایی (Italiano)</option>
                                      <option value="Japanese">ژاپنی (日本語)</option>
                                      <option value="Chinese">چینی (中文)</option>
                                      <option value="Spanish">اسپانیایی (Español)</option>
                                      <option value="Kurdish">کردی (Kurdî)</option>
                                      <option value="Hindi">هندی (हिन्दी)</option>
                                      <option value="Russian">روسی (Русский)</option>
                                    </select>
                                  </div>
                                  <button
                                    onClick={handleTranslateText}
                                    disabled={translationLoading}
                                    className="px-5 py-2 bg-firoozeh hover:bg-teal-700 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                                  >
                                    {translationLoading ? "در حال گره‌زنی کلمات..." : "شروع ترجمه هوشمند"}
                                  </button>
                                </div>
                              </div>

                              {/* Output Box */}
                              <div className="space-y-3">
                                <label className="block text-xs font-bold text-stone-700">خروجی ترجمه روان و بومی‌سازی شده:</label>
                                <div className="w-full bg-stone-100 border border-stone-200 rounded-xl p-3 text-xs min-h-32 font-serif leading-relaxed text-stone-800 text-left" dir="auto">
                                  {translationLoading ? (
                                    <span className="text-stone-400 italic">Translating and weaving words utilizing Gemini AI...</span>
                                  ) : translateOutput ? (
                                    translateOutput
                                  ) : (
                                    <span className="text-stone-400 italic">ترجمه نهایی در این بخش پدیدار خواهد شد. متن خود را در سمت راست نوشته و روی دکمه شروع کلیک کنید.</span>
                                  )}
                                </div>
                                <span className="text-[10px] text-stone-400 block text-left">Generated with pride via FarshBazaar Global Localization Engine</span>
                              </div>

                            </div>
                          </div>
                        )}

                        {/* Regular limitations warning message inside preview if trying to access blocked features */}
                        {shopTier === "regular" && activeShopTab !== "products" && (
                          <div className="bg-red-50 border border-red-100 text-red-800 p-8 text-center rounded-2xl">
                            <Info className="w-10 h-10 text-red-700 mx-auto mb-2" />
                            <h5 className="font-bold text-sm">قابلیت قفل شده مخصوص حجره‌های ویژه (PRO)</h5>
                            <p className="text-xs text-stone-600 mt-2 max-w-sm mx-auto leading-relaxed">
                              دسترسی به ویدیوهای کارگاه بافندگی و مترجم هوشمند صادراتی در حجره معمولی غیرفعال است. جهت بازگشایی آنی، حساب کارگاه خود را ارتقا دهید.
                            </p>
                          </div>
                        )}

                      </div>

                    </div>

                    {/* Shop Preview footer */}
                    <div className="border-t border-stone-200/60 pt-4 mt-6 flex justify-between items-center text-[10px] text-stone-400">
                      <span>پشتیبانی فنی سایت: فرش‌بازار دات آی‌آر</span>
                      <span>طراحی شده با الگوهای لاکی و اسلیمی اعلا</span>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: CUSTOM PORTRAIT & FLAG WEAVING WORKSHOP */}
          {activeSection === "customWeave" && (
            <motion.div
              key="custom-weave-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto">
                <span className="px-3 py-1 bg-lac/5 border border-lac/10 rounded-full text-lac text-xs font-bold">بخش سفارشی بافندگی اعلا</span>
                <h2 className="text-2xl font-extrabold text-bazaar mt-3">سفارش بافت پرچم کشورها و پرتره شخصی</h2>
                <p className="text-stone-600 text-sm mt-2">
                  یکی از مهم‌ترین و سودآورترین بخش‌های تجارت فرش، بافت سفارشی طرح‌های شخصی است. در این کارگاه می‌توانید سفارش بافت پرتره شخصی یا پرچم کشورهای مختلف را پیکربندی کرده و مستقیماً پیش‌نویس قرارداد آن را صادر کنید.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Configuration controls (Left Column) */}
                <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-sm border border-stone-100 space-y-6">
                  <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                    <Sliders className="w-5 h-5 text-lac" />
                    <h3 className="font-bold text-sm text-bazaar">طراحی و پیکربندی سفارش بافت</h3>
                  </div>

                  {/* Weave Type Selector */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-stone-700">نوع سفارش بافت سفارشی:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setWeaveType("portrait")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          weaveType === "portrait"
                            ? "bg-lac/10 border-lac text-lac"
                            : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100"
                        }`}
                      >
                        بافت پرتره و چهره شخصی
                      </button>
                      <button
                        onClick={() => setWeaveType("flag")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          weaveType === "flag"
                            ? "bg-lac/10 border-lac text-lac"
                            : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100"
                        }`}
                      >
                        بافت پرچم ملل و کشورها
                      </button>
                    </div>
                  </div>

                  {/* Dynamic inputs based on weaveType */}
                  {weaveType === "flag" ? (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-stone-700">انتخاب پرچم کشور:</label>
                      <select
                        value={selectedCountryFlag}
                        onChange={(e) => setSelectedCountryFlag(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-lac"
                      >
                        <option>ایران 🇮🇷</option>
                        <option>ایتالیا 🇮🇹</option>
                        <option>کانادا 🇨🇦</option>
                        <option>آلمان 🇩🇪</option>
                        <option>سوئد 🇸🇪</option>
                        <option>فرانسه 🇫🇷</option>
                        <option>ژاپن 🇯🇵</option>
                        <option>امارات متحده عربی 🇦🇪</option>
                      </select>
                      <p className="text-[10px] text-stone-400">بافته شده با رعایت دقیق نسبت رنگ‌ها و بهترین پشم بهاره دباغی شده طبیعی.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-stone-700">آپلود عکس پرتره شخصی شما:</label>
                      <div className="p-4 bg-stone-50 border-2 border-dashed border-stone-200 rounded-2xl text-center">
                        <Upload className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                        <span className="text-xs font-semibold block text-stone-700">تصویر خود را انتخاب کنید</span>
                        <p className="text-[10px] text-stone-400 mt-0.5 mb-2">عکس باکیفیت جهت پیاده‌سازی نقشه موثر</p>
                        <input
                          type="file"
                          accept="image/*"
                          id="portrait-upload-file"
                          onChange={handleSimulatePortraitUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="portrait-upload-file"
                          className="px-3 py-1.5 bg-white border border-stone-300 rounded-xl text-[10px] font-bold hover:border-lac hover:text-lac transition-all cursor-pointer"
                        >
                          آپلود فایل چهره
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Sizes option */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">ابعاد فرش سفارشی:</label>
                    <select
                      value={customWeaveSize}
                      onChange={(e) => setCustomWeaveSize(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-lac"
                    >
                      <option>۵۰ در ۷۰ سانتی‌متر (کوچک رومیزی)</option>
                      <option>۱۰۰ در ۱۵۰ سانتی‌متر (متوسط قاب‌دیواری)</option>
                      <option>۱.۵ در ۲.۲۵ متر (بزرگ ۶ متریچه اعلا)</option>
                    </select>
                  </div>

                  {/* Material Option */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">جنس بافت سفارشی:</label>
                    <select
                      value={customWeaveMaterial}
                      onChange={(e) => setCustomWeaveMaterial(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-lac"
                    >
                      <option>گل‌ابریشم اعلا (۷۰٪ ابریشم، ۳۰٪ پشم مرینوس)</option>
                      <option>کرک اعلا بر روی تار ابریشم</option>
                      <option>تمام ابریشم خالص (۱۰۰٪ ابریشم قم)</option>
                      <option>پشم خالص گوسفند دباغی طبیعی</option>
                    </select>
                  </div>

                  {/* Simulation pricing notice */}
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-150">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-stone-500 font-bold">بهای حدودی سفارش بافت:</span>
                      <span className="text-sm font-extrabold text-lac">{calculateCustomWeavePrice()} تومان</span>
                    </div>
                    <div className="flex justify-between items-center text-xs mt-2">
                      <span className="text-stone-500 font-bold">مدت تخمینی بافت دستبافت:</span>
                      <span className="text-xs font-semibold text-bazaar">
                        {weaveType === "flag" ? "حدود ۲ الی ۳ ماه" : "حدود ۳ الی ۵ ماه با جزئیات چهره"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCustomWeaveStatus("submitted");
                    }}
                    className="w-full bg-lac text-white py-3 rounded-xl font-bold text-xs md:text-sm hover:bg-red-900 transition-all shadow cursor-pointer text-center"
                  >
                    صدور رسمی قرارداد سفارش بافت با دایی مهدی
                  </button>
                </div>

                {/* Simulated Contract & Design Paper (Right Column) */}
                <div className="lg:col-span-7">
                  
                  <div className="bg-[#faf6ef] border-[6px] border-double border-lac/20 rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden text-stone-900 min-h-[500px] flex flex-col justify-between">
                    {/* Corner Ornaments */}
                    <div className="absolute top-2 right-2 w-10 h-10 border-r border-t border-amber-600/30"></div>
                    <div className="absolute top-2 left-2 w-10 h-10 border-l border-t border-amber-600/30"></div>
                    <div className="absolute bottom-2 right-2 w-10 h-10 border-r border-b border-amber-600/30"></div>
                    <div className="absolute bottom-2 left-2 w-10 h-10 border-l border-b border-amber-600/30"></div>

                    <div>
                      {/* Logo header inside card */}
                      <div className="text-center border-b border-amber-600/10 pb-4 mb-6">
                        <div className="text-amber-700 text-xs font-serif tracking-widest">هو الرازق</div>
                        <h3 className="text-lg font-bold text-bazaar">قرارداد تعهد بافت قالی سفارشی فرش‌بازار</h3>
                        <p className="text-[9px] text-stone-400 font-mono mt-0.5">شناسه پیمان: ORD-{Math.floor(200000 + Math.random() * 800000)}</p>
                      </div>

                      {/* Weave Layout Viewport */}
                      <div className="bg-white p-4 rounded-2xl border border-amber-600/10 shadow-sm mb-6 text-center">
                        <span className="text-[10px] text-stone-400 block mb-3">نمای کلی نقشه قالی سفارشی شما:</span>
                        
                        <div className="w-48 h-64 mx-auto border-4 border-amber-600/30 rounded-xl overflow-hidden relative shadow bg-stone-100 flex items-center justify-center">
                          {weaveType === "flag" ? (
                            <div className="w-full h-full flex flex-col justify-between">
                              {/* flag render based on selection */}
                              {selectedCountryFlag.includes("ایران") && (
                                <div className="w-full h-full flex flex-col">
                                  <div className="bg-green-700 h-1/3 w-full"></div>
                                  <div className="bg-white h-1/3 w-full flex items-center justify-center font-bold text-red-600 text-lg">🦁 🇮🇷</div>
                                  <div className="bg-red-600 h-1/3 w-full"></div>
                                </div>
                              )}
                              {selectedCountryFlag.includes("ایتالیا") && (
                                <div className="w-full h-full flex">
                                  <div className="bg-green-700 w-1/3 h-full"></div>
                                  <div className="bg-white w-1/3 h-full"></div>
                                  <div className="bg-red-600 w-1/3 h-full"></div>
                                </div>
                              )}
                              {selectedCountryFlag.includes("کانادا") && (
                                <div className="w-full h-full flex bg-red-600">
                                  <div className="bg-white w-1/2 h-full mx-auto flex items-center justify-center font-bold text-red-600 text-2xl">🍁</div>
                                </div>
                              )}
                              {!selectedCountryFlag.includes("ایران") && !selectedCountryFlag.includes("ایتالیا") && !selectedCountryFlag.includes("کانادا") && (
                                <div className="w-full h-full flex flex-col justify-center items-center bg-amber-500/10">
                                  <Flag className="w-12 h-12 text-amber-700 mb-2" />
                                  <span className="text-xs font-bold text-bazaar">{selectedCountryFlag}</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-4">
                              {portraitPreviewUrl ? (
                                <img src={portraitPreviewUrl} alt="پیش‌نمایش پرتره" className="w-full h-full object-cover" />
                              ) : (
                                <>
                                  <User className="w-16 h-16 text-stone-300 mb-2" />
                                  <span className="text-[10px] text-stone-400 font-bold px-4 text-center leading-relaxed">
                                    عکسی انتخاب نکرده‌اید. بافنده چهره شما را ذهنی یا فرضی نقشه می‌کشد!
                                  </span>
                                </>
                              )}
                            </div>
                          )}

                          {/* Overlaying transparent carpet patterns to make it feel like woven rug */}
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/15 pointer-events-none"></div>
                          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:3px_3px] pointer-events-none"></div>
                        </div>

                        <div className="text-[10px] text-stone-500 mt-2 font-mono">
                          پیش‌نمایش پیکسل‌بافت (کارت نقشه بافندگی {weaveType === "flag" ? "پرچم" : "پرتره"})
                        </div>
                      </div>

                      {/* Specifications Summary */}
                      <div className="grid grid-cols-2 gap-4 mb-6 text-xs text-stone-700 bg-white p-4 rounded-2xl border border-stone-200/60">
                        <div>
                          <span className="block text-[10px] text-stone-400">سبک بافت:</span>
                          <strong>{weaveType === "flag" ? `بافت هندسی پرچم ${selectedCountryFlag}` : "پرتره رئالیسم چهره شخصی"}</strong>
                        </div>
                        <div>
                          <span className="block text-[10px] text-stone-400">جنس خامه اعلا:</span>
                          <strong>{customWeaveMaterial}</strong>
                        </div>
                        <div>
                          <span className="block text-[10px] text-stone-400">ابعاد دقیق:</span>
                          <strong>{customWeaveSize}</strong>
                        </div>
                        <div>
                          <span className="block text-[10px] text-stone-400">بهای نهایی قرارداد:</span>
                          <strong className="text-lac">{calculateCustomWeavePrice()} تومان</strong>
                        </div>
                      </div>

                      {/* Contract status overlay */}
                      {customWeaveStatus === "submitted" && (
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="bg-emerald-500/10 border-2 border-emerald-500 text-emerald-900 p-4 rounded-xl text-center flex items-center justify-center gap-2 mb-4"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <div className="text-right">
                            <span className="block font-bold text-xs">سفارش شما با موفقیت در صف کارگاه دایی مهدی قرار گرفت!</span>
                            <span className="block text-[10px] text-stone-600 mt-0.5">کارشناسان جهت تطبیق تصویر پرتره و بیعانه اولیه تماس خواهند گرفت.</span>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Official Stamp Footer */}
                    <div className="flex items-center justify-between border-t border-amber-600/10 pt-4 mt-4 text-xs text-stone-500">
                      <div>
                        <span>تاریخ صدور سند: {new Date().toLocaleDateString("fa-IR")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif italic font-semibold text-lac">تعهد کارگاه دایی مهدی</span>
                        <div className="w-10 h-10 rounded-full border border-lac/40 flex items-center justify-center font-bold text-[8px] text-lac uppercase rotate-6 bg-white shadow-sm">
                          Daei Mehdi
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 4: TRADITIONAL DYEING & COLOR SIMULATOR */}
          {activeSection === "dyeSimulator" && (
            <motion.div
              key="dye-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-extrabold text-bazaar">شبیه‌ساز سنتی رنگرزی گیاهی (پاتیل رنگ)</h2>
                <p className="text-stone-600 text-sm mt-2">
                  رنگ فرش ایرانی از دل طبیعت بیرون می‌آید. روی هر یک از مواد اولیه گیاهی زیر کلیک کنید تا راز رنگین شدن خامه‌های پشمی را در ادبیات و هنر ایران کشف کنید.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Right Interactive Selection Column */}
                <div className="lg:col-span-4 flex flex-col gap-3">
                  <h3 className="font-bold text-xs text-stone-500 uppercase tracking-wider mb-2">مواد اولیه سنتی در پاتیل رنگرزی:</h3>
                  {DYE_MATERIALS.map((dye) => (
                    <button
                      key={dye.id}
                      onClick={() => setSelectedDye(dye)}
                      className={`p-4 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                        selectedDye.id === dye.id
                          ? "bg-white border-lac shadow-md ring-1 ring-lac"
                          : "bg-white border-stone-200/60 hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-xl ${dye.colorClass} shadow-inner shrink-0`}></span>
                        <div>
                          <span className="font-bold text-xs md:text-sm text-stone-800">{dye.name}</span>
                          <span className="block text-[10px] text-stone-400 mt-0.5">{dye.source}</span>
                        </div>
                      </div>
                      <ChevronLeft className="w-4 h-4 text-stone-400" />
                    </button>
                  ))}
                </div>

                {/* Left Live Preview & Poetic Story Column */}
                <div className="lg:col-span-8 bg-white rounded-3xl border border-amber-100 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Decorative Carpet Medallion that colors dynamically based on selected dye */}
                  <div className="absolute -left-20 -bottom-20 w-80 h-80 opacity-10 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-lac">
                      <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
                    </svg>
                  </div>

                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-3">
                      <span className={`w-12 h-12 rounded-2xl ${selectedDye.colorClass} shadow-md`}></span>
                      <div>
                        <span className="text-xs font-bold text-stone-400">خامه پشمی رنگ شده با:</span>
                        <h3 className={`text-xl font-extrabold ${selectedDye.textCol}`}>{selectedDye.name}</h3>
                      </div>
                    </div>

                    {/* Poetry block */}
                    <div className="bg-[#fcfaf5] border-r-4 border-amber-600/60 p-4 rounded-xl italic text-xs md:text-sm text-stone-700 leading-relaxed font-serif text-center py-6">
                      {selectedDye.poetry}
                    </div>

                    {/* Description of natural dyeing process */}
                    <div>
                      <h4 className="font-bold text-xs text-stone-700 mb-2">فرآیند کهن و راز این رنگ:</h4>
                      <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                        {selectedDye.desc}
                      </p>
                    </div>

                    {/* Interactive Loom Dye Showcase */}
                    <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/50">
                      <span className="text-[10px] font-bold text-stone-500 block mb-2">پیش‌نمایش زنده خامه رنگ‌شده در تار و پود دار قالی:</span>
                      
                      <div className="flex items-center gap-2 overflow-hidden h-16 rounded-xl">
                        {[...Array(12)].map((_, i) => (
                          <div 
                            key={i} 
                            style={{ opacity: 1 - (i * 0.05) }}
                            className={`w-full h-full rounded-md shadow-inner transition-colors duration-500 ${
                              i % 2 === 0 ? selectedDye.colorClass : "bg-[#ece4d0]"
                            }`}
                          ></div>
                        ))}
                      </div>
                      <div className="flex justify-between text-[9px] text-stone-400 mt-1">
                        <span>خامه پشمی رنگ شده با عصاره {selectedDye.source}</span>
                        <span>تار سفید پنبه‌ای دار قالی</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      <span>ثبات رنگ سنتی: ۱۰۰٪ مادام‌العمر در برابر نور خورشید</span>
                    </span>
                    <span className="font-serif">فرش بازار | احیاگر اصالت رنگ</span>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 4.5: PREMIUM HANDICRAFTS EXHIBITION & GLOBAL AUCTION HOUSE COOPERATION */}
          {activeSection === "handicrafts" && (
            <motion.div
              key="handicrafts-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-10"
            >
              {/* Header Intro */}
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-800 text-xs font-bold">
                  نمایشگاه فاخر صنایع‌دستی، هنرهای تجسمی و فلزکاری خاندان حاج حسین علی میری و پسران
                </span>
                <h2 className="text-3xl font-extrabold text-bazaar">نمایشگاه صنایع‌دستی فاخر و پیشخوان حراج‌های جهانی</h2>
                <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                  تجارت خانوادگی ما تنها به تار و پود قالی خلاصه نمی‌شود. روح نقوش ایرانی در قالب قالی‌بافی اصیل، سوزن‌دوزی‌های مینیاتور کویر، تابلوفرش‌های ابریشمی، نقاشی‌های ذغال و سیاه‌قلم، و ظروف نقره‌کوب آنتیک جاری است. در این پیشخوان ضمن بازدید از شاهکارهای اصیل، بستر همکاری با حراج‌های تراز اول بین‌المللی چون ساتبیز و کریستیز برقرار گردیده است.
                </p>
              </div>

              {/* Showcase Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    id: "weaving",
                    name: "مجموعه ابزار و تاروپود قالی‌بافی سنتی",
                    category: "قالی‌بافی و دفتین‌زنی",
                    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80",
                    craftsman: "استاد اصغر میری",
                    desc: "چله‌کشی ابریشم با تراکم فوق‌العاده بالا به همراه ابزارآلات اصیل سنتی (دفتین چدنی، چاقوی ترکی‌بافت و سیخ پودکشی). مظهر رنج ممتد سرانگشتان.",
                    certifiedValue: "۶۵,۰۰۰,۰۰۰ تومان",
                    timeRequired: "طراحی و چله‌کشی در مدت ۹ ماه"
                  },
                  {
                    id: "needlework",
                    name: "شال سوزن‌دوزی فاخر بلوچی (نقش مهر و ماه)",
                    category: "سوزن‌دوزی و رودوزی سنتی",
                    image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=600&q=80",
                    craftsman: "بانو مریم میری",
                    desc: "سوزن‌دوزی خیره‌کننده بر روی پارچه‌های ابریشمی دستباف با رنگ‌های صددرصد گیاهی. مملو از اسطوره‌ها و نقوش انتزاعی دشت‌های سوزان کویر.",
                    certifiedValue: "۱۸,۰۰۰,۰۰۰ تومان",
                    timeRequired: "۲ ماه کار مداوم و ظریف دستی"
                  },
                  {
                    id: "tapestry",
                    name: "تابلوفرش ابریشمی مینیاتور «راز هستی»",
                    category: "تابلوفرش ابریشمی شاهکار",
                    image: "/src/assets/images/isfahan_carpet_1783498694196.jpg",
                    craftsman: "کارگاه ابریشم‌بافی خاندان حاج حسین علی میری و پسران",
                    desc: "بافته شده با رج‌شمار ۸۵ در ابعاد ۸۰ در ۶۰ سانتی‌متر. استفاده از ۷۵ درصد نخ ابریشم خالص طبیعی و رنگرزی گیاهی فوق‌العاده رویایی.",
                    certifiedValue: "۱۲۰,۰۰۰,۰۰۰ تومان",
                    timeRequired: "۱۴ ماه بافت ممتد با گره‌های مینیاتوری ترکی"
                  },
                  {
                    id: "charcoal",
                    name: "نقاشی سیاه‌قلم سنتی «رخ بافنده کهنسال»",
                    category: "طراحی ذغال و سیاه‌قلم سنتی",
                    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80",
                    craftsman: "مهندس سیاوش میری",
                    desc: "طراحی حیرت‌انگیز با زغال طبیعی و پودر کنته روی کاغذ بافت‌دار دست‌ساز، تجسم عمیق چروک دستان یک بافنده کهنسال بر روی تار قالی.",
                    certifiedValue: "۱۲,۰۰۰,۰۰۰ تومان",
                    timeRequired: "۴ هفته کار مینیاتور و سایه‌زنی سنتی"
                  },
                  {
                    id: "silver",
                    name: "گلدان نقره‌کوب سلطنتی با چکش‌زنی برجسته",
                    category: "ظروف نقره‌کوب و ملیله آنتیک",
                    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80",
                    craftsman: "کارگاه زرگری صنف نقره‌کوب بزرگ تهران",
                    desc: "گلدان آنتیک دست‌ساز کوبیده شده با نقره عیار ۹۲۵ خالص، تزئین شده با پیچک‌های اسلیمی قلم‌زنی و شبکه‌های ظریف ملیله‌کاری فاخر.",
                    certifiedValue: "۸۵,۰۰۰,۰۰۰ تومان",
                    timeRequired: "۴ ماه چکش‌زنی ممتد صنف زرگری"
                  }
                ].map((item) => (
                  <div key={item.id} className="bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
                    <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-3 right-3 bg-bazaar text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-extrabold text-sm text-bazaar group-hover:text-lac transition-colors leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-[11px] text-[#806c55] font-semibold">
                          اثر هنرمند گرانسنگ: {item.craftsman}
                        </p>
                        <p className="text-xs text-stone-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-stone-100">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-stone-400">ارزش کارشناسی شده عیار:</span>
                          <span className="font-bold text-amber-700">{item.certifiedValue}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-stone-400">زمان ساخت و تکوین:</span>
                          <span className="text-stone-600">{item.timeRequired}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Auction Metropole Section */}
              <div className="bg-gradient-to-br from-[#FAF6F0] to-[#F3ECE0] p-6 md:p-8 rounded-3xl border border-amber-200/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4 text-right" dir="rtl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-600 text-white text-[10px] font-bold rounded-full">
                    <span>همکاری مستقیم هولدینگ FP New Meta با کریستیز و ساتبیز</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-bazaar leading-snug">
                    درخواست ورود به حراج بین‌المللی و کارشناسی دیجیتال
                  </h3>
                  <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                    چنانچه اثری آنتیک، قالی موروثی بالای ۵۰ سال قدمت، یا شاهکار هنری نفیس در اختیار دارید، می‌توانید با واریز تعرفه کارشناسی رسمی، شناسنامه بین‌المللی هولوگرام‌دار صادر نموده و درخواست ارجاع مستقیم به نمایندگان کریستیز و ساتبیز لندن و دبی را ثبت نمایید.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0">۱</span>
                      <p className="text-[11px] text-stone-500 leading-relaxed">تکمیل فرم جزییات اثر و ارسال تصاویر HD تاروپود و مهر بافت.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0">۲</span>
                      <p className="text-[11px] text-stone-500 leading-relaxed">تایید کارشناسان ارشد خاندان میری و پیش‌نمایش در بستر شهر آفرینا.</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-right" dir="rtl">
                  <h4 className="font-bold text-xs md:text-sm text-bazaar mb-3">شبیه‌ساز پیش‌ثبت‌نام حراج جهانی</h4>
                  
                  {auctionSubmitSuccess ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6 space-y-2">
                      <span className="text-2xl">🎉</span>
                      <h5 className="font-bold text-xs text-emerald-800">درخواست شما با موفقیت ثبت شد!</h5>
                      <p className="text-[10px] text-stone-500 leading-relaxed">
                        پرونده اثر ارزشمند شما به نمایندگی خاورمیانه ساتبیز ارسال گردید. همکاران گالری خاندان حاج حسین علی میری و پسران به زودی جهت هماهنگی با شما تماس خواهند گرفت.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-500/10 text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-stone-500">تعرفه کارشناسی و صدور هولوگرام:</span>
                          <span className="font-bold text-amber-800">۲۵۰,۰۰۰ تومان</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-stone-400">
                          <span>درگاه پرداخت شبیه‌سازی شده بازار:</span>
                          <span>بانک ملی ایران</span>
                        </div>
                      </div>

                      {!appraisalFeePaid ? (
                        <button
                          onClick={() => {
                            setIsPayingFee(true);
                            setTimeout(() => {
                              setAppraisalFeePaid(true);
                              setIsPayingFee(false);
                            }, 1200);
                          }}
                          disabled={isPayingFee}
                          className="w-full bg-bazaar hover:bg-stone-800 text-white py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {isPayingFee ? (
                            <span>در حال اتصال به درگاه بانک...</span>
                          ) : (
                            <span>پرداخت تعرفه کارشناسی و فعال‌سازی ثبت حراج</span>
                          )}
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <div className="text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 text-[11px] font-bold text-center">
                            ✓ پرداخت تعرفه با موفقیت انجام شد. کد تایید: TR-9034-M
                          </div>
                          
                          <button
                            onClick={() => {
                              setIsSubmittingAuction(true);
                              setTimeout(() => {
                                setAuctionSubmitSuccess(true);
                                setIsSubmittingAuction(false);
                              }, 1500);
                            }}
                            disabled={isSubmittingAuction}
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {isSubmittingAuction ? (
                              <span>ارسال مستندات به کریستیز لندن...</span>
                            ) : (
                              <span>ارسال رسمی پرونده اثر به کارگزار حراجی</span>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 8: MACHINE CARPET & FACTORIES PAVILION */}
          {activeSection === "machineCarpet" && (
            <motion.div
              key="machine-carpet-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-8"
            >
              {/* Header Showcase */}
              <div className="bg-gradient-to-r from-bazaar via-stone-800 to-bazaar text-white p-6 md:p-10 rounded-3xl border border-amber-600/20 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none rounded-full"></div>
                <div className="relative z-10 max-w-3xl space-y-3">
                  <span className="px-3 py-1 bg-amber-500 text-bazaar text-[10px] font-bold rounded-full uppercase tracking-wider">
                    پاویون مدرن صنایع نساجی صنعتی و کارخانجات جهان
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white">پیکربندی غرفه‌ها و بستر همکاری کارخانجات فرش ماشینی</h2>
                  <p className="text-stone-300 text-xs md:text-sm leading-relaxed">
                    فرش‌بازار در گام دوم تحول دیجیتال خود با افتخار مرزهای سنتی را درنوردیده و بستر همکاری تجاری، تبلیغاتی و غرفه‌سازی ویژه بزرگ‌ترین و مدرن‌ترین <strong>کارخانه‌های بافندگی فرش ماشینی ایران و سراسر جهان</strong> را فراهم ساخته است. ما معتقدیم تلفیق تکنولوژی صنعتی و طرح‌های اصیل ایرانی، رزق‌آور و زمینه‌ساز شکوفایی صادراتی بی‌سابقه خواهد بود.
                  </p>
                </div>
              </div>

              {/* Grid: Booth Interactive Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Right: Booth selection and brand cards */}
                <div className="lg:col-span-4 space-y-4">
                  <h3 className="font-bold text-bazaar text-xs md:text-sm border-r-4 border-lac pr-2.5">
                    غرفه‌های فعال کارخانجات برتر در نیومتاورس
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      {
                        id: "suleiman",
                        name: "فرش سلیمان کاشان",
                        badge: "۱۵۰۰ شانه - سلطنتی",
                        desc: "بزرگ‌ترین مجتمع بافندگی کلاسیک و مینیاتوری",
                        logoBg: "bg-amber-500/10 text-amber-600",
                      },
                      {
                        id: "mohtasham",
                        name: "فرش ستاره محتشم کاشان",
                        badge: "۱۲۰۰ شانه - مدرن و وینتیج",
                        desc: "پیشتاز در نوآوری، رنگ‌آمیزی جسورانه و طرح‌های پتینه",
                        logoBg: "bg-lac/10 text-lac",
                      },
                      {
                        id: "gheitran",
                        name: "فرش قیطران جهانی",
                        badge: "۱۵۰۰ شانه - های‌بالک آکریلیک",
                        desc: "دارای استاندارد کیفیت صادرات به اروپا و کانادا",
                        logoBg: "bg-firoozeh/10 text-firoozeh",
                      },
                      {
                        id: "caspian",
                        name: "صنایع بافندگی کاسپین مدرن",
                        badge: "۷۰۰ و ۱۲۰۰ شانه - اقتصادی جهانی",
                        desc: "بافته شده با برترین الیاف بدون پرز هیت‌ست آلمان",
                        logoBg: "bg-stone-500/10 text-stone-600",
                      }
                    ].map((booth) => {
                      const isActive = selectedFactoryBooth === booth.id;
                      return (
                        <button
                          key={booth.id}
                          onClick={() => setSelectedFactoryBooth(booth.id)}
                          className={`w-full p-4 rounded-2xl border text-right transition-all duration-300 ${
                            isActive
                              ? "bg-white border-amber-500 shadow-md ring-2 ring-amber-500/20"
                              : "bg-white/60 border-stone-150 hover:bg-stone-50"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-xs text-stone-900">{booth.name}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${booth.logoBg}`}>
                              {booth.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-stone-500 mt-1 leading-relaxed">{booth.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Left: Selected Booth Details & Catalogs */}
                <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-stone-150 shadow-sm space-y-6">
                  {selectedFactoryBooth === "suleiman" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                        <div>
                          <h4 className="font-bold text-bazaar text-sm">غرفه رسمی: مجتمع صنایع فرش سلیمان کاشان</h4>
                          <p className="text-[10px] text-stone-500 mt-0.5">ثبت رسمی در فاز هوشمند قلمرو آفرینا</p>
                        </div>
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-lg">شمار غرفه: ۱۰۰۴-A</span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-center">
                          <span className="block text-[10px] text-stone-400">تکنولوژی بافت</span>
                          <span className="block text-xs font-bold text-stone-800 mt-0.5">Vandewiele بلژیک</span>
                        </div>
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-center">
                          <span className="block text-[10px] text-stone-400">تراکم تولیدی</span>
                          <span className="block text-xs font-bold text-stone-800 mt-0.5">۱۵۰۰ شانه (تراکم ۴۵۰۰)</span>
                        </div>
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-center">
                          <span className="block text-[10px] text-stone-400">جنس نخ تاروپود</span>
                          <span className="block text-xs font-bold text-stone-800 mt-0.5">آکریلیک بایر آلمان</span>
                        </div>
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-center">
                          <span className="block text-[10px] text-stone-400">ظرفیت صادرات</span>
                          <span className="block text-xs font-bold text-stone-800 mt-0.5">۱۲۰,۰۰۰ مترمربع سالانه</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-bold text-stone-700 block">برترین آثار و کاتالوگ صادراتی کارخانه:</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100 flex gap-3">
                            <div className="w-16 h-16 bg-stone-200 rounded-xl overflow-hidden flex-shrink-0">
                              <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex flex-col justify-between">
                              <span className="font-bold text-xs text-stone-800">نقش «بهشت برین» طلاکوب</span>
                              <span className="text-[10px] text-stone-500">۱۵۰۰ شانه برجسته ابریشم‌گونه</span>
                              <span className="text-[10px] text-amber-700 font-bold">قیمت نمایندگی: ۲۲,۰۰۰,۰۰۰ تومان</span>
                            </div>
                          </div>
                          <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100 flex gap-3">
                            <div className="w-16 h-16 bg-stone-200 rounded-xl overflow-hidden flex-shrink-0">
                              <img src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex flex-col justify-between">
                              <span className="font-bold text-xs text-stone-800">شاه عباسی سرمه‌ای اعلا</span>
                              <span className="text-[10px] text-stone-500">طرح سلطنتی موروثی ممتاز</span>
                              <span className="text-[10px] text-amber-700 font-bold">قیمت نمایندگی: ۱۹,۵۰۰,۰۰۰ تومان</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {selectedFactoryBooth === "mohtasham" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                        <div>
                          <h4 className="font-bold text-bazaar text-sm">غرفه رسمی: کارخانجات بافندگی مدرن ستاره محتشم کاشان</h4>
                          <p className="text-[10px] text-stone-500 mt-0.5">ثبت رسمی در فاز هوشمند قلمرو آفرینا</p>
                        </div>
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-lg">شمار غرفه: ۱۰۰۹-A</span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-center">
                          <span className="block text-[10px] text-stone-400">تکنولوژی بافت</span>
                          <span className="block text-xs font-bold text-stone-800 mt-0.5">Schonherr آلمان</span>
                        </div>
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-center">
                          <span className="block text-[10px] text-stone-400">تراکم تولیدی</span>
                          <span className="block text-xs font-bold text-stone-800 mt-0.5">۱۲۰۰ شانه (تراکم ۳۶۰۰)</span>
                        </div>
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-center">
                          <span className="block text-[10px] text-stone-400">نوع رنگ‌آمیزی</span>
                          <span className="block text-xs font-bold text-stone-800 mt-0.5">دیجیتال و پتینه مدرن</span>
                        </div>
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-center">
                          <span className="block text-[10px] text-stone-400">حوزه صادراتی</span>
                          <span className="block text-xs font-bold text-stone-800 mt-0.5">خاورمیانه، دبی، ترکیه</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-bold text-stone-700 block">برترین آثار و کاتالوگ صادراتی کارخانه:</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100 flex gap-3">
                            <div className="w-16 h-16 bg-stone-200 rounded-xl overflow-hidden flex-shrink-0">
                              <img src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex flex-col justify-between">
                              <span className="font-bold text-xs text-stone-800">طرح «پتینه لاکی غبارآلود»</span>
                              <span className="text-[10px] text-stone-500">۱۲۰۰ شانه کلکسیون وینتیج اصیل</span>
                              <span className="text-[10px] text-amber-700 font-bold">قیمت نمایندگی: ۱۶,۲۰۰,۰۰۰ تومان</span>
                            </div>
                          </div>
                          <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100 flex gap-3">
                            <div className="w-16 h-16 bg-stone-200 rounded-xl overflow-hidden flex-shrink-0">
                              <img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex flex-col justify-between">
                              <span className="font-bold text-xs text-stone-800">مدرن خطی طوسی نقره‌ای</span>
                              <span className="text-[10px] text-stone-500">تراکم ۳۶۰۰، بافت نرم بامبو</span>
                              <span className="text-[10px] text-amber-700 font-bold">قیمت نمایندگی: ۱۵,۸۰۰,۰۰۰ تومان</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {selectedFactoryBooth === "gheitran" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                        <div>
                          <h4 className="font-bold text-bazaar text-sm">غرفه رسمی: صنایع نساجی فرش قیطران کاشان</h4>
                          <p className="text-[10px] text-stone-500 mt-0.5">ثبت رسمی در فاز هوشمند قلمرو آفرینا</p>
                        </div>
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-lg">شمار غرفه: ۱۰۱۲-A</span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-center">
                          <span className="block text-[10px] text-stone-400">تکنولوژی بافت</span>
                          <span className="block text-xs font-bold text-stone-800 mt-0.5">Vandewiele بلژیک</span>
                        </div>
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-center">
                          <span className="block text-[10px] text-stone-400">تراکم تولیدی</span>
                          <span className="block text-xs font-bold text-stone-800 mt-0.5">۱۵۰۰ شانه برجسته (تراکم ۴۶۰۰)</span>
                        </div>
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-center">
                          <span className="block text-[10px] text-stone-400">جنس خامه فرش</span>
                          <span className="block text-xs font-bold text-stone-800 mt-0.5">۱۰۰٪ اکریلیک میکرو</span>
                        </div>
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-center">
                          <span className="block text-[10px] text-stone-400">بخش صادراتی</span>
                          <span className="block text-xs font-bold text-stone-800 mt-0.5">اروپا، آسیای میانه و اقیانوسیه</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-bold text-stone-700 block">برترین آثار و کاتالوگ صادراتی کارخانه:</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100 flex gap-3">
                            <div className="w-16 h-16 bg-stone-200 rounded-xl overflow-hidden flex-shrink-0">
                              <img src="/src/assets/images/tabriz_carpet_1783498665368.jpg" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex flex-col justify-between">
                              <span className="font-bold text-xs text-stone-800">نقش گل برجسته «افشان هرات»</span>
                              <span className="text-[10px] text-stone-500">۱۵۰۰ شانه طلاکوب شده ممتاز</span>
                              <span className="text-[10px] text-amber-700 font-bold">قیمت نمایندگی: ۲۴,۰۰۰,۰۰۰ تومان</span>
                            </div>
                          </div>
                          <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100 flex gap-3">
                            <div className="w-16 h-16 bg-stone-200 rounded-xl overflow-hidden flex-shrink-0">
                              <img src="/src/assets/images/isfahan_carpet_1783498694196.jpg" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex flex-col justify-between">
                              <span className="font-bold text-xs text-stone-800">اسلیمی ترنج سنتی سورمه‌ای</span>
                              <span className="text-[10px] text-stone-500">تکنولوژی میکرو فیلامنت بافت بسیار ظریف</span>
                              <span className="text-[10px] text-amber-700 font-bold">قیمت نمایندگی: ۲۱,۲۰۰,۰۰۰ تومان</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {selectedFactoryBooth === "caspian" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                        <div>
                          <h4 className="font-bold text-bazaar text-sm">غرفه رسمی: صنایع ریسندگی و بافندگی مدرن کاسپین</h4>
                          <p className="text-[10px] text-stone-500 mt-0.5">ثبت رسمی در فاز هوشمند قلمرو آفرینا</p>
                        </div>
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-lg">شمار غرفه: ۱۰۱۸-A</span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-center">
                          <span className="block text-[10px] text-stone-400">تکنولوژی بافت</span>
                          <span className="block text-xs font-bold text-stone-800 mt-0.5">Vandewiele بلژیک</span>
                        </div>
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-center">
                          <span className="block text-[10px] text-stone-400">تراکم تولیدی</span>
                          <span className="block text-xs font-bold text-stone-800 mt-0.5">۷۰۰ و ۱۲۰۰ شانه</span>
                        </div>
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-center">
                          <span className="block text-[10px] text-stone-400">ویژگی برجسته</span>
                          <span className="block text-xs font-bold text-stone-800 mt-0.5">مقاومت بالا و قیمت رقابتی اقتصادی</span>
                        </div>
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-center">
                          <span className="block text-[10px] text-stone-400">بخش توزیع</span>
                          <span className="block text-xs font-bold text-stone-800 mt-0.5">صادرات کانتینری به سراسر دنیا</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-bold text-stone-700 block">برترین آثار و کاتالوگ صادراتی کارخانه:</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100 flex gap-3">
                            <div className="w-16 h-16 bg-stone-200 rounded-xl overflow-hidden flex-shrink-0">
                              <img src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex flex-col justify-between">
                              <span className="font-bold text-xs text-stone-800">طرح شنل مدرن فیروزه‌ای</span>
                              <span className="text-[10px] text-stone-500">۷۰۰ شانه تراکم ۲۵۵۰ نخ پنبه‌ای نرم</span>
                              <span className="text-[10px] text-amber-700 font-bold">قیمت نمایندگی: ۹,۸۰۰,۰۰۰ تومان</span>
                            </div>
                          </div>
                          <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100 flex gap-3">
                            <div className="w-16 h-16 bg-stone-200 rounded-xl overflow-hidden flex-shrink-0">
                              <img src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex flex-col justify-between">
                              <span className="font-bold text-xs text-stone-800">خشتی فیروزه‌ای قابی</span>
                              <span className="text-[10px] text-stone-500">۱۲۰۰ شانه با تراکم طلایی ۳۶۰۰</span>
                              <span className="text-[10px] text-amber-700 font-bold">قیمت نمایندگی: ۱۴,۵۰۰,۰۰۰ تومان</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="bg-amber-500/5 p-4 rounded-2xl border border-amber-500/10 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-stone-700 leading-relaxed">
                    <div>
                      <strong>تسهیلات ویژه غرفه‌داران فرش ماشینی:</strong> کلیه برندها و کارخانجات فعال در حوزه تولید و پخش سراسری فرش ماشینی می‌توانند غرفه اختصاصی ۳ بعدی خود را در شهر هوشمند <strong className="text-amber-800">توانا</strong> متصل به فاز جدید <strong className="text-amber-800">FP New Meta</strong> فعال‌سازی نموده و از خریداران بین‌المللی سفارش پیش‌خرید کانتینری دریافت نمایند.
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const formElem = document.getElementById("factory-form");
                        if (formElem) {
                          formElem.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="text-[10px] font-bold bg-amber-600 text-white px-3 py-1.5 rounded-xl whitespace-nowrap self-start md:self-auto cursor-pointer hover:bg-amber-700 transition-colors"
                    >
                      ثبت‌نام غرفه و کارخانه ↙
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Section: Factory Registration and Ads Booth Setup */}
              <div id="factory-form" className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-3xl border border-stone-150 shadow-sm space-y-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Factory className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-bazaar">درخواست رسمی ثبت کارخانه بافندگی و اختصاص غرفه صنعتی</h3>
                  <p className="text-stone-500 text-xs mt-1 max-w-md mx-auto leading-relaxed">
                    اگر مدیر عامل، مدیر بازرگانی یا نماینده رسمی کارخانه‌های ریسندگی و بافندگی فرش ماشینی در ایران و سراسر جهان هستید، با تکمیل این فرم غرفه تعاملی برند خود را در فرش‌بازار و هماهنگی کلان شهر توانا فعال کنید.
                  </p>
                </div>

                {machineFactorySuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center text-emerald-800"
                  >
                    <h4 className="font-bold text-lg mb-2">پرونده برند و غرفه صنعتی شما با موفقیت ثبت اولیه شد!</h4>
                    <p className="text-xs leading-relaxed max-w-md mx-auto">
                      بخش بازرگانی فرش‌بازار تحت نظارت مستقیم دایی مهدی و هماهنگ‌کننده‌های هولدینگ <strong className="text-emerald-950">FP New Meta & شهر توانا</strong> ظرف ۱۲ ساعت آینده با شما تماس خواهند گرفت تا جزییات غرفه، تبلیغات چندرسانه‌ای و قرارگیری در کاتالوگ ۱۴ زبانه سیستم صادرکنندگان را مکتوب فرمایند.
                    </p>
                    <div className="mt-4 inline-block bg-emerald-100 text-emerald-900 font-mono text-[10px] px-3 py-1 rounded-full">
                      کد رزرو اختصاصی: MC-LOOM-2026-99
                    </div>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setMachineFactorySuccess(true);
                    }}
                    className="space-y-4 text-right"
                    dir="rtl"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">نام دقیق کارخانه / مجتمع نساجی:</label>
                        <input
                          type="text"
                          required
                          value={machineFactoryName}
                          onChange={(e) => setMachineFactoryName(e.target.value)}
                          placeholder="مثال: ریسندگی و بافندگی فرش محتشم کاشان"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">عنوان برند تجاری شناخته شده:</label>
                        <input
                          type="text"
                          required
                          value={machineFactoryBrand}
                          onChange={(e) => setMachineFactoryBrand(e.target.value)}
                          placeholder="مثال: برند طلایی فرش ستاره محتشم"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">کشور، شهر یا منطقه استقرار کارخانه:</label>
                        <input
                          type="text"
                          required
                          value={machineFactoryCity}
                          onChange={(e) => setMachineFactoryCity(e.target.value)}
                          placeholder="مثال: ایران، شهرک صنعتی راوند کاشان"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">نوع ماشین‌آلات اصلی بافت:</label>
                        <select
                          value={machineFactoryLoom}
                          onChange={(e) => setMachineFactoryLoom(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                        >
                          <option value="Vandewiele HCPX2 (بلژیک)">Vandewiele HCPX2 (بلژیک)</option>
                          <option value="Vandewiele RCI (بلژیک)">Vandewiele RCI (بلژیک)</option>
                          <option value="Schonherr Alpha (آلمان)">Schonherr Alpha (آلمان)</option>
                          <option value="تکنولوژی های‌تک تلفیقی آسیایی">تکنولوژی های‌تک تلفیقی آسیایی</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">تراکم و شانه تولیدات اصلی:</label>
                        <select
                          value={machineFactoryDensity}
                          onChange={(e) => setMachineFactoryDensity(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                        >
                          <option value="۱۵۰۰ شانه (تراکم ۴۵۰۰)">۱۵۰۰ شانه (تراکم ۴۵۰۰) ممتاز</option>
                          <option value="۱۲۰۰ شانه (تراکم ۳۶۰۰) لوکس">۱۲۰۰ شانه (تراکم ۳۶۰۰) لوکس</option>
                          <option value="۷۰۰ شانه (تراکم ۲۵۵۰) اقتصادی">۷۰۰ شانه (تراکم ۲۵۵۰) اقتصادی</option>
                          <option value="سایر تراکم‌های گوبلنی و فانتزی">سایر تراکم‌های گوبلنی و فانتزی</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">تلفن مستقیم بخش بازرگانی / هماهنگی کارخانه:</label>
                        <input
                          type="tel"
                          required
                          value={machineFactoryPhone}
                          onChange={(e) => setMachineFactoryPhone(e.target.value)}
                          placeholder="مثال: ۰۳۱۵۵۵۴۴۳۳"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 text-left font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">هدف اصلی از عضویت در پاویون صنعتی:</label>
                        <select
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                        >
                          <option value="booth">ایجاد غرفه تعاملی سه بعدی تبلیغاتی در شهر توانا</option>
                          <option value="export">همکاری صادراتی و حضور در کاتالوگ ۱۴ زبانه دایی مهدی</option>
                          <option value="b2b">جذب سفارشات عمده فروشی و کانتینری بین‌المللی</option>
                          <option value="all">کلیه موارد و پیوستن کامل به اکوسیستم FP New Meta</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-amber-500/5 rounded-xl border border-amber-500/10">
                      <input
                        type="checkbox"
                        required
                        id="factory-agreement"
                        className="mt-1 accent-amber-600"
                      />
                      <label htmlFor="factory-agreement" className="text-[11px] text-stone-600 leading-relaxed">
                        صحت اطلاعات درج شده فوق و حق استفاده از برند تجاری ثبت شده جهت معرفی غرفه صنعتی در این پلتفرم متصل به شهر توانا را تعهد می‌نماییم.
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-xl font-bold text-xs md:text-sm hover:from-amber-700 hover:to-amber-800 transition-all shadow-all cursor-pointer"
                    >
                      ثبت پرونده برند و درخواست رزرو غرفه صنعتی در شهر توانا
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}



          {/* TAB 5: GALLERY OF EXQUISITE Persian Carpets */}
          {activeSection === "gallery" && (
            <motion.div
              key="gallery-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-extrabold text-bazaar">مجموعه نفیس و اصیل فرش بازار</h2>
                <p className="text-stone-600 text-sm mt-2">
                  فرش‌های دستباف گنجینه‌هایی زنده هستند. هر یک از آثار زیر دارای نقشه، بافت متمایز و شناسنامه تاریخی منحصربه‌فردی است.
                </p>
              </div>

              {/* Grid of Rugs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {CARPET_GALLERY.map((carpet, idx) => (
                  <div 
                    key={carpet.id}
                    className="bg-white rounded-2xl overflow-hidden border border-amber-100 shadow-sm hover:shadow-md transition-all flex flex-col group"
                  >
                    {/* Visual aspect preview */}
                    <div className="relative aspect-square overflow-hidden bg-stone-100">
                      <img 
                        src={carpet.image} 
                        alt={carpet.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 right-2 bg-lac text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                        {carpet.origin}
                      </div>
                    </div>

                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-sm text-bazaar leading-tight group-hover:text-lac transition-colors">
                          {carpet.name}
                        </h3>
                        <p className="text-xs text-stone-500 mt-2 line-clamp-3">
                          {carpet.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-100 space-y-2">
                        <div className="flex justify-between text-[11px] text-stone-600">
                          <span>طرح: {carpet.design}</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-stone-600">
                          <span>رج‌شمار: {carpet.raj}</span>
                          <span>ابعاد: {carpet.length}×{carpet.width} متر</span>
                        </div>

                        {/* Action buttons */}
                        <div className="grid grid-cols-1 gap-2 pt-2">
                          <button
                            onClick={() => handleLoadPreset(carpet)}
                            className="w-full py-2 bg-lac/5 hover:bg-lac hover:text-white text-lac rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Scroll className="w-3.5 h-3.5" />
                            <span>بارگذاری مشخصات جهت کارشناسی</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Informative Grid Row */}
              <div className="bg-[#f0eade] border border-amber-200/50 p-6 rounded-3xl mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-800">
                <div className="space-y-2 text-center md:text-right">
                  <h4 className="font-bold text-lac text-sm">چرا کارشناسی در بازار سنتی حیاتی است؟</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    فرش دستباف تنها یک کف‌پوش نیست؛ دارایی سرمایه‌ای، اثر هنری و نماد تاریخی است. بدون کارشناسی دقیق رج‌شمار، خامه، رنگ طبیعی و کالبدشکافی طرح، قیمت‌گذاری منصفانه غیرممکن است.
                  </p>
                </div>
                <div className="space-y-2 text-center md:text-right">
                  <h4 className="font-bold text-lac text-sm">معیار سکه طلای بازار</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    در تجارت سنتی فرش ایران، از قدیم‌الایام ارزش فرش‌های آنتیک و نفیس را با مسکوکات طلا یا ملک می‌سنجیدند تا در برابر نوسانات بازار محفوظ بماند. دایی مهدی این سنت کهن را زنده نگاه داشته است.
                  </p>
                </div>
                <div className="space-y-2 text-center md:text-right">
                  <h4 className="font-bold text-lac text-sm">پیام مکتوب بافنده به خریدار</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    طرح‌های لچک ترنج، محرابی یا طرح هندسی عشایری تصادفی نیستند؛ هر بافنده‌ای احساسات شادی، اندوه، کوچ عشایری و امیدهای آینده‌اش را گره زده است. ما روح این داستان‌ها را استخراج می‌کنیم.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 6: MERCHANT LISTING & ALL-ROUND COOPERATION COOPERATION */}
          {activeSection === "merchantSubmit" && (
            <motion.div
              key="merchant-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-3xl border border-amber-100 shadow-xl space-y-8 text-right"
              dir="rtl"
            >
              {/* Header */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-xs font-semibold">
                  <Handshake className="w-4 h-4 text-amber-700 animate-pulse" />
                  <span>پورتال جامع ائتلاف تجاری و همکاری‌های راهبردی فرش بازار</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-bazaar">دروازه توسعه و ائتلاف بین‌المللی هنر-صنعت فرش</h2>
                <p className="text-stone-600 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
                  هولدینگ FP New Meta با همکاری خانه هنر و گالری خاندان حاج حسین علی میری و پسران، بستری بی‌بدیل جهت جذب پروپوزال‌های استراتژیک، یکپارچه‌سازی وب‌سایت‌ها، هم‌افزایی با کارخانجات مدرن فرش ماشینی و توسعه صادرات دیجیتال بافندگان سنتی ایجاد نموده است.
                </p>
              </div>

              {merchantSubmitSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200/60 rounded-3xl p-8 text-center space-y-4 max-w-xl mx-auto shadow-sm"
                >
                  <span className="text-4xl block">🚀</span>
                  <h4 className="font-extrabold text-lg text-emerald-900">پروپوزال و طرح ائتلاف با موفقیت ثبت گردید</h4>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    طرح ارسالی شما مستقیماً در دبیرخانه ائتلاف تجاری خاندان حاج حسین علی میری و پسران و هولدینگ FP New Meta ثبت گردید. کد پیگیری رسمی پرونده شما: <strong className="font-mono text-amber-800">COOP-{Math.floor(100000 + Math.random() * 900000)}</strong> می‌باشد. کارشناسان توسعه بازار ما حداکثر تا ۴۸ ساعت آینده جهت عقد تفاهم‌نامه اولیه تماس خواهند گرفت.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleMerchantSubmit} className="space-y-8">
                  
                  {/* Step 1: Select Alliance Type */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-xs md:text-sm text-bazaar flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-extrabold">۱</span>
                      حوزه و قلمرو ائتلاف تجاری مورد نظر خود را انتخاب نمایید:
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        {
                          id: "weaving",
                          title: "بافندگان و کارگاه‌های دستباف",
                          desc: "تامین‌کنندگان بومی، کارگاه‌های قالی‌بافی و عشایری و تجار اصیل صنف فرش دستباف.",
                          icon: Scroll
                        },
                        {
                          id: "machine",
                          title: "کارخانجات و برندهای فرش ماشینی",
                          desc: "تولیدکنندگان صنعتی، کارخانجات بزرگ، دارندگان ماشین‌آلات شونهر و واندویل بلژیک.",
                          icon: Factory
                        },
                        {
                          id: "media",
                          title: "وب‌سایت‌ها، رسانه‌ها و پلتفرم‌ها",
                          desc: "اتصال وب‌سایت‌های همکار، هم‌بستگی پلتفرمی، فروشگاه‌های زنجیره‌ای و مبادلات رسانه‌ای.",
                          icon: Globe
                        },
                        {
                          id: "academic",
                          title: "همکاری‌های علمی، دانشگاهی و مستقل",
                          desc: "پژوهش‌های اصالت‌شناسی، رنگرزی نوین، استارت‌آپ‌های هنری و پروپوزال‌های فناورانه.",
                          icon: Sparkles
                        }
                      ].map((item) => {
                        const Icon = item.icon;
                        const isSelected = coopType === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setCoopType(item.id)}
                            className={`p-4 rounded-2xl border text-right transition-all flex flex-col justify-between space-y-3 cursor-pointer group ${
                              isSelected
                                ? "bg-[#FAF6F0] border-amber-600/60 ring-2 ring-amber-600/20"
                                : "bg-stone-50/50 hover:bg-stone-50 border-stone-200"
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className={`p-2 rounded-xl ${isSelected ? "bg-amber-600 text-white" : "bg-stone-200/60 text-stone-600 group-hover:bg-amber-50 group-hover:text-amber-700"} transition-all`}>
                                <Icon className="w-4 h-4" />
                              </span>
                              <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? "border-amber-600 bg-amber-600 text-white" : "border-stone-300"}`}>
                                {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-extrabold text-xs text-stone-800">{item.title}</h4>
                              <p className="text-[10px] text-stone-500 leading-relaxed">{item.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Select Alliance Scope */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-xs md:text-sm text-bazaar flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-extrabold">۲</span>
                      محدوده فعالیت و اتمسفر این پروپوزال همکاری چیست؟
                    </h3>
                    
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: "in-app", label: "درون‌برنامه‌ای و تبادل پلتفرمی فناوری" },
                        { id: "out-app", label: "برون‌برنامه‌ای، بازرگانی و زنجیره توزیع بین‌المللی" },
                        { id: "professional", label: "همکاری حرفه‌ای استراتژیک، ائتلاف تجاری و سرمایه‌گذاری مشترک" }
                      ].map((scope) => {
                        const isSelected = coopScope === scope.id;
                        return (
                          <button
                            key={scope.id}
                            type="button"
                            onClick={() => setCoopScope(scope.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-lac text-white border-lac"
                                : "bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-600"
                            }`}
                          >
                            {scope.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Identity & Contact Form */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-xs md:text-sm text-bazaar flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-extrabold">۳</span>
                      مشخصات نماینده قانونی و اطلاعات هویتی سازمان متقاضی:
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">نام و نام‌خانوادگی نماینده:</label>
                        <input
                          type="text"
                          required
                          value={merchantName}
                          onChange={(e) => setMerchantName(e.target.value)}
                          placeholder="مانند: مهندس فرزاد امیری"
                          className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-lac"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">شماره همراه معتبر (تایید شده صنف):</label>
                        <input
                          type="tel"
                          required
                          value={merchantPhone}
                          onChange={(e) => setMerchantPhone(e.target.value)}
                          placeholder="مانند: ۰۹۱۲۳۴۵۶۷۸۹"
                          className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-lac text-left font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">شهر و کشور مبدا ائتلاف:</label>
                        <input
                          type="text"
                          required
                          value={merchantCity}
                          onChange={(e) => setMerchantCity(e.target.value)}
                          placeholder="مانند: اصفهان - تهران"
                          className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-lac"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">نام سازمان، کارخانه، شرکت یا وب‌سایت همکار:</label>
                        <input
                          type="text"
                          value={coopCompany}
                          onChange={(e) => setCoopCompany(e.target.value)}
                          placeholder="مانند: صنایع نساجی نگین کاشان / وب‌سایت قالی‌آنلاین"
                          className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-lac"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">پست الکترونیک رسمی (Email):</label>
                        <input
                          type="email"
                          value={coopEmail}
                          onChange={(e) => setCoopEmail(e.target.value)}
                          placeholder="partner@company.com"
                          className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-lac text-left font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">آدرس تارنما / وب‌سایت همکار (در صورت وجود):</label>
                        <input
                          type="text"
                          value={coopWebsite}
                          onChange={(e) => setCoopWebsite(e.target.value)}
                          placeholder="www.partner-rug.com"
                          className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-lac text-left font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Executive Summary */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-xs md:text-sm text-bazaar flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-extrabold">۴</span>
                      خلاصه ایده همکاری و چارچوب پروپوزال پیشنهادی خود را تبیین کنید:
                    </h3>
                    
                    <textarea
                      required
                      value={coopProposal}
                      onChange={(e) => setCoopProposal(e.target.value)}
                      placeholder="لطفا در این بخش اهداف ائتلاف، مدل توزیع منافع، ارزش افزوده دو طرفه و راهکارهای تبادل وب‌سایتی، فروشگاهی یا تامین مواد اولیه کارگاه‌ها را مکتوب نمایید..."
                      rows={5}
                      className="w-full bg-stone-50/50 border border-stone-200 rounded-2xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-lac leading-relaxed"
                    />
                  </div>

                  {/* Step 5: Proposal Document Attachment (Drag and Drop / Upload Simulation) */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-xs md:text-sm text-bazaar flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-extrabold">۵</span>
                      ضمیمه سند مکتوب یا فایل رسمی پروپوزال (PDF / DOCX):
                    </h3>

                    <div className="border-2 border-dashed border-stone-200 rounded-2xl p-6 bg-stone-50/30 hover:bg-amber-50/10 transition-all text-center relative group">
                      <input 
                        type="file" 
                        id="proposal-file-upload" 
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setCoopFileName(e.target.files[0].name);
                          }
                        }}
                      />
                      
                      <div className="space-y-2 pointer-events-none">
                        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                          <Upload className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-bold text-stone-700">پروپوزال خود را به این قسمت بکشید یا جهت بارگذاری کلیک کنید</p>
                        <p className="text-[10px] text-stone-400">حداکثر حجم مجاز: ۲۰ مگابایت (فرمت PDF، ورد، تصویر کاتالوگ)</p>
                      </div>

                      {coopFileName && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-semibold text-emerald-800 inline-flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>سند پروپوزال با موفقیت پیوست گردید: {coopFileName}</span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Submission Checkbox & Legal terms */}
                  <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200/60">
                    <input
                      type="checkbox"
                      required
                      id="merchant-agreement"
                      className="mt-1 accent-lac"
                    />
                    <label htmlFor="merchant-agreement" className="text-[11px] text-stone-600 leading-relaxed cursor-pointer">
                      متعهد می‌شویم تمامی بندهای مکتوب شده در خلاصه پیشنهاد ائتلاف تجاری بر پایه صداقت و رعایت استانداردهای عالی کیفی صنف فرش و صنایع‌دستی ایران استوار بوده و پایبندی کامل به حریم معنوی و حقوقی هولدینگ FP New Meta و کارشناسان گالری خاندان حاج حسین علی میری و پسران را تضمین می‌نماییم.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-lac hover:bg-red-950 text-white py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <Briefcase className="w-4 h-4 text-amber-300" />
                    <span>ارسال رسمی پرونده و پروپوزال ائتلاف به دپارتمان توسعه بازار</span>
                  </button>
                </form>
              )}
            </motion.div>
          )}

          {/* TAB 7: CARPET SAMPLE REQUESTS & INSTALLATION VALUATION PORTAL */}
          {activeSection === "samplesPanel" && (
            <motion.div
              key="samples-panel-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-5xl mx-auto space-y-8 text-right font-sans"
              dir="rtl"
            >
              {/* Header */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-amber-100 shadow-md text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-lac/5 border border-lac/15 rounded-full text-lac text-xs font-semibold">
                  <ClipboardList className="w-4 h-4 text-lac" />
                  <span>سامانه هوشمند نمونه‌گیری فیزیکی و کارشناسی چندجانبه قیمت</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-bazaar">درخواست نمونه، ارزیابی نصاب‌ها و کشف قیمت فرش</h2>
                <p className="text-stone-600 text-xs md:text-sm max-w-3xl mx-auto leading-relaxed">
                  دیگر نیازی به خرید بدون تست نیست! در این بخش می‌توانید نمونه فیزیکی قالی‌های مورد نظر خود را درب منزل تحویل بگیرید. همچنین با پیوست تصویر فرش، ارزیابی نصب و بازخورد قیمتی نصاب‌های باتجربه، تجار سنتی و هوش مصنوعی پیشرفته را به‌طور یکجا دریافت کنید.
                </p>
              </div>

              {/* Grid of actions: Samples Request and Pricing Feedback */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Right Column: Physical Sample Request (Span 5) */}
                <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-amber-100 shadow-md flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                      <span className="p-2 bg-amber-50 text-amber-800 rounded-xl">
                        <ShoppingBag className="w-5 h-5" />
                      </span>
                      <div>
                        <h3 className="font-extrabold text-stone-800 text-sm md:text-base">درخواست نمونه فیزیکی فرش</h3>
                        <p className="text-[10px] text-stone-400">تست هماهنگی رنگ و جنس در دکوراسیون منزل</p>
                      </div>
                    </div>

                    {sampleRequestSuccess ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2"
                      >
                        <span className="text-3xl block">✓</span>
                        <h4 className="font-extrabold text-sm text-emerald-900">سفارش نمونه با موفقیت ثبت شد</h4>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          درخواست شما برای ارسال نمونه درب منزل ثبت گردید. کارشناسان ما جهت هماهنگی زمان تحویل با شماره <strong className="font-mono text-lac">{samplePhone}</strong> تماس خواهند گرفت.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSampleRequestSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">نام و نام‌خانوادگی:</label>
                          <input
                            type="text"
                            required
                            value={sampleName}
                            onChange={(e) => setSampleName(e.target.value)}
                            placeholder="مانند: دکتر حمید میری"
                            className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-lac"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">شماره تماس متقاضی:</label>
                          <input
                            type="tel"
                            required
                            value={samplePhone}
                            onChange={(e) => setSamplePhone(e.target.value)}
                            placeholder="مانند: ۰۹۱۲۳۴۵۶۷۸۹"
                            className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-lac text-left font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">نوع بافت نمونه مورد نظر:</label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { id: "handwoven", label: "دستباف (پشم و ابریشم)" },
                              { id: "machine", label: "ماشینی (اکریلیک و هیت‌ست)" }
                            ].map((type) => (
                              <button
                                key={type.id}
                                type="button"
                                onClick={() => setSampleCarpetType(type.id)}
                                className={`py-1.5 px-3 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                                  sampleCarpetType === type.id
                                    ? "bg-lac text-white border-lac"
                                    : "bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-600"
                                }`}
                              >
                                {type.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">نشانی دقیق محل ارسال و نمونه‌گیری:</label>
                          <textarea
                            required
                            value={sampleAddress}
                            onChange={(e) => setSampleAddress(e.target.value)}
                            placeholder="تهران، خیابان پاسداران، بوستان چهارم، پلاک..."
                            rows={3}
                            className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-lac leading-relaxed"
                          />
                        </div>

                        {/* Optional Reference Upload for matching style */}
                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-stone-700">تصویر دکوراسیون یا فرشی که می‌خواهید با آن ست کنید:</label>
                          <div className="border border-dashed border-stone-200 rounded-xl p-3 bg-stone-50/30 hover:bg-amber-50/5 transition-all text-center relative group">
                            <input 
                              type="file" 
                              accept="image/*"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setSampleImageName(e.target.files[0].name);
                                  setSampleImage(URL.createObjectURL(e.target.files[0]));
                                }
                              }}
                            />
                            <div className="flex items-center justify-center gap-2 pointer-events-none">
                              <Upload className="w-4 h-4 text-stone-400 group-hover:text-lac" />
                              <span className="text-[10px] text-stone-500">پیوست تصویر مرجع دکوراسیون (اختیاری)</span>
                            </div>
                            {sampleImageName && (
                              <p className="text-[10px] text-emerald-750 font-semibold mt-1">✓ {sampleImageName}</p>
                            )}
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmittingSample}
                          className="w-full bg-lac hover:bg-[#600000] text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {isSubmittingSample ? (
                            <span className="animate-pulse">در حال ثبت درخواست...</span>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-amber-300" />
                              <span>ثبت درخواست نمونه رایگان</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Trust Badge Checklist */}
                  <div className="mt-6 pt-4 border-t border-stone-100 space-y-2 bg-amber-50/20 p-3 rounded-2xl border border-amber-100/30">
                    <h4 className="font-bold text-xs text-amber-900 mb-1.5">مزایای نمونه‌گیری فیزیکی فرش بازار:</h4>
                    <ul className="space-y-1.5 text-[10px] text-stone-600 leading-relaxed">
                      <li className="flex items-center gap-1.5">
                        <span className="text-amber-600">✦</span>
                        <span>ارسال تا ۳ نمونه فرش مختلف جهت انتخاب هوشمندانه</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-amber-600">✦</span>
                        <span>امکان لمس حضوری ضخامت، جنس خامه و تراکم بافت</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-amber-600">✦</span>
                        <span>مشاوره همزمان نماینده صنف در محل دکوراسیون شما</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Left Column: Installer & Market Valuation Portal (Span 7) */}
                <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-amber-100 shadow-md space-y-6">
                  
                  {/* Title & Info */}
                  <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                    <span className="p-2 bg-amber-50 text-amber-800 rounded-xl">
                      <Wrench className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-extrabold text-stone-800 text-sm md:text-base">درگاه ارزیابی تصویر فرش و مشاوره نصب</h3>
                      <p className="text-[10px] text-stone-400">تخمین عادلانه قیمت و سنجش فنی شیوه نصب فرش توسط نصاب‌ها و بازارهای هوشمند</p>
                    </div>
                  </div>

                  {/* Submission Form */}
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4 bg-stone-50/40 p-4 rounded-2xl border border-stone-150">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Upload Box */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-stone-700">۱. تصویر فرش خود را پیوست کنید (یا برای نصب آپلود کنید):</label>
                        <div className="border-2 border-dashed border-stone-200 hover:border-lac rounded-xl p-4 bg-white hover:bg-amber-50/5 transition-all text-center relative group flex flex-col items-center justify-center min-h-[120px]">
                          <input 
                            type="file" 
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setFeedbackCarpetImageName(e.target.files[0].name);
                                setFeedbackCarpetImage(URL.createObjectURL(e.target.files[0]));
                              }
                            }}
                          />
                          {feedbackCarpetImage ? (
                            <div className="flex flex-col items-center space-y-1">
                              <img src={feedbackCarpetImage} className="w-16 h-16 rounded object-cover shadow border border-amber-100" />
                              <span className="text-[10px] font-bold text-emerald-850 max-w-[150px] truncate">{feedbackCarpetImageName}</span>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-6 h-6 text-stone-400 group-hover:text-lac mb-1" />
                              <p className="text-[10px] font-bold text-stone-600">انتخاب یا رها کردن عکس فرش</p>
                              <p className="text-[9px] text-stone-400">پیوست تصویر فرش جهت ارزیابی الزامی است</p>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Selector for Category */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-stone-700">۲. مرجع ارزیابی و بازخوردگیرنده:</label>
                        <div className="space-y-2">
                          {[
                            { id: "installer", label: "نصاب‌های باسابقه (تخمین هزینه و روش نصب)", desc: "بهترین الگو برای نصب دیواری یا ضدلغزش کف" },
                            { id: "real-market", label: "تجار و بنکداران حقیقی بازار (قیمت کف بازار)", desc: "کشف قیمت عادلانه روز با تکیه بر تجربه بازار" },
                            { id: "ai-market", label: "هوش مصنوعی فرش‌بازار (ارزیابی الگوریتمی)", desc: "بررسی الگوهای بافت و نقوش با دیتابیس عظیم" }
                          ].map((cat) => (
                            <label 
                              key={cat.id}
                              onClick={() => setFeedbackCategory(cat.id)}
                              className={`flex items-start gap-2 p-2 rounded-xl border text-right cursor-pointer transition-all ${
                                feedbackCategory === cat.id
                                  ? "bg-amber-50 border-amber-500/60 shadow-sm"
                                  : "bg-white hover:bg-stone-50 border-stone-200"
                              }`}
                            >
                              <input 
                                type="radio" 
                                name="feedbackCategoryRadio"
                                checked={feedbackCategory === cat.id}
                                readOnly
                                className="mt-1 accent-lac"
                              />
                              <div>
                                <h4 className="text-[11px] font-bold text-stone-800">{cat.label}</h4>
                                <p className="text-[9px] text-stone-500 leading-relaxed">{cat.desc}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Desc and Button */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                      <div className="md:col-span-3">
                        <label className="block text-xs font-bold text-stone-700 mb-1">۳. توضیحات (نظیر رج‌شمار، ابعاد یا دغدغه نصب):</label>
                        <input
                          type="text"
                          value={feedbackCarpetDesc}
                          onChange={(e) => setFeedbackCarpetDesc(e.target.value)}
                          placeholder="مثلاً: قالی ۳ در ۴ تبریز، آیا با چسب نصب شود یا آستر ضدلغزش مناسب است؟"
                          className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-lac"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <button
                          type="submit"
                          disabled={isSubmittingFeedback || !feedbackCarpetImage}
                          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer ${
                            feedbackCarpetImage 
                              ? "bg-bazaar hover:bg-[#4a2e2b] text-white" 
                              : "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
                          }`}
                        >
                          {isSubmittingFeedback ? (
                            <span className="animate-pulse">ارسال تصویر...</span>
                          ) : (
                            <>
                              <Wrench className="w-3.5 h-3.5 text-amber-300" />
                              <span>دریافت ارزیابی</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {feedbackSubmitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-850 font-semibold text-center"
                      >
                        ✓ تصویر و مشخصات با موفقیت ارسال شد. ارزیابی جدید فوراً استخراج و به لیست زیر اضافه گردید!
                      </motion.div>
                    )}
                  </form>

                  {/* Feedback Live Feed */}
                  <div className="space-y-3">
                    <h4 className="font-extrabold text-stone-800 text-xs md:text-sm flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-lac animate-pulse"></span>
                      آخرین ارزیابی‌ها، مشاوره‌های نصب و قیمت‌های پیشنهادی ثبت‌شده:
                    </h4>

                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                      <AnimatePresence>
                        {simulatedFeedbackList.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-stone-50 hover:bg-stone-100/70 p-4 rounded-2xl border border-stone-150 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div className="space-y-1.5 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-extrabold text-xs text-stone-800">{item.author}</span>
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                  item.type === "installer" 
                                    ? "bg-blue-50 text-blue-800 border border-blue-200" 
                                    : item.type === "market" 
                                    ? "bg-amber-50 text-amber-800 border border-amber-200" 
                                    : "bg-purple-50 text-purple-800 border border-purple-200"
                                }`}>
                                  {item.type === "installer" && "🛠 نصاب پیشکسوت"}
                                  {item.type === "market" && "🏪 قیمت صنف بازار"}
                                  {item.type === "ai" && "🤖 ارزیاب هوشمند AI"}
                                </span>
                                <span className="text-[10px] text-stone-400 font-mono pr-2">{item.date}</span>
                              </div>
                              <p className="text-xs text-stone-600 leading-relaxed font-sans">{item.comment}</p>
                            </div>

                            <div className="text-left flex-shrink-0 bg-white px-3 py-2 rounded-xl border border-stone-200 min-w-[140px] flex flex-col justify-center items-center md:items-end">
                              <span className="text-[9px] text-stone-400 font-sans">تخمین ارزش پیشنهادی:</span>
                              <span className="text-xs font-black text-lac font-mono mt-0.5">{item.priceEstimation}</span>
                              <div className="flex items-center gap-0.5 mt-1">
                                <span className="text-amber-500 text-xs">★</span>
                                <span className="text-[10px] text-stone-600 font-bold font-mono">{item.rating.toFixed(1)}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

        {/* BOTTOM QUICK-ACCESS CAROUSEL (Always visible for excellent flow) */}
        {activeSection !== "gallery" && (
          <div className="mt-16 pt-8 border-t border-amber-200/40">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-extrabold text-bazaar text-lg">شاهکارهای بافته‌شده با داستانی شنیدنی</h3>
                <p className="text-xs text-stone-500 mt-1 font-sans">با کلیک روی دکمه هر فرش، مستقیماً ویژگی‌های آن را در بخش کارشناسی بارگذاری کنید.</p>
              </div>
              <button 
                onClick={() => setActiveSection("gallery")}
                className="text-xs font-bold text-lac flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>مشاهده کاتالوگ جامع قالی‌ها</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {CARPET_GALLERY.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-2xl overflow-hidden border border-amber-100 shadow-sm p-3 flex flex-col justify-between group"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-100 mb-3">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                    <span className="absolute bottom-2 right-2 bg-lac text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{item.origin}</span>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-xs text-bazaar truncate mb-1">{item.name}</h4>
                    <span className="text-[10px] text-stone-500 block">طرح: {item.design} | رج: {item.raj}</span>
                  </div>

                  <button
                    onClick={() => handleLoadPreset(item)}
                    className="w-full mt-3 py-1.5 bg-amber-500/5 hover:bg-lac text-stone-700 hover:text-white rounded-lg text-[10px] font-bold transition-all text-center cursor-pointer"
                  >
                    بارگذاری در حجره کارشناسی
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Floating Auto-Pilot Autonomous Robot Controller Widget */}
      <AnimatePresence>
        {autoPilotActive && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-4 right-4 left-4 md:left-auto md:right-6 max-w-lg bg-stone-900/95 text-white p-5 rounded-3xl shadow-2xl border-2 border-amber-500/40 backdrop-blur-md z-50"
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-10 h-10 bg-amber-500 text-stone-950 rounded-2xl flex items-center justify-center font-bold shadow-md">
                    <Bot className="w-6 h-6 animate-bounce" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-stone-900 animate-ping"></span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <span>ربات هدایت‌کننده هوشمند فرش‌بازار</span>
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full border border-amber-400/30">
                      حالت خودکار
                    </span>
                  </h4>
                  <p className="text-[11px] text-stone-300 font-sans mt-0.5">
                    گام {autoPilotStep + 1} از {AUTOPILOT_STEPS.length}: {AUTOPILOT_STEPS[autoPilotStep].title}
                  </p>
                </div>
              </div>

              {/* Close / Stop button */}
              <button
                onClick={handleStopAutoPilot}
                className="text-stone-400 hover:text-rose-400 text-xs px-2.5 py-1 bg-stone-800 hover:bg-stone-700 rounded-xl transition-colors border border-stone-700"
              >
                خروج و کنترل دستی
              </button>
            </div>

            {/* Step description speech bubble */}
            <div className="bg-stone-800/90 border border-stone-700/80 p-3 rounded-2xl mb-4 text-xs text-amber-100 leading-relaxed relative">
              <div className="flex items-start gap-2">
                <Volume2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5 animate-pulse" />
                <p>{AUTOPILOT_STEPS[autoPilotStep].message}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-stone-800 rounded-full h-1.5 mb-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-300 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${((autoPilotStep + 1) / AUTOPILOT_STEPS.length) * 100}%` }}
              ></div>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAutoPilotPlaying(!autoPilotPlaying)}
                  className="p-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl transition-colors font-bold shadow flex items-center gap-1.5 text-xs"
                >
                  {autoPilotPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{autoPilotPlaying ? "توقف موقت" : "ادامه حرکت"}</span>
                </button>

                <button
                  onClick={() => {
                    if (autoPilotStep < AUTOPILOT_STEPS.length - 1) {
                      setAutoPilotStep(prev => prev + 1);
                    } else {
                      setAutoPilotStep(0);
                    }
                  }}
                  className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl transition-colors text-xs flex items-center gap-1 border border-stone-700"
                >
                  <SkipForward className="w-4 h-4" />
                  <span>گام بعدی</span>
                </button>

                <button
                  onClick={handleStartAutoPilot}
                  className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl transition-colors text-xs flex items-center gap-1 border border-stone-700"
                  title="شروع مجدد از گام ۱"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Speed selection */}
              <div className="flex items-center gap-1 bg-stone-800 p-1 rounded-xl border border-stone-700 text-[11px]">
                <span className="text-stone-400 px-1">سرعت:</span>
                {([1, 1.5, 2] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setAutoPilotSpeed(s)}
                    className={`px-2 py-0.5 rounded-lg transition-colors ${
                      autoPilotSpeed === s ? "bg-amber-500 text-stone-950 font-bold" : "text-stone-300 hover:text-white"
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PWA Installation Guidance Modal */}
      <AnimatePresence>
        {showPwaModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPwaModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-stone-900 text-white p-6 rounded-3xl max-w-lg w-full border-2 border-amber-500/40 shadow-2xl space-y-5 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-amber-500 text-stone-950 rounded-2xl flex items-center justify-center font-bold">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-amber-300 font-serif">راهنمای نصب وب‌اپلیکیشن (PWA)</h3>
                    <p className="text-xs text-stone-400">شناسایی هوشمند گوگل و مرورگرها</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPwaModal(false)}
                  className="text-stone-400 hover:text-white text-xs bg-stone-800 px-2.5 py-1 rounded-xl"
                >
                  بستن ✖
                </button>
              </div>

              <div className="space-y-4 text-xs text-stone-200 leading-relaxed font-sans">
                <p className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-2xl text-amber-200">
                  این سامانه طبق استاندارد رسمی گوگل (Progressive Web App) طراحی شده است. مرورگر گوگل کروم و آندروید علامت نصب و دانلود را به‌صورت خودکار تشخیص می‌دهند.
                </p>

                <div className="space-y-2 border-t border-stone-800 pt-3">
                  <h4 className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                    <Smartphone className="w-4 h-4" />
                    <span>۱. نصب در گوشی‌های اندروید و گوگل کروم:</span>
                  </h4>
                  <p className="text-stone-300 pr-4">
                    در بالای مرورگر یا نوار آدرس، روی دکمه یا آیکون <strong>«نصب برنامه (Install App)»</strong> بزنید، یا ۳ نقطه بالا سمت راست مرورگر را لمس کرده و گزینه <strong>«افزودن به صفحه اصلی (Add to Home screen)»</strong> را انتخاب کنید.
                  </p>
                </div>

                <div className="space-y-2 border-t border-stone-800 pt-3">
                  <h4 className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                    <AppWindow className="w-4 h-4" />
                    <span>۲. نصب در آیفون (iOS / Safari):</span>
                  </h4>
                  <p className="text-stone-300 pr-4">
                    در مرورگر سافاری آیفون، روی دکمه اشتراک‌گذاری <strong>(Share)</strong> در پایین صفحه بزنید و گزینه <strong>«Add to Home Screen»</strong> را لمس کنید تا مانند یک برنامه اپ‌استور روی آیفون شما قرار گیرد.
                  </p>
                </div>

                <div className="space-y-2 border-t border-stone-800 pt-3">
                  <h4 className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>۳. تبدیل به فایل APK جهت کافه بازار و مایکت:</span>
                  </h4>
                  <p className="text-stone-300 pr-4">
                    این برنامه به‌همراه فایل <code className="bg-stone-800 text-amber-300 px-1 py-0.5 rounded">manifest.json</code> و سرویس ورکر فعال، تمام استانداردهای مورد نیاز سایت‌های تبدیل PWA به APK را کامل داراست.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowPwaModal(false)}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-2.5 rounded-2xl text-xs transition-colors text-center"
                >
                  متوجه شدم، بازگشت به برنامه
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Vintage Footer */}
      <footer className="bg-bazaar text-[#ece4d0] border-t border-amber-600/10 py-12 px-4 relative mt-16 overflow-hidden">
        
        {/* Abstract design elements inside footer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-lac/10 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          
          <div className="space-y-4">
            <h4 className="font-extrabold text-white text-lg font-sans">فـرش بــازار (FarshBazaar)</h4>
            <p className="text-xs text-[#c3b9ab] leading-relaxed">
              این پلتفرم با هدف ارج نهادن به رنج و هنر سرانگشتان بافندگان عشایری و کارگاهی سراسر فلات ایران بنا شده است. ما سنت، ادبیات، اسطوره‌ها و ارزش مادی قالی ایرانی را با ابزارهای کارآمد کالبدشکافی می‌کنیم.
            </p>
            <div className="text-[10px] text-amber-500 font-serif">
              مهر و برکت حجره دایی مهدی، همواره همراه خانه‌های شما باد.
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm">پیوندهای اصیل بازار</h4>
            <ul className="space-y-2 text-xs text-[#c3b9ab]">
              <li>
                <button onClick={() => setActiveSection("advisor")} className="hover:text-amber-400 transition-colors">اتاق کارشناسان دایی مهدی</button>
              </li>
              <li>
                <button onClick={() => setActiveSection("sellerRoom")} className="hover:text-amber-400 transition-colors">شبیه‌ساز حجره معمولی و پرو</button>
              </li>
              <li>
                <button onClick={() => setActiveSection("customWeave")} className="hover:text-amber-400 transition-colors">سفارش بافت پرچم و پرتره</button>
              </li>
              <li>
                <button onClick={() => setActiveSection("dyeSimulator")} className="hover:text-amber-400 transition-colors">کارگاه رنگرزی طبیعی و گیاهی</button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm">نشانی فروشگاه و گالری مرکزی خاندان حاج حسین علی میری و پسران</h4>
            <p className="text-xs text-[#c3b9ab] leading-relaxed">
              تهران، خیابان خیام شمالی، بخش متروی خیام، پلاک ۴۸، فرش دستباف حاج حسین علی میری و پسران
            </p>
            <div className="pt-2 border-t border-stone-800 text-[11px] text-[#a19688]">
              ارتباط مستقیم با گالری مرکزی: ۲۸۴۲-۰۲۱ | یادگار پیشکسوت خوش‌نام بازار بزرگ تهران
            </div>
          </div>

        </div>

        <div className="max-w-6xl mx-auto text-center mt-12 pt-6 border-t border-stone-800 text-[11px] text-[#a19688] flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
          <span>حقوق معنوی و طراحی محفوظ برای فرشبازار دستباف ایرانی © ۲۰۲۶</span>
          <span className="font-sans text-[10px]">طراحی شده با الهام از اصالت نقش لچک ترنج و قرمز لاکی روناس</span>
        </div>

      </footer>
    </div>
  );
}
