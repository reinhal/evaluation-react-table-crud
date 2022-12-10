const roleFormatter = (word) => word.charAt(0) + word.slice(1).toLowerCase();

export const roleHelper = (role) => {
  if (role !== 'APP_MANAGER') {
    return roleFormatter(role);
  } else {
    return role
      .split('_')
      .map((word) => roleFormatter(word))
      .join(' ');
  }
};

export const roleList = ['Admin', 'Developer', 'App Manager', 'Marketing', 'Sales'];