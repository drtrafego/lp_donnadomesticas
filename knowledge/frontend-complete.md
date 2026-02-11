# 📙 Base de Conhecimento - Frontend Completo

**Última atualização**: 9 de Fevereiro de 2026

---

## 🎯 Princípios de Arquitetura Frontend

### 1. Component-Driven Development
UI = Composição de componentes pequenos, reutilizáveis.

```
App
├── Header
│   ├── Logo
│   └── Navigation
├── Main
│   ├── Sidebar
│   └── Content
│       ├── Card
│       ├── Card
│       └── Pagination
└── Footer
```

### 2. Single Responsibility
Cada componente = uma responsabilidade clara.

```typescript
// ✅ BEM: Componente que só lista
const UserList: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <ul>
      {users.map(user => <UserItem key={user.id} user={user} />)}
    </ul>
  );
};

// ✅ BEM: Componente que só renderiza item
const UserItem: React.FC<{ user: User }> = ({ user }) => {
  return <li>{user.name} ({user.email})</li>;
};

// ❌ RUIM: Componente com múltiplas responsabilidades
const UserList = ({ users, onDelete, onEdit, onExport }) => {
  // Renderiza, edita, deleta, exporta...
};
```

### 3. Props Interface Clarity
API clara e tipada para componentes.

```typescript
interface ButtonProps {
  // Básico
  children: React.ReactNode;
  onClick: () => void;
  
  // Variantes
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  
  // Estado
  disabled?: boolean;
  loading?: boolean;
  
  // Pode se estender
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${disabled ? 'disabled' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### 4. Presentational vs Container Pattern
```typescript
// Container: Lógica, estado, efeitos
const UserListContainer: React.FC<{ userId: string }> = ({ userId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUsers().then(setUsers).finally(() => setLoading(false));
  }, []);
  
  return <UserListPresentation users={users} loading={loading} />;
};

// Presentational: Só renderiza
interface UserListPresentationProps {
  users: User[];
  loading: boolean;
}

const UserListPresentation: React.FC<UserListPresentationProps> = ({
  users,
  loading
}) => {
  if (loading) return <Spinner />;
  return (
    <ul>
      {users.map(user => <UserItem key={user.id} user={user} />)}
    </ul>
  );
};
```

---

## 🎨 State Management Patterns

### Local vs Global State
```typescript
// ❌ RUIM: Tudo em Redux
const App = () => {
  const isDropdownOpen = useSelector(state => state.ui.dropdownOpen);  // OverkILL
  const dispatch = useDispatch();
  
  return (
    <button onClick={() => dispatch(toggleDropdown())}>
      Menu {isDropdownOpen && <DropdownMenu />}
    </button>
  );
};

// ✅ BEM: Local state para UI transiente
const App = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  return (
    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
      Menu {isDropdownOpen && <DropdownMenu />}
    </button>
  );
};
```

### Redux Best Practices
```typescript
// Slice (feature-based)
const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    // Synchronous actions
    clearUser: (state) => {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    // Async thunks
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Async thunk
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Selectors
export const selectUser = (state: RootState) => state.user.data;
export const selectUserLoading = (state: RootState) => state.user.loading;

// Usage in component
const User = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);
  
  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [userId, dispatch]);
  
  if (loading) return <Spinner />;
  return <div>{user?.name}</div>;
};
```

### Context API Alternative
```typescript
// Create context
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    checkAuth().then(setUser).finally(() => setLoading(false));
  }, []);
  
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await api.post('/auth/login', { email, password });
      setUser(user);
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Usage
const LoginForm = () => {
  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };
  
  return <form onSubmit={handleSubmit}>{...}</form>;
};
```

---

## ⚡ Performance Optimization

### React.memo
Previne renders desnecessários.

```typescript
// Sem memo: renderiza toda vez que parent re-renderiza
const UserItem = ({ user }: { user: User }) => {
  console.log('UserItem rendered');
  return <div>{user.name}</div>;
};

// Com memo: renderiza apenas se props mudarem
const UserItem = React.memo(({ user }: { user: User }) => {
  console.log('UserItem rendered');
  return <div>{user.name}</div>;
});
```

### useCallback
Previne recriação de funções.

```typescript
// ❌ RUIM: handleClick recriada toda render
const UserList = ({ users }: { users: User[] }) => {
  const handleClick = (id: string) => {
    console.log('Clicked:', id);
  };
  
  return (
    <ul>
      {users.map(user => (
        <UserItem key={user.id} user={user} onClick={handleClick} />
      ))}
    </ul>
  );
};

// ✅ BEM: handleClick é memoized
const UserList = ({ users }: { users: User[] }) => {
  const handleClick = useCallback((id: string) => {
    console.log('Clicked:', id);
  }, []);  // Não muda se deps não mudarem
  
  return (
    <ul>
      {users.map(user => (
        <UserItem key={user.id} user={user} onClick={handleClick} />
      ))}
    </ul>
  );
};
```

### useMemo
Memoiza valores custosos.

```typescript
// ❌ RUIM: sort executado toda render
const UserList = ({ users }: { users: User[] }) => {
  const sorted = users.sort((a, b) => a.name.localeCompare(b.name));
  return <ul>{sorted.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
};

// ✅ BEM: sort apenas se users mudarem
const UserList = ({ users }: { users: User[] }) => {
  const sorted = useMemo(
    () => [...users].sort((a, b) => a.name.localeCompare(b.name)),
    [users]
  );
  return <ul>{sorted.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
};
```

### Code Splitting
```typescript
// Componente lazy
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

// Com Suspense
const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyComponent />
    </Suspense>
  );
};

// Route-based splitting
const routes = [
  { path: '/', element: <Home /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/admin', element: lazy(() => import('./Admin')) }  // Carrega on-demand
];
```

---

## 🧪 Testing Patterns

### Unit Tests
```typescript
describe('UserItem', () => {
  it('should render user name', () => {
    const user = { id: '1', name: 'John Doe' };
    const { getByText } = render(<UserItem user={user} />);
    
    expect(getByText('John Doe')).toBeInTheDocument();
  });
  
  it('should call onClick when clicked', () => {
    const onClick = jest.fn();
    const user = { id: '1', name: 'John Doe' };
    const { getByText } = render(<UserItem user={user} onClick={onClick} />);
    
    fireEvent.click(getByText('John Doe'));
    
    expect(onClick).toHaveBeenCalledWith('1');
  });
});
```

### Integration Tests
```typescript
describe('UserList', () => {
  it('should load and display users', async () => {
    mockApi.get('/users').mockResolvedValue([
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Doe' }
    ]);
    
    const { getByText } = render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );
    
    expect(getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(getByText('John Doe')).toBeInTheDocument();
      expect(getByText('Jane Doe')).toBeInTheDocument();
    });
  });
});
```

---

## 📋 Checklist: Frontend Production Ready

- [ ] Component library documented
- [ ] TypeScript strict mode enabled
- [ ] Test coverage > 80%
- [ ] WCAG AA accessibility
- [ ] Mobile responsive (tested)
- [ ] Performance: LCP < 2.5s
- [ ] Performance: CLS < 0.1
- [ ] Bundle size analyzed
- [ ] Error boundaries in place
- [ ] Loading states for all async
- [ ] Network error handling
- [ ] Analytics integrated
- [ ] Monitoring in place
- [ ] Documentation complete

---

**Ver também**: [React Patterns](./docs/frontend/components.md) | [Performance Guide](./docs/frontend/performance.md)
