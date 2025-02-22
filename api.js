// Замени на свой, чтобы получить независимый от других набор данных.

import { getToken, goToPage } from "./index.js";
import { POSTS_PAGE } from "./routes.js";

// "боевая" версия инстапро лежит в ключе prod
const personalKey = "olga-buchkova";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;



export const postImage = ({ file }) => {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  })
    .then((response) => {
      return response.json();
    })
};





export const onAddPostClick = (({ description, imageUrl }) => {
  const token = getToken();

  fetch(postsHost, {
    method: "POST",
    body: JSON.stringify({

      description: description,
      imageUrl: imageUrl

    }),
    headers: {

      'Authorization': token,
    },
  })
    .then((response) => {

      if (response.status === 400) {
        throw new Error("Описание фото отсутствует");
      } else if (response.status === 500) {
        onAddPostClick(description, imageUrl);
        // throw new Error("Сервис временно недоступен, пожалуйста попробуйте позже");
      } else {
        return response.json();
      }
    })
    .then(() => {

      goToPage(POSTS_PAGE)

    })
    .catch((error) => {

      if (error.message === 'Failed to fetch') {
        alert('Нет соединения с интернетом, проверьте ваше подключение');
      } else {
        alert(error.message);
      }

    });

})

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F
export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
}

export const likePost = (postId, token) => {

  return fetch(postsHost + `/${postId}/like`, {
    method: "POST",
    headers: {
      Authorization: token,
    }
  })

}

export const dislikePost = (postId, token) => {

  return fetch(postsHost + `/${postId}/dislike`, {
    method: "POST",
    headers: {
      Authorization: token,
    }
  })

}

export const userPost = ({token, userId }) => {

  return fetch(postsHost + `/user-posts/${userId}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }
      return response.json();
    })
    .then((data) => {
      return data.posts;
    });

}
