import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  calculateIAI,
  calculateSS,
  calculateWeightedDemand,
  getRecommendations,
  getTopRisks,
} from "../utils/calculations";
import {
  dhofarRegions,
  projectTypes,
  targetAudiences,
} from "../data/dhofarData";

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Enhanced AI Chatbot Service
export class AIChatbotService {
  constructor() {
    this.conversationHistory = [];
    this.currentContext = null;
  }

  // Main chatbot function
  async processUserInput(userMessage) {
    try {
      // Add user message to history
      this.conversationHistory.push({
        role: "user",
        content: userMessage,
        timestamp: new Date(),
      });

      // Analyze user intent and extract parameters
      const analysis = await this.analyzeUserIntent(userMessage);

      if (analysis.intent === "project_evaluation") {
        return await this.handleProjectEvaluation(analysis);
      } else if (analysis.intent === "clarification") {
        return await this.handleClarification(analysis);
      } else if (analysis.intent === "general_question") {
        return await this.handleGeneralQuestion(userMessage);
      }

      return this.generateResponse(
        "أعتذر، لم أفهم طلبك. هل يمكنك توضيح فكرتك الاستثمارية؟"
      );
    } catch (error) {
      console.error("Chatbot Error:", error);
      return this.generateResponse(
        "حدث خطأ في المعالجة. يرجى المحاولة مرة أخرى."
      );
    }
  }

  // Analyze user intent and extract project parameters
  async analyzeUserIntent(message) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    حلل الرسالة التالية واستخرج المعلومات المطلوبة:
    
    الرسالة: "${message}"
    
    استخرج المعلومات التالية:
    1. نوع المشروع (فندق، مطعم، شركة تقنية، أنشطة ترفيهية، تجارة)
    2. المنطقة (صلالة، مرباط، طاقة)
    3. الجمهور المستهدف (سياح، سكان محليون، عائلات، رجال أعمال)
    4. مبلغ الاستثمار (إذا ذُكر)
    5. نية المستخدم (تقييم مشروع، سؤال عام، طلب توضيح)
    
