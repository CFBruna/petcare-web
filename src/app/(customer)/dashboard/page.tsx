"use client";

import Navbar from "@/presentation/components/layouts/Navbar";
import { usePets } from "@/presentation/hooks/usePets";
import { useAppointments } from "@/presentation/hooks/useAppointments";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/presentation/components/ui/card";
import { Heart, Calendar, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/presentation/components/ui/button";

export default function DashboardPage() {
    const { data: pets, isLoading: petsLoading } = usePets();
    const { data: appointments, isLoading: appointmentsLoading } = useAppointments();

    const upcomingAppointments =
        appointments?.filter((apt) => apt.isPending() || apt.isConfirmed()).slice(0, 3) || [];

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="mb-8">
                        <h1 className="text-4xl font-heading font-bold text-neutral-900 mb-2">
                            Dashboard
                        </h1>
                        <p className="text-neutral-600">
                            Bem-vindo de volta! Aqui está um resumo do cuidado dos seus pets.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Meus Pets</CardTitle>
                                <Heart className="h-5 w-5 text-primary-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{pets?.length || 0}</div>
                                <p className="text-xs text-neutral-600 mt-1">pets cadastrados</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
                                <Calendar className="h-5 w-5 text-accent-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                    {upcomingAppointments.length}
                                </div>
                                <p className="text-xs text-neutral-600 mt-1">
                                    próximos agendamentos
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Loja</CardTitle>
                                <Package className="h-5 w-5 text-secondary-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">100+</div>
                                <p className="text-xs text-neutral-600 mt-1">
                                    produtos disponíveis
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Upcoming Appointments */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Próximos Agendamentos</CardTitle>
                                <CardDescription>
                                    Seus agendamentos confirmados e pendentes
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {appointmentsLoading ? (
                                    <div className="text-center py-8 text-neutral-600">
                                        Carregando...
                                    </div>
                                ) : upcomingAppointments.length > 0 ? (
                                    <div className="space-y-4">
                                        {upcomingAppointments.map((apt) => (
                                            <div
                                                key={apt.id}
                                                className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg"
                                            >
                                                <div>
                                                    <p className="font-semibold text-neutral-900">
                                                        {apt.petName}
                                                    </p>
                                                    <p className="text-sm text-neutral-600">
                                                        {apt.service.name}
                                                    </p>
                                                    <p className="text-xs text-neutral-500 mt-1">
                                                        {new Date(
                                                            apt.scheduleTime
                                                        ).toLocaleDateString("pt-BR", {
                                                            day: "2-digit",
                                                            month: "long",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${apt.getStatusColor()}`}
                                                >
                                                    {apt.getStatusLabel()}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="flex gap-2">
                                            <Link href="/appointments" className="flex-1">
                                                <Button variant="outline" className="w-full">
                                                    Ver Todos
                                                </Button>
                                            </Link>
                                            <Link href="/appointments/new" className="flex-1">
                                                <Button className="w-full">Agendar</Button>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Calendar className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
                                        <p className="text-neutral-600 mb-4">
                                            Nenhum agendamento futuro
                                        </p>
                                        <Link href="/appointments/new">
                                            <Button size="sm">Agendar Serviço</Button>
                                        </Link>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* My Pets */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Meus Pets</CardTitle>
                                <CardDescription>Seus companheiros cadastrados</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {petsLoading ? (
                                    <div className="text-center py-8 text-neutral-600">
                                        Carregando...
                                    </div>
                                ) : pets && pets.length > 0 ? (
                                    <div className="space-y-4">
                                        {pets.slice(0, 3).map((pet) => (
                                            <div
                                                key={pet.id}
                                                className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg"
                                            >
                                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                                    <Heart
                                                        className="h-6 w-6 text-primary-600"
                                                        fill="currentColor"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-neutral-900">
                                                        {pet.name}
                                                    </p>
                                                    <p className="text-sm text-neutral-600">
                                                        {pet.breed.name} •{" "}
                                                        {pet.getAge() || "Idade não informada"}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        <Link href="/pets">
                                            <Button variant="outline" className="w-full">
                                                Ver Todos
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Heart className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
                                        <p className="text-neutral-600 mb-4">
                                            Nenhum pet cadastrado ainda
                                        </p>
                                        <Link href="/pets">
                                            <Button size="sm">Cadastrar Pet</Button>
                                        </Link>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </>
    );
}
