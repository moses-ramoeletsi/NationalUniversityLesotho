import { create } from "zustand";

export const collaborationStore = create((set) => ({
  collaborator: [],
  setCollaborator: (collaborator) => set({ collaborator }),

  createCollaborator: async (newCollaborator) => {
    if (!newCollaborator.names || !newCollaborator.image) {
      return {
        success: false,
        message: "All field are required",
      };
    }
    const res = await fetch("/api/collaboration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCollaborator),
    });
    const data = await res.json();
    set((state) => ({ collaborator: [...state.collaborator, data.data] }));
    return { success: true, message: "Collaborator added successfully" };
  },
  fetchCollaborators: async () => {
    const res = await fetch("/api/collaboration");
    const data = await res.json();

    set({ collaborator: data.data });
  },

  updateCollaborator: async (collaboratorId, updatedCollaborator) => {
    const res = await fetch(`/api/collaboration/${collaboratorId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCollaborator),
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      collaborator: state.collaborator.map((collaborator) =>
        collaborator._id === collaboratorId ? data.data : collaborator
      ),
    }));

    return { success: true, message: "Collaborator updated successfully" };
  },
  deleteCollaborator: async (collaboratorId) => {
    const res = await fetch(`/api/collaboration/${collaboratorId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      collaborator: state.collaborator.filter(
        (collaborator) => collaborator._id !== collaboratorId
      ),
    }));
    return { success: true, message: data.message };
  },
}));
