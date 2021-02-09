const api = require('./api')

const menu = {

  init: ({tree, mainClass}) => {
      const config = {
      method: "GET",
      url: `/api/catalog_system/pub/category/tree/${tree}`,
    }

    document.querySelector('.header__nav-bar ul').innerHTML = ''

    const callbackMenu = (data) => {
      menu.render({data, mainClass})
    }
 
    api(config, callbackMenu)
  },

  render: ({data, mainClass}) => {

    const $mainClass = typeof mainClass == 'string' ? document.querySelector(`.${mainClass}`) : mainClass
    const mainClassName = typeof mainClass != 'string' ? mainClass.classList[0] : mainClass 

    data.forEach(category => {
      const { name, url , hasChildren, children} = category

      const newCategory = document.createElement('li')
      newCategory.classList.add(`${mainClassName}-item`)
      
      
      const newCategoryLink = document.createElement('a');
      newCategoryLink.href = url
      newCategoryLink.textContent = name

      const newCategoryBox = document.createElement('div')
      newCategoryBox.classList.add(`${mainClassName}-box-category`)

      newCategory.appendChild(newCategoryLink);
      if (hasChildren) newCategory.appendChild(newCategoryBox)
      $mainClass.appendChild(newCategory)

      if(hasChildren) menu.render({data: children, mainClass: newCategoryBox })
    });
  }
 
}

module.exports = menu;