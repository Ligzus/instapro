// Добавляем посты:
import { renderHeaderComponent } from "./header-component.js";



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

          <label class="file-upload-label secondary-button">
            <input
              value=""
              id="choose-photo"
              type="file"
              class="file-upload-input"
              style="display:none"
            > Открыть галерею
          </label>   
                          
          <button class="button" id="add-button">
            Добавить
          </button>
        </div>

      </div>

    </div> `;

    appEl.innerHTML = appHtml;


    const inputPhotoElement = document.getElementById("choose-photo");
    const inputTextElement = document.getElementById("add-text");
    
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
