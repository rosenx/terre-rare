"""Validate relative links and assets, including SVG references and CSS URLs."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re

ROOT = Path(__file__).resolve().parents[1] / 'docs'

class Document(HTMLParser):
    def __init__(self, content):
        super().__init__()
        self.nodes = []
        self.feed(content)
    def handle_starttag(self, tag, attrs):
        self.nodes.append((tag, dict(attrs)))

docs = {path.resolve(): Document(path.read_text()) for path in ROOT.rglob('*.html')}
errors = []

def check_url(url, origin):
    parsed = urlsplit(url)
    if parsed.scheme or parsed.netloc or url.startswith('data:'):
        return
    if parsed.path.startswith('/'):
        errors.append(f'{origin.name}: root-relative URL is not portable: {url}')
        return
    target = (origin.parent / unquote(parsed.path)).resolve() if parsed.path else origin.resolve()
    if not target.is_relative_to(ROOT.resolve()):
        errors.append(f'{origin.name}: URL escapes public directory: {url}')
    elif not target.is_file():
        errors.append(f'{origin.name}: missing file: {url}')
    elif parsed.fragment and target in docs:
        if not any(a.get('id') == unquote(parsed.fragment) for _, a in docs[target].nodes):
            errors.append(f'{origin.name}: missing anchor: {url}')

for path, doc in docs.items():
    if sum(tag == 'h1' for tag, _ in doc.nodes) != 1:
        errors.append(f'{path.name}: expected one main heading')
    ids = {attrs['id'] for _, attrs in doc.nodes if 'id' in attrs}
    for tag, attrs in doc.nodes:
        for key in ('href', 'src'):
            if key in attrs:
                check_url(attrs[key], path)
        if 'data-product' in attrs and 'product-' + attrs['data-product'] not in ids:
            errors.append(f'{path.name}: missing product dialog')
        if 'aria-controls' in attrs and attrs['aria-controls'] not in ids:
            errors.append(f'{path.name}: missing controlled element')
for path in ROOT.rglob('*.css'):
    for url in re.findall(r'url\([\'\"]?([^\'\"\)]+)[\'\"]?\)', path.read_text()):
        check_url(url, path)
if errors:
    raise SystemExit('\n'.join(errors))
print(f'Passed: {len(docs)} pages, links, assets and interaction targets.')
