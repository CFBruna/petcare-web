import Link from "next/link";
import Image from "next/image";

export function PublicFooter() {
    return (
        <footer className="bg-neutral-900 text-neutral-300 py-12 mt-16">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                        <div className="relative w-10 h-10 bg-white rounded-lg p-1">
                            <Image
                                src="/images/logo.svg"
                                alt="PetCare Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-xl font-heading font-bold text-white">PetCare</span>
                    </div>
                    <p className="text-sm text-neutral-400">
                        Cuidando do seu melhor amigo com carinho e dedicação.
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-white mb-4">Links Úteis</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/products" className="hover:text-white">
                                Produtos
                            </Link>
                        </li>
                        <li>
                            <Link href="/servicos" className="hover:text-white">
                                Serviços
                            </Link>
                        </li>
                        <li>
                            <Link href="/sobre" className="hover:text-white">
                                Sobre Nós
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-white mb-4">Contato</h3>
                    <ul className="space-y-2 text-sm">
                        <li>contato@petcare.com</li>
                        <li>(11) 99999-9999</li>
                        <li>São Paulo, SP</li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 text-center mt-12 pt-8 border-t border-neutral-800">
                <p className="text-sm">© 2025 PetCare. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}
