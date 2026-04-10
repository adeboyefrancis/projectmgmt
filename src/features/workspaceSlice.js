import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE = "/api";

// ─── Async Thunks ───────────────────────────────────────────────────────────

// Fetch all workspaces on app load — replaces dummyWorkspaces seed
export const fetchWorkspaces = createAsyncThunk(
    "workspace/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE}/workspaces`);
            if (!res.ok) throw new Error("Failed to fetch workspaces");
            return await res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Create a new workspace
export const createWorkspace = createAsyncThunk(
    "workspace/create",
    async (workspaceData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE}/workspaces`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(workspaceData),
            });
            if (!res.ok) throw new Error("Failed to create workspace");
            return await res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Create a project inside a workspace
export const createProject = createAsyncThunk(
    "workspace/createProject",
    async ({ workspaceId, projectData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE}/workspaces/${workspaceId}/projects`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectData),
            });
            if (!res.ok) throw new Error("Failed to create project");
            return await res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Update a project (called by ProjectSettings)
export const updateProject = createAsyncThunk(
    "workspace/updateProject",
    async ({ projectId, projectData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE}/workspaces/projects/${projectId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectData),
            });
            if (!res.ok) throw new Error("Failed to update project");
            return await res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Create a task inside a project
export const createTask = createAsyncThunk(
    "workspace/createTask",
    async ({ projectId, taskData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE}/workspaces/projects/${projectId}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData),
            });
            if (!res.ok) throw new Error("Failed to create task");
            return await res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Update a task (status change, edit, etc.)
export const updateTaskAsync = createAsyncThunk(
    "workspace/updateTask",
    async ({ taskId, taskData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE}/workspaces/projects/tasks/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData),
            });
            if (!res.ok) throw new Error("Failed to update task");
            return await res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Delete a task
