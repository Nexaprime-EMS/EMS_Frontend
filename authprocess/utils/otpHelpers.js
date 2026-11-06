/**
 * OTP helper functions
 */

export const maskEmail = (email = "") => {
  if (!email || !email.includes("@")) return email;
  const [name, domain] = email.split("@");
  if (name.length <= 2) return `${name}***@${domain}`;
  return `${name[0]}${"*".repeat(name.length - 2)}${name[name.length - 1]}@${domain}`;
};

export const maskPhoneNumber = (phone = "") => {
  if (!phone || phone.length < 6) return phone;
  const visibleLast = phone.slice(-4);
  const hiddenPart = "*".repeat(phone.length - 4);
  return `${hiddenPart}${visibleLast}`;
};

export const formatTimer = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
