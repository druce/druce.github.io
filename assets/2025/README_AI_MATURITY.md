# AI Maturity Assessment - Data Files

This document describes the structure and maintenance of the AI Maturity Self-Assessment tool's data files.

## File Structure

### Data Files

1. **`_data/ai_maturity_dimensions.yml`** (Source of Truth - YAML format)
   - Contains all dimension definitions in YAML format
   - 12 dimensions with 4 maturity levels each (Crawl, Walk, Run, Fly)
   - Easier to read and edit than JSON/JavaScript
   - Can be used by Jekyll if needed in the future

2. **`assets/2025/ai_maturity_dimensions.js`** (JavaScript Module)
   - JavaScript version of the dimensions data
   - Loaded by the HTML assessment tool
   - Exports: `dimensions`, `DIMENSION_COUNT`, `LEVELS_PER_DIMENSION`, `STAGE_LABELS`
   - Should be kept in sync with the YAML file

3. **`assets/2025/ai_maturity.html`** (Application)
   - The main assessment tool HTML file
   - Loads dimensions data from `ai_maturity_dimensions.js`
   - Contains all UI logic and interactivity

## Data Structure

Each dimension has the following structure:

```yaml
- id: 1
  short: "Short Name"
  full: "Full Dimension Name"
  description: "Brief description of this dimension"
  helpText: "Detailed help text explaining what this dimension assesses"
  levels:
    - level: 1
      name: "Crawl"
      questions:
        - "Question 1 for Crawl level"
        - "Question 2 for Crawl level"
    - level: 2
      name: "Walk"
      questions:
        - "Question 1 for Walk level"
        # ... more questions
    - level: 3
      name: "Run"
      questions:
        - "Question 1 for Run level"
    - level: 4
      name: "Fly"
      questions:
        - "Question 1 for Fly level"
```

## The 12 Dimensions

1. **Leadership** - Strategic Vision & Leadership
2. **Team** - Teams, Talent, Organizational Design
3. **Data** - Data Engineering & Quality
4. **Tech Platforms** - Technology Platforms & Infrastructure
5. **Observability** - Controls, Logging, Monitoring
6. **Governance** - Governance
7. **Security** - Security and Threat Management
8. **Training** - Training and Education
9. **Analytics & MLOps** - Analytics, AI Development & MLOps
10. **Use Cases** - Use Cases
11. **External Partnerships** - External Partnerships
12. **Process Implementation** - Business Integration and Process Implementation

## Maturity Levels

Each dimension is assessed across 4 maturity levels:

1. **Crawl** - Initial unstructured exploration and planning
2. **Walk** - Structured learning, training, planning, foundation-laying, and initial POCs
3. **Run** - Operational deployment at scale with robust infrastructure and governance
4. **Fly** - AI-native organization with AI as central and pervasive capability

## How to Update the Data

### Option 1: Edit YAML (Recommended)

1. Edit `_data/ai_maturity_dimensions.yml`
2. Manually sync changes to `assets/2025/ai_maturity_dimensions.js`
3. Test the assessment tool in a browser

### Option 2: Edit JavaScript Directly

1. Edit `assets/2025/ai_maturity_dimensions.js`
2. Optionally sync changes back to the YAML file for documentation
3. Test the assessment tool in a browser

### Future Enhancement: Automated Sync

Consider creating a build script to automatically convert the YAML to JavaScript:
- Use a tool like `js-yaml` to convert YAML to JSON
- Generate the JavaScript file from the YAML source
- This would make the YAML the single source of truth

## Testing

After making changes:

1. Open `ai_maturity.html` in a web browser
2. Verify all dimensions load correctly
3. Test navigation through all 12 dimensions
4. Ensure the radar chart displays properly
5. Test localStorage save/restore functionality

## Version History

- **2025-01-22**: Refactored dimensions data into separate files (YAML and JS)
  - Moved from inline JavaScript to external module
  - Created YAML source file for better maintainability
  - Original inline version was ~1000 lines (lines 799-1798 of ai_maturity.html)
