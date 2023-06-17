import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const url = 'http://localhost:3000';
const socket = io(url);
const inputs = document.querySelectorAll('.display div input');

const update=(msg)=>{
  inputs.forEach((input)=>{
    if(msg.name===input.name){
      input.value=msg.value;
    }
  })
}


socket.on('display', (msg) => {
  console.log(msg);
  update(msg);
});

socket.on('checkArray',(checks)=>{
  console.log(checks)
  inputs.forEach((input)=>{
    const idx = checks.indexOf(input.name);
    console.log(idx);
    if(idx>-1){
      input.style.display='block'
      input.previousElementSibling.style.display='block';
    } else{
      input.style.display='none'
      input.previousElementSibling.style.display='none'; 
    }
  })
})
