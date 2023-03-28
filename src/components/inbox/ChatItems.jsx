import {
  conversationsApi,
  useGetConversationsQuery,
} from "../../features/conversations/conversationsApi";
import ChatItem from "./ChatItem";
import { useDispatch, useSelector } from "react-redux";
import Error from "./../ui/Error";
import moment from "moment/moment";
import getChatPartner from "../../utils/getChatPartner";
import gravatarUrl from "gravatar-url";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

export default function ChatItems() {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const { data, isLoading, isError, error } =
    useGetConversationsQuery(email) || {};

  const { data: conversation, totalCount } = data || {};

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();

  const fetchMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(
        conversationsApi.endpoints.getMoreConversations.initiate({
          email,
          page,
        })
      );
    }
  }, [page, dispatch, email]);

  useEffect(() => {
    if (totalCount > 0) {
      const more =
        Math.ceil(
          totalCount / Number(import.meta.env.VITE_CONVERSATIONS_LIMIT)
        ) > page;

      setHasMore(more);
    }
  }, [totalCount, page]);

  //Decide what to render
  let content = null;

  if (isLoading) {
    content = <li className="m-2 text-center text-xl">Loading...</li>;
  }

  if (!isLoading && isError && error?.data) {
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
    content = (
      <InfiniteScroll
        dataLength={conversation?.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<li className="m-2 text-center text-xl">Loading...</li>}
        height={window.innerHeight - 129}
      >
        {conversation
          .slice()
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((conversation) => {
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
          })}
      </InfiniteScroll>
    );
  }

  return <ul>{content}</ul>;
}
