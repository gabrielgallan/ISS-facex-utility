async function RenderDetectionImage(image) {
    const canvas = document.querySelector('canvas#canvas')
    canvas.style.display = ''
    const ctx = canvas.getContext('2d')

    // cria objeto imagem
    const img = new Image()
    img.src = image

    img.onload = () => {
        // ajusta tamanho do canvas para o da imagem
        canvas.width = img.width;
        canvas.height = img.height;

        // desenha a imagem no canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}