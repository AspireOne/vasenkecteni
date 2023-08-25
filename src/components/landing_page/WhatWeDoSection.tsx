import React from "react";
import Section from "~/components/landing_page/Section";

export default function WhatWeDoSection() {
  return (
    <Section.Meta title={"Co přesně děláme?"} id={"what-we-do"}>
      <Goals/>
      <WhereWeRead/>
    </Section.Meta>
  )
}

function Goals() {
  return (
    <Section title={"Cíle naší organizace"} imgSrc={"/landing_page/who_is_welcome.png"} imgPos={"left"}
             imgAlt={"Kdo je u nás vítán?"}>
      <p>
        Účelem naší organizace je propojování generací skrze čtení: propojit mladší generaci se staršími
        prostřednictvím čtení knih. Organizujeme čtení maturitních knih nebo oblíbených knih naší komunity v domově
        seniorů. <br/><br/>
        Studenti si vyberou knihu, kterou rádi čtou, a přijdou ji představit a přečíst seniorům. Tím
        vytváříme skvělou atmosféru a šíříme úsměvy na tvářích starších lidí. Věříme, že malý úsměv může udělat mnoho
        a přinést radost do jejich života.
      </p>
    </Section>
  )
}

function WhereWeRead() {
  return (
    <Section title={"Kde momentálně čteme?"} imgSrc={"/landing_page/reading_location.png"} imgPos={"right"}
             imgAlt={"Kdo je u nás vítán?"}>
      <p>
        Momentálně jsme spouštíme v Alzheimerově domově v Českých Budějovicích. Náš projekt spočívá v uskutečňování
        pravidelných čtenářských setkání, kdy do domova zavítáme s knihami, které potěší srdce každého – od klasických
        příběhů až po moderní literaturu. <br/><br/>

        Chceme se však neomezovat pouze na jedno místo. Naše ambice sahají dále, a
        proto pečlivě plánujeme rozšíření projektu do celého Česka. Chceme vybudovat síť dobrovolníků, kteří budou
        nadšeně sdílet lásku k četbě a přenášet radost ze čtení do různých zařízení pro seniory a další komunitní
        centra. <br/><br/>

        Naše setkání nejsou pouhým čtením knih – jsou to okamžiky, kdy se děti, mládež i starší lidé propojí,
        vymění si zážitky a nasají energii ze vzájemného porozumění. Zároveň pomáháme starším občanům udržovat své
        myšlení aktivní a plné zvědavosti, což pozitivně ovlivňuje celkovou kvalitu jejich života.
      </p>
    </Section>
  )
}