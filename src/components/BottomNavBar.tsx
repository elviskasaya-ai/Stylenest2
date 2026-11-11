import { 
  Home, 
  Calendar as CalendarIcon,
  GraduationCap, 
  Trophy, 
  Award,
  MessageSquare 
} from 'lucide-react';

export type TabId = 'dashboard' | 'calendar' | 'academics' | 'activities' | 'gamification' | 'messages';

interface Props {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  unreadMessagesCount: number;
  unacknowledgedAlertsCount: number;
}

export function BottomNavBar({
  activeTab,
  onSelectTab,
  unreadMessagesCount,
  unacknowledgedAlertsCount
}: Props) {
  const tabs = [
    {
      id: 'dashboard' as TabId,
      label: 'Home',
      icon: Home
    },
    {
      id: 'calendar' as TabId,
      label: 'Calendar',
      icon: CalendarIcon
    },
    {
      id: 'academics' as TabId,
      label: 'Grades',
      icon: GraduationCap
    },
    {
      id: 'activities' as TabId,
      label: 'Activities',
      icon: Trophy
    },
    {
      id: 'gamification' as TabId,
      label: 'Ranks & XP',
      icon: Award
    },
    {
      id: 'messages' as TabId,
      label: 'Portal',
      icon: MessageSquare,
      badge: unreadMessagesCount
    }
  ];

  return (
    <nav className="fixed sm:sticky bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800/80 px-1.5 pb-safe pt-1.5 transition-colors">
      <div className="grid grid-cols-6 items-center max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex flex-col items-center justify-center min-h-[46px] py-1 px-0.5 rounded-xl transition-all ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-normal'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-4.5 h-4.5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'scale-100 stroke-[1.8]'
                  }`}
                />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 min-w-3.5 h-3.5 px-0.5 rounded-full bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </span>
                ) : null}
              </div>
              <span
                className={`text-[9.5px] tracking-tight mt-1 truncate max-w-full leading-tight ${
                  isActive ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
