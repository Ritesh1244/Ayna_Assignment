import React, { useState, useEffect } from "react";
import { MessageCircle, LogOut, Send } from 'lucide-react';

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("wss://ayna-assignment-phi.vercel.app");
    setSocket(ws);

    ws.onopen = () => {
      console.log("✅ WebSocket Connected");
    };

    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onclose = () => {
      console.log("❌ WebSocket Disconnected");
    };

    return () => {
      console.log("🔌 Closing WebSocket Connection...");
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && message.trim()) {
      socket.send(message);
      setMessage("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-[#13101a]">
      {/* Chat Container */}
      <div className="flex flex-col w-full max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between bg-white/10 backdrop-blur-xl rounded-t-2xl p-6 border-b border-white/20">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Real-Time Chat</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#9333EA]/20 hover:bg-[#9333EA]/30 text-white transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 bg-white/5 backdrop-blur-lg overflow-y-auto p-6 space-y-6">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] px-6 py-4 rounded-2xl ${
                    index % 2 === 0
                      ? 'bg-[rgb(147,51,234)] text-white rounded-tr-none'
                      : 'bg-white/10 backdrop-blur-xl text-white rounded-tl-none'
                  } shadow-xl hover:shadow-2xl transition-all duration-300`}
                >
                  <div className="mb-2 text-lg">{msg}</div>
                  <div className={`text-xs ${index % 2 === 0 ? 'text-white/70' : 'text-white/60'}`}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="bg-white/10 p-4 rounded-full inline-block">
                  <MessageCircle className="w-10 h-10 text-white/60" />
                </div>
                <p className="text-white/60 text-lg font-medium">
                  No messages yet. Start the conversation!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white/10 backdrop-blur-xl rounded-b-2xl p-6 border-t border-white/20">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-white/5 text-white placeholder-white/40 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#9333EA]/50 border border-white/10 text-lg transition-all duration-300"
            />
            <button
              onClick={sendMessage}
              className="flex items-center space-x-3 bg-[#9333EA] text-white px-8 py-4 rounded-xl hover:bg-[#7C3AED] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#9333EA]/50 hover:scale-105 active:scale-95 shadow-lg"
            >
              <span className="font-medium">Send</span>
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;