import { Button, Dialog, DialogPanel, Title } from "@tremor/react";
import axios from "axios";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";
import Papa from "papaparse";
import qs from "qs";

const UploadStaffModal = ({ isOpen, closeModal, fetchStaff, userData }) => {
  const apiKey = import.meta.env.VITE_API_URL;
  const [requestData, setRequestData] = useState(null);
  const [columns, setColumns] = useState(null);
  const [values, setValues] = useState(null);

  const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];

    Papa.parse(uploadedFile, {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const columns = Object.keys(result.data[0]);

        const filteredColumns = columns.filter((col) => col !== "Sr. No.");

        const values = result.data.map((row) => {
          const filteredRow = {};
          for (const key of filteredColumns) {
            filteredRow[key] = row[key];
          }
          return Object.values(filteredRow);
        });

        setColumns(filteredColumns);
        setValues(values);

        const fileData = values.map((valueRow) => {
          const obj = {};
          filteredColumns.forEach((column, index) => {
            // Adjust column names according to the provided mapping
            let key = column.trim().toLowerCase();
            switch (key) {
              case "dob":
                key = "dob";
                break;
              case "educational qualification":
                key = "educationalQualification";
                break;
              case "email":
                key = "email";
                break;
              case "first name":
                key = "fname";
                break;
              case "gender":
                // No change needed for "gender"
                break;
              case "job start date":
                key = "jobStartDate";
                break;
              case "last name":
                key = "lname";
                break;
              case "middle name":
                key = "mname";
                break;
              case "phone":
                // No change needed for "phone"
                break;
              case "position":
                // No change needed for "position"
                break;
              case "professional qualification":
                key = "professionalQualification";
                break;
              case "retirement date":
                key = "retirementDate";
                break;
              case "school joined date":
                key = "schoolJoinedDate";
                break;
              case "transferred":
                // Convert the value to boolean
                obj[key] = valueRow[index] === "true";
                break;
              case "address":
                key = "address";
                break;
              default:
                break;
            }
            // If the key is not "transferred", assign the value as is
            if (key !== "transferred") {
              obj[key] = valueRow[index];
            }
          });
          return obj;
        });

        onSubmit(fileData);
      },
    });
  };

  const onSubmit = async (data) => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await axios
      .post(`${apiKey}/admin/upload-staff-data`, data, config)
      .then((res) => {
        if (res.data.duplicateError) {
          toast.error("Staff already exists..!", {
            position: "bottom-right",
          });
          closeModal();
          fetchStaff();
        } else if (res.data.successful) {
          toast.success("Staff data uploaded successfully..!", {
            position: "bottom-right",
          });
          closeModal();
          fetchStaff();
        }
        if (res.data.emailExistsError) {
          toast.error("Staff already exists..!", {
            position: "bottom-right",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error..!", { position: "bottom-right" });
      });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".csv",
  });

  return (
    <Dialog
      id="deleteStaffModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-success">Upload Staff Data</Title>
          <FaXmark
            className="text-lg text-success cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <span className="text-danger text-xs">
            *CSV file should contain the following attributes:{" "}
          </span>
          <span className="text-primary text-xs">
            first name, last name, middle name, dob, email, gender, phone,
            position, job start date, retirement date, school joined date,
            educational qualification, professional qualification, transferred
            (true or false)
          </span>
        </div>
        <div
          {...getRootProps()}
          className={`dropzone ${
            isDragActive ? "dragging" : ""
          } text-center p-14 border-4 border-dashed cursor-pointer`}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop a CSV file here, or click to select one</p>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default UploadStaffModal;
