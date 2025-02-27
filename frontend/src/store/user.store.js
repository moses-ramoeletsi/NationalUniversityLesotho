import { create } from "zustand";

export const adminFunctionStore = create((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  addMember: async (newUser) => {
    if (
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.personnelType ||
      !newUser.image
    ) {
      return { success: false, message: "Please fill all fields" };
    }
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    set((state) => ({ users: [...state.users, data.data] }));
    return { success: true, message: "Member added successfully" };
  },

  fetchUsers: async () => {
    const res = await fetch("/api/user");
    const data = await res.json();

    set({ users: data.data });
  },

  updateMember: async (uid, updatedMember) => {
    const res = await fetch(`/api/user/${uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMember),
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      users: state.users.map((user) => (user._id === uid ? data.data : user)),
    }));

    return { success: true, message: "Member updated successfully" };
  },

  deleteMember: async (uid) => {
    const res = await fetch(`/api/user/${uid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({ users: state.users.filter((user) => user._id !== uid) }));
    return { success: true, message: data.message };
  },
}));
