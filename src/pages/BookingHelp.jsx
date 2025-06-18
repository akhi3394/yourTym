import React, { useState } from "react";
import {
  ChevronRight,
  Send,
  User,
  CreditCard,
  Shield,
  Award,
  AlertCircle,
} from "lucide-react";

const AccountScreen = () => (
  <div className="flex-1 bg-white rounded-[10px]  relative">
    <h2
      className="text-md font-bold text-gray-900  rounded-t mb-4 px-2 py-2"
      style={{ backgroundColor: "#DBDBDB" }}
    >
      Account
    </h2>
    <div className="flex flex-col min-h-screen p-6">
      <div className="space-y-4 flex-grow">
        <div className="flex space-x-4">
          <button
            className="text-black px-4 py-2 rounded-full hover:opacity-90"
            style={{ backgroundColor: "#FF583769" }}
          >
            I want to change my phone number
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Where can I check my saved addresses?
          </button>
        </div>

        <div className="flex space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            I want to change my email address
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Where can I see my saved payment details?
          </button>
        </div>

        <div className="border-t border-black pt-4">
          <p className="text-[#1D1D1D]">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>

      {/* Button pinned to the bottom of the container */}
      <div className="flex justify-end mt-4">
        <button className="bg-[#FF5534] text-white px-6 py-2 rounded-full hover:bg-red-600">
          Change Number
        </button>
      </div>
    </div>
  </div>
);

