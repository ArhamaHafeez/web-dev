// ===============================
// Secure Bank - script.js
// ===============================

// Highlight Active Navigation Link
const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {

    const href = link.getAttribute("href");

    if (
        href === currentPage ||
        (currentPage === "" && href === "index.html")
    ) {
        link.classList.add("active");
    }
    else{
        link.classList.remove("active");
    }

});

// ===============================
// Smooth Scroll
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});

// ===============================
// Scroll Animation
// ===============================

const cards=document.querySelectorAll(".card,.stat");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";

}

});

},
{
threshold:0.2
});

cards.forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(40px)";

card.style.transition=".6s";

observer.observe(card);

});

// ===============================
// Header Shadow
// ===============================

window.addEventListener("scroll",()=>{

const header=document.querySelector("header");

if(window.scrollY>30){

header.style.boxShadow="0 8px 20px rgba(0,0,0,.15)";

}

else{

header.style.boxShadow="0 3px 15px rgba(0,0,0,.08)";

}

});

// ===============================
// Counter Animation
// ===============================

const stats=document.querySelectorAll(".stat h1");

let started=false;

function counter(){

stats.forEach(stat=>{

const text=stat.innerText;

const number=parseInt(text);

const suffix=text.replace(/[0-9]/g,'');

let count=0;

const speed=Math.ceil(number/100);

function update(){

count+=speed;

if(count<number){

stat.innerText=count+suffix;

requestAnimationFrame(update);

}
else{

stat.innerText=text;

}

}

update();

});

}

window.addEventListener("scroll",()=>{

const section=document.querySelector(".stats");

if(!section) return;

const top=section.getBoundingClientRect().top;

if(top<window.innerHeight-100 && !started){

counter();

started=true;

}

});

// ===============================
// Welcome Message
// ===============================

window.onload=function(){

console.log("Welcome to Secure Bank");

};
/* =====================================
        MONEY TRANSFER SCRIPT
   ===================================== */


const transferForm = document.getElementById("transferForm");


if(transferForm){


transferForm.addEventListener("submit", function(e){

    e.preventDefault();


    let sender = document.getElementById("sender").value.trim();

    let receiverName = document.getElementById("receiverName").value.trim();

    let receiverAccount = document.getElementById("receiverAccount").value.trim();

    let amount = document.getElementById("amount").value;

    let description = document.getElementById("description").value.trim();



    // Validation

    if(sender === "" ||
       receiverName === "" ||
       receiverAccount === "" ||
       amount === ""){


        alert("Please fill all required fields.");

        return;

    }



    if(amount <= 0){


        alert("Please enter a valid amount.");

        return;

    }



    if(receiverAccount.length < 8){


        alert("Please enter a valid account number.");

        return;

    }



    // Success Message

    alert(

        "Transfer Successful!\n\n" +

        "Amount: $" + amount +
        "\nRecipient: " + receiverName

    );



    // Add New Transaction

    let table = document.querySelector(".history tbody");


    if(table){


        let row = document.createElement("tr");


        let date = new Date();


        row.innerHTML = `

        <td>
        ${date.getDate()} Aug ${date.getFullYear()}
        </td>


        <td>
        ${receiverName}
        </td>


        <td>
        $${amount}
        </td>


        <td class="success">
        Completed
        </td>

        `;


        table.prepend(row);


    }



    // Clear Form

    transferForm.reset();



});


}