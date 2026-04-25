#!/usr/bin/env python3
"""优化 practicePool.ts 中的 ruleHint：让相同考点的提示更有针对性"""

import re

FILE = '/Users/lavenderlavender/WorkBuddy/20260402180817/toefl-practice/src/data/practicePool.ts'

with open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# 修复被截断的 hint（wasn't 转义问题）
# 原始模式：ruleHint: '否定句 "I wasn\'  后面被截断了
content = content.replace(
    "ruleHint: '否定句 \"I wasn\\'",
    "ruleHint: '否定句 wasn\\'t = was + not，否定紧跟 be 动词"
)

# 修复 A7+A5 的通用提示
content = content.replace(
    "ruleHint: '否定词位置在助动词后，'",
    "ruleHint: '否定句 + 状语从句：否定和连词引导的从句都要用陈述语序'"
)

# === A4 定语从句提示优化 ===
# 读取所有 A4 题目的正确答案和对话，生成更具体的提示
a4_variants = [
    '定语从句中 who 指人，which 指物，that 两者皆可，从句用陈述语序',
    '定语从句关系代词紧跟先行词，从句中用陈述语序（不倒装）',
    '注意关系代词在从句中作主语（不能省略）还是宾语（可省略）',
    '定语从句中主语和动词要一致，关系代词后的结构是主+谓+宾',
    '定语从句修饰前面的名词，用 who/which/that 引导，后接陈述语序',
    '定语从句的动词要和关系代词（先行词）在人称和数上保持一致',
    '注意区分限制性定语从句（无逗号）和非限制性定语从句（有逗号）',
]

# 用更智能的方式处理：基于题目的具体内容
lines = content.split('\n')
new_lines = []
a4_count = 0

i = 0
while i < len(lines):
    line = lines[i]
    
    # 检查是否是 A4 相关的 targetErrorType 行
    if 'targetErrorType:' in line and ("'A4'" in line or "'A4+" in line):
        tag_match = re.search(r"'(A4[^']*)'", line)
        if tag_match:
            tag = tag_match.group(1)
            
            # 收集这个题目的上下文
            correct = []
            template = ''
            speaker = ''
            for j in range(i + 1, min(i + 20, len(lines))):
                if 'correctSentence:' in lines[j]:
                    arr_match = re.search(r'\[(.*?)\]', lines[j])
                    if arr_match:
                        correct = re.findall(r'"([^"]*)"', arr_match.group(1))
                elif 'template:' in lines[j]:
                    template = lines[j].strip()
                elif 'text:' in lines[j] and 'speaker1' not in lines[j-1]:
                    speaker = lines[j]
                elif re.match(r'\s+id:', lines[j]) and j > i + 2:
                    break
            
            correct_str = ' '.join(correct).lower()
            speaker_lower = speaker.lower()
            
            # 根据具体内容生成更有针对性的提示
            if 'who' in correct_str or 'who' in template.lower():
                hint = '定语从句中 who 指人，紧跟先行词，从句用陈述语序'
            elif 'which' in correct_str or 'which' in template.lower():
                hint = '定语从句中 which 指物，紧跟先行词，从句用陈述语序'
            elif 'that' in correct_str or 'that' in template.lower():
                hint = '定语从句中 that 可指人也可指物，从句用陈述语序'
            elif 'where' in correct_str:
                hint = '定语从句中 where 引导地点状语，从句用陈述语序'
            elif 'when' in correct_str and 'A4' in tag:
                hint = '定语从句中 when 修饰时间名词，从句用陈述语序'
            else:
                hint = a4_variants[a4_count % len(a4_variants)]
                a4_count += 1
            
            # 如果是 A4+B 组合，追加 B 的提示
            if '+B1' in tag:
                hint += '，注意动词时态与主句一致'
            elif '+B2' in tag:
                hint += '，注意 be 动词与关系代词的搭配'
            elif '+B5' in tag:
                hint += '，注意冠词 a/an/the 的选择'
            
            # 替换 ruleHint 行
            if i + 1 < len(lines) and 'ruleHint:' in lines[i + 1]:
                new_lines.append(line)  # targetErrorType
                indent = re.match(r'(\s+)', line).group(1) if re.match(r'(\s+)', line) else '      '
                new_lines.append(f'{indent}ruleHint: {repr(hint)},')
                i += 2  # 跳过原来的 ruleHint 行
                continue
    
    new_lines.append(line)
    i += 1

# === A3 间接疑问句提示优化 ===
new_lines2 = []
a3_if_count = 0
a3_other_count = 0