export const deleteTaskAsync = createAsyncThunk(
    "workspace/deleteTask",
    async (taskId, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE}/workspaces/projects/tasks/${taskId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete task");
            return taskId;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// ─── Slice ───────────────────────────────────────────────────────────────────

const initialState = {
    workspaces: [],
    currentWorkspace: null,
    loading: false,
    error: null,
};

const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        // Keep all original synchronous reducers for local state updates
        setWorkspaces: (state, action) => {
            state.workspaces = action.payload;
        },
        setCurrentWorkspace: (state, action) => {
            localStorage.setItem("currentWorkspaceId", action.payload);
            state.currentWorkspace = state.workspaces.find((w) => w.id === action.payload);
        },
        addWorkspace: (state, action) => {
            state.workspaces.push(action.payload);
            if (state.currentWorkspace?.id !== action.payload.id) {
                state.currentWorkspace = action.payload;
            }
        },
        updateWorkspace: (state, action) => {
            state.workspaces = state.workspaces.map((w) =>
                w.id === action.payload.id ? action.payload : w
            );
            if (state.currentWorkspace?.id === action.payload.id) {
                state.currentWorkspace = action.payload;
            }
        },
        deleteWorkspace: (state, action) => {
            state.workspaces = state.workspaces.filter((w) => w.id !== action.payload);
        },
        addProject: (state, action) => {
            state.currentWorkspace.projects.push(action.payload);
            state.workspaces = state.workspaces.map((w) =>
                w.id === state.currentWorkspace.id
                    ? { ...w, projects: w.projects.concat(action.payload) }
                    : w
            );
        },
        addTask: (state, action) => {
            state.currentWorkspace.projects = state.currentWorkspace.projects.map((p) => {
                if (p.id === action.payload.projectId) {
                    p.tasks.push(action.payload);
                }
                return p;
            });
            state.workspaces = state.workspaces.map((w) =>
                w.id === state.currentWorkspace.id
                    ? {
                          ...w,
                          projects: w.projects.map((p) =>
                              p.id === action.payload.projectId
                                  ? { ...p, tasks: p.tasks.concat(action.payload) }
                                  : p
                          ),
                      }
                    : w
            );
        },
        updateTask: (state, action) => {
            state.currentWorkspace.projects = state.currentWorkspace.projects.map((p) => {
                if (p.id === action.payload.projectId) {
                    p.tasks = p.tasks.map((t) =>
                        t.id === action.payload.id ? action.payload : t
                    );
                }
                return p;
            });
            state.workspaces = state.workspaces.map((w) =>
                w.id === state.currentWorkspace.id
                    ? {
                          ...w,
                          projects: w.projects.map((p) =>
                              p.id === action.payload.projectId
                                  ? {
                                        ...p,
                                        tasks: p.tasks.map((t) =>
                                            t.id === action.payload.id ? action.payload : t
                                        ),
                                    }
                                  : p
                          ),
                      }
                    : w
            );
        },
        deleteTask: (state, action) => {
            state.currentWorkspace.projects = state.currentWorkspace.projects.map((p) => {
                p.tasks = p.tasks.filter((t) => !action.payload.includes(t.id));
                return p;
            });
            state.workspaces = state.workspaces.map((w) =>
                w.id === state.currentWorkspace.id
                    ? {
                          ...w,
                          projects: w.projects.map((p) => ({
                              ...p,
                              tasks: p.tasks.filter((t) => !action.payload.includes(t.id)),
                          })),
                      }
                    : w
            );
        },
    },

    extraReducers: (builder) => {
        // ── fetchWorkspaces ──────────────────────────────────────────────────
        builder
            .addCase(fetchWorkspaces.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWorkspaces.fulfilled, (state, action) => {
                state.loading = false;
                state.workspaces = action.payload;

                // Restore last selected workspace from localStorage, else use first
                const savedId = localStorage.getItem("currentWorkspaceId");
                const saved = action.payload.find((w) => w.id === savedId);
                state.currentWorkspace = saved || action.payload[0] || null;
            })
            .addCase(fetchWorkspaces.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // ── createWorkspace ──────────────────────────────────────────────────
        builder.addCase(createWorkspace.fulfilled, (state, action) => {
            state.workspaces.push(action.payload);
            state.currentWorkspace = action.payload;
        });

        // ── createProject ────────────────────────────────────────────────────
        builder.addCase(createProject.fulfilled, (state, action) => {
            if (state.currentWorkspace) {
                state.currentWorkspace.projects.push(action.payload);
                state.workspaces = state.workspaces.map((w) =>
                    w.id === state.currentWorkspace.id
                        ? { ...w, projects: [...w.projects, action.payload] }
                        : w
                );
            }
        });

        // ── updateProject ────────────────────────────────────────────────────
        builder.addCase(updateProject.fulfilled, (state, action) => {
            if (state.currentWorkspace) {
                state.currentWorkspace.projects = state.currentWorkspace.projects.map((p) =>
                    p.id === action.payload.id ? action.payload : p
                );
                state.workspaces = state.workspaces.map((w) =>
                    w.id === state.currentWorkspace.id
                        ? {
                              ...w,
                              projects: w.projects.map((p) =>
                                  p.id === action.payload.id ? action.payload : p
                              ),
                          }
                        : w
                );
            }
        });

        // ── createTask ───────────────────────────────────────────────────────
        builder.addCase(createTask.fulfilled, (state, action) => {
            if (state.currentWorkspace) {
                state.currentWorkspace.projects = state.currentWorkspace.projects.map((p) => {
                    if (p.id === action.payload.projectId) {
                        return { ...p, tasks: [...p.tasks, action.payload] };
                    }
                    return p;
                });
                state.workspaces = state.workspaces.map((w) =>
                    w.id === state.currentWorkspace.id
                        ? {
                              ...w,
                              projects: w.projects.map((p) =>
                                  p.id === action.payload.projectId
                                      ? { ...p, tasks: [...p.tasks, action.payload] }
                                      : p
                              ),
                          }
                        : w
                );
            }
        });

        // ── updateTaskAsync ──────────────────────────────────────────────────
        builder.addCase(updateTaskAsync.fulfilled, (state, action) => {
            if (state.currentWorkspace) {
                state.currentWorkspace.projects = state.currentWorkspace.projects.map((p) => ({
                    ...p,
                    tasks: p.tasks.map((t) =>
                        t.id === action.payload.id ? action.payload : t
                    ),
                }));
            }
        });

        // ── deleteTaskAsync ──────────────────────────────────────────────────
        builder.addCase(deleteTaskAsync.fulfilled, (state, action) => {
            if (state.currentWorkspace) {
                state.currentWorkspace.projects = state.currentWorkspace.projects.map((p) => ({
                    ...p,
                    tasks: p.tasks.filter((t) => t.id !== action.payload),
                }));
            }
        });
    },
});

export const {
    setWorkspaces,
    setCurrentWorkspace,
    addWorkspace,
    updateWorkspace,
    deleteWorkspace,
    addProject,
    addTask,
    updateTask,
    deleteTask,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
