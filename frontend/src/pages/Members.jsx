import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { adminFunctionStore } from "../store/user.store";
import UserCard from "../components/UserCard";

const Members = () => {
    const { fetchUsers, users } = adminFunctionStore();
    const { addMember } = adminFunctionStore();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newMember, setNewMember] = useState({
        firstName: "",
        lastName: "",
        personnelType: "",
        image: "",
    });
    const personnelTypes = ["President",
      "Vice-president",
      "Chief Organizer",
      "Secretary",
      "Vice-secretary",]


  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddMember = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveNewMember = async () => {
    try {
      if (
        !newMember.firstName ||
        !newMember.lastName ||
        !newMember.personnelType ||
        !newMember.image
      ) {
        console.log("Please fill in all fields");
        return;
      }
      const { success, message } = await addMember(newMember);

      if (success) {
        console.log(message || "New member added");
        setNewMember({
          firstName: "",
          lastName: "",
          personnelType: "",
          image: "",
        });
        setIsAddModalOpen(false);
      } else {
        console.log(message || "Failed to add new member");
      }
    } catch (error) {
      console.log("An unexpected error");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold text-green-900 w-full text-center sm:text-left">
          Manage Members
        </h2>
        <button
          onClick={handleAddMember}
          className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-green-900 text-white rounded-md hover:bg-green-800 text-sm sm:text-base"
        >
          <Plus className="mr-2" size={16} sm:size={20} />
          Add Member
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setNewMember({
                  firstName: "",
                  lastName: "",
                  personnelType: "",
                  image: "",
                });
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-green-900 mb-4 sm:mb-6">
              Add New Member
            </h2>

            <div className="space-y-3 sm:space-y-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-2 py-1 sm:px-3 sm:py-2 text-sm border rounded-md"
                value={newMember.firstName}
                onChange={(e) =>
                  setNewMember({
                    ...newMember,
                    firstName: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-2 py-1 sm:px-3 sm:py-2 text-sm border rounded-md"
                value={newMember.lastName}
                onChange={(e) =>
                  setNewMember({ ...newMember, lastName: e.target.value })
                }
              />
              <div className="space-y-2">
                <p className="text-sm text-gray-700 font-medium">Personnel Type:</p>
                <div className="grid grid-cols-2 gap-2">
                  {personnelTypes.map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        type="radio"
                        id={type}
                        name="personnelType"
                        value={type}
                        checked={newMember.personnelType === type}
                        onChange={() =>
                          setNewMember({
                            ...newMember,
                            personnelType: type,
                          })
                        }
                        className="mr-2"
                      />
                      <label htmlFor={type} className="text-sm">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <input
                type="text"
                placeholder="Image URL"
                className="w-full px-2 py-1 sm:px-3 sm:py-2 text-sm border rounded-md"
                value={newMember.image}
                onChange={(e) =>
                  setNewMember({ ...newMember, image: e.target.value })
                }
              />

              <button
                onClick={handleSaveNewMember}
                className="w-full bg-green-900 text-white py-1 sm:py-2 rounded-md hover:bg-green-800 text-sm sm:text-base"
              >
                Save Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;