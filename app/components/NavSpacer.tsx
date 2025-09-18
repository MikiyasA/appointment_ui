"use client";

import { useEffect, useRef, useState } from "react";

export const NavSpacer = () => {
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const nav = document.getElementById("nav-bar");
    if (!nav) return;

    const update = () => setHeight(nav.offsetHeight);

    update();

    const observer = new ResizeObserver(update);
    observer.observe(nav);

    return () => observer.disconnect();
  }, []);

  return <div style={{ height }} />;
};
