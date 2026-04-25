#!/usr/bin/env python3
"""批量给 practicePool.ts 的每道题插入 ruleHint 字段"""

import re

FILE = '/Users/lavenderlavender/WorkBuddy/20260402180817/toefl-practice/src/data/practicePool.ts'

# 读取文件
with open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# 为每个 targetErrorType 生成基于上下文的 ruleHint
# 策略：根据 targetErrorType 和 correctSentence 的内容生成针对性提示

def make_hint(tag, correct, template, speaker_text):
    """根据考点标签和答案内容生成中文提示"""
    correct_str = ' '.join(correct)
    
    # A1 特殊疑问句倒装
    if tag == 'A1':
        # 提取疑问词
        wh = ''
        for w in ['what', 'which', 'where', 'when', 'how', 'who', 'why']:
            if w in template.lower() or w in correct_str.lower():
                wh = w.capitalize()
                break
        if 'are you' in template.lower() or 'is he' in template.lower():
            return f'{wh}引导的特殊疑问句要倒装：{wh} + be动词 + 主语 + 动词'
        elif 'do you' in template.lower() or 'does' in template.lower():
            return f'{wh}引导特殊疑问句：{wh} + do/does + 主语 + 动词原形，注意助动词提前'
        elif 'did you' in template.lower():
            return f'{wh}引导特殊疑问句：{wh} + did + 主语 + 动词原形（不用过去式）'
        elif 'will' in template.lower():
            return f'{wh}引导特殊疑问句：{wh} + will + 主语 + 动词原形'
        elif 'can' in template.lower():
            return f'{wh}引导特殊疑问句：{wh} + can + 主语 + 动词原形'
        else:
            return f'特殊疑问句：{wh}引导要倒装，疑问词 + 助动词 + 主语 + 动词'

    # A2 一般疑问句倒装
    elif tag == 'A2':
        if 'have you' in template.lower() or 'has' in template.lower():
            return '一般疑问句：Have/Has you + 过去分词，助动词提前'
        elif 'did you' in template.lower():
            return '一般疑问句：Did + 主语 + 动词原形（过去式的问句用 did）'
        elif 'do you' in template.lower():
            return '一般疑问句：Do + 主语 + 动词原形'
        elif 'can' in template.lower():
            return '一般疑问句：Can + 主语 + 动词原形'
        elif 'would you' in template.lower():
            return '一般疑问句：Would + 主语 + 动词原形'
        elif 'are you' in template.lower() or 'is' in template.lower():
            return '一般疑问句：Be动词（am/is/are）提到主语前面'
        elif 'will you' in template.lower():
            return '一般疑问句：Will + 主语 + 动词原形'
        else:
            return '一般疑问句：助动词/be动词/情态动词提到主语前面'
    
    # A2+B1 组合
    elif tag == 'A2+B1':
        if 'have' in template.lower():
            return '一般疑问句：Have + 主语 + 过去分词，注意时态选择（现在完成时用 have/has）'
        elif 'did' in template.lower():
            return '一般疑问句：Did + 主语 + 动词原形，注意不要用过去式'
        else:
            return '一般疑问句：助动词提前，注意动词时态和词形变化'
    
    # A3 间接疑问句/宾语从句
    elif tag == 'A3':
        if 'if' in correct_str.lower():
            return '间接疑问句：if 引导宾语从句，if 后面用陈述语序，不倒装'
        elif 'whether' in correct_str.lower():
            return '间接疑问句：whether 引导宾语从句，后面用陈述语序'
        elif 'when' in correct_str.lower() and ('know' in correct_str.lower() or 'find' in correct_str.lower()):
            return '间接疑问句：when 引导的宾语从句用陈述语序，如 "do you know when it is"'
        elif 'where' in correct_str.lower() and ('know' in correct_str.lower() or 'find' in correct_str.lower()):
            return '间接疑问句：where 引导的宾语从句用陈述语序，不倒装'
        elif 'what' in correct_str.lower() and ('know' in correct_str.lower() or 'find' in correct_str.lower()):
            return '间接疑问句：what 引导的宾语从句用陈述语序，不倒装'
        elif 'how' in correct_str.lower() and 'know' in correct_str.lower():
            return '间接疑问句：how 引导的宾语从句用陈述语序，不倒装'
        elif 'know' in correct_str.lower() or 'tell' in correct_str.lower() or 'find' in correct_str.lower():
            return '间接疑问句/宾语从句中用陈述语序，疑问词后不倒装'
        else:
            return '间接疑问句/宾语从句：从句中用陈述语序，不要倒装'

    # A3+B1 组合
    elif tag == 'A3+B1':
        return '间接疑问句用陈述语序（不倒装），同时注意动词时态要与语境匹配'

    # A3+B2 组合
    elif tag == 'A3+B2':
        return '间接疑问句用陈述语序（不倒装），注意 be 动词与主语的人称搭配'

    # A4 定语从句
    elif tag == 'A4':
        return '定语从句中关系代词（who/which/that）紧跟先行词，从句用陈述语序'
    
    # A4+B1 组合
    elif tag == 'A4+B1':
        return '定语从句用陈述语序，注意动词时态要和主句语境一致'
    
    # A4+B5 组合
    elif tag == 'A4+B5':
        return '定语从句中注意冠词 a/an/the 的选择和名词单复数'
    
    # A5 状语从句
    elif tag == 'A5':
        conj = ''
        for c in ['because', 'although', 'if', 'when', 'while', 'since', 'after', 'before', 'so that', 'unless']:
            if c in correct_str.lower():
                conj = c
                break
        if conj == 'because':
            return 'because 引导原因状语从句，从句用陈述语序，because + 主语 + 动词'
        elif conj == 'when':
            return 'when 引导时间状语从句，主句和从句都用陈述语序'
        elif conj == 'if':
            return 'if 引导条件状语从句，从句用陈述语序'
        elif conj == 'although':
            return 'although 引导让步状语从句，从句用陈述语序'
        elif conj:
            return f'{conj} 引导状语从句，从句用陈述语序'
        else:
            return '状语从句由连词引导，从句用陈述语序'
    
    # A5+A7 组合
    elif tag == 'A5+A7':
        return '状语从句 + 否定句：连词引导从句，主句否定词位置在助动词后'

    # A5+B1 组合
    elif tag == 'A5+B1':
        return '状语从句用陈述语序，同时注意主句和从句的时态搭配'
    
    # A5+B1+B2 组合
    elif tag == 'A5+B1+B2':
        return 'when/while 引导的时间状语从句，注意主从句时态（过去进行时 vs 一般过去时）和 be 动词搭配'
    
    # A6 存在句型
    elif tag == 'A6':
        return 'There be 句型：There is/are + 名词，be 动词与后面的名词单复数一致'
    
    # A7 否定句
    elif tag == 'A7':
        if "wasn't" in correct_str or 'was not' in correct_str:
            return '否定句 "I wasn\'t..."：wasn\'t = was + not，否定紧跟 be 动词'
        elif "didn't" in correct_str or 'did not' in correct_str:
            return '否定句：didn\'t = did + not，否定紧跟助动词'
        elif "haven't" in correct_str or 'have not' in correct_str:
            return '否定句：haven\'t = have + not，否定紧跟助动词'
        elif "don't" in correct_str:
            return '否定句：don\'t = do + not，否定紧跟助动词'
        elif 'no' in correct_str:
            return '否定句：no 修饰名词，表示"没有..."'
        elif "doesn't" in correct_str or 'does not' in correct_str:
            return '否定句：doesn\'t = does + not，第三人称单数用 doesn\'t'
        elif "not" in correct_str:
            return '否定句：not 放在助动词/be动词/情态动词之后'
        elif "can't" in correct_str or 'cannot' in correct_str:
            return '否定句：can\'t = can + not，情态动词后加 not 构成否定'
        elif "won't" in correct_str:
            return '否定句：won\'t = will + not，否定紧跟情态动词'
        else:
            return '否定句中 not 紧跟助动词/be动词/情态动词之后'

    # A7+B1 组合
    elif tag == 'A7+B1':
        return '否定句中注意动词时态，如一般过去时 didn\'t + 动词原形'
    
    # A7+B2 组合
    elif tag == 'A7+B2':
        return '否定句中不用多余的 be 动词，如 "will not be" 而非 "will not am"'
    
    # A7+B3 组合
    elif tag == 'A7+B3':
        return '否定句中情态动词后直接加 not，如 "will not"（不是 "will don\'t"）'
    
    # A7+B4 组合
    elif tag == 'A7+B4':
        return '注意否定词选择：not 修饰动词，no 修饰名词'
    
    # A7+B5 组合
    elif tag == 'A7+B5':
        return '否定句中注意冠词和名词单复数，如 "no free time" 而非 "no free times"'

    # A7+B1+B3 组合
    elif tag == 'A7+B1+B3':
        return '否定句中情态动词（will/can）+ not + 动词原形，注意时态和词形'

    # A7+B1+B5 组合
    elif tag == 'A7+B1+B5':
        return '否定句中注意时态和冠词/单复数，习惯性动作用一般现在时'

    # A1+B1 组合
    elif tag == 'A1+B1':
        return '特殊疑问句倒装 + 注意动词时态选择（过去时/现在时/完成时）'
    
    # A1+B1+B5 组合
    elif tag == 'A1+B1+B5':
        return '特殊疑问句倒装 + 注意动词时态和冠词选择（a/an/the）'
    
    # A1+B5 组合
    elif tag == 'A1+B5':
        return '特殊疑问句倒装 + 注意冠词和名词单复数搭配'

    # 其他组合
    else:
        parts = tag.split('+')
        a = parts[0]
        a_hints = {
            'A1': '疑问句要倒装', 'A2': '疑问句要倒装', 'A3': '从句用陈述语序',
            'A4': '定语从句用陈述语序', 'A5': '状语从句用陈述语序',
            'A6': 'There be 句型', 'A7': '否定词位置在助动词后',
        }
        b_hints = {
            'B1': '注意时态', 'B2': '注意be动词', 'B3': '注意情态动词',
            'B4': '注意否定词', 'B5': '注意冠词/单复数',
        }
        hint = a_hints.get(a, '')
        for p in parts[1:]:
            hint += '，' + b_hints.get(p, '')
        return hint if hint else '注意语序和词形'


