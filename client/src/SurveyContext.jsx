import { createContext, useContext, useState, useEffect } from 'react';

const KEY = 'icecream_survey';

const INITIAL = {
  consent: false,
  answers: [null, null, null, null, null],
  affinity: null,
  flavor: null,
  maxPrice: null,
  ageBucket: null,
  gender: null,
  country: null,
};

function load() {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? { ...INITIAL, ...JSON.parse(raw) } : INITIAL;
  } catch {
    return INITIAL;
  }
}

const Ctx = createContext(null);

export function SurveyProvider({ children }) {
  const [state, setState] = useState(load);

  useEffect(() => {
    sessionStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  function update(patch) {
    setState(s => ({ ...s, ...patch }));
  }

  function setAnswer(idx, value) {
    setState(s => {
      const answers = [...s.answers];
      answers[idx] = value;
      return { ...s, answers };
    });
  }

  function reset() {
    sessionStorage.removeItem(KEY);
    setState(INITIAL);
  }

  return (
    <Ctx.Provider value={{ ...state, update, setAnswer, reset }}>
      {children}
    </Ctx.Provider>
  );
}

export function useSurvey() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSurvey must be inside SurveyProvider');
  return ctx;
}
