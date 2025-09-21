import React from 'react';

const QuickActions = ({ onActionClick, userProfile }) => {
  const getQuickActions = () => {
    if (!userProfile?.stream) {
      return [
        {
          id: 'take-quiz',
          text: '📊 Take Career Quiz',
          action: 'navigate',
          target: '/quiz'
        },
        {
          id: 'explore-careers',
          text: '🎯 Explore Careers',
          query: 'What are different career options available?'
        },
        {
          id: 'college-info',
          text: '🏫 College Information',
          query: 'Tell me about top colleges for different streams'
        },
        {
          id: 'help',
          text: '❓ How can you help me?',
          query: 'What can you help me with?'
        }
      ];
    }

    // Stream-specific quick actions
    const streamActions = {
      'Science': [
        {
          id: 'engineering-colleges',
          text: '⚙️ Engineering Colleges',
          query: `Show me top engineering colleges`
        },
        {
          id: 'medical-colleges',
          text: '🏥 Medical Colleges',
          query: `Tell me about medical colleges and admission process`
        },
        {
          id: 'research-careers',
          text: '🔬 Research Careers',
          query: `What are research career options in science?`
        }
      ],
      'Commerce': [
        {
          id: 'business-colleges',
          text: '💼 Business Colleges',
          query: `Show me top business and commerce colleges`
        },
        {
          id: 'finance-careers',
          text: '💰 Finance Careers',
          query: `What are career options in finance and banking?`
        },
        {
          id: 'entrepreneurship',
          text: '🚀 Entrepreneurship',
          query: `Tell me about starting my own business`
        }
      ],
      'Arts': [
        {
          id: 'arts-colleges',
          text: '🎨 Arts Colleges',
          query: `Show me colleges for arts and humanities`
        },
        {
          id: 'creative-careers',
          text: '🎭 Creative Careers',
          query: `What are creative career options in arts?`
        },
        {
          id: 'civil-services',
          text: '🏛️ Civil Services',
          query: `Tell me about civil services and government jobs`
        }
      ]
    };

    const baseActions = [
      {
        id: 'my-recommendations',
        text: '✨ My Recommendations',
        query: `Show me personalized recommendations for ${userProfile.stream} stream`
      },
      {
        id: 'admission-help',
        text: '📝 Admission Help',
        query: 'Help me with college admission process'
      }
    ];

    return [
      ...baseActions,
      ...(streamActions[userProfile.stream] || streamActions['Science'])
    ];
  };

  const handleActionClick = (action) => {
    if (action.action === 'navigate') {
      // Handle navigation
      if (onActionClick) {
        onActionClick({ type: 'navigate', target: action.target });
      }
    } else if (action.query) {
      // Handle query
      if (onActionClick) {
        onActionClick({ type: 'query', text: action.query });
      }
    }
  };

  const quickActions = getQuickActions();

  return (
    <div className="quick-actions">
      <div className="quick-actions-header">
        <span className="quick-actions-title">Quick Actions</span>
        <span className="quick-actions-subtitle">Get instant help</span>
      </div>
      
      <div className="quick-actions-grid">
        {quickActions.map((action) => (
          <button
            key={action.id}
            className="quick-action-btn"
            onClick={() => handleActionClick(action)}
            title={action.query || action.text}
          >
            <span className="quick-action-text">{action.text}</span>
          </button>
        ))}
      </div>
      
      <div className="quick-actions-footer">
        <p className="quick-actions-note">
          💡 You can also type your questions directly
        </p>
      </div>
    </div>
  );
};

export default QuickActions;