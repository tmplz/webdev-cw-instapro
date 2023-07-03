
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
import { getToken } from "../index.js";
//import { addPostsApi } from "../api.js";



export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    let imageUrl = '';
    const appHtml = `
      <div class="page-container">
        <div class="header-container">
          <div class="page-header">
            <h1 class="logo">instapro</h1>
            <button class="header-button add-or-login-button">
              <div title="Добавить пост" class="add-post-sign"></div>
            </button>
            <button title="Дмитрий Бунтов" class="header-button logout-button">Выйти</button>  
          </div>
        </div>

        <div class="form">
          <h3 class="form-title">Добавить пост</h3>
          <div class="form-inputs">
            <div class="upload-image-container">
              <div class="upload=image">
                <label class="file-upload-label secondary-button">
                  <input type="file" class="file-upload-input" style="display:none">
                  Выберите фото
                </label>
              </div>
            </div>
            <label>
              Опишите фотографию:
              <textarea class="input textarea" rows="4"></textarea>
            </label>
            <button class="button" id="add-button">Добавить</button>
          </div>
        </div>
      </div>
    `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector('.upload-image-container'),
    });

    const uploadImage = appEl.querySelector('.upload-image-container');

    if (uploadImage) {
      renderUploadImageComponent({
        element: appEl.querySelector('.upload-image-container'),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById('add-button').addEventListener('click', async () => {
      const textAreaPosts = appEl.querySelector('.textarea');
      const token = getToken();
    
      console.log('Добавляю пост...');
    
      try {
        await onAddPostClick({
          description: textAreaPosts.value,
          imageUrl: imageUrl,
          token: token,
        });
        console.log('Пост успешно добавлен!');
      } catch (error) {
        console.error('Ошибка при добавлении поста: ', error);
      }
    });
  };
  
  render();
}


