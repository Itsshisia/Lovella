import React, { useState, useRef, useEffect } from 'react'
import toast from 'react-hot-toast'

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Good morning my love! 💕 Waking up next to you is the best part of every day.",
      type: "love",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      sender: "Alex"
    },
    {
      id: 2,
      text: "Remember our first date at that little Italian place? I was so nervous but you made me feel so comfortable ❤️",
      type: "memory",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      sender: "Taylor"
    },
    {
      id: 3,
      text: "I can't wait for our trip to Japan next year! Cherry blossoms, amazing food, and exploring together 🌸",
      type: "future",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      sender: "Alex"
    },
    {
      id: 4,
      text: "Just thinking about how lucky I am to have you in my life. You make everything better ✨",
      type: "love",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      sender: "Taylor"
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [messageType, setMessageType] = useState('love')
  const messagesEndRef = useRef(null)

  const messageTypes = {
    love: { emoji: '❤️', label: 'Love Note', color: 'from-romantic-pink to-romantic-rose', bgColor: 'bg-pink-50', borderColor: 'border-pink-200' },
    memory: { emoji: '🌟', label: 'Memory', color: 'from-romantic-gold to-amber-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
    future: { emoji: '🌈', label: 'Future Dream', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    general: { emoji: '💬', label: 'General', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50', borderColor: 'border-green-200' }
  }

  const quickMessages = [
    { text: "I love you more every day! 💕", type: "love" },
    { text: "Remember our first date? So magical! ✨", type: "memory" },
    { text: "Can't wait to build our future together! 🏡", type: "future" },
    { text: "You make me so happy! 😊", type: "love" },
    { text: "That vacation was unforgettable! 🌴", type: "memory" },
    { text: "Dreaming of growing old with you 💫", type: "future" },
    { text: "Thinking of you always ❤️", type: "love" },
    { text: "Our inside jokes still make me laugh! 😂", type: "memory" }
  ]

  // Mock user data
  const user = {
    name: 'Alex',
    partnerName: 'Taylor'
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) {
      toast.error('Please write a beautiful message first!')
      return
    }

    const message = {
      id: messages.length + 1,
      text: newMessage,
      type: messageType,
      timestamp: new Date().toISOString(),
      sender: user.name
    }

    setMessages([message, ...messages])
    setNewMessage('')
    
    // Auto-reply simulation
    setTimeout(() => {
      const replies = {
        love: ["I love you too! 💖", "You're my everything! ❤️", "My heart is yours forever 💕"],
        memory: ["That was such a special time! 🌟", "I'll cherish that memory forever ✨", "Remembering that makes me smile! 😊"],
        future: ["I can't wait either! 🚀", "Our future is so bright! 🌈", "Dreaming with you is my favorite! 💫"],
        general: ["Thinking of you too! 💭", "You're amazing! 🌟", "So grateful for you! 🙏"]
      }

      const autoReply = {
        id: messages.length + 2,
        text: replies[messageType][Math.floor(Math.random() * replies[messageType].length)],
        type: messageType,
        timestamp: new Date(Date.now() + 2000).toISOString(),
        sender: user.partnerName
      }

      setMessages(prev => [autoReply, ...prev])
      toast('💌 Love message received!', { icon: '❤️' })
    }, 2000)

    toast.success('Love message sent! 💕')
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = today - date
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const deleteMessage = (messageId) => {
    setMessages(messages.filter(msg => msg.id !== messageId))
    toast.success('Message moved to the heart archive 💝')
  }

  const getGroupedMessages = () => {
    const groups = {}
    messages.forEach(message => {
      const date = new Date(message.timestamp).toDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
    })
    return groups
  }

  const groupedMessages = getGroupedMessages()

  return (
    <div className="min-h-screen bg-romantic-cream py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-dancing text-5xl md:text-6xl text-romantic-pink mb-4">
            Private Messages
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your thoughts, dreams, and love notes in your intimate couple space
          </p>
          <div className="mt-4 flex justify-center items-center space-x-2 text-romantic-pink">
            <span className="text-2xl">💌</span>
            <span className="text-lg">{messages.length} love messages exchanged</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Quick Messages Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-romantic sticky top-8">
              <h3 className="font-playfair text-xl text-gray-800 mb-4 flex items-center">
                <span className="text-xl mr-2">⚡</span>
                Quick Messages
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {quickMessages.map((quickMsg, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setNewMessage(quickMsg.text)
                      setMessageType(quickMsg.type)
                    }}
                    className="w-full text-left p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-romantic-pink hover:bg-pink-50 transition-all duration-300 group"
                  >
                    <div className="flex items-center mb-2">
                      <span className={`w-8 h-8 bg-gradient-to-r ${messageTypes[quickMsg.type].color} rounded-full flex items-center justify-center mr-2 text-white text-sm`}>
                        {messageTypes[quickMsg.type].emoji}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">{messageTypes[quickMsg.type].label}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-800">
                      {quickMsg.text}
                    </p>
                  </button>
                ))}
              </div>

              {/* Chat Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Chat Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Messages:</span>
                    <span className="font-semibold text-romantic-pink">{messages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Love Notes:</span>
                    <span className="font-semibold text-romantic-pink">
                      {messages.filter(m => m.type === 'love').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Memories Shared:</span>
                    <span className="font-semibold text-romantic-gold">
                      {messages.filter(m => m.type === 'memory').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Future Dreams:</span>
                    <span className="font-semibold text-blue-500">
                      {messages.filter(m => m.type === 'future').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Main Area */}
          <div className="lg:col-span-3">
            <div className="card-romantic h-[600px] flex flex-col">
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                  <div key={date}>
                    {/* Date Separator */}
                    <div className="text-center mb-4">
                      <span className="text-xs text-gray-400 bg-romantic-cream px-3 py-1 rounded-full border">
                        {formatDate(dateMessages[0].timestamp)}
                      </span>
                    </div>

                    {/* Messages for this date */}
                    {dateMessages.map((message) => (
                      <div key={message.id} className="flex flex-col space-y-2 group">
                        <div className={`flex items-start space-x-3 ${
                          message.sender === user.name ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          {/* Avatar */}
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 ${
                            message.sender === user.name 
                              ? 'bg-gradient-to-r from-romantic-pink to-romantic-rose' 
                              : 'bg-gradient-to-r from-romantic-gold to-amber-500'
                          }`}>
                            {message.sender === user.name ? user.name[0] : user.partnerName[0]}
                          </div>
                          
                          {/* Message Bubble */}
                          <div className={`flex-1 max-w-xs lg:max-w-md ${
                            message.sender === user.name ? 'text-right' : 'text-left'
                          }`}>
                            <div className={`inline-block p-4 rounded-2xl ${
                              message.sender === user.name
                                ? 'bg-gradient-to-r from-romantic-pink to-romantic-rose text-white'
                                : `${messageTypes[message.type].bgColor} ${messageTypes[message.type].borderColor} border text-gray-700`
                            }`}>
                              <p className="leading-relaxed whitespace-pre-wrap">
                                {message.text}
                              </p>
                            </div>
                            
                            {/* Message Meta */}
                            <div className={`flex items-center space-x-2 mt-1 text-xs ${
                              message.sender === user.name ? 'justify-end' : 'justify-start'
                            }`}>
                              <span className="text-gray-500">
                                {formatTime(message.timestamp)}
                              </span>
                              <span className={`px-2 py-1 rounded-full ${
                                message.sender === user.name 
                                  ? 'bg-pink-200 text-romantic-pink' 
                                  : `${messageTypes[message.type].bgColor} text-gray-600`
                              }`}>
                                {messageTypes[message.type].emoji} {messageTypes[message.type].label}
                              </span>
                            </div>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => deleteMessage(message.id)}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity p-1"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t border-pink-200 p-4 bg-white rounded-b-2xl">
                <form onSubmit={sendMessage} className="space-y-4">
                  {/* Message Type Selector */}
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {Object.entries(messageTypes).map(([key, value]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setMessageType(key)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
                          messageType === key
                            ? `bg-gradient-to-r ${value.color} text-white shadow-lg`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <span className="text-base">{value.emoji}</span>
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
                      <div className="flex justify-between items-center mt-1">
                        <div className="text-xs text-gray-500">
                          {newMessage.length}/500 characters
                        </div>
                        <div className="text-xs text-romantic-pink">
                          {messageTypes[messageType].emoji} {messageTypes[messageType].label}
                        </div>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="btn-primary self-end disabled:opacity-50 disabled:cursor-not-allowed px-8"
                    >
                      Send 💕
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Love Tips */}
            <div className="mt-6 p-4 bg-gradient-to-r from-romantic-pink to-romantic-rose rounded-2xl text-white text-center">
              <p className="font-playfair text-lg italic">
                "The best love messages come straight from the heart. Keep sharing your beautiful thoughts!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat