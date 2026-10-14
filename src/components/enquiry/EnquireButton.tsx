"use client";

import { useEnquiry } from "./EnquiryProvider";

type Props = {
  packageId?: string;
  source: string;
  className?: string;
  children: React.ReactNode;
};

/** Any "Enquire / Book / Plan" CTA — opens the shared enquiry modal. */
export default function EnquireButton({ packageId, source, className = "sr-btn sr-btn--navy", children }: Props) {
  const { open } = useEnquiry();
  return (
    <button type="button" className={className} onClick={() => open({ packageId, source })}>
      {children}
    </button>
  );
}
