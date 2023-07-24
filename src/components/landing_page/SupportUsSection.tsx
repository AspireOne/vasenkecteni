import Section from "~/components/landing_page/Section";
import {PropsWithChildren, useState} from "react";
import {twMerge} from "tailwind-merge";
import {Props} from "next/script";
import Button from "~/components/Button";

export default function SupportUsSection() {
  return (
    <Section.Meta title={"Podpořte nás"}>
      <SupportUs/>
    </Section.Meta>
  )
}

function SupportUs() {
  return (
    <div className={"flex flex-col sm:flex-row gap-28 justify-between"}>
      <div className={""}>
        <p>
          Stojíme tu s otevřeným srdcem a s vášní pro sdílení kouzla knih napříč generacemi. Naše nezisková organizace
          "Vášeň ke čtení" věří, že síla příběhů může změnit svět kolem nás. Chceme pokračovat ve své misi, propojovat
          mladou a starší generaci skrze čtení a přinášet radost do domovů seniorů a komunitních center po celé České
          republice. Abychom mohli tuto dobrou věc rozšiřovat dál a poskytnout nezapomenutelné zážitky stále většímu
          množství lidí, potřebujeme vaši podporu. Vaše finanční příspěvky budou investovány do nákupu knih, organizace
          čtenářských setkání, školení dobrovolníků a rozšíření našeho působení do dalších lokalit. S vaší podporou můžeme
          společně vytvořit vzrušující a inspirativní zážitky, které spojí různé generace a pomohou nám budovat pevnější a
          přátelštější komunitu. Každý příspěvek má význam a může změnit něčí život tím, že jim přineseme radost a lásku k
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

type Option = "monthly" | "one-time";
function SupportUsForm() {
  const [selectedFreq, setSelectedFreq] = useState<Option>("monthly");
  const [value, setValue] = useState<number>(100);

  return (
    <div className={"w-full sm:min-w-[400px] lg:min-w-[500px] bg-emerald-50 rounded-md p-8 space-y-12 text-center font-semibold"}>
      <p className={"text-brand-800 text-2xl"}>Pomozte seniorům finančním darem</p>
      <p className={"text-brand-800 mx-4"}>
        Vaše pravidelná měsíční pomoc pro nás znamená opravdu hodně.
      </p>

      <div className={"space-y-5 lg:mx-5"}>
        <div className="flex justify-center items-center gap-2">
          <FreqOptionButton onClick={() => setSelectedFreq("monthly")} selected={selectedFreq === "monthly"}>
            Měsíčně
          </FreqOptionButton>
          <FreqOptionButton onClick={() => setSelectedFreq("one-time")} selected={selectedFreq === "one-time"}>
            Jednorázově
          </FreqOptionButton>
        </div>

        <div className={"flex flex-row"}>
          <AmountOptionButton value={50}  selectedValue={value} onClick={setValue} pos={"first"}/>
          <AmountOptionButton value={100} selectedValue={value} onClick={setValue}/>
          <AmountOptionButton value={200} selectedValue={value} onClick={setValue}/>
          <AmountOptionButton value={500} selectedValue={value} onClick={setValue} pos={"last"}/>
        </div>

        <CustomValueInput value={value} onChange={setValue}/>
      </div>

      <Button roundness={"medium"} className={"w-[80%]"}>Darovat</Button>
    </div>
  );
}

function CustomValueInput(props: {value: number, onChange: (value: number) => void}) {
  return (
    <div>
      <p className={"text-left text-brand-800 mb-1"}>Hodnota daru</p>
      <div className={"flex flex-row justify-center items-center"}>
        <input type={"text"}
               className={"text-left px-4 w-full h-10 outline-0 rounded-md rounded-r-none border-gray-200 border-2 p-2 font-semibold"}
               value={props.value || ""}
               placeholder={"Hodnota daru"}
               onChange={(e) => {
                 if (e.target.value.match(/^[0-9]*$/)) {
                   props.onChange(parseInt(e.target.value));
                 }
                 if (!e.target.value) props.onChange(0);
               }}>
        </input>
        <div className={"flex items-center justify-center px-4 h-10 border-2 border-gray-200 border-l-0 rounded-md rounded-l-none bg-gray-50 text-gray-600"}>
          Kč
        </div>
      </div>
    </div>
  )
}

function AmountOptionButton(props: {value: number, selectedValue: number, onClick: (value: number) => void, pos?: "first" | "middle" | "last"}) {
  const selected = props.value === props.selectedValue;
  let additionalStyles;

  if (props.pos === "first") {
    additionalStyles = "rounded-l-md border-r-0";
  } else if (props.pos === "last") {
    additionalStyles = "rounded-r-md";
  } else {
    additionalStyles = "border-r-0";
  }

  return (
    <FormButton
      className={twMerge("text-sm text-gray-500 font-semibold", additionalStyles, selected && "bg-gray-200 hover:bg-gray-200 text-gray-600")}
      onClick={() => props.onClick(props.value)}
    >
      {props.value} Kč
    </FormButton>
  )
}

function FreqOptionButton(props: PropsWithChildren<{selected: boolean, onClick: () => void}>) {
  return (
    <FormButton
      className={"rounded-md " + (props.selected && "border-brand-700")}
      onClick={props.onClick}
    >
      {props.children}
    </FormButton>
  )
}

function FormButton(props: PropsWithChildren<{className?: string | false, onClick: () => void}>) {
  return (
    <button
      className={twMerge(
        "py-2 px-4 font-semibold border-2 border-gray-200 bg-white w-full hover:bg-gray-50",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}