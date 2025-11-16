import React, { useState, useEffect, useRef } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [messageType, setMessageType] = useState('text');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const messageTypes = {
    text: { emoji: '💬', label: 'General', color: 'bg-blue-500' },
    love: { emoji: '❤️', label: 'Love Note', color: 'bg-romantic-pink' },
    memory: { emoji: '🌟', label: 'Memory', color: 'bg-romantic-gold' },
    future: { emoji: '🌈', label: 'Future Dream', color: 'bg-green-500' }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await authAPI.get('/messages');
      setMessages(response.data.data);
    } catch (error) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await authAPI.post('/messages', {
        text: newMessage,
        type: messageType
      });

      setMessages([...messages, response.data.data]);
      setNewMessage('');
      toast.success('Message sent with love! 💕');
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      await authAPI.delete(`/messages/${messageId}`);
      setMessages(messages.filter(msg => msg._id !== messageId));
      toast.success('Message deleted');
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const quickMessages = [
    { text: "I love you more every day! 💕", type: "love" },
    { text: "Remember our first date? So magical! ✨", type: "memory" },
    { text: "Can't wait to build our future together! 🏡", type: "future" },
    { text: "You make me so happy! 😊", type: "love" },
    { text: "That vacation was unforgettable! 🌴", type: "memory" },
    { text: "Dreaming of growing old with you 💫", type: "future" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-romantic-pink"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-romantic-cream py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-dancing text-5xl md:text-6xl text-romantic-pink mb-4">
            Private Messages
          </h1>
          <p className="text-xl text-gray-600">
            Share your thoughts, dreams, and love notes with each other
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Quick Messages Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-romantic sticky top-8">
              <h3 className="font-playfair text-xl text-gray-800 mb-4">
                Quick Messages
              </h3>
              <div className="space-y-2">
                {quickMessages.map((quickMsg, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setNewMessage(quickMsg.text);
                      setMessageType(quickMsg.type);
                    }}
                    className="w-full text-left p-3 rounded-lg border border-pink-200 hover:bg-pink-50 transition-colors text-sm"
                  >
                    <div className="flex items-center mb-1">
                      <span className="mr-2">{messageTypes[quickMsg.type].emoji}</span>
                      <span className="text-xs text-gray-500">{messageTypes[quickMsg.type].label}</span>
                    </div>
                    <p className="text-gray-700 line-clamp-2">{quickMsg.text}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Main Area */}
          <div className="lg:col-span-3">
            <div className="card-romantic h-[600px] flex flex-col">
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">💌</div>
                    <h3 className="font-playfair text-2xl text-gray-600 mb-2">
                      No messages yet
                    </h3>
                    <p className="text-gray-500">
                      Start your conversation with a loving message!
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div key={message._id} className="flex flex-col space-y-2">
                      {/* Date Separator */}
                      <div className="text-center">
                        <span className="text-xs text-gray-400 bg-romantic-cream px-2 py-1 rounded">
                          {formatDate(message.createdAt)}
                        </span>
                      </div>

                      {/* Message */}
                      <div className="flex items-start space-x-3 group">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${messageTypes[message.type].color}`}>
                          {messageTypes[message.type].emoji}
                        </div>
                        
                        <div className="flex-1">
                          <div className="bg-white border border-pink-200 rounded-2xl p-4">
                            <p className="text-gray-800 whitespace-pre-wrap">
                              {message.text}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-1 px-2">
                            <span className="text-xs text-gray-500">
                              {formatTime(message.createdAt)}
                            </span>
                            <span className="text-xs text-gray-400">
                              {messageTypes[message.type].label}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => deleteMessage(message._id)}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t border-pink-200 p-4">
                <form onSubmit={sendMessage} className="space-y-4">
                  {/* Message Type Selector */}
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {Object.entries(messageTypes).map(([key, value]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setMessageType(key)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                          messageType === key
                            ? `${value.color} text-white`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <span>{value.emoji}</span>
                        <span>{value.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={`Write a ${messageTypes[messageType].label.toLowerCase()}...`}
                        className="input-romantic h-20 resize-none"
                        maxLength={500}
                      />
                      <div className="text-right text-xs text-gray-500 mt-1">
                        {newMessage.length}/500
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="btn-primary self-end disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send 💕
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;