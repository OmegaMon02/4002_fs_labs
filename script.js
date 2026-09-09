document.addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear();
  const copyright = document.getElementById('copyright');

  if (copyright) {
    copyright.textContent = `Copyright Pixell River Financial ${year}.`;
  }
});
