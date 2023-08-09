import Page from "~/components/Page";
import React from "react";
import {api} from "~/utils/api";

export default function Testdb() {
  const {data: works, isInitialLoading} = api.testDb.useQuery();
  return (
    <p>
      {"db works: " + (isInitialLoading ? "loading..." : works)}
    </p>
  )
}