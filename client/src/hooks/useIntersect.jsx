import React, { useCallback, useEffect, useRef, useState } from "react";

export const useIntersect = (intersectHandler, options) => {
  const ref = useRef(null);
  const callback = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) intersectHandler(entry, observer);
      });
    },
    [intersectHandler]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
};
