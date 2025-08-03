import os

def isNotComment(line):
    line = line.strip()

    if len(line) == 0:
        return True
    if line[0:2] == '//':
        return False
    if line[0] == '*':
        return False
    if line[0:3] == '/**':
        return False
    return True

cwd = os.getcwd()
counter = 0
for root, subdirs, files in os.walk(cwd):
    for file in files:
        fullPath = os.path.join(root, file)
        if not fullPath[-3:] == '.js':
            continue
        with open(fullPath, encoding="utf8") as scriptFile:
            for line in scriptFile:
                if isNotComment(line):
                    counter += 1
print(f'Project contains {counter} lines of program code')