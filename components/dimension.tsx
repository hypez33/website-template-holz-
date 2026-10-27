/** Maßkette im Stil einer Werkzeichnung. Rein dekorativ; der Wert steht als Text daneben. */
export function Dimension({
  value,
  orientation = "h",
  className = "",
}: {
  value: string;
  orientation?: "h" | "v";
  className?: string;
}) {
  return (
    <div className={`dim dim--${orientation} ${className}`} aria-hidden="true">
      <span className="dim__line" />
      <span className="dim__tick dim__tick--a" />
      <span className="dim__tick dim__tick--b" />
      <span className="dim__value label">{value}</span>
    </div>
  );
}
