import { useEffect, useRef, useState } from "react";

import { Card } from "primereact/card";
// import { TabPanel, TabView } from "primereact/tabview";
// import { Mousewheel, Navigation, Pagination } from "swiper";
// import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  ABOUT_CONTACT,
  ABOUT_EDUCATION,
  ABOUT_ME,
  ABOUT_OTHER_PROJECTS,
  ABOUT_WORK,
  // aboutInfo,
} from "../../Data/Data";
import "./ProfileComponent.scss";
import MyImg from "./../../assets/logoo.jpg";

const Work = () => {
  return ABOUT_WORK?.map((val, key) => (
    <Card
      key={key}
      title={
        <span className="font-subheading text-color4 font-medium">
          {val.year}
        </span>
      }
      className="bg-color2 text-color5"
    >
      <div className="w-full ps-3 sm:ps-4 md:ps-6 mdl:ps-7 ld:ps-10 2xl:ps-14">
        {val.position && <p>{val.position}</p>}
        {val.projects && (
          <>
            <p className="mt-2 font-subheading">Projects: </p>
            <ul>
              {val?.projects?.map((v, k) => (
                <li key={k}>{v}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Card>
  ));
};

const Education = () => {
  return ABOUT_EDUCATION?.map((val, key) => (
    <Card
      key={key}
      title={
        <span className="font-subheading text-color4 font-medium">
          {val.year}
        </span>
      }
      className="bg-color2 text-color5"
    >
      <div className="w-full ps-3 sm:ps-4 md:ps-6 mdl:ps-7 ld:ps-10 2xl:ps-14">
        {val.institution && <p>{val.institution}</p>}
        {val.description && <p>{val.description}</p>}
      </div>
    </Card>
  ));
};

const OtherProjects = () => {
  return ABOUT_OTHER_PROJECTS?.map((val, key) => (
    <Card
      key={key}
      title={
        <span className="font-subheading text-color4 font-medium">
          {val.year}
        </span>
      }
      className="bg-color2 text-color5"
    >
      <div className="w-full ps-3 sm:ps-4 md:ps-6 mdl:ps-7 ld:ps-10 2xl:ps-14 flex gap-x-3 flex-wrap">
        {val?.projects?.length > 0 &&
          val?.projects?.map((v, k) => (
            <a
              href={v.posterLink}
              target="_blank"
              key={k}
              title={v.title}
              className="w-20 aspect-square p-2 sm:p-3 mdl:p-4 bg-color3 cursor-pointer rounded-full"
            >
              <img
                loading="lazy"
                src={v.posterLink + "/logo.svg"}
                alt={v.title}
                className="w-full h-full object-contain"
              />
            </a>
          ))}
      </div>
    </Card>
  ));
};

export const Contact = () => {
  return (
    <Card className="bg-color2 text-color5">
      <div className="w-full flex justify-center items-center gap-x-3 flex-wrap">
        {ABOUT_CONTACT?.map((value, key) => (
          <a
            key={key}
            title={value.title}
            href={value.type === "email" ? `mailto:${value.link}` : value.link}
            target="_blank"
            className={`w-20 aspect-square flex justify-center items-center p-2 sm:p-3 mdl:p-4 bg-color3 cursor-pointer rounded-full text-2xl text-color4`}
          >
            <span
              className={`pi pi-${
                value.type === "email" ? "envelope" : value.type
              } text-3xl`}
            ></span>
          </a>
        ))}
      </div>
    </Card>
  );
};

const ProfileComponent = ({ selectedTab, setSelectedTab }) => {
  // const [selectedTab, setSelectedTab] = useState<number>(selectedContentTab); // State for selected tab
  const swiperRef = useRef<any>(null); // Create a ref for Swiper

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
    if (swiperRef.current && swiperRef.current.swiper.activeIndex !== index) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(selectedTab); // Slide to the selected index
    }
  }, [selectedTab]);

  return (
    // <div className="profile-component w-full h-full flex flex-col items-center gap-y-3 overflow-auto">
    <div
      className={`profile-component w-full h-full flex flex-col items-center gap-y-3 overflow-auto transition-transform duration-500 ${
        showContent
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0"
      }`}
    >
      <div className="w-full ">
        <div className="w-full h-full mdl:h-[400px] py-10 mdl:py-4 flex flex-col mdl:flex-row justify-center items-center gap-2 mdl:gap-4 lg:gap-7 ">
          <div className="w-[80%] max-w-[200px] h-auto aspect-square rounded-md">
            <img
              className="w-full aspect-square object-cover rounded-md"
              src={MyImg}
              alt="yash agarwal"
            />
          </div>
          <div className="flex flex-col items-center mdl:items-start gap-2">
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Yash Agarwal
            </h1>
            <p className="text-lg sm:text-xl mdl:text:2xl font-subheading text-color4">
              Associate UI developer
            </p>
            <a
              className="text-base sm:text-lg mdl:text-xl font-subheading not-italic text-color4"
              href="https://www.techolution.com/"
              target="_blank"
              rel="noopener"
            >
              <span className="pi pi-at"></span> Techolution, India
            </a>
          </div>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col gap-y-4">
        {/* <TabView
          className="bg-transparent"
          activeIndex={selectedTab > -1 ? selectedTab : 0}
        >
          {ABOUT_ME?.filter(
            (values) => !values?.header?.toLowerCase()?.includes("contact")
          )?.map((values, keys) => (
            <TabPanel
              header={values?.header}
              className="w-full flex flex-col gap-2 bg-transparent"
              contentClassName="p-4 bg-color2"
              headerClassName="p-0 h-10 md:h-12 lg:h-14 bg-transparent text-color1 text-base sm:text-lg mdl:text-xl font-content font-normal"
              key={keys}
              leftIcon={
                values.header.toLowerCase()?.includes("work") ? (
                  <span className="material-symbols-rounded">work_history</span>
                ) : values.header.toLowerCase()?.includes("projects") ? (
                  <span className="material-symbols-rounded">code</span>
                ) : values.header.toLowerCase()?.includes("education") ? (
                  <span className="material-symbols-rounded">school</span>
                ) : (
                  ""
                )
              }
            >
              {values.header?.toLowerCase()?.includes("work") ? <Work /> : null}
              {values.header?.toLowerCase()?.includes("projects") ? (
                <OtherProjects />
              ) : null}
              {values.header?.toLowerCase()?.includes("education") ? (
                <Education />
              ) : null}
            </TabPanel>
          ))}
          <TabPanel
            header={aboutInfo[aboutInfo.length - 1]?.header}
            className="w-full flex flex-col gap-2 bg-transparent"
            contentClassName="p-4 bg-color2"
            headerClassName="p-0 h-10 md:h-12 lg:h-14 flex gap-x-5 bg-transparent text-color1 text-lg sm:text-xl mdl: text-2xl font-content font-normal"
            leftIcon={
              <span className="material-symbols-rounded">alternate_email</span>
            }
          >
            <Contact />
          </TabPanel>
        </TabView> */}

        <div className="flex gap-4 overflow-x-auto scrollbar-none  px-2 sm:px-3 mdl:px-4">
          {ABOUT_ME?.map((values, index) => (
            <button
              type="button"
              title={values.header}
              key={index}
              onClick={() => handleTabClick(index)}
              className={`py-2 px-5 rounded sm:rounded-lg flex items-center gap-x-2 flex-shrink-0 flex-grow-0 text-base sm:text-lg mdl:text-xl font-heading ${
                selectedTab === index
                  ? "bg-color4 text-color1 font-semibold"
                  : "bg-transparent text-color5 font-normal"
              }`}
            >
              {values.header.toLowerCase()?.includes("work") && (
                <span className="material-symbols-rounded">work_history</span>
              )}
              {values.header.toLowerCase()?.includes("projects") && (
                <span className="material-symbols-rounded">code</span>
              )}
              {values.header.toLowerCase()?.includes("education") && (
                <span className="material-symbols-rounded">school</span>
              )}
              {values.header.toLowerCase()?.includes("contact") && (
                <span className="material-symbols-rounded">
                  alternate_email
                </span>
              )}
              {values.header}
            </button>
          ))}
        </div>

        <Swiper
          ref={swiperRef}
          centeredSlides
          className="bg-transparent w-full"
          initialSlide={selectedTab} // Start from the selected tab
          onSlideChange={(swiper) => setSelectedTab(swiper.activeIndex)}
        >
          {ABOUT_ME?.filter(
            (values) => !values?.header?.toLowerCase()?.includes("contact")
          ).map((values, keys) => (
            <SwiperSlide key={keys} className=" p-2 sm:p-3 mdl:p-4">
              <div className="w-full flex flex-col gap-2 bg-transparent">
                {values.header?.toLowerCase()?.includes("work") ? (
                  <Work />
                ) : null}
                {values.header?.toLowerCase()?.includes("projects") ? (
                  <OtherProjects />
                ) : null}
                {values.header?.toLowerCase()?.includes("education") ? (
                  <Education />
                ) : null}
              </div>
            </SwiperSlide>
          ))}
          <SwiperSlide className=" p-2 sm:p-3 mdl:p-4">
            <div className="w-full flex flex-col gap-2 bg-transparent">
              <Contact />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default ProfileComponent;
