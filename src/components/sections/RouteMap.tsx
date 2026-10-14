import type { RouteMap as RouteMapData } from "@/data/landing";

const STAR = "M0 -9 L2.6 -3.2 L8.6 -2.8 L4 1.2 L5.4 7.3 L0 4 L-5.4 7.3 L-4 1.2 L-8.6 -2.8 L-2.6 -3.2Z";
// 24×24 glyphs (Material "flight" / "directions_boat"), drawn centred on the icon point.
const GLYPHS = {
  plane: "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z",
  boat: "M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z",
};

/** Hand-styled route map for the spotlight trip — land, rivers and the road/boat legs between stops. */
export default function RouteMap({ map, label }: { map: RouteMapData; label: string }) {
  return (
    <svg className="sr-map" viewBox={`0 0 ${map.width} ${map.height}`} role="img" aria-label={label}>
      <rect className="sr-map-sea" width={map.width} height={map.height} />
      <path className="sr-map-land" d={map.land} />
      {map.region && <path className="sr-map-region" d={map.region} />}
      {map.borders && <path className="sr-map-border" d={map.borders} />}
      <path className="sr-map-river" d={map.rivers} />

      {map.labels.map(l => (
        <text key={l.text} className={`sr-map-label sr-map-label--${l.kind}`} x={l.x} y={l.y} textAnchor="middle">
          {l.text}
        </text>
      ))}

      {map.legs.map((leg, i) => (
        <path key={i} className={`sr-map-leg sr-map-leg--${leg.mode}`} d={leg.d} />
      ))}

      {map.icons.map((icon, i) => (
        <g key={i} className="sr-map-icon" transform={`translate(${icon.x} ${icon.y})`}>
          <circle r="11" />
          <path d={GLYPHS[icon.kind]} transform="translate(-7.2 -7.2) scale(0.6)" />
        </g>
      ))}

      {map.stops.map(s => (
        <g key={s.name} className={`sr-map-stop${s.minor ? " sr-map-stop--minor" : ""}`} transform={`translate(${s.x} ${s.y})`}>
          {s.start ? <path className="sr-map-star" d={STAR} /> : <circle r={s.minor ? 3.5 : 5} />}
          <text x={s.dx} y={s.dy} textAnchor={s.anchor}>
            {s.name}
            {s.note && (
              <tspan className="sr-map-note" x={s.dx} dy="13">
                {s.note}
              </tspan>
            )}
          </text>
        </g>
      ))}
    </svg>
  );
}
