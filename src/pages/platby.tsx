import Page from "~/components/Page";
import {useSession} from "next-auth/react";
import {api} from "~/utils/api";
import {useEffect, useState} from "react";
import Button from "~/components/Button";
import {toast} from "react-toastify";

type Payment = {
  id: string,
  amount: number,
  createdAt: Date,
  updatedAt: Date,
}

export default function PaymentManagement() {
  const [subscription, setSubscription] = useState<Payment | null | undefined>(undefined);
  const [donations, setDonations] = useState<Payment[] | null | undefined>(undefined);

  const {data: payments} = api.donation.getPayments.useQuery(undefined, {});

  useEffect(() => {
    if (!payments) return;

    setSubscription(payments.subscription || null);
    setDonations(payments.donations || null);
    if (payments.donations && payments.donations.length === 0) setDonations(null);
  }, [payments])

  return (
    <Page metaTitle={"Příspěvky"} protected={true}
          protectedText={"Pro zobrazení vašich příspěvků prosím zadejte e-mail, který jste při platbě vyplnili."}>
      <h1 className={"title-xl text-center mb-12"}>
        Přehled příspěvků
      </h1>
      <div className={"flex flex-col md:flex-row flex-wrap gap-8 justify-center"}>
        <Card title={"Měsíční příspěvek"}>
          {subscription && (
            <MonthlyPaymentCard payment={subscription}/>
          )}
        </Card>
        <Card title={"Jednorázové příspěvky"}>
          {donations && (
            donations.map((payment) => (
              <span key={payment.id}>
                <PaymentCard payment={payment}/>
              </span>
            ))
          )}
        </Card>
      </div>
    </Page>
  )
}

function MonthlyPaymentCard(props: { payment: Payment }) {
  const [cancelling, setCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const cancelMutation = api.donation.cancelSubscription.useMutation({
    onSuccess: () => {
      toast.success("Měsíční příspěvek zrušen.")
      setCancelled(true);
    },
    onError: () => {
      toast.error("Nepodařilo se zrušit měsíční příspěvek. Kontaktujte nás.")
    },
    onSettled: () => {
      setCancelling(false);
    },
    onMutate: () => {
      setCancelling(true);
    }
  });

  function handleCancelClick() {
    if (cancelling || cancelled) return;
    cancelMutation.mutate();
  }

  return (
    <div
      className={"bg-gradient-to-r from-gray-50 w-full h-full rounded-lg shadow p-4 min-h-[300px] flex flex-col gap-4 max-h-[400px] overflow-y-auto"}>
      <PaymentCardHeader payment={props.payment}/>
      <p className={"text-brand-700 text-xl text-center font-bold py-4 my-auto"}>
        {props.payment.amount} Kč/měsíc
      </p>
      <Button disabled={cancelled || cancelling} className={"mt-auto"} onClick={handleCancelClick}>
        {cancelled && "Zrušeno"}
        {cancelling && "Rušení..."}
        {!cancelled && !cancelling && "Zrušit"}
      </Button>
    </div>
  )
}

function Card(props: { children?: React.ReactNode, title: string }) {
  return (
    <div className={"h-full"}>
      <h2 className={"title-md mb-4 text-center"}>
        {props.title}
      </h2>
      <div
        className={"w-full sm:w-96 h-full rounded-lg shadow min-h-[300px] max-h-[400px] overflow-y-auto"}>
        {props.children}
        {!props.children && (props.children === null ? <NoPayments/> : <Loader/>)}
      </div>
    </div>
  )
}

function NoPayments() {
  return (
    <div className={"flex h-full min-h-[260px] items-center justify-center text-gray-700"}>
      Žádný příspěvek
    </div>
  )
}

function Loader() {
  return (
    <div className={"flex h-full min-h-[260px] items-center justify-center text-gray-700"}>
      Načítání...
    </div>
  )
}

function PaymentCard(props: { payment: Payment }) {

  return (
    <div className={"m-4"}>
      <div className={"w-full rounded-lg shadow px-4 pt-2 bg-gradient-to-r from-gray-50"}>
        <PaymentCardHeader payment={props.payment}/>
        <p className={"text-brand-700 text-lg text-center font-bold py-4"}>
          {props.payment.amount} Kč
        </p>
      </div>
    </div>
  )
}

function PaymentCardHeader(props: { payment: Payment }) {
  const {data: session} = useSession();

  return (
    <div className={"w-full border-b flex flex-row justify-between pb-1 items-center"}>
      <p className={"text-gray-500 text-sm "}>
        {props.payment.createdAt.toLocaleDateString()}
      </p>
      <p className={"text-gray-500 text-sm "}>
        {session?.user?.email!}
      </p>
    </div>
  )
}