
import './App.css';
import {useState, useEffect} from 'react'
import io from 'socket.io-client'
import {nanoid} from 'nanoid'


const socket = io.connect('http://localhost:3000')

function App() {
  const [messages, setMessages] = useState('');
  const [chat,setChat] = useState([]);
  const username = nanoid(4)

  const sendChat =(e)=>[
    e.preventDefault(),
    socket.emit('chatWithAnkita',{id:username,message:messages}),
    setMessages('')
  ]


  useEffect(()=>{
socket.on("chatWithAnkita",(payload)=>{
  setChat([...chat,payload])
})
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat With Ankita</h1>

        {
          chat.map((payload,index)=>{
            return(
              <div key={index}>
               
                <h3>{payload.message} <span> {payload.id}</span></h3>
              </div>
            
          )
        })
        }

        <form onSubmit={sendChat}>
          <input type="text" placeholder="Type a message" onChange={(e)=>
          {
            setMessages(e.target.value)}

          } value={messages} />
          <button type='submit' >Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
