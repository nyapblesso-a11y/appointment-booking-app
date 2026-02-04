
// Validate email format
 
export const isValidEmail = (email) => {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

 // Validate password strength
 
export const isValidPassword = (password) => {
  return typeof password === 'string' && password.length >= 6;
};

// Validate role
export const isValidRole = (role) => {
  return ['client', 'provider'].includes(role);
};

// Validate appointment status
export const isValidAppointmentStatus = (status) => {
  return ['booked', 'canceled'].includes(status);
};

// Validate time slot input
export const isValidTimeSlot = (startTime, endTime) => {
  if (!startTime || !endTime) return false;
  return new Date(startTime) < new Date(endTime);
};
