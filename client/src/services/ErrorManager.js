class ErrorManager {
  showErrorMessage (message) {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert"><i class="fas fa-exclamation-triangle"></i> &nbsp ' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    document.getElementById('liveAlertPlaceholder').appendChild(wrapper)
  }
}

export default new ErrorManager()
