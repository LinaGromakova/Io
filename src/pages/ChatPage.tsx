import { Chat } from "@/widgets/Chat/ui";
import { MainPage } from './MainPage';
export function ChatPage() {
  return (
    <MainPage>
      <div className="w-full max-h-screen max-lg:flex-1/2">
        <Chat></Chat>
      </div>
    </MainPage>
  );
}
