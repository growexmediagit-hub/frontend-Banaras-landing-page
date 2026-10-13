"use client";

import { FiArrowRight } from "react-icons/fi";
import { FILTER_EVENT } from "./events";

/** Category-row "View All" — preselects the type in the packages explorer and scrolls to it. */
export default function ViewAllButton({ type }: { type: string }) {
  return (
    <button
      type="button"
      className="sr-link-arrow"
      onClick={() => {
        window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: type }));
        document.getElementById("packages")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      View All <FiArrowRight aria-hidden="true" />
    </button>
  );
}
