import { useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function Scanner() {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: { width: 250, height: 250 },
            fps: 5,
        }, false);

        function onScanSuccess(decodedText, decodedResult) {
            scanner.clear();
            router.post(route('technician.attendance.store'), { qr_token: decodedText });
        }

        function onScanFailure(error) {
            // handle scan failure, usually better to ignore and keep scanning.
        }

        scanner.render(onScanSuccess, onScanFailure);

        return () => {
            scanner.clear().catch(error => {
                console.error("Gagal membersihkan scanner.", error);
            });
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
            <h1 className="text-2xl font-bold mb-4">Pindai QR Code Absensi</h1>
            <div id="reader" className="w-full max-w-sm"></div>
            <a href={route('dashboard')} className="mt-4 text-sm text-gray-400 hover:underline">Kembali ke Dashboard</a>
        </div>
    );
}