const Element = require('./element')
const formatReal = require('./formatReal')

const MiniCart =  {
  init: ({ minicartClass, containerClass, OuterBox }) =>{
    const $minicart = document.querySelector(minicartClass);

    $minicart.addEventListener('click', () => {
      MiniCart.create({ containerClass, OuterBox})
    })

    
  },

  create: ({containerClass, OuterBox}) => {
    const parentClass = containerClass ? containerClass : 'body'
    const $container = document.querySelector(parentClass)

    
    
    vtexjs.checkout.getOrderForm().done(function (orderForm) {
      console.log(orderForm)
      const itemsList = orderForm.items

      const miniCartBottomTotalValue = Element({
        elementType: 'strong',
        classList: ['minicart__bottom__top-wrapper__value'],
        textContent: `R${formatReal(orderForm.value)}`
      })
  
      const miniCartBottomTotalText = Element({
        elementType: 'p',
        textContent: 'Total (valor sem frete)'
      })
  
      const miniCartBottomBagLink = Element({
        elementType: 'a',
        textContent: 'ver minha sacola',
        href: '#'
      }) 
  
      const miniCartBottomTopLeftWrapper = Element({
        elementType: 'div',
        classList: ['minicart__bottom__top-wrapper__text'],
        children: [miniCartBottomTotalText, miniCartBottomBagLink]
      })
  
      const miniCartBottomPurchaseButton =  Element({
        elementType: 'button',
        classList: ['minicart__bottom__purchase-bottom'],
        textContent: 'Fechar pedido'
      })
  
      const miniCartBottomPurchaseMore = Element({
        elementType: 'a',
        textContent: 'continuar comprando',
        href: '#'
      }) 
  
      const miniCartBottomTop = Element({
        elementType: 'div',
        classList: ['minicart__bottom__top-wrapper'],
        children: [miniCartBottomTopLeftWrapper, miniCartBottomTotalValue]
      })
     
      const miniCartBottom = Element({
        elementType: 'div',
        classList: ['minicart__bottom'],
        children: [miniCartBottomTop, miniCartBottomPurchaseButton, miniCartBottomPurchaseMore]
      })
  
      const miniCartMiddle = Element({
        elementType: 'ul',
        classList: ['minicart__middle'],
        children: itemsList.map(product => MiniCart.product({
            imageUrl: product.imageUrl,
            name: product.name,
            price: product.price,
            listPrice: product.listPrice
          }))
      })
  
      const minicartTopText = Element({
        elementType: 'h3',
        textContent: 'meu carrinho'
      })
  
      const miniCartTopCart = Element({
        elementType: 'span',
        classList: ['minicart__top__cart-icon'],
      })
  
      const miniCartTop = Element({
        elementType: 'div',
        classList: ['minicart__top'],
        children: [miniCartTopCart, minicartTopText]
      })

      const exitIcon = Element({
        elementType: 'div',
        classList: ['minicart__exit-button__icon']
      })
  
      const exitButton = Element({
        elementType: 'div',
        classList: ['minicart__exit-button'],
        children: [exitIcon]
      });
  
      const container = Element({
        elementType: 'div',
        classList: ['minicart'],
        children: [exitButton, miniCartTop, miniCartMiddle, miniCartBottom]
      });
  
      const outerClickBox = Element({
        elementType: 'div',
        classList: ['minicart__exit-box'],
      })
  
      const outerBox = Element({
        elementType: 'div',
        classList: ['minicart__box'],
        children: [outerClickBox ,container]
      })
  
      OuterBox ? $container.appendChild(outerBox) : $container.appendChild(container)

      MiniCart.events()
    })

    
  },

  product: ({imageUrl, name, price, listPrice }) => {
    
   
     const productListPrice = Element({
      elementType: 'p',
      classList: ['minicart__list-price'],
      textContent: `R$${formatReal(listPrice)}`
    })

    const productPrice = Element({
      elementType: 'strong',
      classList: ['minicart__price'],
      textContent: `R$${formatReal(price)}`
    })

    const priceWrapper = Element({
      elementType: 'div',
      classList: ['minicart__product__price-wrapper'],
      children: [productListPrice, productPrice]
    })

    const productName = Element({
      elementType: 'strong',
      classList: ['minicart__name'],
      textContent: name
    })

    const rigthWrapper = Element({
      elementType: 'div',
      classList: ['minicart__product__right-wrapper'],
      children: [productName, priceWrapper]
    })

    const productImage = Element({
      elementType:  'img',
      classList: ['minicart__product__image'],
      src: imageUrl
    })

    const container = Element({
      elementType: 'li',
      classList: ['minicart__product'],
      children: [productImage, rigthWrapper]
    })

    return container
  },

  events: () => {
    const $minicartOuter = document.querySelector('.minicart__box')
    const $minicartExitBox = document.querySelector('.minicart__exit-box')
    const $minicartExitButton = document.querySelector('.minicart__exit-button')
    
    $minicartExitButton.addEventListener('click', ()=> {
      $minicartOuter.remove()
    })

    $minicartExitBox.addEventListener('click', ()=> {
      $minicartOuter.remove()
    })
  }


}

module.exports = MiniCart