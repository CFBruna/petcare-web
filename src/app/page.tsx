import Link from "next/link";
import { ArrowRight, Heart, Calendar, ShoppingBag, Sparkles } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 text-white">
                <div className="max-w-7xl mx-auto px-4 py-24 md:py-32">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <h1 className="text-5xl md:text-6xl font-heading font-bold leading-tight">
                                Cuidado completo para seu{" "}
                                <span className="text-secondary-300">melhor amigo</span>
                            </h1>
                            <p className="text-xl text-primary-100 leading-relaxed">
                                Agendamento online, loja de produtos, prontuário de saúde e muito
                                mais. Tudo em um só lugar para o bem-estar do seu pet.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/login"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
                                >
                                    Acessar Sistema
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                                <Link
                                    href="/register"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg transition-all border border-white/30"
                                >
                                    Criar Conta
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="aspect-square bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                <Heart className="w-32 h-32 text-secondary-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4">
                            Nossos Serviços
                        </h2>
                        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                            Oferecemos uma gama completa de serviços para o cuidado do seu pet
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Service Card 1 */}
                        <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                                <Calendar className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-2xl font-heading font-semibold mb-3 text-neutral-900">
                                Agendamento Online
                            </h3>
                            <p className="text-neutral-600 leading-relaxed">
                                Agende consultas, banho e tosa com facilidade. Veja horários
                                disponíveis em tempo real.
                            </p>
                        </div>

                        {/* Service Card 2 */}
                        <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                            <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent-600 transition-colors">
                                <Heart className="w-8 h-8 text-accent-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-2xl font-heading font-semibold mb-3 text-neutral-900">
                                Prontuário de Saúde
                            </h3>
                            <p className="text-neutral-600 leading-relaxed">
                                Histórico completo de vacinas, consultas e tratamentos. Tudo
                                organizado e acessível.
                            </p>
                        </div>

                        {/* Service Card 3 */}
                        <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                            <div className="w-16 h-16 bg-secondary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary-600 transition-colors">
                                <ShoppingBag className="w-8 h-8 text-secondary-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-2xl font-heading font-semibold mb-3 text-neutral-900">
                                Loja de Produtos
                            </h3>
                            <p className="text-neutral-600 leading-relaxed">
                                Ração, brinquedos, acessórios e muito mais. Produtos de qualidade
                                com preços especiais.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Sparkles className="w-16 h-16 mx-auto mb-6 text-secondary-300" />
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                        Pronto para começar?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                        Junte-se a centenas de tutores que já confiam no PetCare para o cuidado de
                        seus pets.
                    </p>
                    <Link
                        href="/register"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 hover:bg-neutral-50 font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        Criar Conta Gratuita
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-neutral-900 text-neutral-300 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-lg mb-2">© 2025 PetCare. Todos os direitos reservados.</p>
                    <p className="text-sm text-neutral-500">
                        Desenvolvido com ❤️ para tutores apaixonados por seus pets
                    </p>
                </div>
            </footer>
        </div>
    );
}
