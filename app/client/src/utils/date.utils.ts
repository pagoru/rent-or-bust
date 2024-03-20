export const dateUtils = () => {
  const getHourIndex = (): number => {
    const currentHour = new Date().getHours();
    if (currentHour >= 21 || currentHour < 6) {
      return 0;
    } else if (currentHour >= 6 && currentHour < 10) {
      return 1;
    } else if (currentHour >= 10 && currentHour < 17) {
      return 2;
    }
    return 3;
  };

  return {
    getHourIndex,
  };
};
