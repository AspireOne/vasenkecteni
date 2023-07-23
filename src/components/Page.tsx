import {PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";
import Navbar from "~/components/Navbar";
import PageHead from "~/components/PageHead";

export default function Page(props: PropsWithChildren<{className?: string, metaTitle: string, metaDesc?: string}>) {
  const fallbackDescription = "Propojujeme mladší generaci se staršími prostřednictvím čtení knih.";
  return (
    <section className={twMerge("p-4", props.className)}>
      <PageHead title={props.metaTitle} description={props.metaDesc ?? fallbackDescription}/>
      <Navbar/>
      {props.children}
    </section>
  )
}