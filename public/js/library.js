class Http {
  static get(url, cb) {
    const xhr = new XMLHttpRequest()
    xhr.open('get', url)

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        cb(null, JSON.parse(xhr.responseText))
      }
    }

    xhr.send()
  }
}