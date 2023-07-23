import Link from "next/link";
import {getNavbarPages, pages} from "~/constants";
import {BsFacebook, BsInstagram, BsLinkedin} from "react-icons/bs";
import {PropsWithChildren} from "react";

export default function Footer() {
  return (
    <footer className={"border px-4 md:px-32 lg:px-40 py-4 space-y-12 font-semibold leading-10"}>
      <div className={"flex flex-wrap justify-center md:justify-between gap-14"}>
        <LegalInfo/>

        <div className={"flex flex-row gap-12 md:mt-10"}>
          <HomePanel/>
          <ContactInfoPanel/>
        </div>
      </div>

      <BottomLinks/>
    </footer>
  )
}
function Panel(props: PropsWithChildren<{title: string}>) {
  return (
    <div className={"text-center"}>
      <h3 className={"text-xl font-bold text-brand-800 mb-8"}>
        {props.title}
      </h3>
      <div className={"flex flex-col"}>
        {props.children}
      </div>
    </div>
  )
}

function ContactInfoPanel() {
  return (
    <Panel title={"Kontakt"}>
      <a href={"mailto:info@vasenkecteni.cz"}>info@vasenkecteni.cz</a>
      <a href={"tel:+420 604 477 760"}>+420 604 477 760</a>
      <div className={"inline-flex gap-4 text-[20px] mt-[10px] mx-auto"}>
        <a href="https://www.instagram.com/vasenkecteni/"><BsInstagram /></a>
        <a href="https://www.linkedin.com/company/v%C3%A1%C5%A1e%C5%88-ke-%C4%8Dten%C3%AD/"><BsFacebook /></a>
        <a href="https://www.facebook.com/vasenkecteni"><BsLinkedin /></a>
      </div>
    </Panel>
  )
}

function HomePanel() {
  return (
    <Panel title={"Domů"}>
      {
        [pages.whatWeDo, pages.about, pages.partners].map((page) => (
          <Link href={page.path}>
            {page.title}
          </Link>
        ))
      }
    </Panel>
  )
}

function BottomLinks() {
  return (
    <div className={"flex flex-row gap-4 mx-auto justify-center text-brand-800"}>
      <Link href={pages.privacyPolicy.path}>
        Ochrana osobních údajů
      </Link>

      <Link href={pages.donationTemplate.path}>
        Vzor darovací smlouvy
      </Link>
    </div>
  )
}

function LegalInfo() {
  return (
    <div className={"space-y-4"}>
      <img alt="Logo" className="h-28" src="/logo-circular.png"/>
      <p className={"whitespace-pre-line"}>
        Vášeň ke čtení, z.s.{"\n"}
        Skrétova 475/8, Jižní Předměstí, 301 00 Plzeň{"\n"}
        IČO: 78623091
      </p>
    </div>
  )
}