/**
 * Password validation rules and strength evaluation
 */

export const PASSWORD_REQUIREMENTS = [
  { id: "length", label: "At least 8 characters", test: (pw) => pw.length >= 8 },
  { id: "uppercase", label: "One uppercase letter (A-Z)", test: (pw) => /[A-Z]/.test(pw) },
  { id: "lowercase", label: "One lowercase letter (a-z)", test: (pw) => /[a-z]/.test(pw) },
  { id: "number", label: "One number (0-9)", test: (pw) => /[0-9]/.test(pw) },
  { id: "special", label: "One special character (!@#$%^&*)", test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) },
];

export const calculatePasswordStrength = (password = "") => {
  if (!password) {
    return { score: 0, label: "Empty", color: "#6b7280", percent: 0, passedRules: [] };
  }

  const passedRules = PASSWORD_REQUIREMENTS.filter((req) => req.test(password)).map((r) => r.id);
  const score = passedRules.length;

  if (score <= 1) {
    return { score, label: "Very Weak", color: "#ef4444", percent: 20, passedRules };
  } else if (score === 2) {
    return { score, label: "Weak", color: "#f97316", percent: 40, passedRules };
  } else if (score === 3) {
    return { score, label: "Moderate", color: "#facc15", percent: 60, passedRules };
  } else if (score === 4) {
    return { score, label: "Strong", color: "#3b82f6", percent: 80, passedRules };
  } else {
    return { score, label: "Very Strong", color: "#10b981", percent: 100, passedRules };
  }
};
