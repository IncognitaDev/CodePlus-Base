const Element = (props) => {
  const newElement = document.createElement(props?.elementType);
  
  props?.classList && newElement.classList.add(...props.classList);
  props?.children && newElement.append(...props.children);
  props?.src && (newElement.src = props.src);
  props?.textContent && (newElement.textContent = props.textContent);
  props?.href && (newElement.href = props.href)

  return newElement;
}

module.exports = Element