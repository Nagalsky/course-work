// Add to cart
;(() => {
  const sidebarCart = document.querySelector('#sidebarCart')
  const productsList = document.querySelector('#products-list')
  const sidebarCartList = document.querySelector('#sidebarCartList')
  const sidebarCartQty = document.querySelector('#sidebarCartQty')
  const sidebarCartTotalPrice = document.querySelector('#sidebarCartTotalPrice')
  const basket = []
  const data = './data/products.json'

  const addToCart = ({ id, price, title }) => {
    let alreadyHasProduct = false

    basket.find(item => {
      if (item.id === id) {
        item.count++
        alreadyHasProduct = !alreadyHasProduct
        return true
      }
      return false
    })

    if (!alreadyHasProduct) {
      basket.push({
        id,
        price,
        title,
        count: 1,
      })
    }

    sidebarCartQty.innerHTML = basket.length
    sidebarCartTotalPrice.innerHTML = basket.length * price

    console.log(basket)
  }

  productsList.addEventListener(
    'click',
    event => {
      var target = event.target

      if (target.classList.contains('products-list__btn')) {
        var targetId = target.dataset.id
        console.log(targetId)
        addToCart({ id: 0, price: 99, title: 'Name1' })
        addToCart({ id: 1, price: 70, title: 'Name2' })
        addToCart({ id: 2, price: 12, title: 'Name3' })
        addToCart({ id: 3, price: 233, title: 'Name4' })
      }
    },
    false
  )

  //productsList.addEventListener('click', addToCart, false)
})()
