import { useId } from "react";

/** useId() output is not always a valid url(#…) fragment; strip it down. */
export function useSvgId(prefix: string) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
}
