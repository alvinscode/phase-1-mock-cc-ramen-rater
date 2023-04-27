const ramenMenu = document.querySelector('#ramen-menu');
const ramenDetail = document.querySelector('#ramen-detail');
const detailName = document.querySelector('h2.name');
const detailRestaurant = document.querySelector('h3.restaurant');
const detailImg = document.querySelector('img.detail-image')
const ramenRating = document.querySelector('#rating-display')
const ramenComment = document.querySelector('#comment-display')
const newRamenForm = document.querySelector('#new-ramen');

fetch('http://localhost:3000/ramens')
  .then(response => response.json())
  .then(data => {
    data.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.addEventListener('click', () => {
        detailName.textContent = ramen.name;
        detailRestaurant.textContent = ramen.restaurant;
        detailImg.src = ramen.image;
        ramenRating.textContent = ramen.rating;
        ramenComment.textContent = ramen.comment;
      });
      ramenMenu.appendChild(img);
    });
  })
  .catch(error => console.error(error));

  newRamenForm.addEventListener('submit', event => {
    event.preventDefault();
  
    const name = event.target.querySelector('#new-name').value;
    const restaurant = event.target.querySelector('#new-restaurant').value;
    const image = event.target.querySelector('#new-image').value;
    const rating = event.target.querySelector('#new-rating').value;
    const comment = event.target.querySelector('#new-comment').value;
  
    const newRamen = { name, restaurant, image, rating, comment};
  
    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRamen)
    })
      .then(response => response.json())
      .then(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.addEventListener('click', () => {
          detailName.textContent = ramen.name;
          detailRestaurant.textContent = ramen.restaurant;
          detailImg.src = ramen.image;
          ramenRating.textContent = ramen.rating;
          ramenComment.textContent = ramen.comment;
        });
        ramenMenu.appendChild(img);
      })
      .catch(error => console.error(error));
  
    event.target.reset();
  });