    أجب بصيغة JSON:
    {
      "intent": "project_evaluation|clarification|general_question",
      "projectType": "hotels|restaurants|tech|entertainment|retail|null",
      "region": "salalah|mirbat|taqah|null",
      "audience": "tourists|locals|families|business|null",
      "investmentAmount": number|null,
      "confidence": 0.0-1.0,
      "missingInfo": ["field1", "field2"],
      "extractedText": "النص المستخرج"
    }
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const jsonResponse = JSON.parse(response.text());
      return jsonResponse;
    } catch (error) {
      // Fallback to basic analysis
      return this.basicIntentAnalysis(message);
    }
  }

  // Handle project evaluation
  async handleProjectEvaluation(analysis) {
    const { projectType, region, audience, investmentAmount } = analysis;

    // Use defaults for missing information
    const finalProjectType = projectType || "hotels";
    const finalRegion = region || "salalah";
    const finalAudience = audience || "tourists";
    const finalInvestment = investmentAmount || 100000;

    // Calculate metrics
    const iai = calculateIAI(
      finalRegion,
      finalProjectType,
      finalAudience,
      finalInvestment
    );
    const ss = calculateSS(finalProjectType, finalInvestment, finalRegion);
    const demand = calculateWeightedDemand(
      finalRegion,
      finalProjectType,
      finalAudience
    );
    const recommendations = getRecommendations(
      iai,
      ss,
      finalProjectType,
      finalRegion
    );
    const risks = getTopRisks(finalProjectType, finalAudience);

    // Generate AI-powered response
    const aiResponse = await this.generateDetailedAnalysis({
      projectType: finalProjectType,
      region: finalRegion,
      audience: finalAudience,
      investmentAmount: finalInvestment,
      iai,
      ss,
      demand,
      recommendations,
      risks,
    });

    // Store context for follow-up questions
    this.currentContext = {
      projectType: finalProjectType,
      region: finalRegion,
      audience: finalAudience,
      investmentAmount: finalInvestment,
      iai,
      ss,
      demand,
      recommendations,
      risks,
    };

    return this.generateResponse(aiResponse, {
      type: "analysis",
      data: this.currentContext,
    });
  }

  // Generate detailed AI analysis
  async generateDetailedAnalysis(projectData) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    بناءً على البيانات التالية، قدم تحليلاً شاملاً ومفصلاً:

    بيانات المشروع:
    - المنطقة: ${projectData.region}
    - نوع المشروع: ${projectTypes[projectData.projectType].name}
    - الجمهور المستهدف: ${targetAudiences[projectData.audience].name}
    - مبلغ الاستثمار: ${projectData.investmentAmount.toLocaleString()} ريال عماني

    النتائج المحسوبة:
    - مؤشر الجاذبية الاستثمارية (IAI): ${projectData.iai}%
    - مؤشر الاستدامة (SS): ${projectData.ss}
    - الطلب المتوقع: ${projectData.demand.toLocaleString()}

    التوصيات: ${projectData.recommendations.map((r) => r.message).join(", ")}
    المخاطر: ${projectData.risks.map((r) => r.name).join(", ")}

    قدم تحليلاً شاملاً يتضمن:
    1. تقييم عام للمشروع (ممتاز/جيد/متوسط/ضعيف)
    2. نقاط القوة الرئيسية
    3. التحديات والمخاطر
    4. التوصيات العملية
    5. الجدول الزمني المقترح
    6. مؤشرات النجاح
    7. نصائح إضافية

    أجب باللغة العربية وبشكل منظم وواضح، مع استخدام الرموز التعبيرية لجعل النص أكثر جاذبية.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      return this.generateFallbackAnalysis(projectData);
    }
  }

  // Handle clarification requests
  async handleClarification(analysis) {
    const missingFields = analysis.missingInfo || [];

    if (missingFields.includes("projectType")) {
      return this.generateResponse(`
🏢 أحتاج توضيحاً أكثر حول نوع المشروع:

ما نوع المشروع الذي تفكر فيه؟
🏨 فندق أو منتجع
🍽️ مطعم أو مقهى  
💻 شركة تقنية
🎪 أنشطة ترفيهية
🛍️ تجارة وتجزئة

أو اكتب وصفاً مفصلاً لفكرتك.
      `);
    }

    if (missingFields.includes("region")) {
      return this.generateResponse(`
📍 في أي منطقة تريد تنفيذ مشروعك؟

🏙️ صلالة (المركز الرئيسي)
🏖️ مرباط (الساحل الجنوبي)
⛰️ طاقة (المنطقة الجبلية)

أو اذكر المنطقة التي تفكر فيها.
      `);
    }

    if (missingFields.includes("investmentAmount")) {
      return this.generateResponse(`
💰 ما هو مبلغ الاستثمار المتوقع؟

💡 أمثلة:
- 50,000 - 100,000 ريال (مشروع صغير)
- 100,000 - 300,000 ريال (مشروع متوسط)
- 300,000+ ريال (مشروع كبير)

أو اذكر المبلغ بالتفصيل.
      `);
    }

    return this.generateResponse("هل يمكنك توضيح فكرتك أكثر؟");
  }

  // Handle general questions
  async handleGeneralQuestion(message) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    أنت مستشار استثماري متخصص في محافظة ظفار. أجب على السؤال التالي:

    السؤال: "${message}"

    قدم إجابة مفيدة ومفصلة باللغة العربية، مع التركيز على:
    - الفرص الاستثمارية في ظفار
    - أنواع المشاريع المناسبة
    - النصائح العملية
    - المعلومات المحلية

    أجب بشكل ودود ومهني.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return this.generateResponse(response.text());
    } catch (error) {
      return this.generateResponse(
        "أعتذر، لا أستطيع الإجابة على هذا السؤال حالياً. هل يمكنك طرح سؤال حول فكرة استثمارية محددة؟"
      );
    }
  }

  // Generate response with metadata
  generateResponse(content, metadata = {}) {
    const response = {
      content,
      timestamp: new Date(),
      metadata,
    };

    this.conversationHistory.push({
      role: "assistant",
      content: response.content,
      timestamp: response.timestamp,
    });

    return response;
  }

  // Basic intent analysis fallback
  basicIntentAnalysis(message) {
    const lowerMessage = message.toLowerCase();

    // Check for project types
    const projectKeywords = {
      hotels: ["فندق", "منتجع", "فندق", "hotel", "resort"],
      restaurants: ["مطعم", "مقهى", "مطعم", "restaurant", "cafe"],
      tech: ["تقنية", "تكنولوجيا", "برمجة", "tech", "software"],
      entertainment: ["ترفيه", "ألعاب", "أنشطة", "entertainment", "games"],
      retail: ["تجارة", "متجر", "تجزئة", "retail", "shop"],
    };

    const regionKeywords = {
      salalah: ["صلالة", "salalah"],
      mirbat: ["مرباط", "mirbat"],
      taqah: ["طاقة", "taqah"],
    };

    let detectedProjectType = null;
    let detectedRegion = null;

    for (const [type, keywords] of Object.entries(projectKeywords)) {
      if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
        detectedProjectType = type;
        break;
      }
    }

    for (const [region, keywords] of Object.entries(regionKeywords)) {
      if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
        detectedRegion = region;
        break;
      }
    }

    return {
      intent: detectedProjectType ? "project_evaluation" : "general_question",
      projectType: detectedProjectType,
      region: detectedRegion,
      audience: null,
      investmentAmount: null,
      confidence: 0.7,
      missingInfo: [],
      extractedText: message,
    };
  }

  // Generate fallback analysis
  generateFallbackAnalysis(projectData) {
    return `
🎯 تحليل مشروعك الاستثماري:

🏢 المشروع: ${projectTypes[projectData.projectType].name}
📍 المنطقة: ${dhofarRegions[projectData.region].name}
👥 الجمهور: ${targetAudiences[projectData.audience].name}
💰 الاستثمار: ${projectData.investmentAmount.toLocaleString()} ريال

📈 النتائج:
• مؤشر الجاذبية: ${projectData.iai}% ${
      projectData.iai >= 80
        ? "🟢 ممتاز"
        : projectData.iai >= 60
        ? "🟡 جيد"
        : "🔴 يحتاج تحسين"
    }
• مؤشر الاستدامة: ${projectData.ss} ${
      projectData.ss >= 2 ? "🟢 مستدام" : "🟡 يحتاج مراجعة"
    }
• الطلب المتوقع: ${projectData.demand.toLocaleString()}

💡 التوصيات:
${projectData.recommendations.map((r) => `• ${r.message}`).join("\n")}

⚠️ المخاطر:
${projectData.risks.map((r) => `• ${r.name}: ${r.description}`).join("\n")}

هل تريد تحليلاً أكثر تفصيلاً أو لديك أسئلة أخرى؟
    `;
  }

  // Get conversation history
  getConversationHistory() {
    return this.conversationHistory;
  }

  // Clear conversation
  clearConversation() {
    this.conversationHistory = [];
    this.currentContext = null;
  }
}

// Export singleton instance
export const aiChatbot = new AIChatbotService();
