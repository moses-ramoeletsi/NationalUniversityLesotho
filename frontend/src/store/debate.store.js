import { create } from "zustand";

export const debateStore = create((set) => ({
  debates: [],
  setDebate: (debates) => set({ debates }),

  createDebate: async (newDebate) => {
    if (
      !newDebate.title ||
      !newDebate.topic ||
      !newDebate.description ||
      !newDebate.date ||
      !newDebate.location ||
      !newDebate.participants
    ) {
      return {
        success: false,
        message: "All field are required",
      };
    }
    const res = await fetch("/api/debates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDebate),
    });
    const data = await res.json();
    set((state) => ({ debates: [...state.debates, data.data] }));
    return { success: true, message: "Debate added successfully" };
  },
  fetchDebates: async () => {
    const res = await fetch("/api/debates");
    const data = await res.json();

    set({ debates: data.data });
  },

  updateDebate: async (debateId, updatedDebate) => {
    const res = await fetch(`/api/debates/${debateId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDebate),
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      debates: state.debates.map((debate) =>
        debate._id === debateId ? data.data : debate
      ),
    }));

    return { success: true, message: "Debate updated successfully" };
  },
  deleteDebate: async (debateId) => {
    const res = await fetch(`/api/debates/${debateId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      debates: state.debates.filter((debate) => debate._id !== debateId),
    }));
    return { success: true, message: data.message };
  },
}));
