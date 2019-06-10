export const getFullName = user => {
  const { firstName, lastName } = user.profile;

  let fullName = firstName;
  if (lastName) fullName += ' ' + lastName;

  return fullName;
};
