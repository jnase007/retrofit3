import { useState } from 'react';

export const useTheme = () => {
  const [isDark] = useState(false);
  const toggle = () => {}; // No-op since we're not using dark mode

  return { isDark, toggle };
};