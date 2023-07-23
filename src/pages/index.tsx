import {signIn, signOut, useSession} from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import {api} from "~/utils/api";
import PageHead from "~/components/PageHead";
import React from "react";
import Page from "~/components/Page";

export default function Home() {
  const hello = api.example.hello.useQuery({text: "from tRPC"});

  return (
    <>
      <Page metaTitle={"Hlavní stránka"} metaDesc={"Nezisková organizace Vášen ke čtení"}>

      </Page>
    </>
  );
}