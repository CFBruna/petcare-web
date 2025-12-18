"use client";

import Navbar from "@/presentation/components/layouts/Navbar";
import { usePets, useBreeds, useCreatePet, useDeletePet } from "@/presentation/hooks/usePets";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Heart, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function PetsPage() {
    const { data: pets, isLoading } = usePets();
    const { data: breeds } = useBreeds();
    const createPet = useCreatePet();
    const deletePet = useDeletePet();

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        breedId: "",
        birthDate: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createPet.mutateAsync({
            name: formData.name,
            breedId: parseInt(formData.breedId),
            birthDate: formData.birthDate || undefined,
        });
        setFormData({ name: "", breedId: "", birthDate: "" });
        setShowForm(false);
    };

    const handleDelete = async (id: number, name: string) => {
        if (confirm(`Tem certeza que deseja remover ${name}?`)) {
            await deletePet.mutateAsync(id);
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-heading font-bold text-neutral-900 mb-2">
                                Meus Pets
                            </h1>
                            <p className="text-neutral-600">
                                Gerencie as informações dos seus companheiros
                            </p>
                        </div>
                        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
                            <Plus className="h-5 w-5" />
                            Adicionar Pet
                        </Button>
                    </div>

                    {/* Add Pet Form */}
                    {showForm && (
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle>Cadastrar Novo Pet</CardTitle>
                                <CardDescription>
                                    Preencha as informações do seu pet
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Nome do Pet</Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        name: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="breed">Raça</Label>
                                            <select
                                                id="breed"
                                                value={formData.breedId}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        breedId: e.target.value,
                                                    })
                                                }
                                                className="flex h-11 w-full rounded-lg border-2 border-neutral-200 bg-white px-4 py-2 text-sm"
                                                required
                                            >
                                                <option value="">Selecione uma raça</option>
                                                {breeds?.map((breed) => (
                                                    <option key={breed.id} value={breed.id}>
                                                        {breed.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="birthDate">Data de Nascimento</Label>
                                        <Input
                                            id="birthDate"
                                            type="date"
                                            value={formData.birthDate}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    birthDate: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button type="submit">Cadastrar</Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setShowForm(false)}
                                        >
                                            Cancelar
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {/* Pets Grid */}
                    {isLoading ? (
                        <div className="text-center py-12">
                            <p className="text-neutral-600">Carregando pets...</p>
                        </div>
                    ) : pets && pets.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pets.map((pet) => (
                                <Card key={pet.id}>
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                                                    <Heart
                                                        className="h-8 w-8 text-primary-600"
                                                        fill="currentColor"
                                                    />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-xl">
                                                        {pet.name}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        {pet.breed.name}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(pet.id, pet.name)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-neutral-600">Espécie:</span>
                                                <span className="font-semibold">
                                                    {pet.getSpeciesLabel()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-neutral-600">Idade:</span>
                                                <span className="font-semibold">
                                                    {pet.getAge() || "Não informada"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-neutral-600">Fase:</span>
                                                <span className="font-semibold">
                                                    {pet.isAdult() ? "Adulto" : "Filhote"}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <Heart className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                                    Nenhum pet cadastrado
                                </h3>
                                <p className="text-neutral-600 mb-6">
                                    Adicione seu primeiro pet para começar!
                                </p>
                                <Button onClick={() => setShowForm(true)} className="gap-2">
                                    <Plus className="h-5 w-5" />
                                    Adicionar Pet
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </>
    );
}
