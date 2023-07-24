import Page from "~/components/Page";
import React, {FormEvent, useEffect} from "react";
import {FiMail, FiPhone} from "react-icons/fi";
import {FaInstagram, FaLinkedin} from "react-icons/fa";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "~/components/Input";
import Button from "~/components/Button";
import {toast} from "react-toastify";
import {twMerge} from "tailwind-merge";
import {api} from "~/utils/api";

export default function Contact() {
  return (
    <Page metaTitle={"Kontakt"} className={"font-medium"}>
      <div className="container mx-auto max-w-5xl sm:px-10 lg:px-0 mt-24 lg:mt-20">
        <div className="flex flex-col md:flex-row gap-20 justify-between px-4">

          <div className="">
            <h1 className={"title-xl"}>
              Kontaktujte nás
            </h1>
            <p className="text-xl mt-8">
              Máte problém? Otázku? Nebo nás chcete jen pozdravit? Jsme tu pro vás.
            </p>
            <Socials className={'mt-8'} />
            <LegalInfo className={'mt-8 hidden sm:block'} />
          </div>

          <ContactUsForm />
        </div>
      </div>
    </Page>
  )
}

let globalSent = false;
function ContactUsForm() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [sent, setSent] = React.useState(globalSent)

  const formMutation = api.submitContactForm.useMutation({
    onSuccess: () => {
      setSent(true);
    },
    onError: (err) => {
      toast.error("Nepodařilo se odeslat zprávu. Zkuste to prosím znovu. Chyba: " + err.message);
    },
    onSettled: () => {
      setLoading(false);
    },
    onMutate: () => {
      setLoading(true);
    }
  })

  let buttText;
  if (loading) buttText = "Odesílání...";
  else if (sent) buttText = "Odesláno!";
  else buttText = "Odeslat zprávu";

  useEffect(() => {
    globalSent = sent;
  }, [sent])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }

    formMutation.mutate({name, email, phone, message});
  }

  function validate(): string | null {
    if (!name) return "Zadejte vaše jméno";
    if (!email) return "Zadejte váš email";
    if (!message) return "Zadejte vaši zprávu";
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) return "Zadejte platný email";
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className={"space-y-4 w-full max-w-[400px]"}>
      <Input
        label={"Vaše jméno"}
        value={name}
        onChange={setName}
        placeholder={"Zadejte vaše jméno"}
        disabled={loading || sent}
      />
      <Input
        label={"Email"}
        value={email}
        onChange={setEmail}
        placeholder={"Zadejte váš email"}
        disabled={loading || sent}
      />
      <Input
        label={"Telefon (nepovinné)"}
        value={phone}
        onChange={setPhone}
        placeholder={"Zadejte váš telefon"}
        disabled={loading || sent}
      />
      <Input
        label={"Zpráva"}
        value={message}
        onChange={setMessage}
        placeholder={"Zadejte vaši zprávu..."}
        disabled={loading || sent}
        autosize={true}
        minRows={4}
      />
      <Button disabled={loading || sent} roundness={"medium"} className={twMerge("w-full", sent && "duration-1000 bg-green-500")}>
        {buttText}
      </Button>
    </form>
  )
}

function Socials(props: {className?: string}) {

  return (
    <div className={props.className + ' text-lg'}>
      <ContactInfoItem icon={<FiMail />} href="mailto:info@crossbeliever.com">
        info@crossbeliever.com
      </ContactInfoItem>

      <ContactInfoItem icon={<FiPhone />} href="tel:+420604744760">
        +420 604 744 760
      </ContactInfoItem>

      <ContactInfoItem icon={<FaInstagram />} href="https://instagram.com/">
        Instagram
      </ContactInfoItem>

      <ContactInfoItem
        icon={<FaLinkedin />}
        href="https://www.linkedin.com/in/mat%C4%9Bj-pl%C5%A1ek-64906419b/"
      >
        LinkedIn
      </ContactInfoItem>
    </div>
  )
}

function LegalInfo(props: {className?: string}) {
  return (
    <div className={props.className + ' text-lg'}>
      <p>Vášeň ke čtení, z.s.</p>
      <p>Skrétova 475/8, Jižní Předměstí, 301 00 Plzeň</p>
      <p>IČO: 78623091</p>
    </div>
  )
}

function ContactInfoItem(props: {icon: JSX.Element, children: string, href?: string}) {
  return (
    <div className="flex flex-row items-center gap-4">
      {props.icon}
      <a href={props.href} className={"text-[#529BAB] hover:text-blue-400"}>
        {props.children}
      </a>
    </div>
  )
}