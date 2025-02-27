import { create } from "zustand";

export const meetingStore = create((set) => ({
  meetingItem: [],
  setMeeting: (meetingItem) => set({ meetingItem }),
  createNewMeeting: async (newMeeting) => {
    if (
      !newMeeting.frequency ||
      !newMeeting.day ||
      !newMeeting.location ||
      !newMeeting.description
    ) {
      return {
        success: false,
        message: "All fields are required",
      };
    }
    try {
      const res = await fetch("/api/meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMeeting),
      });
      const data = await res.json();
      
      if (data.success) {
        // Update the state with the new meeting
        set((state) => ({ 
          meetingItem: [...state.meetingItem, data.data] 
        }));
        return { success: true, message: "Meeting added successfully" };
      } else {
        return { success: false, message: data.message || "Failed to add meeting" };
      }
    } catch (error) {
      console.error("Error creating meeting:", error);
      return { success: false, message: "Server error occurred" };
    }
  },
  fetchMeeting: async () => {
    try {
      const res = await fetch("/api/meeting");
      const data = await res.json();
      
      if (data.success) {
        set({ meetingItem: data.data || [] });
      } else {
        console.error("Failed to fetch meetings:", data.message);
        set({ meetingItem: [] });
      }
    } catch (error) {
      console.error("Error fetching meetings:", error);
      set({ meetingItem: [] });
    }
  },
  updateMeeting: async (uid, updatedMeeting) => {
    try {
      const res = await fetch(`/api/meeting/${uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMeeting),
      });
      
      const data = await res.json();
      
      if (!data.success) return { success: false, message: data.message };
      
      set((state) => ({
        meetingItem: state.meetingItem.map((meeting) =>
          meeting._id === uid ? data.data : meeting
        ),
      }));
      
      return { success: true, message: "Meeting updated successfully" };
    } catch (error) {
      console.error("Error updating meeting:", error);
      return { success: false, message: "Server error occurred" };
    }
  },
  deleteMeeting: async (meetingId) => {
    try {
      const res = await fetch(`/api/meeting/${meetingId}`, {
        method: "DELETE",
      });
      
      const data = await res.json();
      
      if (!data.success) {
        return { success: false, message: data.message };
      }
      
      set((state) => ({
        meetingItem: state.meetingItem.filter((meeting) => meeting._id !== meetingId),
      }));
      
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error deleting meeting:", error);
      return { success: false, message: "Server error occurred" };
    }
  },
}));