import { Button, Dialog, DialogPanel, Title } from "@tremor/react";
import axios from "axios";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";
import Papa from "papaparse";
import qs from "qs";

const UploadAlumniModal = ({ isOpen, closeModal, fetchAlumni, userData }) => {
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
          return filteredRow; // Return the filtered row object instead of its values
        });
  
        setColumns(filteredColumns);
        setValues(values);
  
        console.log("Columns: ", filteredColumns);
        console.log("Values: ", values);
  
        const fileData = values.map((valueRow) => {
          const obj = {};
          filteredColumns.forEach((column, index) => {
            let key = column.trim().toLowerCase();
            switch (key) {
              case "reg. no.":
                obj["regNo"] = valueRow[column]; // Populate obj with regNo
                break;
              case "dob":
                obj["dob"] = valueRow[column]; // Populate obj with dob
                break;
              case "admission year":
                obj["admissionYear"] = valueRow[column]; // Populate obj with admissionYear
                break;
              case "passing year":
                obj["passingYear"] = valueRow[column]; // Populate obj with passingYear
                break;
              case "current status":
                obj["currentStatus"] = valueRow[column]; // Populate obj with currentStatus
                break;
              case "first name":
                obj["fname"] = valueRow[column]; // Populate obj with fname
                break;
              case "gender":
                obj["gender"] = valueRow[column]; // Populate obj with gender
                break;
              case "last name":
                obj["lname"] = valueRow[column]; // Populate obj with lname
                break;
              case "middle name":
                obj["mname"] = valueRow[column]; // Populate obj with mname
                break;
              case "phone":
                obj["phone"] = valueRow[column]; // Populate obj with phone
                break;
              case "address":
                obj["address"] = valueRow[column]; // Populate obj with address
                break;
              default:
                break;
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
    console.log(data)

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await axios
      .post(`${apiKey}/admin/upload-alumni-data`, data, config)
      .then((res) => {
        if (res.data.duplicateError) {
          toast.error("Alumni already exists..!", {
            position: "bottom-right",
          });
          closeModal();
          fetchAlumni();
        } else if (res.data.successful) {
          toast.success("Alumni data uploaded successfully..!", {
            position: "bottom-right",
          });
          closeModal();
          fetchAlumni();
        }
        if (res.data.emailExistsError) {
          toast.error("Alumni already exists..!", {
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
          <Title className="mb-8 text-success">Upload Alumni Data</Title>
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
            reg no, first name, middle name, last name, dob, gender, phone,
           admission year, passing year, current status
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

export default UploadAlumniModal;
