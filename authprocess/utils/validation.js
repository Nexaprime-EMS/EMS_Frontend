/**
 * Input validation utilities
 */

export const isValidEmail = (email) => {
  if (!email || typeof email !== "string") return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

export const isValidEmployeeId = (id) => {
  if (!id || typeof id !== "string") return false;
  return id.trim().length >= 3;
};

export const isValidOtp = (otp, length = 6) => {
  if (!otp || typeof otp !== "string") return false;
  const regex = new RegExp(`^\\d{${length}}$`);
  return regex.test(otp.trim());
};

export const validateLoginForm = (identifier, password) => {
  const errors = {};
  if (!identifier || !identifier.trim()) {
    errors.identifier = "Email or Employee ID is required";
  }
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateResetPasswordForm = (newPassword, confirmPassword) => {
  const errors = {};
  if (!newPassword) {
    errors.newPassword = "New password is required";
  } else if (newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters long";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (newPassword !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
