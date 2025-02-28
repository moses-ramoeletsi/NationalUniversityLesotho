import React, { useEffect, useState } from "react";
import { collaborationStore } from "../store/collaboration.store.js";
import CollaborationCard from "./CollaborationCard.jsx";
import { Plus, X } from "lucide-react";

const AddCollaborator = () => {
  const { fetchCollaborators, collaborator } = collaborationStore();
  const [isCollaboratorModalOpen, setIsCollaboratorModalOpen] = useState();
  const { createCollaborator } = collaborationStore();

  const [newCollaborator, setNewCollaborator] = useState({
    names: "",
    image: "",
  });

  const handleAddCollaborator = () => {
    setIsCollaboratorModalOpen(true);
  };

  const handleSaveNewCollaborator = async () => {
    try {
      if (!newCollaborator.names || !newCollaborator.image) {
        console.log("Please fill in all fields");
        return;
      }
      const { success, message } = await createCollaborator(newCollaborator);

      if (success) {
        console.log(message || "New Collaborator added");
        setNewCollaborator({
          names: "",
          image: "",
        });
        setIsCollaboratorModalOpen(false);
      } else {
        console.log(message || "failed to add new Collaborator");
      }
    } catch (error) {
      console.log("An unexpected error");
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCollaborators();
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-900">
          Manage Collaborator
        </h2>
        <button
          onClick={handleAddCollaborator}
          className="flex items-center px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-800"
        >
          <Plus className="mr-2" size={20} />
          Add Collaborator
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {collaborator.map((collaborator) => (
          <CollaborationCard
            key={collaborator._id}
            collaborator={collaborator}
          />
        ))}
      </div>
      {isCollaboratorModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-96 relative">
            <button
              onClick={() => {
                setIsCollaboratorModalOpen(false);
                //   setEditingMember(null);
                //   setNewCollaborator({
                //     frequency: "",
                //     date: "",
                //     location: "",
                //     image: "",
                //   });
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-green-900 mb-6">
              Add New Collaborator
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Collaborator name"
                className="w-full px-3 py-2 border rounded-md"
                value={newCollaborator.names}
                onChange={(e) =>
                  setNewCollaborator({
                    ...newCollaborator,
                    names: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="image"
                className="w-full px-3 py-2 border rounded-md"
                value={newCollaborator.image}
                onChange={(e) =>
                  setNewCollaborator({
                    ...newCollaborator,
                    image: e.target.value,
                  })
                }
              />

              <button
                onClick={handleSaveNewCollaborator}
                className="w-full bg-green-900 text-white py-2 rounded-md hover:bg-green-800"
              >
                Save Collaborator
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCollaborator;
