import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWorkspace } from "../features/workspaceSlice";
import { useNavigate } from "react-router-dom";
import { dummyWorkspaces } from "../assets/assets";

function WorkspaceDropdown() {
    // Added fallback empty array [] to prevent .length crashes
    const workspaces = useSelector((state) => state.workspace?.workspaces || []);
    const currentWorkspace = useSelector((state) => state.workspace?.currentWorkspace || null);
    
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSelectWorkspace = (organizationId) => {
        dispatch(setCurrentWorkspace(organizationId));
        setIsOpen(false);
        navigate('/');
    };

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative m-4" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(prev => !prev)} 
                className="w-full flex items-center justify-between p-3 h-auto text-left rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
                <div className="flex items-center gap-3">
                    {/* FIXED: Conditional rendering for the image to stop console warnings */}
                    {currentWorkspace?.image_url ? (
                        <img 
                            src={currentWorkspace.image_url} 
                            alt={currentWorkspace.name} 
                            className="w-8 h-8 rounded shadow object-cover" 
                        />
                    ) : (
                        <div className="w-8 h-8 rounded shadow bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                            <span className="text-xs font-bold text-zinc-500">
                                {currentWorkspace?.name?.charAt(0) || "W"}
                            </span>
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-800 dark:text-white text-sm truncate">
                            {currentWorkspace?.name || "Select Workspace"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-zinc-400 truncate">
                            {workspaces.length} workspace{workspaces.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-zinc-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-64 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded shadow-lg mt-1 top-full left-0 overflow-hidden">
                    <div className="p-2">
                        <p className="text-[10px] text-gray-500 dark:text-zinc-500 font-bold uppercase tracking-wider mb-2 px-2">
                            Workspaces
                        </p>
                        
                        {/* Note: Using dummyWorkspaces here as per your original code */}
                        {dummyWorkspaces.map((ws) => (
                            <div 
                                key={ws.id} 
                                onClick={() => onSelectWorkspace(ws.id)} 
                                className="flex items-center gap-3 p-2 cursor-pointer rounded hover:bg-gray-100 dark:hover:bg-zinc-800 group"
                            >
                                {ws.image_url ? (
                                    <img src={ws.image_url} alt={ws.name} className="w-6 h-6 rounded object-cover" />
                                ) : (
                                    <div className="w-6 h-6 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px]">
                                        {ws.name.charAt(0)}
                                    </div>
                                )}
                                
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                                        {ws.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-zinc-400 truncate">
                                        {ws.membersCount || 0} members
                                    </p>
                                </div>
                                {currentWorkspace?.id === ws.id && (
                                    <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                )}
                            </div>
                        ))}
                    </div>

                    <hr className="border-gray-200 dark:border-zinc-700" />

                    <div className="p-2 cursor-pointer rounded group hover:bg-gray-100 dark:hover:bg-zinc-800">
                        <p className="flex items-center text-xs gap-2 my-1 w-full text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 font-medium">
                            <Plus className="w-4 h-4" /> Create Workspace
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WorkspaceDropdown;
