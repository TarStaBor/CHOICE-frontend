export default function levelStyle(level) {
  return level === "intern"
    ? "level_type_intern"
    : level === "junior"
    ? "level_type_junior"
    : level === "middle"
    ? "level_type_middle"
    : level === "senior"
    ? "level_type_senior"
    : level === "lead"
    ? "level_type_lead"
    : level === "lead"
    ? "level_type_director"
    : "";
}
