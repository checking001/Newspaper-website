'use client'

import React, { useState } from 'react'

interface Tab {
  label: string
  content: React.ReactNode
  id: string
}

interface TabsProps {
  tabs: Tab[]
  defaultTabId?: string
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  className = ''
}) => {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id)

  const activeTab = tabs.find(tab => tab.id === activeTabId)

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className='flex flex-wrap border-b border-[var(--color-border)] gap-[var(--spacing-4)] overflow-x-auto'>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`px-[var(--padding-md)] py-[var(--padding-sm)] font-semibold text-[var(--font-size-base)] transition-colors border-b-2 ${
              activeTabId === tab.id
                ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
            role='tab'
            aria-selected={activeTabId === tab.id}
            aria-controls={`panel-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        id={`panel-${activeTabId}`}
        role='tabpanel'
        className='mt-[var(--spacing-4)] animate-fadeIn'
      >
        {activeTab?.content}
      </div>
    </div>
  )
}

export default Tabs
