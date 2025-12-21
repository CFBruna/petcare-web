"use client";

import Navbar from "@/presentation/components/layouts/Navbar";
import { useAppointments, useCancelAppointment } from "@/presentation/hooks/useAppointments";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import { Calendar, X } from "lucide-react";
import Link from "next/link";

import { formatDateTime } from "@/presentation/lib/utils";

const AppointmentCard = ({
    appointment,
    onCancel,
}: {
    appointment: any;
    onCancel: (id: number) => void;
}) => (
    <Card>
        <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="font-semibold text-lg text-neutral-900">
                        {appointment.petName}
                    </h3>
                    <p className="text-neutral-600">{appointment.service.name}</p>
                </div>
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${appointment.getStatusColor()}`}
                >
                    {appointment.getStatusLabel()}
                </span>
            </div>
            <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDateTime(appointment.scheduleTime)}
                </div>
                {appointment.notes && (
                    <p className="text-xs bg-neutral-50 p-2 rounded">{appointment.notes}</p>
                )}
            </div>
            {appointment.canBeCanceled() && (
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={(e) => {
                        e.stopPropagation();
                        onCancel(appointment.id);
                    }}
                >
                    <X className="h-4 w-4 mr-2" />
                    Cancelar Agendamento
                </Button>
            )}
        </CardContent>
    </Card>
);

import { AlertDialog } from "@/presentation/components/ui/alert-dialog";
import { useState } from "react";

export default function AppointmentsPage() {
    const { data: appointments, isLoading } = useAppointments();
    const cancelAppointment = useCancelAppointment();
    const [cancelId, setCancelId] = useState<number | null>(null);

    const pending = appointments?.filter((a) => a.isPending()) || [];
    const confirmed = appointments?.filter((a) => a.isConfirmed()) || [];
    const completed = appointments?.filter((a) => a.isCompleted()) || [];
    const canceled = appointments?.filter((a) => a.isCanceled()) || [];

    const handleCancelClick = (id: number) => {
        setCancelId(id);
    };

    const confirmCancellation = async () => {
        if (!cancelId) return;
        try {
            await cancelAppointment.mutateAsync(cancelId);
            alert("Agendamento cancelado com sucesso!");
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.error || "Não foi possível cancelar o agendamento.";
            alert(errorMessage);
        } finally {
            setCancelId(null);
        }
    };

    return (
        <>
            <Navbar />
            <AlertDialog
                isOpen={!!cancelId}
                title="Cancelar Agendamento"
                description="Tem certeza que deseja cancelar este agendamento? Esta ação não pode ser desfeita."
                confirmLabel="Sim, cancelar"
                cancelLabel="Voltar"
                onConfirm={confirmCancellation}
                onCancel={() => setCancelId(null)}
                isLoading={cancelAppointment.isPending}
            />
            <main className="min-h-screen bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-heading font-bold text-neutral-900 mb-2">
                                Agendamentos
                            </h1>
                            <p className="text-neutral-600">
                                Gerencie seus compromissos de cuidado com os pets
                            </p>
                        </div>
                        <Link href="/appointments/new">
                            <Button className="gap-2">
                                <Calendar className="h-4 w-4" />
                                Novo Agendamento
                            </Button>
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-12">
                            <p className="text-neutral-600">Carregando agendamentos...</p>
                        </div>
                    ) : appointments && appointments.length > 0 ? (
                        <div className="space-y-8">
                            {/* Pending */}
                            {pending.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-heading font-semibold mb-4 text-neutral-900">
                                        Pendentes
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {pending.map((apt) => (
                                            <AppointmentCard
                                                key={apt.id}
                                                appointment={apt}
                                                onCancel={handleCancelClick}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Confirmed */}
                            {confirmed.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-heading font-semibold mb-4 text-neutral-900">
                                        Confirmados
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {confirmed.map((apt) => (
                                            <AppointmentCard
                                                key={apt.id}
                                                appointment={apt}
                                                onCancel={handleCancelClick}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Completed */}
                            {completed.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-heading font-semibold mb-4 text-neutral-900">
                                        Concluídos
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {completed.map((apt) => (
                                            <AppointmentCard
                                                key={apt.id}
                                                appointment={apt}
                                                onCancel={handleCancelClick}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Canceled */}
                            {canceled.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-heading font-semibold mb-4 text-neutral-900">
                                        Cancelados
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {canceled.map((apt) => (
                                            <AppointmentCard
                                                key={apt.id}
                                                appointment={apt}
                                                onCancel={handleCancelClick}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <Calendar className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                                    Nenhum agendamento encontrado
                                </h3>
                                <p className="text-neutral-600 mb-6">
                                    Agende um serviço para o seu pet!
                                </p>
                                <Link href="/appointments/new">
                                    <Button>Agendar Serviço</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </>
    );
}
