import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { goToPage } from "../index.js";
import { appPosts } from "../api.js";

const postsContainer = (post, index) => {
  return `<li class="post" data-index = '${index}'>
      <div class="post-header" data-user-id="${post.id}">
      <img src="${post.image}" class="post-header__user-image">
      <p class="post-header__user-name">${post.name}</p>
      </div>
      <div class="post-image-container">
      <img class="post-image" src="${post.postImage}">
      </div>
      <div class="post-likes">
      <button data-post-id="${post.dataId}" class="like-button">
      <img src="./assets/images/like-active.svg">
      </button>
      <p class="post-likes-text">
      Нравится: <strong>2</strong>
      </p>
      </div>
      <p class="post-text">
      <span class="user-name">${post.name}</span>
      ${post.description}
      </p>
      <p class="post-date">
      ${post.date}
      </p>
      </li>`
};

export function renderPostsPageComponent() {

  // TODO: реализовать рендер постов из api

  const appEl = document.getElementById("app");


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
}
 