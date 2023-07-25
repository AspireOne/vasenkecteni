import { AnimatePresence, motion } from 'framer-motion';
import {PropsWithChildren} from "react";
import PageHead from "~/components/PageHead";
import Navbar from "~/components/Navbar";
import {twMerge} from "tailwind-merge";
import Footer from "~/components/Footer";

// Your existing Page component
function Page(props: PropsWithChildren<{className?: string, metaTitle: string, metaDesc?: string}>) {
  const fallbackDescription = "Propojujeme mladší generaci se staršími prostřednictvím čtení knih.";
  return (
    <div>
      <PageHead title={props.metaTitle} description={props.metaDesc ?? fallbackDescription}/>
      <Navbar/>

      <AnimatePresence>
        <motion.section
          initial={{ y: -4, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          // change animation movement to be fast at the start and slow at the end.
          transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.1 }}
          exit={{ y: 4, opacity: 0 }}
        >
          <div className={twMerge("p-4 px-4 sm:px-8 md:px-14 lg:px-14 pt-0 relative min-h-[100vh] max-w-[1500px] mx-auto", props.className)}>
            {props.children}
          </div>
        </motion.section>
      </AnimatePresence>

      <Footer/>
    </div>
  )
}

export default Page;
