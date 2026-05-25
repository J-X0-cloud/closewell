/** Fixed navy and marigold glow behind every page. */
export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__glow" />
      <div className="backdrop__sheen" />
    </div>
  );
}
