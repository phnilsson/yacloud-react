import TrainingLog from "./components/TrainingLog";
import Alert from "./components/Alert";
import Button from "./components/Button";
import { useEffect, useState } from "react";
import EntryForm from "./components/EntryForm";
import LoginForm from "./components/Login";

function App() {
  const [traininglogActive, setTrainingLogVisible] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(-1);
  const [LogEntries, setLogEntries] = useState<number[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      fetch("http://yacloudpython.traininglog.hemsida.eu/api/getTrainingLog", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((response) => response.json())
        // .then(data => console.log(data))
        .then((data) => {
          let idArray: number[] = data.map(
            (item: { id: number; name: string }) => item.id
          );
          setLogEntries(idArray);
          // console.log("++++");
          // console.log(idArray);
        })
        .catch((error) => console.log(error));
    }
  }, [loggedIn]);

  return (
    <>
      {loggedIn && (
        <div>
          {traininglogActive && (
            <TrainingLog
              heading="Log Entries"
              entries={LogEntries}
              onSelectItem={(string) => setCurrentEntry}
            ></TrainingLog>
          )}
          <Button
            children="Get Traininglog"
            onClick={() => setTrainingLogVisible(true)}
          ></Button>
        </div>
      )}
      {loggedIn && (
        <div>
          <EntryForm></EntryForm>
        </div>
      )}
      {!loggedIn && (
        <div>
          <LoginForm onLogin={setLoggedIn}></LoginForm>
        </div>
      )}
    </>
  );
}

export default App;
