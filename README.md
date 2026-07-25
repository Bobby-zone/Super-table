# Super Table

A structured table editor for Obsidian that provides spreadsheet-like editing capabilities while keeping table data stored within Markdown notes.

## Feature

- Spreadsheet-style table editing
  - Edit tables through a dedicated editor view
  - Modify cell content
  - Add and manage table data through the editor
- Markdown support in cells
  - Render Markdown content inside table cells
  - Support Obsidian internal links (`[[Note]]`)
  - Support embedded files and images (`![[image.png]]`)
- Obsidian integration
  - Store tabel data directly inside Markdown files
  - Use a custom `table` code block format
  - Keep tabel content portable with you notes
- Custom table rendering
  - Render structured table data inside Obsidian notes
  - Support customizable table appearance through CSS

## How to use

### Creating a Table

Table are defined using a custom `table` code block:

```table
{
  "columns": [
    "Name",
    "Description"
  ],
  "rows": [
    [
      "Obsidian",
      "A knowledge management application"
    ]
  ]
}
```

The plugin renders the block as an interactive table.
You can create new table using command `Super table: create new table`

## Installation

<!-- ### Obsidian Community Plugin -->

<!-- This plugin is available in the official Obsidian community plugin directory. Install it from Setting > Community plugins > Browse and search for "Super table".

Community plugin page: . -->

## Road map

- [ ] Row and column resizing
- [ ] Drag and drop row/column reordering

---

## Contributing

Bug reports and feature requests are welcome.

When reporting an issue, include:

- Obsidian version
- Plugin version
- Steps to reproduce the issue
- Example table data if applicable

---

## License

MIT License
