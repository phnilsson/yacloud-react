import moment from "moment";
import { useEffect, useState } from "react";

interface LogEntryProps {
  id: number;
}

function LogEntry({ id }: LogEntryProps) {
  id = id + 1;
  // const LogEntry: React.FC<LogEntryProps> (props) => {
  const [duration, setDuration] = useState<number>(0);
  const [name, setName] = useState<string>("Loading");
  const [dataLoaded, setDataLoaded] = useState(false);
  let url =
    "http://yacloudpython.traininglog.hemsida.eu/api/getLogEntry/" + String(id);
  let start: Date = new Date();
  let end: Date = new Date();

  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        start = new Date(data.starttime);
        end = new Date(data.endtime);
        let duration_tmp = moment.duration(
          end.getTime() - start.getTime(),
          "milliseconds"
        );
        console.log("++++");
        console.log(start);
        console.log(end);
        console.log(duration_tmp.asMinutes());
        console.log("-----");
        setDataLoaded(true);
        setDuration(duration_tmp.asMinutes());
      });
  });
  return (
    <>
      <b>{name}</b>
      {/* {items.length === 0 && <p>No items found</p>} */}
      <ul className="list-group">
        <li>ID: {id}</li>
        <li>Name: {name}</li>
        <li>
          Date: {start.getUTCDay()}-{start.getDate()}-{start.getFullYear()}
        </li>
        {/* <li>StartTime: {moment.duration(start.getTime(), "milliseconds").asMinutes()}</li> */}
        <li>Duration: {duration} minutes</li>
      </ul>
    </>
  );
}

export default LogEntry;
