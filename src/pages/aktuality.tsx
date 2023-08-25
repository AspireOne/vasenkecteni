import Page from "~/components/Page";
import React from "react";
import Button, {ButtonLink} from "~/components/Button";
import {FaInstagram} from "react-icons/fa";

export default function WhatWeDo() {
  return (
    <Page metaTitle={"Aktuality"}>
      <h1 className={"title-xl text-center"}>
        Vzděláváme na sociální síti
      </h1>

      <div className={"my-10 rounded-full bg-emerald-50 max-w-min py-3 px-5 whitespace-nowrap font-semibold text-brand-800 mx-auto"}>
        Pomocí instagramu
      </div>

      <div className={"flex flex-row gap-4 justify-center"}>
        <img src={"/news/image 7.png"} alt={"Ilustrační obrázek"}/>
        <img src={"/news/image 8.png"} alt={"Ilustrační obrázek"}/>
        <img src={"/news/image 9.png"} alt={"Ilustrační obrázek"}/>
      </div>
      <div className={"flex flex-row justify-center mt-14"}>
        <ButtonLink roundness={"full"} className={"font-medium"} href={"https://www.instagram.com/vasenkecteni"}>
          Přejít na instagram <FaInstagram className={"inline ml-2 mt-[3px] text-lg"}/>
        </ButtonLink>
      </div>
    </Page>
  )
}