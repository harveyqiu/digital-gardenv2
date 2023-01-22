---
title: "Terminal"
tags: []
createdDate: "2023-01-22"
updatedDate: "2023-01-22"
---

- tree
  - ```tree /path/to/docs -N```
- seq
  - seq -s "; " -f "(%g) " 1 10
    - (1) ; (2) ; (3) ; (4) ; (5) ; (6) ; (7) ; (8) ; (9) ; (10) ;
- pdfgrep
  - pdfgrep -n -r -C 2 "股东"
- pandoc
  - pandoc 情况说明.docx --to markdown | pbcopy
- [sharkdp/fd: A simple, fast and user-friendly alternative to 'find'](https://github.com/sharkdp/fd)
- [Peltoche/lsd: The next gen ls command](https://github.com/Peltoche/lsd)
- ripgrep

## Reference

- [让人在尽调中心情好一点的命令行小工具 - Neverland](https://type.cyhsu.xyz/2020/09/shell-cmd-for-less-sucking-ldd/)