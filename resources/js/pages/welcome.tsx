import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* Navbar */}
            <header className="flex items-center justify-between p-4">
                <h1 className="text-xl font-bold text-[#1b1b18] dark:text-white">MyApp</h1>
                <nav className="space-x-4 text-sm">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="rounded-md bg-[#f53003] px-4 py-1.5 text-white transition hover:bg-[#c72100] dark:bg-[#FF4433] dark:hover:bg-[#e03a2a]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-[#1b1b18] hover:text-[#f53003] dark:text-white/90 dark:hover:text-[#FF4433]">
                                Login
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-md border border-white/30 px-4 py-1.5 transition hover:bg-white/20 dark:border-white/20"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header>
            {/* Fond avec dégradé pour mieux voir la transparence */}
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30">
                {/* Carte principale avec effet glassmorphism */}
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/20 p-6 shadow-2xl backdrop-blur-lg dark:border-white/10 dark:bg-black/20">
                        {/* Contenu */}
                        <div className="relative z-10">
                            {/* Hero Section */}
                            <section className="py-12 sm:py-16 lg:py-20">
                                <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="max-w-xl text-center lg:text-left">
                                        <h2 className="text-3xl font-bold tracking-tight text-[#1b1b18] sm:text-4xl dark:text-white">
                                            Gérez vos emprunts tech avec <span className="text-[#f53003] dark:text-[#FF4433]">TechLoan</span>
                                        </h2>
                                        <p className="mt-4 text-lg text-[#1b1b18]/90 dark:text-white/80">
                                            Optimisez la circulation de votre matériel informatique, suivez les emprunts en temps réel et gardez le
                                            contrôle complet de votre parc d'ordinateurs.
                                        </p>
                                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                                            <Link
                                                href={auth.user ? route('dashboard') : route('register')}
                                                className="inline-flex items-center justify-center rounded-md bg-[#f53003] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#c72100] dark:bg-[#FF4433] dark:hover:bg-[#e03a2a]"
                                            >
                                                🚀 Commencer
                                            </Link>
                                            <Link
                                                href="#features"
                                                className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white/20 dark:border-white/20"
                                            >
                                                Apprendre plus
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="relative w-full max-w-md">
                                        <div className="absolute -top-4 -right-4 h-full w-full rotate-6 transform rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-60"></div>
                                        <div className="relative overflow-hidden rounded-xl border border-white/20 bg-white/20 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-black/20">
                                            <div className="flex items-center justify-start bg-white/20 p-2 dark:bg-black/30">
                                                <div className="flex space-x-1.5">
                                                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="mb-4 flex items-center space-x-2">
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500">
                                                        <span className="text-xs font-bold text-white">R</span>
                                                    </div>
                                                    <div className="text-sm text-[#1b1b18] dark:text-white/80">React + Laravel</div>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="h-4 w-3/4 rounded bg-white/40 dark:bg-black/30"></div>
                                                    <div className="h-4 rounded bg-white/40 dark:bg-black/30"></div>
                                                    <div className="h-4 w-5/6 rounded bg-white/40 dark:bg-black/30"></div>
                                                    <div className="h-4 w-1/2 rounded bg-white/40 dark:bg-black/30"></div>
                                                </div>
                                                <div className="mt-6 grid grid-cols-2 gap-2">
                                                    <div className="h-20 rounded-lg bg-white/30 dark:bg-black/30"></div>
                                                    <div className="h-20 rounded-lg bg-white/30 dark:bg-black/30"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Features Section */}
                            <section id="features" className="py-16">
                                <div className="mx-auto max-w-2xl text-center">
                                    <h2 className="text-3xl font-bold tracking-tight text-[#1b1b18] dark:text-white">
                                        {' '}
                                        Fonctionnalités clés pour votre gestion d'emprunts
                                    </h2>
                                    <p className="mt-4 text-lg text-[#1b1b18]/90 dark:text-white/80">
                                        Tous les outils nécessaires pour optimiser le suivi de votre matériel informatique
                                    </p>
                                </div>
                                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                                    {[
                                        {
                                            icon: '⚡',
                                            title: 'Gestion rapide des emprunts',
                                            description:
                                                "Processus d'emprunt et de retour d'ordinateurs optimisé pour gérer le flux de matériel en temps réel.",
                                        },
                                        {
                                            icon: '🔐',
                                            title: 'Sécurité des équipements',
                                            description:
                                                'Suivi précis de chaque ordinateur emprunté avec authentification des utilisateurs pour une traçabilité complète.',
                                        },
                                        {
                                            icon: '📅',
                                            title: 'Calendrier des disponibilités',
                                            description:
                                                "Visualisation intuitive des créneaux d'emprunt et des ordinateurs disponibles pour une planification simplifiée.",
                                        },
                                        {
                                            icon: '🔔 (En cours de dev)',
                                            title: 'Alertes automatiques',
                                            description: 'Notifications pour les retards de retour et rappels pour les réservations à venir.',
                                        },
                                        {
                                            icon: '📝 (En cours de dev)',
                                            title: "Fiche d'état numérique",
                                            description:
                                                "Validation de l'état du matériel avant/après emprunt avec signature électronique pour éviter les litiges.",
                                        },
                                    ].map((feature, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl border border-white/20 bg-white/20 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-black/20"
                                        >
                                            <div className="mb-4 text-2xl">{feature.icon}</div>
                                            <h3 className="mb-2 text-xl font-semibold text-[#1b1b18] dark:text-white">{feature.title}</h3>
                                            <p className="text-[#1b1b18]/80 dark:text-white/70">{feature.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Testimonials */}

                            {/* CTA Section */}
                            <section className="py-16">
                                <div className="rounded-xl bg-gradient-to-r from-blue-400/60 to-purple-500/60 p-8 backdrop-blur-sm sm:p-12">
                                    <div className="mx-auto max-w-3xl text-center">
                                        <h2 className="text-3xl font-bold tracking-tight text-white">Prêt à simplifier vos emprunts ?</h2>
                                        <p className="mt-4 text-lg text-white/90">
                                            Rejoignez les organisations qui gèrent leur parc informatique en toute sérénité.
                                        </p>
                                        <div className="mt-8">
                                            <Link
                                                href={auth.user ? route('dashboard') : route('register')}
                                                className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#f53003] shadow-sm hover:bg-gray-100 dark:text-[#FF4433]"
                                            >
                                                Essai gratuit
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Footer */}
                            <footer className="pt-12">
                                <div className="flex flex-col items-center justify-between border-t border-white/20 pt-8 md:flex-row">
                                    <div className="mb-6 md:mb-0">
                                        <h2 className="text-xl font-bold text-[#1b1b18] dark:text-white">MyApp</h2>
                                        <p className="mt-2 text-sm text-[#1b1b18]/80 dark:text-white/70">© 2023 MyApp. All rights reserved.</p>
                                    </div>
                                    <div className="flex space-x-6">
                                        <Link href="#" className="text-[#1b1b18] hover:text-[#f53003] dark:text-white/80 dark:hover:text-[#FF4433]">
                                            Terms
                                        </Link>
                                        <Link href="#" className="text-[#1b1b18] hover:text-[#f53003] dark:text-white/80 dark:hover:text-[#FF4433]">
                                            Privacy
                                        </Link>
                                        <Link href="#" className="text-[#1b1b18] hover:text-[#f53003] dark:text-white/80 dark:hover:text-[#FF4433]">
                                            Contact
                                        </Link>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
