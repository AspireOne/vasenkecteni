import Page from "~/components/Page";
import Button, {ButtonLink} from "~/components/Button";
import {pages} from "~/constants";

// TODO: Finish this.
export default function DonationComplete() {
  

  return (
    <Page metaTitle={"Děkujeme!"} className={"flex justify-center items-center"}>
      <div className={"flex flex-col items-center gap-4"}>
        <img src={"/logo-circular.png"} className={"w-44 h-auto"} alt={"logo"} title={"logo"}/>
        <h1 className={"title-xl"}>
          Děkujeme vám!
        </h1>
        <div className={"inline-flex gap-4 mt-8"}>
          <ButtonLink href={pages.home.path} roundness={"medium"}>
            Zpět domů
          </ButtonLink>
          <ButtonLink href={pages.paymentManagement.path} style={"outline"} roundness={"medium"}>
            Správa plateb
          </ButtonLink>
        </div>
      </div>
    </Page>
  )
}