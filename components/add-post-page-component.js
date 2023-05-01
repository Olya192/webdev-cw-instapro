import { postImage } from "../api.js";
import { renderHeaderComponent } from "./header-component.js";

let imgAdd;

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const reader = new FileReader();

    const inputImg = `  <div>
    <label class="file-upload-label secondary-button">
      <input type="file" class="file-upload-input" id="image-input" style="display:none">
      ${!imgAdd ? "Выберите фото" : "Изменить фото"}   
    </label>
    </div>`



    const appHtml = `
      <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
      <div class="form">
      <h3 class="form-title"> Добавить пост</h3>
      </div>
       <img src="" alt="" id="img"/> ${inputImg}
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

    fileInputElement.addEventListener("input", () => {
      imgAdd = fileInputElement?.files[0];
      if (!imgAdd) {
        return
      }
      let imgtag = document.getElementById("img");
      reader.onload = function (event) {
        imgtag.src = event.target.result;
      };
      reader.readAsDataURL(imgAdd);

    });

    const textEl = document.getElementById("textarea");


    document.getElementById("add-button").addEventListener("click", () => {
      postImage({ file: imgAdd })
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
