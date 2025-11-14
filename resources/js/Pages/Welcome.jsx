import { Link, Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { motion } from 'framer-motion';

export default function Welcome({ auth, packages = [] }) {
    
    const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <>
            <Head title="Selamat Datang di Filltech Berkah Bersama" />
            
            <div className="relative min-h-screen bg-gray-900 text-gray-300 font-sans overflow-x-hidden">
                
                <header className="absolute top-0 left-0 right-0 z-20">
                    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link href="/">
                                <ApplicationLogo className="block h-10 w-auto" />
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="hidden md:block"
                        >
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="font-semibold text-gray-300 hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-green-500 transition-colors duration-200"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="font-semibold text-gray-300 hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-green-500 transition-colors duration-200"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="ms-4 inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-700 transition-colors duration-200"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </motion.div>
                    </nav>
                </header>

                <main>
                    <section className="relative h-[70vh] min-h-[450px] flex items-center justify-center text-center bg-gray-900 text-white overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-gray-900 opacity-80"></div>
                        <div className="absolute inset-0 opacity-20">
                            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726c?q=80&w=2070" alt="Abstract Technology" className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="relative z-10 p-4">
                            <motion.h1
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600"
                            >
                                Era Baru Konektivitas
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.4 }}
                                className="text-xl md:text-2xl text-gray-300 mb-8"
                            >
                                Rasakan kecepatan internet fiber optik tanpa batas dari Filltech.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.6, type: 'spring', stiffness: 100 }}
                            >
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/20 transform hover:scale-105 transition-all duration-300"
                                >
                                    Daftar Sekarang
                                </Link>
                            </motion.div>
                        </div>
                    </section>

                    <section id="packages" className="py-20 bg-gray-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-bold text-center mb-12 text-white">Paket Unggulan Kami</h2>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {packages.map((pkg) => (
                                    <motion.div 
                                        key={pkg.id} 
                                        variants={cardVariants}
                                        whileHover={{ y: -8, scale: 1.03 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col shadow-lg"
                                    >
                                        <h3 className="text-2xl font-bold text-green-400">{pkg.name}</h3>
                                        <p className="text-5xl font-extrabold my-4 text-white">{pkg.speed}</p>
                                        <p className="text-gray-400 text-sm mb-4 flex-grow">{pkg.description || 'Deskripsi default paket...'}</p>
                                        <div className="border-t border-gray-700 pt-4 mt-auto">
                                            <p className="text-3xl font-bold text-right text-white">{formatCurrency(pkg.price)}<span className="text-lg font-normal text-gray-400">/bulan</span></p>
                                            <Link 
                                                href={route('register')} 
                                                className="mt-4 w-full text-center inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-500 transition-colors duration-200"
                                            >
                                                Pilih Paket
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </section>
                </main>

                <footer className="bg-black text-gray-400 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <ApplicationLogo className="h-12 w-auto mx-auto mb-4" />
                        <p>&copy; {new Date().getFullYear()} PT. Filltech Berkah Bersama. All rights reserved.</p>
                        <p className="text-sm text-gray-500 mt-2">Membawa Masa Depan Internet ke Rumah Anda.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}