import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'flex items-center w-full px-4 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-l-4 border-indigo-500 text-indigo-600 bg-indigo-50 focus:outline-none focus:bg-indigo-100'
                    : 'border-l-4 border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 ') +
                className
            }
        >
            {children}
        </Link>
    );
}