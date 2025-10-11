import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'flex items-center w-full px-4 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-l-4 border-green-500 text-green-600 bg-green-50' // <-- Perubahan di sini
                    : 'border-l-4 border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50') +
                className
            }
        >
            {children}
        </Link>
    );
}