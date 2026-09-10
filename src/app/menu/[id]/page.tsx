import { notFound } from "next/navigation";
import { MENU_ITEMS } from "@/lib/menu-data";
import DishDetail from "./DishDetail";

export const revalidate = 60;

export default async function DishPage({ params }: { params: { id: string } }) {
  const dish = MENU_ITEMS.find((item) => item.id === params.id);

  if (!dish) notFound();

  const related = MENU_ITEMS.filter(
    (item) => item.cuisine === dish.cuisine && item.id !== dish.id
  ).slice(0, 3);

  return <DishDetail id={params.id} dish={dish} related={related} />;
}
