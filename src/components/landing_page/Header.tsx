import Button from "~/components/Button";
import React, {PropsWithChildren} from "react";

export default function Header() {
  return (
    <div className={"lg:mx-10 xl:mx-28 mb-40"}>
      <div className={"flex flex-col lg:flex-row items-center justify-between gap-20 mb-28"}>

        <div className={"space-y-10 flex-1"}>
          <h1 className={"title-xl"}>
            Propojujeme mladší generaci se staršími <span className={"font-bold"}>prostřednictvím čtení knih</span>
          </h1>
          <div className={"flex flex-row gap-4 flex-wrap"}>
            <Button className={"px-10 whitespace-pre"}>Více informací</Button>
            <Button className={"whitespace-pre"} style={"outline"}>Přidejte se k nám</Button>
          </div>
        </div>

        <img className={"flex-1 w-full lg:w-1/2 h-auto object-contain"} src={"/landing_page/reading_is_generational.png"} alt={"Ilustrační obrázek"}/>
      </div>

      <Benefits/>
    </div>
  )
}

function Benefits() {
  return (
    <div className={"flex flex-row gap-14 justify-center xl:justify-between flex-wrap"}>
      <Benefit src={"/icons/leaf.png"} alt={"List"}>
        Podpora a šíření čtenářské kultury
      </Benefit>
      <Benefit src={"/icons/love.png"} alt={"Srdce"}>
        Příspěvek k vzdělávání a kultuře
      </Benefit>
      <Benefit src={"/icons/book.png"} alt={"Kniha"}>
        Podpora literárního zájmu
      </Benefit>
    </div>
  )
}

function Benefit(props: PropsWithChildren<{src: string, alt?: string}>) {
  return (
    <div className={"flex flex-col gap-4 items-center"}>
      <img className={"h-20 w-auto"} src={props.src} alt={props.alt}/>
      <p className={"text-brand-800 text-xl font-semibold text-center"}>
        {props.children}
      </p>
    </div>
  )
}