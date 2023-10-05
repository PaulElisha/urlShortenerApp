const hamburger = document.querySelector('.fa-bars');
const dropDown = document.querySelector('.dropdown');

hamburger.addEventListener('click', () => {
  dropDown.style.top = '70px';
})

// console.log(dropDown.classList.toggle('.show'));

// url shortener

const urlInput = document.querySelector('.url-input');
const generateShortLink = document.querySelector('.shortenbtn');
const linkDiv = document.querySelector('.linkDiv');

generateShortLink.addEventListener('click', async (e) => {
  e.preventDefault();
  const urlToShorten = urlInput.value;
  try {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${urlToShorten}`);
    if (response.ok) {
      const data = await response.json();
      
      const newURL = document.createElement('div');
      newURL.classList.add('link-box');

      newURL.innerHTML = `
        <input class="resultLink" value="" readonly type="text">
        <button class='copyLink'>Copy</button>
        `
        
      linkDiv.prepend(newURL);

      const newInput = document.querySelector('.resultLink');
      newInput.value = data.result.short_link;

      const copyBtn = document.querySelector('.copyLink');

      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(newInput.value);
        copyBtn.textContent = 'Copied!'
        copyBtn.style.backgroundColor = 'hsl(260, 8%, 14%)';

        setTimeout(() => {
          copyBtn.textContent = 'Copy'
          copyBtn.style.backgroundColor = 'hsl(180, 66%, 49%)';
        }, 1000);
      });
      console.log(data);
    } else {
      throw new Error('Network response was not OK.');
    }
  } catch (err) {
    console.error(err);
  }
});
