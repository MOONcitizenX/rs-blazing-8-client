import { useState, FormEvent, useRef, MutableRefObject, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useChatState } from '../../store/chatStore';
import { ChatItem } from './ChatItem';
import { ServerToClientEvents } from '../../API/types/interfaces/ServerToClientEvents';
import { ClientToServerEvents } from '../../API/types/interfaces/ClientToServerEvents';
import styles from './Chat.module.css';
import { Button } from '../basicComponents/button';
import chatIcon from '../../assets/icons/chatIcon.svg';

interface ChatProps {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

export const Chat = ({ socket }: ChatProps) => {
  const chatMessages = useChatState((state) => state.messages);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const lastMessageRef = useRef() as MutableRefObject<HTMLDivElement>;

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = inputRef.current.value;
    if (message) {
      socket.emit('add-chat-message', { message });
    }
    inputRef.current.value = '';
  };

  const openChatButtonAttributes = {
    onClick: toggleChat,
    className: styles.chatIconButton,
    disabled: false,
  };
  const closeChatButtonAttributes = {
    onClick: toggleChat,
    className: styles.chatIconButtonTop,
    disabled: false,
  };

  useEffect(() => {
    const lastChat = lastMessageRef.current;
    if (lastChat) {
      lastChat.scrollIntoView();
    }
  }, [chatMessages, isChatOpen]);

  return (
    <div className={styles.chatWrapper}>
      {isChatOpen ? (
        <div className={styles.wrapper}>
          <Button attributes={closeChatButtonAttributes}>Close Chat</Button>
          <div className={styles.messages}>
            {chatMessages.map((message, index, array) =>
              index === array.length - 1 ? (
                <ChatItem
                  key={Date.now()}
                  author={message.author}
                  timeStamp={message.timeStamp}
                  message={message.message}
                  scrollRef={lastMessageRef}
                />
              ) : (
                <ChatItem
                  key={Date.now()}
                  author={message.author}
                  timeStamp={message.timeStamp}
                  message={message.message}
                />
              ),
            )}
          </div>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              ref={inputRef}
              className={styles.chatInput}
              placeholder="Type your message"
            />
          </form>
        </div>
      ) : (
        <Button attributes={openChatButtonAttributes}>
          <img src={chatIcon} alt="Chat" className={styles.chatIcon} />
        </Button>
      )}
    </div>
  );
};
