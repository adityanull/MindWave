export const therapists = [
  { id: '1', name: 'Dr. Sarah Chen', specialization: 'Anxiety & Depression', experience: 12, rating: 4.9, reviews: 284, price: 120, languages: ['English', 'Mandarin'], availability: 'Mon-Thu', online: true, image: '👩‍⚕️', bio: 'Specializing in CBT and mindfulness-based approaches for anxiety and depression. I create a warm, collaborative space where we work together to understand your unique experience and build lasting coping strategies.', specializations: ['CBT', 'Mindfulness-Based Therapy', 'Anxiety Disorders', 'Depression', 'Stress Management'] },
  { id: '2', name: 'Dr. Marcus Williams', specialization: 'Stress & Burnout', experience: 15, rating: 4.8, reviews: 196, price: 150, languages: ['English'], availability: 'Tue-Fri', online: true, image: '👨‍⚕️', bio: 'Executive coach and therapist specializing in burnout recovery and stress management for high-performing professionals. Evidence-based methods tailored to your lifestyle.', specializations: ['Burnout Recovery', 'Stress Management', 'Executive Coaching', 'Work-Life Balance', 'ACT'] },
  { id: '3', name: 'Dr. Priya Sharma', specialization: 'ADHD & Focus', experience: 8, rating: 4.7, reviews: 152, price: 100, languages: ['English', 'Hindi'], availability: 'Mon-Sat', online: false, image: '👩‍⚕️', bio: 'Neuropsychologist specializing in ADHD assessment and management. I combine psychoeducation with practical strategies to help you harness your unique brain.', specializations: ['ADHD', 'Neuropsychology', 'Focus Training', 'Executive Function', 'Psychoeducation'] },
  { id: '4', name: 'Dr. James Okafor', specialization: 'Sleep & Recovery', experience: 10, rating: 4.9, reviews: 210, price: 110, languages: ['English', 'French'], availability: 'Mon-Fri', online: true, image: '👨‍⚕️', bio: 'Sleep medicine specialist integrating CBT-I with relaxation techniques. Transforming your relationship with sleep for lasting recovery and wellbeing.', specializations: ['CBT-I', 'Sleep Disorders', 'Relaxation Therapy', 'Insomnia', 'Chronic Fatigue'] },
  { id: '5', name: 'Dr. Elena Rodriguez', specialization: 'Relationships & Self-Esteem', experience: 14, rating: 4.8, reviews: 178, price: 130, languages: ['English', 'Spanish'], availability: 'Wed-Sat', online: true, image: '👩‍⚕️', bio: 'Specializing in attachment-based therapy and self-compassion work. Helping you build healthier relationships with yourself and others.', specializations: ['Attachment Therapy', 'Self-Esteem', 'Relationship Issues', 'Self-Compassion', 'Emotional Regulation'] },
  { id: '6', name: 'Dr. Alex Kim', specialization: 'Trauma & Resilience', experience: 11, rating: 4.9, reviews: 232, price: 140, languages: ['English', 'Korean'], availability: 'Mon-Thu', online: true, image: '👨‍⚕️', bio: 'Trauma-informed therapist using EMDR and somatic approaches. Creating a safe space for processing and building resilience at your own pace.', specializations: ['EMDR', 'Somatic Therapy', 'Trauma Processing', 'Resilience Building', 'PTSD'] },
];

