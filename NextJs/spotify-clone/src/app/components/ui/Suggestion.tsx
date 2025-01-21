import SuggestionItem from "@/app/components/ui/SuggestionItem";
import React from "react";

interface SuggestionProps {
  title: string;
}

const arr = [1, 1, 1, 1, 1];

const Suggestion: React.FC<SuggestionProps> = ({ title }) => {
  return (
    <div>
      <div className="flex justify-between px-8 items-end">
        <p className="text-2xl text-white font-semibold ">{title}</p>
        <a className="text-xs font-semibold text-neutral-400 hover:underline hover:cursor-pointer">
          hiện tất cả
        </a>
      </div>
      <div className="flex px-8 py-4">
        {arr.map((item) => (
          <SuggestionItem
            key={item}
            href="https://variety.com/wp-content/uploads/2020/06/unnamed-1-2-e1593560403821.jpg"
            title="Lewis Capaldi, Adela, Coldplay và nhiều hơn nữa"
          />
        ))}
      </div>
    </div>
  );
};

export default Suggestion;
