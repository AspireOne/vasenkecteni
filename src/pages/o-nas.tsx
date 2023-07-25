import React, {PropsWithChildren, useEffect, useState} from "react";
import Page from "~/components/Page";
import Section from "~/components/landing_page/Section";
import ContactUsForm from "~/components/ContactUsForm";
import {pages} from "~/constants";

export default function AboutUs() {
  return (
    <Page metaTitle={"O nás"}>

      <Section.Meta title={"O nás"}>
        <AboutFounderSection/>
        <PeopleSection/>
        <WannaJoin/>
      </Section.Meta>
    </Page>
  )
}

function WannaJoin() {
  return (
    <div className={"text-center space-y-12"} id={pages.about.joinId}>
      <h2 className={"title-lg"}>Chcete se k nám přidat?</h2>
      <p className={"text-lg max-w-[700px] mx-auto"}>
        Stále hledáme lidi do týmu, takže pokud se chcete přidat, neváhejte se nám ozvat skrze přiložený formulář.
      </p>
      <ContactUsForm formId={"wanna-join"} className={"mx-auto"}/>
    </div>
  )
}

function AboutFounderSection() {
  return (
    <Section
      className={"gap-2 min-w-[400px]"}
      imgSrc={"/onas/founder_photo.png"}
      imgPos={"left"}
      title={"Zakladatelka organizace"}
      imgAlt={"Fotka zakladatelky organizace"}>
      Karolína, zakladatelka naší neziskové organizace "Vášeň ke čtení" je vášnivou milovnicí knih a věří, že tyto
      magické příběhy mají sílu propojit lidi napříč generacemi. Její láska k literatuře ji provází od dětství, a
      když zjistila, jak mocné a transformační mohou být čtenářské zážitky, rozhodla se, že chce tuto vášeň přenést
      na další generace a poskytnout radost a vzájemné porozumění těm, kteří jsou již v pozdním věku. <br/><br/>

      Karolína je
      nadšenou zastánkyní toho, že knihy mohou pomoci seniorům udržovat svou mysli aktivní a rozvíjet emocionální
      propojení s mladšími. Její odhodlání a vizionářský přístup ji vedl k založení naší organizace, která nyní
      působí jako most mezi generacemi a nabízí nezapomenutelné a obohacující čtenářské setkání. Karolína věří, že
      společně s dobrovolníky a podporou komunity mohou knihy skutečně změnit životy a vytvářet nezapomenutelné
      vzpomínky pro každého, kdo se k nám připojí na této dobrodružné cestě.
    </Section>
  )
}

function PeopleSection() {
  return (
    <div className={"flex flex-col sm:flex-row gap-20 justify-center items-center"}>
      <PersonPanel name={"Matěj Plšek"} position={"Designer"} imgSrc={"/onas/designer_photo.png"}>
        Matěj má na starosti design naší neziskovky, mimo jiné ho baví čtení, cestování a startupy
      </PersonPanel>
      <PersonPanel name={"Veronika Černá"} position={"Sociální sítě"} imgSrc={"/onas/socials_manager_photo.png"}>
        Verča má na starosti sociální sítě a propagaci naší neziskovky
      </PersonPanel>
    </div>
  )
}

function PersonPanel(props: PropsWithChildren<{name: string, position: string, imgSrc: string, imgAlt?: string}>) {
  return (
    <div className={"space-y-5 max-w-[300px] text-center"}>
      <img src={props.imgSrc} alt={props.imgSrc} title={props.imgSrc} className={"h-56 w-auto mx-auto"}/>
      <p className={"title-md"}>{props.name}</p>
      <p className={"text-lg"}>{props.position}</p>
      <p>{props.children}</p>
    </div>
  )
}