import { z } from 'zod';

export const zodRegistrationSchema = z.object({
    name: z.string().min(1, { message: "Nama wajib diisi." }),
    email: z.string().email({ message: "Format email tidak valid." }),
    phone_number: z.string().min(10, { message: "Nomor WhatsApp minimal 10 digit." }),
    address: z.string().optional(), // Boleh kosong
    rt: z.string().min(1, { message: "RT wajib diisi." }),
    rw: z.string().min(1, { message: "RW wajib diisi." }),
    block: z.string().min(1, { message: "Blok wajib diisi." }),
    house_number: z.string().min(1, { message: "No. Rumah wajib diisi." }),
    password: z.string().min(8, { message: "Password minimal 8 karakter." }),
    password_confirmation: z.string(),
}).refine(data => data.password === data.password_confirmation, {
    message: "Konfirmasi password tidak cocok.",
    path: ["password_confirmation"], // Menampilkan error di field konfirmasi
});