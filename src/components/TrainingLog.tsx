import { MouseEvent, ReactNode, useState } from "react";
import LogEntry from "./LogEntry";

interface TrainingLogProps {
  entries: number[];
  heading: string;
  onSelectItem: (entry: number | null) => void;
}

function TrainingLog({ entries, heading, onSelectItem }: TrainingLogProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleSelectEntry = (event: MouseEvent<HTMLLIElement>) => {
    const index = Number(event.currentTarget.dataset.index);
    setSelectedIndex(index);
    onSelectItem(entries[index]);
  };


  return (
    <>
      <h1>{heading}</h1>
      {entries.length === 0 && <p>No entries found</p>}
      <ul className="list-group">
        {entries.map((entry, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={entry}
            data-index={index}
            onClick={handleSelectEntry}
          >
            
            {selectedIndex === index ? <LogEntry id={index}></LogEntry>: entry}
          </li>
        ))}
      </ul>
    </>
  );
}

export default TrainingLog;
