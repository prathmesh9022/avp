"use client";
import React from "react";
import axios from "axios";
import edit from "../../../../../img/edit.webp";
import del from "../../../../../img/delete.webp";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Chip } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { CheckboxGroup } from "@nextui-org/react";
import { CustomCheckbox } from "../../styleComp/CustomCheckbox";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";

import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";

export const CheckIcon = ({ size, height, width, ...props }) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default function EditStock({ item, RefetchData, DataFetch }) {
  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("full");
  const sizes = ["full"];
  const { AreasOption, fetchData, user } = useGlobalContext();
  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };
  const [groupSelected, setGroupSelected] = React.useState([]);
  const [approved, setApproved] = React.useState(true);

  const [formData, setFormData] = React.useState({
    Code: "",
    Name: "",
    contactPer: "",
    mobile: "",
    DLNo: "",
    GSTNo: "",
    address: "",
    Area: [],
    DateOfBirth: "",
    DateOfAni: "",
    Active: true,
    approved: true,
  });
  formData.approved = approved;

  React.useEffect(() => {
    // Destructure the properties from the 'item'
    const {
      Code,
      Name,
      mobile,
      contactPer,
      DLNo,
      GSTNo,
      address,
      Area,
      Active,
      approved,
      DateOfBirth,
      DateOfAni,
    } = item || {};

    // Update the 'formData' state with the values from 'item'
    setFormData({
      Code,
      Name,
      mobile,
      contactPer,
      DLNo,
      GSTNo,
      address,
      Area,
      Active,
      approved,
      DateOfBirth,
      DateOfAni,
    });
    setApproved(approved);
    setGroupSelected(Area);
  }, [item]);
  formData.Area = groupSelected;

  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Code) {
      newErrors.Code = "chemist Code is required";
    }
    if (!formData.Name) {
      newErrors.Name = "Chemist Name is required";
    }

    // Add similar validation for other fields

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [response, setResponse] = React.useState({});

  const handleApproved = (idparam, status) => {
    if (validateForm()) {
      const apiUrl = `${Server}/add/stock/${idparam}`;
      setIsLoading(true);
      setHasError(false);

      axios
        .put(apiUrl, { approved: status })
        .then((response) => {
          const responseData = response.data;
          setResponse(responseData);

          toast.success(`${response?.data?.message}`);
        })
        .catch((error) => {
          setHasError(true);
          toast.error(error?.response?.data?.message);
        })
        .finally(() => {
          setIsLoading(false);
          RefetchData(DataFetch);
        });
    } else {
      toast.error("Please fill All Details");
    }
  };

  const handleSubmit = (idparam) => {
    if (validateForm()) {
      const apiUrl = `${Server}/add/stock/${idparam}`;
      setIsLoading(true);
      setHasError(false);

      axios
        .put(apiUrl, formData)
        .then((response) => {
          const responseData = response.data;
          setResponse(responseData);

          toast.success(`${response?.data?.message}`);
        })
        .catch((error) => {
          setHasError(true);
          toast.error(error?.response?.data?.message);
        })
        .finally(() => {
          setIsLoading(false);
          RefetchData(DataFetch);
        });
    } else {
      toast.error("Please fill All Details");
    }
  };

  const handleDelete = (idparam) => {
    const apiUrl = `${Server}/add/stock/${idparam}`;
    setIsLoading(true);
    setHasError(false);

    axios
      .delete(apiUrl, formData)
      .then((response) => {
        const responseData = response.data;
        setResponse(responseData);

        toast.success(`${response?.data?.message}`);
      })
      .catch((error) => {
        setHasError(true);
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
        RefetchData(DataFetch);
      });
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <div
            key={size}
            className="flex flex-col gap-2 justify-center items-center"
          >
            <div className="flex flex-row gap-2">
              <Image
                onClick={() => handleOpen(size)}
                className="cursor-pointer"
                src={edit}
                width={20}
                height={20}
                alt="icons"
              />

              <Dropdown>
                <DropdownTrigger>
                  <Image
                    className="cursor-pointer"
                    src={del}
                    width={20}
                    height={20}
                    alt="icons"
                  />
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Dropdown Variants"
                  color="default"
                  variant="solid"
                >
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Confirm Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            {item?.approved === true ? (
              <Chip
                startContent={<CheckIcon size={18} />}
                variant="faded"
                color="success"
              >
                Approved
              </Chip>
            ) : (
              <Chip color="warning" variant="dot">
                UnApproved
              </Chip>
            )}
          </div>
        ))}
      </div>
      <Modal
        size={size}
        isOpen={isOpen}
        scrollBehavior={`inside`}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Stockiest
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4 justify-center items-center">
                  <div className="grid lg:grid-cols-2 grid-cols-1  gap-4">
                    <div className="flex flex-col justify-center ">
                      <Input
                        type="text"
                        label="Stokiest Code"
                        name="Code"
                        value={formData.Code}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.Code && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.Code}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <Input
                        type="text"
                        label="stockist Name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.Name && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.Name}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col justify-center ">
                      <Input
                        type="text"
                        label="Contact person"
                        name="contactPer"
                        value={formData.contactPer}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.contactPer && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.contactPer}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col justify-center ">
                      <Input
                        type="tel"
                        label="Mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.mobile && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.mobile}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <Input
                        type="text"
                        label="GST NO"
                        name="GSTNo"
                        value={formData.GSTNo}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.GSTNo && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.GSTNo}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <Input
                        type="text"
                        label="DLNo"
                        name="DLNo"
                        value={formData.DLNo}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.DLNo && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.DLNo}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-center flex-col">
                      <label className="text-sm p-1"> Date Of Birth</label>
                      <Input
                        type="date"
                        label=""
                        name="DateOfBirth"
                        value={formData.DateOfBirth}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex justify-center flex-col">
                      <label className="text-sm p-1">Date Of Anivarsery</label>
                      <Input
                        type="date"
                        label=""
                        name="DateOfAni"
                        value={formData.DateOfAni}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                      <div className="flex flex-col  gap-4 w-full">
                        <CheckboxGroup
                          className="gap-1 flex text-black font-bold  flex-wrap"
                          label="Select Areas"
                          orientation="horizontal"
                          value={groupSelected}
                          onChange={setGroupSelected}
                        >
                          {AreasOption?.map((i) => {
                            return (
                              <>
                                <CustomCheckbox className="text-sm" value={i}>
                                  {i}
                                </CustomCheckbox>
                              </>
                            );
                          })}
                        </CheckboxGroup>
                        {errors.selectedAreas && (
                          <p className="text-red-500 text-xs font-semibold p-1">
                            {errors.selectedAreas}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col justify-center ">
                      <Input
                        type="textarea"
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.address && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.address}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                {isLoading ? (
                  <Button
                    isLoading
                    className="bg-black text-white"
                    spinner={
                      <svg
                        className="animate-spin h-5 w-5 text-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          fill="currentColor"
                        />
                      </svg>
                    }
                  >
                    Wait..
                  </Button>
                ) : (
                  <>
                    <Button
                      color="black"
                      className="bg-black text-white"
                      onClick={() => handleSubmit(item._id)}
                    >
                      Save
                    </Button>
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