# 解析所有题目块，为每个生成 ruleHint
# 匹配 targetErrorType 行（后面没有 ruleHint 的）
lines = content.split('\n')
new_lines = []
inserted = 0

i = 0
while i < len(lines):
    line = lines[i]
    new_lines.append(line)
    
    # 检查是否是 targetErrorType 行
    if re.match(r"\s+targetErrorType:", line):
        # 检查下一行是否已有 ruleHint
        if i + 1 < len(lines) and re.match(r"\s+ruleHint:", lines[i + 1]):
            i += 1
            continue
        
        # 提取 tag
        m = re.search(r"'([^']+)'", line)
        if not m:
            i += 1
            continue
        tag = m.group(1)
        
        # 向后找 correctSentence 和 template
        correct = []
        template = ''
        speaker = ''
        for j in range(i + 1, min(i + 15, len(lines))):
            if 'correctSentence:' in lines[j]:
                # 提取数组内容
                arr_match = re.search(r'\[(.*?)\]', lines[j])
                if arr_match:
                    items = re.findall(r'"([^"]*)"', arr_match.group(1))
                    correct = items
            elif 'template:' in lines[j]:
                template = lines[j].strip()
            elif 'speaker1' in lines[j] and 'text:' in lines[j]:
                speaker = lines[j]
            # 到了下一个 id 或 conversation 说明这个块结束了
            elif re.match(r'\s+id:', lines[j]) and j > i + 2:
                break
        
        hint = make_hint(tag, correct, template, speaker)
        
        # 获取缩进
        indent = re.match(r'(\s+)', line).group(1) if re.match(r'(\s+)', line) else '      '
        new_lines.append(f'{indent}ruleHint: {repr(hint)},')
        inserted += 1
    
    i += 1

print(f'Inserted {inserted} ruleHints')

# 写回文件
with open(FILE, 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_lines))

print('Done!')
