import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Shield,
  Target,
  AlertTriangle,
  Lightbulb,
  Star,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Zap,
  Eye
} from "lucide-react";
import AnimatedCard from "./ui/AnimatedCard";
import { analyzePortfolio, getMarketSentiment, getInvestmentScoreBadge } from "../services/aiInvestmentAdvisor";

const AIInvestmentAdvisor = ({ portfolio, marketData }) => {
  const [analysis, setAnalysis] = useState(null);
  const [marketSentiment, setMarketSentiment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performAnalysis = async () => {
      setLoading(true);
      try {
        // Simulate AI processing time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const portfolioAnalysis = analyzePortfolio(portfolio, marketData);
        const sentiment = getMarketSentiment();
        
        setAnalysis(portfolioAnalysis);
        setMarketSentiment(sentiment);
      } catch (error) {
        console.error("Error in AI analysis:", error);
      } finally {
        setLoading(false);
      }
    };

    performAnalysis();
  }, [portfolio, marketData]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <AnimatedCard key={i} className="h-48 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full mx-auto mb-4"
              />
              <p className="text-white/70">تحليل ذكي جاري...</p>
            </div>
          </AnimatedCard>
        ))}
      </div>
    );
  }

  if (!analysis) {
    return (
      <AnimatedCard className="text-center py-12">
        <Brain className="w-16 h-16 text-primary-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">خطأ في التحليل</h3>
        <p className="text-white/70">تعذر تحليل محفظتك الاستثمارية</p>
      </AnimatedCard>
    );
  }

  const scoreBadge = getInvestmentScoreBadge(analysis.overallScore);

  return (
    <div className="space-y-6">
      {/* AI Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-primary-400" />
          <h2 className="text-2xl font-bold text-white">المستشار الاستثماري الذكي</h2>
        </div>
        <p className="text-white/70">تحليل ذكي شامل لمحفظتك الاستثمارية مع نصائح مخصصة</p>
      </motion.div>

      {/* Main Scores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Overall Score */}
        <AnimatedCard className="text-center">
          <div className="p-6">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${
              scoreBadge.color === 'green' ? 'from-green-500 to-green-600' :
              scoreBadge.color === 'accent' ? 'from-accent-500 to-accent-600' :
              scoreBadge.color === 'yellow' ? 'from-yellow-500 to-yellow-600' :
              scoreBadge.color === 'orange' ? 'from-orange-500 to-orange-600' :
              'from-red-500 to-red-600'
            } flex items-center justify-center text-2xl mx-auto mb-4`}>
              {scoreBadge.icon}
            </div>
            <div className="text-3xl font-bold text-white mb-2">{analysis.overallScore}</div>
            <div className="text-sm text-white/70 mb-1">النتيجة الإجمالية</div>
            <div className={`text-sm font-medium ${
              scoreBadge.color === 'green' ? 'text-green-400' :
              scoreBadge.color === 'accent' ? 'text-accent-400' :
              scoreBadge.color === 'yellow' ? 'text-yellow-400' :
              scoreBadge.color === 'orange' ? 'text-orange-400' :
              'text-red-400'
            }`}>
              {scoreBadge.level}
            </div>
          </div>
        </AnimatedCard>

        {/* Risk Score */}
        <AnimatedCard className="text-center">
          <div className="p-6">
            <Shield className="w-8 h-8 text-primary-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-white mb-2">{analysis.riskScore}%</div>
            <div className="text-sm text-white/70 mb-1">مستوى المخاطر</div>
            <div className={`text-sm font-medium ${
              analysis.riskScore > 70 ? 'text-red-400' :
              analysis.riskScore > 40 ? 'text-yellow-400' :
              'text-green-400'
            }`}>
              {analysis.riskScore > 70 ? 'عالي' :
               analysis.riskScore > 40 ? 'متوسط' : 'منخفض'}
            </div>
          </div>
        </AnimatedCard>

        {/* Diversification Score */}
        <AnimatedCard className="text-center">
          <div className="p-6">
            <PieChart className="w-8 h-8 text-accent-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-white mb-2">{analysis.diversificationScore}</div>
            <div className="text-sm text-white/70 mb-1">درجة التنويع</div>
            <div className={`text-sm font-medium ${
              analysis.diversificationScore > 70 ? 'text-green-400' :
              analysis.diversificationScore > 40 ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {analysis.diversificationScore > 70 ? 'ممتاز' :
               analysis.diversificationScore > 40 ? 'جيد' : 'ضعيف'}
            </div>
          </div>
        </AnimatedCard>

        {/* Performance Score */}
        <AnimatedCard className="text-center">
          <div className="p-6">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-white mb-2">{analysis.performanceScore}</div>
            <div className="text-sm text-white/70 mb-1">درجة الأداء</div>
            <div className={`text-sm font-medium ${
              analysis.performanceScore > 70 ? 'text-green-400' :
              analysis.performanceScore > 40 ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {analysis.performanceScore > 70 ? 'متفوق' :
               analysis.performanceScore > 40 ? 'مقبول' : 'ضعيف'}
            </div>
          </div>
        </AnimatedCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <AnimatedCard>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">رؤى ذكية</h3>
            </div>
            <div className="space-y-4">
              {analysis.insights.length > 0 ? analysis.insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-l-4 ${
                    insight.type === 'success' ? 'bg-green-500/10 border-green-500' :
                    insight.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500' :
                    insight.type === 'danger' ? 'bg-red-500/10 border-red-500' :
                    'bg-primary-500/10 border-primary-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg">{insight.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{insight.title}</h4>
                      <p className="text-sm text-white/70">{insight.message}</p>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="text-center py-8">
                  <Eye className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                  <p className="text-white/70">لا توجد رؤى متاحة حالياً</p>
                </div>
              )}
            </div>
          </div>
        </AnimatedCard>

        {/* Recommendations */}
        <AnimatedCard>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-accent-400" />
              <h3 className="text-xl font-bold text-white">توصيات ذكية</h3>
            </div>
            <div className="space-y-4">
              {analysis.recommendations.length > 0 ? analysis.recommendations.slice(0, 3).map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-primary-500/10 rounded-lg border border-primary-500/20"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white">{rec.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      rec.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                      rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {rec.priority === 'high' ? 'عاجل' :
                       rec.priority === 'medium' ? 'مهم' : 'اختياري'}
                    </span>
                  </div>
                  <p className="text-sm text-white/70 mb-3">{rec.description}</p>
                  <button className="text-sm text-accent-400 hover:text-accent-300 font-medium">
                    {rec.action} ←
                  </button>
                </motion.div>
              )) : (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-accent-400 mx-auto mb-4" />
                  <p className="text-white/70">لا توجد توصيات متاحة حالياً</p>
                </div>
              )}
            </div>
          </div>
        </AnimatedCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Warnings */}
        {analysis.warnings.length > 0 && (
          <AnimatedCard>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h3 className="text-xl font-bold text-white">تحذيرات مهمة</h3>
              </div>
              <div className="space-y-4">
                {analysis.warnings.map((warning, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-l-4 ${
                      warning.severity === 'high' ? 'bg-red-500/10 border-red-500' :
                      'bg-yellow-500/10 border-yellow-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg">{warning.icon}</span>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{warning.title}</h4>
                        <p className="text-sm text-white/70 mb-2">{warning.message}</p>
                        <p className="text-sm text-accent-400 font-medium">{warning.recommendation}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedCard>
        )}

        {/* Market Opportunities */}
        <AnimatedCard>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">فرص السوق</h3>
            </div>
            <div className="space-y-4">
              {analysis.opportunities.length > 0 ? analysis.opportunities.slice(0, 3).map((opp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-lg border border-accent-500/20"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white">{opp.opportunity.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      opp.priority === 'high' ? 'bg-green-500/20 text-green-300' :
                      'bg-accent-500/20 text-accent-300'
                    }`}>
                      {opp.priority === 'high' ? 'مميزة' : 'جيدة'}
                    </span>
                  </div>
                  <p className="text-sm text-white/70 mb-2">{opp.reason}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-400">
                      عائد متوقع: {opp.expectedROI}%
                    </span>
                    <span className="text-accent-400">
                      {opp.sector}
                    </span>
                  </div>
                </motion.div>
              )) : (
                <div className="text-center py-8">
                  <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <p className="text-white/70">لا توجد فرص متاحة حالياً</p>
                </div>
              )}
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Market Sentiment */}
      {marketSentiment && (
        <AnimatedCard>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-primary-400" />
              <h3 className="text-xl font-bold text-white">معنويات السوق</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">{marketSentiment.overall}</div>
                <div className="text-sm text-white/70">الحالة العامة</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-400 mb-2">{marketSentiment.score}</div>
                <div className="text-sm text-white/70">نقاط الثقة</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">{marketSentiment.trend}</div>
                <div className="text-sm text-white/70">الاتجاه</div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">عوامل إيجابية</h4>
                <ul className="space-y-2">
                  {marketSentiment.factors.map((factor, index) => (
                    <li key={index} className="text-sm text-green-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">مخاطر محتملة</h4>
                <ul className="space-y-2">
                  {marketSentiment.risks.map((risk, index) => (
                    <li key={index} className="text-sm text-yellow-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </AnimatedCard>
      )}
    </div>
  );
};

export default AIInvestmentAdvisor;
