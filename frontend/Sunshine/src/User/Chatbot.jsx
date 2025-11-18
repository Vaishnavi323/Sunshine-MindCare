// components/ChatBot.js
import React, { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm your mental health assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Predefined quick actions
    const quickActions = [
        { title: 'Book Appointment', icon: '📅', type: 'appointment' },
        { title: 'Our Services', icon: '🩺', type: 'services' },
        { title: 'Blog Articles', icon: '📚', type: 'blog' },
        { title: 'Expert Columns', icon: '📝', type: 'columns' },
        { title: 'Emergency Help', icon: '🆘', type: 'emergency' },
        { title: 'Contact Info', icon: '📞', type: 'contact' }
    ];

    // Services data
    const services = [
        'Individual Therapy Sessions',
        'Couples Counseling',
        'Family Therapy',
        'Child & Adolescent Psychology',
        'Trauma Recovery',
        'Anxiety & Depression Treatment',
        'Career Counseling',
        'Addiction Recovery'
    ];

    // Blog categories
    const blogCategories = [
        'Mental Health Awareness',
        'Self-Care Tips',
        'Relationship Advice',
        'Parenting Guidance',
        'Stress Management',
        'Mindfulness Practices'
    ];

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Simulate bot typing
    const simulateTyping = (callback) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            callback();
        }, 1000 + Math.random() * 1000);
    };

    // Add message to chat
    const addMessage = (text, sender) => {
        const newMessage = {
            id: messages.length + 1,
            text,
            sender,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
    };

    // Handle quick action clicks
    const handleQuickAction = (action) => {
        addMessage(`I'd like to know about ${action.title.toLowerCase()}`, 'user');
        
        simulateTyping(() => {
            switch (action.type) {
                case 'appointment':
                    addMessage(`To book an appointment:\n\n• Call us at: +91 9607899660\n• Email: appointment@sunshinemindcare.com\n• Visit our booking page: www.sunshinemindcare.com/book\n• Office hours: Mon-Sat, 9 AM - 7 PM`, 'bot');
                    break;
                
                case 'services':
                    addMessage(`Our mental health services include:\n\n${services.map(service => `• ${service}`).join('\n')}\n\nWhich service are you interested in?`, 'bot');
                    break;
                
                case 'blog':
                    addMessage(`Explore our blog categories:\n\n${blogCategories.map(cat => `• ${cat}`).join('\n')}\n\nVisit: www.sunshinemindcare.com/blog`, 'bot');
                    break;
                
                case 'columns':
                    addMessage(`Our expert columns cover:\n\n• Mental Health Insights by Dr. Hemant\n• Parenting Tips by Ms. Anjali\n• Career Guidance by Mr. Vikram\n• Child Psychology by Mr. Rahul\n\nRead at: www.sunshinemindcare.com/columns`, 'bot');
                    break;
                
                case 'emergency':
                    addMessage(`🚨 Emergency Contacts:\n\n• National Mental Health Helpline: 1800-599-0019\n• Crisis Support: 022 2754 6666\n• Immediate Assistance: Call 112\n• Our Emergency Line: +91 9607899660\n\nPlease reach out if you need immediate help!`, 'bot');
                    break;
                
                case 'contact':
                    addMessage(`📞 Contact Information:\n\n• Main Line: +91 9607899660\n• Email: help@sunshinemindcare.com\n• Address: Sunshine Mind Care Center, Mumbai\n• Website: www.sunshinemindcare.com\n\nWe're here to help you!`, 'bot');
                    break;
                
                default:
                    addMessage(`How can I assist you with ${action.title.toLowerCase()}?`, 'bot');
            }
        });
    };

    // Handle user message
    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return;

        addMessage(inputMessage, 'user');
        setInputMessage('');

        simulateTyping(() => {
            // Simple response logic - you can make this more sophisticated
            const userMessage = inputMessage.toLowerCase();
            
            if (userMessage.includes('appointment') || userMessage.includes('book')) {
                addMessage('To book an appointment, call +91 9607899660 or email appointment@sunshinemindcare.com. Our team will get back to you within 24 hours.', 'bot');
            } else if (userMessage.includes('service') || userMessage.includes('therapy')) {
                addMessage(`We offer various services including:\n${services.slice(0, 4).map(s => `• ${s}`).join('\n')}\n\nWould you like to know more about any specific service?`, 'bot');
            } else if (userMessage.includes('blog') || userMessage.includes('article')) {
                addMessage('Check out our latest articles at www.sunshinemindcare.com/blog. We cover topics like mental wellness, relationships, and self-care.', 'bot');
            } else if (userMessage.includes('emergency') || userMessage.includes('urgent')) {
                addMessage('For urgent help, call our emergency line: +91 9607899660 or national helpline: 1800-599-0019', 'bot');
            } else if (userMessage.includes('hello') || userMessage.includes('hi')) {
                addMessage('Hello! 👋 I am here to help you navigate our mental health services, blogs, and resources. How can I assist you today?', 'bot');
            } else {
                addMessage('I understand you\'re looking for help. You can:\n• Book an appointment with our experts\n• Explore our mental health services\n• Read our blog articles\n• Contact us directly\n\nHow would you like to proceed?', 'bot');
            }
        });
    };

    // Handle key press (Enter key)
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Clear chat history
    const clearChat = () => {
        setMessages([
            {
                id: 1,
                text: "Hello! I'm your mental health assistant. How can I help you today?",
                sender: 'bot',
                timestamp: new Date()
            }
        ]);
    };

    return (
        <>
            <style>{`
                .chatbot-container {
                    position: fixed ;
                    bottom: 20px;
                    left: 30px;
                    z-index: 10000;
                    font-family: 'Montserrat', sans-serif;
                }

                /* Chat Bot Button */
                .chatbot-button {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #ffa726, #ff9800);
                    border: none;
                    color: white;
                    font-size: 28px;
                    cursor: pointer;
                    box-shadow: 0 8px 30px rgba(255, 167, 38, 0.4);
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: float 3s ease-in-out infinite;
                }

                .chatbot-button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 12px 40px rgba(255, 167, 38, 0.6);
                }

                /* Chat Window */
                .chatbot-window {
                    position: absolute;
                    bottom: 70px;
                    left: 0px;
                    width: 380px;
                    height: 600px;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    animation: slideUp 0.3s ease;
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Chat Header */
                .chat-header {
                    background: linear-gradient(135deg, #1f1f35ff 0%, #174593ff 100%);
                    color: white;
                    padding: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .chat-title {
                    font-weight: 700;
                    font-size: 1.2rem;
                }

                .chat-actions button {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    padding: 8px;
                    border-radius: 50%;
                    cursor: pointer;
                    margin-left: 10px;
                    transition: background 0.3s ease;
                }

                .chat-actions button:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                /* Messages Area */
                .chat-messages {
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                    background: #f8f9fa;
                }

                .message {
                    margin-bottom: 15px;
                    display: flex;
                    animation: messageSlide 0.3s ease;
                }

                @keyframes messageSlide {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .message.user {
                    justify-content: flex-end;
                }

                .message.bot {
                    justify-content: flex-start;
                }

                .message-bubble {
                    max-width: 80%;
                    padding: 12px 16px;
                    border-radius: 18px;
                    font-size: 0.9rem;
                    line-height: 1.4;
                    white-space: pre-line;
                }

                .message.user .message-bubble {
                    background: linear-gradient(135deg, #174593, #1f1f35);
                    color: white;
                    border-bottom-right-radius: 4px;
                }

                .message.bot .message-bubble {
                    background: white;
                    color: #333;
                    border: 1px solid #e0e0e0;
                    border-bottom-left-radius: 4px;
                }

                /* Quick Actions */
                .quick-actions {
                    padding: 15px 20px;
                    background: white;
                    border-bottom: 1px solid #e0e0e0;
                }

                .quick-actions-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 10px;
                }

                .quick-action-btn {
                    background: #f8f9fa;
                    border: 1px solid #e0e0e0;
                    border-radius: 10px;
                    padding: 10px;
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .quick-action-btn:hover {
                    background: #174593;
                    color: white;
                    transform: translateY(-2px);
                }

                /* Input Area */
                .chat-input-area {
                    padding: 20px;
                    background: white;
                    border-top: 1px solid #e0e0e0;
                    display: flex;
                    gap: 10px;
                }

                .chat-input {
                    flex: 1;
                    padding: 12px 16px;
                    border: 1px solid #e0e0e0;
                    border-radius: 25px;
                    outline: none;
                    font-size: 0.9rem;
                    resize: none;
                    max-height: 100px;
                }

                .chat-input:focus {
                    border-color: #174593;
                }

                .send-button {
                    background: linear-gradient(135deg, #ffa726, #ff9800);
                    border: none;
                    color: white;
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }

                .send-button:hover {
                    transform: scale(1.1);
                }

                .send-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }

                /* Typing Indicator */
                .typing-indicator {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    padding: 12px 16px;
                    background: white;
                    border-radius: 18px;
                    border: 1px solid #e0e0e0;
                    max-width: 80px;
                }

                .typing-dot {
                    width: 8px;
                    height: 8px;
                    background: #999;
                    border-radius: 50%;
                    animation: typingBounce 1.4s infinite ease-in-out;
                }

                .typing-dot:nth-child(1) { animation-delay: -0.32s; }
                .typing-dot:nth-child(2) { animation-delay: -0.16s; }

                @keyframes typingBounce {
                    0%, 80%, 100% {
                        transform: scale(0.8);
                        opacity: 0.5;
                    }
                    40% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                /* Scrollbar Styling */
                .chat-messages::-webkit-scrollbar {
                    width: 6px;
                }

                .chat-messages::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                .chat-messages::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 3px;
                }

                .chat-messages::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }

                /* Responsive Design */
                @media (max-width: 480px) {
                    .chatbot-container {
                        bottom: 20px;
                        right: 20px;
                    }

                    .chatbot-window {
                        width: 350px;
                        height: 500px;
                        right: -10px;
                    }

                    .chatbot-button {
                        width: 60px;
                        height: 60px;
                        font-size: 24px;
                    }
                }
            `}</style>

            <div className="chatbot-container">
                {/* Chat Button */}
                <button 
                    className="chatbot-button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    💬
                </button>

                {/* Chat Window */}
                {isOpen && (
                    <div className="chatbot-window">
                        {/* Header */}
                        <div className="chat-header">
                            <div className="chat-title">
                                Mental Health Assistant
                            </div>
                            <div className="chat-actions">
                                <button onClick={clearChat} title="Clear chat">
                                    🗑️
                                </button>
                                <button onClick={() => setIsOpen(false)} title="Close">
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="quick-actions">
                            <div className="quick-actions-grid">
                                {quickActions.map((action, index) => (
                                    <button
                                        key={index}
                                        className="quick-action-btn"
                                        onClick={() => handleQuickAction(action)}
                                    >
                                        <span>{action.icon}</span>
                                        {action.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="chat-messages">
                            {messages.map((message) => (
                                <div key={message.id} className={`message ${message.sender}`}>
                                    <div className="message-bubble">
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                            
                            {isTyping && (
                                <div className="message bot">
                                    <div className="typing-indicator">
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                    </div>
                                </div>
                            )}
                            
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="chat-input-area">
                            <textarea
                                className="chat-input"
                                placeholder="Type your message here..."
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                rows="1"
                            />
                            <button 
                                className="send-button"
                                onClick={handleSendMessage}
                                disabled={!inputMessage.trim()}
                            >
                                📤
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ChatBot;