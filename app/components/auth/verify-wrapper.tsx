"use client";

import dynamic from 'next/dynamic';

const VerifyForm = dynamic(() => import('./verify-form'), {
  ssr: false,
});

export default function VerifyFormWrapper() {
  return <VerifyForm />;
}