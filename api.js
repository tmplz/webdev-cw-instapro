

// Замени на свой, чтобы получить независимый от других набор данных.

//import { renderPostsPageComponent } from "./components/posts-page-component.js";


// "боевая" версия инстапро лежит в ключе prod
const personalKey = 'dmitry-buntov';
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;



//let appPosts = [];


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
    .then((responseData) => {
      console.log(responseData);
      return responseData.posts.map(post => {
        return {
          name: post.user.name,
          date: post.createdAt,
          id: post.user.id,
          image: post.user.imageUrl,
          postImage: post.imageUrl,
          dataId: post.id,
          description: post.description,
        };
      });
    });
}

export function addPostsApi(postData) {
  const token = postData.token;
  return fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      description: postData.description,
      imageUrl: postData.imageUrl,
    }),
  })
  .then((response) => {
    if (response.ok) {
      return response.json;
    } else if (response.status === 400) {
      throw new Error("Неверный запрос");
    } else if (response.status === 500) {
      throw new Error("Ошибка сервера");
    } else {
      throw new Error("Неизвестная ошибка");
    }
  })
  .then((responseData) => {
    const newPost = { ...postData, id: responseData.id };
    return newPost;
  })
  .catch((error) => {
    console.error(error.message);
    throw error;
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

export function getLikeUser({ token, dataId, isLiked }) {
  return fetch(postsHost + `/${dataId}${isLiked ? '/dislike' : '/like'}`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({}),
  })
  .then((response) => {    
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Ошибка сервера");
    }
  })
  .catch((error) => {
    console.error(error.message);
    throw error;
  });
}




