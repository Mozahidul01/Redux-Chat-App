import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../../features/messages/messagesApi";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";

export default function ChatBody() {
  const { id } = useParams();
  const { data: messages, isLoading, isError, error } = useGetMessagesQuery(id);

  //Decide what to render
  let content = null;

  if (isLoading) {
    content = <div className="m-2 text-center text-xl">Loading...</div>;
  }

  if (!isLoading && isError) {
    content = (
      <div className="w-full grid content-center justify-items-center h-full">
        <Error message={error?.data} />
      </div>
    );
  }

  if (!isLoading && !isError && messages?.length === 0) {
    content = (
      <div className="w-full grid content-center justify-items-center h-full">
        <p className="bg-yellow-200 px-4 py-2 font-medium text-center shadow capitalize">
          No Message Found
        </p>
      </div>
    );
  }

  if (!isLoading && !isError && messages?.length > 0) {
    content = (
      <div
        key={id}
        className="w-full grid conversation-row-grid"
      >
        <ChatHead
          avatar="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
          name="Akash Ahmed"
        />
        <Messages messages={messages} />
        <Options />
      </div>
    );
  }

  return <div className="w-full lg:col-span-2 lg:block">{content}</div>;
}
