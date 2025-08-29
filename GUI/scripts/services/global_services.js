// Error POP-UP
class ErrorPopup {
    constructor(message) {
        this.popup = document.querySelector('div#error_popup')
        this.message = document.querySelector('p#error_text')

        this.popup.style.display = 'flex'
        this.message.innerText = message
        console.error(message)
    }

    close() {
        this.popup.style.display = 'none'
    }
}

function ClosePopup() {
    document.getElementById('error_popup').style.display='none'
}

function ReloadPage() {
    location.reload()
}

// Comment POP-UP
function ConfirmPopup() {
  document.querySelector('div.confirm_popup').style.display = 'flex'
}