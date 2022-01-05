export const statusColorTheme = (status: string) => {
  switch (status) {
    case 'expired':
      return 'error';
    case 'posted':
      return 'success';
    case 'applied':
      return 'info';
    case 'hired':
      return 'success';
    case 'rejected':
      return 'error';
    default:
      return 'success';
  }
};

export const statusColorHex = (status: string) => {
  switch (status) {
    case 'expired':
      return 'red';
    case 'posted':
      return 'green';
    case 'applied':
      return 'blue';
    case 'hired':
      return 'green';
    case 'rejected':
      return 'red';
    default:
      return 'green';
  }
};
