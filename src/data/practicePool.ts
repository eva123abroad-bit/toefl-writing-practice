import { QuestionSet } from '../types';

// 练习题库 — 自动生成
export const practicePool: QuestionSet = {
  id: 'practice-pool',
  name: '练习题库',
  isFree: true,
  questionCount: 182,
  timeLimit: 1000,
  questions: [
    {
      id: 201,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 2,
      keyPoints: ["if引导的宾语从句", "间接疑问句语序（陈述语序而非倒装）"],
      hint: `if引导的宾语从句中，从句本身用陈述语序，不要倒装。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-1', text: `The students are organizing a charity run this weekend.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-1b' }
      },
      template: `{0} you {1} {2} {3} {4} {5}?`,
      correctSentence: ["do", "know", "if", "they", "have", "enough volunteers"],
      words: ["do", "know", "if", "they", "have", "enough volunteers"]
    },
    {
      id: 202,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["what引导的宾语从句", "疑问词+陈述语序"],
      hint: `what引导宾语从句时用陈述语序：what + 主语 + 谓语。`,
      errorPredictions: [
                    {
                              "wrongWord": "why",
                              "replaces": "what",
                              "errorType": "从句逻辑",
                              "hint": "why引导原因从句，而此处需要what作宾语从句的宾语。"
                    }
          ],
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-2', text: `I hear you're thinking of changing your course of study.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-2b' }
      },
      template: `{0} am {1} {2} {3} I {4} {5} {6}.`,
      correctSentence: ["I", "not", "sure", "what", "want", "to do", "in the future"],
      words: ["I", "not", "sure", "what", "want", "to do", "in the future", "why"]
    },
    {
      id: 203,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["when引导的间接疑问句（宾语从句）", "从句中主谓不倒装", "不定式短语to meet作状语"],
      hint: `间接疑问句中when后面跟陈述语序，不是疑问倒装语序。`,
      errorPredictions: [
                    {
                              "wrongWord": "so that",
                              "replaces": "when",
                              "errorType": "从句逻辑",
                              "hint": "误将间接疑问句当成目的状语从句，混淆了问句与目的关系。"
                    }
          ],
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-3', text: `What did Julio ask you?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-3b' }
      },
      template: `He {0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["wanted", "to know", "when", "the professor", "would", "be available", "to meet"],
      words: ["wanted", "to know", "when", "the professor", "would", "be available", "to meet", "so that"]
    },
    {
      id: 204,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["疑问词前置", "主谓语序排列", "不定式短语位置"],
      hint: `特殊疑问句What前置，剩余部分保持疑问句语序（助动词+主语+谓语+其他）。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-4', text: `My roommate and I are going to rearrange our dorm room.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-4b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}?`,
      correctSentence: ["What", "changes", "are", "you", "planning", "to", "make"],
      words: ["What", "changes", "are", "you", "planning", "to", "make"]
    },
    {
      id: 205,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 2,
      keyPoints: ["when引导的时间状语从句", "主句+从句的语序排列"],
      hint: `when引导时间状语从句，主句通常在前，从句在后。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-5', text: `Why didn't you answer your phone?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-5b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["I", "was", "in", "class", "when", "you", "called me"],
      words: ["I", "was", "in", "class", "when", "you", "called me"]
    },
    {
      id: 206,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 1,
      keyPoints: ["主系表结构", "地点状语后置"],
      hint: `简单的主语+be动词+形容词+地点状语结构，状语放在句末。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-7', text: `Did you find the information you were looking for?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-7b' }
      },
      template: `{0} {1} {2} {3}.`,
      correctSentence: ["It", "wasn't", "available", "online"],
      words: ["It", "wasn't", "available", "online"]
    },
    {
      id: 207,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 3,
      keyPoints: ["一般疑问句倒装", "assign sb. sth. 双宾语结构"],
      hint: `一般疑问句Did提前，双宾结构assign + 间接宾语(you) + 直接宾语(an interesting topic)。`,
      errorPredictions: [
                    {
                              "wrongWord": "to",
                              "replaces": "assign",
                              "errorType": "谓语架构",
                              "hint": "误以为assign后需加to，但双宾结构直接跟间接宾语。"
                    }
          ],
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-8', text: `I have to write a research paper for my class.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-8b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}?`,
      correctSentence: ["Did", "the professor", "assign", "you", "an", "interesting", "topic"],
      words: ["Did", "the professor", "assign", "you", "an", "interesting", "topic", "to"]
    },
    {
      id: 208,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 2,
      keyPoints: ["when引导的间接疑问句", "陈述语序"],
      hint: `when引导的宾语从句用陈述语序：when + 主语 + will + 谓语。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-4', text: `I submitted my application for the scholarship yesterday.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-4b' }
      },
      template: `{0} you {1} {2} {3} {4} {5}?`,
      correctSentence: ["do", "know", "when", "they", "will announce", "the results"],
      words: ["do", "know", "when", "they", "will announce", "the results"]
    },
    {
      id: 209,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 2,
      keyPoints: ["if引导的宾语从句", "一般疑问句结构"],
      hint: `if引导宾语从句，从句用陈述语序。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-5', text: `The guest speaker at the seminar was very knowledgeable.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-5b' }
      },
      template: `{0} {1} know {2} {3} {4} {5}?`,
      correctSentence: ["do", "you", "if", "she", "provided", "any additional resources"],
      words: ["do", "you", "if", "she", "provided", "any additional resources"]
    },
    {
      id: 210,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "副词usually的位置（be动词后）"],
      hint: `副词usually放在be动词之后，实义动词之前。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-7', text: `We need to hurry to catch the bus to the university.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-7b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}?`,
      correctSentence: ["do", "you", "know", "if it", "is", "usually", "on time"],
      words: ["do", "you", "know", "if it", "is", "usually", "on time"]
    },
    {
      id: 211,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 1,
      keyPoints: ["have sth. back结构", "副词back的位置"],
      hint: `have + 宾语 + back，副词back放在宾语之后。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-2', text: `I finished reading the textbook you lent me.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-2b' }
      },
      template: `{0} {1} {2} {3} {4} now?`,
      correctSentence: ["Can", "I", "have", "it", "back"],
      words: ["Can", "I", "have", "it", "back"]
    },
    {
      id: 212,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 2,
      keyPoints: ["if引导的宾语从句", "一般将来时"],
      hint: `if引导宾语从句，从句中用陈述语序。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-5', text: `The seminar on contemporary literature was fascinating.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-5b' }
      },
      template: `{0} {1} {2} {3} {4} {5} soon?`,
      correctSentence: ["Do you", "know", "if", "they", "will hold", "another session"],
      words: ["Do you", "know", "if", "they", "will hold", "another session"]
    },
    {
      id: 213,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["when引导的宾语从句", "find out + 从句结构", "be available to do"],
      hint: `when引导宾语从句作find out的宾语，从句用陈述语序。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-8', text: `When will the English Department meeting start?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-8b' }
      },
      template: `{0} {1} {2} {3} when everyone {4} {5}.`,
      correctSentence: ["I", "need", "to find", "out", "is available", "to meet"],
      words: ["I", "need", "to find", "out", "is available", "to meet"]
    },
    {
      id: 214,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["主谓结构", "时间介词at + 具体时刻", "on + 星期"],
      hint: `具体时刻用at（at 8 o'clock），星期用on（on Sundays）。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-10', text: `What time does the library close today?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-10b' }
      },
      template: `{0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["the", "library", "closes", "at", "8 o'clock on", "Sundays"],
      words: ["the", "library", "closes", "at", "8 o'clock on", "Sundays"]
    },
    {
      id: 215,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '修饰语位置',
      difficulty: 2,
      keyPoints: ["before引导的时间状语", "try to do结构"],
      hint: `before the deadline作时间状语放在句末。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-2', text: `Why aren't you joining us for lunch?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-2b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["I'm", "trying", "to", "finish", "a report", "before", "the deadline"],
      words: ["I'm", "trying", "to", "finish", "a report", "before", "the deadline"]
    },
    {
      id: 216,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["have to do必须做某事", "副词early的位置", "地点状语home"],
      hint: `have to + 动词原形，地点状语home紧接动词后，时间副词early放在句末。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-1', text: `Are you going to the student assembly after class?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-1b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["no, I", "have", "to", "go", "home", "early", "today"],
      words: ["no, I", "have", "to", "go", "home", "early", "today"]
    },
    {
      id: 217,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '修饰语位置',
      difficulty: 3,
      keyPoints: ["get stuck in固定搭配", "on the way to...介词短语"],
      hint: `get stuck in traffic（堵在路上），on the way to school（去学校的路上）。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-3', text: `Why were you late for the meeting?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-3b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6} school.`,
      correctSentence: ["i got", "stuck", "in", "traffic", "on", "the way", "to"],
      words: ["i got", "stuck", "in", "traffic", "on", "the way", "to"]
    },
    {
      id: 218,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '修饰语位置',
      difficulty: 3,
      keyPoints: ["enough修饰名词前置", "不定式to finish作定语/状语"],
      hint: `enough修饰名词时放在名词前（enough time），修饰形容词时放在形容词后。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-7', text: `Did you complete the online course?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-7b' }
      },
      template: `No, {0} {1} {2} to {3} {4}.`,
      correctSentence: ["I", "didn't have", "enough time", "finish", "it"],
      words: ["I", "didn't have", "enough time", "finish", "it"]
    },
    {
      id: 219,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["who引导的宾语从句", "宾语从句中主谓倒装（表语前置）"],
      hint: `who引导的宾语从句中，当who作表语时，语序为who + 主语 + 系动词，即who the author is。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-8', text: `Who wrote the article you mentioned in class?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-8b' }
      },
      template: `I'm not {0} {1} {2} {3} {4}.`,
      correctSentence: ["sure", "who", "the", "author", "is"],
      words: ["sure", "who", "the", "author", "is"]
    },
    {
      id: 220,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["主谓宾结构", "形容词前置修饰", "from介词短语"],
      hint: `形容词good放在news前面，from短语表示来源放在最后。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-9', text: `Why are you feeling so happy today?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-9b' }
      },
      template: `{0} {1} good {2} {3} {4} {5}.`,
      correctSentence: ["I received", "some", "news", "from", "my", "professor"],
      words: ["I received", "some", "news", "from", "my", "professor"]
    },
    {
      id: 221,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["who引导的宾语从句", "the most最高级"],
      hint: `who引导的宾语从句用陈述语序：who + I + like。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-10', text: `Who is your favorite professor?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-10b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["I'm not", "certain", "who", "I", "like", "the", "most"],
      words: ["I'm not", "certain", "who", "I", "like", "the", "most"]
    },
    {
      id: 222,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '修饰语位置',
      difficulty: 3,
      keyPoints: ["enough time to do", "before引导的时间状语"],
      hint: `enough time + to do不定式，before引导的时间短语放在句末。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-3', text: `I need to finish reading this book for my literature class.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-3b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6} your class?`,
      correctSentence: ["do", "you", "have", "enough time", "to finish", "it", "before"],
      words: ["do", "you", "have", "enough time", "to finish", "it", "before"]
    },
    {
      id: 223,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '修饰语位置',
      difficulty: 2,
      keyPoints: ["形容词前置修饰", "with介词短语表原因/归属"],
      hint: `technical修饰issues放在前面，with短语说明'关于什么的问题'放在后面。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-5', text: `Why didn't you submit the book report on time?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-5b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["I had", "some", "technical", "issues", "with", "my", "computer"],
      words: ["I had", "some", "technical", "issues", "with", "my", "computer"]
    },
    {
      id: 224,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["have sth. to do有某事要做", "名词修饰名词"],
      hint: `my economics assignment是'我的经济学作业'，to finish作定语修饰assignment。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-9', text: `I saw you in the library yesterday.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-9b' }
      },
      template: `{0} {1} {2} {3}.`,
      correctSentence: ["I had", "my economics", "assignment", "to finish"],
      words: ["I had", "my economics", "assignment", "to finish"]
    },
    {
      id: 225,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '修饰语位置',
      difficulty: 2,
      keyPoints: ["at the same time介词短语", "名词所有格doctor's"],
      hint: `at the same time（在同一时间），doctor's作为名词所有格，应放在'a'之后、'appointment'之前。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-1', text: `Why didn't you attend your morning class?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-1b' }
      },
      template: `{0} {1} doctor's {2} {3} {4} {5} {6}.`,
      correctSentence: ["I had", "a", "appointment", "at", "the", "same", "time"],
      words: ["I had", "a", "appointment", "at", "the", "same", "time"]
    },
    {
      id: 226,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '修饰语位置',
      difficulty: 3,
      keyPoints: ["不定式to finish作定语", "by + 时间表示截止"],
      hint: `to finish不定式修饰assignment，by tomorrow morning表示'在明早之前'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-2', text: `Why are you studying so late?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-2b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["I have", "an assignment", "to", "finish", "by", "tomorrow", "morning"],
      words: ["I have", "an assignment", "to", "finish", "by", "tomorrow", "morning"]
    },
    {
      id: 227,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 4,
      keyPoints: ["it takes + 时间结构", "过去分词allotted作后置定语"],
      hint: `it takes time是固定句型，allotted是过去分词作后置定语修饰time。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-3', text: `Is there any chance that you can finish the class project early?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-3b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6} allotted.`,
      correctSentence: ["no,", "it's going", "to", "take", "the", "full amount", "of time"],
      words: ["no,", "it's going", "to", "take", "the", "full amount", "of time"]
    },
    {
      id: 228,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["who引导的宾语从句（表语前置）", "主谓倒装语序"],
      hint: `who在从句中作表语，所以从句用the speaker is的语序。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-7', text: `Who is presenting in class tomorrow?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-7b' }
      },
      template: `{0} {1} {2} {3} {4} is.`,
      correctSentence: ["I", "don't", "know", "who", "the speaker"],
      words: ["I", "don't", "know", "who", "the speaker"]
    },
    {
      id: 229,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["who引导的宾语从句", "the most最高级"],
      hint: `who引导宾语从句用陈述语序，the most修饰动词like。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-9', text: `Who is your favorite classmate?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-9b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["I can't", "decide", "who", "I", "like", "the", "most"],
      words: ["I can't", "decide", "who", "I", "like", "the", "most"]
    },
    {
      id: 230,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["并列句and连接", "take the call接电话"],
      hint: `and连接两个并列分句，take the call是接电话的地道表达。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-10', text: `Why didn't you answer your phone?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-10b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["I was", "in", "a class", "and", "couldn't", "take", "the call"],
      words: ["I was", "in", "a class", "and", "couldn't", "take", "the call"]
    },
    {
      id: 231,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["省略that的定语从句", "过去分词listed作后置定语"],
      hint: `I received是省略that的定语从句修饰The email，listed是过去分词修饰time。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-2', text: `Why didn't you come to the literature symposium yesterday?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-2b' }
      },
      template: `{0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["the", "email I", "received", "had", "the wrong", "time listed"],
      words: ["the", "email I", "received", "had", "the wrong", "time listed"]
    },
    {
      id: 232,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["形容词correct前置修饰名词", "couldn't否定"],
      hint: `形容词correct放在solution前面修饰它。couldn't放在I和determine之间。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-3', text: `Were you able to solve the final math problem for the algebra assignment?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-3b' }
      },
      template: `{0} couldn't {1} {2} {3} {4}.`,
      correctSentence: ["I", "determine", "the", "correct", "solution"],
      words: ["I", "determine", "the", "correct", "solution"]
    },
    {
      id: 233,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["have no time没时间", "不定式to attend作定语"],
      hint: `have no time = don't have time，to attend不定式修饰time。`,
      errorPredictions: [
                    {
                              "wrongWord": "none",
                              "replaces": "not",
                              "errorType": "谓语架构",
                              "hint": "误将'none'当作否定词，但'none'是代词，不能直接否定动词。"
                    }
          ],
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-1', text: `Are you going to the class dinner tonight?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-1b' }
      },
      template: `{0}'m sorry, but I {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["I", "do", "not", "have", "time", "to", "attend"],
      words: ["I", "do", "not", "have", "time", "to", "attend", "none"]
    },
    {
      id: 234,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["when引导的宾语从句", "want to know + 间接疑问句", "plan to do"],
      hint: `when引导宾语从句用陈述语序，plan to complete表示计划完成。`,
      errorPredictions: [
                    {
                              "wrongWord": "as",
                              "replaces": "when",
                              "errorType": "从句逻辑",
                              "hint": "学生可能误用as表示“当…时”，但这里需要when引导宾语从句。"
                    }
          ],
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-5', text: `What did you discuss with the professor?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-5b' }
      },
      template: `She {0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["wanted", "to know", "when", "I plan", "to complete", "my", "assignment"],
      words: ["wanted", "to know", "when", "I plan", "to complete", "my", "assignment", "as"]
    },
    {
      id: 235,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '修饰语位置',
      difficulty: 3,
      keyPoints: ["find the time to do抽出时间做", "不定式to attend作定语"],
      hint: `find the time to do表示'抽出时间做'，to attend作定语修饰time。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-9', text: `Did you meet anyone new at the club fair?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-9b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["no, I", "didn't", "find", "the", "time", "to", "attend the event"],
      words: ["no, I", "didn't", "find", "the", "time", "to", "attend the event"]
    },
    {
      id: 236,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["省略that的定语从句", "过去分词listed作后置定语"],
      hint: `I received是省略that的定语从句，listed修饰time。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-2', text: `Why didn't you come to the literature symposium yesterday?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-2b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["the", "email", "I", "received", "had", "the wrong", "time listed"],
      words: ["the", "email", "I", "received", "had", "the wrong", "time listed"]
    },
    {
      id: 237,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["be going to一般将来时", "选择疑问句or结构"],
      hint: `be going to表示将来，is it going to start构成一般疑问句，morning or afternoon用or连接，afternoon在模板末尾。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-6', text: `There's a career fair in the auditorium tomorrow.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-6b' }
      },
      template: `{0} {1} {2} {3} {4} afternoon?`,
      correctSentence: ["is it", "going to", "start", "in the", "morning or"],
      words: ["is it", "going to", "start", "in the", "morning or"]
    },
    {
      id: 238,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["how引导的宾语从句", "want to know + 间接疑问句"],
      hint: `how引导宾语从句用陈述语序：how + I + did。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-9', text: `What did the professor ask about your thesis?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-9b' }
      },
      template: `He {0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["wanted", "to know", "how", "I", "did", "my", "research"],
      words: ["wanted", "to know", "how", "I", "did", "my", "research"]
    },
    {
      id: 239,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 2,
      keyPoints: ["if引导的宾语从句"],
      hint: `do you构成一般疑问句，know放在you之后，if引导宾语从句用陈述语序。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-3', text: `Hannah mentioned the upcoming research conference in her email.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-3b' }
      },
      template: `{0} {1} know {2} {3} {4} {5}?`,
      correctSentence: ["do", "you", "if", "she", "included", "the schedule"],
      words: ["do", "you", "if", "she", "included", "the schedule"]
    },
    {
      id: 240,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 3,
      keyPoints: ["特殊疑问句倒装", "将来进行时will be doing"],
      hint: `What前置，将来进行时will be discussing，注意疑问句倒装：will放在you前面。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-4', text: `I have a meeting with my advisor this afternoon.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-4b' }
      },
      template: `{0} {1} you {2} {3}?`,
      correctSentence: ["what", "will", "be", "discussing"],
      words: ["what", "will", "be", "discussing"]
    },
    {
      id: 241,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["疑问词What前置", "介词about不提前"],
      hint: `介词about留在句末不提前，What作about的宾语。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-5', text: `I need to finish my essay by Friday.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-5b' }
      },
      template: `{0} {1} are {2} {3} {4}?`,
      correctSentence: ["what", "topic", "you", "writing", "about"],
      words: ["what", "topic", "you", "writing", "about"]
    },
    {
      id: 242,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["What time疑问词短语", "一般现在时助动词does前置"],
      hint: `What time作整体疑问短语，一般现在时用does倒装。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-6', text: `Tomorrow is the big game between our school and the rival team.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-6b' }
      },
      template: `{0} {1} does {2} {3} {4}?`,
      correctSentence: ["what", "time", "the", "game", "start"],
      words: ["what", "time", "the", "game", "start"]
    },
    {
      id: 243,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '修饰语位置',
      difficulty: 3,
      keyPoints: ["be able to do", "before引导的时间状语", "not的位置"],
      hint: `not放在be动词后，before the deadline放在句末。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-7', text: `Did you finish the assignment on time?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-7b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6} the deadline.`,
      correctSentence: ["I", "was", "not", "able", "to complete", "it", "before"],
      words: ["I", "was", "not", "able", "to complete", "it", "before"]
    },
    {
      id: 244,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 3,
      keyPoints: ["现在完成时have not had", "不定式to look at", "yet句末"],
      hint: `现在完成时否定：have not had，to look at是不定式短语。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-9', text: `Did you get a chance to review the report?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-9b' }
      },
      template: `Sorry, but I {0} {1} {2} {3} {4} {5} {6} yet.`,
      correctSentence: ["have", "not", "had", "time", "to look", "at", "it"],
      words: ["have", "not", "had", "time", "to look", "at", "it"]
    },
    {
      id: 245,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '修饰语位置',
      difficulty: 3,
      keyPoints: ["be going to一般将来时", "have time to do", "不定式to edit"],
      hint: `have time to edit表示'有时间编辑'，to edit不定式。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-4', text: `I have to finish this report by tomorrow.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-4b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6} the report?`,
      correctSentence: ["are", "you", "going to", "have", "time", "to", "edit"],
      words: ["are", "you", "going to", "have", "time", "to", "edit"]
    },
    {
      id: 246,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["usually的位置（实义动词前）", "否定not的位置"],
      hint: `频率副词usually放在助动词do之前、否定词not之前。`,
      errorPredictions: [
                    {
                              "wrongWord": "am",
                              "replaces": "do",
                              "errorType": "谓语架构",
                              "hint": "误将am视为be动词，但主语I后需助动词do构成否定。"
                    }
          ],
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-5', text: `Are you attending the networking event tonight?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-5b' }
      },
      template: `{0} usually {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["I", "do", "not", "go", "to", "those", "events"],
      words: ["I", "do", "not", "go", "to", "those", "events", "am"]
    },
    {
      id: 247,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 2,
      keyPoints: ["过去时否定did not have", "have time for有时间做"],
      hint: `did not have是过去时否定，have time for sth.表示'有时间做某事'。`,
      errorPredictions: [
                    {
                              "wrongWord": "had",
                              "replaces": "did not have",
                              "errorType": "谓语架构",
                              "hint": "误以为had可直接表否定，但需加did not构成过去否定式。"
                    }
          ],
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-8', text: `Did you go to the library today?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-8b' }
      },
      template: `Unfortunately, {0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["I", "did", "not", "have", "time", "for", "a visit"],
      words: ["I", "did", "not", "have", "time", "for", "a visit", "had"]
    },
    {
      id: 248,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 3,
      keyPoints: ["现在完成时否定", "形容词final前置修饰", "of the game介词短语"],
      hint: `final修饰score放在前面，of the game放在后面表示所属。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-10', text: `Who won the university's cricket match last night?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-10b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6} yet.`,
      correctSentence: ["I", "haven't", "checked", "the", "final", "score", "of the game"],
      words: ["I", "haven't", "checked", "the", "final", "score", "of the game"]
    },
    {
      id: 249,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["过去进行时", "for + 名词表目的", "at + 地点"],
      hint: `过去进行时was studying，for表示目的，at the library表示地点。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-5', text: `Why didn't you call me yesterday?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-5b' }
      },
      template: `{0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["I was", "studying", "for", "my calculus", "test at", "the library"],
      words: ["I was", "studying", "for", "my calculus", "test at", "the library"]
    },
    {
      id: 250,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 1,
      keyPoints: ["have no plans没有计划", "不定式to go作定语"],
      hint: `have no plans表示"没有计划"，no直接修饰plans，to go不定式修饰plans。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-10', text: `Are you going to the campus social this weekend?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-10b' }
      },
      template: `{0} have {1} {2} {3} {4}.`,
      correctSentence: ["I", "no", "plans", "to", "go"],
      words: ["I", "no", "plans", "to", "go"]
    },
    {
      id: 251,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["形容词current前置", "名词修饰名词workout routine"],
      hint: `current修饰workout routine放在前面，prefer后直接接宾语。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-1', text: `Are you planning to join the university's aerobic fitness class?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-1b' }
      },
      template: `No, {0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["I", "prefer", "my", "current", "workout", "routine"],
      words: ["I", "prefer", "my", "current", "workout", "routine"]
    },
    {
      id: 252,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '修饰语位置',
      difficulty: 3,
      keyPoints: ["过去分词短语作后置定语", "be known for因...闻名"],
      hint: `known for its engineering program是过去分词短语作后置定语。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-4', text: `Which university did you attend?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-4b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["the", "one", "known", "for", "its", "engineering", "program"],
      words: ["the", "one", "known", "for", "its", "engineering", "program"]
    },
    {
      id: 253,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '修饰语位置',
      difficulty: 3,
      keyPoints: ["too many太多", "不定式to run作定语修饰errands"],
      hint: `too many + 复数名词，to run不定式修饰errands。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-10', text: `Why didn't you go to the library today?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-10b' }
      },
      template: `{0} {1} {2} {3} errands {4} {5}.`,
      correctSentence: ["I had", "too", "many", "other", "to", "run"],
      words: ["I had", "too", "many", "other", "to", "run"]
    },
    {
      id: 254,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["What places疑问词短语", "一般将来时倒装"],
      hint: `What places作疑问词短语前置，后面用一般将来时倒装。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-4', text: `I'm planning to go on a road trip during our semester break.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-4b' }
      },
      template: `{0} places {1} {2} {3}?`,
      correctSentence: ["what", "will", "you", "visit"],
      words: ["what", "will", "you", "visit"]
    },
    {
      id: 255,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["特殊疑问句倒装", "plan to do"],
      hint: `What前置，are planning进行时倒装，to do不定式。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-5', text: `Do you have any plans after class on Friday?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-5b' }
      },
      template: `No, but {0} {1} you {2} {3} {4}?`,
      correctSentence: ["what", "are", "planning", "to", "do"],
      words: ["what", "are", "planning", "to", "do"]
    },
    {
      id: 256,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["report sth. to sb./机构", "一般过去时疑问句"],
      hint: `report it to campus security表示"向校园保安报告"。'did'后接主语'you'，再接动词原形'report'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-8', text: `I lost my wallet on the way to class yesterday.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-8b' }
      },
      template: `{0} you {1} {2} {3} {4} security?`,
      correctSentence: ["did", "report", "it", "to", "campus"],
      words: ["did", "report", "it", "to", "campus"]
    },
    {
      id: 257,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '修饰语位置',
      difficulty: 3,
      keyPoints: ["enough time to do", "before时间状语"],
      hint: `enough time + to do，before引导时间短语放在句末。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-3', text: `I need to finish reading this book for my literature class.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-3b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6} your class?`,
      correctSentence: ["do", "you", "have", "enough time", "to finish", "it", "before"],
      words: ["do", "you", "have", "enough time", "to finish", "it", "before"]
    },
    {
      id: 258,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["疑问词前置", "进行时"],
      hint: `Which brand前置，are放在主语you之前，构成进行时倒装。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-4', text: `I'm thinking about getting a new laptop.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-4b' }
      },
      template: `{0} {1} are {2} {3}?`,
      correctSentence: ["which", "brand", "you", "considering"],
      words: ["which", "brand", "you", "considering"]
    },
    {
      id: 259,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["have sth. to do", "名词修饰名词"],
      hint: `have + 宾语 + to do，to finish不定式修饰assignment。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-9', text: `I saw you in the library yesterday.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-9b' }
      },
      template: `{0} {1} {2} {3}.`,
      correctSentence: ["I had", "my economics", "assignment", "to finish"],
      words: ["I had", "my economics", "assignment", "to finish"]
    },
    {
      id: 260,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '修饰语位置',
      difficulty: 3,
      keyPoints: ["主系表结构", "very修饰形容词", "to me介词短语"],
      hint: `very修饰appealing，not very表示'不太'，to me表示'对我来说'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s16-3', text: `Did you like the new offerings in the university cafeteria?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s16-3b' }
      },
      template: `{0} {1} {2} {3} {4} {5} to me.`,
      correctSentence: ["the", "options", "were", "not", "very", "appealing"],
      words: ["the", "options", "were", "not", "very", "appealing"]
    },
    {
      id: 261,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["do not have否定", "不定式to attend"],
      hint: `do not have time = have no time，to attend不定式。`,
      errorPredictions: [
                    {
                              "wrongWord": "none",
                              "replaces": "not",
                              "errorType": "谓语架构",
                              "hint": "误以为none可替代not，但none是代词，不能直接否定动词。"
                    }
          ],
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s16-9', text: `Are you going to the class dinner tonight?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s16-9b' }
      },
      template: `{0}'m sorry, but I {1} {2} {3} {4} {5}.`,
      correctSentence: ["I", "do", "not", "have", "time", "to attend"],
      words: ["I", "do", "not", "have", "time", "to attend", "none"]
    },
    {
      id: 262,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '修饰语位置',
      difficulty: 3,
      keyPoints: ["现在完成时否定", "不定式to introduce作定语", "反身代词myself"],
      hint: `haven't had现在完成时否定，to introduce myself作定语修饰the chance。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s16-10', text: `Have you met the new biology professor yet?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s16-10b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["no, I", "haven't", "had", "the chance", "to", "introduce", "myself"],
      words: ["no, I", "haven't", "had", "the chance", "to", "introduce", "myself"]
    },
    {
      id: 263,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 2,
      keyPoints: ["have no time没时间", "不定式to attend"],
      hint: `have no time = don't have time，to attend不定式。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s18-1', text: `Are you going to the class dinner tonight?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s18-1b' }
      },
      template: `{0} {1}, {2} I {3} no {4} {5} {6}.`,
      correctSentence: ["I'm", "sorry", "but", "have", "time", "to", "attend"],
      words: ["I'm", "sorry", "but", "have", "time", "to", "attend", "do", "not", "none"]
    },
    {
      id: 264,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["that引导的定语从句", "关系代词that作主语", "enrolled in搭配"],
      hint: `that引导定语从句修饰前面的名词，that在从句中作主语不可省略。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-6', text: `Which course are you taking next semester?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-6b' }
      },
      template: `I'm enrolled {0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["in the", "one", "that", "covers", "advanced", "mathematics"],
      words: ["in the", "one", "that", "covers", "advanced", "mathematics"]
    },
    {
      id: 265,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 2,
      keyPoints: ["whether引导的宾语从句", "tell sb. whether... 结构"],
      hint: `whether和if都能引导宾语从句表示'是否'，whether更正式。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-1', text: `Tom said he'll be late to the internship meeting.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-1b' }
      },
      template: `Can you {0} {1} {2} {3} {4} {5}?`,
      correctSentence: ["tell", "me", "whether", "he", "provided", "a reason"],
      words: ["tell", "me", "whether", "he", "provided", "a reason"]
    },
    {
      id: 266,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 2,
      keyPoints: ["that引导的定语从句", "that作宾语可省略", "形容词前置修饰"],
      hint: `that引导定语从句修饰book，that在从句中作recommended的宾语。`,
      errorPredictions: [
                    {
                              "wrongWord": "a",
                              "replaces": "an",
                              "errorType": "修饰语位置",
                              "hint": "误以为exciting以辅音开头，忽略元音发音需用an。"
                    }
          ],
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-2', text: `Which book are you reading?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-2b' }
      },
      template: `I'm reading {0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["an", "exciting", "book", "that", "my friend", "recommended"],
      words: ["an", "exciting", "book", "that", "my friend", "recommended", "a"]
    },
    {
      id: 267,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "长主语结构", "并列宾语"],
      hint: `that引导定语从句修饰the one，从句谓语involves后跟并列名词短语。right now是固定短语。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-3', text: `Which project are you working on with your internship?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-3b' }
      },
      template: `{0} {1} {2} {3} {4} {5} now.`,
      correctSentence: ["the one", "that involves", "community outreach", "and education", "is my", "focus right"],
      words: ["the one", "that involves", "community outreach", "and education", "is my", "focus right"]
    },
    {
      id: 268,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["where引导的定语从句", "比较级结构", "长主语从句"],
      hint: `where引导定语从句修饰the place，主句核心是The place is quieter。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-8', text: `I heard you moved to an off-campus apartment. How is it?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-8b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["the place where", "I live now", "is much quieter", "than", "my", "old", "one"],
      words: ["the place where", "I live now", "is much quieter", "than", "my", "old", "one"]
    },
    {
      id: 269,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 2,
      keyPoints: ["if引导的宾语从句", "现在完成时"],
      hint: `if从句中用现在完成时has accepted表示已完成的动作。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-9', text: `Sarah mentioned that she received a scholarship.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=05-9b' }
      },
      template: `{0} you {1} {2} {3} {4} {5}?`,
      correctSentence: ["do", "know", "if", "she", "has accepted", "it"],
      words: ["do", "know", "if", "she", "has accepted", "it"]
    },
    {
      id: 270,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["whether引导的宾语从句", "被动语态will be held", "时间状语位置"],
      hint: `whether引导的宾语从句中，被动语态be + 过去分词不可拆开。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-1', text: `The science fair last night was very impressive.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-1b' }
      },
      template: `Can {0} {1} {2} {3} {4}?`,
      correctSentence: ["you tell", "me whether", "it will be", "held again", "next year"],
      words: ["you tell", "me whether", "it will be", "held again", "next year"]
    },
    {
      id: 271,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["whether引导的宾语从句", "in advance短语位置"],
      hint: `whether引导从句，in advance作为固定短语放在句末。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-3', text: `I have a job interview scheduled for Monday for a new work study program.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-3b' }
      },
      template: `Can you {0} {1} {2} {3} {4} {5}?`,
      correctSentence: ["tell me", "whether you", "prepared", "your", "answers in", "advance"],
      words: ["tell me", "whether you", "prepared", "your", "answers in", "advance"]
    },
    {
      id: 272,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["what引导的宾语从句", "从句中的被动语态", "介词短语位置"],
      hint: `what topics作从句主语，被动语态were covered保持不变。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-4', text: `What did that student just ask you?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-4b' }
      },
      template: `{0} {1} what {2} {3} {4} {5}.`,
      correctSentence: ["he", "wanted to know", "topics", "were covered", "in", "our discussion"],
      words: ["he", "wanted to know", "topics", "were covered", "in", "our discussion"]
    },
    {
      id: 273,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 2,
      keyPoints: ["省略that的定语从句", "现在完成时"],
      hint: `you like是省略了that/which的定语从句，修饰a place。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-6', text: `I'm thinking about moving off campus next semester.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-6b' }
      },
      template: `Have {0} {1} {2} {3} {4} {5}?`,
      correctSentence: ["you", "found", "a", "place", "you", "like"],
      words: ["you", "found", "a", "place", "you", "like"]
    },
    {
      id: 274,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["省略that的定语从句", "all the + 名词结构"],
      hint: `you'll need是省略了that的定语从句，修饰the supplies。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-9', text: `I've decided to study painting at my university.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-9b' }
      },
      template: `Do {0} {1} {2} {3} {4} {5}?`,
      correctSentence: ["you", "have all", "the", "supplies", "you'll", "need"],
      words: ["you", "have all", "the", "supplies", "you'll", "need"]
    },
    {
      id: 275,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 3,
      keyPoints: ["allow sb. to do结构", "否定式did not", "句首副词"],
      hint: `allow sb. to do是固定搭配，否定形式did not allow。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-1', text: `Did you attend the conference last week?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-1b' }
      },
      template: `Unfortunately, {0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["my schedule", "did", "not", "allow", "me", "to", "go"],
      words: ["my schedule", "did", "not", "allow", "me", "to", "go"]
    },
    {
      id: 276,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '特殊句式',
      difficulty: 3,
      keyPoints: ["be able to do结构", "make it固定搭配（成功做到/出席）"],
      hint: `be able to = can，make it是口语中表示'能赶到/能出席'的固定搭配。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-5', text: `Are you going to the class picnic?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-5b' }
      },
      template: `Unfortunately, I {0} {1} {2} {3} {4} {5} {6} this year.`,
      correctSentence: ["will", "not", "be", "able", "to", "make", "it"],
      words: ["will", "not", "be", "able", "to", "make", "it"]
    },
    {
      id: 277,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "选择疑问句or结构"],
      hint: `if引导的宾语从句中包含or连接的选择结构。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-7', text: `I heard that the science fair is happening next weekend.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-7b' }
      },
      template: `{0} {1} {2} {3} {4} afternoon?`,
      correctSentence: ["Do you", "know if", "it starts", "in the", "morning or"],
      words: ["Do you", "know if", "it starts", "in the", "morning or"]
    },
    {
      id: 278,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 2,
      keyPoints: ["省略that的定语从句", "主系表结构"],
      hint: `we visited是省略了that的定语从句，修饰The places。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-10', text: `How was your semester abroad in Italy?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-10b' }
      },
      template: `{0} {1} {2} were {3}.`,
      correctSentence: ["The places", "we", "visited", "breathtaking"],
      words: ["The places", "we", "visited", "breathtaking"]
    },
    {
      id: 279,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "there be句型", "形容词后置"],
      hint: `if从句中用there are，形容词free和副词nearby分别修饰名词parking spots。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-2', text: `It looks like the university's student-faculty parking lot is full.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-2b' }
      },
      template: `{0} {1} {2} free {3} {4} {5}?`,
      correctSentence: ["do you know", "if there are", "any", "parking", "spots", "nearby"],
      words: ["do you know", "if there are", "any", "parking", "spots", "nearby"]
    },
    {
      id: 280,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["that引导的定语从句", "并列宾语"],
      hint: `that引导定语从句修饰a cake，从句宾语用and连接。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-4', text: `Which dessert are you bringing to the campus holiday party?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-4b' }
      },
      template: `{0} {1} {2} {3} {4}.`,
      correctSentence: ["I'm baking", "a cake", "that has", "chocolate", "and strawberries"],
      words: ["I'm baking", "a cake", "that has", "chocolate", "and strawberries"]
    },
    {
      id: 281,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["who引导的宾语从句", "can't remember + 从句"],
      hint: `who引导宾语从句，在从句中作主语。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-1', text: `Who is the author of this novel?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-1b' }
      },
      template: `{0} {1} {2} {3} wrote {4}.`,
      correctSentence: ["I", "can't", "remember", "who", "it"],
      words: ["I", "can't", "remember", "who", "it"]
    },
    {
      id: 282,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 4,
      keyPoints: ["现在进行时被动语态", "选择疑问句or结构"],
      hint: `being held是现在进行时的被动语态（be being done）。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-2', text: `I signed up for a psychology class this semester.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-2b' }
      },
      template: `Is {0} {1} {2} {3}?`,
      correctSentence: ["it", "being", "held online", "or in person"],
      words: ["it", "being", "held online", "or in person"]
    },
    {
      id: 283,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["that引导的定语从句", "couldn't否定"],
      hint: `that引导定语从句修饰a family gathering，that在从句中作miss的宾语。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-6', text: `Why didn't you attend the biology lecture yesterday?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-6b' }
      },
      template: `{0} {1} {2} {3} {4} {5} miss.`,
      correctSentence: ["I", "had", "a family", "gathering", "that I", "couldn't"],
      words: ["I", "had", "a family", "gathering", "that I", "couldn't"]
    },
    {
      id: 284,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "be open to固定搭配", "yet在疑问句末"],
      hint: `be open to the public（对公众开放）是固定搭配，if引导宾语从句。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-7', text: `I heard that the gallery has an exhibition of student work.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-7b' }
      },
      template: `{0} know {1} {2} {3} {4} {5}?`,
      correctSentence: ["do you", "if", "it's", "open to", "the", "public yet"],
      words: ["do you", "if", "it's", "open to", "the", "public yet"]
    },
    {
      id: 285,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 2,
      keyPoints: ["if引导的宾语从句", "一般现在时第三人称单数"],
      hint: `if从句中主语the position是第三人称单数，谓语用requires。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-8', text: `There is a work study position in the athletic department.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-8b' }
      },
      template: `{0} you {1} {2} {3} {4}?`,
      correctSentence: ["do", "know", "if", "the position", "requires experience"],
      words: ["do", "know", "if", "the position", "requires experience"]
    },
    {
      id: 286,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "从句中的被动语态"],
      hint: `if从句中用被动语态were suggested，主语changes是复数。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-10', text: `The club members and the faculty advisor approved the new policy.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2-10b' }
      },
      template: `{0} {1} know {2} {3} {4}?`,
      correctSentence: ["do", "you", "if", "any changes", "were suggested"],
      words: ["do", "you", "if", "any changes", "were suggested"]
    },
    {
      id: 287,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["until引导的时间状语从句", "不定式to decide表目的"],
      hint: `until引导时间状语，to decide不定式表示目的。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-6', text: `Are you planning to buy a new couch for your dorm room?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-6b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6} decide.`,
      correctSentence: ["no, I'm", "waiting", "until", "their", "next", "sale", "to"],
      words: ["no, I'm", "waiting", "until", "their", "next", "sale", "to"]
    },
    {
      id: 288,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "Would you like to... 礼貌请求"],
      hint: `if引导宾语从句，Would you like to是礼貌表达'你想不想'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-8', text: `Where did you purchase the supplies for class?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-8b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}?`,
      correctSentence: ["would you", "like to", "know", "if they", "offer", "student", "discounts"],
      words: ["would you", "like to", "know", "if they", "offer", "student", "discounts"]
    },
    {
      id: 289,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "be supposed to do应该做某事", "被动语态was canceled"],
      hint: `that引导定语从句修饰The workshop，主句用被动语态was canceled。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-1', text: `Why didn't you attend the biology workshop on Tuesday?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-1b' }
      },
      template: `{0} {1} {2} {3} {4} {5} canceled.`,
      correctSentence: ["the workshop", "that was", "supposed to", "take", "place", "was"],
      words: ["the workshop", "that was", "supposed to", "take", "place", "was"]
    },
    {
      id: 290,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["before引导的时间状语从句", "have to do必须做", "return sth. to"],
      hint: `before引导时间状语从句，主句和从句各有自己的主语和谓语。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-4', text: `Why didn't you read the book I recommended?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-4b' }
      },
      template: `{0} {1} {2} {3} {4} {5} finish it.`,
      correctSentence: ["I had", "to return", "it", "to the library", "before", "I could"],
      words: ["I had", "to return", "it", "to the library", "before", "I could"]
    },
    {
      id: 291,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "主系表结构", "最高级the best"],
      hint: `that引导定语从句修饰The park，主句核心是The park is my favorite。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-5', text: `Why do you prefer that off-campus park for jogging?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-5b' }
      },
      template: `{0} {1} {2} {3} {4} {5} favorite.`,
      correctSentence: ["the park", "that", "has", "the best", "trails", "is my"],
      words: ["the park", "that", "has", "the best", "trails", "is my"]
    },
    {
      id: 292,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "seem to do似乎", "work best最有效"],
      hint: `that引导定语从句修饰The technique，seem to work表示'似乎有效'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-6', text: `Why do you prefer this study method?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-6b' }
      },
      template: `{0} {1} {2} {3} to {4} {5} {6} me.`,
      correctSentence: ["the technique", "that my", "tutor recommended", "seems", "work", "best", "for"],
      words: ["the technique", "that my", "tutor recommended", "seems", "work", "best", "for"]
    },
    {
      id: 293,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "be close to固定搭配", "主系表结构"],
      hint: `that引导定语从句修饰The park，be close to表示'靠近'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-7', text: `What is your favorite place to relax?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-7b' }
      },
      template: `{0} {1} {2} {3} {4} {5} favorite spot.`,
      correctSentence: ["the", "park that", "is close", "to campus", "is", "my"],
      words: ["the", "park that", "is close", "to campus", "is", "my"]
    },
    {
      id: 294,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 3,
      keyPoints: ["find + 宾语 + 宾补结构", "否定转移did not"],
      hint: `find it + adj.（觉得它怎样），否定用did not find。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-8', text: `Did you enjoy the lecture on modern art?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-8b' }
      },
      template: `{0} did {1} {2} {3} {4} {5}.`,
      correctSentence: ["I", "not", "find", "it", "very", "engaging"],
      words: ["I", "not", "find", "it", "very", "engaging"]
    },
    {
      id: 295,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["whether引导的宾语从句", "be suitable for适合"],
      hint: `whether引导宾语从句，be suitable for表示'适合...'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-9', text: `I signed up for the school's coding workshop next month.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-9b' }
      },
      template: `Can {0} {1} {2} {3} {4}?`,
      correctSentence: ["you", "tell", "me whether", "it's suitable", "for beginners"],
      words: ["you", "tell", "me whether", "it's suitable", "for beginners"]
    },
    {
      id: 296,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "be next to在...旁边", "have the best"],
      hint: `that引导定语从句修饰The café，主句谓语has the best coffee。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-10', text: `What is the best place to get coffee off campus?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4-10b' }
      },
      template: `{0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["the café", "that is", "next to", "the office towers", "has the", "best coffee"],
      words: ["the café", "that is", "next to", "the office towers", "has the", "best coffee"]
    },
    {
      id: 297,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "need to do", "any用于疑问句"],
      hint: `if引导宾语从句，从句中用need to do，疑问句用any。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-3', text: `I signed up for the painting class next week.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-3b' }
      },
      template: `{0} {1} {2} {3} {4} {5}?`,
      correctSentence: ["do you", "know if", "there are", "any materials", "I need", "to bring"],
      words: ["do you", "know if", "there are", "any materials", "I need", "to bring"]
    },
    {
      id: 298,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 5,
      keyPoints: ["that引导的定语从句", "被动语态was published", "过去分词短语"],
      hint: `that引导定语从句修饰the research paper，从句中用被动语态was published。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-4', text: `Where did you get that information?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-4b' }
      },
      template: `{0} read it {1} {2} {3} {4} {5}.`,
      correctSentence: ["I", "in", "the research paper", "that", "was", "published last week"],
      words: ["I", "in", "the research paper", "that", "was", "published last week"]
    },
    {
      id: 299,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["if引导的宾语从句", "speak with固定搭配"],
      hint: `if引导宾语从句，speak with表示'与...交谈'。`,
      errorPredictions: [
                    {
                              "wrongWord": "stopped",
                              "replaces": "speak with",
                              "errorType": "谓语架构",
                              "hint": "误将stopped当作过去式谓语，但宾语从句需用原形动词。"
                    }
          ],
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-6', text: `Do you have a question about the interview process for the research position at the Chemistry Department?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-6b' }
      },
      template: `Do {0} {1} {2} {3} {4} {5} the head of the department?`,
      correctSentence: ["you", "know", "if", "I", "will", "speak with"],
      words: ["you", "know", "if", "I", "will", "speak with", "stopped"]
    },
    {
      id: 300,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["that引导的宾语从句", "主谓宾结构"],
      hint: `that引导宾语从句作mentioned的宾语，从句是完整的SVO结构。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-10', text: `Where did you get that information?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-10b' }
      },
      template: `Our professor {0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["mentioned", "that", "the website", "has", "all", "the details"],
      words: ["mentioned", "that", "the website", "has", "all", "the details"]
    },
    {
      id: 301,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 5,
      keyPoints: ["what引导的宾语从句", "be curious to do", "types of + 名词"],
      hint: `what引导宾语从句，types of readings表示'哪种阅读材料'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-3', text: `Why were you talking with the professor?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-3b' }
      },
      template: `He was curious {0} {1} {2} {3} {4} from {5}.`,
      correctSentence: ["to find", "out", "what", "types of readings", "I enjoyed", "last semester's class"],
      words: ["to find", "out", "what", "types of readings", "I enjoyed", "last semester's class", "prevented"]
    },
    {
      id: 302,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["if引导的宾语从句", "need to do", "prepare a presentation"],
      hint: `if引导宾语从句，从句中need to prepare a presentation。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-4', text: `We have a new project starting next week in collaboration with another class.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-4b' }
      },
      template: `{0} {1} {2} {3} {4} for {5}?`,
      correctSentence: ["do you know", "if we", "need to", "prepare a", "presentation", "the kickoff meeting"],
      words: ["do you know", "if we", "need to", "prepare a", "presentation", "the kickoff meeting"]
    },
    {
      id: 303,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "最高级the best"],
      hint: `that引导定语从句修饰The park，主句是The park is my favorite。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-7', text: `Why do you prefer that off-campus park for jogging?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-7b' }
      },
      template: `{0} {1} {2} {3} {4} {5} favorite.`,
      correctSentence: ["the park", "that", "has", "the best", "trails", "is my"],
      words: ["the park", "that", "has", "the best", "trails", "is my"]
    },
    {
      id: 304,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 2,
      keyPoints: ["when引导的宾语从句", "the next one指代"],
      hint: `do you know ..? 一般疑问句。when 引导宾语从句使用陈述语序the next one will be。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-8', text: `The class presentation on renewable energy was very informative.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-8b' }
      },
      template: `{0} {1} {2} {3} be?`,
      correctSentence: ["do you", "know when", "the next", "one will"],
      words: ["do you", "know when", "the next", "one will"]
    },
    {
      id: 305,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "interest sb.使某人感兴趣", "the most最高级"],
      hint: `that引导定语从句修饰the school，interest me是动宾关系。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-10', text: `Why did you choose that university?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-10b' }
      },
      template: `My teacher {0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["suggested", "the school", "that", "would", "interest", "me", "the most"],
      words: ["suggested", "the school", "that", "would", "interest", "me", "the most"]
    },
    {
      id: 306,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "现在完成时被动语态"],
      hint: `if从句中用现在完成时被动语态has been announced。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-8', text: `The assignment deadline has been extended.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-8b' }
      },
      template: `Do {0} {1} {2} {3} {4} {5}?`,
      correctSentence: ["you", "know", "if", "the new", "due date", "has been announced"],
      words: ["you", "know", "if", "the new", "due date", "has been announced"]
    },
    {
      id: 307,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 5,
      keyPoints: ["when引导的定语从句", "主谓一致（dates复数→conflict）", "conflict with搭配"],
      hint: `when引导定语从句修饰The dates，注意主语dates是复数所以谓语用conflict。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-10', text: `Why aren't you attending the conference?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-10b' }
      },
      template: `The dates {0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["when", "it", "is scheduled", "conflict with", "my", "other commitments"],
      words: ["when", "it", "is scheduled", "conflict with", "my", "other commitments"]
    },
    {
      id: 308,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 5,
      keyPoints: ["that引导的定语从句（嵌套）", "省略that的定语从句"],
      hint: `that has the software修饰the one，I need是省略that的定语从句修饰the software。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-1', text: `Why are you using that laptop?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-1b' }
      },
      template: `{0} {1} {2} {3} {4} {5} project.`,
      correctSentence: ["it's the", "one that", "has the", "software that I", "need for", "my"],
      words: ["it's the", "one that", "has the", "software that I", "need for", "my"]
    },
    {
      id: 309,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["that引导的定语从句", "复合形容词built-in"],
      hint: `that引导定语从句修饰the one，built-in是复合形容词。`,
      errorPredictions: [
                    {
                              "wrongWord": "what",
                              "replaces": "that",
                              "errorType": "从句逻辑",
                              "hint": "what不能引导定语从句，应使用that指代先行词。"
                    }
          ],
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-2', text: `Which backpack did you buy?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-2b' }
      },
      template: `I bought the one {0} {1} {2} {3} {4}.`,
      correctSentence: ["that", "has", "a", "built-in", "charger"],
      words: ["that", "has", "a", "built-in", "charger", "what"]
    },
    {
      id: 310,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["whether引导的宾语从句", "by the end of截止到...月底"],
      hint: `whether引导宾语从句，by the end of the month是时间状语。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-3', text: `The library will be closed for renovations next week.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-3b' }
      },
      template: `Can you {0} {1} {2} {3} {4} {5}?`,
      correctSentence: ["tell me", "whether it", "will reopen by", "the end", "of", "the month"],
      words: ["tell me", "whether it", "will reopen by", "the end", "of", "the month"]
    },
    {
      id: 311,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "aim to do旨在做", "with介词短语"],
      hint: `that引导定语从句修饰a company，从句谓语aimed to reduce。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-9', text: `Which internship did you have during the summer?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-9b' }
      },
      template: `{0} worked {1} {2} {3} {4} {5}.`,
      correctSentence: ["I", "with", "a company", "that", "aimed to reduce", "carbon emissions"],
      words: ["I", "with", "a company", "that", "aimed to reduce", "carbon emissions"]
    },
    {
      id: 312,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "过去分词opened", "地点副词downtown"],
      hint: `that引导定语从句修饰the restaurant，从句谓语opened，recently修饰opened。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-1', text: `Why didn't you attend the campus fair last night?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-1b' }
      },
      template: `We went {0} {1} {2} {3} {4}.`,
      correctSentence: ["to", "the", "restaurant", "that recently", "opened downtown"],
      words: ["to", "the", "restaurant", "that recently", "opened downtown"]
    },
    {
      id: 313,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["that引导的定语从句", "They're in = They are in"],
      hint: `that引导定语从句修饰the drawer，has the blue handle是从句谓语。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-3', text: `Where did you put the keys to your dorm room?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-3b' }
      },
      template: `{0} {1} {2} {3} {4} {5} handle.`,
      correctSentence: ["they're in", "the drawer", "that", "has", "the", "blue"],
      words: ["they're in", "the drawer", "that", "has", "the", "blue"]
    },
    {
      id: 314,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["that引导的定语从句", "take lessons上课"],
      hint: `that引导定语从句修饰the music school，从句是be on campus。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-5', text: `Where did you learn to play the piano?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-5b' }
      },
      template: `I took {0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["lessons at", "the music", "school", "that is", "on", "campus"],
      words: ["lessons at", "the music", "school", "that is", "on", "campus"]
    },
    {
      id: 315,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["who引导的定语从句", "including介词短语", "副词recently位置"],
      hint: `who引导定语从句修饰a friend，recently放在动词前。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-6', text: `Who was at the fraternity meeting last night?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-6b' }
      },
      template: `{0} attended including {1} {2} {3}.`,
      correctSentence: ["many people", "a friend", "who recently", "transferred here"],
      words: ["many people", "a friend", "who recently", "transferred here"]
    },
    {
      id: 316,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 5,
      keyPoints: ["that引导的定语从句", "be based on基于", "the best最高级"],
      hint: `that引导定语从句修饰the company，从句谓语offers。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-7', text: `Why did you decide to apply for an internship for that company?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-7b' }
      },
      template: `{0} {1} {2} {3} {4} {5} opportunities.`,
      correctSentence: ["my choice", "was based on", "the company that", "offers the", "best career", "growth"],
      words: ["my choice", "was based on", "the company that", "offers the", "best career", "growth"]
    },
    {
      id: 317,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "被动语态was filled with"],
      hint: `that引导定语从句修饰a sandwich，was filled with表示'装满'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-8', text: `What did you have to eat after class?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-8b' }
      },
      template: `I had {0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["a sandwich", "that", "was", "filled", "with", "vegetables"],
      words: ["a sandwich", "that", "was", "filled", "with", "vegetables"]
    },
    {
      id: 318,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["省略that的定语从句", "主系表结构", "be relevant to与...相关"],
      hint: `they are discussing是省略that的定语从句修饰The topic。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-9', text: `Why aren't you attending the seminar today?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-9b' }
      },
      template: `{0} {1} {2} {3} {4} {5} research.`,
      correctSentence: ["the topic", "they are", "discussing is", "not relevant", "to", "my"],
      words: ["the topic", "they are", "discussing is", "not relevant", "to", "my"]
    },
    {
      id: 319,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "the longest最高级", "主系表结构"],
      hint: `that引导定语从句修饰The model，主句核心是The model is my top choice。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-1', text: `What are you looking for in a new laptop?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-1b' }
      },
      template: `{0} {1} {2} {3} {4} {5} choice.`,
      correctSentence: ["the model", "that has", "the longest", "battery life", "is my", "top"],
      words: ["the model", "that has", "the longest", "battery life", "is my", "top"]
    },
    {
      id: 320,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "be stuck in堵在...", "last for持续"],
      hint: `that引导定语从句修饰a traffic jam，从句谓语lasted for an hour。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-2', text: `Why were you so late for class?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-2b' }
      },
      template: `I was {0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["stuck in", "a traffic jam", "that lasted", "for", "an", "hour"],
      words: ["stuck in", "a traffic jam", "that lasted", "for", "an", "hour"]
    },
    {
      id: 321,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "couldn't + 动词原形", "another + 名词"],
      hint: `that引导定语从句修饰another appointment，从句中couldn't reschedule。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-3', text: `Why did you miss marching band practice yesterday?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-3b' }
      },
      template: `{0} had {1} {2} {3} I {4} {5}.`,
      correctSentence: ["I", "another", "appointment", "that", "couldn't", "reschedule"],
      words: ["I", "another", "appointment", "that", "couldn't", "reschedule"]
    },
    {
      id: 322,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["that引导的定语从句", "the one指代", "时间状语last year"],
      hint: `that引导定语从句修饰the one（指代the book），last year是时间状语。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-6', text: `Did you enjoy the new book you bought?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-6b' }
      },
      template: `{0} the one {1} {2} {3} {4}.`,
      correctSentence: ["yes, it's", "that won", "the literary", "award last", "year"],
      words: ["yes, it's", "that won", "the literary", "award last", "year"]
    },
    {
      id: 323,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["that引导的定语从句", "主系表结构", "every Thursday afternoon时间表达"],
      hint: `that引导定语从句修饰The group，从句谓语meets。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-7', text: `Is there a study group for chemistry class that you can recommend?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-7b' }
      },
      template: `{0} {1} {2} Thursday {3} {4} {5} {6}.`,
      correctSentence: ["the group", "that meets", "every", "afternoon", "is", "very", "helpful"],
      words: ["the group", "that meets", "every", "afternoon", "is", "very", "helpful"]
    },
    {
      id: 324,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "in the shop在修理中", "at the moment此刻"],
      hint: `that引导定语从句修饰The car，is in the shop表示车在修。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-8', text: `Why did you take the bus to campus this morning?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-8b' }
      },
      template: `{0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["the car", "that I usually", "drive is", "in the", "shop at", "the moment"],
      words: ["the car", "that I usually", "drive is", "in the", "shop at", "the moment"]
    },
    {
      id: 325,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["that引导的定语从句", "run late拖堂/超时"],
      hint: `that引导定语从句修饰a class，run late表示'拖堂'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-9', text: `Why didn't you answer your phone?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-9b' }
      },
      template: `I was {0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["in", "a", "class", "that", "ran", "late"],
      words: ["in", "a", "class", "that", "ran", "late"]
    },
    {
      id: 326,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["省略that的定语从句", "get out of无法脱身/取消"],
      hint: `I can't get out of是省略that的定语从句修饰a prior commitment。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-2', text: `Why are you not coming to the class picnic?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-2b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["I have", "a prior", "commitment I", "can't", "get", "out", "of"],
      words: ["I have", "a prior", "commitment I", "can't", "get", "out", "of"]
    },
    {
      id: 327,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["that引导的定语从句", "多个形容词排序（advanced statistical）"],
      hint: `that引导定语从句修饰a class，advanced修饰statistical methods，表示"高级统计方法"，形容词顺序中观点形容词（advanced）通常放在类别形容词（statistical）之前。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-5', text: `Which course are you taking this semester?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-5b' }
      },
      template: `{0} {1} {2} advanced {3} {4}.`,
      correctSentence: ["I'm taking", "a class", "that covers", "statistical", "methods"],
      words: ["I'm taking", "a class", "that covers", "statistical", "methods"]
    },
    {
      id: 328,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "be from来自", "local形容词前置"],
      hint: `if引导宾语从句，local修饰florist放在前面。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-8', text: `I love the beautiful flowers they planted in the campus square.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-8b' }
      },
      template: `{0} {1} {2} {3} {4} {5} florist?`,
      correctSentence: ["can you tell", "me", "if they", "are from", "a", "local"],
      words: ["can you tell", "me", "if they", "are from", "a", "local"]
    },
    {
      id: 329,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "be qualified for有资格", "过去进行时"],
      hint: `if引导宾语从句，be qualified for表示"有资格"。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13-1', text: `Why didn't you apply for the scholarship?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13-1b' }
      },
      template: `{0} {1} {2} if {3} was {4} {5} {6}.`,
      correctSentence: ["I", "wasn't", "sure", "I", "qualified", "for", "it"],
      words: ["I", "wasn't", "sure", "I", "qualified", "for", "it"]
    },
    {
      id: 330,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "be open to"],
      hint: `if引导宾语从句，be open to the public表示'对公众开放'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13-3', text: `I heard that the gallery has an exhibition of student work.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13-3b' }
      },
      template: `{0} know {1} {2} {3} {4} {5}?`,
      correctSentence: ["do you", "if", "it's", "open to", "the", "public yet"],
      words: ["do you", "if", "it's", "open to", "the", "public yet"]
    },
    {
      id: 331,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "the one指代", "the best最高级"],
      hint: `that引导定语从句修饰the one（指代the college），从句谓语offers。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13-4', text: `Which college do you want to attend?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13-4b' }
      },
      template: `My top choice is {0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["the one", "that", "offers", "the best", "engineering", "program"],
      words: ["the one", "that", "offers", "the best", "engineering", "program"]
    },
    {
      id: 332,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 2,
      keyPoints: ["never did强调", "receive收到"],
      hint: `never did receive是强调用法，did加强否定语气。`,
      errorPredictions: [
                    {
                              "wrongWord": "not",
                              "replaces": "never",
                              "errorType": "谓语架构",
                              "hint": "误以为双重否定，但never已含否定，not多余。"
                    }
          ],
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13-5', text: `Did you complete the survey?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13-5b' }
      },
      template: `{0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["I", "did", "not", "receive", "the", "survey link"],
      words: ["I", "never", "did", "receive", "the", "survey link", "not"]
    },
    {
      id: 333,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["where引导的表语从句", "is where..."],
      hint: `where引导表语从句（不是定语从句），表示'在...的地方'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13-6', text: `Where is my textbook?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13-6b' }
      },
      template: `The textbook {0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["is", "where", "you", "left", "it", "last", "night"],
      words: ["is", "where", "you", "left", "it", "last", "night"]
    },
    {
      id: 334,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "主系表结构"],
      hint: `that引导定语从句修饰the park，主句是the park is my favorite。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13-8', text: `Why do you prefer that off-campus park for jogging?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13-8b' }
      },
      template: `{0} {1} {2} {3} {4} {5} favorite.`,
      correctSentence: ["the park", "that", "has", "the best", "traits", "is my"],
      words: ["the park", "that", "has", "the best", "traits", "is my"]
    },
    {
      id: 335,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["that引导的定语从句", "all the + 名词"],
      hint: `that引导定语从句修饰websites。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13-9', text: `Where did you get that information?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13-9b' }
      },
      template: `Our professor {0} {1} {2} {3} {4} the {5}.`,
      correctSentence: ["mentioned", "all", "the websites", "that", "has", "details"],
      words: ["mentioned", "all", "the websites", "that", "has", "details"]
    },
    {
      id: 336,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["why引导的定语从句（修饰reason）", "have no time for没时间做"],
      hint: `why引导定语从句修饰the reason，have no time for reading。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13-10', text: `Did you finish reading that book?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13-10b' }
      },
      template: `{0} {1} {2} {3} I {4} no time {5}.`,
      correctSentence: ["I told", "you", "the reason", "why", "have", "for reading anymore"],
      words: ["I told", "you", "the reason", "why", "have", "for reading anymore"]
    },
    {
      id: 337,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 5,
      keyPoints: ["how引导的宾语从句", "被动语态would be", "and连接并列被动"],
      hint: `how引导宾语从句作clarify的宾语，从句中and连接两个被动语态。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-1', text: `What did the instructor say about the exam format?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-1b' }
      },
      template: `She wanted {0} {1} {2} {3} {4} {5} {6} {7} {8}.`,
      correctSentence: ["to clarify", "how", "the", "questions", "would", "be", "structured", "and", "graded"],
      words: ["to clarify", "how", "the", "questions", "would", "be", "structured", "and", "graded"]
    },
    {
      id: 338,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "一般将来时would + 动词原形"],
      hint: `if引导宾语从句，从句中用would arrive表示过去将来时。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-2', text: `Why was the guest lecturer series postponed?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-2b' }
      },
      template: `{0} wanted to {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["the organizer", "know", "if", "the", "new equipment", "would arrive", "on time"],
      words: ["the organizer", "know", "if", "the", "new equipment", "would arrive", "on time"]
    },
    {
      id: 339,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "tell sb. if...", "approve批准"],
      hint: `if引导宾语从句，tell me if she approved...。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-6', text: `I spoke with the professor about the assignment. What would you like to know?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-6b' }
      },
      template: `Could you {0} {1} {2} {3} {4} the group project?`,
      correctSentence: ["tell", "me", "if she", "approved our", "proposal for"],
      words: ["tell", "me", "if she", "approved our", "proposal for"]
    },
    {
      id: 340,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["whether引导的宾语从句", "there are结构", "any用于疑问句"],
      hint: `whether引导宾语从句，从句中用there are + any。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-7', text: `Did you see the announcement about the new class attendance policies?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-7b' }
      },
      template: `Can {0} {1} {2} {3} {4} {5}?`,
      correctSentence: ["you", "tell", "me whether", "there are", "any major", "changes"],
      words: ["you", "tell", "me whether", "there are", "any major", "changes"]
    },
    {
      id: 341,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 3,
      keyPoints: ["现在进行时被动语态", "特殊疑问句倒装"],
      hint: `is being held是现在进行时的被动语态。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-9', text: `I heard there's a music festival near campus this weekend.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-9b' }
      },
      template: `{0} {1} it {2} {3}?`,
      correctSentence: ["where", "is", "being", "held"],
      words: ["where", "is", "being", "held"]
    },
    {
      id: 342,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["which引导的不定式短语", "be sure确定", "still not仍不确定"],
      hint: `which one to choose是'疑问词+不定式'结构，作sure的宾语。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-10', text: `Have you decided which chemistry class to register for?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14-10b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["I'm", "still not", "sure", "which", "one", "to", "choose"],
      words: ["I'm", "still not", "sure", "which", "one", "to", "choose"]
    },
    {
      id: 343,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["who引导的宾语从句"],
      hint: `who引导宾语从句，在从句中作主语。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-1', text: `Who is the author of this novel?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-1b' }
      },
      template: `{0} {1} {2} {3} wrote {4}.`,
      correctSentence: ["I", "can't", "remember", "who", "it"],
      words: ["I", "can't", "remember", "who", "it"]
    },
    {
      id: 344,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 4,
      keyPoints: ["现在进行时被动语态", "选择疑问句or"],
      hint: `'Is'位于句首构成一般疑问句，'being held'是现在进行时的被动语态。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-2', text: `I signed up for a psychology class this semester.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-2b' }
      },
      template: `Is {0} {1} {2} {3} {4}?`,
      correctSentence: ["it", "being", "held online", "or", "in person"],
      words: ["it", "being", "held online", "or", "in person"]
    },
    {
      id: 345,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["that引导的定语从句"],
      hint: `that引导定语从句修饰a family gathering。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-6', text: `Why didn't you attend the biology lecture yesterday?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-6b' }
      },
      template: `{0} {1} {2} {3} {4} {5} miss.`,
      correctSentence: ["I", "had", "a family", "gathering", "that I", "couldn't"],
      words: ["I", "had", "a family", "gathering", "that I", "couldn't"]
    },
    {
      id: 346,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "be open to"],
      hint: `if引导宾语从句，be open to the public。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-7', text: `I heard that the gallery has an exhibition of student work.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-7b' }
      },
      template: `{0} know {1} {2} {3} {4} {5}?`,
      correctSentence: ["do you", "if", "it's", "open to", "the", "public yet"],
      words: ["do you", "if", "it's", "open to", "the", "public yet"]
    },
    {
      id: 347,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "被动语态"],
      hint: `if从句中用被动语态were suggested。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-10', text: `The club members and the faculty advisor approved the new policy.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15-10b' }
      },
      template: `{0} {1} know {2} {3} {4}?`,
      correctSentence: ["do", "you", "if", "any changes", "were suggested"],
      words: ["do", "you", "if", "any changes", "were suggested"]
    },
    {
      id: 348,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["when引导的宾语从句", "be supposed to do应该做"],
      hint: `when引导宾语从句，be supposed to do表示'应该'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s16-1', text: `What did Williams say about the project?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s16-1b' }
      },
      template: `He {0} {1} {2} {3} are {4} {5} {6}.`,
      correctSentence: ["doesn't", "know", "when", "we", "supposed", "to begin", "it"],
      words: ["doesn't", "know", "when", "we", "supposed", "to begin", "it", "is"]
    },
    {
      id: 349,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 3,
      keyPoints: ["find + 宾语 + 宾补（形容词）", "否定形式"],
      hint: `find + 宾语 + 形容词作宾补，表示'觉得...怎样'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s16-2', text: `Did you enjoy the artwork at the exhibition?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s16-2b' }
      },
      template: `{0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["I", "didn't", "find", "the", "artwork", "appealing"],
      words: ["I", "didn't", "find", "the", "artwork", "appealing"]
    },
    {
      id: 350,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '特殊句式',
      difficulty: 2,
      keyPoints: ["be able to do", "过去时否定"],
      hint: `be able to = can，过去时否定wasn't able to。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s16-5', text: `Did you attend the team-building exercise last weekend?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s16-5b' }
      },
      template: `{0} {1} {2} {3} {4}.`,
      correctSentence: ["I", "wasn't", "able", "to", "participate"],
      words: ["I", "wasn't", "able", "to", "participate"]
    },
    {
      id: 351,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 5,
      keyPoints: ["why引导的宾语从句（作介词about的宾语）", "be curious about"],
      hint: `why引导的从句作about的宾语，这是宾语从句的复杂用法。`,
      errorPredictions: [
                    {
                              "wrongWord": "did",
                              "replaces": "arrived",
                              "errorType": "谓语架构",
                              "hint": "误以为疑问句需助动词，但从句中已有谓语动词arrived。"
                    }
          ],
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s16-6', text: `What did Micheal say to you?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s16-6b' }
      },
      template: `He was curious {0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["about", "why", "we", "arrived", "so late at", "the graduation ceremony"],
      words: ["about", "why", "we", "arrived", "so late at", "the graduation ceremony", "did"]
    },
    {
      id: 352,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 5,
      keyPoints: ["if引导的宾语从句", "过去完成时had done", "for improving介词短语"],
      hint: `if引导宾语从句，从句中用过去完成时had + 过去分词。`,
      errorPredictions: [
                    {
                              "wrongWord": "here",
                              "replaces": "the curriculum",
                              "errorType": "从句逻辑",
                              "hint": "误将地点副词当作宾语，但从句需要名词作宾语。"
                    }
          ],
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s16-7', text: `What did you discuss with the team?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s16-7b' }
      },
      template: `She {0} {1} {2} {3} any {4} {5} {6}.`,
      correctSentence: ["asked", "if", "I", "had", "suggestions", "for improving", "the curriculum"],
      words: ["asked", "if", "I", "had", "suggestions", "for improving", "the curriculum", "here"]
    },
    {
      id: 353,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["why引导的定语从句（修饰reason）"],
      hint: `why引导定语从句修饰the reason，从句中谓语动词需与主句时态一致。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s16-8', text: `Did you finish reading that book?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s16-8b' }
      },
      template: `{0} {1} {2} {3} I {4} no time {5}.`,
      correctSentence: ["I told", "you", "the reason", "why", "have", "for reading anymore"],
      words: ["I told", "you", "the reason", "why", "have", "for reading anymore"]
    },
    {
      id: 354,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 5,
      keyPoints: ["that引导的定语从句", "the most最高级", "主系表结构"],
      hint: `that引导定语从句修饰The city，主句核心是The city was my first choice。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-1', text: `Which city did you visit during your school break?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-1b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["The city", "that has", "the most", "cultural attractions", "was my", "first", "choice"],
      words: ["The city", "that has", "the most", "cultural attractions", "was my", "first", "choice"]
    },
    {
      id: 355,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "主系表结构"],
      hint: `that引导定语从句修饰The new campus gym。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-2', text: `Which gym do you prefer?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-2b' }
      },
      template: `{0} {1} {2} {3} {4} {5} favorite {6}.`,
      correctSentence: ["the new", "campus gym", "that has", "the", "equipment is", "my", "gym"],
      words: ["the new", "campus gym", "that has", "the", "equipment is", "my", "gym"]
    },
    {
      id: 356,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["省略that的定语从句", "主系表结构", "checked out借出"],
      hint: `I need for reference是省略that的定语从句修饰The book，is still checked out。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-3', text: `Why haven't you finished your assignment yet?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-3b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["the book", "I", "need for", "reference", "is still", "checked", "out"],
      words: ["the book", "I", "need for", "reference", "is still", "checked", "out"]
    },
    {
      id: 357,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "there will be结构", "复合名词follow-up"],
      hint: `if引导宾语从句，从句中用there will be。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-4', text: `The seminar on digital marketing was really insightful.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-4b' }
      },
      template: `Do {0} {1} {2} {3} {4} {5} {6}?`,
      correctSentence: ["you", "know", "if", "there", "will be", "a follow-up", "session"],
      words: ["you", "know", "if", "there", "will be", "a follow-up", "session"]
    },
    {
      id: 358,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["that引导的定语从句", "the fastest最高级", "fit one's needs满足需求"],
      hint: `that引导定语从句修饰The one，主句谓语will fit。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-5', text: `Which laptop are you planning to buy?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-5b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6} perfectly.`,
      correctSentence: ["The one", "that", "has", "the fastest", "processor", "will fit", "my needs"],
      words: ["The one", "that", "has", "the fastest", "processor", "will fit", "my needs"]
    },
    {
      id: 359,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "be mandatory for对...是强制的"],
      hint: `if引导宾语从句，be mandatory for表示'对...是强制的'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-6', text: `I heard there will be a meeting next week for the student interns.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-6b' }
      },
      template: `{0} {1} {2} {3}  {4} {5} everyone?`,
      correctSentence: ["do you", "know", "if", "the meeting", "is mandatory", "for"],
      words: ["do you", "know", "if", "the meeting", "is mandatory", "for"]
    },
    {
      id: 360,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "there will be结构"],
      hint: `if引导宾语从句，从句中用there will be。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-7', text: `The workshop on time management was very helpful.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-7b' }
      },
      template: `{0} {1} {2} {3} {4} {5} next month?`,
      correctSentence: ["do", "you", "know", "if there", "will be", "another session"],
      words: ["do", "you", "know", "if there", "will be", "another session"]
    },
    {
      id: 361,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["who引导的定语从句", "seem + 形容词最高级"],
      hint: `who引导定语从句修饰The one，从句谓语seemed + the most reliable。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-8', text: `Why did you vote for that candidate?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-8b' }
      },
      template: `{0} {1} {2} {3} {4} the most reliable.`,
      correctSentence: ["the one", "who", "promised to improve", "education", "seemed"],
      words: ["the one", "who", "promised to improve", "education", "seemed"]
    },
    {
      id: 362,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 4,
      keyPoints: ["省略that的定语从句", "介词in前置", "have issues有问题"],
      hint: `I was living in是省略that的定语从句修饰the one，介词in与living搭配，保留在从句末尾。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-9', text: `Why did you move into a new dorm?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-9b' }
      },
      template: `{0} {1} {2} {3} {4} {5} issues.`,
      correctSentence: ["the one", "I was", "living", "in", "had", "maintenance"],
      words: ["the one", "I was", "living", "in", "had", "maintenance"]
    },
    {
      id: 363,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '从句逻辑',
      difficulty: 3,
      keyPoints: ["if引导的宾语从句", "现在完成进行时has started grading"],
      hint: `if引导宾语从句，从句用陈述语序，谓语has started; start doing 开始做某事，固定搭配。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-10', text: `I finally turned in my assignment last night.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s17-10b' }
      },
      template: `{0} {1} {2} {3} {4} {5} yet?`,
      correctSentence: ["do you", "know", "if", "the professor", "has started grading", "them"],
      words: ["do you", "know", "if", "the professor", "has started grading", "them"]
    },
    {
      id: 364,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 1,
      keyPoints: ["一般疑问句倒装", "need to do搭配"],
      hint: `一般疑问句助动词Do提前，need to后接动词原形。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-9', text: `I have an exam early tomorrow morning.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-9b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}?`,
      correctSentence: ["Do", "you", "need", "to", "borrow", "my", "notes"],
      words: ["Do", "you", "need", "to", "borrow", "my", "notes"]
    },
    {
      id: 365,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '修饰语位置',
      difficulty: 3,
      keyPoints: ["because of + 名词短语", "because of与because的区别"],
      hint: `because of后接名词/名词短语，不能接完整句子。接句子用because。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-10', text: `Did you see the latest episode of the series?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=01-10b' }
      },
      template: `No, {0} it {1} {2} {3} {4}.`,
      correctSentence: ["I missed", "because", "of", "late", "class"],
      words: ["I missed", "because", "of", "late", "class"]
    },
    {
      id: 366,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '特殊句式',
      difficulty: 2,
      keyPoints: ["happen to do碰巧做某事", "一般疑问句"],
      hint: `happen to do是固定搭配，表示'碰巧'，to后接动词原形。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-7', text: `I heard you visited the new Art Department exhibit last weekend.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12-7b' }
      },
      template: `Did {0} {1} {2}?`,
      correctSentence: ["you", "happen to", "see it"],
      words: ["you", "happen to", "see it"]
    },
    {
      id: 367,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '特殊句式',
      difficulty: 3,
      keyPoints: ["I don't think...否定前移", "make it固定搭配"],
      hint: `think的否定要前移到主句：I don't think... 而非 I think I can't...。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-9', text: `Are you going to attend the workshop hosted by the drama department?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16-9b' }
      },
      template: `{0} {1} {2} {3} {4} time.`,
      correctSentence: ["I", "don't think I", "can", "make it", "this"],
      words: ["I", "don't think I", "can", "make it", "this"]
    },
    {
      id: 368,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '特殊句式',
      difficulty: 3,
      keyPoints: ["too...to... 太...而不能...", "stay up late熬夜"],
      hint: `too + adj. + to do表示"太...以至于不能"，stay up that late表示"熬夜到那么晚"。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-6', text: `Did you watch the student debate last night?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1-6b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6} that late.`,
      correctSentence: ["no, I", "was", "too", "tired", "to", "stay", "up"],
      words: ["no, I", "was", "too", "tired", "to", "stay", "up"]
    },
    {
      id: 369,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '特殊句式',
      difficulty: 3,
      keyPoints: ["be caught up in忙于/卷入", "所有格my"],
      hint: `be caught up in表示'忙于/沉浸于某事'，是固定短语。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-5', text: `Why haven't you replied to my text?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3-5b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["I was", "caught", "up", "in", "my", "biology", "class"],
      words: ["I was", "caught", "up", "in", "my", "biology", "class"]
    },
    {
      id: 370,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '特殊句式',
      difficulty: 3,
      keyPoints: ["have no intention of doing没有做某事的打算"],
      hint: `have no intention of + 动名词，表示"不打算做"，注意首字母大写。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-7', text: `Are you planning to attend the workshop on Saturday?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5-7b' }
      },
      template: `{0} have {1} {2} {3}.`,
      correctSentence: ["I", "no", "intention", "of going"],
      words: ["I", "no", "intention", "of going"]
    },
    {
      id: 371,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 3,
      keyPoints: ["believe + 宾语从句", "否定前移I don't believe", "一般将来时"],
      hint: `believe的否定形式常前移：I don't believe it will... 而非 I believe it won't...`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-5', text: `Do you think the project will be successful?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6-5b' }
      },
      template: `I {0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["don't", "believe", "it", "will", "achieve", "the", "desired results"],
      words: ["don't", "believe", "it", "will", "achieve", "the", "desired results"]
    },
    {
      id: 372,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 1,
      keyPoints: ["another + 单数名词", "have a commitment有约"],
      hint: `another后接单数可数名词commitment，have表示'有'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-4', text: `Are you coming to the biology seminar tomorrow?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-4b' }
      },
      template: `{0}, {1} have {2} {3}.`,
      correctSentence: ["no", "I", "another", "commitment"],
      words: ["no", "I", "another", "commitment"]
    },
    {
      id: 373,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '特殊句式',
      difficulty: 4,
      keyPoints: ["None of + 名词复数", "be of interest to对...有兴趣", "主谓一致（movies→were）"],
      hint: `None of + 复数名词作主语时，谓语用复数were。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-10', text: `Did you enjoy the student film festival?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10-10b' }
      },
      template: `{0} {1} {2} {3} {4} {5} me.`,
      correctSentence: ["none of", "the", "movies", "were", "of interest", "to"],
      words: ["none of", "the", "movies", "were", "of interest", "to"]
    },
    {
      id: 374,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 4,
      keyPoints: ["make + 宾语 + 宾补（不带to不定式）", "形容词very impressive"],
      hint: `make sb./sth. do（使役动词后接不带to的不定式），look是系动词+表语。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-4', text: `What do you think of the new library?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11-4b' }
      },
      template: `{0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["the recent", "renovations", "to", "the library", "make it", "look", "very impressive"],
      words: ["the recent", "renovations", "to", "the library", "make it", "look", "very impressive"]
    },
    {
      id: 375,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 1,
      keyPoints: ["other + 名词复数", "have sth."],
      hint: `other修饰plans表示'其他计划'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-3', text: `Are you going to the university's choral concert this weekend?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-3b' }
      },
      template: `No, {0} {1} {2} {3}.`,
      correctSentence: ["I", "have", "other", "plans"],
      words: ["I", "have", "other", "plans"]
    },
    {
      id: 376,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '特殊句式',
      difficulty: 3,
      keyPoints: ["be tied up with忙于", "现在完成时"],
      hint: `be tied up with是固定短语，表示'忙于/被...缠住'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-6', text: `Why haven't you visited the university's new art exhibit?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-6b' }
      },
      template: `I've {0} {1} {2} {3} {4} {5}.`,
      correctSentence: ["been", "tied", "up", "with", "other", "responsibilities"],
      words: ["been", "tied", "up", "with", "other", "responsibilities"]
    },
    {
      id: 377,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '词序排列',
      difficulty: 1,
      keyPoints: ["other plans其他计划", "with介词短语"],
      hint: `with my family表示'和家人一起'，放在句末。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-9', text: `Are you planning to study for the exam this weekend?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-9b' }
      },
      template: `No, I {0} {1} {2} {3} {4}.`,
      correctSentence: ["have", "other plans", "with", "my", "family"],
      words: ["have", "other plans", "with", "my", "family"]
    },
    {
      id: 378,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 3,
      keyPoints: ["否定前移I don't believe", "一般将来时"],
      hint: `believe的否定前移：I don't believe it will achieve...。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13-7', text: `Do you think the project will be successful?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13-7b' }
      },
      template: `I {0} {1} {2} {3} {4} {5} {6}.`,
      correctSentence: ["don't", "believe", "it", "will", "achieve", "the", "desired results"],
      words: ["don't", "believe", "it", "will", "achieve", "the", "desired results"]
    },
    {
      id: 379,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 2,
      keyPoints: ["现在完成时", "start the process开始流程"],
      hint: `现在完成时Have started，start the process是固定搭配。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-2', text: `I'm thinking of applying for a scholarship.` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8-2b' }
      },
      template: `{0} {1} {2} {3} {4} {5}?`,
      correctSentence: ["have", "you", "started", "the", "application", "process"],
      words: ["have", "you", "started", "the", "application", "process"]
    },
    {
      id: 380,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 3,
      keyPoints: ["现在完成时否定", "do/does强调用法", "but连接转折"],
      hint: `does sound中does是强调用法，sound interesting是系表结构。does作为强调助动词，放在主语it之后、动词sound之前。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-6', text: `Have you thought about joining the debate club?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-6b' }
      },
      template: `{0} decided {1}, {2} {3} {4}.`,
      correctSentence: ["I haven't", "yet", "but it", "does sound", "interesting"],
      words: ["I haven't", "yet", "but it", "does sound", "interesting"]
    },
    {
      id: 381,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 2,
      keyPoints: ["现在完成时否定", "yet在否定句末"],
      hint: `现在完成时否定have not completed，yet放在句末。`,
      errorPredictions: [
                    {
                              "wrongWord": "never",
                              "replaces": "not",
                              "errorType": "谓语架构",
                              "hint": "never本身是否定副词，不能与have not连用，应直接用have never completed。"
                    }
          ],
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-7', text: `Are you finished with the training course?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9-7b' }
      },
      template: `{0} {1} {2} {3} {4} {5} yet.`,
      correctSentence: ["I", "have", "not", "completed", "all", "the modules"],
      words: ["I", "have", "not", "completed", "all", "the modules", "never"]
    },
    {
      id: 382,
      setId: 'practice-pool',
      isFree: true,
      primaryCategory: '谓语架构',
      difficulty: 2,
      keyPoints: ["过去进行时否定", "feel well身体不适", "时间状语"],
      hint: `wasn't feeling well是过去进行时的否定，表示'那晚身体不舒服'。`,
      conversation: {
        speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-7', text: `Why didn't you go to the campus job fair?` },
        speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12-7b' }
      },
      template: `{0} {1} {2} {3} that {4}.`,
      correctSentence: ["I", "wasn't", "feeling", "well", "evening"],
      words: ["I", "wasn't", "feeling", "well", "evening"]
    },
  ]
};

