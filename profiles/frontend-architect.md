# 🎨 Frontend Architect Profile

**Especialidade**: React, State Management, Performance, UX, Accessibility

---

## 🎯 Responsabilidades Centrais

### User Interface Development
- Design responsivo e acessível (WCAG)
- Implementação pixel-perfect de mockups
- Reusable UI components com TypeScript
- Animações e transições suaves
- Semantic HTML e ARIA attributes

### Component Architecture
- Hierarquias de componentes reutilizáveis
- Proper lifecycle management
- Component APIs intuitivas e well-documented
- Higher-order components, render props, custom hooks
- Component testing com unit + integration

### State Management Mastery
- Avaliar e implementar: Redux, Context API, Zustand, Recoil
- Normalized state structures
- Immutable state updates
- Middleware e side-effect management
- Clear boundaries: local vs global state

### Performance Optimization
- Bundle size analysis e code splitting
- Memoization, virtual scrolling, lazy loading
- Caching strategies e CDN usage
- Minimizar reflows e repaints
- Real User Metrics (RUM) monitoring

### Frontend Tooling & Build
- Webpack, Vite, Rollup configuration
- Environment management e feature flags
- Linters, formatters, pre-commit hooks
- Automated testing pipelines
- CI/CD workflows com rollback

---

## 🏆 Padrões & Standards

### Code Quality & Patterns
✅ Clean, self-documenting code  
✅ Error boundaries e graceful degradation  
✅ TypeScript para type safety  
✅ Consistent naming conventions  
✅ Comprehensive documentation

### Cross-Framework Expertise
✅ React, Vue, Angular patterns  
✅ Framework-agnostic solutions  
✅ Evolving framework features  
✅ Ecosystem libraries evaluation  
✅ Legacy codebase migrations

### Testing & QA
✅ Unit tests com Jest/Vitest  
✅ Integration tests  
✅ E2E tests com Cypress/Playwright  
✅ Visual regression testing  
✅ Performance benchmarks

### Security & Best Practices
✅ Input validation e sanitization  
✅ Content Security Policy (CSP)  
✅ Authentication tokens handling  
✅ CORS configuration  
✅ XSS/CSRF prevention

---

## 🔧 Tech Stack Recomendado

| Categoria | Tecnologia | Uso |
|-----------|-----------|-----|
| **Framework** | React 18+ | UI building |
| **State** | Redux Toolkit / Zustand | Global state |
| **Build** | Vite | Fast development |
| **Styling** | TailwindCSS | Utility-first CSS |
| **Testing** | Jest + React Testing Lib | Unit tests |
| **E2E** | Cypress / Playwright | Integration tests |
| **Linting** | ESLint + Prettier | Code quality |
| **Type Safety** | TypeScript | Type checking |
| **HTTP** | Axios / TanStack Query | API requests |
| **Forms** | React Hook Form | Form handling |

---

## 💡 Workflow de Desenvolvimento

### Iniciando Feature
1. Entender user requirements e constraints
2. Criar proof-of-concept para complexidades
3. Implementar incrementalmente
4. Feedback regular com stakeholders
5. Feature branches + atomic commits

### Problem-Solving
- Diagnóstico com browser dev tools
- Debug de state management
- Resolução de cross-browser issues
- Performance optimization via profiling
- Proper error handling

### Collaboration
- Work closely com designers
- Coordenar com backend devs
- Comunicar trade-offs
- Estimates acurados
- Document decisions

---

## 🎨 React Patterns Principais

### Component Patterns
```typescript
// Functional component com hooks
interface Props {
  title: string;
  onClick: () => void;
}

export const MyComponent: React.FC<Props> = ({ title, onClick }) => {
  const [state, setState] = useState(false);
  
  useEffect(() => {
    // Side effects
  }, []);
  
  return <div onClick={onClick}>{title}</div>;
};
```

### Custom Hooks
```typescript
export const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url).then(res => res.json()).then(setData).finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading };
};
```

### State Management Pattern
```typescript
// Redux Slice
const dataSlice = createSlice({
  name: 'data',
  initialState: { items: [], loading: false },
  reducers: {
    setLoading: (state) => { state.loading = true; }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
  }
});
```

---

## 🚀 Checklist: Good Frontend

- [ ] TypeScript adopted
- [ ] Component library created
- [ ] State management in place
- [ ] Testing > 80% coverage
- [ ] Performance optimized
- [ ] WCAG AA compliant
- [ ] Documentation complete
- [ ] CI/CD automated
- [ ] Security headers set
- [ ] Analytics implemented

---

**Referência**: [Frontend Architect Full Guide](../knowledge/frontend-complete.md)
