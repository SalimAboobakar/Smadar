import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// خدمة تصدير تقرير PDF
export const exportToPDF = async (projectData, results, votingData) => {
  try {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // إعداد الخط العربي
    pdf.addFont(
      "https://fonts.gstatic.com/s/amiri/v27/J7aRnpd8CGxBHqUpvrIw74NL.woff2",
      "Amiri",
      "normal"
    );
    pdf.setFont("Amiri");

    // العنوان الرئيسي
    pdf.setFontSize(24);
    pdf.setTextColor(59, 130, 246); // أزرق
    pdf.text("منصة تدوم - تقرير التحليل الاستثماري", pageWidth / 2, 20, {
      align: "center",
    });

    // خط فاصل
    pdf.setDrawColor(59, 130, 246);
    pdf.setLineWidth(0.5);
    pdf.line(20, 25, pageWidth - 20, 25);

    let yPosition = 35;

    // معلومات المشروع
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text("معلومات المشروع", 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    pdf.text(`المنطقة: ${projectData.region}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`نوع المشروع: ${projectData.projectType}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`الجمهور المستهدف: ${projectData.audience}`, 20, yPosition);
    yPosition += 7;
    pdf.text(
      `مبلغ الاستثمار: ${projectData.investment.toLocaleString()} ريال عماني`,
      20,
      yPosition
    );
    yPosition += 15;

    // المؤشرات الرئيسية
    pdf.setFontSize(16);
    pdf.text("المؤشرات الرئيسية", 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    pdf.text(`مؤشر الجاذبية الاستثمارية (IAI): ${results.iai}%`, 20, yPosition);
    yPosition += 7;
    pdf.text(`مؤشر الاستدامة (SS): ${results.ss}`, 20, yPosition);
    yPosition += 7;
    pdf.text(
      `الطلب المتوقع: ${results.demand.toLocaleString()}`,
      20,
      yPosition
    );
    yPosition += 7;
    pdf.text(`عدد المخاطر: ${results.risks.length}`, 20, yPosition);
    yPosition += 15;

    // التوصيات
    pdf.setFontSize(16);
    pdf.text("التوصيات", 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    results.recommendations.forEach((rec, index) => {
      if (yPosition > pageHeight - 20) {
        pdf.addPage();
        yPosition = 20;
      }

      const color =
        rec.type === "success"
          ? [34, 197, 94]
          : rec.type === "warning"
          ? [245, 158, 11]
          : rec.type === "error"
          ? [239, 68, 68]
          : [59, 130, 246];

      pdf.setTextColor(color[0], color[1], color[2]);
      pdf.text(`• ${rec.message}`, 20, yPosition);
      yPosition += 7;
    });

    yPosition += 10;
    pdf.setTextColor(0, 0, 0);

    // المخاطر
    if (results.risks.length > 0) {
      pdf.setFontSize(16);
      pdf.text("المخاطر المحتملة", 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(12);
      results.risks.forEach((risk, index) => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.text(`• ${risk.name}: ${risk.description}`, 20, yPosition);
        yPosition += 7;
      });

      yPosition += 10;
    }

    // بيانات التصويت المجتمعي
    if (votingData) {
      pdf.setFontSize(16);
      pdf.text("رأي المجتمع", 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(12);
      pdf.text(`إجمالي الأصوات: ${votingData.total}`, 20, yPosition);
      yPosition += 7;
      pdf.text(`أصوات الموافقة: ${votingData.up}`, 20, yPosition);
      yPosition += 7;
      pdf.text(`أصوات الرفض: ${votingData.down}`, 20, yPosition);
      yPosition += 7;

      const approvalRate =
        votingData.total > 0
          ? Math.round((votingData.up / votingData.total) * 100)
          : 0;
      pdf.text(`نسبة الموافقة: ${approvalRate}%`, 20, yPosition);
      yPosition += 15;
    }

    // تذييل الصفحة
    const currentDate = new Date().toLocaleDateString("ar-SA");
    pdf.setFontSize(10);
    pdf.setTextColor(128, 128, 128);
    pdf.text(
      `تم إنشاء التقرير في: ${currentDate}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
    pdf.text(
      "منصة تدوم - ذكاء استثماري بلمسة المجتمع",
      pageWidth / 2,
      pageHeight - 5,
      { align: "center" }
    );

    // حفظ الملف
    const fileName = `تقرير_تدوم_${projectData.region}_${
      projectData.projectType
    }_${Date.now()}.pdf`;
    pdf.save(fileName);

    return true;
  } catch (error) {
    console.error("خطأ في تصدير PDF:", error);
    throw error;
  }
};

// خدمة تصدير مخطط بياني كصورة
export const exportChartAsImage = async (chartElement, fileName) => {
  try {
    const canvas = await html2canvas(chartElement, {
      backgroundColor: "transparent",
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = fileName;
    link.href = imgData;
    link.click();

    return true;
  } catch (error) {
    console.error("خطأ في تصدير المخطط:", error);
    throw error;
  }
};

// خدمة تصدير تقرير شامل مع المخططات
export const exportComprehensiveReport = async (
  projectData,
  results,
  votingData,
  chartElements
) => {
  try {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // إعداد الخط العربي
    pdf.addFont(
      "https://fonts.gstatic.com/s/amiri/v27/J7aRnpd8CGxBHqUpvrIw74NL.woff2",
      "Amiri",
      "normal"
    );
    pdf.setFont("Amiri");

    // العنوان الرئيسي
    pdf.setFontSize(24);
    pdf.setTextColor(59, 130, 246);
    pdf.text("منصة تدوم - تقرير شامل", pageWidth / 2, 20, { align: "center" });

    // إضافة المخططات كصور
    if (chartElements && chartElements.length > 0) {
      for (let i = 0; i < chartElements.length; i++) {
        if (i > 0) pdf.addPage();

        const canvas = await html2canvas(chartElements[i], {
          backgroundColor: "white",
          scale: 1.5,
        });

        const imgData = canvas.toDataURL("image/png");
        const imgWidth = pageWidth - 40;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 20, 30, imgWidth, imgHeight);
      }
    }

    // حفظ الملف
    const fileName = `تقرير_شامل_تدوم_${Date.now()}.pdf`;
    pdf.save(fileName);

    return true;
  } catch (error) {
    console.error("خطأ في تصدير التقرير الشامل:", error);
    throw error;
  }
};

export default {
  exportToPDF,
  exportChartAsImage,
  exportComprehensiveReport,
};
