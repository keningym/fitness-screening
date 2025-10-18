let currentStep = 0;
showStep(currentStep);

function showStep(n){
    const steps = document.querySelectorAll("fieldset");
    steps.forEach(f => f.classList.remove("active"));
    steps[n].classList.add("active");
    updateProgressbar(n);
}

function nextPrev(n){
    const steps = document.querySelectorAll("fieldset");
    if(n==1 && !validateForm()) return false;
    steps[currentStep].classList.remove("active");
    currentStep += n;
    if(currentStep >= steps.length){
        displayResult();
        return false;
    }
    showStep(currentStep);
}

function validateForm(){
    const activeFields = document.querySelectorAll("fieldset")[currentStep].querySelectorAll("input, select");
    for(let i=0; i<activeFields.length; i++){
        if(activeFields[i].hasAttribute("required") && activeFields[i].value==""){
            alert("請完成所有必填欄位");
            return false;
        }
        if(activeFields[i].type=="radio"){
            const name = activeFields[i].name;
            if(!document.querySelector(`input[name="${name}"]:checked`)){
                alert("請回答所有問題");
                return false;
            }
        }
    }
    return true;
}

function updateProgressbar(n){
    const progressItems = document.querySelectorAll(".progressbar li");
    progressItems.forEach((li, idx)=>{
        li.classList.toggle("active", idx<=n);
    });
}

function displayResult(){
    const questions = ["q1","q2","q4","q5"];
    let needsMedicalClearance = false;
    for(let q of questions){
        const answer = document.querySelector(`input[name="${q}"]:checked`);
        if(answer && answer.value=="yes") needsMedicalClearance = true;
    }
    const name = document.getElementById("name").value;
    const resultDiv = document.getElementById("result");
    if(needsMedicalClearance){
        resultDiv.style.color="red";
        resultDiv.innerHTML=`${name}，建議先諮詢醫師再進行運動。<br>建議以低強度或輕度活動開始。`;
    }else{
        resultDiv.style.color="green";
        resultDiv.innerHTML=`${name}，可以安全開始一般運動。<br>可進行中等強度有氧運動與阻力訓練。`;
    }
    showStep(currentStep);
}
