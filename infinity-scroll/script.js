const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

//use let here because values change every request
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//unsplah API
// set initial count to 5 for performance, change to 30 later
let count =  5;
const apiKey = 'bd8a-FfsLY4aSh7w3qykkIOh5gwabp4iKQtenBMnoKw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    initialLoad = false;
    count = 30;
    // since we updated the URL count to 30, we need to update the apiURL as well
    const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

// Helper function to set attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Create Elements For Links and Photos, add to DOM
function displayPhotos() {
  // reset image count
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // run function for each object in photos array
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplasn
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside image container Elements
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Get photos from Unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch error here
  }
}

//Check to see if scrolling near bottom of page, Load more photos Array
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});



//On Loader
getPhotos();
