import Navbar from "./../components/Navbar/Navbar";
import ChatBody from "./../components/inbox/chatbody/ChatBody";
import Sidebar from "./../components/inbox/Sidebar";

export default function Inbox() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto -mt-1">
        <div className="min-w-full border rounded flex lg:grid lg:grid-cols-3">
          <Sidebar />
          <ChatBody />
        </div>
      </div>
    </div>
  );
}
