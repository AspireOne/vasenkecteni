import React, {PropsWithChildren, useEffect, useState} from "react";
import {twMerge} from "tailwind-merge";


function Meta(props: PropsWithChildren<{className?: string, title: string, desc?: string, id?: string}>) {
  return (
    <div id={props.id}>
      <h2 className={"text-3xl sm:text-4xl text-brand-800 font-semibold text-center mb-20"}>
        {props.title}
      </h2>
      <p className={"text-xl text-brand-800 font-semibold text-center mb-16"}>
        {props.desc}
      </p>
      <div className={twMerge("space-y-32 font-semibold", props.className)}>
        {props.children}
      </div>
    </div>
  )
}

function Section(props: PropsWithChildren<{title: string, imgSrc: string, imgPos: "left" | "right",
  className?: string, imgAlt?: string}>) {
  return (
    <div className={twMerge(
      "flex flex-col gap-10 lg:gap-20 xl:gap-32 justify-between",
      props.imgPos === "right" ? "lg:flex-row" : "lg:flex-row-reverse")}>
      <div className={props.className}>
        <Section.Subtitle>
          {props.title}
        </Section.Subtitle>
        <div className={"md:min-w-[400px]"}>
          {props.children}
        </div>
      </div>
      <ImagePreloader className={"w-full lg:w-1/3 object-contain"} alt={props.imgAlt} src={props.imgSrc} />
    </div>
  )
}

const ImagePreloader = (props: {src: string, alt?: string, className?: string}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = props.src;
    image.onload = () => setLoaded(true);
    image.onerror = () => console.error(`Failed to load image: ${props.src}`);
    return () => {
      // Clean up if the component unmounts before the image is loaded
      image.onload = null;
      image.onerror = null;
    };
  }, [props.src]);

  return loaded ? <img className={props.className} alt={props.alt} title={props.alt} src={props.src} /> : null;
};

function SectionSubtitle(props: PropsWithChildren<{className?: string}>) {
  return (
    <h3 className={twMerge("text-2xl text-brand-800 font-semibold text-center mb-10", props.className)}>
      {props.children}
    </h3>
  )
}

Section.Subtitle = SectionSubtitle;
Section.Meta = Meta;
export default Section;