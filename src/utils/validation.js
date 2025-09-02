// أدوات التحقق من صحة البيانات
export const validateProjectData = (projectData) => {
  const errors = [];

  if (
    !projectData.region ||
    !["salalah", "mirbat", "taqah"].includes(projectData.region)
  ) {
    errors.push("المنطقة مطلوبة ويجب أن تكون صلالة، مرباط، أو طاقة");
  }

  if (
    !projectData.projectType ||
    !["hotels", "restaurants", "tech", "entertainment", "retail"].includes(
      projectData.projectType
    )
  ) {
    errors.push("نوع المشروع مطلوب ويجب أن يكون من الأنواع المدعومة");
  }

  if (
    !projectData.audience ||
    !["tourists", "locals", "families", "business"].includes(
      projectData.audience
    )
  ) {
    errors.push("الجمهور المستهدف مطلوب ويجب أن يكون من الأنواع المدعومة");
  }

  if (
    !projectData.investment ||
    projectData.investment < 1000 ||
    projectData.investment > 10000000
  ) {
    errors.push(
      "مبلغ الاستثمار مطلوب ويجب أن يكون بين 1,000 و 10,000,000 ريال"
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateVoteData = (voteData) => {
  const errors = [];

  if (!voteData.vote || !["up", "down"].includes(voteData.vote)) {
    errors.push('نوع التصويت مطلوب ويجب أن يكون "up" أو "down"');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;

  return input
    .trim()
    .replace(/[<>]/g, "") // إزالة علامات HTML
    .substring(0, 1000); // تحديد الطول الأقصى
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

export const validateInvestmentAmount = (amount) => {
  const num = Number(amount);
  return !isNaN(num) && num >= 1000 && num <= 10000000;
};

export const validateRegion = (region) => {
  const validRegions = ["salalah", "mirbat", "taqah"];
  return validRegions.includes(region);
};

export const validateProjectType = (projectType) => {
  const validTypes = [
    "hotels",
    "restaurants",
    "tech",
    "entertainment",
    "retail",
  ];
  return validTypes.includes(projectType);
};

export const validateAudience = (audience) => {
  const validAudiences = ["tourists", "locals", "families", "business"];
  return validAudiences.includes(audience);
};
