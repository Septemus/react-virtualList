import React from 'react';
import '@/App.css';
import List from"@/components/List"
import { item } from '@/components/List';
import {v4 as uuidv4} from 'uuid';
const arr:item[]=[];
for(let i=0;i<100;++i) {
  arr.push({
    id:uuidv4(),
    content:`this is content-${Math.random()*100}`
  })
}
function App() {

  return (
    <div className="App">
      <List items={arr}></List>
    </div>
  );
}

export default App;
