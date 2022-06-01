import axios from "axios";
import { fileFormatExtantion } from "../utils/FileFormatValidation";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Response processing
async function getResponseData(result) {
  const res = await result.json();
  if (result.ok) {
    return res;
  } else {
    return Promise.reject(res);
  }
}

export const downloadFile = (resume, _id, job) => {
  return fetch(`${BASE_URL}/resumes/${job.company}/${job._id}/${_id}.${resume.split(".").pop()}`, {
    method: "GET",
  })
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      const extension = fileFormatExtantion(blob.type);
      link.setAttribute("download", `${resume.split(".").slice(0, -1).join(".")}${extension}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch((err) => {
      return err;
    });
};

// ----------USERS----------

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

// ----------JOBS----------

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

export const getJobById = (_id) => {
  return fetch(`${BASE_URL}/response/${_id}`, {
    method: "GET",
    headers: {
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

// ----------APPLICANTS----------

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

export const addResponse = async (data) => {
  return await axios.post(`${BASE_URL}/response`, data, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

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
