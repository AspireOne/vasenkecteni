import {PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";
import Navbar from "~/components/Navbar";
import PageHead from "~/components/PageHead";
import Footer from "~/components/Footer";

// TODO: Optimize images.
function Page(props: PropsWithChildren<{className?: string, metaTitle: string, metaDesc?: string}>) {
  const fallbackDescription = "Propojujeme mladší generaci se staršími prostřednictvím čtení knih.";
  return (
    <section>
      <PageHead title={props.metaTitle} description={props.metaDesc ?? fallbackDescription}/>
      <Navbar/>
      <div className={twMerge("p-4 px-4 sm:px-8 md:px-14 lg:px-14 pt-0 relative min-h-[100vh] max-w-[1500px] mx-auto", props.className)}>
        {props.children}
      </div>
      <Footer/>
    </section>
  )
}

export default Page;