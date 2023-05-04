import { postImage, uploadImage } from "../api.js";
import { renderHeaderComponent } from "./header-component.js";

let imageUrl;

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {

  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const reader = new FileReader();



    const inputImg = ` <div>
    <label class="file-upload-label secondary-button">
      <input type="file" class="file-upload-input" id="image-input" style="display:none">
      "Выберите фото"   
    </label>
    </div>`



    const appHtml = `
      <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
      <div class="form">
      <h3 class="form-title"> Добавить пост</h3>
      </div>
      
      ${imageUrl ?

        `<div class="file-upload-image-conrainer">
        <img class="file-upload-image" src="${imageUrl}" alt="" id="img"/>
         <label class="file-upload-label secondary-button">
         <button class="link-button" id="toggle-button">
         "Изменить фото"
       </button>
       </label>
       </div>`

        :

        inputImg

      }
    </div>
      <div class="upload-image-containe">
       <label>
      "Опишите фотографию:"
      <textarea class="input textarea" rows="4" id = "textarea"></textarea>
      </label>
      </div>
      </div>
      <button class="button" id="add-button">Добавить</button>
    </div>  
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });



    const fileInputElement = document.getElementById("image-input");

    fileInputElement?.addEventListener("change", () => {
      const file = fileInputElement.files[0];
      if (file) {
        const lableEl = document.querySelector(".file-upload-label");
        lableEl.setAttribute("disabled", true);
        lableEl.textContent = "Загружаю файл...";
        uploadImage({ file }).then(({ fileUrl }) => {
          imageUrl = fileUrl;
          render();
        });
      }
    });




    const textEl = document.getElementById("textarea");


    document.getElementById("add-button").addEventListener("click", () => {
      postImage({ file: imageUrl })
        .then((imagUrl) => {
          onAddPostClick({
            description: textEl.value,
            imageUrl: imagUrl.fileUrl,
          });
        });


    });
  };

  render();
}
