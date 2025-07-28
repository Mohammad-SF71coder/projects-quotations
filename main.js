
const addEl = document.getElementById("btn");
const totalPriceEl = document.getElementById("total-price");
const tableEl = document.querySelector("table");
const inputTypes = ["text", "number", "number", "number"];
const disabledAt = [false, false, false, true];
const placeholderAt = ["Category", "QYT", "Price", "Total"];

const doneEl = ducument.getElementById("done")


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


doneEl.addEventListener("click", ()=>{
    addEl.style.display = "none";
    doneEl.style.display = "none";
    setTimeout(exportPDF,2000)
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




