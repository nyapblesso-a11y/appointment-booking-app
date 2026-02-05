// Check if email is valid
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Check if password is strong enough (min 6 chars)
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Check if role is valid
export const isValidRole = (role) => {
  return ['client', 'provider'].includes(role);
};
