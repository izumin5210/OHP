# OHP
[![Build Status](https://travis-ci.org/izumin5210/OHP.svg?branch=master)](https://travis-ci.org/izumin5210/OHP)
[![MIT License](https://img.shields.io/github/license/izumin5210/OHP.svg)][license]

OHP is handy presentation tool

## Usage
### Frontmatter
- `fontSize` (`number?`) - Font size (default: `36`)
- `pageNumber` - Default configuration for page numbers
    - `enable` (`boolean?`) - Whether to render the page numbers (default: `false`)
    - `className` (`string?`) - Class(es) of page number elements (default: `pageNumber`)
    - `number` (`number?`) - Pgae number for the first page (default: `1`)

#### Example
```markdown
---
fontSize: 32
pageNumber:
  enable: true
---

# Title
```

### Comment directives
#### `<!-- newpage -->`
##### Example
```markdown
# Page 1

<!-- newpage -->

# Page 2
```


#### `<!-- page [options] -->`
##### `options`
- `className` (`string?`) - Class(es) of the page element

#### Example
```markdown
<!-- page className="title" -->
# Title

<!-- newpage -->
<!-- page className="toc" -->
# Table of Contents
```

#### `<!-- pageNumber [options] -->`
##### `options`
- `enable` (`boolean?`) - Whether to render the page number to the current page
- `className` (`string?`) - Class(es) of the page number element
- `number` (`number?`) - Number to render to this page

##### Example
```markdown
<!-- pageNumber enable=false -->
# Title

<!-- newpage -->
<!-- pageNumber number=1 className="toc__pageNumber" -->
# Table of Contents
```

### Keyboard Shortcuts

| Windows/Linux | Mac | Action |
| --- | --- | --- |
| <kbd>Ctrl</kbd>+<kbd>Enter</kbd> | <kbd>Cmd</kbd>+<kbd>Enter</kbd> | Insert `<!-- newpage -->` |


## Sample

- [[source](https://gist.github.com/izumin5210/b4a61ed5003b1666dfe8ecd5baf683f1)] [Performance of rendering over 10k items using React // Speaker Deck](https://speakerdeck.com/izumin5210/performance-of-rendering-over-10k-items-using-react)

## License
Licensed under [MIT License][license].

[license]: https://izumin.mit-license.org/2016
