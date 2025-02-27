import { create } from "zustand";

export const seminarStore = create((set) => ({
  seminars: [],
  setSeminar: (seminars) => set({ seminars }),
  createSeminar: async (newSeminar) => {
    if (
      !newSeminar.title ||
      !newSeminar.description ||
      !newSeminar.date ||
      !newSeminar.time ||
      !newSeminar.location ||
      !newSeminar.highlights
    ) {
      return {
        success: false,
        message: "All field are required",
      };
    }
    const res = await fetch("/api/seminars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSeminar),
    });
    const data = await res.json();
    set((state) => ({ seminars: [...state.seminars, data.data] }));
    return { success: true, message: "Seminar added successfully" };
  },
  fetchSeminars: async () => {
    const res = await fetch("/api/seminars");
    const data = await res.json();

    set({ seminars: data.data });
  },

  updateSeminar: async (seminarId, updatedSeminar) => {
    const res = await fetch(`/api/seminars/${seminarId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSeminar),
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      seminars: state.seminars.map((seminar) =>
        seminar._id === seminarId ? data.data : seminar
      ),
    }));

    return { success: true, message: "Seminar updated successfully" };
  },
  deleteSeminar: async (seminarId) => {
    const res = await fetch(`/api/seminars/${seminarId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      seminars: state.seminars.filter((seminar) => seminar._id !== seminarId),
    }));
    return { success: true, message: data.message };
  },
}));
