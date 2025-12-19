"use client";

import { ReactNode } from "react";
import { ProtectedRoute } from "@/presentation/components/auth/ProtectedRoute";

export default function CustomerLayout({ children }: { children: ReactNode }) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
}
