import { create } from "zustand";

export const tripStore = create((set) => ({
  trips: [],
  setTrip: (trips) => set({ trips }),

  createTrip: async (newTrip) => {
    if (
      !newTrip.title ||
      !newTrip.location ||
      !newTrip.date ||
      !newTrip.description ||
      !newTrip.highlights ||
      !newTrip.cost ||
      !newTrip.imageUrl
    ) {
      return {
        success: false,
        message: "All field are required",
      };
    }
    const res = await fetch("/api/educationalTrip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTrip),
    });
    const data = await res.json();
    set((state) => ({ trips: [...state.trips, data.data] }));
    return { success: true, message: "Trip added successfully" };
  },
  fetchTrips: async () => {
    const res = await fetch("/api/educationalTrip");
    const data = await res.json();

    set({ trips: data.data });
  },

  updateTrip: async (tripId, updatedTrip) => {
    const res = await fetch(`/api/educationalTrip/${tripId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTrip),
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      trips: state.trips.map((trip) =>
        trip._id === tripId ? data.data : trip
      ),
    }));

    return { success: true, message: "Trip updated successfully" };
  },
  deleteTrip: async (tripId) => {
    const res = await fetch(`/api/educationalTrip/${tripId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      trips: state.trips.filter((trip) => trip._id !== tripId),
    }));
    return { success: true, message: data.message };
  },
}));
