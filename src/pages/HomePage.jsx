import { Navbar } from "../components/navbar";
import { ChatPage } from "./ChatPage";
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div>
        <ChatPage />
      </div>
    </div>
  );
};

export { HomePage };
