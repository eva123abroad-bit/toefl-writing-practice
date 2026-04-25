import { QuestionSet } from '../types';

// 能力诊断测试 — 自动生成
export const assessmentSet: QuestionSet = {
  id: 'assessment-diagnostic',
  name: '能力诊断测试',
  isFree: true,
  questionCount: 20,
  timeLimit: 840, // 20题 × 42秒 ≈ 14分钟
  questions: [
    {
      id: 101,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["What types of + 名词结构", "特殊疑问句倒装"],
      hint: 'What types of后接名词，构成疑问词短语，后面用疑问句倒装。',
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-8', text: `I want to start growing my own vegetables in the community garden on campus.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-8b' }
      },
      template: `What types {0} {1} {2} {3} {4} {5}?`,
      correctSentence: ["of", "vegetables", "do", "you", "want", "to grow"],
      words: ["of", "vegetables", "do", "you", "want", "to grow"]
    },
    {
      id: 102,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["特殊疑问句倒装", "进行时are considering"],
      hint: `Which brand作疑问词短语前置，后面用进行时倒装，语序为Which brand + are + you + considering。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-4', text: `I'm thinking about getting a new laptop.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-4b' }
      },
      template: `{0} {1} are {2} {3}?`,
      correctSentence: ["which", "brand", "you", "considering"],
      words: ["which", "brand", "you", "considering"]
    },
    {
      id: 103,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["疑问词前置", "一般将来时will + 动词原形"],
      hint: `特殊疑问句中，疑问词前置后需用疑问语序：疑问词+助动词+主语+动词。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-10', text: `I'm planning to take a photography course this semester.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-10b' }
      },
      template: `{0} {1} {2} {3} {4}?`,
      correctSentence: ["what", "topics", "will", "the class", "cover"],
      words: ["what", "topics", "will", "the class", "cover"]
    },
    {
      id: 104,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["whether引导的宾语从句", "by the end of截止到...月底"],
      hint: `I thought后接宾语从句，the presentation started at 3 o'clock为从句内容，注意过去时态。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-3', text: `The guest speaker's presentation has been moved to a different time.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-3b' }
      },
      template: `I {0} the {1} {2} at 3 {3}.`,
      correctSentence: ["thought", "presentation", "started", "o'clock"],
      words: ["thought", "presentation", "started", "o'clock", "thinks", "starts"]
    },
    {
      id: 105,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '修饰语位置',
      difficulty: 2,
      keyPoints: ["形容词前置", "with介词短语"],
      hint: 'technical修饰issues，with短语说明关于什么的问题。',
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-5', text: `Why didn't you submit the book report on time?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-5b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6} {7}.`,
      correctSentence: ["I", "had", "some", "technical", "issues", "with", "my", "computer"],
      words: ["I", "had", "some", "technical", "issues", "with", "my", "computer"]
    },
    {
      id: 106,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 2,
      keyPoints: ["because引导的原因状语从句", "过去时"],
      hint: `didn't放在主语I后、动词watch前，because引导原因状语从句，从句主语为I，谓语had。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-2', text: `Did you watch the university cricket match last night?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-2b' }
      },
      template: `{0} didn't {1} {2} I {3} {4} {5}.`,
      correctSentence: ["I", "watch it", "because", "had", "other", "plans"],
      words: ["I", "watch it", "because", "had", "other", "plans"]
    },
    {
      id: 107,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 2,
      keyPoints: ["that引导的宾语从句", "think + that从句"],
      hint: `think后接that引导的宾语从句，that在句中需保留。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-1', text: `I need to study for my final exams next week.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-1b' }
      },
      template: `{0} {1} {2} {3} {4} will be {5}?`,
      correctSentence: ["do", "you", "think", "that", "the questions", "difficult"],
      words: ["do", "you", "think", "that", "the questions", "difficult"]
    },
    {
      id: 108,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '特殊句式',
      difficulty: 2,
      keyPoints: ["be able to do能够做", "否定式wasn't able to"],
      hint: 'be able to = can的替代形式，这里用过去时wasn\'t able to。',
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-2', text: `Did you attend the team-building exercise last weekend?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-2b' }
      },
      template: `{0} {1} {2} {3} {4}.`,
      correctSentence: ["I", "wasn't", "able", "to", "participate"],
      words: ["I", "wasn't", "able", "to", "participate"]
    },
    {
      id: 109,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 2,
      keyPoints: ["if引导的宾语从句", "第三人称单数"],
      hint: `主句为do you know，if引导宾语从句，从句主语the position，谓语requires。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-8', text: `There is a work study position in the athletic department.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-8b' }
      },
      template: `{0} you {1} {2} {3} {4}?`,
      correctSentence: ["do", "know", "if", "the position", "requires experience"],
      words: ["do", "know", "if", "the position", "requires experience"]
    },
    {
      id: 110,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 2,
      keyPoints: ["if引导的宾语从句", "被动语态is required"],
      hint: `主句为do you know，if引导宾语从句，从句用被动语态is required。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-3', text: `Are you planning to attend the student orientation next month?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-3b' }
      },
      template: `{0} {1} {2} {3}?`,
      correctSentence: ["do you", "know if", "early registration", "is required"],
      words: ["do you", "know if", "early registration", "is required"]
    },
    {
      id: 111,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 2,
      keyPoints: ["will have一般将来时", "no + 名词 = not any"],
      hint: 'will have no free time = will not have any free time。',
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-6', text: `Do you plan to attend the workshop on Saturday?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-6b' }
      },
      template: `Unfortunately, {0} {1} have {2} {3} {4}.`,
      correctSentence: ["I", "will", "no", "free time", "this weekend"],
      words: ["I", "will", "no", "free time", "this weekend"]
    },
    {
      id: 112,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["a prior engagement有约在先", "否定回答语序"],
      hint: `prior engagement是固定搭配，表示"事先的约定"。否定回答通常以no开头，后接完整句子。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-4', text: `Are you joining us for the debate team practice session?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-4b' }
      },
      template: `{0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["no,", "I", "have", "a", "prior", "engagement"],
      words: ["no,", "I", "have", "a", "prior", "engagement"]
    },
    {
      id: 113,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["疑问词How前置", "practice + 动名词"],
      hint: 'practice后接动名词（speaking），不接不定式。',
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-4', text: `I've been studying French for a few months now.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-4b' }
      },
      template: `{0} {1} {2} {3} {4} {5}?`,
      correctSentence: ["how", "do", "you", "practice", "speaking", "it"],
      words: ["how", "do", "you", "practice", "speaking", "it"]
    },
    {
      id: 114,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["疑问词How前置", "practice + 动名词"],
      hint: `when引导时间状语从句，从句用一般现在时表示将来。`,
      errorPredictions: [
                    {
                              "wrongWord": "will end",
                              "replaces": "ends",
                              "errorType": "从句逻辑",
                              "hint": "误以为将来时态，但时间状语从句用一般现在表将来。"
                    }
          ],
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s7-5', text: `I need to leave the office early today.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s7-5b' }
      },
      template: `{0} {1} {2} you {3} the {4} {5}.`,
      correctSentence: ["I", "will", "call", "when", "meeting", "ends"],
      words: ["I", "will", "call", "when", "meeting", "ends", "will end"]
    },
    {
      id: 115,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 2,
      keyPoints: ["another + 单数名词", "reason/engagement搭配"],
      hint: `another后接单数可数名词，表示"另一个"。that night指代前文提到的晚上，与another evening engagement搭配。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-5', text: `Are you coming to the end-of-semester party?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-5b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6} night.`,
      correctSentence: ["no,", "I", "have", "another", "evening", "engagement", "that"],
      words: ["no,", "I", "have", "another", "evening", "engagement", "that"]
    },
    {
      id: 116,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 2,
      keyPoints: ["现在完成时否定式", "yet在否定句末尾"],
      hint: '现在完成时否定：haven\'t + 过去分词，yet放在句末。',
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-3', text: `Did you hear back from the interview you had for the job at the student center?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-3b' }
      },
      template: `{0} {1} {2} {3} {4} yet.`,
      correctSentence: ["no,", "they", "haven't", "contacted", "me"],
      words: ["no,", "they", "haven't", "contacted", "me"]
    },
    {
      id: 117,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 2,
      keyPoints: ["现在完成时have done", "yet在疑问句末尾"],
      hint: '现在完成时用have/has + 过去分词，疑问句中have提前。',
      errorPredictions: [
                    {
                              "wrongWord": "updates",
                              "replaces": "updated",
                              "errorType": "谓语架构",
                              "hint": "现在完成时需用过去分词updated，而非第三人称单数updates。"
                    }
          ],
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-6', text: `I need to find an internship soon.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-6b' }
      },
      template: `{0} {1} {2} {3} {4} yet?`,
      correctSentence: ["have", "you", "updated", "your", "résumé"],
      words: ["have", "you", "updated", "your", "résumé", "updates"]
    },
    {
      id: 118,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 2,
      keyPoints: ["现在完成时Have you done", "apply for申请"],
      hint: 'apply for是固定搭配表示\'申请\'，现在完成时疑问句Have提前。',
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-1', text: `I saw a job posting for a part-time position at the student bookstore.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-1b' }
      },
      template: `{0} {1} {2} {3} {4} yet?`,
      correctSentence: ["have", "you", "applied", "for", "it"],
      words: ["have", "you", "applied", "for", "it"]
    },
    {
      id: 119,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 2,
      keyPoints: ["一般将来时will not be", "be available有空/可用"],
      hint: 'will not be available表示届时没空，during those dates表示在那几天。',
      errorPredictions: [
                    {
                              "wrongWord": "am",
                              "replaces": "be",
                              "errorType": "谓语架构",
                              "hint": "am是be动词的现在时形式，但will后需接动词原形be。"
                    }
          ],
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-8', text: `Will you be attending the conference next week?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-8b' }
      },
      template: `{0} {1} {2} be {3} {4} {5} dates.`,
      correctSentence: ["I", "will", "not", "available", "during", "those"],
      words: ["I", "will", "not", "available", "during", "those", "am"]
    },
    {
      id: 120,
      setId: 'assessment-diagnostic',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 2,
      keyPoints: ["现在完成时Have you done", "make a plan制定计划", "yet句末"],
      hint: '现在完成时疑问句Have提前，make a study plan制定学习计划。',
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s18-2', text: `I need to study for my exams this weekend.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s18-2b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}?`,
      correctSentence: ["have", "you", "made", "a", "study", "plan", "yet"],
      words: ["have", "you", "made", "a", "study", "plan", "yet"]
    },
  ]
};

