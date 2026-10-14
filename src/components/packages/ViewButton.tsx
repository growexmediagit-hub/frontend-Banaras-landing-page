"use client";

import { useEnquiry } from "../enquiry/EnquiryProvider";

type Props = { packageId: string; className?: string; children: React.ReactNode };

/** Opens the package quick-view popup. */
export default function ViewButton({ packageId, className, children }: Props) {
  const { view } = useEnquiry();
  return (
    <button type="button" className={className} onClick={() => view(packageId)}>
      {children}
    </button>
  );
}
