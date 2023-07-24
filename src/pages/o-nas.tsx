import React from "react";
import Page from "~/components/Page";
import Section from "~/components/landing_page/Section";

export default function AboutUs() {
  return (
    <Page metaTitle={"O nás"}>
      <Section.Meta title={"O nás"}>
        <Section
          className={"gap-2"}
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
      </Section.Meta>
    </Page>
  )
}