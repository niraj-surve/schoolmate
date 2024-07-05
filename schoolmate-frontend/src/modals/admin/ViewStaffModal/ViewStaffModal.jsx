import { Dialog, DialogPanel, TextInput, Title } from "@tremor/react";
import React from "react";
import { FaXmark } from "react-icons/fa6";
import { formatDate } from "../../../helpers/DateFormatter";

const ViewStaffModal = ({ isOpen, closeModal, userData }) => {
  return (
    <Dialog
      id="viewStaffModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-primary">View Staff Details</Title>
          <FaXmark
            className="text-lg text-danger cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <form className="flex gap-8">
          <div className="flex flex-col gap-8 w-full">
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
            <span className="w-full">
              <label className="text-sm">Phone</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.phone}
              />
            </span>
          </div>
          <div className="flex flex-col gap-8 w-full">
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
              <label className="text-sm">Email</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={userData.email}
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
          <div className="flex flex-col gap-8 w-full">
            <span className="w-full">
              <label className="text-sm">Position</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={
                  userData.position === "principal"
                    ? "Principal"
                    : userData.position === "vicePrincipal"
                    ? "Vice Principal"
                    : userData.position === "graduateTeacher"
                    ? "Graduate Teacher"
                    : userData.position === "assistantTeacher"
                    ? "Assistant Teacher"
                    : userData.position
                }
              />
            </span>
            <span className="w-full">
              <label className="text-sm">Job Start Date</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={formatDate(userData.jobStartDate)}
              />
            </span>
            <span className="w-full">
              <label className="text-sm">Retirement Date</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={formatDate(userData.retirementDate)}
              />
            </span>
            <span className="w-full">
              <label className="text-sm">School Joined Date</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={formatDate(userData.schoolJoinedDate)}
              />
            </span>
          </div>
          <div className="flex flex-col gap-8 w-full">
            <span className="w-full">
              <label className="text-sm">Educational Qualification</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={
                  userData.educationalQualification === "ssc"
                    ? "SSC"
                    : userData.educationalQualification === "hsc"
                    ? "HSC"
                    : userData.educationalQualification === "ba"
                    ? "BA"
                    : userData.educationalQualification === "ma"
                    ? "MA"
                    : userData.educationalQualification
                }
              />
            </span>
            <span className="w-full">
              <label className="text-sm">Professional Qualification</label>
              <TextInput
                className="mt-1"
                disabled
                defaultValue={
                  userData.professionalQualification === "bEd"
                    ? "B.Ed"
                    : userData.professionalQualification === "mEd"
                    ? "M.Ed"
                    : userData.professionalQualification === "dEd"
                    ? "D.Ed"
                    : userData.gender
                }
              />
            </span>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default ViewStaffModal;
