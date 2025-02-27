import React, { useState } from "react";
import {
  Users,
  Settings,
  CalendarClock,
  Activity,
  LogOut,
  Shield,
  Edit,
  Trash,
  Plus,
  Save,
  X,
} from "lucide-react";
import { adminFunctionStore } from "../store/user.store";


const UserCard = ({ user }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(user);
  const { updateMember, deleteMember } = adminFunctionStore();

  const handleEditMember = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveEditedMember = async (uid, updatedMember) => {
    const { success, message } = await updateMember(uid, updatedMember);
    if (success) {
      console.log(message);
    } else {
      console.log(message);
    }
    setIsAddModalOpen(false);
  };

  const handleDeleteMember = async (uid) => {
    const { success, message } = await deleteMember(uid);
    if (success) {
      console.log(message || "Member deleted");
    } else {
      console.log("An unexpected error");
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 relative">
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 space-x-2">
          <button
            onClick={handleEditMember}
            className="text-green-600 hover:text-green-800"
          >
            <Edit size={16} sm:size={20} />
          </button>
          <button
            onClick={() => handleDeleteMember(user._id)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash size={16} sm:size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover mb-2 sm:mb-4"
          />
          <span className="text-xs sm:text-sm font-semibold text-green-900 text-center w-full truncate">
            {user.personnelType}
          </span>
          <span className="text-sm sm:text-base text-gray-700 text-center">
            {user.firstName} {user.lastName}
          </span>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-green-900 mb-4 sm:mb-6">
              Edit Member
            </h2>

            <div className="space-y-3 sm:space-y-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-2 py-1 sm:px-3 sm:py-2 text-sm border rounded-md"
                value={editingMember.firstName}
                onChange={(e) =>
                  setEditingMember({
                    ...editingMember,
                    firstName: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-2 py-1 sm:px-3 sm:py-2 text-sm border rounded-md"
                value={editingMember.lastName}
                onChange={(e) =>
                  setEditingMember({
                    ...editingMember,
                    lastName: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Personnel Type"
                className="w-full px-2 py-1 sm:px-3 sm:py-2 text-sm border rounded-md"
                value={editingMember.personnelType}
                onChange={(e) =>
                  setEditingMember({
                    ...editingMember,
                    personnelType: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Image URL"
                className="w-full px-2 py-1 sm:px-3 sm:py-2 text-sm border rounded-md"
                value={editingMember.image}
                onChange={(e) =>
                  setEditingMember({
                    ...editingMember,
                    image: e.target.value,
                  })
                }
              />
              <button
                onClick={() =>
                  handleSaveEditedMember(user._id, editingMember)
                }
                className="w-full bg-green-900 text-white py-1 sm:py-2 rounded-md hover:bg-green-800 text-sm sm:text-base"
              >
                Update Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCard;
