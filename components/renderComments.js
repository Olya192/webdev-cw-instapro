
export const getCommentsEdit = (post) => {
  return `   <ul class="posts" id ="posts">
   <li class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${post.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}" class="like-button" id = "like-button">
                      ${post.isLiked ? `<img src="./img/like-active.svg">` : `<img src="./img/like-not-active.svg">`} 
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${post.likes[post.likes.length - 1]?.name || ""} ${post.likes.length > 1 ? `и еще ${post.likes.length - 1}` : ""} </strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                      19 минут назад
                    </p>
                  </li>;
    </ul>`
}