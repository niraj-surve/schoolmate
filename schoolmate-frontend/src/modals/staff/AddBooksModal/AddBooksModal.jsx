import {
  Button,
  Dialog,
  DialogPanel,
  NumberInput,
  Select,
  SelectItem,
  TextInput,
  Title,
} from "@tremor/react";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { calculateAge } from "../../../helpers/AgeLimitter";
import toast from "react-hot-toast";
import { FaXmark, FaCircleArrowLeft, FaPlus } from "react-icons/fa6";
import { FaPlusSquare } from "react-icons/fa";

const AddBooksModal = ({ isOpen, currentYear, setYearsOptions, getYears, getBooksData, closeModal }) => {
  const apiKey = import.meta.env.VITE_API_URL;

  const subjectDivRef = useRef(null);

  const scrollToSubject = (index) => {
    const subjectId = `subject${index + 1}`;
    const subjectDiv = document.getElementById(subjectId);
    if (subjectDiv) {
      subjectDiv.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  const [subjectList, setSubjectList] = useState({
    subject1: "",
    subject2: "",
    subject3: "",
    subject4: "",
    subject5: "",
    subject6: "",
    subject7: "",
    subject8: "",
    subject9: "",
    subject10: "",
    subject11: "",
  });

  const handleSubjectChange = (index, selectedSubject) => {
    // Update the subject for the respective book in subjectList
    const subjectKey = `subject${index + 1}`;
    setSubjectList((prevState) => ({
      ...prevState,
      [subjectKey]: selectedSubject,
    }));
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      year: currentYear,
      books: [
        {
          noBooksFirst: "",
          noBooksSecond: "",
          noBooksThird: "",
          noBooksFourth: "",
          noBooksFifth: "",
          noBooksSixth: "",
          noBooksSeventh: "",
        },
      ],
    },
    mode: "all",
  });

  const { fields, append } = useFieldArray({
    control,
    name: "books",
  });

  const subjects = [
    "Marathi",
    "English",
    "Hindi",
    "Mathematics",
    "Semi-English Maths",
    "Environmental Study Ratnagiri",
    "Environmental Study - I",
    "Environmental Study - II",
    "Science",
    "Semi-English Science",
    "History and Civics",
    "Geography",
  ];

  const onSubmit = async (data) => {
    // Update each book's subject based on the subjectList
    const updatedBooks = data.books.map((book, index) => ({
      ...book,
      subject: subjectList[`subject${index + 1}`] || "", // Set subject from subjectList, defaulting to empty string if not found
    }));

    // Check if any subject is empty
    const isEmptySubject = updatedBooks.some((book) => !book.subject);

    if (isEmptySubject) {
      // Toast the error message if any subject is empty
      toast.error("Please select subject!", {
        position: "bottom-right",
      });
      return; // Prevent further execution
    }

    // Update the form data with the updated books array
    const updatedFormData = {
      ...data,
      books: updatedBooks,
    };

    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await axios
      .post(`${apiKey}/user/staff/add-books-data`, updatedFormData, config)
      .then((res) => {
        if (res.data.successful) {
          toast.success("Required books added successfully..!", {
            position: "bottom-right",
          });
          reset();
          closeModal();
          getBooksData(currentYear);
          getYears();
          setYearsOptions();
        } else {
          toast.error("Required books already added..!", {
            position: "bottom-right",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error..!", { position: "bottom-right" });
      });
  };

  return (
    <Dialog
      id="addBooksModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-primary">Add Required Books</Title>
          <FaXmark
            className="text-lg text-danger cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-col">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 w-full">
              <section className="flex flex-col">
                <div className="flex gap-4">
                  <span className="w-1/2 mb-4">
                    <label htmlFor="year" className="text-sm">
                      Year
                    </label>
                    <TextInput
                      disabled
                      className="mt-1 w-fit"
                      {...register("year", { required: true })}
                    />
                  </span>
                </div>
                <div
                  id="subjectDiv"
                  ref={subjectDivRef}
                  className="flex flex-col overflow-y-auto h-[45vh] pr-4"
                >
                  {fields.map((field, index) => (
                    <div
                      id={"subject" + (index + 1)}
                      key={field.id}
                      className="flex flex-col mb-4"
                    >
                      <div className="flex w-1/2">
                        <span className="w-full mb-4">
                          <label htmlFor="subject" className="text-sm">
                            Subject {index + 1}
                          </label>
                          <Select
                            value={subjectList[`subject${index + 1}`]}
                            onChange={(selected) =>
                              handleSubjectChange(index, selected)
                            }
                            className="mt-1"
                          >
                            {subjects
                              .filter(
                                (subjectItem) =>
                                  !Object.values(subjectList).includes(
                                    subjectItem
                                  ) ||
                                  subjectList[`subject${index + 1}`] ===
                                    subjectItem
                              )
                              .map((subjectItem, subjectIndex) => (
                                <SelectItem
                                  key={subjectIndex}
                                  value={subjectItem}
                                >
                                  {subjectItem}
                                </SelectItem>
                              ))}
                          </Select>
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <span className="w-full mb-4">
                          <label htmlFor="subject" className="text-sm">
                            No. of Books for First Standard
                          </label>
                          <NumberInput
                            enableStepper={false}
                            placeholder="0"
                            {...register(`books[${index}].noBooksFirst`, {
                              required: true,
                            })}
                            className="mt-1"
                          />
                        </span>
                        <span className="w-full mb-4">
                          <label htmlFor="subject" className="text-sm">
                            No. of Books for Second Standard
                          </label>
                          <NumberInput
                            enableStepper={false}
                            placeholder="0"
                            {...register(`books[${index}].noBooksSecond`, {
                              required: true,
                            })}
                            className="mt-1"
                          />
                        </span>
                        <span className="w-full mb-4">
                          <label htmlFor="subject" className="text-sm">
                            No. of Books for Third Standard
                          </label>
                          <NumberInput
                            enableStepper={false}
                            placeholder="0"
                            {...register(`books[${index}].noBooksThird`, {
                              required: true,
                            })}
                            className="mt-1"
                          />
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <span className="w-full mb-4">
                          <label htmlFor="subject" className="text-sm">
                            No. of Books for Fourth Standard
                          </label>
                          <NumberInput
                            enableStepper={false}
                            placeholder="0"
                            {...register(`books[${index}].noBooksFourth`, {
                              required: true,
                            })}
                            className="mt-1"
                          />
                        </span>
                        <span className="w-full mb-4">
                          <label htmlFor="subject" className="text-sm">
                            No. of Books for Fifth Standard
                          </label>
                          <NumberInput
                            enableStepper={false}
                            placeholder="0"
                            {...register(`books[${index}].noBooksFifth`, {
                              required: true,
                            })}
                            className="mt-1"
                          />
                        </span>
                        <span className="w-full mb-4">
                          <label htmlFor="subject" className="text-sm">
                            No. of Books for Sixth Standard
                          </label>
                          <NumberInput
                            enableStepper={false}
                            placeholder="0"
                            {...register(`books[${index}].noBooksSixth`, {
                              required: true,
                            })}
                            className="mt-1"
                          />
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <span className="w-[32%] mb-4">
                          <label htmlFor="subject" className="text-sm">
                            No. of Books for Seventh Standard
                          </label>
                          <NumberInput
                            enableStepper={false}
                            placeholder="0"
                            {...register(`books[${index}].noBooksSeventh`, {
                              required: true,
                            })}
                            className="mt-1"
                          />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => {
                      append({
                        subject: "",
                        noBooksFirst: "",
                        noBooksSecond: "",
                        noBooksThird: "",
                        noBooksFourth: "",
                        noBooksFifth: "",
                        noBooksSixth: "",
                        noBooksSeventh: "",
                      });
                      setTimeout(() => {
                        scrollToSubject(fields.length);
                      }, 500);
                    }}
                    className="btn-transition bg-primary border-primary hover:bg-white hover:border-primary hover:text-primary"
                  >
                    <FaPlusSquare />
                    Add Subject
                  </Button>
                </div>
              </section>
            </div>
          </div>
          <div className="mt-4 float-right">
            <Button
              disabled={!isValid}
              type={"submit"}
              className="btn-transition bg-primary border-primary hover:bg-white hover:border-primary hover:text-primary"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default AddBooksModal;
