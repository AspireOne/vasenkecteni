import {PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";
import Navbar from "~/components/Navbar";
import PageHead from "~/components/PageHead";
import Footer from "~/components/Footer";

// TODO: Optimize images.
export default function Page(props: PropsWithChildren<{className?: string, metaTitle: string, metaDesc?: string}>) {
  const fallbackDescription = "Propojujeme mladší generaci se staršími prostřednictvím čtení knih.";
  return (
    <section className={twMerge(props.className)}>
      <PageHead title={props.metaTitle} description={props.metaDesc ?? fallbackDescription}/>
      <div className={"p-4 pt-0 relative min-h-[100vh]"}>
        <Navbar/>
        {props.children}
      </div>
      <Footer/>
    </section>
  )
}