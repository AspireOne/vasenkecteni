import Page from "~/components/Page";
import React from "react";
import Button, {ButtonLink} from "~/components/Button";
import {FaInstagram} from "react-icons/fa";
import Section from "~/components/landing_page/Section";

export default function WhatWeDo() {
  return (
    <Page metaTitle={"Aktuality"}>
      <Section.Meta title={"Kemp Můžeš Podnikat 2022"} id={"we-educate"} className={"lg:mx-28 mb-20"}>
        <div className={"-mt-8"}>
          Na letním kempu Můžeš podnikat 2022 jsem rozvíjela neziskový projekt Vášeň ke čtení, který
          propojuje mladší a starší generaci. Respektive studenty, kteří čtou knihy seniorům v domově
          důchodců. Tam jsem vyhrála 2. místo a nadchla jsem se pro projekt ve velkém. Proč mě to
          napadlo? Můj praděda založil nakladatelství a já studovala žurnalistiku v Českých
          Budějovicích, kde jsem byla šéfredaktorkou školního časopsu Koule. Blížila se mi maturita a
          mám blízký vztah k seniorům, tak proč to nezkombinovat? To byla otázka, kterou jsem si
          položila.
        </div>
        <div className={"flex flex-col md:flex-row md:h-[600px] gap-4 mx-auto justify-center"}>
          <img src={"/aktuality/photo_a.jpeg"} alt={"Foto z akce"} className={"w-full object-contain"}/>
          <img src={"/aktuality/photo_b.jpeg"} alt={"Foto z akce"} className={"w-full object-contain"}/>
        </div>
      </Section.Meta>

      <Section.Meta title={"Vzděláváme na sociální síti"} id={"we-educate"}>
        <div className={"-mt-8"}>
          <div className={"my-10 rounded-full bg-emerald-50 max-w-min py-3 px-5 whitespace-nowrap font-semibold text-brand-800 mx-auto"}>
            Pomocí instagramu
          </div>

          <div className={"flex flex-col sm:flex-row gap-4 justify-center"}>
            <img src={"/news/image 7.png"} alt={"Ilustrační obrázek"}/>
            <img src={"/news/image 8.png"} alt={"Ilustrační obrázek"}/>
            <img src={"/news/image 9.png"} alt={"Ilustrační obrázek"}/>
          </div>
          <div className={"flex flex-row justify-center mt-14"}>
            <ButtonLink roundness={"full"} className={"font-medium"} href={"https://www.instagram.com/vasenkecteni"}>
              Přejít na instagram <FaInstagram className={"inline ml-2 mt-[3px] text-lg"}/>
            </ButtonLink>
          </div>
        </div>
      </Section.Meta>
    </Page>
  )
}