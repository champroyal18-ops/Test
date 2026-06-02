import React from 'react';
import { Bell, BellRing, Settings, Clock, CheckCircle2, AlertTriangle, ShieldCheck, Coffee, RefreshCw } from 'lucide-react';
import { TestAttempt } from '../types';

interface ReminderSystemProps {
  attempts: TestAttempt[];
  solvedToday: boolean;
  onSetViewTab: (tab: 'dashboard' | 'syllabus' | 'flashcards' | 'aits' | 'analytics') => void;
}

export default function ReminderSystem({
  attempts,
  solvedToday,
  onSetViewTab
}: ReminderSystemProps) {
  // Configuration stored in localStorage
  const [remindersEnabled, setRemindersEnabled] = React.useState<boolean>(() => {
    const val = localStorage.getItem('neet_reminders_enabled');
    return val !== 'false'; // default to true
  });

  const [reminderHour, setReminderHour] = React.useState<number>(() => {
    const val = localStorage.getItem('neet_reminder_hour');
    return val ? parseInt(val, 10) : 20; // default to 8 PM (20:00)
  });

  const [trackTrivia, setTrackTrivia] = React.useState<boolean>(() => {
    const val = localStorage.getItem('neet_track_trivia');
    return val !== 'false'; // default true
  });

  const [trackTest, setTrackTest] = React.useState<boolean>(() => {
    const val = localStorage.getItem('neet_track_test');
    return val !== 'false'; // default true
  });

  const [snoozedUntil, setSnoozedUntil] = React.useState<number>(() => {
    const val = localStorage.getItem('neet_reminder_snoozed_until');
    return val ? parseInt(val, 10) : 0;
  });

  const [notifPermission, setNotifPermission] = React.useState<string>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'unsupported';
  });

  const [showConfig, setShowConfig] = React.useState<boolean>(false);
  const [testNotifSent, setTestNotifSent] = React.useState<boolean>(false);

  // Time tracker state for active UI updating
  const [currentHour, setCurrentHour] = React.useState<number>(() => new Date().getHours());
  const [currentMinute, setCurrentMinute] = React.useState<number>(() => new Date().getMinutes());

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentHour(now.getHours());
      setCurrentMinute(now.getMinutes());
    }, 15000); // Check every 15s
    return () => clearInterval(interval);
  }, []);

  // Save changes to localStorage helper
  const updateSetting = (key: string, val: any, setter: (v: any) => void) => {
    setter(val);
    localStorage.setItem(key, String(val));
  };

  // Check if a test was completed today
  const testCompletedToday = React.useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    return attempts.some(att => att.dateStr.startsWith(todayStr));
  }, [attempts]);

  // Determine active task completion status
  const triviaPending = trackTrivia && !solvedToday;
  const testPending = trackTest && !testCompletedToday;
  const anythingPending = triviaPending || testPending;

  // Is past the configured daily reminder hour?
  const isPastReminderHour = currentHour >= reminderHour;

  // Has the user snoozed the alert for now?
  const isCurrentlySnoozed = Date.now() < snoozedUntil;

  // Active trigger checklist
  const shouldShowAlert = remindersEnabled && isPastReminderHour && anythingPending && !isCurrentlySnoozed;

  // Trigger Local HTML5 Notification
  const sendLocalNotification = (title: string, body: string) => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // Fallback high-contrast icon
          tag: 'neet-reminder', // uniquely tag to prevent duplicates
        });
      } catch (err) {
        console.warn('Native notification system failed fallback', err);
      }
    }
  };

  // Check and trigger automatic push reminder on startup if conditions match
  React.useEffect(() => {
    if (shouldShowAlert && notifPermission === 'granted') {
      const lastTriggerKey = `neet_last_notif_date_${new Date().toISOString().split('T')[0]}`;
      const alreadyTriggeredToday = localStorage.getItem(lastTriggerKey) === 'true';

      if (!alreadyTriggeredToday) {
        let text = 'Quick NCERT Revision Reminder! ';
        if (triviaPending && testPending) {
          text += 'You have both your daily biology boost trivia and test practice remaining.';
        } else if (triviaPending) {
          text += "You haven't solved today's NCERT biology boost trivia quiz yet.";
        } else {
          text += "You haven't attempted a mock/AITS diagnostic test exam today.";
        }

        sendLocalNotification('NEET AI Study Revision Alert 🎯', text);
        localStorage.setItem(lastTriggerKey, 'true');
      }
    }
  }, [shouldShowAlert, notifPermission, triviaPending, testPending]);

  // Request browser permission for notifications
  const handleRequestPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert('This modern browser environment does not support HTML5 desktop notifications.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotifPermission(permission);
    } catch (err) {
      console.error('Permission request failed', err);
    }
  };

  // Send interactive test notification
  const handleSendTestNotification = () => {
    if (notifPermission !== 'granted') {
      handleRequestPermission();
      return;
    }

    setTestNotifSent(true);
    sendLocalNotification(
      'NEET AI Revision Alert (Test Mode)',
      'Congratulations! Your browser has verified push channel notifications. Daily reminders will activate past your target hour.'
    );
    setTimeout(() => setTestNotifSent(false), 2000);
  };

  // Snooze reminders helper
  const handleSnooze = (hours: number) => {
    const resumeTime = Date.now() + (hours * 60 * 60 * 1000);
    updateSetting('neet_reminder_snoozed_until', resumeTime, setSnoozedUntil);
  };

  // Format hour helper (24h -> 12h representation)
  const formatHourLabel = (hr: number) => {
    if (hr === 0) return '12:00 AM (Midnight)';
    if (hr === 12) return '12:00 PM (Noon)';
    return hr > 12 ? `${hr - 12}:00 PM` : `${hr}:00 AM`;
  };

  return (
    <div 
      id="reminder-system-wrapper" 
      className={`rounded-2xl border transition-all duration-300 ${
        shouldShowAlert 
          ? 'bg-gradient-to-r from-rose-50 to-rose-100/70 border-rose-200 shadow-sm p-5 md:p-6 mb-6' 
          : 'bg-white border-slate-150 p-4 shadow-xs mb-6'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left Side: Header & Status Check info */}
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-xl shrink-0 ${
            shouldShowAlert 
              ? 'bg-rose-500 text-white animate-bounce' 
              : 'bg-indigo-50 text-indigo-650'
          }`}>
            {shouldShowAlert ? (
              <BellRing className="w-5 h-5" />
            ) : (
              <Bell className="w-5 h-5" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Daily Revision Reminders
              </h4>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                remindersEnabled ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {remindersEnabled ? 'Active Monitoring' : 'Disabled'}
              </span>
            </div>

            <p className="text-xs text-slate-550 leading-relaxed mt-1 max-w-xl">
              {shouldShowAlert ? (
                <span className="text-rose-700 font-semibold block">
                  ⚠️ It is past your target daily revision hour ({formatHourLabel(reminderHour)}). You have critical NCERT practices pending today!
                </span>
              ) : (
                <span>
                  Configured to scan diagnostic checklists at <strong className="text-slate-700 font-bold">{formatHourLabel(reminderHour)}</strong>. 
                  {!trackTrivia && !trackTest ? " Currently not tracking any specific checklists." : " Tracking: "}
                  {trackTrivia && 'Biology Boost Trivia'}
                  {trackTrivia && trackTest && ' & '}
                  {trackTest && 'Mock Exams'}
                </span>
              )}
            </p>

            {/* Micro Task Checklist display if anything pending */}
            {shouldShowAlert && (
              <div className="flex flex-wrap gap-2.5 mt-3">
                {triviaPending && (
                  <button 
                    onClick={() => {
                      const block = document.getElementById('daily-trivia-block');
                      if (block) block.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-rose-200 text-rose-800 text-[10px] font-extrabold rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
                    Pending Biology Boost Trivia →
                  </button>
                )}
                {testPending && (
                  <button 
                    onClick={() => onSetViewTab('aits')}
                    className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-rose-200 text-rose-800 text-[10px] font-extrabold rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
                    Attempt Mock Exam / AITS →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Quick Action buttons */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0 flex-wrap sm:flex-nowrap">
          {shouldShowAlert ? (
            <>
              <button
                onClick={() => handleSnooze(2)}
                className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-rose-200 rounded-lg text-xs font-bold text-rose-700 transition flex items-center gap-1 cursor-pointer flex-1 sm:flex-none"
              >
                <Coffee className="w-3.5 h-3.5 text-rose-600" /> Snooze 2h
              </button>
              <button
                onClick={() => handleSnooze(24)}
                className="px-3 py-1.5 bg-rose-600 hover:bg-slate-900 text-white rounded-lg text-xs font-black transition cursor-pointer flex-1 sm:flex-none text-center"
              >
                Done for today
              </button>
            </>
          ) : (
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              {/* If tasks already completed, celebrate */}
              {!anythingPending && remindersEnabled && (
                <span className="hidden md:flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Today's Goal Complete!
                </span>
              )}
            </div>
          )}

          <button
            onClick={() => setShowConfig(!showConfig)}
            className={`p-2 border rounded-xl transition ${
              showConfig 
                ? 'bg-slate-100 border-slate-300 text-slate-700' 
                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800'
            }`}
            title="Configure Reminders"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expanded Configurations Panel */}
      {showConfig && (
        <div className="mt-4 pt-4 border-t border-slate-150 space-y-4 text-slate-700 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Column 1: Time selection & General Switch */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500 block">
                General Preferences
              </label>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={remindersEnabled}
                    onChange={(e) => updateSetting('neet_reminders_enabled', e.target.checked, setRemindersEnabled)}
                    className="rounded border-slate-250 text-indigo-600 focus:ring-indigo-500"
                  />
                  Enable Daily Revision Reminders
                </label>

                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-600">Select target time:</span>
                  <select
                    value={reminderHour}
                    onChange={(e) => updateSetting('neet_reminder_hour', parseInt(e.target.value, 10), setReminderHour)}
                    className="p-1 bg-slate-50 rounded border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none"
                    disabled={!remindersEnabled}
                  >
                    {Array.from({ length: 16 }).map((_, i) => {
                      const hr = i + 7; // Hours 7 AM to 10 PM (22)
                      return (
                        <option key={hr} value={hr}>
                          {formatHourLabel(hr)}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            {/* Column 2: Trackers configuration */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500 block">
                Tasks To Track
              </label>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={trackTrivia}
                    onChange={(e) => updateSetting('neet_track_trivia', e.target.checked, setTrackTrivia)}
                    className="rounded border-slate-250 text-indigo-600 focus:ring-indigo-500"
                    disabled={!remindersEnabled}
                  />
                  Check Daily Trivia Quiz solved state
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={trackTest}
                    onChange={(e) => updateSetting('neet_track_test', e.target.checked, setTrackTest)}
                    className="rounded border-slate-250 text-indigo-600 focus:ring-indigo-500"
                    disabled={!remindersEnabled}
                  />
                  Check Mock Diagnostic Test attempted state
                </label>
              </div>
            </div>

            {/* Column 3: Browser Push Notifications */}
            <div className="space-y-3 bg-indigo-50/50 rounded-xl p-3.5 border border-indigo-100">
              <label className="text-[10px] uppercase font-bold tracking-widest text-indigo-800 block">
                HTML5 Browser Push
              </label>

              <div className="space-y-2">
                {notifPermission === 'supported' || notifPermission === 'default' ? (
                  <div className="space-y-2">
                    <p className="text-[11px] text-indigo-650 leading-relaxed font-sans">
                      Request permission to send push reminders to your desktop or mobile even when this tab is nested.
                    </p>
                    <button
                      onClick={handleRequestPermission}
                      className="w-full py-1.5 px-3 bg-indigo-600 hover:bg-slate-900 text-white text-xs font-black rounded-lg transition"
                    >
                      Authorize Push Alerts
                    </button>
                  </div>
                ) : notifPermission === 'granted' ? (
                  <div className="space-y-2">
                    <span className="text-[10px] text-emerald-700 font-extrabold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-150">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> Native Alerts Subscribed!
                    </span>
                    <button
                      onClick={handleSendTestNotification}
                      className="w-full py-1 px-3 border border-indigo-200 text-indigo-750 bg-white hover:bg-indigo-50 text-[10px] font-bold rounded-lg transition flex items-center justify-center gap-1.5"
                    >
                      {testNotifSent ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Sent successfully!
                        </>
                      ) : (
                        'Trigger Test Local Notification'
                      )}
                    </button>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Notifications are {notifPermission === 'denied' ? 'permanently blocked by your browser settings.' : 'not supported in this environment.'} Refresh permission settings in your address bar to re-authorize.
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
