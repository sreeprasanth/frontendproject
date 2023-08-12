import React, { useEffect, useRef, useState } from "react";
import { Steps } from "primereact/steps";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import { StyleClass } from "primereact/styleclass";
import { OverlayPanel } from "primereact/overlaypanel";
import { Badge } from "primereact/badge";
import { Dropdown } from "primereact/dropdown";
const FormErrorMsg = (props: any): JSX.Element => {
  return (
    <div className="pt-2 text-sm" style={{ color: "red" }}>
      {props.msg}
    </div>
  );
};
const Course = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [valuearray, setValueArray]: any = useState([]);
  const [notification, setNotification]: any = useState([]);
  const [state, setState] = useState(1);
  const [name, setName]: any = useState([]);
  const [user, setUser]: any = useState([]);

  const btnRef28 = useRef(null);
  const btnRef29 = useRef(null);
  const btnRef30 = useRef(null);
  const toast = React.useRef() as React.MutableRefObject<Toast>;
  const op = useRef<OverlayPanel>(null);

  const items = [
    {
      label: "Basic Information",
    },
    {
      label: "Additional Information",
    },
    {
      label: "Elgiblity & Syllabus",
    },
    {
      label: "Fee & Scholarship",
    },
  ];
  const [userData, setUserData]: any = useState([]);
  const [messages, setMessages]: any = useState([]); // Initialize with an empty array
  const courseList = valuearray?.map((e: any, index: any) => {
    return {
      courseName: e?.name,
      admission: e?.admission,
      elgiblity: e?.eligiblity,
      specialization: e?.specialization,
      fees: e?.fee,
      timeCreated: e?.time,
      comments:
        messages[index]?.comments.map((e: any) => {
          return e;
        }) || [],
    };
  });
  useEffect(() => {
    if (courseList && messages.length < courseList.length) {
      setMessages(courseList);
    }
  }, [courseList]); // Only trigger when courseList changes

  const handleSendMessage = (messageText: any) => {
    if (messageText.trim() === "") return;

    const newMessage = {
      text: messageText,
      timestamp: new Date().toLocaleTimeString(),
      comments: [],
    };

    setMessages([...messages, newMessage]);
  };

  const handleSendComment = (messageIndex: any, commentText: any) => {
    if (commentText.trim() === "") return;

    const newComment = {
      text: commentText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      replies: [],
      name: name,
    };

    const updatedMessages: any = [...messages];
    updatedMessages[messageIndex].comments.push(newComment);
    setMessages(updatedMessages);
    const notify = {
      name: name,
      action: "comment",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      topic: messages[messageIndex]?.courseName,
    };
    notification.push(notify);
  };
  const [applyStatus, setApplyStatus]: any = useState([]);
  const handleStatusChange = (message: any) => {
    console.log("status changes", message);

    const newNotify = {
      name: name,
      action: "applied",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      topic: message,
    };
    setNotification([...notification, newNotify]);

    const newUserStatus = {
      course: message,
      name: user[0]?.name,
      email: user[0]?.email,
      phone: user[0]?.phoneNumber,
      status: "applied",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setApplyStatus([...applyStatus, newUserStatus]);
  };

  const handleSendReply = (
    messageIndex: any,
    commentIndex: any,
    replyText: any
  ) => {
    if (replyText.trim() === "") return;

    const newReply = {
      text: replyText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      name: name,
    };

    const updatedMessages: any = [...messages];

    updatedMessages[messageIndex].comments[commentIndex].replies.push(newReply);
    setMessages(updatedMessages);
    const notify = {
      name: name,
      action: "Reply",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      topic: messages[messageIndex]?.courseName,
    };
    notification.push(notify);
  };

  //course creatiion starts
  const validationSchema = Yup.object({
    name: Yup.string().required("Course name is required"),
    admission: Yup.string().required("Admission is required"),
    // specialization: Yup.string().required("Specialization is required"),
    eligiblity: Yup.string().required("Elgiblity is required"),
    fee: Yup.string().required("Fees is required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      if (activeIndex == 3) {
        setState(4);
        let val: any = {
          ...values,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        valuearray.push(val);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "New course created sucessfully",
          life: 3000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  //course creation ends
  //login starts
  const validationSchemaLogin = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const handleLogin = async (values: any) => {
    try {
      const userLength: any = userData.filter((e: any) => {
        return e?.email === values?.email && e?.password == values?.password;
      });
      if (userLength?.length > 0) {
        setState(0);
        setUser(userLength);
        setName(userLength[0]?.name);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Login sucess",
          life: 3000,
        });
      } else if (
        values?.email === "admin@mailinator.com" &&
        values?.password === "demo"
      ) {
        setName("admin");
        setState(0);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Login sucess",
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Login failed",
          life: 3000,
        });
      }
    } catch (error) {
      console.error("err", error);
    }
  };
  //login ends
  //signup starts
  const validationSchemaSignup = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    name: Yup.string().required("Name is required"),
    password: Yup.string().required("Password is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .max(15, "phone number is not valid")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,

        "Phone number is not valid"
      ),
  });
  const handleSignup = async (values: any) => {
    try {
      userData.push(values);

      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Signup sucess",
        life: 3000,
      });
      setState(1);
    } catch (error) {
      console.error(error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Signup failed",
        life: 3000,
      });
    }
  };
  //Signup ends

  console.log("msg", user, applyStatus);
  return (
    <div>
      <Toast ref={toast} />

      {state != 1 && state != 2 && (
        <div
          className="surface-overlay shadow-2 flex relative lg:static justify-content-between"
          style={{ minHeight: "42px" }}
        >
          <StyleClass
            nodeRef={btnRef28}
            selector="@next"
            enterClassName="hidden"
            leaveToClassName="hidden"
            hideOnOutsideClick
          >
            <a
              ref={btnRef28}
              className="p-ripple cursor-pointer inline-flex align-items-center px-3 lg:hidden text-700"
            >
              <i className="pi pi-bars text-2xl"></i>
            </a>
          </StyleClass>
          <div className="hidden lg:flex absolute lg:static w-full surface-overlay left-0 top-100 z-1 shadow-2 lg:shadow-none">
            <ul className="flex list-none p-0 m-0 flex-column lg:flex-row">
              <li className="h-full">
                <a
                  className={`${
                    state == 4
                      ? " p-ripple cursor-pointer h-full inline-flex align-items-center text-600 border-left-2 lg:border-left-none lg:border-bottom-2  transition-colors transition-duration-150 py-3 lg:py-0 px-3 border-blue-500"
                      : " p-ripple cursor-pointer h-full inline-flex align-items-center text-600 border-left-2 lg:border-left-none lg:border-bottom-2  transition-colors transition-duration-150 py-3 lg:py-0 px-3"
                  }`}
                >
                  <span className="pi pi-home mr-2"></span>
                  <span
                    className="font-medium"
                    onClick={() => {
                      setState(4);
                    }}
                  >
                    Course List
                  </span>
                  <Ripple />
                </a>
              </li>
              {name == "admin" && (
                <li className="h-full">
                  <a
                    className={`${
                      state == 3
                        ? " p-ripple cursor-pointer h-full inline-flex align-items-center text-600 border-left-2 lg:border-left-none lg:border-bottom-2  transition-colors transition-duration-150 py-3 lg:py-0 px-3 border-blue-500"
                        : " p-ripple cursor-pointer h-full inline-flex align-items-center text-600 border-left-2 lg:border-left-none lg:border-bottom-2  transition-colors transition-duration-150 py-3 lg:py-0 px-3"
                    }`}
                  >
                    <span className="pi pi-users mr-2"></span>
                    <span
                      className="font-medium"
                      onClick={() => {
                        setState(3);
                        setActiveIndex(0);
                      }}
                    >
                      Add New Course
                    </span>
                    <Ripple />
                  </a>
                  <a
                    className={`${
                      state == 5
                        ? " p-ripple cursor-pointer h-full inline-flex align-items-center text-600 border-left-2 lg:border-left-none lg:border-bottom-2  transition-colors transition-duration-150 py-3 lg:py-0 px-3 border-blue-500"
                        : " p-ripple cursor-pointer h-full inline-flex align-items-center text-600 border-left-2 lg:border-left-none lg:border-bottom-2  transition-colors transition-duration-150 py-3 lg:py-0 px-3"
                    }`}
                  >
                    <span className="pi pi-users mr-2"></span>
                    <span
                      className="font-medium"
                      onClick={() => {
                        setState(5);
                      }}
                    >
                      Applied list
                    </span>
                    <Ripple />
                  </a>
                </li>
              )}
            </ul>
          </div>
          <StyleClass
            nodeRef={btnRef29}
            selector="@next"
            enterClassName="hidden"
            leaveToClassName="hidden"
            hideOnOutsideClick
          >
            <a
              ref={btnRef29}
              className="p-ripple cursor-pointer inline-flex align-items-center px-3 lg:hidden text-700"
            >
              <i className="pi pi-ellipsis-v text-xl"></i>
            </a>
          </StyleClass>
          <div className="hidden lg:flex lg:justify-content-end absolute lg:static w-full surface-overlay left-0 top-100 z-1 shadow-2 lg:shadow-none">
            <ul className="flex list-none p-0 m-0 flex-column lg:flex-row">
              {name == "admin" && (
                <li className="h-full">
                  <a className="p-ripple cursor-pointer h-full inline-flex align-items-center text-600 py-3 lg:py-0 px-3 border-left-2 lg:border-left-none lg:border-bottom-2 border-transparent hover:border-500 transition-colors transition-duration-150">
                    <span
                      className="pi pi-bell mr-2 lg:mr-0"
                      onClick={(e: any) => op.current?.toggle(e)}
                    ></span>
                    <span className="font-medium inline lg:hidden">
                      Notifications
                    </span>

                    <Ripple />
                    <OverlayPanel
                      ref={op}
                      id="overlay_panel"
                      style={{ width: "550px" }}
                      className="overlaypanel-demo"
                    >
                      <div>
                        <div className="flex justify-between border-b pb-3">
                          <div className="font-medium text-lg">
                            Notification
                          </div>
                        </div>
                        <div className="overflow-y-scroll h-96">
                          {notification
                            ?.filter((data: any) => {
                              return data?.name != "admin";
                            })
                            .map((e: any, index: any) => {
                              return (
                                <div
                                  key={index}
                                  className="flex justify-between bg-sky-50 border-b p-3 cursor-pointer"
                                >
                                  <div className="text-sm">
                                    {e?.name != "admin" && (
                                      <div>
                                        {e?.name} {e?.action} to a post of you
                                        at {e?.time}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </OverlayPanel>
                  </a>
                </li>
              )}
              <li className="h-full relative">
                <StyleClass
                  nodeRef={btnRef30}
                  selector="@next"
                  enterClassName="hidden"
                  enterActiveClassName="scalein"
                  leaveToClassName="hidden"
                  leaveActiveClassName="fadeout"
                  hideOnOutsideClick
                >
                  <a
                    ref={btnRef30}
                    className="p-ripple cursor-pointer h-full inline-flex align-items-center text-600 py-3 lg:py-0 px-3 border-left-2 lg:border-left-none lg:border-bottom-2 border-transparent hover:border-500 transition-colors transition-duration-150"
                  >
                    <img
                      src="assets/images/blocks/avatars/circle/avatar-f-1.png"
                      className="lg:mr-0"
                      style={{ width: "28px", height: "28px" }}
                    />
                    <span className="mx-2 font-medium text-900">{name}</span>
                    <i className="pi pi-angle-down"></i>
                    <Ripple />
                  </a>
                </StyleClass>
                <div className="hidden static lg:absolute w-full surface-overlay left-0 top-100 z-1 shadow-none lg:shadow-2 origin-top border-round pl-3 lg:pl-0">
                  <ul className="list-none p-0 m-0">
                    <li>
                      <a className="p-ripple cursor-pointer h-full inline-flex align-items-center text-600 border-left-2 border-transparent hover:border-500 transition-colors transition-duration-150 p-3">
                        <span className="pi pi-user mr-2"></span>
                        <span
                          className="font-medium"
                          onClick={() => {
                            setState(0);
                          }}
                        >
                          Profile
                        </span>
                        <Ripple />
                      </a>
                    </li>
                    <li>
                      <a className="p-ripple cursor-pointer h-full inline-flex align-items-center text-600 border-left-2 border-transparent hover:border-500 transition-colors transition-duration-150 p-3">
                        <span className="pi pi-cog mr-2"></span>
                        <span className="font-medium">Settings</span>
                        <Ripple />
                      </a>
                    </li>
                    <li>
                      <a className="p-ripple cursor-pointer h-full inline-flex align-items-center text-600 border-left-2 border-transparent hover:border-500 transition-colors transition-duration-150 p-3">
                        <span className="pi pi-sign-out mr-2"></span>
                        <span
                          className="font-medium"
                          onClick={() => {
                            setState(1);
                            setName(null);
                          }}
                        >
                          Sign Out
                        </span>
                        <Ripple />
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
      {state == 0 ? (
        <div className="bg-blue-50 flex justify-center   min-h-screen">
          <div className="mt-20 text-[40px] text-blue-400 font-bold">
            Welcome {name}
          </div>
        </div>
      ) : state == 1 ? (
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchemaLogin}
          enableReinitialize={true}
          onSubmit={handleLogin}
        >
          <div>
            <Form>
              <div>
                <div className="flex align-items-center justify-content-center">
                  <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                    <div className="text-center mb-5">
                      <img
                        src="/demo/images/blocks/logos/hyper.svg"
                        alt="hyper"
                        height={50}
                        className="mb-3"
                      />
                      <div className="text-900 text-3xl font-medium mb-3">
                        Welcome Back
                      </div>
                      <span className="text-600 font-medium line-height-3">
                        Don't have an account?
                      </span>
                      <a
                        className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                        onClick={() => {
                          setState(2);
                        }}
                      >
                        Create today!
                      </a>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-900 font-medium mb-2"
                      >
                        Email
                      </label>
                      <Field
                        className="w-full h-[40px] mt-1"
                        name="email"
                        as={InputText}
                      />
                      <ErrorMessage name="email" component="div" />

                      <label
                        htmlFor="password"
                        className="block text-900 font-medium mb-2 mt-4"
                      >
                        Password
                      </label>
                      <Field
                        className="w-full h-[40px] mt-1"
                        name="password"
                        as={InputText}
                      />
                      <ErrorMessage name="password" component="div" />

                      <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                          <label htmlFor="rememberme">Remember me</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
                          Forgot your password?
                        </a>
                      </div>

                      <Button
                        label="Sign In"
                        type="submit"
                        icon="pi pi-user"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </Formik>
      ) : state == 2 ? (
        <Formik
          initialValues={{ name: "", email: "", phoneNumber: "", password: "" }}
          validationSchema={validationSchemaSignup}
          onSubmit={handleSignup}
          enableReinitialize={true}
        >
          <div>
            <Form>
              <div>
                <div className="flex align-items-center justify-content-center">
                  <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                    <div className="text-center mb-5">
                      <img
                        src="/demo/images/blocks/logos/hyper.svg"
                        alt="hyper"
                        height={50}
                        className="mb-3"
                      />
                      <div className="text-900 text-3xl font-medium mb-3">
                        Welcome Back
                      </div>
                      <span className="text-600 font-medium line-height-3">
                        Already have an account?
                      </span>
                      <a
                        className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                        onClick={() => {
                          setState(1);
                        }}
                      >
                        Please login
                      </a>
                    </div>

                    <div className="">
                      <label
                        htmlFor="name"
                        className="block text-900 font-medium mb-2"
                      >
                        Name
                      </label>
                      <Field
                        className="w-full h-[40px] mt-1"
                        name="name"
                        as={InputText}
                      />
                      <ErrorMessage name="name" component="div" />
                      <label
                        htmlFor="phone"
                        className="block text-900 font-medium mb-2 mt-4"
                      >
                        Phone number
                      </label>
                      <Field
                        className="w-full h-[40px] mt-1"
                        name="phoneNumber"
                        as={InputText}
                      />
                      <ErrorMessage name="phoneNumber" component="div" />
                      <label
                        htmlFor="email"
                        className="block text-900 font-medium mb-2 mt-4"
                      >
                        Email
                      </label>
                      <Field
                        className="w-full h-[40px] mt-1"
                        name="email"
                        as={InputText}
                      />
                      <ErrorMessage name="email" component="div" />

                      <label
                        htmlFor="password"
                        className="block text-900 font-medium mb-2 mt-4"
                      >
                        Password
                      </label>
                      <Field
                        className="w-full h-[40px] mt-1"
                        name="password"
                        as={InputText}
                      />
                      <ErrorMessage name="password" component="div" />

                      <Button
                        label="Sign Up"
                        type="submit"
                        icon="pi pi-user"
                        className="w-full mt-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </Formik>
      ) : state == 3 ? (
        <>
          <div className="m-5 p-5">
            <div className="card ">
              <Steps model={items} activeIndex={activeIndex} />
            </div>
            <div className="flex flex-row mt-5">
              <h6 className="text-xl text-bold">Course creation</h6>
              <div className="ml-2 rounded-full ... bg-gray-200 px-3 ">
                Step {activeIndex + 1} of 4
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="flex justify-center  w-3/4 p-5  shadow overflow-hidden rounded-[4px]">
              <Formik
                initialValues={{
                  name: "",
                  admission: "",
                  eligiblity: "",
                  fee: "",
                  specialization: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {(formik) => (
                  <Form className="">
                    <div className="flex flex-col w-full ">
                      <div className="text-2xl  font-semibold leading-7 text-gray-700  sm:truncate h-[40px]justify-start px-5">
                        {activeIndex == 0
                          ? "Basic Information"
                          : activeIndex == 1
                          ? "Additional Information"
                          : activeIndex == 2
                          ? "Elgiblity & Syllabus"
                          : "Scholarship & Fees"}
                      </div>
                      {activeIndex == 0 ? (
                        <div className="bg-white w-[1000px] space-y-6 shadow overflow-hidden rounded-[4px] mt-3 p-6 ">
                          <div className="col-span-6">
                            <label htmlFor="block text-sm font-medium text-gray-700">
                              Course Name*
                            </label>
                            <Field
                              className="w-full h-[40px] mt-1"
                              name="name"
                              as={InputText}
                            />
                            {formik.touched.name &&
                              formik.values.name == "" && (
                                <div className="text-sm text-red-500 mt-2">
                                  Course name is required
                                </div>
                              )}
                          </div>
                        </div>
                      ) : activeIndex == 1 ? (
                        <div className="bg-white w-[1000px]  space-y-6 shadow overflow-hidden rounded-[4px] mt-3 p-6 ">
                          <div className="col-span-6">
                            <label htmlFor="block text-sm font-medium text-gray-700">
                              Admission*
                            </label>
                            <Field
                              className="w-full h-[40px] mt-1"
                              name="admission"
                              as={InputText}
                            />
                            {formik.touched.admission &&
                              formik.values.admission == "" && (
                                <div className="text-sm text-red-500 mt-2">
                                  Admission is required
                                </div>
                              )}
                          </div>
                          <div className="col-span-6">
                            <label htmlFor="block text-sm font-medium text-gray-700">
                              Select Specialization*
                            </label>

                            <Field
                              name="specialization"
                              as={Dropdown}
                              optionLabel="name"
                              optionValue="name"
                              options={[
                                { name: "MBBS" },
                                { name: "B.TECH" },
                                { name: "MBA" },
                              ]}
                              className="w-full h-[40px] mt-1"
                            />
                            {formik.touched.specialization &&
                              formik.values.specialization == "" && (
                                <div className="text-sm text-red-500 mt-2">
                                  specialization is required
                                </div>
                              )}
                          </div>
                        </div>
                      ) : activeIndex == 2 ? (
                        <div className="bg-white w-[1000px]  space-y-6 shadow overflow-hidden rounded-[4px] mt-3 p-6 ">
                          <div className="col-span-6">
                            <label htmlFor="block text-sm font-medium text-gray-700">
                              Eligiblity*
                            </label>
                            <Field
                              className="w-full mt-1 h-[112px]"
                              name="eligiblity"
                              as={InputTextarea}
                            />
                            {formik.touched.eligiblity &&
                              formik.values.eligiblity == "" && (
                                <div className="text-sm text-red-500 mt-2">
                                  eligiblity is required
                                </div>
                              )}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white w-[1000px]  space-y-6 shadow overflow-hidden rounded-[4px] mt-3 p-6 ">
                          <div className="col-span-6">
                            <label htmlFor="block text-sm font-medium text-gray-700">
                              Fees and scholarship details*
                            </label>
                            <Field
                              className="w-full mt-1 h-[112px]"
                              name="fee"
                              as={InputTextarea}
                            />
                            <ErrorMessage
                              name="fee"
                              render={(msg: any) => <FormErrorMsg msg={msg} />}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row justify-end">
                      {activeIndex != 0 && (
                        <button
                          className="w-[100px] bg-[#127FBD] text-white mt-4 rounded-md h-[40px] cursor-pointer"
                          onClick={() => {
                            setActiveIndex(activeIndex - 1);
                          }}
                        >
                          back
                        </button>
                      )}
                      <button
                        type="submit"
                        onClick={() => {
                          if (activeIndex != 3) {
                            setActiveIndex(activeIndex + 1);
                          }
                        }}
                        className="w-[100px] ml-4 bg-[#127FBD] text-white mt-4 rounded-md h-[40px] cursor-pointer"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </>
      ) : state == 4 ? (
        <div className="message-container">
          {messages.map((message: any, messageIndex: any) => (
            <div
              key={messageIndex}
              className="message bg-white  shadow-2 p-3 m-3 rounded-lg"
            >
              <div className="bg-white-100 p-5 m-5 shadow-2  border-1 border-50 border-round">
                <div className="flex flex-row ">
                  <div>
                    <img
                      src="/assets/images/feedback_report.svg"
                      className="ml-2"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="font-bold text-[20px]">
                      {message.courseName}
                    </div>

                    <div>{message.timeCreated}</div>
                  </div>
                </div>
                {name != "admin" && (
                  <div className="flex justify-end -mt-5">
                    {applyStatus?.filter((e: any) => {
                      return (
                        e?.name == name && e?.course == message?.courseName
                      );
                    }).length == 0 ? (
                      <Button
                        label="Apply"
                        outlined
                        className="h-[40px]"
                        onClick={() => {
                          handleStatusChange(message?.courseName);
                        }}
                      />
                    ) : (
                      <div className="bg-blue-400 p-2 rounded-full px-2">
                        Applied
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-6">Dear Students!</div>
                <div className="mt-2">
                  We are launching a new course the details related to the
                  course are given below the elgiblity for the given course is
                  as follows :-
                  <br></br>
                  {message?.elgiblity}
                  <br></br>
                  <div className="mt-3">
                    The admission need following documents :-
                  </div>
                  <br></br>
                  {message?.admission}
                  <br></br>
                  <div className="mt-3">
                    The fees details for the above course as follows :-
                  </div>
                  <br></br>
                  {message?.fees}
                  <div className="flex justify-center mt-4">
                    <img
                      src="/assets/images/login_image.jpg"
                      className="mr-2 w-full h-[500px]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex  -mt-3 m-5">
                <div className="flex flex-row rounded-full ... bg-gray-200 p-1 px-3 ">
                  <p>{message.comments.length} Comments </p>
                  <p className="ml-3">.</p>
                  <p className=" ml-3">
                    {message.comments.reduce(
                      (total: any, comment: any) =>
                        total + comment.replies.length,
                      0
                    )}{" "}
                    Reply
                  </p>
                </div>
              </div>
              <div className="">
                {message.comments.map((comment: any, commentIndex: any) => (
                  <div key={commentIndex} className="pl-7">
                    <div className="flex flex-row">
                      <div className="bg-blue-300 rounded-full w-[72px] h-[72px]">
                        <div className="flex justify-center mt-4">C</div>
                      </div>

                      <div className="bg-gray-100 rounded-lg -mt-1 m-5 h-[90px]  p-3 w-full">
                        {/* {JSON.stringify(comment)} */}
                        <div>
                          <div>
                            {comment?.name} . {comment?.time}
                          </div>
                          <div className="mt-2 break-all">{comment.text}</div>
                        </div>
                      </div>
                    </div>
                    <div className="reply-container">
                      {comment.replies.map((reply: any, replyIndex: any) => (
                        <div key={replyIndex} className="w-full">
                          {/* {JSON.stringify(reply)} */}
                          <div className="flex flex-row">
                            <div className="bg-gray-100 rounded-lg -mt-1 m-5 h-[90px]  p-3 w-full flex justify-end">
                              <div>
                                <div>
                                  {reply?.name} . {reply?.time}
                                </div>
                                <div className="mt-2 break-all">
                                  {reply.text}
                                </div>
                              </div>
                            </div>
                            <div className="bg-blue-300 rounded-full w-[72px] h-[72px]">
                              <div className="flex justify-center mt-4">R</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="input-container p-5 -mt-5">
                      <input
                        type="text"
                        placeholder="Enter reply..."
                        onKeyDown={(e: any) => {
                          if (e.key === "Enter") {
                            handleSendReply(
                              messageIndex,
                              commentIndex,
                              e.target.value
                            );
                            e.target.value = "";
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="input-container  p-5 -mt-5 ml-7">
                <input
                  type="text"
                  placeholder="Enter comment..."
                  onKeyDown={(e: any) => {
                    if (e.key === "Enter") {
                      handleSendComment(messageIndex, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-10">
          <div className="bg-gray-100 w-full p-5 flex flex-row gap-4">
            {applyStatus.map((e: any) => {
              return (
                <div className="bg-white h-[400px] w-[350px]">
                  <div className="flex flex-row p-3 border-b">
                    <div className="bg-blue-300 rounded-full w-[52px] h-[52px]">
                      <div className="flex justify-center mt-3">
                        {e?.name.charAt(0)}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="ml-3 mt-1 text-bold">{e?.name}</div>
                      <div className="ml-3  text-sm">Edu-1122</div>
                    </div>
                  </div>
                  <div className="flex flex-col p-3">
                    <div className="mt-4">
                      <i
                        className="pi pi-phone mr-4"
                        style={{ fontSize: "1rem" }}
                      ></i>
                      {e?.phone}
                    </div>
                    <div className="mt-4">
                      <i
                        className="pi pi-send mr-4"
                        style={{ fontSize: "1rem" }}
                      ></i>
                      {e?.email}
                    </div>
                    <div className="mt-4">
                      <i
                        className="pi pi-spin pi-cog mr-4"
                        style={{ fontSize: "1rem" }}
                      ></i>
                      {e?.course}
                    </div>
                    <div className="bg-sky-100 text-sky-600 w-4 flex py-2 justify-center rounded-full mt-8 ">
                      {e?.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* course list code ends */}
    </div>
  );
};

export default Course;
