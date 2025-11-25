import { useState, useEffect } from 'react';
import { ArrowLeft, Crown, CheckCircle, Bookmark } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { getFaithTraditions } from '../utils/faithEncouragement';
import { GUIDANCE_VOICES } from '../utils/guidanceVoices';

interface SettingsPageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export function SettingsPage({ onBack, onNavigate }: SettingsPageProps) {
  const { subscription, isPro } = useSubscription();
  const { user } = useAuth();
  const [faithEnabled, setFaithEnabled] = useState(false);
  const [selectedFaith, setSelectedFaith] = useState<string>('');
  const [selectedVoice, setSelectedVoice] = useState<string>('gentle_therapist');
  const [teenMode, setTeenMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const faithTraditions = getFaithTraditions();

  useEffect(() => {
    loadFaithPreferences();
  }, [user]);

  const loadFaithPreferences = async () => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from('user_preferences')
      .select('faith_support_enabled, faith_tradition, guidance_voice, teen_mode')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data) {
      setFaithEnabled(data.faith_support_enabled || false);
      setSelectedFaith(data.faith_tradition || '');
      setSelectedVoice(data.guidance_voice || 'gentle_therapist');
      setTeenMode(data.teen_mode || false);
    }
  };

  const saveFaithPreferences = async () => {
    if (!user?.id) return;

    setSaving(true);
    setSaveMessage('');

    const { data: existing } = await supabase
      .from('user_preferences')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from('user_preferences')
        .update({
          faith_support_enabled: faithEnabled,
          faith_tradition: selectedFaith,
          guidance_voice: selectedVoice,
          teen_mode: teenMode,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating faith preferences:', error);
        setSaveMessage('Failed to save preferences');
      } else {
        setSaveMessage('Preferences saved successfully');
      }
    } else {
      const { error } = await supabase
        .from('user_preferences')
        .insert({
          user_id: user.id,
          faith_support_enabled: faithEnabled,
          faith_tradition: selectedFaith,
          guidance_voice: selectedVoice,
          teen_mode: teenMode,
        });

      if (error) {
        console.error('Error creating faith preferences:', error);
        setSaveMessage('Failed to save preferences');
      } else {
        setSaveMessage('Preferences saved successfully');
      }
    }

    setSaving(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Settings</h2>

          <div className="space-y-8">
            {onNavigate && (
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
                <button
                  onClick={() => onNavigate('saved-tools')}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg hover:from-teal-100 hover:to-blue-100 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Bookmark className="w-5 h-5 text-teal-600" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Saved Tools</div>
                      <div className="text-sm text-gray-600">View your saved wellness tools</div>
                    </div>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transform rotate-180 transition-colors" />
                </button>
              </div>
            )}

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription & Billing</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {isPro && <Crown className="w-5 h-5 text-amber-500" />}
                      <span className="font-semibold text-gray-900">
                        {isPro ? 'Pro Plan' : 'Free Plan'}
                      </span>
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                        subscription?.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {subscription?.status || 'active'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {isPro
                        ? 'Access to all premium features'
                        : 'Upgrade to unlock advanced features'
                      }
                    </p>
                  </div>
                  {onNavigate && !isPro && (
                    <button
                      onClick={() => onNavigate('pricing')}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                    >
                      Upgrade
                    </button>
                  )}
                  {onNavigate && isPro && (
                    <button
                      onClick={() => onNavigate('pricing')}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Manage
                    </button>
                  )}
                </div>

                {subscription && (
                  <div className="p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan Type:</span>
                      <span className="font-medium text-gray-900">{subscription.tier === 'pro' ? 'Pro ($9.99/month)' : 'Free ($0.00)'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium text-gray-900 capitalize">{subscription.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Started:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(subscription.started_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    {subscription.expires_at && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Renews:</span>
                        <span className="font-medium text-gray-900">
                          {new Date(subscription.expires_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {!isPro && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>Upgrade to Pro</strong> to unlock AI Coaching, unlimited journal history, voice journaling, advanced insights, PDF exports, and more!
                    </p>
                  </div>
                )}

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs text-amber-900">
                    <strong>Note:</strong> Payment processing is coming soon. All features are currently available to all users during the preview period.
                  </p>
                </div>
              </div>
            </div>

            <ThemeSelector />

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Teen/Youth Mode</h3>
              <p className="text-sm text-gray-600 mb-4">
                Enable age-appropriate language, school-specific support, and resources tailored for younger users
              </p>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎓</span>
                  <div>
                    <div className="font-semibold text-gray-900">Youth Mode</div>
                    <div className="text-sm text-gray-600">
                      {teenMode ? 'Enabled - Teen-friendly language active' : 'Disabled - Standard mode'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setTeenMode(!teenMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    teenMode ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      teenMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              {teenMode && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-900">
                    <strong>Youth Mode includes:</strong> Teen-appropriate language, school counselor resources, bullying support, academic stress tools, and age-specific crisis hotlines.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Guidance Voice</h3>
              <p className="text-sm text-gray-600 mb-4">
                Choose the personality style for your emotional guidance
              </p>
              <div className="grid gap-3">
                {GUIDANCE_VOICES.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => setSelectedVoice(voice.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedVoice === voice.id
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200 bg-white hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{voice.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">{voice.name}</h4>
                          {selectedVoice === voice.id && (
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{voice.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Faith Preferences</h3>
              <p className="text-sm text-gray-600 mb-6">
                If you'd like, LifeZinc can show optional verses and spiritual reflections that match how you're feeling. You can turn this off anytime.
              </p>
              <div className="space-y-4">
                <div className="grid gap-3">
                  <button
                    onClick={() => {
                      setFaithEnabled(true);
                      setSelectedFaith('christianity');
                    }}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      faithEnabled && selectedFaith === 'christianity'
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-gray-200 bg-white hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">✝</span>
                        <div>
                          <div className="font-semibold text-gray-900">Christian – Bible</div>
                          <div className="text-sm text-gray-600">Verses from the Bible</div>
                        </div>
                      </div>
                      {faithEnabled && selectedFaith === 'christianity' && (
                        <CheckCircle className="w-5 h-5 text-teal-600" />
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setFaithEnabled(true);
                      setSelectedFaith('islam');
                    }}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      faithEnabled && selectedFaith === 'islam'
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-gray-200 bg-white hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">☪</span>
                        <div>
                          <div className="font-semibold text-gray-900">Muslim – Qur'an</div>
                          <div className="text-sm text-gray-600">Verses from the Qur'an</div>
                        </div>
                      </div>
                      {faithEnabled && selectedFaith === 'islam' && (
                        <CheckCircle className="w-5 h-5 text-teal-600" />
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setFaithEnabled(true);
                      setSelectedFaith('judaism');
                    }}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      faithEnabled && selectedFaith === 'judaism'
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-gray-200 bg-white hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">✡</span>
                        <div>
                          <div className="font-semibold text-gray-900">Jewish – Torah</div>
                          <div className="text-sm text-gray-600">Verses from the Torah and Tanakh</div>
                        </div>
                      </div>
                      {faithEnabled && selectedFaith === 'judaism' && (
                        <CheckCircle className="w-5 h-5 text-teal-600" />
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setFaithEnabled(true);
                      setSelectedFaith('hinduism');
                    }}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      faithEnabled && selectedFaith === 'hinduism'
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-gray-200 bg-white hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🕉</span>
                        <div>
                          <div className="font-semibold text-gray-900">Hindu – Vedas & Bhagavad Gita</div>
                          <div className="text-sm text-gray-600">Verses from Hindu scriptures</div>
                        </div>
                      </div>
                      {faithEnabled && selectedFaith === 'hinduism' && (
                        <CheckCircle className="w-5 h-5 text-teal-600" />
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setFaithEnabled(true);
                      setSelectedFaith('buddhism');
                    }}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      faithEnabled && selectedFaith === 'buddhism'
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-gray-200 bg-white hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">☸</span>
                        <div>
                          <div className="font-semibold text-gray-900">Buddhist – Dhammapada</div>
                          <div className="text-sm text-gray-600">Teachings from Buddhist texts</div>
                        </div>
                      </div>
                      {faithEnabled && selectedFaith === 'buddhism' && (
                        <CheckCircle className="w-5 h-5 text-teal-600" />
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setFaithEnabled(true);
                      setSelectedFaith('other');
                    }}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      faithEnabled && selectedFaith === 'other'
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-gray-200 bg-white hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🌟</span>
                        <div>
                          <div className="font-semibold text-gray-900">Other / Not listed</div>
                          <div className="text-sm text-gray-600">General spiritual content</div>
                        </div>
                      </div>
                      {faithEnabled && selectedFaith === 'other' && (
                        <CheckCircle className="w-5 h-5 text-teal-600" />
                      )}
                    </div>
                  </button>
                </div>

                <button
                  onClick={saveFaithPreferences}
                  disabled={saving}
                  className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full hover:from-teal-600 hover:to-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all font-semibold shadow-lg"
                >
                  {saving ? 'Saving...' : 'Save Preferences'}
                </button>

                {saveMessage && (
                  <div className="p-3 bg-teal-100 border border-teal-200 rounded-full text-teal-800 text-sm text-center font-medium">
                    {saveMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
