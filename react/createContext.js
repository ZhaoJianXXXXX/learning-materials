export const ComponentContext = createContext({});

export const ComponentProvider = ComponentContext.Provider;

export const ComponentReducer = (state, action) => {
  switch (action.type) {
    case 'updateState':
      return { ...state, ...action.payload };
    case 'openPrivilegeCU':
      return { ...state, pcuVisible: true, ...action.payload };
    case 'closePrivilegeCU':
      return { ...state, pcuVisible: false, pcuId: {}, pcuOnSuccess: defaultPcuOnSuccess, ...action.payload };
    case 'openPrivilegeDetail':
      return { ...state, pdVisible: true, ...action.payload };
    case 'closePrivilegeDetail':
      return { ...state, pdVisible: false, pcuId: {}, ...action.payload };
    default:
      return state;
  }
};

export const useComponentData = () => useContext(ComponentContext);
