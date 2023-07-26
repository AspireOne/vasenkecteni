import Section from "~/components/landing_page/Section";
import React from "react";
import {pages} from "~/constants";
import SupportUsForm from "~/components/SupportUsForm";

export default function SupportUsSection() {
  return (
    <Section.Meta title={"Podpořte nás"} id={pages.home.donateId}>
      <SupportUs/>
    </Section.Meta>
  )
}

function SupportUs() {
  return (
    <div className={"flex flex-col lg:flex-row gap-28 justify-between"}>
      <div className={""}>
        <p>
          Stojíme tu s otevřeným srdcem a s vášní pro sdílení kouzla knih napříč generacemi. Naše nezisková organizace
          "Vášeň ke čtení" věří, že síla příběhů může změnit svět kolem nás. Chceme pokračovat ve své misi, propojovat
          mladou a starší generaci skrze čtení a přinášet radost do domovů seniorů a komunitních center po celé České
          republice. Abychom mohli tuto dobrou věc rozšiřovat dál a poskytnout nezapomenutelné zážitky stále většímu
          množství lidí, potřebujeme vaši podporu. Vaše finanční příspěvky budou investovány do nákupu knih, organizace
          čtenářských setkání, školení dobrovolníků a rozšíření našeho působení do dalších lokalit. S vaší podporou
          můžeme
          společně vytvořit vzrušující a inspirativní zážitky, které spojí různé generace a pomohou nám budovat pevnější
          a
          přátelštější komunitu. Každý příspěvek má význam a může změnit něčí život tím, že jim přineseme radost a lásku
          k
          čtení. <br/><br/>

          Pomozte nám šířit kouzlo knih dál a otevřete dveře novým dobrodružstvím pro ty, kteří by jinak nemuseli
          mít možnost tuto radost poznat. Vaše podpora je klíčová pro naše úsilí a my si vážíme každého, kdo se rozhodne
          podpořit tuto dobrou věc. Děkujeme vám za vaši štědrost a důvěru v naši misi. <br/><br/>

          S úctou a pokorou, Tým Vášeň ke čtení
        </p>
      </div>
      <SupportUsForm/>
    </div>
  )
}