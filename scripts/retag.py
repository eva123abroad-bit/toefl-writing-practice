#!/usr/bin/env python3
"""
BSA 考点体系 v2.1 批量打标签脚本
将旧的 targetErrorType 替换为新的 A+B 标签
用法: python3 scripts/retag.py
"""
import re
import os

# 完整映射表：id -> 新标签
TAG_MAP = {
    # ===== seedQuestions (IDs 1-5) =====
    1: 'A7+B2',
    2: 'A5+B1+B2',
    3: 'A7+B1+B5',
    4: 'A1+B1+B5',
    5: 'A7+B1+B3',
    # ===== assessmentSet (IDs 101-120) =====
    101: 'A1',
    102: 'A1',
    103: 'A1',
    104: 'A1',
    105: 'A7',
    106: 'A5+A7',
    107: 'A3',
    108: 'A7',
    109: 'A3',
    110: 'A3',
    111: 'A7',
    112: 'A7',
    113: 'A1',
    114: 'A7+B2',
    115: 'A7',
    116: 'A7',
    117: 'A2+B1',
    118: 'A2',
    119: 'A7+B2',
    120: 'A2',
    # ===== practicePool (IDs 201-382) =====
    201: 'A3',
    202: 'A3',
    203: 'A3',
    204: 'A1',
    205: 'A5',
    206: 'A7',
    207: 'A2',
    208: 'A3',
    209: 'A3',
    210: 'A3',
    211: 'A2',
    212: 'A3',
    213: 'A3',
    214: 'A3',
    215: 'A5',
    216: 'A7',
    217: 'A5',
    218: 'A7',
    219: 'A3',
    220: 'A7',
    221: 'A3',
    222: 'A2',
    223: 'A7',
    224: 'A7',
    225: 'A7',
    226: 'A7',
    227: 'A7',
    228: 'A3',
    229: 'A3',
    230: 'A7+A5',
    231: 'A4',
    232: 'A7',
    233: 'A7+B4',
    234: 'A3',
    235: 'A7',
    236: 'A4',
    237: 'A1',
    238: 'A3',
    239: 'A3',
    240: 'A1',
    241: 'A1',
    242: 'A1',
    243: 'A7',
    244: 'A7',
    245: 'A2',
    246: 'A7+B2',
    247: 'A7+B1',
    248: 'A7',
    249: 'A5',
    250: 'A7',
    251: 'A7',
    252: 'A4',
    253: 'A7',
    254: 'A1',
    255: 'A1',
    256: 'A1',
    257: 'A2',
    258: 'A1',
    259: 'A7',
    260: 'A7',
    261: 'A7+B4',
    262: 'A7',
    263: 'A7+B4',
    264: 'A4',
    265: 'A3',
    266: 'A4+B5',
    267: 'A4',
    268: 'A4',
    269: 'A3',
    270: 'A3',
    271: 'A3',
    272: 'A3',
    273: 'A4',
    274: 'A4',
    275: 'A7',
    276: 'A7',
    277: 'A3',
    278: 'A4',
    279: 'A3',
    280: 'A4',
    281: 'A3',
    282: 'A2',
    283: 'A4',
    284: 'A3',
    285: 'A3',
    286: 'A3',
    287: 'A5',
    288: 'A3',
    289: 'A4',
    290: 'A5',
    291: 'A4',
    292: 'A4',
    293: 'A4',
    294: 'A7',
    295: 'A3',
    296: 'A4',
    297: 'A3',
    298: 'A4',
    299: 'A3+B1',
    300: 'A4',
    301: 'A3+B1',
    302: 'A3',
    303: 'A4',
    304: 'A3',
    305: 'A4',
    306: 'A3',
    307: 'A4',
    308: 'A4',
    309: 'A4',
    310: 'A3',
    311: 'A4',
    312: 'A4',
    313: 'A4',
    314: 'A4',
    315: 'A4',
    316: 'A4',
    317: 'A4',
    318: 'A7',
    319: 'A4',
    320: 'A4',
    321: 'A4',
    322: 'A4',
    323: 'A4',
    324: 'A4',
    325: 'A4',
    326: 'A7',
    327: 'A4',
    328: 'A3',
    329: 'A3',
    330: 'A3',
    331: 'A4',
    332: 'A7+B4',
    333: 'A1',
    334: 'A4',
    335: 'A4',
    336: 'A3',
    337: 'A3',
    338: 'A3',
    339: 'A3',
    340: 'A3',
    341: 'A1',
    342: 'A1',
    343: 'A3',
    344: 'A2',
    345: 'A4',
    346: 'A3',
    347: 'A3',
    348: 'A3+B2',
    349: 'A7',
    350: 'A7',
    351: 'A3+B1',
    352: 'A3',
    353: 'A1',
    354: 'A4',
    355: 'A4',
    356: 'A4',
    357: 'A3',
    358: 'A4',
    359: 'A3',
    360: 'A3',
    361: 'A4',
    362: 'A4',
    363: 'A3',
    364: 'A2',
    365: 'A7+A5',
    366: 'A2',
    367: 'A7',
    368: 'A7',
    369: 'A5',
    370: 'A7',
    371: 'A7',
    372: 'A7',
    373: 'A7',
    374: 'A7',
    375: 'A7',
    376: 'A7',
    377: 'A7',
    378: 'A7',
    379: 'A2',
    380: 'A7',
    381: 'A7+B4',
    382: 'A7',
}

