import { db, collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "./firebase.js";

const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const postButton = document.getElementById("post");
const getAllPostsButton = document.getElementById("allpost");
const deletePostButton = document.getElementById("delpost");
const updatePostButton = document.getElementById("updpost");
const postsContainer = document.getElementById("postsContainer");

// Collection Reference
const postsCollection = collection(db, "posts");

// 1. Add a new post
postButton.addEventListener("click", async () => {
    const title = postTitle.value.trim();
    const content = postContent.value.trim();

    if (!title || !content) {
        Swal.fire("Error", "Title and Content cannot be empty.", "error");
        return;
    }

    try {
        const docRef = await addDoc(postsCollection, {
            title,
            content,
            createdAt: new Date(),
        });
        Swal.fire("Success", `Post added with ID: ${docRef.id}`, "success");
        postTitle.value = "";
        postContent.value = "";
    } catch (error) {
        Swal.fire("Error", `Failed to add post: ${error.message}`, "error");
    }
});

// 2. Get all posts
getAllPostsButton.addEventListener("click", async () => {
    try {
        const querySnapshot = await getDocs(postsCollection);
        postsContainer.innerHTML = ""; // Clear previous posts
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            const postElement = `
                <div class="bg-white p-4 shadow-md rounded-md mb-4">
                    <h3 class="font-bold text-lg">${post.title}</h3>
                    <p>${post.content}</p>
                    <small class="text-gray-500">ID: ${doc.id}</small>
                </div>
            `;
            postsContainer.innerHTML += postElement;
        });
    } catch (error) {
        Swal.fire("Error", `Failed to retrieve posts: ${error.message}`, "error");
    }
});






// 4. Update a post by ID
updatePostButton.addEventListener("click", async () => {
    const postId = prompt("Enter the ID of the post to update:");
    if (!postId) {
        Swal.fire("Error", "Post ID is required.", "error");
        return;
    }

    const newTitle = prompt("Enter the new title:");
    const newContent = prompt("Enter the new content:");

    if (!newTitle || !newContent) {
        Swal.fire("Error", "Title and Content cannot be empty.", "error");
        return;
    }

    try {
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, {
            title: newTitle,
            content: newContent,
            updatedAt: new Date(),
        });
        Swal.fire("Success", "Post updated successfully.", "success");


    
    } catch (error) {
        Swal.fire("Error", `Failed to update post: ${error.message}`, "error");


    }
});








// 3. Delete a post by ID
deletePostButton.addEventListener("click", async () => {
    const postId = prompt("Enter the ID of the post to delete:");
    if (!postId) {
        Swal.fire("Error", "Post ID is required.", "error");
        return;
    }

    try {
        await deleteDoc(doc(db, "posts", postId));
        Swal.fire("Success", "Post deleted successfully.", "success");


            // Delay redirection to ensure the success message is displayed
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to index.html after success
            }, 1000); // 1 seconds delay
    } catch (error) {
        Swal.fire("Error", `Failed to delete post: ${error.message}`, "error");
    }
});







// Reference to the Firestore collection (replace with your actual collection name)
const collectionRef = db.collection('posts');  // Change to your Firestore collection

// Get the search form and input element
const searchForm = document.getElementById('searchForm');
const searchQuery = document.getElementById('searchQuery');

// Event listener for the form submission (user clicks Enter or submits the form)
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission

    const queryText = searchQuery.value.trim();
    if (!queryText) {
        Swal.fire({
            icon: 'warning',
            title: 'Please enter a search term',
        });
        return;
    }

    try {
        // Query Firestore collection for documents that match the search term
        const querySnapshot = await collectionRef
            .where('IT', '>=', queryText)  // Adjust field to match your Firestore field
            .where('Baker', '<=', queryText + '\uf8ff')  // Range query for full-text search
            .get();

        // Check if the query returned any documents
        if (querySnapshot.empty) {
            Swal.fire({
                icon: 'info',
                title: 'No results found',
                text: 'Try a different search term.',
            });
        } else {
            // If results are found, display them
            let resultContent = '<ul>';
            querySnapshot.forEach(doc => {
                const data = doc.data();  // Get document data
                resultContent += `<li>${data.name} - ${data.description}</li>`; // Adjust fields as necessary
            });
            resultContent += '</ul>';

            // Show results in a SweetAlert popup
            Swal.fire({
                title: 'Search Results',
                html: resultContent,
                showCloseButton: true,
                focusConfirm: false,
            });
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
        Swal.fire({
            icon: 'error',
            title: 'An error occurred',
            text: 'Please try again later.',
        });
    }
});

