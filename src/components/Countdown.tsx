"use client";

import { Fragment } from "react";
import { useCountdown } from "./useCountdown";

type TilesProps = { label?: string; tone?: "light" | "dark"; units?: boolean };

/** Digit-tile clock (DD:HH:MM:SS) used in the deals header and offer banners. */
export function CountdownTiles({ label, tone = "light", units = true }: TilesProps) {
  const { dd, hh, mm, ss } = useCountdown();
  const groups = [
    [dd, "Days"],
    [hh, "Hrs"],
    [mm, "Min"],
    [ss, "Sec"],
  ] as const;

  return (
    <div className={`sr-clock sr-clock--${tone}`} role="timer" aria-label={`Offer ends in ${dd} days ${hh} hours ${mm} minutes`}>
      {label && <span className="sr-clock-label">{label}</span>}
      <div className="sr-clock-groups">
        {groups.map(([value, unit], i) => (
          <Fragment key={unit}>
            {i > 0 && <span className="sr-clock-colon" aria-hidden="true">:</span>}
            <span className="sr-clock-group">
              <span className="sr-clock-digits" aria-hidden="true">
                {value.split("").map((d, j) => (
                  <span key={j} className="sr-clock-tile">{d}</span>
                ))}
              </span>
              {units && <span className="sr-clock-unit" aria-hidden="true">{unit}</span>}
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/** Compact "03d : 04h : 05m : 53s" text clock for the marquee and top strip. */
export function CountdownInline() {
  const { dd, hh, mm, ss } = useCountdown();
  return (
    <span className="sr-clock-inline">
      {dd}d : {hh}h : {mm}m : {ss}s
    </span>
  );
}
