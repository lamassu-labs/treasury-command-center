# Treasury Command Center - Diagram Style Guide

Professional Mermaid diagram standards for consistent visual identity across Treasury Command Center documentation.

## 🎨 Color Palette

### Primary Colors
- **Treasury Purple**: `#7C3AED` - Primary brand color for key components
- **Treasury Border**: `#5B21B6` - Borders and outlines
- **Treasury Light**: `#F3F0FF` - Background sections and highlights

### Secondary Colors
- **Treasury Accent**: `#C65D3C` - Secondary accent for important elements
- **Trust Blue**: `#1E40AF` - Security and trust-related components
- **Neutral Gray**: `#6B7280` - Lines and secondary text

### Status Colors
- **Success Green**: `#059669` - Completed states and success flows
- **Warning Orange**: `#D97706` - Warnings and attention items
- **Error Red**: `#DC2626` - Errors and critical states

## 📐 Diagram Standards

### Typography
- **Font**: Use default sans-serif fonts for consistency
- **Text Size**: Rely on Mermaid defaults for responsive scaling
- **Labels**: Clear, concise, action-oriented language

### Layout Principles
- **Flow Direction**: Left-to-right or top-to-bottom
- **Spacing**: Adequate whitespace between components
- **Grouping**: Related components grouped in subgraphs
- **Hierarchy**: Visual hierarchy through size and color

### Component Styles

#### System Components
- **Services**: Rectangle with Treasury Purple fill
- **Databases**: Cylinder shape with Trust Blue
- **External Systems**: Rectangle with gray border
- **User Interfaces**: Rounded rectangle with Treasury Light

#### Flow Elements
- **Data Flow**: Solid arrows with descriptive labels
- **API Calls**: Dashed arrows for remote communications
- **User Actions**: Bold arrows with action verbs
- **Error Paths**: Red dashed arrows

## 🛠️ Mermaid Configuration

### Standard Header
Always include this header for consistent styling:

\`\`\`mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#7C3AED',
    'primaryTextColor': '#FFFFFF',
    'primaryBorderColor': '#5B21B6',
    'lineColor': '#6B7280',
    'sectionColor': '#F3F0FF',
    'altSectionColor': '#FEF3E6',
    'gridColor': '#E5E7EB',
    'textColor': '#374151'
  }
}}%%
\`\`\`

### Component Templates

#### Service Architecture
\`\`\`mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor': '#7C3AED'}}}%%
graph TB
    subgraph "Frontend Layer"
        UI[Next.js Application]
    end
    
    subgraph "API Layer"
        API[FastAPI Backend]
    end
    
    subgraph "Data Layer"
        DB[(PostgreSQL)]
        Cache[(Redis)]
    end
    
    UI --> API
    API --> DB
    API --> Cache
\`\`\`

#### User Flow
\`\`\`mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor': '#7C3AED'}}}%%
flowchart TD
    Start([User Starts]) --> Action[User Action]
    Action --> Decision{Decision Point}
    Decision -->|Yes| Success[Success State]
    Decision -->|No| Error[Error Handling]
    Error --> Action
    Success --> End([Complete])
\`\`\`

#### API Sequence
\`\`\`mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor': '#7C3AED'}}}%%
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    participant D as Database
    
    U->>F: User Action
    F->>A: API Request
    A->>D: Query Data
    D-->>A: Return Data
    A-->>F: API Response
    F-->>U: Update UI
\`\`\`

## ✅ Quality Checklist

### Before Publishing Any Diagram:
- [ ] **Treasury Command Center styling** applied
- [ ] **Consistent color palette** used
- [ ] **Clear, descriptive labels** for all components
- [ ] **Logical flow direction** (left-to-right or top-to-bottom)
- [ ] **Proper grouping** with subgraphs where appropriate
- [ ] **Mobile responsive** rendering verified
- [ ] **Accessibility** - clear contrast and readable text
- [ ] **GitHub rendering** tested and confirmed
- [ ] **Alt text provided** in documentation context

### Accessibility Requirements
- **High contrast** between text and background
- **Descriptive labels** for all components
- **Logical reading order** following diagram flow
- **Alternative text** descriptions in surrounding documentation

## 📱 Responsive Design

### Mobile Considerations
- **Horizontal scrolling** acceptable for complex diagrams
- **Readable text** at mobile zoom levels
- **Touch-friendly** element spacing
- **Simplified views** for complex architectures when needed

### Testing Checklist
- [ ] **Desktop browser** rendering (Chrome, Firefox, Safari)
- [ ] **Mobile browser** rendering and scrolling
- [ ] **GitHub web interface** display
- [ ] **GitHub mobile app** compatibility
- [ ] **VS Code preview** for development

## 🔧 Common Patterns

### Architecture Diagrams
- Use **subgraphs** for logical grouping
- **Consistent icons** through text labels
- **Data flow arrows** showing information movement
- **Color coding** by component type

### User Journey Diagrams
- **Start and end states** clearly marked
- **Decision points** as diamond shapes
- **Error paths** distinctly marked
- **Happy path** emphasized

### API Documentation
- **Sequence diagrams** for request/response flows
- **Flowcharts** for complex business logic
- **State diagrams** for API lifecycle

## 🚫 Common Mistakes to Avoid

### Visual Issues
- ❌ **Inconsistent colors** across diagrams
- ❌ **Overcrowded layouts** with poor spacing
- ❌ **Unclear arrow directions** or missing labels
- ❌ **Mixing diagram types** inappropriately

### Content Issues
- ❌ **Technical jargon** without explanation
- ❌ **Missing error paths** in user flows
- ❌ **Incomplete sequences** in API diagrams
- ❌ **Inconsistent naming** across documentation

### Accessibility Issues
- ❌ **Poor color contrast** for text readability
- ❌ **Missing alternative descriptions** in context
- ❌ **Complex layouts** without logical flow
- ❌ **Tiny text** that doesn't scale well

## 📚 Example Library

### Complete Examples
See the following files for reference implementations:
- `docs/technical/ARCHITECTURE_OVERVIEW.md` - System architecture
- `docs/deployment/PRODUCTION_DEPLOYMENT.md` - Infrastructure
- `docs/api/README.md` - API flows
- `docs/integration/blockchain/MULTI_CHAIN_SETUP.md` - Integration patterns

### Template Repository
All diagram templates and examples are maintained in:
- **Configuration**: `docs/.mermaid-config.json`
- **Style Guide**: This document
- **Live Examples**: Throughout documentation

---

**Last Updated**: July 18, 2025  
**Version**: 1.0  
**Usage**: Apply these standards to all Treasury Command Center Mermaid diagrams