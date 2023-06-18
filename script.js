// Retrieve the saved theme from local storage, default to dark theme if not found
const savedTheme = localStorage.getItem('theme');
const body = document.body;

// Apply the saved theme or default to dark theme
if (savedTheme === 'purple') {
  body.classList.add('purple-theme');
} else {
  body.classList.add('dark-theme');
}

// Add event listener to theme button
const themeButton = document.getElementById('themeButton');

themeButton.addEventListener('click', () => {
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('purple-theme');
    localStorage.setItem('theme', 'purple');
  } else {
    body.classList.remove('purple-theme');
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
});

// Add event listener to file input
const fileInput = document.getElementById('fileInput');
const selectedFileName = document.getElementById('selectedFileName');
const imagePreview = document.getElementById('imagePreview');

fileInput.addEventListener('change', (event) => {
  const files = event.target.files;
  selectedFileName.textContent = files.length > 0 ? `${files.length} file(s) selected` : '';

  imagePreview.innerHTML = '';
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      const previewImage = document.createElement('img');
      previewImage.src = e.target.result;
      previewImage.classList.add('preview-image');
      imagePreview.appendChild(previewImage);
    };

    reader.readAsDataURL(file);
  }
});

// Add event listeners to menu buttons
const themeBtn = document.getElementById('githubBtn');
const aboutBtn = document.getElementById('aboutBtn');
const donateBtn = document.getElementById('donateBtn');

themeBtn.addEventListener('click', () => {
  window.open('https://github.com/MRCYODev', '_blank');
});

aboutBtn.addEventListener('click', () => {
  window.open('https://mrcyo.com/', '_blank');
});

donateBtn.addEventListener('click', () => {
  window.open('https://paypal.me/MRCYOHD', '_blank');
});