export const communityPosts = [
  { id: '1', category: 'Anxiety', title: 'How do you handle morning anxiety?', content: 'Every morning I wake up with this knot in my stomach. It takes me an hour just to feel normal. Anyone else experience this?', author: 'Anonymous', reactions: { support: 24, relate: 18 }, comments: 12, time: '2 hours ago' },
  { id: '2', category: 'Stress', title: 'Setting boundaries at work changed everything', content: 'I finally said no to taking on extra projects. The guilt was intense at first, but my stress levels have noticeably dropped.', author: 'Anonymous', reactions: { support: 42, relate: 31 }, comments: 8, time: '5 hours ago' },
  { id: '3', category: 'College', title: 'Exam season survival strategies', content: 'Finals are coming up and the pressure is unreal. Sharing what helps me: breaking study sessions into 25-min blocks, and actually taking breaks.', author: 'Anonymous', reactions: { support: 56, relate: 38 }, comments: 15, time: '8 hours ago' },
  { id: '4', category: 'Relationships', title: 'Learning to communicate my needs', content: 'I used to just shut down when overwhelmed. Therapy taught me to say "I need a moment" instead of disappearing. Small but huge.', author: 'Anonymous', reactions: { support: 35, relate: 27 }, comments: 6, time: '1 day ago' },
  { id: '5', category: 'Self-confidence', title: 'Imposter syndrome never fully goes away', content: 'But I\'m learning it doesn\'t mean I\'m a fraud. It means I care about doing good work. Reframing has been powerful.', author: 'Anonymous', reactions: { support: 48, relate: 33 }, comments: 9, time: '1 day ago' },
  { id: '6', category: 'Sleep', title: 'My bedtime routine transformation', content: 'No screens 1hr before bed, light stretching, journaling 3 gratitudes. Went from 4hrs to 7hrs of sleep in 2 weeks.', author: 'Anonymous', reactions: { support: 62, relate: 41 }, comments: 11, time: '2 days ago' },
  { id: '7', category: 'General wellness', title: 'Small wins matter', content: 'Today I got out of bed on time, drank water, and took a 5-min walk. On a low day, these are victories worth celebrating.', author: 'Anonymous', reactions: { support: 71, relate: 45 }, comments: 14, time: '2 days ago' },
];

export const knowledgeArticles = [
  { id: '1', category: 'Anxiety', title: 'Understanding Anxiety: Your Brain\'s Alarm System', summary: 'Learn why anxiety exists, how it affects your body, and evidence-based strategies to manage it.', readTime: '8 min', featured: true },
  { id: '2', category: 'Depression', title: 'Depression Is Not Laziness', summary: 'Breaking the stigma: understanding depression as a complex biopsychosocial condition, not a character flaw.', readTime: '10 min', featured: true },
  { id: '3', category: 'Stress', title: 'The Science of Stress: From Survival to Overwhelm', summary: 'How the stress response works, when it becomes harmful, and practical techniques to reset your nervous system.', readTime: '7 min', featured: false },
  { id: '4', category: 'ADHD', title: 'ADHD Brains Work Differently — Not Worse', summary: 'Understanding the neuroscience of ADHD and how to work with your brain instead of against it.', readTime: '9 min', featured: true },
  { id: '5', category: 'Sleep', title: 'Sleep Hygiene: Beyond the Basics', summary: 'Advanced strategies for better sleep based on the latest research in sleep science and CBT-I.', readTime: '6 min', featured: false },
  { id: '6', category: 'Burnout', title: 'Recognizing and Recovering from Burnout', summary: 'The three stages of burnout, how to identify where you are, and a roadmap to recovery.', readTime: '11 min', featured: true },
  { id: '7', category: 'Mindfulness', title: 'Mindfulness for Beginners: A Practical Guide', summary: 'Start your mindfulness practice with simple, evidence-based techniques you can use anywhere.', readTime: '5 min', featured: false },
  { id: '8', category: 'Emotional regulation', title: 'The Window of Tolerance', summary: 'Understanding your optimal zone of arousal and how to expand it for better emotional regulation.', readTime: '8 min', featured: false },
  { id: '9', category: 'Self-esteem', title: 'Building Self-Compassion: The Antidote to Self-Criticism', summary: 'Why self-compassion is more effective than self-esteem and practical exercises to develop it.', readTime: '7 min', featured: true },
  { id: '10', category: 'Relationships', title: 'Healthy Communication Patterns', summary: 'The four communication styles and how to shift toward assertive, empathetic communication.', readTime: '6 min', featured: false },
];

