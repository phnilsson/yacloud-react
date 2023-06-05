import React, { useState, FormEvent } from "react";

interface Entry {
  name: string;
  starttime: string;
  endtime: string;
}

const EntryForm: React.FC = () => {
  const [entry, setEntry] = useState<Entry>({
    name: "",
    starttime: "",
    endtime: "",
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://yacloudpython.traininglog.hemsida.eu/api/addLogEntry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log("Failed to post workout:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntry({
      ...entry,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={entry.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Start time:
        <input
          type="datetime-local"
          name="starttime"
          value={entry.starttime}
          onChange={handleChange}
        />
      </label>
      <label>
        End time:
        <input
          type="datetime-local"
          name="endtime"
          value={entry.endtime}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EntryForm;
