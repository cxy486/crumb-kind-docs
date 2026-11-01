const supportImage = document.querySelector('#support-image');
const supportFileError = document.querySelector('#support-file-error');
if (supportImage && supportFileError) {
  supportImage.addEventListener('change', () => {
    const file = supportImage.files[0];
    let error = '';
    if (file && file.size > 5 * 1024 * 1024) {
      error = 'This image is larger than 5 MB. Choose a smaller image or remove it and send the request without a screenshot.';
    } else if (file && !['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      error = 'Choose a PNG, JPEG or WebP image, or remove the attachment to continue.';
    }
    supportImage.setCustomValidity(error);
    supportImage.setAttribute('aria-invalid', String(Boolean(error)));
    supportFileError.textContent = error;
  });
}
