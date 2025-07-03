import React, { useState } from "react";
import CircularLoader from "../components/CircularLoader";
import { useAddAddressMutation, useDeleteAddressMutation, useGetAllAddressesQuery, useUpdateAddressMutation } from "../store/api/profileApi";
import { toast } from "sonner";

const MyAddress = () => {
  const { data: allAddress, isLoading: isFetching, isError, refetch } =
    useGetAllAddressesQuery();

  const [addAddress, { isLoading: isAdding }] = useAddAddressMutation();
  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();
  const [deleteAddress, { isLoading: isDeleting }] = useDeleteAddressMutation();

  const [formData, setFormData] = useState({
    houseNumber: "",
    buildingName: "",
    landmark: "",
    type: "home",
    editId: null,
  });

  const [deletingId, setDeletingId] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddAddress = async () => {
    if (!formData.houseNumber) {
      toast.error("House/Flat Number is required");
      return;
    }
    try {
      const payload = {
        houseFlat: formData.houseNumber,
        appartment: formData.buildingName,
        landMark: formData.landmark,
        houseType: formData.type,
      };
      await addAddress(payload).unwrap();
      toast.success("Address added successfully");
      resetForm();
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add address");
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteAddress(id).unwrap();
      toast.success("Address deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete address");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (address) => {
    setFormData({
      houseNumber: address.houseFlat,
      buildingName: address.appartment,
      landmark: address.landMark,
      type: address.houseType,
      editId: address._id,
    });
  };

  const handleSaveOrUpdate = async () => {
    if (!formData.houseNumber) {
      toast.error("House/Flat Number is required");
      return;
    }

    if (formData.editId) {
      try {
        await updateAddress({
          id: formData.editId,
          body: {
            houseFlat: formData.houseNumber,
            appartment: formData.buildingName,
            landMark: formData.landmark,
            houseType: formData.type,
          },
        }).unwrap();
        toast.success("Address updated successfully");
        resetForm();
        refetch();
      } catch (error) {
        toast.error("Failed to update address");
      }
    } else {
      handleAddAddress();
    }
  };

  const resetForm = () => {
    setFormData({
      houseNumber: "",
      buildingName: "",
      landmark: "",
      type: "Home",
      editId: null,
    });
  };

  return (
    <div className="bg-gray-50 pt-[140px] pb-[80px] px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - My Address */}
          <div className="max-h-[600px] overflow-y-scroll custom-scrollbar"> 
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              My Address
            </h2>

            {isFetching ? (
              <div className="flex justify-center">
                <CircularLoader />
              </div>
            ) : isError ? (
              <p>Failed to load addresses</p>
            ) : (
              <div className="space-y-4">
                {allAddress?.data?.length > 0 ? (
                  allAddress?.data?.map((address) => (
                    <div
                      key={address._id}
                      className="bg-white rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <img
                            src="/circle.svg"
                            alt="Dot"
                            className="w-3 h-3 mt-2 rounded-full"
                          />
                          <div>
                            <div className="font-medium text-gray-900 mb-1">
                              {address?.houseType || "Home"}
                            </div>
                            <div className="text-[16px] text-[#00000080]">
                              {`${address.houseFlat}, ${address.landMark}, ${address.appartment}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDelete(address._id)}
                            className="text-red-500 hover:text-red-700 disabled:opacity-50"
                            disabled={deletingId === address._id}
                          >
                            {deletingId === address._id ? (
                              <CircularLoader size={16} />
                            ) : (
                              <img
                                src="/delete.svg"
                                alt="Delete"
                                className="w-4 h-4"
                              />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-center">
                        <button
                          className="text-sm text-black rounded-md hover:text-gray-900 hover:bg-gray-200 bg-[#F5F6FB] h-[50px] w-[327px]"
                          onClick={() => handleEdit(address)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No address found</p>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Add/Edit Address */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {formData.editId ? "Edit Address" : "Add New Address"}
            </h2>

            <div className="bg-white rounded-t h-48 pb-6 relative overflow-hidden">
              <img
                src="/map.svg"
                alt="Map"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/mapicon.svg" alt="Pin" className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-4 p-4 bg-white">
              <input
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                type="text"
                placeholder="House/Flat Number*"
                className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none"
              />

              <input
                name="buildingName"
                value={formData.buildingName}
                onChange={handleChange}
                type="text"
                placeholder="Apartment/Society/Building Name"
                className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none"
              />

              <input
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                type="text"
                placeholder="Landmark (Optional)"
                className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none"
              />

              {/* Save as */}
              <div className="pt-4">
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Save as
                </label>
                <div className="flex space-x-4">
                  {["home", "Other"].map((type) => (
                    <label
                      key={type}
                      className={`px-3 py-1 rounded-lg text-sm cursor-pointer ${formData.type === type
                          ? "bg-red-100 text-[#FF5534] border border-red-300"
                          : "bg-white text-gray-700 border border-black"
                        }`}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, type }))
                      }
                    >
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveOrUpdate}
                disabled={isAdding || isUpdating}
                className={`w-full bg-[#FF5534] font-bold hover:bg-[#ce4d34] text-white py-3 mt-6 rounded-lg text-sm flex items-center justify-center ${isAdding || isUpdating ? "opacity-70 cursor-not-allowed" : ""
                  }`}
              >
                {(isAdding || isUpdating) && (
                  <CircularLoader size={18} className="mr-2" />
                )}
                {formData.editId ? "Update" : "Save"}
              </button>

              {/* Cancel Button */}
              {formData.editId && (
                <button
                  onClick={resetForm}
                  className="w-full border border-black font-bold text-black py-3 mt-2 rounded-lg text-sm hover:bg-gray-100"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAddress;
