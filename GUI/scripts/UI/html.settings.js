//Elementos HTML
const list = document.querySelector('ul.detections_logs_list')
const checkBox = document.querySelector('input#ch1')
const form = document.querySelector('form.filter_container')
const liveFooter = document.querySelector('footer.live_detections')
const filterButton = document.querySelector('button.filter_buttons.og')

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
    document.getElementById('error_popup').style.display = 'none'
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

//Efeito do scroll - Lista de detecções
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

//Funções do formulário de filtros
function ChangeFilterForm() {
    const form = document.querySelector('form.filter_container')

    if (form.style.display === 'flex') {
        form.style.display = 'none'
    }
    else {
        form.style.display = 'flex'
    }
}

checkBox.addEventListener('change', () => {
    if (checkBox.checked) {
        const maxCountDiv = document.querySelector('div.form_box.max')
        const maxCountInput = document.querySelector('input.input.max')

        maxCountInput.value = 'Todos'
        maxCountDiv.style.pointerEvents = 'none'
        maxCountDiv.style.opacity = '0.4'
    } else {
        const maxCountDiv = document.querySelector('div.form_box.max')
        const maxCountInput = document.querySelector('input.input.max')

        maxCountInput.value = ''
        maxCountDiv.style.pointerEvents = ''
        maxCountDiv.style.opacity = '1'
    }
})

form.addEventListener('submit', SubmitFilterController)

async function SubmitFilterController(e) {
    e.preventDefault() // evita o envio real do form
    filterButton.classList.add('filter_activate')

    // Capturando valores dos inputs
    const start_time = DateFormFormatter((form.elements['start_date'].value), (form.elements['start_time'].value))
    const end_time = DateFormFormatter((form.elements['end_date'].value), (form.elements['end_time'].value))
    const max_count = form.elements['max_count'].value === 'Todos' ? null : form.elements['max_count'].value
    console.log({ start_time, end_time, max_count })

    //Renderiza a página
    try {
        UnSubscribeDetectionEvents()
    } catch { }
    liveFooter.style.display = 'none'
    await RenderFilteredDetectionsController(start_time, end_time, max_count)
}

async function ReturnLiveDetectionsMode() {
    try {
        SubscribeDetectionEvents()
    } catch { }

    liveFooter.style.display = 'flex'
    await RenderLiveDetectionsController()
    ChangeFilterForm()
    filterButton.classList.remove('filter_activate')
}

function DateFormFormatter(date, time) {
    return date + 'T' + time + ':00.000'
}