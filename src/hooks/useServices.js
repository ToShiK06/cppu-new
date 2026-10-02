import { useMemo, useState } from "react";
import { services, categories } from "../data/services";

export function useServices() {
  const [category, setCategory] = useState("Все");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchCat = category === "Все" || s.category === category;
      const matchSearch = s.title.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [category, search]);

  return { services: filtered, categories, category, setCategory, search, setSearch };
}