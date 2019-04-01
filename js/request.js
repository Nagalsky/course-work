// Request to server
const myShopData = (() => {
  const loadData = (url, delay) => {
    return new Promise(resolve => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setTimeout(() => {
            resolve(data)
          }, delay)
        })
    })
  }

  return {
    loadData,
  }
})()
