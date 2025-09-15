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
    //location.reload()
}

// Comment POP-UP
function ConfirmPopup() {
  document.querySelector('div.confirm_popup').style.display = 'flex'
}

//Mudar a quantidade de logs visiveis
async function ChangePerPageValue(element) {
    document
        .querySelectorAll('div.per_page')
        .forEach((b) => b.classList.remove('active'))
    element.classList.add('active')

    env.MAX_VIEWS_PERPAGE = Number(element.innerText)
    await RenderLiveDetectionsController()
}

const list = document.querySelector('ul.detections_logs_list')

list.addEventListener('scroll', () => {
    const header = document.querySelector('div.detections_header')
    const head = document.querySelector('div.detections_head')

    if (list.scrollTop > 0) { // ponto do scroll para ativar o efeito
        header.classList.add('scrolled')
        head.classList.add('scrolled')
    } else {
        header.classList.remove('scrolled')
        head.classList.remove('scrolled')
    }
})