import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from "../../features/users/usersApi";
import Error from "../ui/Error";
import isValidateEmail from "./../../utils/isValidEmail";
import {
  conversationsApi,
  useAddConversationMutation,
  useEditConversationMutation,
} from "./../../features/conversations/conversationsApi";

export default function Modal({ open, control }) {
  const dispatch = useDispatch();
  const [sendEmail, setSendEmail] = useState("");
  const [message, setMessage] = useState("");
  const [userCheck, setUserCheck] = useState(false);
  const [conversation, setConversation] = useState(undefined);
  const [err, setErr] = useState("");

  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { email: myEmail } = loggedInUser || {};

  const { data: participant, isError: isParticipantError } = useGetUserQuery(
    sendEmail,
    {
      skip: !userCheck,
    }
  );

  const [
    addConversation,
    {
      isSuccess: isAddedSuccess,
      isLoading: isAddedLoading,
      isError: isAddedError,
    },
  ] = useAddConversationMutation();
  const [
    editConversation,
    {
      isSuccess: isEditedSuccess,
      isLoading: isEditedLoading,
      isError: isEditedError,
    },
  ] = useEditConversationMutation();

  const debounceHandler = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleEmailValidate = debounceHandler((value) => {
    if (isValidateEmail(value)) {
      // check user api
      setUserCheck(true);
      setSendEmail(value);
    }
  }, 500);

  useEffect(() => {
    if (isParticipantError) {
      setErr("There was an error fetching user data.");
    } else if (participant?.length === 0) {
      setErr("This user does not exist!");
    } else if (participant?.length > 0 && participant[0].email === myEmail) {
      setErr("You can't send message to yourself!");
    } else if (participant?.length > 0 && participant[0].email !== myEmail) {
      // check conversation exist
      dispatch(
        conversationsApi.endpoints.getConversation.initiate({
          userEmail: myEmail,
          participantEmail: sendEmail,
        })
      )
        .unwrap()
        .then((data) => {
          setConversation(data);
        })
        .catch((err) => {
          console.error("Error fetching conversation:", err);
          setErr("There was an error fetching conversation data.");
        });
    } else {
      setErr("");
    }
  }, [participant, dispatch, myEmail, sendEmail, isParticipantError]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const conversationData = {
      participants: `${myEmail}-${participant[0].email}`,
      users: [loggedInUser, participant[0]],
      message,
      timestamp: new Date().getTime(),
    };

    if (conversation?.length > 0) {
      //edit the conversation
      editConversation({
        id: conversation[0].id,
        sender: myEmail,
        data: conversationData,
      });
    } else if (conversation?.length === 0) {
      //add the conversation
      addConversation({
        sender: myEmail,
        data: conversationData,
      });
    }
  };

  useEffect(() => {
    if (isAddedSuccess || isEditedSuccess) {
      control();
      setMessage("");
    }
  }, [isEditedSuccess, isAddedSuccess]);

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Send message
          </h2>
          <form
            className="mt-8 space-y-6"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="to"
                  name="to"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Send to"
                  onChange={(e) => handleEmailValidate(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            {err !== "" && <Error message={err} />}

            <div>
              <button
                type="submit"
                disabled={
                  conversation === undefined ||
                  (participant?.length > 0 && participant[0].email === myEmail)
                }
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </>
    )
  );
}
