import { useState } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Sidebar } from "primereact/sidebar";
import { useForm } from "react-hook-form";

import { BASE_API_LINK } from "../../Data/Data";
import { useAppContext } from "../../Services/AppContext";

const FeedbackFormDialog = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { name: "", email: "", message: "" },
    mode: "onChange",
  });

  const { state, showToast, setShowFeedbackDialog } = useAppContext();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_API_LINK}/api-services/my-portfolio/contact-form-data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setLoading(false);
        reset();
        setShowFeedbackDialog(!state.showFeedbackDialog);
        showToast("success", "Success", "Form submitted");
      } else {
        setLoading(false);
        console.error(
          "Error:",
          response.statusText || "An unknown error occurred"
        );
        showToast("error", "Error", "Failed to submit form");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      showToast("error", "Error", "An error occurred");
    }
  };

  return (
    <Sidebar
      visible={state.showFeedbackDialog}
      onHide={() => setShowFeedbackDialog(!state.showFeedbackDialog)}
      dismissable={true}
      draggable={false}
      header={
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-medium">
          Please fill out this form
        </h2>
      }
      className={`aboutDialog w-full md:w-[70%] mdl:w-[60%] lg:w-[50%] 2xl:w-[40%] h-full`}
      position="right"
      closeIcon={<span className="material-symbols-rounded">close</span>}
      maskClassName="backdrop-blur"
    >
      <form
        className="feedback-form w-full rounded-3xl py-4 px-4 text-color5 bg-color3 overflow-y-auto shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-section w-full py-4 px-2 flex flex-col gap-y-2 sm:gap-y-3 rounded-xl">
          <label className="text-lg md:text-xl lg:text-2xl font-subheading">
            <span className="pi pi-id-card mr-4"></span>Your Name:
          </label>

          <InputText
            disabled={loading}
            title="Name"
            className="p-4 bg-color2 text-color4 text-base md:text-lg rounded-3xl font-content"
            type="text"
            // name="Name"
            maxLength={70}
            {...register("name")}
          />
        </div>

        <div className="mx-2 my-1 p-0 max-w-full h-[1.5px] bg-color4" />

        <div className="form-section w-full py-4 px-2 flex flex-col gap-y-2 sm:gap-y-3 rounded-xl">
          <div className="flex justify-between items-center">
            <label className="text-lg md:text-xl lg:text-2xl font-subheading">
              <span className="pi pi-envelope mr-4"></span>Your Email Address:
            </label>
            {errors.email && (
              <p className="text-red-600 text-xs sm:text-base font-content">
                {errors.email.message}
              </p>
            )}
          </div>

          <InputText
            disabled={loading}
            title="Email address"
            className={`p-4 bg-color2 text-color4 text-base md:text-lg ${
              errors.email
                ? "border-2 border-red-600"
                : "border-2 border-transparent"
            } rounded-3xl font-content`}
            type="email"
            // name="Email"
            required
            maxLength={70}
            {...register("email", {
              required: "E-mail is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
        </div>

        <div className="mx-2 my-1 p-0 max-w-full h-[1.5px] bg-color4" />

        <div className="form-section w-full py-4 px-2 flex flex-col gap-y-2 sm:gap-y-3 rounded-xl">
          <div className="flex justify-between items-center">
            <label className="text-lg md:text-xl lg:text-2xl font-subheading">
              <span className="pi pi-pencil mr-4"></span>Your Message: *
            </label>
            {errors.message && (
              <p className="text-red-600 text-xs sm:text-base font-content">
                {errors.message.message}
              </p>
            )}
          </div>

          <InputTextarea
            disabled={loading}
            title="You message"
            className={`h-[150px] p-4 bg-color2 text-color4 text-base md:text-lg font-content ${
              errors.message
                ? "border-2 border-red-600"
                : "border-2 border-transparent"
            } rounded-3xl resize-none`}
            // name="Msg"
            required
            maxLength={2000}
            {...register("message", { required: "Message is required" })}
          />
        </div>

        <div className="mx-2 my-1 p-0 max-w-full h-[1.5px] bg-color4" />

        <div className="w-full py-0 flex flex-row-reverse items-center flex-1 gap-y-2 sm:gap-y-3 rounded-xl">
          <Button
            disabled={loading || !isValid}
            title="click to send"
            // className="h-full px-8 md:px-10 bg-color1 text-color4"
            className=" flex-1 justify-center items-center py-4 px-2 bg-transparent font-subHeading text-color5 rounded-xl"
            // label="Submit"
            type="submit"
          >
            <span className="material-symbols-rounded mr-2 font-medium">
              send
            </span>
            <span>Submit</span>
          </Button>
          <Button
            disabled={loading}
            title="click to delete everything"
            // className="h-full px-8 md:px-10 bg-transparent text-color1"
            className=" flex-1 justify-center items-center py-4 px-2 bg-transparent font-subHeading text-color5 rounded-xl"
            type="button"
            onClick={() => reset()}
          >
            <span className="material-symbols-rounded mr-2 font-medium">
              delete
            </span>
            <span>Discard</span>
          </Button>
        </div>
      </form>
    </Sidebar>
  );
};

export default FeedbackFormDialog;
