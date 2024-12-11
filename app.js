
let selectedSender = "Sender 1";
const mainarray=[];

var md = window.markdownit();


function selectSender(sender) {
    selectedSender = sender;
    console.log("Selected Sender: " + sender); 
}

function send() {
    if (selectedSender === "") {
        alert("Please select a sender first.");
        return;
    }

    let usermsg = document.getElementById("userinput").value;
    if (usermsg === "") {
        alert("Please enter a message.");
        return;
    }

   


    if(selectedSender=="Sender 1"){
        console.log("Minidu");
        
        let sender1msg={
            sender : "sender1",
            message:usermsg
            
        }

        mainarray.push(sender1msg);
        console.log(mainarray);

    }else if(selectedSender=="minidu"){
        console.log("minidu");

        sender1msg={
            sender : "sender22",
            message:usermsg
           
        }

        mainarray.push(sender1msg);
        console.log(mainarray);
        
    }else if(selectedSender="alwis"){

        sender1msg={
            sender : "sender33",
            message:usermsg
           
        }
        mainarray.push(sender1msg);
        console.log(mainarray);

    }
    renderMessages();
    if(selectedSender=="Sender 1"){
    aibot();
    }
    document.getElementById("userinput").value = "";

}

function renderMessages() {
    const chat = document.getElementById("senders");
    let body = ""; 

    mainarray.forEach(data => {
        if (data.sender === "sender1") {
            body += `
            <div class="d-flex flex-row justify-content-end mb-4">
                <div class="p-3 me-3 border bg-body-tertiary" style="border-radius: 15px;">
                    <p class="small mb-0">${data.message}</p>
                </div>
                <img src="img/4.jpg" alt="avatar 1" style="width: 45px; height: 100%; border-radius: 30px;">
            </div>`;
        } else if (data.sender === "sender2") {
            body += `
            <div class="d-flex flex-row justify-content-start mb-4">
                <img src="img/bot.jpg" alt="avatar 1" style="width: 45px; height: 100%; border-radius: 30px;">
                <div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237, .2);">
                    <p class="small mb-0">${data.message}</p>
                </div>
            </div>`;
        }else if (data.sender === "sender22") {
            body += `
            <div class="d-flex flex-row justify-content-end mb-4">
                <div class="p-3 me-3 border bg-body-tertiary" style="border-radius: 15px;">
                    <p class="small mb-0">${data.message}</p>
                </div>
                <img src="img/4.jpg" alt="avatar 1" style="width: 45px; height: 100%; border-radius: 30px;">
            </div>`;
        }else if (data.sender === "sender33") {
            body += `
            <div class="d-flex flex-row justify-content-start mb-4">
                <img src="img/2.jpg" alt="avatar 1" style="width: 45px; height: 100%; border-radius: 30px;">
                <div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237, .2);">
                    <p class="small mb-0">${data.message}</p>
                </div>
            </div>`;
        }
    });

    chat.innerHTML = body;
    chat.scrollTop = chat.scrollHeight;
}

function aibot(){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let usermsgg = document.getElementById("userinput").value;
  const raw = JSON.stringify({
    "contents": [
      {
        "parts": [
          {
            "text": usermsgg
          }
        ]
      }
    ]
  });

  console.log(raw);
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };
  
  fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC-Qp2CZsOZQYKYZ30Wyq1leFGB26FStew", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        console.log(result); // Inspect the API response structure
        
        const messageContent = result?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (messageContent) {
            mainarray.push({
                sender: "sender2",
                message: md.render(messageContent)
            });
        } else {
            console.error("Message content is undefined");
        }
        console.log(mainarray);
        renderMessages();
    })
    .catch((error) => console.error("Error fetching data:", error));
   
}



