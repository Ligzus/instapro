// Добавляем посты:
import { renderHeaderComponent } from "./header-component.js";
import { sanitizeHtml } from "../helpers.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

let imageUrl = '';

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // Страница добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>

      <div class="form">      
        <h1 class="form-title">Новая запись:</h1>

        <div class="form-inputs">
          <p class="post-text">Описание:</p> 
          <input type="text" id="add-text" class="textarea"/>

          <div class="upload-image-container">

            <div class="upload-image">                
              <label class="file-upload-label secondary-button">
                <input type="file" id="image-input" class="file-upload-input" style="display:none">
                Выберите фото
              </label>               
            </div>

          </div> 
                          
          <button class="button" id="add-button">
            Добавить
          </button>
        </div>

      </div>

    </div> `;

    appEl.innerHTML = appHtml;


    const inputTextElement = document.getElementById("add-text");
    const uploadImgContainer = document.querySelector(".upload-image-container");


    renderUploadImageComponent({
      element: uploadImgContainer,
      onImageUrlChange: (newImageUrl) => {
        imageUrl = newImageUrl;
      }
    });
    
        
    function newPost() {
      document.getElementById("add-button").addEventListener("click", () => {
        
        const trimmedText = inputTextElement.value.trim();

        inputTextElement.classList.remove("form-error");
        if (trimmedText === "") {
          inputTextElement.classList.add("form-error");
          return;
        };

        if (imageUrl === '') {
          alert('Вы не добавили фото')
          return;          
        }

        onAddPostClick({
          description: sanitizeHtml(trimmedText),
          imageUrl: imageUrl,
        });
      });      
    };

    newPost();
  };

  render();    
  renderHeaderComponent({ element: document.querySelector(".header-container") });
};