export const assessments = [
  {
    id: 'depression', name: 'Depression Screening', description: 'A brief screening for depressive symptoms', icon: '🌊', color: '#8b5cf6',
    questions: [
      { id: 1, text: 'Little interest or pleasure in doing things?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
      { id: 2, text: 'Feeling down, depressed, or hopeless?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
      { id: 3, text: 'Trouble falling or staying asleep, or sleeping too much?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
      { id: 4, text: 'Feeling tired or having little energy?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
      { id: 5, text: 'Poor appetite or overeating?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
      { id: 6, text: 'Feeling bad about yourself or that you are a failure?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
      { id: 7, text: 'Trouble concentrating on things?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
      { id: 8, text: 'Moving or speaking noticeably slowly, or being fidgety?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
      { id: 9, text: 'Thoughts that you would be better off dead?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
    ],
  },
  {
    id: 'anxiety', name: 'Anxiety Screening', description: 'A brief screening for anxiety symptoms', icon: '🌀', color: '#00d4ff',
    questions: [
      { id: 1, text: 'Feeling nervous, anxious, or on edge?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
      { id: 2, text: 'Not being able to stop or control worrying?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
      { id: 3, text: 'Worrying too much about different things?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
      { id: 4, text: 'Trouble relaxing?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
      { id: 5, text: 'Being so restless that it\'s hard to sit still?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
      { id: 6, text: 'Becoming easily annoyed or irritable?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
      { id: 7, text: 'Feeling afraid as if something awful might happen?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
    ],
  },
  {
    id: 'stress', name: 'Stress Assessment', description: 'Evaluate your current stress levels', icon: '⚡', color: '#f59e0b',
    questions: [
      { id: 1, text: 'How often do you feel overwhelmed by responsibilities?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] },
      { id: 2, text: 'How often do you feel unable to control important things?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] },
      { id: 3, text: 'How often do you feel nervous and stressed?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] },
      { id: 4, text: 'How often do you feel confident about handling problems?', options: ['Very often', 'Often', 'Sometimes', 'Rarely', 'Never'] },
      { id: 5, text: 'How often do you feel things are going your way?', options: ['Very often', 'Often', 'Sometimes', 'Rarely', 'Never'] },
      { id: 6, text: 'How often do you feel you cannot cope with all the things you have to do?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] },
      { id: 7, text: 'How often do you feel irritated by things outside your control?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] },
      { id: 8, text: 'How often do you feel difficulties are piling up?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] },
    ],
  },
  {
    id: 'burnout', name: 'Burnout Assessment', description: 'Assess your risk for burnout', icon: '🔥', color: '#ef4444',
    questions: [
      { id: 1, text: 'I feel emotionally drained by my work/studies.', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
      { id: 2, text: 'I feel used up at the end of the day.', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
      { id: 3, text: 'I dread getting up in the morning to face another day.', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
      { id: 4, text: 'Working/studying all day is really a strain for me.', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
      { id: 5, text: 'I feel burned out from my work/studies.', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
      { id: 6, text: 'I feel frustrated by my work/studies.', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
      { id: 7, text: 'I feel I am working too hard.', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    ],
  },
  {
    id: 'sleep', name: 'Sleep Assessment', description: 'Evaluate your sleep quality', icon: '🌙', color: '#14b8a6',
    questions: [
      { id: 1, text: 'How would you rate your overall sleep quality?', options: ['Very good', 'Good', 'Fair', 'Poor', 'Very poor'] },
      { id: 2, text: 'How long does it usually take you to fall asleep?', options: ['<15 min', '15-30 min', '30-60 min', '>60 min'] },
      { id: 3, text: 'How many hours of actual sleep do you get at night?', options: ['>8 hours', '7-8 hours', '6-7 hours', '5-6 hours', '<5 hours'] },
      { id: 4, text: 'How often do you have trouble staying asleep?', options: ['Not during past month', 'Less than once a week', 'Once or twice a week', 'Three or more times a week'] },
      { id: 5, text: 'How often do you have trouble staying awake during the day?', options: ['Not during past month', 'Less than once a week', 'Once or twice a week', 'Three or more times a week'] },
      { id: 6, text: 'How often do you take medicine to help you sleep?', options: ['Not during past month', 'Less than once a week', 'Once or twice a week', 'Three or more times a week'] },
    ],
  },
  {
    id: 'adhd', name: 'ADHD-Related Screening', description: 'A brief screening for attention-related symptoms', icon: '🧠', color: '#ec4899',
    questions: [
      { id: 1, text: 'How often do you have difficulty getting and staying organized?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] },
      { id: 2, text: 'How often do you put off getting started on tasks?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] },
      { id: 3, text: 'How often do you lose track of what you were saying mid-sentence?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] },
      { id: 4, text: 'How often do you leave your seat when you\'re expected to stay seated?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] },
      { id: 5, text: 'How often do you feel restless or fidgety?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] },
      { id: 6, text: 'How often do you make careless mistakes?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] },
      { id: 7, text: 'How often do you have difficulty waiting your turn?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] },
    ],
  },
];

export const selfCareExercises = {
  breathe: [
    { id: 'box', name: 'Box Breathing', description: 'Equal inhale, hold, exhale, hold pattern', duration: '4 min', pattern: [4, 4, 4, 4] },
    { id: 'relax', name: '4-7-8 Relaxation', description: 'Calming breath for anxiety relief', duration: '3 min', pattern: [4, 7, 8, 0] },
    { id: 'deep', name: 'Deep Breathing', description: 'Simple deep breathing for daily calm', duration: '5 min', pattern: [4, 0, 6, 0] },
  ],
  meditate: [
    { id: 'body', name: 'Body Scan', description: 'Progressive relaxation through body awareness', duration: '10 min' },
    { id: 'mindful', name: 'Mindfulness', description: 'Present-moment awareness practice', duration: '5 min' },
    { id: 'loving', name: 'Loving Kindness', description: 'Cultivate compassion for self and others', duration: '8 min' },
  ],
  sleep: [
    { id: 'routine', name: 'Wind Down Routine', description: 'Guided pre-sleep relaxation', duration: '15 min' },
    { id: 'relax', name: 'Sleep Relaxation', description: 'Progressive muscle relaxation for sleep', duration: '10 min' },
    { id: 'tips', name: 'Sleep Tips', description: 'Personalized sleep improvement guidance', duration: '5 min' },
  ],
  reset: [
    { id: 'ground', name: '5-4-3-2-1 Grounding', description: 'Sensory grounding for overwhelming moments', duration: '3 min' },
    { id: 'stress', name: 'Stress Relief', description: 'Quick stress-busting techniques', duration: '5 min' },
    { id: 'reset', name: 'Mental Reset', description: 'Clear your mind and start fresh', duration: '4 min' },
  ],
  focus: [
    { id: 'pomodoro', name: 'Pomodoro Focus', description: '25-min focused work sessions', duration: '25 min' },
    { id: 'deep', name: 'Deep Work', description: 'Extended focus session', duration: '50 min' },
    { id: 'micro', name: 'Micro Focus', description: 'Short burst concentration', duration: '10 min' },
  ],
};

export const aiSuggestedPrompts = [
  "I'm feeling anxious today.",
  "I can't focus.",
  "I had a really difficult day.",
  "Help me calm down.",
  "I don't understand what I'm feeling.",
];

export const moodEmojis = ['😣', '😔', '😐', '🙂', '😊', '😄'];
export const moodLabels = ['Terrible', 'Bad', 'Okay', 'Good', 'Great', 'Amazing'];

export const dailyGoals = [
  { id: '1', title: '5-minute meditation', icon: '🧘', completed: true, category: 'self-care' },
  { id: '2', title: 'Journal entry', icon: '📝', completed: false, category: 'journal' },
  { id: '3', title: 'Breathing exercise', icon: '🌬️', completed: false, category: 'self-care' },
  { id: '4', title: 'Sleep by 11 PM', icon: '🌙', completed: false, category: 'sleep' },
  { id: '5', title: 'Focus session', icon: '🎯', completed: true, category: 'focus' },
];

export const communityCategories = ['Anxiety', 'Stress', 'College', 'Career', 'Relationships', 'Self-confidence', 'Sleep', 'General wellness'];
export const knowledgeCategories = ['Anxiety', 'Depression', 'Stress', 'ADHD', 'Sleep', 'Burnout', 'Relationships', 'Emotional regulation', 'Self-esteem', 'Mindfulness'];
