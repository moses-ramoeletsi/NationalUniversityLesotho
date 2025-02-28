import React, { useState } from "react";
import { Edit, X, Trash } from "lucide-react";
import { collaborationStore } from "../store/collaboration.store.js";

const CollaborationCard = ({ collaborator }) => {
  const { updateCollaborator, deleteCollaborator } = collaborationStore();
  const [isUpdateCollaboratorModal, setIsUpdatedCollaboratorModalOpen] =
    useState(false);
  const [editingCollaborator, setEditingCollaborator] = useState(collaborator);

  const handleUpdateCollaborator = () => {
    setIsUpdatedCollaboratorModalOpen(true);
  };

  const handleSaveUpdatedCollaborator = async (
    collaboratorId,
    updatedCollaborator
  ) => {
    const { success, message } = await updateCollaborator(
      collaboratorId,
      updatedCollaborator
    );
    if (success) {
      console.log(message || "Collaborator Updated");
    } else {
      console.log(message || "Error");
    }
    setIsUpdatedCollaboratorModalOpen(false);
  };

  const handleDeleteCollaborator = async (collaboratorId) => {
    const { success, message } = await deleteCollaborator(collaboratorId);
    if (success) {
      console.log(message);
    } else {
      console.log(message);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-lg p-6 relative">
        <div className="absolute top-4 right-4 space-x-2">
          <button
            onClick={handleUpdateCollaborator}
            className="text-green-600 hover:text-green-800"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => handleDeleteCollaborator(collaborator._id)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={collaborator.image}
            alt={`${collaborator.names}`}
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <span className="text-gray-700">{collaborator.names}</span>
        </div>
      </div>

      {isUpdateCollaboratorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-96 relative">
            <button
              onClick={() => {
                setIsUpdatedCollaboratorModalOpen(false);
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-green-900 mb-6">
              Edit Collaborator
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Names"
                className="w-full px-3 py-2 border rounded-md"
                value={editingCollaborator.names}
                onChange={(e) =>
                  setEditingCollaborator({
                    ...editingCollaborator,
                    names: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Image"
                className="w-full px-3 py-2 border rounded-md"
                value={editingCollaborator.image}
                onChange={(e) =>
                  setEditingCollaborator({
                    ...editingCollaborator,
                    image: e.target.value,
                  })
                }
              />

              <button
                onClick={() =>
                  handleSaveUpdatedCollaborator(
                    collaborator._id,
                    editingCollaborator
                  )
                }
                className="w-full bg-green-900 text-white py-2 rounded-md hover:bg-green-800"
              >
                Update Collaborator
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationCard;
