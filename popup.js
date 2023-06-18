document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const extensionSelect = document.getElementById('extensionSelect');
  const convertBtn = document.getElementById('convertBtn');
  const message = document.getElementById('message');
  const selectedFileName = document.getElementById('selectedFileName');
  let selectedExtension = null;
  let file = null;

  fileInput.addEventListener('change', () => {
    file = fileInput.files[0];
    selectedFileName.textContent = file ? file.name : '';
  });

  extensionSelect.addEventListener('change', () => {
    selectedExtension = extensionSelect.value;
  });

  convertBtn.addEventListener('click', () => {
    if (!selectedExtension) {
      message.textContent = 'Please select an extension first.';
      return;
    }

    if (!file) {
      message.textContent = 'Please select an image file.';
      return;
    }

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const image = new Image();
      image.src = reader.result;

      image.addEventListener('load', () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        const dataURL = canvas.toDataURL(`image/${selectedExtension}`);
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = `converted_image.${selectedExtension}`;
        downloadLink.click();

        message.textContent = 'Image converted and downloaded successfully!';
      });
    });

    reader.readAsDataURL(file);
  });

  const fileDropArea = document.getElementById('fileDropArea');

  fileDropArea.addEventListener('dragenter', (e) => {
    e.preventDefault();
    fileDropArea.classList.add('drag-over');
  });

  fileDropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  fileDropArea.addEventListener('dragleave', () => {
    fileDropArea.classList.remove('drag-over');
  });

  fileDropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    fileDropArea.classList.remove('drag-over');

    file = e.dataTransfer.files[0];
    selectedFileName.textContent = file ? file.name : '';
  });
});


const currentYear = new Date().getFullYear();
const currentYearElement = document.getElementById('currentYear');
currentYearElement.textContent = currentYear;
