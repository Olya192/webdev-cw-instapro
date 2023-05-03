import { dislikePost, likePost } from "../api.js";
import { getToken, updatePage } from "../index.js";
import { POSTS_PAGE } from "../routes.js";

export const likeButtonEvent = (posts, renderApp) => {

    const likeButtonElements = document.querySelectorAll(".like-button");
    for (const likeButtonElement of likeButtonElements) {

        likeButtonElement.addEventListener('click', (event) => {

            const postId = likeButtonElement.dataset.postId;
            const selectedPost = posts.find((post) => post.id === postId);
            const token = getToken();
            if (!selectedPost.isLiked) {
                likePost(postId, token)
                    .then(() => {
                        updatePage();
                    });
            } else {
                dislikePost(postId, token)
                    .then(() => {
                        updatePage();
                    });
            }

            event.stopPropagation();
        })
    }
}

