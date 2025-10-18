import { MessageItem } from '@/entities/message';
import { useAuth } from '@/features/auth/hooks/useAuth';
import Empty from '@/shared/assets/chatIcons/Empty.svg';
import Stellar from '@/shared/assets/chatIcons/Stellar.svg';
import { useChatMessages } from '../hooks/useChatMessages';
import { MessageInterface } from '../types/MessageInterface';
import { useScrollToBottom } from '../hooks';

export function MessageList({ chatId }: { chatId: string }) {
  const { user } = useAuth();
  const { messages } = useChatMessages(chatId, user.userId);
  const { chatRef } = useScrollToBottom(messages);

  return (
    <section className="pt-5 px-12 max-md:px-6 w-full h-[calc(100vh-80px)] overflow-y-auto scrollbar-custom">
      <Stellar className="absolute pointer-events-none top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-[calc(100vh)/2.5] w-2/3 h-2/3" />
      {messages.length == 0 && (
        <Empty className="w-2/3 h-2/3 mx-auto relative my-auto translate-y-[10vh]" />
      )}
      <div>
        {messages.map((message: MessageInterface) => {
          return (
            <MessageItem
              key={message.messageId}
              currentUserId={user.userId}
              senderId={message.senderId}
              messageContent={message.messageContent}
              isRead={message.isRead}
              createdAt={message.createdAt}
            ></MessageItem>
          );
        })}
        <div ref={chatRef} className="h-15"></div>
      </div>
    </section>
  );
}
/* {(userInBlackList && (
        <div className="py-4 px-6 bg text-xl bg-extra absolute w-full text-center min-h-10 bottom-14 text-white">
          {userInBlackList.targetUserId === user?.userId
            ? 'Пользователь добавил Вас в чёрный список'
            : 'Вы добавили пользователя в чёрный список'}
        </div>
      )) || <ChatInput sendMessage={sendMessage}></ChatInput>}



      
  // useEffect(() => {
  //   setUserInBlackList(undefined);
  //   setIsBlock(false);
  //   checkBlackList(user.id, currentUser.id).then((check) => {
  //     if (check) {
  //       setUserInBlackList(check);
  //       if (check.user_id === user.id) {
  //         setIsBlock(true);
  //       }
  //     }
  //   });
  // }, [chat_id, currentUser]);

    // useEffect(() => {
  //   socket.on('add-blacklist', (data) => {
  //     if (data) {
  //       setUserInBlackList(data);
  //       if (data.user_id === user.id) {
  //         setIsBlock(true);
  //       }
  //     }
  //   });
  // }, [socket]);

  // useEffect(() => {
  //   socket.on('delete-blacklist', (result) => {
  //     console.log(result, 'this is result delete');
  //     setUserInBlackList(undefined);
  //     if (result.user_id === user.id) {
  //       setIsBlock(false);
  //     }
  //   });

  // }, [socket]);
  */
