export const getScrollDownPercentage = () => {
  const pageHeight = window.document.documentElement.scrollHeight;
  const clientHeight = window.document.documentElement.clientHeight;
  const scrollPos = window.pageYOffset;
  const currentPos = scrollPos + clientHeight;
  const percentageScrolled = currentPos / pageHeight;
  return percentageScrolled;
};
