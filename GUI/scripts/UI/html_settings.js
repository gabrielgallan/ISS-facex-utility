//Elementos HTML
const DetectionsList = document.querySelector('ul.detections_logs_list')
const checkBox = document.querySelector('input#ch1')
const form = document.querySelector('form.filter_container')
const liveFooter = document.querySelector('footer.live_detections')
const filterButton = document.querySelector('button.header_but.filter')
const liveButton = document.querySelector('button.header_but.live')
const cleanFilterButton = document.querySelector('button.filter_but.clean')

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
    location.reload()
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

    config.MAX_VIEWS_PERPAGE = Number(element.innerText)
    await RenderLiveDetectionsController()
}

//Efeito do scroll - Lista de detecções
DetectionsList.addEventListener('scroll', () => {
    const header = document.querySelector('div.detections_header')
    const head = document.querySelector('div.detections_head')

    if (DetectionsList.scrollTop > 0) { // ponto do scroll para ativar o efeito
        header.classList.add('scrolled')
        head.classList.add('scrolled')
    } else {
        header.classList.remove('scrolled')
        head.classList.remove('scrolled')
    }
})

//Funções do formulário de filtros
function ChangeFilterForm() {
    const state = form.style.display
    form.style.display = state === 'none' ? 'flex' : 'none'
}

function CleanFilterInputs() {
    Array.from(form.elements)
         .forEach(input => {
            if (input.tagName === 'INPUT' && input.id !== 'ch1')
                input.value = ''
            if (input.id === 'ch1')
                input.checked = false
         })
}

checkBox.addEventListener('change', () => {
    const maxCountDiv = document.querySelector('div.form_box.max')
    const maxCountInput = document.querySelector('input.input.max')
    if (checkBox.checked) {
        maxCountInput.value = 'Todos'
        maxCountDiv.style.pointerEvents = 'none'
        maxCountDiv.style.opacity = '0.4'
    }
    else {
        maxCountInput.value = ''
        maxCountDiv.style.pointerEvents = ''
        maxCountDiv.style.opacity = '1'
    }
})

form.addEventListener('submit', SubmitFilterController)

async function SubmitFilterController(e) {
    e.preventDefault() // evita o envio real do form
    TurnFilteredMode()

    // Capturando valores dos inputs
    const start_time = DateFormFormatter((form.elements['start_date'].value), (form.elements['start_time'].value))
    const end_time = DateFormFormatter((form.elements['end_date'].value), (form.elements['end_time'].value))
    const max_count = form.elements['max_count'].value === 'Todos' ? null : form.elements['max_count'].value
    console.log({ start_time, end_time, max_count })

    //Renderiza a página
    await RenderFilteredDetectionsController(start_time, end_time, max_count)
}

function DateFormFormatter(date, time) {
    return date + 'T' + time + ':00.000'
}

function TurnFilteredMode() {
    ProcessISS_Script(UnSubscribeDetectionEvents)
    filterButton.classList.add('activate')
    liveButton.classList.remove('activate')
    cleanFilterButton.style.display = ''
    liveFooter.style.display = 'none'
}

async function TurnLiveMode() {
    ProcessISS_Script(SubscribeDetectionEvents)

    CleanFilterInputs()
    liveFooter.style.display = 'flex'
    form.style.display = 'none'
    filterButton.classList.remove('activate')
    liveButton.classList.add('activate')
    cleanFilterButton.style.display = 'none'
    await RenderLiveDetectionsController()
}