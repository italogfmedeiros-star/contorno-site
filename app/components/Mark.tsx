/**
 * A marca do Contorna AI — o mesmo desenho usado nas peças de Instagram
 * (marketing/instagram/brand/contorna-mark.svg): o arco aberto do "C" e o
 * ponto da objeção, em vermelho, no lugar onde o arco não fecha.
 */
export default function Mark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M66.7 27.2 A28 28 0 1 0 66.7 68.8"
        stroke="#00B487"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <circle cx="67" cy="48" r="10.5" fill="#E6482F" />
    </svg>
  );
}
