// Добавляем посты:
import { renderHeaderComponent } from "./header-component.js";
import { baseHost } from "../api.js";


export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
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


    const inputPhotoElement = document.getElementById("image-input");
    const inputTextElement = document.getElementById("add-text");

    const uploadImgContainer = document.querySelector(".upload-image-container");

    const needUploadImg = `
    <div class="upload-image">                
      <label class="file-upload-label secondary-button">
        <input type="file" id="image-input" class="file-upload-input" style="display:none">
        Выберите фото
      </label>               
    </div>
    `
    const uploadImg = `
    <div class="upload-image">      
      <div class="file-upload-image-conrainer">
        <img class="file-upload-image" src="">
        <button class="file-upload-remove-button button">Заменить фото</button>
      </div>          
    </div> `;

    inputPhotoElement.addEventListener("change", () => {
      if (inputPhotoElement.files.length > 0) {
        uploadImgContainer.innerHTML = uploadImg;
      } else {
        uploadImgContainer.innerHTML = needUploadImg;
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

        onAddPostClick({
          description: trimmedText,
          imageUrl: inputPhotoElement.value,
        });
      });      
    };

    newPost();
  };

  render();    
  renderHeaderComponent({ element: document.querySelector(".header-container") });
};
