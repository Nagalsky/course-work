// Request to server
;(() => {
  const method = 'GET'
  const url = './data/products.json'
  const preloader = document.querySelector('#preloader')
  const productsList = document.querySelector('#products-list')

  const ajax = (url, method) => fetch(url).then(response => response.json())

  setTimeout(() => {
    ajax(url, method).then(data => {
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
  }, 500)
})()
