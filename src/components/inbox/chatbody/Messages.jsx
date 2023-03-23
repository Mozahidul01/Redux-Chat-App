import Message from "./Message";
import { useSelector } from "react-redux";

export default function Messages({ messages = [] }) {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};

  return (
    <div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
      <ul className="space-y-2">
        {messages
          .slice()
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((msg) => {
            const { id, sender, message } = msg;
            const justify = sender.email !== email ? "start" : "end";

            return (
              <Message
                key={id}
                justify={justify}
                message={message}
              />
            );
          })}
      </ul>
    </div>
  );
}
