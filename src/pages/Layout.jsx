import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadTheme } from '../features/themeSlice'
import { Loader2Icon, AlertCircle } from 'lucide-react'

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [timedOut, setTimedOut] = useState(false)
    
    // Get loading, error, and workspaces from state
    const { loading, workspaces, error } = useSelector((state) => state.workspace)
    const dispatch = useDispatch()

    // Initial load of theme
    useEffect(() => {
        dispatch(loadTheme())
    }, [dispatch])

    // Safety Timeout: If loading takes more than 5 seconds, allow the UI to show
    useEffect(() => {
        let timer;
        if (loading) {
            timer = setTimeout(() => {
                setTimedOut(true);
            }, 5000); 
        }
        return () => clearTimeout(timer);
    }, [loading]);

    // Show Loader ONLY if loading is true, we have no data, no error, and haven't timed out
    const shouldShowLoader = loading && workspaces.length === 0 && !error && !timedOut;

    if (shouldShowLoader) {
        return (
            <div className='flex flex-col items-center justify-center h-screen bg-white dark:bg-zinc-950'>
                <Loader2Icon className="size-7 text-blue-500 animate-spin mb-4" />
                <p className="text-zinc-500 text-sm animate-pulse">Connecting to Workspace...</p>
            </div>
        )
    }

    return (
        <div className="flex bg-white dark:bg-zinc-950 text-gray-900 dark:text-slate-100 min-h-screen">
            {/* Sidebar component */}
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Navbar component */}
                <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                
                {/* Main Content Area */}
                <div className="flex-1 h-full p-6 xl:p-10 xl:px-16 overflow-y-auto">
                    {/* Error Banner (Optional: shows if API fails) */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 text-red-600 dark:text-red-400">
                            <AlertCircle size={18} />
                            <p className="text-sm font-medium">Server Connection Error: {error}</p>
                        </div>
                    )}
                    
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout
