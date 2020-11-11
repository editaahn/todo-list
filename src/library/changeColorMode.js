export const changeColorMode = () => {
  const colorMode = document.documentElement.getAttribute("color-mode");

  const switchColorMode = (tobe) => {
    document.documentElement.setAttribute("color-mode", tobe);
    localStorage.setItem("color-mode", tobe);
  };

  switchColorMode(colorMode === 'light' ? 'dark' : 'light');
}