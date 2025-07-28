const addEl = document.getElementById("btn");
const totalPriceEl = document.getElementById("total-price");
const tableEl = document.querySelector("table");
const inputTypes = ["text", "number", "number", "number"];
const disabledAt = [false, false, false, true];
const placeholderAt = ["Category", "QYT", "Price", "Total"];
const doneEl = document.getElementById("done")

security()
function security(){
    const securityContainer = document.querySelector(".security");
    const userName = document.getElementById("user-name");
    const password = document.getElementById("password");
    const safeBtn = document.getElementById("safe");

    userName.addEventListener("input", ()=>{
        password.addEventListener("input", ()=>{
            safeBtn.addEventListener("click", ()=>{
                if(userName.value === "samer" || userName.value === "سامر قصيدة" && password.value === "441977"){
                    securityContainer.style.top = "-300px";
                    securityContainer.style.transition = "all 1s ease";
                }else{
                    userName.placeholder = "user name and password is not currect";
                    password.placeholder = "user name and password is not currect";
                    userName.value = "";
                    password.value = ""
                }
            })
        })
    })

    
}









addEl.addEventListener("click", () => {
    const newTrEl = document.createElement("tr");
    const inputs = [];

    for (let i = 0; i < 4; i++) {
        const newTdEl = document.createElement("td");
        const newInputEl = document.createElement("input");

        newInputEl.type = inputTypes[i];
        newInputEl.disabled = disabledAt[i];
        newInputEl.placeholder = placeholderAt[i];

        if (i === 1 || i === 2) {
            newInputEl.addEventListener("input", () => calculateTotal(inputs));
        }

        inputs.push(newInputEl);
        newTdEl.appendChild(newInputEl);
        newTrEl.appendChild(newTdEl);
    }

    tableEl.appendChild(newTrEl);
});

function calculateTotal(inputs) {
    const qyt = parseFloat(inputs[1].value) || 0;
    const price = parseFloat(inputs[2].value) || 0;
    const total = qyt * price;
    inputs[3].value = total.toFixed(2);
    totalPriceCalcuate()
}



function totalPriceCalcuate(){
    let totalSum = 0;

    tableEl.querySelectorAll("tr").forEach(tr => {
        const inputs = tr.querySelectorAll("input");

        if (inputs.length === 4) {
            const total = parseFloat(inputs[3].value);
            totalSum += total;
        }
    });

    totalPriceEl.innerText = `Total Price: ${totalSum.toFixed(2)}`;
    console.log(totalSum)
};


window.addEventListener("DOMContentLoaded", ()=>{
    doneEl.addEventListener("click", ()=>{
        addEl.style.display = "none";
        doneEl.style.display = "none";
        setTimeout(exportPDF,50)
    })

})




async function exportPDF() {
    const { jsPDF } = window.jspdf;

    const canvas = await html2canvas(document.body, { scale: 2 });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("page.pdf");
}




