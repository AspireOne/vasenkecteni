import React from "react";
import Page from "~/components/Page";
import WhatWeDoSection from "~/components/landing_page/WhatWeDoSection";
import OurTeamSection from "~/components/landing_page/OurTeamSection";
import SupportUsSection from "~/components/landing_page/SupportUsSection";
import Header from "~/components/landing_page/Header";

export default function Home() {
  //const hello = api.example.hello.useQuery({text: "from tRPC"});

  return (
    <>
      <Page metaTitle={"Hlavní stránka"} className={"space-y-32"}>
        <Header/>
        <div className={"space-y-32"}>
          <WhatWeDoSection/>
          <OurTeamSection/>
          <SupportUsSection/>
        </div>
      </Page>
    </>
  );
}