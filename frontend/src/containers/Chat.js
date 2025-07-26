import React, { useState, useEffect, useRef } from 'react';

const Chat = () => {
  const [chatState, setChatState] = useState({ messages: [] });
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, isLoading]);

  const formatMessage = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background-color: #003300; color: #00ff00; padding: 2px 4px; border-radius: 3px;">$1</code>');
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { role: 'user', content: inputMessage };
    setChatState(prev => ({
      messages: [...prev.messages, userMessage]
    }));

    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...chatState.messages, userMessage] })
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      if (data.messages && data.messages.length > 0) {
        const lastMessage = data.messages[data.messages.length - 1];
        if (lastMessage.role === 'assistant') {
          setChatState(prev => ({
            messages: [...prev.messages, lastMessage]
          }));
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setChatState(prev => ({
        messages: [...prev.messages, { role: 'assistant', content: 'Error: Unable to connect to AI service.' }]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      fontFamily: '"Courier New", "Monaco", "Menlo", monospace',
      color: '#00ff00',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '15px'
      }}>
        
        {/* Terminal Header */}
        <div style={{
          marginBottom: '20px',
          padding: '15px 20px',
          backgroundColor: '#001100',
          border: '2px solid #00ff00',
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
          textAlign: 'left'
        }}>
          <div style={{
            fontSize: '0.95rem',
            color: '#00ff00',
            fontWeight: 'bold',
            marginBottom: '6px',
            textShadow: '0 0 3px #00ff00'
          }}>
            {'>'} GRAPHMIND_AI_TERMINAL v2.1.0 [BETA]
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: '#00cc00',
            opacity: 0.8
          }}>
            {'>'} SYSTEM STATUS: ONLINE | AI_ENGINE: ACTIVE | SECURITY: ENABLED
          </div>
        </div>
        
        {/* Terminal Screen */}
        <div style={{
          height: '700px',
          backgroundColor: '#001100',
          border: '2px solid #00ff00',
          padding: '30px',
          marginBottom: '15px',
          boxShadow: '0 0 15px rgba(0, 255, 0, 0.15), inset 0 0 20px rgba(0, 255, 0, 0.05)',
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {chatState.messages.length === 0 ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'left'
              }}>
                <div style={{
                  color: '#00ff00',
                  fontSize: '0.85rem',
                  lineHeight: '1.2',
                  textAlign: 'left'
                }}>
                  <div style={{ marginBottom: '10px' }}>╔════════════════════════════════════════╗</div>
                  <div style={{ marginBottom: '10px' }}>║     GRAPHMIND AI TERMINAL v2.1.0       ║</div>
                  <div style={{ marginBottom: '10px' }}>║                                        ║</div>
                  <div style={{ marginBottom: '10px' }}>║  {'>'} Initializing AI subsystems...       ║</div>
                  <div style={{ marginBottom: '10px' }}>║  {'>'} LangGraph engine: LOADED            ║</div>
                  <div style={{ marginBottom: '10px' }}>║  {'>'} Neural networks: ACTIVE             ║</div>
                  <div style={{ marginBottom: '10px' }}>║  {'>'} Security protocols: ENABLED         ║</div>
                  <div style={{ marginBottom: '10px' }}>║                                        ║</div>
                  <div style={{ marginBottom: '10px' }}>║  Type your message to begin...         ║</div>
                  <div style={{ marginBottom: '10px' }}>╚════════════════════════════════════════╝</div>
                  <div style={{ 
                    marginTop: '12px', 
                    animation: 'blink 1s infinite',
                    fontSize: '0.9rem'
                  }}>█</div>
                </div>
              </div>
            ) : (
              chatState.messages.map((message, index) => (
                <div key={index} style={{
                  marginBottom: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    marginBottom: '3px',
                    color: message.role === 'user' ? '#00ffff' : '#00ff00'
                  }}>
                    {message.role === 'user' ? '> USER@terminal:~$' : '> AI_SYSTEM@graphmind:~$'}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    lineHeight: '1.2',
                    whiteSpace: 'pre-wrap',
                    color: message.role === 'user' ? '#00ffff' : '#00ff00',
                    textShadow: message.role === 'user' ? '0 0 2px #00ffff' : '0 0 2px #00ff00',
                    fontFamily: '"Courier New", monospace'
                  }}>
                    {message.role === 'assistant' ? (
                      <div dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }} />
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div style={{
                marginBottom: '15px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  marginBottom: '3px',
                  color: '#00ff00'
                }}>
                  {'>'} AI_SYSTEM@graphmind:~$
                </div>
                <div style={{
                  color: '#00ff00',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <div style={{
                    color: '#00ff00',
                    animation: 'blink 1s infinite'
                  }}>█</div>
                  <span>PROCESSING...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} style={{ height: '1px' }} />
          </div>
        </div>
        
        {/* Terminal Input */}
        <div style={{
          backgroundColor: '#001100',
          border: '2px solid #00ff00',
          padding: '15px',
          boxShadow: '0 0 8px rgba(0, 255, 0, 0.2)',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <span style={{ color: '#00ff00', fontWeight: 'bold' }}>{'>'}</span>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type command..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: 'none',
              fontSize: '0.85rem',
              backgroundColor: '#000000',
              color: '#00ff00',
              outline: 'none',
              fontFamily: '"Courier New", monospace',
              textShadow: '0 0 2px #00ff00'
            }}
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            style={{
              padding: '8px 16px',
              border: '1px solid #00ff00',
              backgroundColor: isLoading || !inputMessage.trim() ? '#002200' : '#003300',
              color: isLoading || !inputMessage.trim() ? '#006600' : '#00ff00',
              fontSize: '0.85rem',
              fontWeight: 'bold',
              cursor: isLoading || !inputMessage.trim() ? 'not-allowed' : 'pointer',
              fontFamily: '"Courier New", monospace',
              textShadow: '0 0 2px #00ff00'
            }}
          >
            {isLoading ? 'TRANSMITTING...' : 'EXECUTE'}
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #000000;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #00ff00;
          border: 1px solid #003300;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #00cc00;
        }
      `}</style>
    </div>
  );
};

export default Chat;
