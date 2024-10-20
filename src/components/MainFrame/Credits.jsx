import React from "react";

// eslint-disable-next-line
const Credits = ({ title, titleSpan, t1, t2, icon, t2Icon, n, c }) => {
  return (
    <>
      <div className="my-6 mx-auto w-full bg-primary rounded-xl p-5 md:py-6 relative">
        <div className="absolute top-[15px] right-[25px] flex items-center gap-2 px-4 py-2.5 bg-secondry rounded-xl ">
          <div className="text-[18px] pt-1">
            {icon && React.createElement(icon)}
          </div>
          <h1>{n}</h1>
          <h1>{c}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="lg:pr-10">
            <h1
              className="text-4xl font-bold max-md:text-2xl max-md:mt-24"
              style={{ lineHeight: "1.4" }}
            >
              {titleSpan} <br className="md:hidden" /> {title}
            </h1>
            <div className="mt-4 p-1.5 bg-secondry rounded-xl w-full grid grid-cols-2">
              <div className="py-3 max-md:py-2 bg-button rounded-xl flex items-center justify-center">
                {t1}
              </div>
              <div className="py-3 flex items-center justify-center">
                <div className="text-[18px] pr-3">
                  {React.createElement(t2Icon)}
                </div>
                {t2}
              </div>
            </div>
          </div>
          <div className="hidden md:block"></div>
        </div>
      </div>
    </>
  );
};

export default Credits;
