document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.overlay');
    const holeSpans = document.querySelectorAll('.hole');

    const maskCanvas = document.createElement('canvas');
    const ctx = maskCanvas.getContext('2d');

    document.querySelector('.container').appendChild(maskCanvas);

    maskCanvas.style.position = 'absolute';
    maskCanvas.style.top = '0';
    maskCanvas.style.left = '0';
    maskCanvas.style.width = '100%';
    maskCanvas.style.height = '100%';
    maskCanvas.style.pointerEvents = 'none';
    maskCanvas.style.opacity = '0';

    function updateMaskCanvas() {
        const overlayRect = overlay.getBoundingClientRect();

        maskCanvas.width = overlayRect.width;
        maskCanvas.height = overlayRect.height;

        ctx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
        ctx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
        ctx.globalCompositeOperation = 'destination-out';
        holeSpans.forEach(span => {
            const spanRect = span.getBoundingClientRect();
            const holeX = spanRect.left - overlayRect.left;
            const holeY = spanRect.top - overlayRect.top;
            const holeWidth = spanRect.width;
            const holeHeight = spanRect.height;

            ctx.fillRect(holeX, holeY, holeWidth, holeHeight);
        });

        ctx.globalCompositeOperation = 'source-over';

        const maskDataUrl = maskCanvas.toDataURL();

        overlay.style.maskImage = `url(${maskDataUrl})`;
        overlay.style.webkitMaskImage = `url(${maskDataUrl})`;
    }
    updateMaskCanvas();
    window.addEventListener('resize', updateMaskCanvas);
});
