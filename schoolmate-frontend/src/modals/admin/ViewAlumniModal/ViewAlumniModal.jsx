import { Dialog, DialogPanel, TextInput, Title } from "@tremor/react";
import React from "react";
import { FaXmark } from "react-icons/fa6";

const ViewAlumniModal = ({ isOpen, userData, closeModal }) => {
  return (
    <Dialog
      id="viewAlumniModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-primary">View Alumni Details</Title>
          <FaXmark
            className="text-lg text-danger cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <form className="flex gap-8">
          <div className="flex flex-col gap-4 w-full">
            <span className="w-full">
              <label className="text-sm">Registration Number</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.regNo}
              />
            </span>
            <span className="w-full">
              <label className="text-sm">First Name</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.fname}
              />
            </span>
            <span className="w-full">
              <label className="text-sm">Middle Name</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.mname}
              />
            </span>
            <span className="w-full">
              <label className="text-sm">Last Name</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.lname}
              />
            </span>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <span className="w-full">
              <label className="text-sm">Phone</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.phone}
              />
            </span>
            <span className="w-full">
              <label className="text-sm">Date of Birth</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.dob}
              />
            </span>
            <span className="w-full">
              <label className="text-sm">Gender</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={
                  userData.gender === "male"
                    ? "Male"
                    : userData.gender === "female"
                    ? "Female"
                    : userData.gender === "other"
                    ? "Other"
                    : userData.gender
                }
              />
            </span>
            <span className="w-full">
              <label className="text-sm">Address</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.address}
              />
            </span>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <span className="w-full">
              <label className="text-sm">Admission Year</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.admissionYear}
              />
            </span>
            <span className="w-full">
              <label className="text-sm">Passing Year</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.passingYear}
              />
            </span>
            <span className="w-full">
              <label className="text-sm">Current Status</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.currentStatus}
              />
            </span>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default ViewAlumniModal;