i = 0
while i < len(lines):
    line = new_lines[i]
    
    # 检查 A3 相关题目
    if 'targetErrorType:' in line and ("'A3'" in line or "'A3+" in line):
        tag_match = re.search(r"'(A3[^']*)'", line)
        if tag_match:
            tag = tag_match.group(1)
            
            # 收集上下文
            correct = []
            template = ''
            for j in range(i + 1, min(i + 20, len(new_lines))):
                if 'correctSentence:' in new_lines[j]:
                    arr_match = re.search(r'\[(.*?)\]', new_lines[j])
                    if arr_match:
                        correct = re.findall(r'"([^"]*)"', arr_match.group(1))
                elif 'template:' in new_lines[j]:
                    template = new_lines[j].strip()
                elif re.match(r'\s+id:', new_lines[j]) and j > i + 2:
                    break
            
            correct_str = ' '.join(correct).lower()
            template_lower = template.lower()
            
            hint = None
            if 'if' in correct_str or 'if' in template_lower:
                # A3 + if 引导
                a3_if_count += 1
                # 基于 speaker 语境给出不同提示
                if 'know' in correct_str:
                    hint = '间接疑问句："do you know if + 陈述语序"，if 后不倒装'
                elif 'tell' in correct_str:
                    hint = '间接疑问句："tell me if + 陈述语序"，if 后面不倒装'
                elif 'find' in correct_str or 'figure' in correct_str:
                    hint = '间接疑问句：find out if + 陈述语序，if 从句不倒装'
                elif 'sure' in correct_str:
                    hint = '间接疑问句："not sure if + 陈述语序"，if 后用陈述语序'
                elif 'check' in correct_str:
                    hint = '间接疑问句："check if + 陈述语序"，if 后用陈述语序'
                elif a3_if_count % 3 == 0:
                    hint = '间接疑问句：if 引导的宾语从句用陈述语序，疑问词后不倒装'
                else:
                    hint = '间接疑问句：if 引导宾语从句，if 后面用陈述语序，不倒装'
            elif 'when' in correct_str:
                hint = '间接疑问句：when 引导宾语从句用陈述语序，如 "when the class will start"'
            elif 'where' in correct_str:
                hint = '间接疑问句：where 引导宾语从句用陈述语序，如 "where the library is"'
            elif 'what' in correct_str:
                if 'name' in correct_str or 'called' in correct_str:
                    hint = '间接疑问句：what 引导的宾语从句，用陈述语序不倒装'
                else:
                    hint = '间接疑问句：what 引导宾语从句用陈述语序'
            elif 'whether' in correct_str:
                hint = '间接疑问句：whether 引导宾语从句，后面用陈述语序'
            elif 'how' in correct_str:
                hint = '间接疑问句：how 引导宾语从句用陈述语序，不倒装'
            elif 'who' in correct_str:
                hint = '间接疑问句：who 引导宾语从句用陈述语序，不倒装'
            elif 'why' in correct_str:
                hint = '间接疑问句：why 引导宾语从句用陈述语序，不倒装'
            elif 'which' in correct_str:
                hint = '间接疑问句：which 引导宾语从句用陈述语序'
            
            if hint is None:
                # 通用 fallback
                a3_other_count += 1
                hints_pool = [
                    '间接疑问句/宾语从句：从句中用陈述语序，不要倒装',
                    '间接疑问句中疑问词后用陈述语序：主语 + 动词（不是动词 + 主语）',
                    '注意区分直接疑问句（倒装）和间接疑问句（陈述语序）',
                ]
                hint = hints_pool[a3_other_count % len(hints_pool)]
            
            # A3+B 组合追加
            if '+B1' in tag:
                hint += '，同时注意动词时态匹配'
            elif '+B2' in tag:
                hint += '，注意 be 动词与主语一致'
            elif '+B3' in tag:
                hint += '，情态动词后接动词原形'
            
            # 替换 ruleHint 行
            if i + 1 < len(new_lines) and 'ruleHint:' in new_lines[i + 1]:
                new_lines2.append(line)
                indent = re.match(r'(\s+)', line).group(1) if re.match(r'(\s+)', line) else '      '
                new_lines2.append(f'{indent}ruleHint: {repr(hint)},')
                i += 2
                continue
    
    new_lines2.append(line)
    i += 1

with open(FILE, 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_lines2))

print(f'Optimized: A4 hints varied, A3 if-count={a3_if_count}, A3 other={a3_other_count}')
print('Done!')
