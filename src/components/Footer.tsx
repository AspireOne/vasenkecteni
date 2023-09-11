import Link from "next/link";
import {getNavbarPages, pages} from "~/constants";
import {BsFacebook, BsInstagram, BsLinkedin} from "react-icons/bs";
import {PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";

export default function Footer() {
  return (
    <footer className={"mt-20"}>
      <Heading/>
      <div className={"px-4 md:px-32 lg:px-40 py-4 space-y-12 font-semibold leading-10"}>
        <div className={"flex flex-wrap justify-center md:justify-between gap-14"}>
          <LegalInfo/>

          <div className={"flex flex-row gap-12 md:mt-10"}>
            <HomePanel/>
            <ContactInfoPanel/>
          </div>
        </div>

        <BottomLinks/>
      </div>
    </footer>
  )
}

function Heading() {
  return (
    <div className={twMerge(
      "flex items-center justify-center bg-emerald-50 px-8 sm:px-20 md:px-28 lg:px-48 xl:px-52",
      "text-center h-72 text-xl sm:text-2xl font-semibold text-brand-800")
    }>
      Pomozte nám oživit náladu našich babiček a dědečků a mějme na paměti, že i my jednou budeme ve stejném věku.
    </div>
  )
}

function Panel(props: PropsWithChildren<{title: string}>) {
  return (
    <div className={"text-center"}>
      <p className={"text-xl font-bold text-brand-800 mb-8"}>
        {props.title}
      </p>
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
      <a href={"tel:+420 739 304 270"}>+420 604 477 760</a>
      <div className={"inline-flex gap-4 text-[20px] mt-[10px] mx-auto"}>
        <a href="https://www.instagram.com/vasenkecteni"><BsInstagram /></a>
        <a href="https://www.facebook.com/vasenkecteni"><BsFacebook /></a>
        {/*<a href=""><BsLinkedin /></a>*/}
      </div>
    </Panel>
  )
}

function HomePanel() {
  return (
    <Panel title={"Domů"}>
      {
        [pages.home, pages.about, pages.news].map((page) => (
          <Link href={page.path} key={page.path}>
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
      <Link href={"/files/Ochrana osobních údajů - Vášeň ke čtení.pdf"}>
        Ochrana osobních údajů
      </Link>

      <Link href={"/files/Vzor darovací smlouvy - Vášeň ke čtení.pdf"}>
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