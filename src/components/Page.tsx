import {AnimatePresence, motion} from 'framer-motion';
import React, {FormEvent, PropsWithChildren, useEffect} from "react";
import PageHead from "~/components/PageHead";
import Navbar from "~/components/Navbar";
import {twMerge} from "tailwind-merge";
import Footer from "~/components/Footer";
import {signIn, useSession} from "next-auth/react";
import {FaSpinner} from "react-icons/fa";
import {AiOutlineLock} from "react-icons/ai";
import Input from "~/components/Input";
import Button from "~/components/Button";
import {toast} from "react-toastify";
import {LoadingLock} from "~/components/loadingComponents";

// Your existing Page component
let hasPrev = false;

function Page(props: PropsWithChildren<{
  className?: string,
  metaTitle: string,
  metaDesc?: string,
  protected?: boolean,
  protectedText?: string
}>) {
  const {data: session, status} = useSession();

  useEffect(() => {
    hasPrev = true;
  }, [props.children])

  const center = props.protected && status !== "authenticated";
  const fallbackDescription = "Propojujeme mladší generaci se staršími prostřednictvím čtení knih.";

  return (
    <div>
      <PageHead title={props.metaTitle} description={props.metaDesc ?? fallbackDescription}/>
      <Navbar/>

      <AnimatePresence>
        <motion.section
          initial={{y: hasPrev ? -4 : 0, opacity: 1}}
          animate={{y: 0, opacity: 1}}
          // change animation movement to be fast at the start and slow at the end.
          transition={{type: "spring", stiffness: 100, damping: 20, duration: 0.1}}
          exit={{y: 4, opacity: 0}}
        >
          <div className={twMerge(
            "p-4 px-4 sm:px-8 md:px-14 lg:px-14 pt-0 relative min-h-[70vh] max-w-[1500px] mx-auto",
            center && "flex justify-center items-center",
            props.className,
          )}
          >
            {props.protected && status === "loading" && <LoadingComponent/>}
            {props.protected && status === "unauthenticated" && <SignInComponent text={props.protectedText}/>}
            {props.protected && status === "authenticated" && props.children}
            {!props.protected && props.children}
          </div>
        </motion.section>
      </AnimatePresence>

      <Footer/>
    </div>
  )
}

function LoadingComponent() {
  return (
    <div className={"flex justify-center items-center"}>
      <LoadingLock/>
    </div>
  )
}

// Show a lock icon, a text "You need to sign in to view this page", and a sign in form that will contain only
// email field and a submit button. When the user succesfully submits the form, the button text should change to
// "Check your email" and the button should be disabled.
// It must look stylish.
function SignInComponent(props: { text?: string }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // check email against a regex.
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      toast.error("Zadejte platný e-mail.");
      return;
    }

    setloading(true);
    await signIn('email', {email: email, redirect: false});
    setSubmitted(true);
    setloading(false);
  };

  return (
    <div
      className="flex flex-col justify-center text-gray-700 items-center sm:border sm:shadow-lg px-5 sm:px-8 py-14 rounded max-w-lg">
      <AiOutlineLock className="text-4xl mb-8"/>
      <h1 className="text-xl mb-8 font-semibold text-center">
        {props.text ?? "Pro zobrazení této stránky se musíte přihlásit."}
      </h1>
      <form className="flex flex-col gap-4 w-full sm:px-16" onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Váš e-mail"
          className=""
          disabled={submitted || loading}
        />
        <Button
          type="submit"
          className=""
          roundness="medium"
          disabled={submitted}
        >
          {loading && "Přihlašování..."}
          {submitted && 'Ověření odesláno'}
          {!submitted && !loading && 'Přihlásit'}
        </Button>
        {
          submitted &&
            <p className="font-semibold text-green-500 text-center">
                Pokud e-mail existuje, odeslali jsme na něj ověřovací e-mail.
            </p>
        }
      </form>
    </div>
  );
}

export default Page;
