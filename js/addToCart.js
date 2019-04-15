// Add to cart
;(() => {
  //Request
  const method = 'GET'
  const url = './data/products.json'
  const preloader = document.querySelector('#preloader')
  const sidebarCart = document.querySelector('#sidebarCart')
  const productsList = document.querySelector('#products-list')
  const sidebarCartList = document.querySelector('#sidebarCartList')
  const sidebarCartQty = document.querySelector('#sidebarCartQty')
  const sidebarCartTotalPrice = document.querySelector('#sidebarCartTotalPrice')
  const basket = JSON.parse(localStorage.getItem('basket')) || []
  let products = []

  myShopData.loadData(url, 500).then(data => {
    products = data
    preloader ? preloader.classList.remove('preloader--is-active') : preloader
    var productItem = data
      .map(productItem => {
        return `
              <li class="products-list__item">
                <img src="${productItem.avatar_url}" alt="${productItem.title}" class="products-list__image">
                <p>${productItem.title}</p>
                <p><span>$</span>${productItem.price}</p>
                <button type="button" class="products-list__btn" data-id=${productItem.id}>Add to cart</button>
              </li>
              `
      })
      .join('')

    productsList.innerHTML = productItem
  })

  const addToCart = ({ id, price, title }) => {
    const alreadyInBasket = basket.find(item => item.id === id)

    if (alreadyInBasket) {
      alreadyInBasket.count++
    } else {
      basket.push({
        id,
        price,
        title,
        count: 1,
      })
    }

    localStorage.setItem('basket', JSON.stringify(basket))
  }

  const getBasketTotal = () => {
    return basket.reduce(
      (acc, cur) => {
        return {
          price: acc.price + cur.price * cur.count,
          count: acc.count + cur.count,
        }
      },
      { price: 0, count: 0 }
    )
  }

  productsList.addEventListener('click', event => {
    const target = event.target

    if (target.classList.contains('products-list__btn')) {
      var targetId = target.dataset.id
      const product = products.find(item => item.id === +targetId)
      if (product) {
        const { id, price, title } = product
        addToCart({ id, price, title })
        refreshBasket()
      }
    }
  })

  const refreshBasket = () => {
    const res = getBasketTotal()
    sidebarCartQty.innerHTML = res.count
    sidebarCartTotalPrice.innerHTML = res.price
  }

  refreshBasket()
})()
