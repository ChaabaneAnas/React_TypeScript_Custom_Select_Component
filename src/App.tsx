import { useState } from 'react';
import Select from './Select';
const options = [
  { label: 'first', value: 1 },
  { label: 'second', value: 2 },
  { label: 'third', value: 3 },
  { label: 'fourth', value: 4 },
  { label: 'fifth', value: 5 },
  { label: 'sixth ', value: 6 },
  { label: 'seventh', value: 7 },
  { label: 'eitth', value: 8 },
  { label: 'nineth', value: 9 },
  { label: 'tenth', value: 10 },
  { label: 'elenth', value: 11 },
  { label: 'twelveth', value: 12 },
  { label: 'therteenth', value: 13 },
];

function App() {
  const [value, setValue] = useState<typeof options[1] | undefined>(options[0]);

  return (
    <div className='App'>
      <Select
        options={options}
        value={value!}
        onchange={(o) => {
          setValue(o);
        }}
      />
    </div>
  );
}

export default App;
