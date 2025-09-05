const icon = document.querySelector('img.facial_icon')
const detection_image = document.querySelector('img.detection_image')

function InsertImage(image_url) {
    icon.style.display = "none"
    detection_image.src = image_url
}