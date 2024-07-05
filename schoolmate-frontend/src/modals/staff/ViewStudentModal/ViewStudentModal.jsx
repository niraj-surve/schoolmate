import { Dialog, DialogPanel, TextInput, Title } from "@tremor/react";
import React from "react";
import { FaXmark } from "react-icons/fa6";
import { formatDate } from "../../../helpers/DateFormatter";

const ViewStudentModal = ({ isOpen, userData, closeModal }) => {
  return (
    <Dialog
      id="viewStudentModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-primary">View Student Details</Title>
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
              <label className="text-sm">Name</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.name}
              />
            </span>
            <span className="w-full">
              <label className="text-sm">Father's Name</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.fathersName}
              />
            </span>
            <span className="w-full">
              <label className="text-sm">Mother's Name</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.mothersName}
              />
            </span>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <span className="w-full">
              <label className="text-sm">Parent's Phone</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.pContactNo}
              />
            </span>
            <span className="w-full">
              <label className="text-sm">Date of Birth</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={formatDate(userData.dob)}
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
              <label className="text-sm">Admission Date</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={formatDate(userData.admissionDate)}
              />
            </span>
            <span className="w-full">
              <label className="text-sm">No. in Siblings</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.noInSiblings}
              />
            </span>
            <span className="w-full">
              <label className="text-sm">Income</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.income}
              />
            </span>
            <span className="w-full">
              <label className="text-sm">Aadhar Number</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.aadharNo}
              />
            </span>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <span className="w-full">
              <label className="text-sm">Religion</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.religion}
              />
            </span>
            <span className="w-full">
              <label className="text-sm">Caste</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.caste}
              />
            </span>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default ViewStudentModal;
