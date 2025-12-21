"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/presentation/components/ui/button";
import { AlertTriangle, X } from "lucide-react";

interface AlertDialogProps {
    isOpen: boolean;
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
    variant?: "danger" | "default";
}

export function AlertDialog({
    isOpen,
    title,
    description,
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    onConfirm,
    onCancel,
    isLoading = false,
    variant = "danger",
}: AlertDialogProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm"
                        onClick={onCancel}
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-1/2 top-1/2 z-[100] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-2xl"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3 text-neutral-900">
                                {variant === "danger" && (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                                        <AlertTriangle className="h-5 w-5" />
                                    </div>
                                )}
                                <h2 className="text-xl font-semibold">{title}</h2>
                            </div>
                            <button
                                onClick={onCancel}
                                className="text-neutral-500 hover:text-neutral-700 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <p className="mt-3 text-neutral-600 leading-relaxed">{description}</p>

                        <div className="mt-6 flex justify-end gap-3">
                            <Button
                                variant="ghost"
                                onClick={onCancel}
                                disabled={isLoading}
                                className="text-neutral-600 hover:bg-neutral-100 ring-neutral-200"
                            >
                                {cancelLabel}
                            </Button>
                            <Button
                                variant={variant === "danger" ? "default" : "default"}
                                onClick={onConfirm}
                                disabled={isLoading}
                                className={
                                    variant === "danger"
                                        ? "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-200"
                                        : ""
                                }
                            >
                                {isLoading ? "Processando..." : confirmLabel}
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
