import { useGetConversationQuery } from "../../features/conversations/conversationsApi";
import ChatItem from "./ChatItem";
import { useSelector } from "react-redux";
import Error from "./../ui/Error";
import moment from "moment/moment";
import getChatPartner from "../../utils/getChatPartner";
import gravatarUrl from "gravatar-url";

export default function ChatItems() {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const {
    data: conversation,
    isLoading,
    isError,
    error,
  } = useGetConversationQuery(email);

  //Decide what to render
  let content = null;

  if (isLoading) {
    content = <li className="m-2 text-center text-xl">Loading...</li>;
  }

  if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center font-medium uppercase">
        <Error message={error?.data} />
      </li>
    );
  }

  if (!isLoading && !isError && conversation?.length === 0) {
    content = (
      <li className="m-2 text-center">
        <p className="bg-yellow-200 px-6 py-4 font-medium shadow capitalize">
          No conversation Found
        </p>
      </li>
    );
  }

  if (!isLoading && !isError && conversation?.length > 0) {
    content = conversation.map((conversation) => {
      const { id, users, message, timestamp } = conversation;
      const partner = getChatPartner(users, email);
      const { name, email: partnerEmail } = partner;
      return (
        <li key={id}>
          <ChatItem
            id={id}
            avatar={gravatarUrl(partnerEmail, {
              size: 80,
            })}
            name={name}
            lastMessage={message}
            lastTime={moment(timestamp).fromNow()}
          />
        </li>
      );
    });
  }

  return <ul>{content}</ul>;
}
