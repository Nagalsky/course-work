// Request to server
;(function() {
  var method = 'GET'
  var url = './data/data.json'
  var preloader = document.querySelector('#preloader')
  var productsList = document.querySelector('#products-list')

  function ajax(url, method) {
    return fetch(url).then(function(response) {
      return response.json()
    })
  }

  setTimeout(function() {
    ajax(url, method).then(function(data) {
      //console.log(data)
      preloader ? preloader.classList.remove('preloader--is-active') : preloader
      var productItem = data
        .map(function(productItem) {
          return (
            '<li class="products-list__item">' +
            '<img src="' +
            productItem.avatar_url +
            '" class="products-list__image" />' +
            '<p>' +
            productItem.title +
            '</p>' +
            '<p>' +
            '<span>' +
            '$' +
            '</span>' +
            productItem.price +
            '</p>' +
            '<button type="button" class="products-list__btn">' +
            'Add to cart' +
            '</button>' +
            '</li>'
          )
        })
        .join('')

      productsList.innerHTML = productItem
    })
  }, 2500)
})()
