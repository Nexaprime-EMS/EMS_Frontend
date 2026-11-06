/**
 * Authentication Service (Mock / API client ready)
 */

export const authService = {
  async login(roleId, credentials) {
    // Simulate API delay
    await new Promise((res) => setTimeout(res, 800));

    if (!credentials.identifier || !credentials.password) {
      throw new Error("Missing required credentials");
    }

    // Mock successful authentication
    return {
      success: true,
      token: "mock-jwt-token-ems-" + Date.now(),
      user: {
        id: "emp-" + Math.floor(1000 + Math.random() * 9000),
        role: roleId,
        name: `${roleId.replace("-", " ").toUpperCase()} User`,
        email: credentials.identifier.includes("@") ? credentials.identifier : `${credentials.identifier}@ems-enterprise.com`,
      },
    };
  },

  async forgotPassword(identifier) {
    await new Promise((res) => setTimeout(res, 600));
    if (!identifier) {
      throw new Error("Identifier is required");
    }
    return {
      success: true,
      message: "Verification code sent to registered contact",
      maskedDestination: identifier.includes("@") ? identifier : "+1 (***) ***-9281",
    };
  },

  async verifyOtp(otp, step = 1) {
    await new Promise((res) => setTimeout(res, 600));
    if (otp === "000000" || otp.length !== 6) {
      throw new Error("Invalid or expired OTP code. Try 123456.");
    }
    return {
      success: true,
      stepVerified: step,
      resetToken: "verified-reset-session-" + Date.now(),
    };
  },

  async resendOtp() {
    await new Promise((res) => setTimeout(res, 400));
    return {
      success: true,
      message: "A new security OTP has been dispatched.",
    };
  },

  async resetPassword(token, newPassword) {
    await new Promise((res) => setTimeout(res, 800));
    if (!newPassword || newPassword.length < 8) {
      throw new Error("New password does not meet security criteria");
    }
    return {
      success: true,
      message: "Password updated successfully. You can now log in.",
    };
  },

  async changePassword(currentPassword, newPassword) {
    await new Promise((res) => setTimeout(res, 800));
    if (!currentPassword) {
      throw new Error("Current password is required");
    }
    if (!newPassword || newPassword.length < 8) {
      throw new Error("New password does not meet security requirements");
    }
    return {
      success: true,
      message: "Password changed successfully.",
    };
  },

  async logout() {
    await new Promise((res) => setTimeout(res, 300));
    return { success: true };
  },
};

export default authService;
