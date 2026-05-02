import type { ReactElement } from "react";
import { FilterDrawer } from "./FilterDrawer";
import { useFilterDrawer } from "./UseFilterDrawer";

export function FilterDrawerController(): ReactElement {
  const props = useFilterDrawer();
  return <FilterDrawer {...props} />;
}
