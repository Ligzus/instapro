import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { like } from "../api.js";
import { getToken } from "../index.js";
 
export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  
  // * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
  // * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
    
  const postHtml = posts
  .map((post, index) => {

    return ` 
            <li class="post" id="post">
              <div class="post-header" data-user-id="${post.user.id}">
                <img src="${post.user.imageUrl}" class="post-header__user-image">
                <p class="post-header__user-name">${post.user.name}</p>
              </div>

              <div class="post-image-container">
                <img class="post-image" src="${post.imageUrl}">
              </div>

              <div data-index=${index} class="post-likes">
                <button data-index=${index} data-like="${post.isLiked}" class="like-button">
                  <img src="./assets/images/${post.isLiked ? "like-active.svg" : "like-not-active.svg"}">
                </button>

                <p class="post-likes-text">
                  Нравится: <strong>${post.likes.length}</strong>
                </p>
              </div>

              <p class="post-text">
                <span class="user-name">${post.user.name}</span>:
                ${post.description}
              </p>

              <p class="post-date">
                ${post.createdAt}
              </p>
            </li>                   
          `
  })
  .join('');

  
  const appHtml = `
  <div class="page-container">
  <div class="header-container"></div>
    <ul class="posts">${postHtml}</ul>
  </div>` 
  
  appEl.innerHTML = appHtml;   

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  renderLike();
}

function renderLike() {
  const likesButtons = document.querySelectorAll(".like-button");

  likesButtons.forEach((likesButton, index) => {
    likesButton.addEventListener("click", () => {
      const currentPost = posts[index];
      const likeStatus = (likesButton.dataset.like === "true") ? "dislike" : "like";

      like({
        token: getToken(), 
        currentPost, 
        likeStatus 
      })
      .then((updatedPost) => {
        likesButton.dataset.like = updatedPost.isLiked;
        likesButton.querySelector("img").src = `./assets/images/${updatedPost.isLiked ? "like-active.svg" : "like-not-active.svg"}`;
        document.querySelector("strong").textContent = updatedPost.likes.length;
      })

    });
  });

}
