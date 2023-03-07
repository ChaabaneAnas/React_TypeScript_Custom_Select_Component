import { useState } from 'react';
import Select from './Select';
const options = [
  { label: 'first', value: 1 },
  { label: 'second', value: 2 },
  { label: 'third', value: 3 },
  { label: 'fourth', value: 4 },
  { label: 'fifth', value: 5 },
];

function App() {
  const [value, setValue] = useState<typeof options[0] | undefined>(options[0]);
  const [value1, setValue1] = useState<typeof options[0][]>([options[0]]);

  return (
    <div className='App'>
      <Select
        options={options}
        value={value!}
        onChange={(o) => {
          setValue(o);
        }}
      />
      <Select
        multiple
        options={options}
        value={value1}
        onChange={(o) => {
          setValue1(o);
        }}
      />
    </div>
  );
}

export default App;
