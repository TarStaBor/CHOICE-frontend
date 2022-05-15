import axios from "axios";
// import { BASE_URL } from "./Constants";
const BASE_URL = process.env.REACT_APP_BASE_URL;

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
export const downloadFile = (resume, _id, job) => {
  return fetch(`${BASE_URL}/resumes/${job.company}/${job._id}/${_id}/${resume}`, {
    method: "GET",
  })
    .then((res) => res.blob())
    .then((blob) => {
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
      link.setAttribute("download", `${resume}${extension}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch((err) => {
      return err;
    });
};

// ----------------Пользователи---------------------

//Регистрация

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })
    .then((res) => {
      return getResponseData(res);
    })
    .then((data) => {
      return data;
    });
};

//Авторизация

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => {
      return getResponseData(res);
    })
    .then((data) => {
      return data;
    });
};

//Получить данные пользователя

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return getResponseData(res);
    })
    .then((res) => {
      if (res) {
        return res;
      }
    });
};

// ----------------Вакансии---------------------

// Получить все вакансии
export const getJobs = () => {
  return fetch(`${BASE_URL}/jobs`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return getResponseData(res);
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
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
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
  return fetch(`${BASE_URL}/response/${_id}`, {
    method: "GET",
    headers: {
      // authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return getResponseData(res);
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
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return getResponseData(res);
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
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return getResponseData(res);
    })
    .then((data) => {
      return data;
    });
};

// Добавить отклик
export const addResponse = async (data) => {
  return await axios.post(`${BASE_URL}/response`, data, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// Получить количество откликов
export const getApplicantsByJobId = (jobId) => {
  return fetch(`${BASE_URL}/applicants/${jobId}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return getResponseData(res);
    })
    .then((data) => {
      return data;
    });
};

// изменить комментарий отклика
export const patchApplicantComment = (comment, _id) => {
  return fetch(`${BASE_URL}/applicants/${_id}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment,
    }),
  })
    .then((res) => {
      return getResponseData(res);
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
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return getResponseData(res);
    })
    .then((data) => {
      return data;
    });
};
