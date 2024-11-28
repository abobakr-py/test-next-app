// components/ClientOnly.tsx
"use client";
import React, { useState, useEffect } from "react";

const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return <>{children}</>;
};

export default ClientOnly;
