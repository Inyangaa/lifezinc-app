import { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Award, Heart, CheckCircle, WifiOff, Send, Baby, User, BookOpen, Target } from 'lucide-react';
import { getRandomReframe } from '../utils/reframeMessages';
import { MoodSelector } from './MoodSelector';
import { VoiceInput } from './VoiceInput';
import { TagSelector } from './TagSelector';
import { SOSButton } from './SOSButton';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { updateUserStreak, checkAndAwardAchievements } from '../utils/streakManager';
import { detectEmotion } from '../utils/emotionDetector';
import { generateCoachingResponse } from '../utils/aiCoach';
import { savePendingEntry, getPendingEntries, removePendingEntry, isOnline, generateOfflineId } from '../utils/offlineStorage';
import { generateEmotionalTransformation } from '../utils/emotionalTransformation';
import { awardRewards } from '../utils/gamification';
import { getFaithVerse, categorizeEmotion, FaithVerse } from '../utils/faithEncouragement';
import { findVerse, EmotionKey, FaithKey } from '../data/faithVerses';
import { getRandomInnerChildPrompt, generateInnerChildResponse, generateInnerChildAffirmations, generateInnerChildRenewalStep } from '../utils/innerChildMode';
import { detectDistressLevel, shouldShowTherapistRecommendation } from '../utils/distressDetector';
import { TherapistRecommendationModal } from './TherapistRecommendationModal';
import { generateTeenCoachingResponse, getTeenReframe } from '../utils/teenMode';
import { IssueSolutionsPanel } from './IssueSolutionsPanel';
import { IssueKey } from '../data/issueSolutions';

interface JournalPageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export function JournalPage({ onBack, onNavigate }: JournalPageProps) {
  const { user } = useAuth();
  const [feelings, setFeelings] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reframeMessage, setReframeMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [offline, setOffline] = useState(!isOnline());
  const [pendingSync, setPendingSync] = useState(getPendingEntries().length);
  const [transformation, setTransformation] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [faithEnabled, setFaithEnabled] = useState(false);
  const [faithTradition, setFaithTradition] = useState<string>('');
  const [faithVerse, setFaithVerse] = useState<FaithVerse | null>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionKey | null>(null);
  const [innerChildMode, setInnerChildMode] = useState(false);
  const [teenMode, setTeenMode] = useState(false);
  const [innerChildPrompt, setInnerChildPrompt] = useState(getRandomInnerChildPrompt());
  const [actionCompleted, setActionCompleted] = useState(false);
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [coachingResponse, setCoachingResponse] = useState<{
    message: string;
    reflectionQuestion?: string;
    copingTechnique?: {
      title: string;
      description: string;
      steps: string[];
    };
  } | null>(null);
  const [showTherapistModal, setShowTherapistModal] = useState(false);
  const [distressInfo, setDistressInfo] = useState<{
    level: 'moderate' | 'high' | 'severe';
    recommendation: string;
  } | null>(null);
  const [entryCount, setEntryCount] = useState(0);
  const [hasReachedLimit, setHasReachedLimit] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<IssueKey | null>(null);

  const FREE_LIMIT = 5;

  useEffect(() => {
    loadFaithPreferences();
    loadChapters();
    loadEntryCount();
  }, [user]);

  const loadEntryCount = async () => {
    if (!user?.id) {
      const localCount = parseInt(localStorage.getItem('lifezinc_entry_count') || '0');
      setEntryCount(localCount);
      setHasReachedLimit(localCount >= FREE_LIMIT);
      return;
    }

    const { count } = await supabase
      .from('journal_entries')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    setEntryCount(count || 0);
    setHasReachedLimit((count || 0) >= FREE_LIMIT);
  };

  const loadChapters = async () => {
    if (!user?.id) return;

    const { data } = await supabase
      .from('life_chapters')
      .select('id, title, color')
      .eq('user_id', user.id)
      .order('start_date', { ascending: false });

    setChapters(data || []);
  };

