import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { QRCodeSVG } from 'qrcode.react'; // Kita akan install library ini

export default function ShowQrCode({ auth, dailyToken }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">QR Code Absensi Hari Ini</h2>}
        >
            <Head title="QR Code Absensi" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 text-center">
                            <h3 className="text-lg font-medium">Pindai kode ini untuk Clock-In / Clock-Out</h3>
                            <p className="text-sm text-gray-500 mb-4">Kode ini akan berganti setiap hari.</p>
                            <div className="flex justify-center">
                                <QRCodeSVG value={dailyToken} size={256} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}