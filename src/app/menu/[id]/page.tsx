"use client";

import DishDetail from "./DishDetail";

export default function DishPage({ params }: { params: { id: string } }) {
  return <DishDetail id={params.id} />;
}
