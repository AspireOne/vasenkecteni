import React, {FormEvent} from "react";
import {api} from "~/utils/api";
import {toast} from "react-toastify";
import Input from "~/components/Input";
import Button from "~/components/Button";
import {twMerge} from "tailwind-merge";

type Data = {
  name: string,
  email: string,
  phone?: string,
  message: string
}

let sentForms: string[] = [];

export default function ContactUsForm(props: {className?: string, formId?: string}) {
  const [name, setName] = React.useState<string>("")
  const [email, setEmail] = React.useState<string>("")
  const [phone, setPhone] = React.useState<string>("")
  const [message, setMessage] = React.useState<string>("")
  const [loading, setLoading] = React.useState<boolean>(false)
  const [sent, setSent] = React.useState<boolean>(props.formId ? sentForms.includes(props.formId) : false);

  const formMutation = api.submitContactForm.useMutation({
    onSuccess: () => {
      setSent(true);
      props.formId && sentForms.push(props.formId);
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

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit({name, email, phone, message}, setSent, setLoading, formMutation.mutate);
  }

  return (
    <form onSubmit={onSubmit} className={twMerge("space-y-4 w-full max-w-[400px]", props.className)}>
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
      <Button disabled={loading || sent} roundness={"medium"}
              className={twMerge("w-full", sent && "duration-1000 bg-green-500")}>
        {buttText}
      </Button>
    </form>
  )
}

function handleSubmit(data: Data, setSent: (sent: boolean) => void, setLoading: (loading: boolean) => void, mutate: (data: Data) => void) {

  const err = validate();
  if (err) {
    toast.error(err);
    return;
  }

  mutate(data);

  function validate(): string | null {
    if (!data.name) return "Zadejte vaše jméno";
    if (!data.email) return "Zadejte váš email";
    if (!data.message) return "Zadejte vaši zprávu";
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(data.email)) return "Zadejte platný email";
    if (data.phone && !/^[0-9 +-]*$/g.test(data.phone)) return "Zadejte platné telefonní číslo";
    return null;
  }
}