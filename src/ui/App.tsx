import "./App.css";
import { FaceRecognitionUI } from "../ui/layouts/FaceRecognitionUI";

function App() {
  return (
    <div className="App h-screen flex flex-col">
      <HeaderApp />
      <div className="main flex-1">
        <FaceRecognitionUI></FaceRecognitionUI>
      </div>
    </div>
  );
}

function HeaderApp() {
  return (
    <header>
      <button
        id="close"
        onClick={() => window.electron.sendFrameAction("CLOSE")}
      />
      <button
        id="minimize"
        onClick={() => window.electron.sendFrameAction("MINIMIZE")}
      />
      <button
        id="maximize"
        onClick={() => window.electron.sendFrameAction("MAXIMIZE")}
      />
    </header>
  );
}

export default App;
