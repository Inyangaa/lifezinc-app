interface MoodSelectorProps {
  selectedMood: string | null;
  selectedMoods?: string[];
  onMoodSelect: (mood: string) => void;
  multiSelect?: boolean;
}

const moods = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😔', label: 'Sad', value: 'sad' },
  { emoji: '😰', label: 'Anxious', value: 'anxious' },
  { emoji: '😤', label: 'Frustrated', value: 'frustrated' },
  { emoji: '😴', label: 'Tired', value: 'tired' },
  { emoji: '🤔', label: 'Confused', value: 'confused' },
  { emoji: '😍', label: 'Loved', value: 'loved' },
  { emoji: '😡', label: 'Angry', value: 'angry' },
  { emoji: '😢', label: 'Hurt', value: 'hurt' },
  { emoji: '😌', label: 'Peaceful', value: 'peaceful' },
  { emoji: '😟', label: 'Worried', value: 'worried' },
  { emoji: '🥺', label: 'Vulnerable', value: 'vulnerable' },
  { emoji: '😞', label: 'Disappointed', value: 'disappointed' },
  { emoji: '🙂', label: 'Content', value: 'content' },
  { emoji: '😣', label: 'Stressed', value: 'stressed' },
  { emoji: '🤗', label: 'Grateful', value: 'grateful' },
  { emoji: '😩', label: 'Overwhelmed', value: 'overwhelmed' },
  { emoji: '😐', label: 'Numb', value: 'numb' },
  { emoji: '🥰', label: 'Hopeful', value: 'hopeful' },
  { emoji: '😖', label: 'Guilty', value: 'guilty' },
  { emoji: '😳', label: 'Embarrassed', value: 'embarrassed' },
  { emoji: '🤨', label: 'Skeptical', value: 'skeptical' },
  { emoji: '😌', label: 'Relieved', value: 'relieved' },
  { emoji: '😕', label: 'Uncertain', value: 'uncertain' },
];

export function MoodSelector({ selectedMood, selectedMoods = [], onMoodSelect, multiSelect = false }: MoodSelectorProps) {
  const isSelected = (moodValue: string) => {
    if (multiSelect) {
      return selectedMoods.includes(moodValue);
    }
    return selectedMood === moodValue;
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-900">
        How are you feeling? {multiSelect && <span className="text-xs text-gray-600 font-normal">(Select all that apply)</span>}
      </label>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
        {moods.map((mood) => {
          const selected = isSelected(mood.value);
          return (
            <button
              key={mood.value}
              onClick={() => onMoodSelect(mood.value)}
              className={`emoji-btn p-3 rounded-xl transition-all duration-200 transform hover:scale-110 ${
                selected
                  ? 'selected'
                  : 'bg-gray-100 border-2 border-transparent hover:bg-gray-200'
              }`}
              title={mood.label}
            >
              <div className="text-3xl">{mood.emoji}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
