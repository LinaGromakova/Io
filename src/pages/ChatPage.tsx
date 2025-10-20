import { Chat } from '@/widgets/Chat/ui/chat';
import { MainPage } from './MainPage';
export function ChatPage() {
  return (
    <MainPage>
      <div className="w-full max-h-screen ">
        <Chat></Chat>
      </div>
    </MainPage>
  );
}
