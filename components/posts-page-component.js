import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { goToPage, appPosts, user, getToken, appEl } from "../index.js";
import { getLikeUser } from "../api.js";

const postsContainer = (post, index) => {
  const likeButtonImage = post.isLiked ? 'like-active.svg' : 'like-not-active.svg';
  const likeButtonText = post.likes && post.likes.length === 0 ? '0' : post.likes && post.likes.length > 1 ?
    `${post.likes[0].name} и ещё ${correctUsersString(post.likes.length - 1)}` :
    post.likes && post.likes.length === 1 ? post.likes[0].name : '';

  return `
    <li class="post" data-index='${index}'>
      <div class="post-header" data-user-id="${post.id}">
        <img src="${post.image}" class="post-header__user-image">
        <p class="post-header__user-name">${post.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${post.postImage}">
      </div>
      <div class="post-likes">
        <button data-post-id="${post.id}" class="like-button">
          <img src="./assets/images/${likeButtonImage}">
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${likeButtonText}</strong>
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${post.name}</span>
        ${post.description}
      </p>
      <p class="post-date">${post.date}</p>
    </li>
  `;
};

export function renderPostsPageComponent() {
  //const appEl = document.getElementById("app");

  const postsHtml = appPosts.map((post, index) => postsContainer(post, index)).join("");

  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        ${postsHtml}
      </ul>
    </div>`;

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

  for (let button of document.querySelectorAll(".like-button")) {
    button.addEventListener("click", () => {
      const dataId = button.dataset.postId;
      const index = button.closest('.post').dataset.index;
      const currentButton = button;

      let isLiked = appPosts[index].isLiked ? 1 : 0;

      if (user) {
        currentButton.classList.add('like-animation');

      getLikeUser({ token: getToken(), dataId, isLiked })
      .then(() => {
        if (isLiked) {
          appPosts[index].isLiked = false;
          appPosts[index].likes.pop();
        } else {
          appPosts[index].isLiked = true;
          appPosts[index].likes.push({
            id: appPosts[index].user.id,
            name: appPosts[index].user.name,
          });
        }
        renderPostsPageComponent();
      })
      .catch((error) => {
        console.error(error);
      });
      }
    });
  }
}