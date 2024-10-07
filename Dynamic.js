const api_url = 'https://jsonplaceholder.typicode.com/posts/';
let currentPage = 1; // To keep track of the current page
const postsPerPage = 10; // Number of posts to fetch per request

function fetchPosts(callback) {
    // Create an XMLHttpRequest object
    const xhttp = new XMLHttpRequest();
    // Send a GET request to the API
    xhttp.open('GET', `${api_url}?_limit=${postsPerPage}&_page=${currentPage}`, true);
    xhttp.onload = function () {
        // Checks if the HTTP status code is successful
        if (this.status >= 200 && this.status < 300) {
            const data = JSON.parse(this.responseText);
            callback(data);
        } else { //If the status code is unsuccessful send an error message to the console
            console.error('Error fetching posts:', this.statusText);
        }
    };
    // Send the request to the server
    xhttp.send();
}

function loadPosts() {
    // Calls the fetchPosts function to get the posts
    fetchPosts(function (posts) {
        // Map over the fetched posts to create a html content for each post
        const content = posts.map((post, i) => `
            <div class="post">
                <h3><span class="title">${post.title}</span></h3>
                <p><span class="body">${post.body}</span></p>
            </div>
        `).join(''); // Join the array of strings into a single string

        // Append new posts to the existing post container
        document.querySelector('.post-container').insertAdjacentHTML('beforeend', content);
    });
}

// Loads the initial posts
loadPosts();

// Checks if the user is scrolling
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        currentPage++; // Moves to the next page
        loadPosts(); // Loads more posts
    }
});
