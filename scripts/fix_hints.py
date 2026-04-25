#!/usr/bin/env python3
import re

FILE = 'src/data/practicePool.ts'
with open(FILE, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Fix lines with mangled hints
for i, line in enumerate(lines):
    if "ruleHint: '否定句 wasn" in line and "t...\"" in line:
        # This is a mangled line, replace with clean hint
        indent = '      '
        lines[i] = f"{indent}ruleHint: '否定句 wasn\\'t = was + not，否定紧跟 be 动词',\n"

with open(FILE, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print('Fixed mangled hints!')
