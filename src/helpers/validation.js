const validateEmail = (email: string): boolean => {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(email);
};

const validatePassword = (password: string): boolean => {
  const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regExp.test(password);
};

const validateFullName = (fullName: string): boolean => {
  const regExp = /^[a-zA-Z ]{2,30}$/;
  return regExp.test(fullName);
};

const isEmpty = (data: string): boolean => data !== '';

module.exports = {
  validateEmail,
  validatePassword,
  validateFullName,
  isEmpty
}
