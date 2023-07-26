import {PropsWithChildren, useState} from "react";
import {api} from "~/utils/api";
import {toast} from "react-toastify";
import Button from "~/components/Button";
import Input from "~/components/Input";
import {twMerge} from "tailwind-merge";
import {Stripe} from "stripe";
import getStripe from "~/utils/get-stripe";

type Option = "monthly" | "once";

export type DonateFormData = {
  amount: number
  frequency: Option
}

export default function SupportUsForm() {
  const [selectedFreq, setSelectedFreq] = useState<Option>("monthly");
  const [value, setValue] = useState<number>(100);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const sessionMutation = api.donation.getSession.useMutation({
    onSuccess: async (session) => {
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        sessionId: session.id,
      });

      console.log(JSON.stringify(error));
    },
    onError: (err) => {
      toast.error("Chyba: " + err.message);
      setLoading(false);
      setDisabled(false);
    },
    onMutate: () => {
      setLoading(true);
      setDisabled(true);
    }
  })

  function onSubmit() {
    if (loading || disabled) return;

    sessionMutation.mutate({
      amount: value,
      frequency: selectedFreq
    });
  }

  return (
    <div
      className={"w-full sm:min-w-[400px] lg:min-w-[500px] bg-emerald-50 rounded-md p-8 space-y-12 text-center font-semibold"}>
      <p className={"text-brand-800 text-2xl"}>
        Pomozte seniorům finančním darem
      </p>

      <p className={"text-brand-800 mx-4"}>
        Vaše pravidelná měsíční pomoc pro nás znamená opravdu hodně.
      </p>

      <Info
        value={value}
        selectedFreq={selectedFreq}
        setSelectedFreq={setSelectedFreq}
        setValue={setValue}/>

      <Button onClick={onSubmit} disabled={loading || disabled} roundness={"medium"} className={"w-[80%]"}>
        {
          loading
            ? "Zpracovávání..."
            : "Darovat"
        }
      </Button>

      <p className={"text-brand-800 font-semibold pt-10"}>
        Pravidelně přispívat můžete také zadáním trvalého příkazu přímo na náš bankovní účet 111111111111111/1111
      </p>
    </div>
  );
}

function Info(props: {
  selectedFreq: Option,
  setSelectedFreq: (freq: Option) => void,
  value: number,
  setValue: (value: number) => void,
}) {
  return (
    <div className={"space-y-5 lg:mx-5"}>
      <div className="flex justify-center items-center gap-2">
        <FreqOptionButton onClick={() => props.setSelectedFreq("monthly")} selected={props.selectedFreq === "monthly"}>
          Měsíčně
        </FreqOptionButton>
        <FreqOptionButton onClick={() => props.setSelectedFreq("once")} selected={props.selectedFreq === "once"}>
          Jednorázově
        </FreqOptionButton>
      </div>

      <div className={"flex flex-row"}>
        <AmountOptionButton value={50} selectedValue={props.value} onClick={props.setValue} pos={"first"}/>
        <AmountOptionButton value={100} selectedValue={props.value} onClick={props.setValue}/>
        <AmountOptionButton value={200} selectedValue={props.value} onClick={props.setValue}/>
        <AmountOptionButton value={500} selectedValue={props.value} onClick={props.setValue} pos={"last"}/>
      </div>

      <CustomValueInput value={props.value} onChange={props.setValue}/>
    </div>
  )
}

function CustomValueInput(props: { value: number, onChange: (value: number) => void }) {
  return (
    <div>
      <div className={"flex flex-row justify-center items-center"}>
        <Input type={"number"}
               className={""}
               step={50}
               label={"Hodnota daru"}
               value={props.value || ""}
               placeholder={"Hodnota daru"}
               onChange={(val) => {
                 if (val.match(/^[0-9]*$/)) {
                   props.onChange(parseInt(val));
                 }
                 if (!val) props.onChange(0);
               }}>
          <div
            className={"flex items-center justify-center px-4 h-10 border-2 border-gray-200 border-l-0 rounded-md rounded-l-none bg-gray-50 text-gray-600"}>
            Kč
          </div>
        </Input>
      </div>
    </div>
  )
}

function AmountOptionButton(props: {
  value: number,
  selectedValue: number,
  onClick: (value: number) => void,
  pos?: "first" | "middle" | "last"
}) {
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

function FreqOptionButton(props: PropsWithChildren<{ selected: boolean, onClick: () => void }>) {
  return (
    <FormButton
      className={"rounded-md " + (props.selected && "border-brand-700")}
      onClick={props.onClick}
    >
      {props.children}
    </FormButton>
  )
}

function FormButton(props: PropsWithChildren<{ className?: string | false, onClick: () => void }>) {
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