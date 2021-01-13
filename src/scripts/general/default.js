const menu = require('../modules/menu')
const MiniCart = require('../modules/minicart')

const Default = {
    init: function () {
        Default.menuInit()
        MiniCart.init('.header__carrinho')
    },

    menuInit: () => {
        const menuConfig = {
            tree: 3,
            mainClass: 'header__nav-bar-list'
        }
 
        menu.init(menuConfig);
    }

   
}

module.exports = Default