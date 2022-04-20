import axios from "axios";
export const BASE_URL = "http://localhost:3000";

// метод обработки ответа сервера
async function getResponseData(result) {
  const res = await result.json();
  if (result.ok) {
    return res;
  } else {
    return Promise.reject(res);
  }
}

// Скачать файл
export const downloadFile = (resume, _id, company, job) => {
  return fetch(`${BASE_URL}/resumes/${company}/${job}/${_id}/${resume}`, {
    method: "GET",
  })
    .then((response) => response.blob())
    .then((blob) => {
      console.log(blob.type);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      const extension =
        blob.type === "application/msword"
          ? ".doc"
          : blob.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ? ".docx"
          : blob.type === "application/pdf"
          ? ".pdf"
          : blob.type === "application/vnd.ms-powerpoint"
          ? ".ppt"
          : blob.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
          ? ".pptx"
          : blob.type === "image/jpeg"
          ? ".jpg"
          : blob.type === "image/png"
          ? ".png"
          : blob.type === "application/zip"
          ? ".zip"
          : blob.type === "application/x-7z-compressed"
          ? ".7z"
          : blob.type === "application/vnd.rar" || blob.type === "application/x-rar-compressed"
          ? ".rar"
          : "txt";
      console.log(extension);
      link.setAttribute("download", `${resume}${extension}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
};

// ----------------Вакансии---------------------

// Получить все вакансии
export const getJobs = () => {
  return fetch(`${BASE_URL}/jobs`, {
    method: "GET",
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

// Добавить вакансию
export const addJob = async (data) => {
  try {
    return await axios
      .post(`${BASE_URL}/jobs`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res.data;
      });
  } catch (error) {
    console.error(error);
  }
};

// Получить вакансию по Id
export const getJobById = (_id) => {
  return fetch(`${BASE_URL}/jobs/${_id}`, {
    method: "GET",
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

// Удалить вакансию
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

// ----------------Отклики---------------------

// Получить все отклики
export const getApplicants = () => {
  return fetch(`${BASE_URL}/applicants`, {
    method: "GET",
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

// Добавить отклик
export const addResponse = async (data) => {
  try {
    await axios
      .post(`${BASE_URL}/applicants`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};

// Получить количество откликов
export const getApplicantsCount = (jobId) => {
  return fetch(`${BASE_URL}/applicants/${jobId}`, {
    method: "GET",
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

// Удалить отклик
export const delApplicant = (_id) => {
  return fetch(`${BASE_URL}/applicants/${_id}`, {
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
