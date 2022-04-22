export default function fileFormatValidation(type, extention) {
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
