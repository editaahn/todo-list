export const changeMode = (target) => {

  const name = target.classList
  const darkModeClass = 'button--mode--dark';

  const elementStyleChange = (element, classHeader) => {
    name[0] === darkModeClass ? 
    element.classList.replace(`${classHeader}--dark`, `${classHeader}--light`)
    : element.classList.replace(`${classHeader}--light`, `${classHeader}--dark`)
  }

  elementStyleChange(document.getElementsByTagName("body")[0], 'body');

  elementStyleChange(document.getElementsByClassName("app-header")[0], 'app-header');

  document.querySelectorAll('.manager').forEach( managerEl => {
    elementStyleChange(managerEl, 'manager');
  })
  
  document.querySelectorAll('.generator__input').forEach( managerEl => {
    elementStyleChange(managerEl, 'generator__input');
  })
  
  elementStyleChange(target, 'button--mode');


}