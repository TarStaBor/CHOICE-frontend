export function fileFormatValidation(type, extention) {
  return (
    type === "application/msword" ||
    type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    type === "application/pdf" ||
    type === "application/vnd.ms-powerpoint" ||
    type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    type === "image/jpeg" ||
    type === "image/png" ||
    type === "application/zip" ||
    type === "application/x-7z-compressed" ||
    type === "application/vnd.rar" ||
    extention === "zip" ||
    extention === "7z" ||
    extention === "rar"
  );
}

export function fileFormatExtantion(extention) {
  return extention === "application/msword"
    ? ".doc"
    : extention === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ? ".docx"
    : extention === "application/pdf"
    ? ".pdf"
    : extention === "application/vnd.ms-powerpoint"
    ? ".ppt"
    : extention === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ? ".pptx"
    : extention === "image/jpeg"
    ? ".jpg"
    : extention === "image/png"
    ? ".png"
    : extention === "application/zip"
    ? ".zip"
    : extention === "application/x-7z-compressed"
    ? ".7z"
    : extention === "application/vnd.rar" || extention === "application/x-rar-compressed"
    ? ".rar"
    : "txt";
}
