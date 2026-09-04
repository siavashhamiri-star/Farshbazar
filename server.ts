import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini Client with correct header for AI Studio Build
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Primary Endpoint: Traditional Carpet Appraisal and Storytelling by Daei Mehdi & other selected experts
app.post("/api/expert-advice", async (req, res) => {
  try {
    const { origin, raj, material, design, length, width, age, userNotes, expertType } = req.body;

    if (!origin || !design) {
      return res.status(400).json({ error: "لطفاً شهر بافت و نوع طرح فرش را وارد کنید." });
    }

    let expertPersona = "";
    if (expertType === "miri") {
      expertPersona = `شما "حاج حسین علی میری و پسران"، اصالت‌شناسان عتیقه‌شناس بنام و کارشناس باسابقه بازار تاریخی فرش ری و اصفهان هستید. لحن شما جدی، فوق‌العاده علمی، تخصصی، با تمرکز بر اصالت گره‌ها، عتیقه‌شناسی و قدمت تاریخی و موروثی فرش است.`;
    } else if (expertType === "heritage") {
      expertPersona = `شما "دپارتمان کارشناسی هریتج (Heritage)" متشکل از خبرگان علمی بین‌المللی موزه‌های فرش جهان هستید. لحن شما آکادمیک، مدرن، کارشناسانه با دیدگاه صادراتی، موزه‌ای و جهانی به هنر قالی‌بافی ایران است.`;
    } else if (expertType === "decorator") {
      expertPersona = `شما "طراح برجسته چیدمان و دکوراسیون داخلی" متخصص در ست کردن فرش با مبلمان، رنگ دیوار و به‌ویژه پرده‌های سلطنتی و مدرن هستید. لحن شما شیک، مدرن، مشوق، با تمرکز بر ترکیب رنگ پرده، نورپردازی محیط، ابعاد اتاق و تناسب طرح‌های اسلیمی با سبک زندگی امروز است.`;
    } else {
      expertPersona = `شما "دایی مهدی"، پیشکسوت، خبره، معتبر و با تجربه ۷۰ ساله در بازار بزرگ فرش ایران هستید. شما با لحنی بسیار محترمانه، گرم، اصیل، سنتی، صمیمی و بازاری (با تکیه‌کلام‌هایی مثل "فرزندم"، "برکت خدا"، "عزیز دایی"، "نور چشمم") مشخصات این قالی دستباف را کالبدشکافی می‌کنید.`;
    }

    const prompt = `
      ${expertPersona}
      فرش دستباف با مشخصات زیر را کارشناسی و کالبدشکافی کنید:
      
      - خاستگاه/محل بافت: ${origin}
      - رج‌شمار (تراکم بافت): ${raj || "مشخص نشده (تخمین بزنید)"}
      - تار و پود و خامه (جنس): ${material || "مشخص نشده"}
      - نوع طرح و نقشه: ${design}
      - ابعاد: ${length || "؟"} در ${width || "؟"} متر
      - قدمت/سن فرش: ${age || "نو"}
      - توضیحات یا نشانه‌های خاص خریدار: ${userNotes || "ندارد"}

      از شما می‌خواهیم موارد زیر را در قالب یک پاسخ ساختاریافته JSON به زبان فارسی تولید کنید:
      ۱. کارشناسی و نظر تخصصی کارشناس مربوطه (expertAppraisal): لحنی متناسب با شخصیت انتخاب شده. تحلیل هماهنگی رنگ‌ها، اصالت بافت آن منطقه و حس و حال این اثر هنری یا نحوه هماهنگی آن با دکوراسیون و پرده‌ها.
      ۲. داستان و افسانه سنتی فرش (story): داستانی شاعرانه، لطیف و اصیل درباره بافنده یا الهام‌بخش نقشه این فرش. بگویید بافنده چه آرزو و احساسی را گره به گره در تار و پود این فرش کاشته است یا روایت تاریخی آن فرش.
      ۳. تخمین مشخصات فنی (technicalSpecs): شامل تراکم گره تقریبی در متر مربع (knotDensity)، رتبه‌بندی رج (rajClass)، و درصد کمیابی فرش در بازار امروز (rarity).
      ۴. ارزش‌گذاری و قیمت‌گذاری سنتی (valuation): شامل بازه قیمتی تقریبی به تومان (rangeTomans - مثلاً "۸۰ تا ۹۵ میلیون تومان")، معادل تقریبی آن در سکه تمام بهار آزادی (rangeGoldSovereigns - مثلاً "۱.۵ تا ۲ سکه بهار آزادی")، و دلیل این ارزش‌گذاری عادلانه (justification).
      ۵. توصیه‌های کلیدی برای نگهداری یا چیدمان دکوراتیو (maintenanceTips): ۳ الی ۴ نکته کلیدی بازار برای نگهداری یا چگونگی ست کردن این فرش با دکوراسیون منزل (پرده و مبل).

      توجه: ساختار خروجی حتماً باید یک آبجکت معتبر JSON طبق مشخصات خواسته شده باشد.
    `;

    // Request JSON schema from Gemini 3.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["expertAppraisal", "story", "technicalSpecs", "valuation", "maintenanceTips"],
          properties: {
            expertAppraisal: {
              type: Type.STRING,
              description: "Expert opinion and commentary in customized tone."
            },
            story: {
              type: Type.STRING,
              description: "Poetic and traditional storytelling about the rug's design and weavers' emotions."
            },
            technicalSpecs: {
              type: Type.OBJECT,
              required: ["knotDensity", "rajClass", "rarity"],
              properties: {
                knotDensity: { type: Type.STRING, description: "Estimated knots per square meter." },
                rajClass: { type: Type.STRING, description: "Description of raj quality and weave grade." },
                rarity: { type: Type.STRING, description: "Market rarity scale." }
              }
            },
            valuation: {
              type: Type.OBJECT,
              required: ["rangeTomans", "rangeGoldSovereigns", "justification"],
              properties: {
                rangeTomans: { type: Type.STRING, description: "Estimated value range in Iranian Tomans." },
                rangeGoldSovereigns: { type: Type.STRING, description: "Equivalent value in Gold Sovereigns." },
                justification: { type: Type.STRING, description: "Craftsmanship reason for this value." }
              }
            },
            maintenanceTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-4 custom care or decoration tips."
            }
          }
        }
      }
    });

    const responseText = response.text || "{}";
    const appraisalResult = JSON.parse(responseText.trim());
    res.json(appraisalResult);

  } catch (error: any) {
    console.error("Error in expert appraisal endpoint:", error);
    res.status(500).json({
      error: "متأسفانه در حال حاضر کارشناس مربوطه در حجره تشریف ندارند یا ارتباط بازار با خلل مواجه شده است.",
      details: error.message
    });
  }
});

