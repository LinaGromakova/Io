import { MainViewLayout } from '@/views/Main-view/main-view-layout';
import { Chat } from '@/widgets/Chat/chat';
import { Header } from '@/widgets/Header/header';

function ChatUser() {
  return (
    <MainViewLayout>
      <div className="w-full max-h-screen">
        <Header type="HEADER_MAIN"></Header>
        <Chat></Chat>
      </div>
    </MainViewLayout>
  );
}
export default ChatUser;
