import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useState } from 'react';

export default function Index({ auth, availableEquipment, myBorrowedEquipment }) {
    const { flash } = usePage().props;
    const { post, processing } = useForm();
    
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [modalData, setModalData] = useState({ action: null, equipment: null });

    const openConfirmModal = (action, equipment) => {
        setModalData({ action, equipment });
        setShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        setShowConfirmModal(false);
        setModalData({ action: null, equipment: null });
    };

    const submitAction = (e) => {
        e.preventDefault();
        const { action, equipment } = modalData;
        const routeName = action === 'borrow' ? 'technician.equipment.borrow' : 'technician.equipment.return';
        
        post(route(routeName, equipment.id), {
            preserveScroll: true,
            onSuccess: () => closeConfirmModal(),
        });
    };

    const isBorrowing = modalData.action === 'borrow';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Peminjaman Alat</h2>}
        >
            <Head title="Peminjaman Alat" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {flash?.success && (<div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert"><p>{flash.success}</p></div>)}
                    {flash?.error && (<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert"><p>{flash.error}</p></div>)}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium">Alat yang Sedang Anda Pinjam</h3>
                            <div className="mt-4">
                                {myBorrowedEquipment.length > 0 ? (
                                    <ul className="divide-y divide-gray-200">
                                        {myBorrowedEquipment.map(item => (
                                            <li key={item.id} className="py-4 flex justify-between items-center">
                                                <div className="flex items-center space-x-4">
                                                    <img src={item.image_path ? `/storage/${item.image_path}` : 'https://via.placeholder.com/150'} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                                    <span>{item.name}</span>
                                                </div>
                                                <button 
                                                    onClick={() => openConfirmModal('return', item)}
                                                    className="text-white bg-blue-600 hover:bg-blue-700 font-bold py-2 px-3 rounded text-sm transition ease-in-out duration-150"
                                                >
                                                    Kembalikan
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : <p className="text-sm text-gray-500">Anda tidak sedang meminjam alat apapun.</p>}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium">Alat yang Tersedia</h3>
                             <div className="mt-4">
                                {availableEquipment.length > 0 ? (
                                    <ul className="divide-y divide-gray-200">
                                        {availableEquipment.map(item => (
                                            <li key={item.id} className="py-4 flex justify-between items-center">
                                                <div className="flex items-center space-x-4">
                                                    <img src={item.image_path ? `/storage/${item.image_path}` : 'https://via.placeholder.com/150'} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                                    <span>{item.name}</span>
                                                </div>
                                                <button 
                                                    onClick={() => openConfirmModal('borrow', item)}
                                                    className="text-white bg-green-600 hover:bg-green-700 font-bold py-2 px-3 rounded text-sm transition ease-in-out duration-150"
                                                >
                                                    Pinjam
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : <p className="text-sm text-gray-500">Tidak ada alat yang tersedia saat ini.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showConfirmModal} onClose={closeConfirmModal} maxWidth="sm">
                <form onSubmit={submitAction} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Konfirmasi Aksi
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Anda yakin ingin {isBorrowing ? 'meminjam' : 'mengembalikan'} alat <span className="font-medium">{modalData.equipment?.name}</span>?
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeConfirmModal}>Batal</SecondaryButton>
                        <PrimaryButton 
                            className={`ms-3 ${isBorrowing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`} 
                            disabled={processing}
                        >
                            {isBorrowing ? 'Ya, Pinjam' : 'Ya, Kembalikan'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}