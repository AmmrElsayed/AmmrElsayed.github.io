document.getElementById('spot-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const imageInput = document.getElementById('image');
    const ratingInput = document.getElementById('rating');
    const reviewInput = document.getElementById('review');

    const imageFile = imageInput.files[0];
    const rating = ratingInput.value;
    const review = reviewInput.value;

    if (imageFile && rating && review) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const spotsList = document.getElementById('spots-list');
            const spotDiv = document.createElement('div');
            spotDiv.classList.add('spot');
            
            const imgElement = document.createElement('img');
            imgElement.src = event.target.result;
            spotDiv.appendChild(imgElement);
            
            const ratingElement = document.createElement('div');
            ratingElement.classList.add('rating');
            ratingElement.textContent = `Rating: ${rating}`;
            spotDiv.appendChild(ratingElement);

            const shortReviewElement = document.createElement('div');
            shortReviewElement.classList.add('short-review');
            shortReviewElement.textContent = review.length > 50 ? review.substring(0, 50) + '...' : review;
            spotDiv.appendChild(shortReviewElement);

            spotDiv.addEventListener('click', function() {
                alert(`Full Review:\n${review}`);
            });

            spotsList.appendChild(spotDiv);

            saveSpot(event.target.result, rating, review);

            imageInput.value = '';
            ratingInput.value = '';
            reviewInput.value = '';
        };
        reader.readAsDataURL(imageFile);
    }
});

function saveSpot(image, rating, review) {
    const spots = JSON.parse(localStorage.getItem('spots')) || [];
    spots.push({ image, rating, review });
    localStorage.setItem('spots', JSON.stringify(spots));
}

function loadSpots() {
    const spots = JSON.parse(localStorage.getItem('spots')) || [];
    const spotsList = document.getElementById('spots-list');
    spots.forEach(spot => {
        const spotDiv = document.createElement('div');
        spotDiv.classList.add('spot');
        
        const imgElement = document.createElement('img');
        imgElement.src = spot.image;
        spotDiv.appendChild(imgElement);
        
        const ratingElement = document.createElement('div');
        ratingElement.classList.add('rating');
        ratingElement.textContent = `Rating: ${spot.rating}`;
        spotDiv.appendChild(ratingElement);

        const shortReviewElement = document.createElement('div');
        shortReviewElement.classList.add('short-review');
        shortReviewElement.textContent = spot.review.length > 50 ? spot.review.substring(0, 50) + '...' : spot.review;
        spotDiv.appendChild(shortReviewElement);

        spotDiv.addEventListener('click', function() {
            alert(`Full Review:\n${spot.review}`);
        });

        spotsList.appendChild(spotDiv);
    });
}

window.onload = loadSpots;
