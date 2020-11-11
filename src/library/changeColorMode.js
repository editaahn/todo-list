export const changeColorMode = (target) => {

  const colorMode = document.documentElement.getAttribute("color-mode");
  console.log(colorMode)

  document.documentElement.setAttribute(
    "color-mode", 
    colorMode === 'light' 
      ? 'dark' 
      : 'light'
  );
}