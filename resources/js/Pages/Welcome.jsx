import { Link, Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { motion } from 'framer-motion';

export default function Welcome({ auth, packages = [] }) {
    
    const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

    // Varian animasi untuk judul (muncul satu per satu)
    const sentence = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.2,
                staggerChildren: 0.04,
            },
        },
    };
    
    // Varian animasi untuk huruf
    const letter = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const heroTitle = "Era Baru Konektivitas";

    // Varian animasi untuk kartu (muncul dari bawah)
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1, // Setiap kartu muncul dengan jeda
                type: 'spring',
                stiffness: 100
            }
        })
    };

    return (
        <>
            <Head title="Selamat Datang di Filltech Berkah Bersama" />
            
            {/* Latar belakang utama cerah */}
            <div className="relative min-h-screen bg-gray-50 text-gray-800 font-sans overflow-x-hidden">
                
                {/* --- Header & Navigasi --- */}
                <header className="absolute top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-sm shadow-sm">
                    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <Link href="/">
                                <ApplicationLogo className="block h-10 w-auto" />
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="hidden md:block"
                        >
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="font-semibold text-gray-600 hover:text-gray-900"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="font-semibold text-gray-600 hover:text-gray-900"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="ms-4 inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-800 transition-colors duration-200"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </motion.div>
                    </nav>
                </header>

                <main className="relative z-10">
                    {/* --- Hero Section --- */}
                    <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center overflow-hidden">
                        {/* Latar belakang gradien cerah */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50 to-emerald-100 opacity-90"></div>
                        <div className="absolute inset-0 opacity-10">
                            {/* Gambar latar yang cerah dan modern */}
                            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071" alt="Modern Work" className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="relative z-10 p-4">
                            <motion.h1
                                variants={sentence}
                                initial="hidden"
                                animate="visible"
                                className="text-5xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700"
                            >
                                {heroTitle.split("").map((char, index) => (
                                    <motion.span key={char + "-" + index} variants={letter}>
                                        {char}
                                    </motion.span>
                                ))}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 1.2 }}
                                className="text-xl md:text-2xl text-gray-600 mb-8"
                            >
                                Rasakan kecepatan internet fiber optik tanpa batas dari Filltech.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 1.5, type: 'spring', stiffness: 100 }}
                            >
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest shadow-lg shadow-green-500/30 transform hover:scale-105 hover:shadow-green-400/40 transition-all duration-300"
                                >
                                    Daftar Sekarang
                                </Link>
                            </motion.div>
                        </div>
                    </section>

                    {/* --- Bagian Paket Harga --- */}
                    <section id="packages" className="py-20 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Paket Unggulan Kami</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {packages.map((pkg, i) => (
                                    <motion.div 
                                        key={pkg.id} 
                                        custom={i} // Kirim index untuk delay animasi
                                        variants={cardVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        whileHover={{ y: -10, scale: 1.03, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col shadow-lg"
                                    >
                                        <h3 className="text-2xl font-bold text-green-600">{pkg.name}</h3>
                                        <p className="text-5xl font-extrabold my-4 text-gray-900">{pkg.speed}</p>
                                        <p className="text-gray-600 text-sm mb-4 flex-grow">{pkg.description || 'Deskripsi default paket...'}</p>
                                        <div className="border-t border-gray-100 pt-4 mt-auto">
                                            <p className="text-3xl font-bold text-right text-gray-900">{formatCurrency(pkg.price)}<span className="text-lg font-normal text-gray-500">/bulan</span></p>
                                            <Link 
                                                href={route('register')} 
                                                className="mt-4 w-full text-center inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                                            >
                                                Pilih Paket
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>

                {/* --- Footer --- */}
                <footer className="bg-white text-gray-600 py-12 border-t border-gray-200 relative z-10">
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