"use client";

import axios, { AxiosError, isAxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/presentation/components/layouts/Navbar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import { Label } from "@/presentation/components/ui/label";
import { Input } from "@/presentation/components/ui/input";
import { Textarea } from "@/presentation/components/ui/textarea";
import { ArrowLeft, Calendar, Clock, DollarSign } from "lucide-react";
import Link from "next/link";
import { usePets } from "@/presentation/hooks/usePets";
import {
    useServices,
    useAvailableSlots,
    useCreateAppointment,
} from "@/presentation/hooks/useAppointments";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/presentation/components/ui/alert";

export default function NewAppointmentPage() {
    const router = useRouter();
    const { data: pets, isLoading: petsLoading } = usePets();
    const { data: services, isLoading: servicesLoading } = useServices();
    const createAppointment = useCreateAppointment();

    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        petId: "",
        serviceId: "",
        date: "",
        time: "",
        notes: "",
    });

    const selectedService = services?.find((s) => s.id === parseInt(formData.serviceId));

    const { data: availableSlots } = useAvailableSlots(formData.date, parseInt(formData.serviceId));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.petId || !formData.serviceId || !formData.date || !formData.time) {
            setError("Por favor, preencha todos os campos obrigatórios");
            return;
        }

        try {
            await createAppointment.mutateAsync({
                petId: parseInt(formData.petId),
                serviceId: parseInt(formData.serviceId),
                scheduleDate: formData.date,
                scheduleTime: formData.time,
                notes: formData.notes,
            });

            // alert("Agendamento criado com sucesso!"); // Removed alert
            router.push("/appointments");
        } catch (error: unknown) {
            let errorMessage = "Ocorreu um erro ao criar o agendamento.";

            if (isAxiosError(error) && error.response?.data) {
                const data = error.response.data;
                if (Array.isArray(data)) {
                    errorMessage = data[0];
                } else if (typeof data === "object" && data !== null) {
                    const keys = Object.keys(data);
                    if (keys.length > 0) {
                        const firstValue = data[keys[0]];
                        errorMessage = Array.isArray(firstValue)
                            ? firstValue[0]
                            : String(firstValue);
                    }
                }
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            setError(errorMessage);
            // alert(`Erro: ${errorMessage}`); // Removed alert
        }
    };

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    };

    if (petsLoading || servicesLoading) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-neutral-50">
                    <div className="max-w-4xl mx-auto px-4 py-8">
                        <p className="text-center text-neutral-600">Carregando...</p>
                    </div>
                </main>
            </>
        );
    }

    if (!pets || pets.length === 0) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-neutral-50">
                    <div className="max-w-4xl mx-auto px-4 py-8">
                        <Card>
                            <CardContent className="py-12 text-center">
                                <p className="text-neutral-600 mb-4">
                                    Você precisa cadastrar um pet antes de agendar um serviço
                                </p>
                                <Link href="/pets">
                                    <Button>Cadastrar Pet</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-neutral-50">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-6"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar para Dashboard
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-4xl font-heading font-bold text-neutral-900 mb-2">
                            Agendar Serviço
                        </h1>
                        <p className="text-neutral-600">
                            Escolha o pet, serviço, data e horário para o agendamento
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Novo Agendamento</CardTitle>
                            <CardDescription>
                                Preencha as informações abaixo para agendar um serviço
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="pet">Pet *</Label>
                                    <select
                                        id="pet"
                                        value={formData.petId}
                                        onChange={(e) =>
                                            setFormData({ ...formData, petId: e.target.value })
                                        }
                                        className="flex h-11 w-full rounded-lg border-2 border-neutral-200 bg-white px-4 py-2 text-sm"
                                        required
                                    >
                                        <option value="">Selecione um pet</option>
                                        {pets.map((pet) => (
                                            <option key={pet.id} value={pet.id}>
                                                {pet.name} ({pet.breed.name})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="service">Serviço *</Label>
                                    <select
                                        id="service"
                                        value={formData.serviceId}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                serviceId: e.target.value,
                                                time: "",
                                            })
                                        }
                                        className="flex h-11 w-full rounded-lg border-2 border-neutral-200 bg-white px-4 py-2 text-sm"
                                        required
                                    >
                                        <option value="">Selecione um serviço</option>
                                        {services?.map((service) => (
                                            <option key={service.id} value={service.id}>
                                                {service.name} - R$ {service.price.toFixed(2)} (
                                                {service.durationMinutes}min)
                                            </option>
                                        ))}
                                    </select>
                                    {selectedService && (
                                        <div className="p-4 bg-neutral-50 rounded-lg space-y-2">
                                            <p className="text-sm text-neutral-700">
                                                {selectedService.description}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-neutral-600">
                                                <span className="flex items-center gap-1">
                                                    <DollarSign className="h-4 w-4" />
                                                    R$ {selectedService.price.toFixed(2)}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {selectedService.durationMinutes} minutos
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="date">Data *</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            min={getTodayDate()}
                                            value={formData.date}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    date: e.target.value,
                                                    time: "",
                                                })
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="time">Horário *</Label>
                                        <select
                                            id="time"
                                            value={formData.time}
                                            onChange={(e) =>
                                                setFormData({ ...formData, time: e.target.value })
                                            }
                                            className="flex h-11 w-full rounded-lg border-2 border-neutral-200 bg-white px-4 py-2 text-sm"
                                            required
                                            disabled={!formData.date || !formData.serviceId}
                                        >
                                            <option value="">Selecione um horário</option>
                                            {availableSlots?.map((slot) => (
                                                <option key={slot} value={slot}>
                                                    {slot}
                                                </option>
                                            ))}
                                        </select>
                                        {formData.date &&
                                            formData.serviceId &&
                                            availableSlots?.length === 0 && (
                                                <p className="text-sm text-neutral-600">
                                                    Nenhum horário disponível para esta data
                                                </p>
                                            )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="notes">Observações</Label>
                                    <Textarea
                                        id="notes"
                                        value={formData.notes}
                                        onChange={(e) =>
                                            setFormData({ ...formData, notes: e.target.value })
                                        }
                                        placeholder="Alguma informação adicional sobre o agendamento..."
                                        rows={4}
                                    />
                                </div>

                                {error && (
                                    <Alert
                                        variant="destructive"
                                        className="bg-red-50 border-red-200 text-red-900"
                                    >
                                        <AlertCircle className="h-4 w-4 text-red-600" />
                                        <AlertTitle className="text-red-800">
                                            Erro ao agendar
                                        </AlertTitle>
                                        <AlertDescription className="text-red-700">
                                            {error}
                                        </AlertDescription>
                                    </Alert>
                                )}

                                <div className="flex gap-4">
                                    <Button
                                        type="submit"
                                        disabled={createAppointment.isPending}
                                        className="gap-2"
                                    >
                                        <Calendar className="h-5 w-5" />
                                        {createAppointment.isPending
                                            ? "Agendando..."
                                            : "Confirmar Agendamento"}
                                    </Button>
                                    <Link href="/dashboard">
                                        <Button type="button" variant="outline">
                                            Cancelar
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}