const GettingStartedScreen = () => (
  <div className="flex-1 bg-white rounded-[10px] ">
    <h2
      className="text-md font-bold text-gray-900  rounded-t mb-4 px-2 py-2"
      style={{ backgroundColor: "#DBDBDB" }}
    >
      Getting Started with YTYM
    </h2>
    <div className="flex flex-col min-h-screen p-6">
      <div className="space-y-4 flex-grow">
        <div className="flex space-x-4">
          <button
            className="text-black px-4 py-2 rounded-full hover:opacity-90"
            style={{ backgroundColor: "#FF583769" }}
          >
            What is YYTM?
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            How to place a booking?
          </button>
          <button className="bg-gray-200 px-2 py-2 rounded-full hover:bg-gray-300">
            Can I re-book the same professional if I like their service?
          </button>
        </div>

        <div className="flex space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            How to book my preferred professional?
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Do I have to order a minimum I can place the booking?
          </button>
        </div>

        <div className="flex space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Dose YTYM charges any cancellation fee?
          </button>
        </div>

        <div className="border-t border-black pt-4">
          <p className="text-[#1D1D1D]">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const PaymentScreen = () => (
  <div className="flex-1 bg-white rounded-[10px] ">
    <h2
      className="text-md font-bold text-gray-900  rounded-t mb-4 px-2 py-2"
      style={{ backgroundColor: "#DBDBDB" }}
    >
      Payment & YTYM Credits
    </h2>
    <div className="flex flex-col min-h-screen p-6">
      <div className="space-y-4 flex-grow">
        <div className="flex space-x-4">
          <button
            className="text-black px-4 py-2 rounded-full hover:opacity-90"
            style={{ backgroundColor: "#FF583769" }}
          >
            I am unable to make payment
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            I am unable to make payment
          </button>
          <button className="bg-gray-200 px-2 py-2 rounded-full hover:bg-gray-300">
            How do i use my UC credits?
          </button>
        </div>

        <div className="flex space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Can I extend the validity of the rewards?
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Can I extend the validity of the rewards?
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            I have not
          </button>
        </div>

        <div className="flex space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Where can i see my saved payment details?
          </button>
        </div>

        <div className="border-t border-black pt-4">
          <p className="text-[#1D1D1D]">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const MembershipScreen = () => (
  <div className="flex-1 bg-white rounded-[10px] ">
    <h2
      className="text-md font-bold text-gray-900  rounded-t mb-4 px-2 py-2"
      style={{ backgroundColor: "#DBDBDB" }}
    >
      YTYM Plus Membership
    </h2>
    <div className="flex flex-col min-h-screen p-6">
      <div className="space-y-4 flex-grow">
        <div className="flex space-x-4">
          <button
            className="text-black px-4 py-2 rounded-full hover:opacity-90"
            style={{ backgroundColor: "#FF583769" }}
          >
            I am unable to make payment
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            I am unable to make payment
          </button>
          <button className="bg-gray-200 px-2 py-2 rounded-full hover:bg-gray-300">
            How do i use my UC credits?
          </button>
        </div>

        <div className="flex space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Can I extend the validity of the rewards?
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Can I extend the validity of the rewards?
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            I have not
          </button>
        </div>

        <div className="flex space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Where can i see my saved payment details?
          </button>
        </div>

        <div className="border-t border-black pt-4">
          <p className="text-[#1D1D1D]">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const SafetyScreen = () => (
  <div className="flex-1 bg-white rounded-[10px] ">
    <h2
      className="text-md font-bold text-gray-900  rounded-t mb-4 px-2 py-2"
      style={{ backgroundColor: "#DBDBDB" }}
    >
      YTYM Safety
    </h2>
    <div className="flex flex-col min-h-screen p-6">
      <div className="space-y-4 flex-grow">
        <div className="flex space-x-4">
          <button
            className="text-black px-4 py-2 rounded-full hover:opacity-90"
            style={{ backgroundColor: "#FF583769" }}
          >
            I am unable to make payment
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            I am unable to make payment
          </button>
          <button className="bg-gray-200 px-2 py-2 rounded-full hover:bg-gray-300">
            How do i use my UC credits?
          </button>
        </div>

        <div className="flex space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Can I extend the validity of the rewards?
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Can I extend the validity of the rewards?
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            I have not
          </button>
        </div>

        <div className="flex space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Where can i see my saved payment details?
          </button>
        </div>

        <div className="border-t border-black pt-4">
          <p className="text-[#1D1D1D]">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const WarrantyScreen = () => (
  <div className="flex-1 bg-white rounded-[10px] ">
    <h2
      className="text-md font-bold text-gray-900  rounded-t mb-4 px-2 py-2"
      style={{ backgroundColor: "#DBDBDB" }}
    >
      Warranty
    </h2>
    <div className="flex flex-col min-h-screen p-6">
      <div className="space-y-4 flex-grow">
        <div className="flex space-x-4">
          <button
            className="text-black px-4 py-2 rounded-full hover:opacity-90"
            style={{ backgroundColor: "#FF583769" }}
          >
            I am unable to make payment
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            I am unable to make payment
          </button>
          <button className="bg-gray-200 px-2 py-2 rounded-full hover:bg-gray-300">
            How do i use my UC credits?
          </button>
        </div>

        <div className="flex space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Can I extend the validity of the rewards?
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Can I extend the validity of the rewards?
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            I have not
          </button>
        </div>

        <div className="flex space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Where can i see my saved payment details?
          </button>
        </div>

        <div className="border-t border-black pt-4">
          <p className="text-[#1D1D1D]">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
    </div>
  </div>
);

function BookingHelp() {
  const [message, setMessage] = useState("");
  const [selectedSection, setSelectedSection] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      sender: "support",
      time: "14:25",
      avatar: "/chat.svg",
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      sender: "user",
      time: "10:25",
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      sender: "support",
      time: "10:35",
      avatar: "/chat.svg",
    },
    {
      id: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      sender: "user",
      time: "10:45",
    },
  ]);

  const helpSections = [
    { id: "account", title: "Account", img: "/Account.svg" },
    {
      id: "getting-started",
      title: "Getting started with YTYM",
      img: "/ytym.svg",
    },
    {
      id: "payment",
      title: "Payment & YTYM Credits",
      img: "/payment.svg",
    },
    {
      id: "membership",
      title: "YTYM Plus Membership",
      img: "/ytymplus.svg",
    },
    { id: "safety", title: "YTYM Safety", img: "/safety.svg" },
    { id: "warranty", title: "Warranty", img: "/warrenty.svg" },
  ];

  const handleSectionClick = (sectionId) => {
    setSelectedSection(sectionId);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "user",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Map section IDs to screens
  const sectionScreens = {
    account: <AccountScreen />,
    "getting-started": <GettingStartedScreen />,
    payment: <PaymentScreen />,
    membership: <MembershipScreen />,
    safety: <SafetyScreen />,
    warranty: <WarrantyScreen />,
  };

  // Original Chat Screen
  const ChatScreen = () => (
    <div className="flex-1 flex bg-white rounded-[10px] flex-col">
      {/* Chat Header */}
      <div className="bg-[#DBDBDB] border-b  rounded-b rounded-[10px] border-gray-200 p-1">
        <div className="rounded-lg px-4 py-2 inline-block">
          <span className="text-sm font-medium ">Report</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col space-y-1">
            {msg.sender === "support" ? (
              <div className="flex items-start space-x-3">
                <img
                  src={msg.avatar}
                  alt="Support"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="text-xs text-gray-500 mb-1">{msg.time}</div>
                  <div className="bg-gray-800 text-white rounded-lg px-4 py-2 max-w-md">
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-end items-end space-x-2 max-w-full">
                <div className="flex flex-col items-end max-w-md">
                  <div className="text-xs text-gray-500 mb-1">{msg.time}</div>
                  <div className="border border-[#FF5534] text-gray-900 rounded-lg px-4 py-2">
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
                <img
                  src="/rightchat.svg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-[#E3E3E3] rounded-[10px] border-t border-gray-200 p-2">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 pt-[100px] pb-[80px] px-4 sm:px-6 lg:px-8 min-h-screen">
        <h1 className="text-xl font-bold text-gray-900 py-8 px-[300px]">
        Booking Help
      </h1>
      <div className="max-w-7xl flex mx-auto  gap-4">
        {/* Left Sidebar */}
        <div className="flex flex-col ">
          {/* Ticket Section */}
          <div className="bg-white p-6 mb-6 rounded-[15px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-[#444444]">Ticket</h3>
              <div className=" flex items-center justify-center overflow-hidden">
                <img
                  src="/Ticket.svg"
                  alt="Avatar"
                  className="w-6 h-6 object-cover"
                />
              </div>
            </div>
            <div className="text-sm text-[#444444] mb-1">
              Ticket id: 45226242
            </div>
            <div className="text-sm text-[#444444] mb-4">
              Ticket title: Issue with service quality
            </div>
            <button className="w-full py-2 px-4 border border-[#444444] rounded-[15px] text-sm font-medium text-[#444444] hover:bg-[#FF5534] hover:border-none hover:text-white transition-colors">
              View Ticket
            </button>
          </div>
          {/* Help Section */}
          <div className="bg-white rounded-[15px] p-6 mb-6">
            <h3 className="font-medium text-gray-900 mb-4">
              How can we help you?
            </h3>

            <div className="flex flex-col gap-y-3">
              {helpSections.map((section, index) => {
                const isLast = index === helpSections.length - 1;

                return (
                  <div
                    key={section.id}
                    className={`w-full ${!isLast ? "border-b" : ""}`}
                    style={{ borderColor: "#444444" }}
                  >
                    <button
                      onClick={() => handleSectionClick(section.id)}
                      className={`w-full flex items-center justify-between text-left transition-colors px-3 py-3 ${
                        selectedSection === section.id
                          ? "bg-red-200"
                          : "hover:bg-red-100"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={section.img}
                          alt={section.title}
                          className="w-5 h-5 object-contain"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {section.title}
                        </span>
                      </div>
                      <ChevronRight
                        className="w-4 h-4 transition-colors"
                        style={{ color: "#FF5534" }}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feedback Section */}
          <div className="bg-white rounded-[15px] p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">How are we doing?</h3>
              <div className="w-8 h-8  flex items-center justify-center overflow-hidden">
                <img
                  src="/thumps.svg"
                  alt="Alert"
                  className="w-6 h-6 object-contain"
                />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              Report a bug or suggest ways to make YTYM better
            </div>
            <button className="w-full py-2 px-4 border border-gray-300 rounded-[15px] text-sm font-medium text-gray-700 hover:bg-[#FF5534] hover:text-white transition-colors">
              Give feedback
            </button>
          </div>
        </div>

        {/* Right Section */}
        {selectedSection ? sectionScreens[selectedSection] : <ChatScreen />}

      </div>
    </div>
  );
}

export default BookingHelp;