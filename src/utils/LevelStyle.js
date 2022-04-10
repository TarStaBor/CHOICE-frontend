export default function levelStyle(level) {
  const levelStyle =
    level === "intern"
      ? "application__level_type_intern"
      : level === "junior"
      ? "application__level_type_junior"
      : level === "middle"
      ? "application__level_type_middle"
      : level === "senior"
      ? "application__level_type_senior"
      : level === "lead"
      ? "application__level_type_lead"
      : "application__level_type_director";
  return levelStyle;
}
