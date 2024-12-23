```javascript
// bug.js
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

const fetchData = async () => {
  // Simulate an API call that might return an object instead of data
  return { data: 'Hello', extra: { unnecessary: 'object' } };
};

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAndProcess = async () => {
      const response = await fetchData();
      setData(response.data); //Incorrect: rendering an object
    };
    fetchAndProcess();
  }, []);

  return (
    <View>
      <Text>{data}</Text> {/* This will error if data is an object */}
    </View>
  );
};

export default MyComponent;
```
```javascript
// bugSolution.js
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

const fetchData = async () => {
  return { data: 'Hello', extra: { unnecessary: 'object' } };
};

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAndProcess = async () => {
      const response = await fetchData();
      setData(response.data); // Correct: rendering a string
    };
    fetchAndProcess();
  }, []);

  return (
    <View>
      <Text>{data || 'Loading...'}</Text> 
    </View>
  );
};

export default MyComponent;
```