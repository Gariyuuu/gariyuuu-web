"use client";

import { useState } from "react";
import { MatrixRain } from "@/components/matrix-rain";
import { BootIntro } from "@/components/boot-intro";

export function SiteFx() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <MatrixRain fast={!booted} />
      <BootIntro onDone={() => setBooted(true)} />
    </>
  );
}
