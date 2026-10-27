export function ChapterMark({
  no,
  title,
  tone = "light",
}: {
  no: string;
  title: string;
  tone?: "light" | "dark";
}) {
  return (
    <p className={`chapter-mark label ${tone === "dark" ? "chapter-mark--dark" : ""}`}>
      <span className={tone === "dark" ? "text-accent-on-dark" : "text-accent"}>{no}</span>
      <span>{title}</span>
    </p>
  );
}
