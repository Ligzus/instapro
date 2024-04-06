// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
const personalKey = "alex_poplaukhin";
export const baseHost = "https://webdev-hw-api.vercel.app";
export const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;


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
  })  
}


export function addPost({ token, description, imageUrl }) {
  return fetch(postsHost , {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      description,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный запрос");
    } else if (response.status === 500) {
      throw new Error("Ошибка сервера");
    } 

    return response.json();
  })
  .catch((error) => {
    if (error.message === "Ошибка сервера") {
      alert('Севрвер прилег отдохнуть, пробуй еще раз...');            
    } else if (error.message === "Неверный запрос") {
      alert('Фото или описание не добавлены');
    } else {
      alert('Кажется, интернет прилег отдохнуть, проверь соединение...');
    };        
  })
}

export function like({ token, currentPost, likeStatus }) {
  return fetch(postsHost + "/" + currentPost.id + "/" + likeStatus, {
    method: "POST",
    headers: {
      Authorization: token,
    }
  }).then((response) => {
    if (response.status === 401) {
      throw new Error("Нет авторизации");
    }

    return response.json();
  })
  .then((data) => {
    return data.post;
  })
  .catch((error) => {
    if (error.message === "Нет авторизации") {
      alert('Войдите в аккаунт или зарегистрируйтесь');            
    }     
  })  
}