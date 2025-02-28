import { create } from "zustand";
export const healthCareStore = create((set) => ({
  healthCare: [],
  setHealthCare: (healthCare) => set({ healthCare }),
  createHealthCare: async (newHealthCare) => {
    if (
      !newHealthCare.title ||
      !newHealthCare.description ||
      !newHealthCare.date ||
      !newHealthCare.location
    ) {
      return {
        success: false,
        message: "All field are required",
      };
    }
    const res = await fetch("/api/health-care", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHealthCare),
    });
    const data = await res.json();
    set((state) => ({ healthCare: [...state.healthCare, data.data] }));
    return { success: true, message: "HealthCare added successfully" };
  },
  fetchHealthCare: async () => {
    const res = await fetch("/api/health-care");
    const data = await res.json();

    set({ healthCare: data.data });
  },

  updateHealthCare: async (healthCareId, updatedHealthCare) => {
    const res = await fetch(`/api/health-care/${healthCareId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedHealthCare),
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      healthCare: state.healthCare.map((healthCare) =>
        healthCare._id === healthCareId ? data.data : healthCare
      ),
    }));

    return { success: true, message: "HealthCare updated successfully" };
  },
  deleteHealthCare: async (healthCareId) => {
    const res = await fetch(`/api/health-Care/${healthCareId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      healthCare: state.healthCare.filter(
        (healthCare) => healthCare._id !== healthCareId
      ),
    }));
    return { success: true, message: data.message };
  },
}));
