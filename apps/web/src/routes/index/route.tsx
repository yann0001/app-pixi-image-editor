import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useIndexRoute } from "./-UseIndexRoute";
import { HomeView } from "~/views/home/HomeView";

export const Route = createFileRoute("/")({
  component: IndexRoute,
});

function IndexRoute(): ReactElement {
  const props = useIndexRoute();
  return <HomeView {...props} />;
}
