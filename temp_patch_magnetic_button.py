from pathlib import Path

path = Path('src/components/portfolio/MagneticButton.tsx')
text = path.read_text(encoding='utf-8')
old = "  if (props.as === \"a\") {\n    return (\n      <a href={href} className=\"inline-block\" {...rest}>\n        {inner}\n      </a>\n    );\n  }\n"
new = "  if (props.as === \"a\") {\n    const { href, as, ...rest } = props as AnchorProps;\n    return (\n      <a href={href} className=\"inline-block\" {...rest}>\n        {inner}\n      </a>\n    );\n  }\n"
if old not in text:
    raise SystemExit('old block not found')
path.write_text(text.replace(old, new), encoding='utf-8')
print('patched')
