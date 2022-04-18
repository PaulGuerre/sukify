class InfoManager {
  showInfo (message, type) {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert"><i class="fas fa-exclamation"></i> &nbsp ' + message + '<button type="button" class="btn-close" id="errorCloseButton" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    document.getElementById('liveAlertPlaceholder').appendChild(wrapper)

    setTimeout(() => {
      document.getElementById('errorCloseButton').click()
    }, 3000)
  }
}

export default new InfoManager()
