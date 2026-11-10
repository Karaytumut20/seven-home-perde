"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/** Keep the reserved image area intact even if a replacement asset is missing. */
export function MediaImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      {...props}
      alt={props.alt}
      src={failed ? "/media/fallback.svg" : props.src}
      onError={(event) => {
        event.currentTarget
          .closest("picture")
          ?.querySelectorAll("source")
          .forEach((source) => source.removeAttribute("srcset"));
        setFailed(true);
      }}
    />
  );
}
