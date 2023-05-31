import { useState, useCallback } from "react";
import { m } from "framer-motion";
import { useParams } from "react-router-dom";

import { useGetShowQuery } from "../../services/OMDB";

import { Poster, Loader, Error } from "../../common";
import { Casts } from "./components";

import { mainHeading, maxWidth, paragraph } from "../../styles";
import { staggerContainer, fadeDown } from "../../utils/motion";

const Detail = () => {
  const { id } = useParams();
  const [show, setShow] = useState<Boolean>(false);

  const {
    data: movie,
    isLoading,
    isFetching,
    isError,
  } = useGetShowQuery({
    id: String(id),
  });

  const toggleShow = useCallback(() => setShow((prev) => !prev), []);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <Error error="Something went wrong!" />;
  }

  const {
    Poster : poster,
    Title,
    Plot,
    Released
  } = movie;

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.98),rgba(0,0,0,0.8) ,rgba(0,0,0,0.4)),url('${poster}'`,
    backgroundPosition: "top",
    backgroundSize: "cover",
  };

  return (
    <>
      <section className="w-full" style={backgroundStyle}>
        <div
          className={`${maxWidth} lg:py-36 sm:py-[136px] sm:pb-28 xs:py-28 xs:pb-12 pt-24 pb-8 flex flex-row lg:gap-12 md:gap-10 gap-8 justify-center `}
        >
          <Poster title={Title} posterPath={poster} />
          <m.div
            variants={staggerContainer(0.2, 0.4)}
            initial="hidden"
            animate="show"
            className="text-gray-300 sm:max-w-[80vw] max-w-[90vw]  md:max-w-[520px] font-nunito flex flex-col lg:gap-5 sm:gap-4 xs:gap-[14px] gap-3 mb-8 flex-1"
          >
            <m.h2
              variants={fadeDown}
              className={`${mainHeading} md:max-w-[420px]`}
            >
              {Title}
            </m.h2>

            <m.h3
              variants={fadeDown}
              className="text-secColor font-bold md:text-[18px] sm:text-[16.75px] xs:text-[15.75px] text-[14.75px]"
            >
              {Released}
            </m.h3>

            <m.p variants={fadeDown} className={paragraph}>
              <span>
                {Plot.length > 280
                  ? `${show ? Plot : `${Plot.slice(0, 280)}...`}`
                  : Plot}
              </span>
              <button
                type="button"
                className={`${
                  Plot.length > 280 ? "inline-block" : "hidden"
                } font-bold ml-1 hover:underline transition-all duration-300`}
                onClick={toggleShow}
              >
                {!show ? "show more" : "show less"}
              </button>
            </m.p>
          </m.div>
        </div>
      </section>
    </>
  );
};

export default Detail;
