import { create } from "zustand";

export const useRemedyStore = create((set) => ({
  remedies: [], filter: '', loading: false,
  setRemedies: (remedies) => set({ remedies }),
  setFilter: (filter) => set({filter}),
  setLoading: (loading) => set({loading}),
  
  createRemedy: async (newRemedy) => {
    try {
      set(()=>({loading : true}));
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/remedies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRemedy),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({})); // Fallback for non-JSON responses
        set(()=>({loading : false}));
        return {
          status: false,
          message: errorData.message || "Request failed",
        };
      }

      const data = await res.json();
      set((state) => ({ remedies: [...state.remedies, data.data] }));
      set(()=>({loading : false}));
      return { status: true, message: "Remedy added successfully" };
    } catch (error) {
      console.error("Error creating remedy:", error);
      set(()=>({loading : false}));
      return { status: false, message: "Network error or server issue" };
    }
  },
  fetchRemedies: async () => {
    try {
      set(()=>({loading : true}));
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/remedies`);
      if (!res.ok) {
        console.error("Failed to fetch remedies");
        set(()=>({loading : false}));
        return;
      }

      const data = await res.json();
      set({ remedies: data.data }); // Update the correct state
      set(()=>({loading : false}));
    } catch (error) {
      console.error("Error fetching remedies:", error);
    }
  },
  deleteRemedy: async (rid) => {
    try {
      set(()=>({loading : true}));
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/remedies/${rid}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      set(()=>({loading : false}));

      if (!data.status) return { status: false, message: data.message };
      return { status: true, message: data.message };
    } catch (error) {
      set(()=>({loading : false}));
      console.error("Error deleting remedies:", error);
    }
  },
  updateRemedy: async (rid, updatedRemedy) => {
    try {
      set(()=>({loading : true}));
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/remedies/${rid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedRemedy),
      });
      const data = await res.json();
      set(()=>({loading : false}));

      if(!data.status) return {status: false, message: "Unable to update at the moment"}
      return { status: true, message: "Remedy updated successfully" };
    } catch (error) {
      set(()=>({loading : false}));
      console.error("Error updating remedies:", error);
    }
  }
}));