BASE_DIR = '/Users/lavenderlavender/WorkBuddy/20260402180817/toefl-practice/src/data'

FILES = [
    os.path.join(BASE_DIR, 'seedQuestions.ts'),
    os.path.join(BASE_DIR, 'assessmentSet.ts'),
    os.path.join(BASE_DIR, 'practicePool.ts'),
]

OLD_TAGS = [
    'head_directionality',
    'structural_incompleteness', 
    'confusion',
    'tense_misjudgment',
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    changed = 0
    # Pattern: find id + targetErrorType pairs
    # First, find all question blocks with their IDs
    
    # Strategy: find each id: NNN block and the next targetErrorType after it
    # Pattern to match: id: XXXX ... targetErrorType: 'OLD_TAG'
    
    lines = content.split('\n')
    current_id = None
    new_lines = []
    
    for line in lines:
        # Detect id
        id_match = re.search(r'id:\s*(\d+)', line)
        if id_match:
            current_id = int(id_match.group(1))
        
        # Check for targetErrorType line
        tag_match = re.search(r"targetErrorType:\s*'([^']+)'", line)
        if tag_match and current_id:
            old_tag = tag_match.group(1)
            if old_tag in OLD_TAGS:
                new_tag = TAG_MAP.get(current_id)
                if new_tag:
                    line = line.replace(f"'{old_tag}'", f"'{new_tag}'")
                    changed += 1
                    print(f"  ID {current_id}: {old_tag} -> {new_tag}")
                else:
                    print(f"  WARNING: ID {current_id} has old tag '{old_tag}' but no mapping found!")
        
        new_lines.append(line)
    
    if changed > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write('\n'.join(new_lines))
        print(f"  Updated {changed} tags in {os.path.basename(filepath)}")
    else:
        print(f"  No changes needed in {os.path.basename(filepath)}")
    
    return changed

def main():
    print("=== BAS v2.1 Tag Replacement Script ===\n")
    
    total_changed = 0
    total_mapped = len(TAG_MAP)
    
    for filepath in FILES:
        print(f"Processing: {os.path.basename(filepath)}")
        changed = process_file(filepath)
        total_changed += changed
        print()
    
    print(f"=== Summary ===")
    print(f"Total mappings defined: {total_mapped}")
    print(f"Total tags replaced: {total_changed}")
    
    # Verify all mapped IDs were actually found and replaced
    if total_changed < total_mapped:
        # Some might have already been replaced (seedQuestions)
        print(f"Note: {total_mapped - total_changed} mappings may have already been applied (e.g., seedQuestions)")

if __name__ == '__main__':
    main()
