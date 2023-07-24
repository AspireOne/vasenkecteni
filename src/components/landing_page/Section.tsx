import React, {PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";


function Meta(props: PropsWithChildren<{className?: string, title: string, desc?: string}>) {
  return (
    <div>
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
      props.imgPos === "right" ? "sm:flex-row-reverse" : "sm:flex-row")}>
      <img className={"w-full sm:w-1/3 object-contain"} alt={props.imgAlt} title={props.imgAlt} src={props.imgSrc}/>
      <div className={props.className}>
        <Section.Subtitle>
          {props.title}
        </Section.Subtitle>
        <div className={"min-w-[400px]"}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

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