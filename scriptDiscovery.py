import os

SCRIPT_TAG_TEMPLATE = '<script type="text/javascript" src="$src"></script>'

def createScriptTag(path):
    return SCRIPT_TAG_TEMPLATE.replace('$src', path)

cwd = os.getcwd()
print(cwd)

jsFiles = []
for root, subdirs, files in os.walk(cwd):
    for file in files:
        fullPath = os.path.join(root, file)
        if fullPath[-3:] == '.js':
            jsFiles.append(fullPath)

jsFiles = [jsf.replace(cwd, '')[1:].replace('\\', '/') for jsf in jsFiles]
scriptTags = [createScriptTag(jsf) for jsf in jsFiles]

rows = []
p5Rows = []
lastDir = 'appdata'
for jsFile in jsFiles:
    directory = jsFile.split('/')[1]
    if directory != lastDir:
        rows.append('')
    lastDir = directory

    if 'p5' not in jsFile:
        rows.append('    ' + createScriptTag(jsFile))
    else:
        p5Rows.append('    ' + createScriptTag(jsFile))

rows.append('')
[rows.append(r) for r in p5Rows]
rows = [r + '\n' for r in rows]

indexLines = []
stop = '<!-- scripts -->'
with open('apparat.html') as apparat:
    for line in apparat:
        indexLines.append(line)
        if stop in line:
            break

for row in rows:
    indexLines.append(row)

indexLines.append('</body>\n')
indexLines.append('\n')
indexLines.append('</html>\n')

with open('apparat.html', 'w') as apparat:
    apparat.write(''.join(indexLines))