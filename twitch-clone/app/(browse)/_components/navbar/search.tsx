"use client";

import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import qs from "query-string";

import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

export default function Search() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };

  return (
    <form className="relative w-full lg:w-[400px] flex items-center" onSubmit={onSubmit}>
      {/* 
        포커스 시 시각적인 반응은 없고, 테두리도 투명하며 위치 조정도 없는 상태
       */}
      <Input
        placeholder="Search"
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
      {value && (
        <X
          onClick={onClear}
          className="absolute top2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
        />
      )}
      <Button type="submit" size="sm" variant="secondary" className="rounded-l-none">
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
}
