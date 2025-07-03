import React, { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';
import { useGetAllAddressesQuery, useAddAddressMutation, useUpdateAddressMutation, useAddAddressToCartMutation, useLazyGetAllAddressesQuery } from '../store/api/profileApi';
import { toast } from 'sonner';

const AddressModal = ({ isOpen, onClose, onSave, selectedAddress }) => {
  const { data: allAddresses, isLoading: isFetchingAll, isError: isAllError, refetch: refetchAll } = useGetAllAddressesQuery();
  const [addAddress, { isLoading: isAdding }] = useAddAddressMutation();
  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();
  const [addAddressToCart] = useAddAddressToCartMutation();
  const [triggerGetAddressById, { data: addressDetail, isLoading: isLoadingAddress, isError: isAddressError }] = useLazyGetAllAddressesQuery();

  const [formData, setFormData] = useState({
    houseNumber: '',
    apartment: '',
    landmark: '',
    type: 'Home',
    editId: null,
  });
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Sync selectedAddressId with selectedAddress from local state when modal opens
  useEffect(() => {
    if (selectedAddress && selectedAddress._id && isOpen) {
      setSelectedAddressId(selectedAddress._id);
    }
  }, [selectedAddress, isOpen]);

  useEffect(() => {
    if (selectedAddressId && allAddresses?.data && isEditing) {
      const address = allAddresses.data.find(addr => addr._id === selectedAddressId);
      if (address) {
        setFormData({
          houseNumber: address.houseFlat || '',
          apartment: address.appartment || '',
          landmark: address.landMark || '',
          type: address.houseType || 'Home',
          editId: address._id,
        });
      }
    } else if (addressDetail && isEditing) {
      setFormData({
        houseNumber: addressDetail.houseFlat || '',
        apartment: addressDetail.appartment || '',
        landmark: addressDetail.landMark || '',
        type: addressDetail.houseType || 'Home',
        editId: addressDetail._id,
      });
    } else if (!isEditing) {
      setFormData({
        houseNumber: '',
        apartment: '',
        landmark: '',
        type: 'Home',
        editId: null,
      });
    }
  }, [selectedAddressId, allAddresses, isEditing, addressDetail]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.houseNumber) {
      toast.error('House/Flat Number is required');
      return;
    }

    try {
      const payload = {
        houseFlat: formData.houseNumber,
        appartment: formData.apartment,
        landMark: formData.landmark,
        houseType: formData.type,
      };

      let updatedAddress;
      if (formData.editId) {
        const result = await updateAddress({ id: formData.editId, body: payload }).unwrap();
        toast.success('Address updated successfully');
        updatedAddress = { ...formData, _id: result.data._id, houseFlat: formData.houseNumber, appartment: formData.apartment, landMark: formData.landmark, houseType: formData.type };
      } else {
        const result = await addAddress(payload).unwrap();
        toast.success('Address added successfully');
        updatedAddress = { ...formData, _id: result.data._id, houseFlat: formData.houseNumber, appartment: formData.apartment, landMark: formData.landmark, houseType: formData.type };
      }

      await refetchAll();
      await addAddressToCart(updatedAddress._id).unwrap();
      setSelectedAddressId(updatedAddress._id);
      onSave(updatedAddress);
      onClose();
      setIsEditing(false);
      setFormData({
        houseNumber: '',
        apartment: '',
        landmark: '',
        type: 'Home',
        editId: null,
      });
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to save address');
    }
  };

  const handleSelectAddress = async (addressId) => {
    try {
      const address = allAddresses.data.find(addr => addr._id === addressId);
      if (address) {
        await addAddressToCart(addressId).unwrap();
        setSelectedAddressId(addressId);
        onSave(address);
        onClose();
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to select address');
    }
  };

  const handleEdit = (address) => {
    triggerGetAddressById(address._id);
    setIsEditing(true);
    setSelectedAddressId(address._id);
  };

  const handleChangeAddress = () => {
    setIsEditing(true);
    setFormData({
      houseNumber: '',
      apartment: '',
      landmark: '',
      type: 'Home',
      editId: null,
    });
    setSelectedAddressId(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Address</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6 pb-4">
          {isFetchingAll || (isEditing && isLoadingAddress) ? (
            <div className="flex justify-center"><div className="w-8 h-8 border-4 border-t-[#FF5534] border-gray-200 rounded-full animate-spin"></div></div>
          ) : isAllError || (isEditing && isAddressError) ? (
            <p className="text-center text-red-500">Failed to load addresses</p>
          ) : allAddresses?.data?.length > 0 ? (
            allAddresses.data.map((address) => (
              <div key={address._id} className="flex items-center gap-4 bg-gray-50 rounded-lg p-4 mb-4">
                <input
                  type="radio"
                  name="addressSelection"
                  checked={selectedAddressId === address._id}
                  onChange={() => handleSelectAddress(address._id)}
                  className="w-4 h-4 text-[#FF5534] focus:ring-[#FF5534]"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{address.houseType}</h3>
                  <p className="text-sm text-gray-600">{`${address.houseFlat}, ${address.landMark || ''}, ${address.appartment}`}</p>
                  <p className="text-sm text-gray-600">{address.details || 'No details available'}</p>
                </div>
                <button
                  onClick={() => handleEdit(address)}
                  className="text-[#FF5534] font-medium text-sm hover:text-red-600"
                  disabled={isLoadingAddress}
                >
                  Change
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No saved addresses</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-0">
          <div className="space-y-4">
            <input
              name="houseNumber"
              value={formData.houseNumber}
              onChange={handleChange}
              type="text"
              placeholder="House/Flat Number*"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5534] focus:border-[#FF5534] outline-none"
              required
            />
            <input
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              type="text"
              placeholder="Apartment/Society/Building Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5534] focus:border-[#FF5534] outline-none"
            />
            <input
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              type="text"
              placeholder="Landmark (Optional)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5534] focus:border-[#FF5534] outline-none"
            />
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-900 mb-3">Save as</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'Home' })}
                className={`px-4 py-2 rounded-lg border font-medium text-sm ${
                  formData.type === 'Home' ? 'bg-[#FF5534] text-white border-[#FF5534]' : 'bg-white text-gray-700 border-gray-300 hover:border-[#FF5534]'
                }`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'Other' })}
                className={`px-4 py-2 rounded-lg border font-medium text-sm ${
                  formData.type === 'Other' ? 'bg-[#FF5534] text-white border-[#FF5534]' : 'bg-white text-gray-700 border-gray-300 hover:border-[#FF5534]'
                }`}
              >
                Other
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isAdding || isUpdating}
            className="w-full mt-6 bg-[#FF5534] text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {(isAdding || isUpdating) && <div className="w-5 h-5 border-4 border-t-[#FF5534] border-gray-200 rounded-full animate-spin inline-block mr-2"></div>}
            Save and Proceed to slots
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;