import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

// Kumpulan Ikon
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 013-1.197M15 21a9 9 0 00-9-9" /></svg>;
const TaskIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const ReportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const ToolsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const WifiIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.555a5.5 5.5 0 017.778 0M12 20.25a.75.75 0 100-1.5.75.75 0 000 1.5zM4.444 12.889a10 10 0 0115.112 0" /></svg>;
const InvoiceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const QrIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /><path d="M3 3h2v2H3zm16 16h2v2h-2zM3 19h2v2H3zm16-16h2v2h-2zM9 3h2v2H9zm6 0h2v2h-2zM3 9h2v2H3zm18 0h-2v2h2zM9 19h2v2H9zm6 0h2v2h-2z" /></svg>;
const LogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;

export default function Authenticated({ user, header, children }) {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(true);

    const isAdmin = user.role === 'admin' || user.role === 'superuser';
    const isTechnician = user.role === 'technician';
    const isSuperuser = user.role === 'superuser';

    const SidebarContent = ({ isCollapsed }) => (
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
             <div className="flex items-center justify-center h-8 flex-shrink-0 px-4">
                <Link href="/">
                    <span className={`transition-opacity duration-200 ${isCollapsed ? 'md:hidden' : 'md:inline-block'}`}>
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                    </span>
                    <span className={`transition-opacity duration-200 ${!isCollapsed && 'md:hidden'}`}>
                        <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 100-18 9 9 0 000 18z"/><path d="M12 3v1m0 16v1m8-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/></svg>
                    </span>
                </Link>
            </div>
            
            <nav className={`mt-5 flex-1 px-2 space-y-1 ${isCollapsed && 'md:px-1'}`}>
                <NavLink href={route('dashboard')} active={route().current('dashboard')} className={`justify-center md:justify-start`}>
                    <DashboardIcon />
                    <span className={`ml-3 ${isCollapsed && 'md:hidden'}`}>Dashboard</span>
                </NavLink>

                {isTechnician && (
                    <NavLink href={route('technician.equipment.index')} active={route().current('technician.equipment.index')} className={`justify-center md:justify-start`}>
                        <ToolsIcon />
                        <span className={`ml-3 ${isCollapsed && 'md:hidden'}`}>Peminjaman Alat</span>
                    </NavLink>
                )}
                
                {isAdmin && (
                    <>
                        <p className={`px-4 pt-4 text-xs font-semibold text-gray-400 uppercase ${isCollapsed && 'md:hidden'}`}>Admin Menu</p>
                        <NavLink href={route('admin.packages.index')} active={route().current('admin.packages.index')} className={`justify-center md:justify-start`}><WifiIcon/><span className={`ml-3 ${isCollapsed && 'md:hidden'}`}>Paket WiFi</span></NavLink>
                        <NavLink href={route('admin.users.index')} active={route().current('admin.users.index')} className={`justify-center md:justify-start`}><UsersIcon /><span className={`ml-3 ${isCollapsed && 'md:hidden'}`}>Manajemen User</span></NavLink>
                        <NavLink href={route('admin.tasks.index')} active={route().current('admin.tasks.index')} className={`justify-center md:justify-start`}><TaskIcon /><span className={`ml-3 ${isCollapsed && 'md:hidden'}`}>Manajemen Tugas</span></NavLink>
                        <NavLink href={route('admin.invoices.index')} active={route().current('admin.invoices.index')} className={`justify-center md:justify-start`}><InvoiceIcon /><span className={`ml-3 ${isCollapsed && 'md:hidden'}`}>Manajemen Tagihan</span></NavLink>
                        <NavLink href={route('admin.equipment.index')} active={route().current('admin.equipment.index')} className={`justify-center md:justify-start`}><ToolsIcon /><span className={`ml-3 ${isCollapsed && 'md:hidden'}`}>Manajemen Alat</span></NavLink>
                        <NavLink href={route('admin.reports.index')} active={route().current('admin.reports.index')} className={`justify-center md:justify-start`}><ReportIcon /><span className={`ml-3 ${isCollapsed && 'md:hidden'}`}>Laporan</span></NavLink>
                        <NavLink href={route('admin.attendance.qrcode')} active={route().current('admin.attendance.qrcode')} className={`justify-center md:justify-start`}><QrIcon /><span className={`ml-3 ${isCollapsed && 'md:hidden'}`}>QR Absensi</span></NavLink>
                    </>
                )}

                {isSuperuser && (
                    <>
                        <p className={`px-4 pt-4 text-xs font-semibold text-gray-400 uppercase ${isCollapsed && 'md:hidden'}`}>Superuser</p>
                        <NavLink href={route('superuser.activity-log.index')} active={route().current('superuser.activity-log.index')} className={`justify-center md:justify-start`}>
                            <LogIcon />
                            <span className={`ml-3 ${isCollapsed && 'md:hidden'}`}>Log Aktivitas</span>
                        </NavLink>
                    </>
                )}
            </nav>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            {/* --- Mobile Sidebar (Slide Out) --- */}
            <div className={`fixed inset-0 flex z-40 md:hidden ${mobileSidebarOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setMobileSidebarOpen(false)}></div>
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button onClick={() => setMobileSidebarOpen(false)} className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <div className="flex-1 h-0 overflow-y-auto">
                        <SidebarContent isCollapsed={false} />
                    </div>
                    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                        <div className="flex-shrink-0 w-full group block">
                            <div className="font-medium text-base text-gray-800">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">Log Out</ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-shrink-0 w-14"></div>
            </div>

            {/* --- Static Sidebar for Desktop --- */}
            <div 
                className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 transition-all duration-300 ease-in-out ${desktopSidebarCollapsed ? 'md:w-20' : 'md:w-64'}`}
                onMouseEnter={() => setDesktopSidebarCollapsed(false)}
                onMouseLeave={() => setDesktopSidebarCollapsed(true)}
            >
                <div className="flex flex-col flex-grow border-r border-gray-200 bg-white overflow-y-auto">
                    <SidebarContent isCollapsed={desktopSidebarCollapsed} />
                </div>
            </div>
            
            {/* --- Main Content Area --- */}
            <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${desktopSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'}`}>
                <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
                    <button onClick={() => setMobileSidebarOpen(true)} className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none md:hidden">
                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    <div className="flex-1 px-4 flex justify-between items-center">
                        <div>{header}</div>
                        <div className="ml-4 flex items-center md:ml-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none">
                                                {user.name}
                                                <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>

                <main>
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}