// Pro Feature: AI Translate for Global Carpet Trade (Persian <-> English / Arabic)
app.post("/api/translate", async (req, res) => {
  try {
    const { text, targetLang, translationType } = req.body;
    if (!text) {
      return res.status(400).json({ error: "متنی جهت ترجمه ارسال نشده است." });
    }

    let prompt = "";
    if (translationType === "hand_knotted") {
      prompt = `
        شما یک مترجم نخبه، ادیب و کارشناس تراز اول فرش‌های دستباف صادراتی ایران هستید.
        شما وظیفه دارید متن مرتبط با فرش، مشخصات بافت، ابعاد یا مذاکره تجاری را به زبان "${targetLang || 'انگلیسی'}" ترجمه و بومی‌سازی هنری (Hand-Knotted Translation) کنید.
        ترجمه شما نباید یک ترجمه ماشینی ساده باشد، بلکه باید سرشار از واژگان اصیل هنری، تخصصی، شیک و متناسب با فرهنگ زبان مقصد باشد که گویی توسط یک استاد گره‌باف دوزبانه با عشق و ظرافت بافته شده است تا مخاطب خارجی شیفته جلال هنر فرش ایرانی شود.
        
        متن مبدا:
        "${text}"

        ترجمه هنری و بومی‌سازی شده نهایی را مستقیماً بدون هیچ توضیح اضافی برگردانید.
      `;
    } else {
      prompt = `
        شما مترجم هوشمند و تخصصی بازار جهانی فرش ایران هستید.
        وظیفه شما ترجمه روان، تجاری، زیبا و اصیل این متن مرتبط با فرش، مشخصات بافت، ابعاد یا مذاکره تجاری به زبان "${targetLang || 'انگلیسی'}" است:
        
        "${text}"

        ترجمه نهایی را به صورت مستقیم و بدون توضیحات اضافی برگردانید.
      `;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt
    });

    res.json({ translatedText: response.text?.trim() || "" });
  } catch (error: any) {
    console.error("Error in translation endpoint:", error);
    res.status(500).json({ error: "خطا در ترجمه هوشمند بین‌المللی" });
  }
});

// Configure Vite or Static Asset delivery
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FarshBazaar Server] Running beautifully on http://0.0.0.0:${PORT}`);
  });
}

startServer();
