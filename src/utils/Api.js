import axios from "axios";
export const BASE_URL = "http://localhost:3000";

// метод обработки ответа сервера
async function getResponseData(result) {
  console.log(result);
  const res = await result.json();
  if (result.ok) {
    return res;
  } else {
    return Promise.reject(res);
  }
}

// export const addJob = (data) => {
//   // for (let key of data.keys()) {
//   //   console.log(key, data.get(key));
//   // }
//   return fetch(`${BASE_URL}/jobs`, {
//     method: "POST",
//     headers: {
//       // "Content-Type": "application/json",
//       "content-type": "multipart/form-data",
//       // "content-type": "multipart/form-data; boundary=<calculated when request is sent></calculated>",
//     },
//     // body: JSON.stringify({
//     //   company: data.company,
//     //   position: data.position,
//     //   level: data.level,
//     //   tag: data.tag,
//     //   note: data.note,
//     //   todo: data.todo,
//     //   why: data.why,
//     // }),
//     body: data,
//   })
//     .then((response) => {
//       return getResponseData(response);
//     })
//     .then((data) => {
//       return data;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

export const addJob = async (data) => {
  try {
    // const data = { formData };

    await axios
      .post(`${BASE_URL}/jobs`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        return getResponseData(res);
      });
  } catch (error) {
    console.error(error);
  }
};

// export const getJobs = async () => {
//   try {
//     await axios.get(`${BASE_URL}/jobs`).then((res) => {
//       console.log(res);
//       return res;
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

export const getJobs = () => {
  return fetch(`${BASE_URL}/jobs`, {
    method: "GET",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return getResponseData(response);
    })
    .then((data) => {
      return data;
    });
};

export const getJobById = (_id) => {
  return fetch(`${BASE_URL}/jobs/${_id}`, {
    method: "GET",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return getResponseData(response);
    })
    .then((data) => {
      return data;
    });
};

export const delJob = (_id) => {
  return fetch(`${BASE_URL}/jobs/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return getResponseData(response);
    })
    .then((data) => {
      return data;
    });
};

// //Авторизация

// export const authorize = (email, password) => {
//   return fetch(`${BASE_URL}/signin`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//   })
//     .then((response) => {
//       return getResponseData(response);
//     })
//     .then((data) => {
//       return data;
//     });
// };

// //Получить данные пользователя

// export const getUserInfo = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       authorization: `Bearer ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       return getResponseData(response);
//     })
//     .then((res) => {
//       if (res) {
//         return res;
//       }
//     });
// };

// // изменить данные пользователя (PATCH)
// export const patchUserInfo = (name, email) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "PATCH",
//     headers: {
//       authorization: `Bearer ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name,
//       email,
//     }),
//   })
//     .then((response) => {
//       return getResponseData(response);
//     })
//     .then((res) => {
//       if (res) {
//         return res;
//       }
//     });
// };

// // Добавить фильм в избранные

// export const saveFilm = (card) => {
//   return fetch(`${BASE_URL}/movies`, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       authorization: `Bearer ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       country: card.country,
//       director: card.director,
//       duration: card.duration,
//       year: card.year,
//       description: card.description,
//       image: `${BEATFILM_URL + card.image.url}`,
//       trailer: card.trailerLink,
//       thumbnail: card.trailerLink,
//       movieId: card.id,
//       nameRU: card.nameRU,
//       nameEN: card.nameEN,
//     }),
//   })
//     .then((response) => {
//       return getResponseData(response);
//     })
//     .then((data) => {
//       return data;
//     });
// };

// // Получить избранные фильмы

// export const getFilms = () => {
//   return fetch(`${BASE_URL}/movies`, {
//     method: "GET",
//     credentials: "include",
//     headers: {
//       authorization: `Bearer ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       return getResponseData(response);
//     })
//     .then((data) => {
//       return data;
//     });
// };

// // Удалить фильм из избранного

// export const deleteFilm = (card) => {
//   return fetch(`${BASE_URL}/movies/${card._id}`, {
//     method: "DELETE",
//     credentials: "include",
//     headers: {
//       authorization: `Bearer ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       return getResponseData(response);
//     })
//     .then((data) => {
//       return data;
//     });
// };