  useEffect(() => {
    const handleOnline = () => {
      setOffline(false);
      syncPendingEntries();
    };
    const handleOffline = () => setOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (isOnline() && pendingSync > 0) {
      syncPendingEntries();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadFaithPreferences = async () => {
    if (!user?.id) return;

    const { data } = await supabase
      .from('user_preferences')
      .select('faith_support_enabled, faith_tradition, inner_child_mode, teen_mode')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data) {
      setFaithEnabled(data.faith_support_enabled || false);
      setFaithTradition(data.faith_tradition || '');
      setInnerChildMode(data.inner_child_mode || false);
      setTeenMode(data.teen_mode || false);
    }
  };

  const toggleInnerChildMode = async () => {
    const newMode = !innerChildMode;
    setInnerChildMode(newMode);

    if (newMode) {
      setInnerChildPrompt(getRandomInnerChildPrompt());
    }

    if (!user?.id) return;

    const { data: existing } = await supabase
      .from('user_preferences')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('user_preferences')
        .update({
          inner_child_mode: newMode,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);
    } else {
      await supabase
        .from('user_preferences')
        .insert({
          user_id: user.id,
          inner_child_mode: newMode,
        });
    }
  };

  const toggleFaithMode = async () => {
    const newMode = !faithEnabled;
    setFaithEnabled(newMode);

    if (!user?.id) return;

    const { data: existing } = await supabase
      .from('user_preferences')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('user_preferences')
        .update({
          faith_support_enabled: newMode,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);
    } else {
      await supabase
        .from('user_preferences')
        .insert({
          user_id: user.id,
          faith_support_enabled: newMode,
        });
    }
  };

  const syncPendingEntries = async () => {
    const pending = getPendingEntries();
    if (pending.length === 0) return;

    for (const entry of pending) {
      const { error } = await supabase.from('journal_entries').insert([{
        text_entry: entry.text_entry,
        mood: entry.mood,
        tags: entry.tags,
        initial_reframe: entry.initial_reframe,
        user_id: entry.user_id,
      }]);

      if (!error) {
        removePendingEntry(entry.id);
      }
    }

    setPendingSync(getPendingEntries().length);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleVoiceTranscript = (transcript: string) => {
    setFeelings((prev) => (prev ? prev + ' ' + transcript : transcript));
  };

  const mapMoodToEmotion = (mood: string): EmotionKey => {
    const lowerMood = mood.toLowerCase();
    if (lowerMood.includes('anxious') || lowerMood.includes('nervous') || lowerMood.includes('worried')) return 'anxiety';
    if (lowerMood.includes('fear') || lowerMood.includes('scared') || lowerMood.includes('afraid')) return 'fear';
    if (lowerMood.includes('sad') || lowerMood.includes('down') || lowerMood.includes('depressed')) return 'sadness';
    if (lowerMood.includes('guilt') || lowerMood.includes('ashamed') || lowerMood.includes('embarrassed')) return 'guilt';
    if (lowerMood.includes('lonely') || lowerMood.includes('alone') || lowerMood.includes('isolated')) return 'loneliness';
    if (lowerMood.includes('angry') || lowerMood.includes('mad') || lowerMood.includes('frustrated')) return 'anger';
    if (lowerMood.includes('hopeless') || lowerMood.includes('despair') || lowerMood.includes('helpless')) return 'hopelessness';
    return 'anxiety';
  };

  useEffect(() => {
    if (feelings.trim().length > 20 && !selectedMood) {
      const detected = detectEmotion(feelings);
      if (detected) {
        setSelectedMood(detected);
      }
    }
  }, [feelings]);

  const handleRecycle = async () => {
    if (!feelings.trim()) return;

    if (hasReachedLimit) {
      alert(
        "You've used your 5 free journal entries. To keep going with unlimited journaling, please upgrade to the Monthly plan."
      );
      if (onNavigate) {
        onNavigate('pricing');
      }
      return;
    }

    const reframe = innerChildMode
      ? generateInnerChildResponse(feelings, selectedMood || 'neutral')
      : teenMode
      ? getTeenReframe(selectedCategory)
      : getRandomReframe(selectedCategory);
    setReframeMessage(reframe);

    let emotionalTransform;
    if (innerChildMode) {
      emotionalTransform = {
        steps: [
          {
            title: 'Your Younger Self Hears You',
            description: reframe,
            icon: '👂',
          },
          {
            title: 'Inner Child Affirmations',
            description: 'Gentle truths for your younger self',
            icon: '💝',
            affirmations: generateInnerChildAffirmations(selectedMood || 'neutral'),
          },
          {
            title: 'Comfort & Nurture',
            description: 'You are giving yourself what you always needed',
            icon: '🤗',
          },
          {
            title: 'Healing Action',
            description: generateInnerChildRenewalStep(selectedMood || 'neutral'),
            icon: '🌱',
          },
        ],
      };
    } else {
      emotionalTransform = generateEmotionalTransformation(
        selectedMood || 'neutral',
        feelings
      );
    }
    setTransformation(emotionalTransform);
    setCurrentStep(0);

    if (faithEnabled && faithTradition && (faithTradition === 'christianity' || faithTradition === 'islam')) {
      const detectedEmotion = mapMoodToEmotion(selectedMood || 'neutral');
      setSelectedEmotion(detectedEmotion);
    }

    const coaching = teenMode
      ? generateTeenCoachingResponse(
          selectedMood || 'neutral',
          feelings,
          reframe,
          selectedCategory
        )
      : generateCoachingResponse(
          selectedMood || 'neutral',
          feelings,
          reframe,
          selectedCategory
        );
    setCoachingResponse(coaching);

    setIsSaving(true);
    try {
      if (!isOnline()) {
        const offlineEntry = {
          id: generateOfflineId(),
          text_entry: feelings,
          mood: selectedMood,
          tags: selectedTags.length > 0 ? selectedTags : null,
          initial_reframe: reframe,
          user_id: user?.id || '',
          created_at: new Date().toISOString(),
        };
        savePendingEntry(offlineEntry);
        setPendingSync(getPendingEntries().length);

        setTimeout(() => {
          setFeelings('');
          setSelectedMood(null);
          setSelectedMoods([]);
          setSelectedTags([]);
          setReframeMessage('');
          setCoachingResponse(null);
          setTransformation(null);
          setCurrentStep(0);
          setFaithVerse(null);
        }, 2000);
      } else {
        const actionText = emotionalTransform.steps?.[3]?.description || emotionalTransform.steps?.[3]?.content || '';

        const { data: insertedData, error } = await supabase.from('journal_entries').insert([
          {
            text_entry: feelings,
            mood: selectedMood,
            emotions: selectedMoods.length > 0 ? selectedMoods : null,
            category: selectedCategory,
            tags: selectedTags.length > 0 ? selectedTags : null,
            initial_reframe: reframe,
            is_inner_child_mode: innerChildMode,
            action_text: actionText,
            action_completed: false,
            chapter_id: selectedChapter,
            user_id: user?.id,
          },
        ]).select();

        if (insertedData && insertedData[0]) {
          setCurrentEntryId(insertedData[0].id);
        }

        if (error) {
          console.error('Error saving entry:', error);
        } else {
          setEntryCount(prev => prev + 1);
          if (!user?.id) {
            const newCount = entryCount + 1;
            localStorage.setItem('lifezinc_entry_count', newCount.toString());
            if (newCount >= FREE_LIMIT) {
              setHasReachedLimit(true);
            }
          }

          if (user?.id) {
            await updateUserStreak(user.id);
            const achievements = await checkAndAwardAchievements(user.id);
            if (achievements.length > 0) {
              setNewAchievements(achievements);
              setTimeout(() => setNewAchievements([]), 5000);
            }

            await awardRewards(user.id, 'journal_entry');

            const { data: recentEntries } = await supabase
              .from('journal_entries')
              .select('id')
              .eq('user_id', user.id)
              .order('created_at', { ascending: false })
              .limit(10);

            const distressResult = detectDistressLevel(
              feelings,
              selectedMood,
              recentEntries?.length || 0
            );

            if (insertedData && insertedData[0]) {
              await supabase.from('distress_tracking').insert({
                user_id: user.id,
                journal_entry_id: insertedData[0].id,
                distress_level: distressResult.level,
                triggers: distressResult.triggers,
                recommendation_shown: distressResult.shouldShowSupport,
              });
            }

            if (distressResult.shouldShowSupport && distressResult.level !== 'low') {
              const { data: recentDistress } = await supabase
                .from('distress_tracking')
                .select('distress_level, created_at')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(10);

              const { data: lastRecommendation } = await supabase
                .from('therapist_recommendations')
                .select('shown_at')
                .eq('user_id', user.id)
                .order('shown_at', { ascending: false })
                .limit(1)
                .maybeSingle();

              const daysSinceLast = lastRecommendation
                ? Math.floor((Date.now() - new Date(lastRecommendation.shown_at).getTime()) / (1000 * 60 * 60 * 24))
                : 999;

              const recentLevels = recentDistress?.map(d => d.distress_level) || [];

              if (shouldShowTherapistRecommendation(recentLevels, daysSinceLast)) {
                setDistressInfo({
                  level: distressResult.level as 'moderate' | 'high' | 'severe',
                  recommendation: distressResult.recommendation,
                });
                setShowTherapistModal(true);

                await supabase.from('therapist_recommendations').insert({
                  user_id: user.id,
                  category: selectedMood || 'general',
                  shown_at: new Date().toISOString(),
                });
              }
            }
          }

          setTimeout(() => {
            setFeelings('');
            setSelectedMood(null);
            setSelectedMoods([]);
            setSelectedCategory(null);
            setSelectedTags([]);
            setReframeMessage('');
            setCoachingResponse(null);
            setTransformation(null);
            setCurrentStep(0);
            setFaithVerse(null);
            setActionCompleted(false);
            setCurrentEntryId(null);
          }, 2000);
        }
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-rose-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            {offline && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm border border-amber-200">
                <WifiOff className="w-4 h-4" />
                <span>Offline {pendingSync > 0 && `(${pendingSync})`}</span>
              </div>
            )}

            <button
              onClick={toggleInnerChildMode}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                innerChildMode
                  ? 'bg-pink-100 text-pink-700 border border-pink-300'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              {innerChildMode ? <Baby className="w-4 h-4" /> : <User className="w-4 h-4" />}
              <span className="hidden sm:inline">{innerChildMode ? 'Inner Child' : 'Regular'}</span>
            </button>

            <button
              onClick={toggleFaithMode}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                faithEnabled
                  ? 'bg-amber-100 text-amber-700 border border-amber-300'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Faith {faithEnabled ? 'On' : 'Off'}</span>
            </button>
          </div>
        </div>

        {!transformation ? (
          <>
            {entryCount < FREE_LIMIT && (
              <div className="mb-4 p-4 bg-teal-50 rounded-2xl border border-teal-200">
                <p className="text-sm text-teal-800">
                  You have <strong>{FREE_LIMIT - entryCount}</strong> free journal {FREE_LIMIT - entryCount === 1 ? 'entry' : 'entries'} left before upgrading.
                </p>
              </div>
            )}

            {hasReachedLimit && (
              <div className="mb-4 p-6 bg-gradient-to-r from-rose-50 to-orange-50 rounded-2xl border-2 border-orange-200 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-2">You've used your 5 free entries</h3>
                <p className="text-sm text-gray-700 mb-4">
                  LifeZinc gives you 5 free entries to start your healing journey.
                  To continue with unlimited journaling and deeper reflections, please upgrade.
                </p>
                <button
                  onClick={() => onNavigate && onNavigate('pricing')}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg"
                >
                  View Plans &amp; Upgrade
                </button>
              </div>
            )}

            <div className={`rounded-3xl shadow-xl p-8 ${
              innerChildMode
                ? 'bg-gradient-to-br from-pink-50 to-rose-50'
                : 'bg-white'
            }`}>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {innerChildMode ? innerChildPrompt.intro : "Mental Health for Every Stage of Life — Powered by Real, Proven Tools."}
                </h1>
                <p className="text-gray-600">
                  {innerChildMode
                    ? innerChildPrompt.promptQuestion
                    : "How are you feeling? Share what's on your mind"}
                </p>
              </div>

            <div className="space-y-6">
              <MoodSelector
                selectedMood={selectedMood}
                selectedMoods={selectedMoods}
                onMoodSelect={(mood) => {
                  setSelectedMoods(prev =>
                    prev.includes(mood)
                      ? prev.filter(m => m !== mood)
                      : [...prev, mood]
                  );
                  if (selectedMoods.length === 0 || !selectedMoods.includes(mood)) {
                    setSelectedMood(mood);
                  }
                }}
                multiSelect={true}
              />

              {selectedMood && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    What is this about?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { emoji: '📚', label: 'School / Academics', value: 'school', issueKey: 'school' as IssueKey },
                      { emoji: '👨‍👩‍👧‍👦', label: 'Family', value: 'family', issueKey: 'family' as IssueKey },
                      { emoji: '🤝', label: 'Friends / Social', value: 'friends', issueKey: 'loneliness' as IssueKey },
                      { emoji: '🧠', label: 'Self-Esteem', value: 'self_esteem', issueKey: 'confidence' as IssueKey },
                      { emoji: '💛', label: 'Relationships', value: 'relationships', issueKey: 'relationship' as IssueKey },
                      { emoji: '💼', label: 'Work / Goals', value: 'work', issueKey: 'work' as IssueKey },
                      { emoji: '💸', label: 'Money / Stress', value: 'money', issueKey: 'money' as IssueKey },
                      { emoji: '❓', label: 'Other', value: 'other', issueKey: 'overwhelm' as IssueKey },
                    ].map((category) => (
                      <button
                        key={category.value}
                        onClick={() => {
                          setSelectedCategory(category.value);
                          setSelectedIssue(category.issueKey);
                        }}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          selectedCategory === category.value
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{category.emoji}</div>
                        <div className="text-sm font-medium text-gray-700">{category.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="relative">
                  <textarea
                    value={feelings}
                    onChange={(e) => setFeelings(e.target.value)}
                    placeholder={innerChildMode ? innerChildPrompt.placeholder : "I'm feeling..."}
                    className={`w-full min-h-[200px] p-4 border-2 rounded-2xl focus:outline-none resize-none text-base leading-relaxed ${
                      innerChildMode
                        ? 'border-pink-200 focus:border-pink-400 bg-white/70'
                        : 'border-gray-200 focus:border-teal-400'
                    }`}
                  />
                  <div className="absolute bottom-4 right-4">
                    <VoiceInput onTranscript={handleVoiceTranscript} />
                  </div>
                </div>
              </div>

              <TagSelector
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
              />

              {chapters.length > 0 && (
                <select
                  value={selectedChapter || ''}
                  onChange={(e) => setSelectedChapter(e.target.value || null)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-teal-400 focus:outline-none"
                >
                  <option value="">No chapter</option>
                  {chapters.map((chapter) => (
                    <option key={chapter.id} value={chapter.id}>
                      {chapter.title}
                    </option>
                  ))}
                </select>
              )}

              <button
                onClick={handleRecycle}
                disabled={!feelings.trim() || isSaving || hasReachedLimit}
                className={`w-full py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                  innerChildMode
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
                    : 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700'
                }`}
              >
                {isSaving ? (
                  'Processing...'
                ) : hasReachedLimit ? (
                  'Upgrade to Continue'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit
                  </>
                )}
              </button>
            </div>
          </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Your Journey</h2>
                  <p className="text-sm text-gray-600">
                    {innerChildMode ? 'Healing your inner child' : 'Transform your emotions'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {transformation.steps ? transformation.steps.map((step: any, idx: number) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border-2 transition-all ${
                      idx <= currentStep
                        ? 'border-teal-300 bg-teal-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        idx < currentStep
                          ? 'bg-teal-500 text-white'
                          : idx === currentStep
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {idx < currentStep ? <CheckCircle className="w-6 h-6" /> : (idx + 1)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                        <p className="text-gray-700">{step.description || step.content}</p>
                        {step.affirmations && (
                          <div className="mt-3 space-y-2">
                            {step.affirmations.map((affirmation: string, i: number) => (
                              <div key={i} className="p-3 bg-white rounded-lg border border-pink-200">
                                <p className="text-sm text-gray-700">{affirmation}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {idx === currentStep && currentStep < 3 && (
                      <button
                        onClick={async () => {
                          const newStep = currentStep + 1;
                          setCurrentStep(newStep);
                          if (newStep === 3 && user?.id) {
                            await awardRewards(user.id, 'transformation_complete');
                          }
                        }}
                        className="mt-4 w-full py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors font-medium"
                      >
                        Next Step
                      </button>
                    )}

                    {idx === currentStep && currentStep === 3 && step.description && (
                      <div className="mt-4 p-4 bg-white rounded-2xl border-2 border-teal-300">
                        <div className="flex items-start gap-3">
                          <Target className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-2">Action Step</h4>
                            <p className="text-gray-700 mb-3">{step.description}</p>
                            <label className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={actionCompleted}
                                onChange={async (e) => {
                                  const completed = e.target.checked;
                                  setActionCompleted(completed);
                                  if (currentEntryId && user?.id) {
                                    await supabase
                                      .from('journal_entries')
                                      .update({ action_completed: completed })
                                      .eq('id', currentEntryId);
                                    if (completed) {
                                      await awardRewards(user.id, 'action_completed');
                                    }
                                  }
                                }}
                                className="w-5 h-5 rounded border-2 border-gray-300 text-teal-600"
                              />
                              <span className={`font-medium ${
                                actionCompleted ? 'text-teal-700 line-through' : 'text-gray-700'
                              }`}>
                                {actionCompleted ? 'Completed!' : 'Mark as done'}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )) : Object.values(transformation).map((step: any, idx: number) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border-2 transition-all ${
                      idx <= currentStep
                        ? 'border-teal-300 bg-teal-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        idx < currentStep
                          ? 'bg-teal-500 text-white'
                          : idx === currentStep
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {idx < currentStep ? <CheckCircle className="w-6 h-6" /> : step.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                        <p className="text-gray-700">{step.content}</p>
                      </div>
                    </div>

                    {idx === currentStep && currentStep < 3 && (
                      <button
                        onClick={async () => {
                          const newStep = currentStep + 1;
                          setCurrentStep(newStep);
                          if (newStep === 3 && user?.id) {
                            await awardRewards(user.id, 'transformation_complete');
                          }
                        }}
                        className="mt-4 w-full py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors font-medium"
                      >
                        Next Step
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {coachingResponse && currentStep === 3 && (
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl shadow-lg p-8 border border-teal-200">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-teal-600" />
                  <h3 className="text-lg font-bold text-gray-900">Your Coach</h3>
                </div>
                <p className="text-gray-800 leading-relaxed">{coachingResponse.message}</p>
              </div>
            )}

            {faithEnabled && currentStep === 3 && (
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl shadow-md p-6 border border-teal-200">
                <h3 className="font-semibold text-gray-900 mb-3">Faith-Friendly Mode</h3>

                {!faithTradition || faithTradition === '' ? (
                  <p className="text-sm text-gray-600">
                    Faith-Friendly Mode is off. You can turn it on in Settings → Faith Preferences.
                  </p>
                ) : (faithTradition === 'christianity' || faithTradition === 'islam') ? (
                  <div className="space-y-4">
                    {!selectedEmotion ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What are you feeling?
                        </label>
                        <select
                          value={selectedEmotion || ''}
                          onChange={(e) => setSelectedEmotion(e.target.value as EmotionKey)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                        >
                          <option value="">Select an emotion...</option>
                          <option value="anxiety">Anxiety</option>
                          <option value="fear">Fear</option>
                          <option value="sadness">Sadness</option>
                          <option value="guilt">Guilt</option>
                          <option value="loneliness">Loneliness</option>
                          <option value="anger">Anger</option>
                          <option value="hopelessness">Hopelessness</option>
                        </select>
                      </div>
                    ) : (() => {
                      const verse = findVerse(faithTradition as FaithKey, selectedEmotion, selectedCategory);
                      return verse ? (
                        <div>
                          <div className="bg-white rounded-xl p-4 mb-3">
                            <p className="text-gray-800 text-sm italic mb-2">
                              "{verse.text}"
                            </p>
                            <p className="text-xs text-gray-600">
                              — {verse.reference}
                            </p>
                          </div>
                          {verse.reflection && (
                            <div className="bg-teal-50 rounded-lg p-3 mb-3">
                              <p className="text-sm text-gray-700 italic">{verse.reflection}</p>
                            </div>
                          )}
                          <p className="text-xs text-gray-600 italic">
                            This verse is offered as comfort, not as a command. Take what helps and leave the rest.
                          </p>
                          <button
                            onClick={() => setSelectedEmotion(null)}
                            className="mt-3 text-xs text-teal-600 hover:text-teal-700 underline"
                          >
                            Choose a different emotion
                          </button>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600">No verse found for this emotion.</p>
                      );
                    })()}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    Faith-Friendly Mode is set to "{faithTradition}". Bible and Qur'an verses are currently available for Christian and Muslim faiths.
                  </p>
                )}

                <div className="mt-4 pt-4 border-t border-teal-200">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <strong>Important:</strong> Faith-Friendly reflections are optional and may not fit everyone's beliefs. LifeZinc does not replace therapy, medical care, or emergency services.
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed mt-2">
                    If you are in crisis or thinking of harming yourself or others, please contact your local emergency number or a crisis hotline immediately (for example, 988 in the United States).
                  </p>
                </div>
              </div>
            )}

            {newAchievements.length > 0 && (
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl shadow-lg p-8 border-2 border-purple-300">
                <div className="flex items-center gap-3">
                  <Award className="w-7 h-7 text-purple-600" />
                  <div>
                    <h3 className="font-bold text-gray-900">Achievement Unlocked!</h3>
                    {newAchievements.map((achievement) => (
                      <p key={achievement} className="text-gray-700 capitalize">
                        {achievement.replace(/_/g, ' ')}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <SOSButton />
      {showTherapistModal && distressInfo && (
        <TherapistRecommendationModal
          isOpen={showTherapistModal}
          onClose={() => setShowTherapistModal(false)}
          onNavigateToSupport={() => {
            setShowTherapistModal(false);
            onBack();
          }}
          distressLevel={distressInfo.level}
          recommendation={distressInfo.recommendation}
        />
      )}
      <IssueSolutionsPanel
        selectedIssue={selectedIssue}
        onClose={() => setSelectedIssue(null)}
      />
    </div>
  );
}
