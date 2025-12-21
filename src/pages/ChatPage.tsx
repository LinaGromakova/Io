import { Chat } from '@/widgets/Chat/ui';
import MainPage from './MainPage';

export default function ChatPage() {
  return (
    <MainPage>
      <div className="w-full h-dvh max-lg:flex-1/2 overflow-hidden">
        <Chat></Chat>
      </div>
    </MainPage>
  );
}
