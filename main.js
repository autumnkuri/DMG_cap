const   seraphicUp = document.querySelector("#seraphicUp"),
        supUp = document.querySelector("#supUp"),
        weaponUp = document.querySelector("#weaponUp"),
        otherType = document.querySelector("#otherType"),
        special = document.querySelector("#special"),
        attackCap = document.querySelector("#attackCap"),
        estimatedAttak = document.querySelector("#estimatedAttack"),
        CACap = document.querySelector("#CACap"),
        estimatedCA = document.querySelector("#estimatedCA"),
        skillCap = document.querySelector("#skillCap"),
        CBCap = document.querySelector("#CBCap"),
        estimatedCB = document.querySelector("#estimatedCB");

//偵測動作並更新計算
seraphicUp.addEventListener("change", function(){
    calculate();
})
supUp.addEventListener("change", function(){
    calculate();
})
weaponUp.addEventListener("change", function(){
    calculate();
})
otherType.addEventListener("change", function(){
    calculate();
})
special.addEventListener("change", function(){
    calculate();
})
//回到頁面頂端
function topBtn() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
//取得勾選對象的值
function isChecked(form, elem){
    const target = form[name= elem];
    if(target.checked){
        return Number(target.value);
    } else {
        return 0;
    }
}
//取得單選項目的值
function getValue(form, elem){
    const target = Number(form[name= elem].value);
    return target;
}
//計算全部結果
function calculate(){
    attackCal();
    CACal();
    skillCal();
    CBCal();
}
//==============最終上限算式==============
function attackCal(){
    const seraphicTotal = getValue(seraphicUp,"seraphic") + getValue(seraphicUp,"arcarum") + getValue(seraphicUp,"otherFinal")/100;
    const others = 
    getValue(supUp,"primarch") +
    getValue(supUp,"chara") +
    isChecked(weaponUp,"omegaAttack") +
    handleCommonCap() +
    getValue(otherType,"lb") +
    getValue(otherType,"other")/100;
    const attackDisplay = (seraphicTotal+1) * (others+1);
    attackCap.textContent = attackDisplay.toFixed(2);
    if (otherType.buff.value == 1){
        estimatedAttak.textContent = (attackDisplay * 116).toFixed(1);
    } else {
        estimatedAttak.textContent = (attackDisplay * 44.5).toFixed(1);
    }
}
function CACal(){
    const seraphicTotal = getValue(seraphicUp,"seraphic") + getValue(seraphicUp,"arcarum");
    const others = 
    getValue(supUp,"primarch") +
    getValue(supUp,"chara") +
    getValue(supUp,"charaCA") +
    isChecked(weaponUp,"huanglong") +
    isChecked(weaponUp,"omegaCA") +
    handleCommonCap() +
    handleCA() +
    getValue(otherType,"lb") +
    getValue(otherType,"other")/100 +
    getValue(otherType,"otherCA")/100;
    const CADisplay = (seraphicTotal+1) * (others+1);
    CACap.textContent = CADisplay.toFixed(2);
    if (otherType.buff.value == 1){
        estimatedCA.textContent = (CADisplay * (getValue(special,"specialCA") + 50)).toFixed(1);
    } else {
        estimatedCA.textContent = (CADisplay * getValue(special,"specialCA")).toFixed(1);
    }
}
function skillCal(){
    const seraphicTotal = getValue(seraphicUp,"seraphic") + getValue(seraphicUp,"arcarum");
    const others = 
    getValue(supUp,"primarch") +
    getValue(supUp,"chara") +
    isChecked(weaponUp,"qilinLyre") +
    isChecked(weaponUp,"flammaOrbis")+
    isChecked(weaponUp,"omegaSkill") +
    handleCommonCap() +
    handleSkill() +
    getValue(otherType,"lb") +
    getValue(otherType,"other")/100 +
    getValue(otherType,"otherSkill")/100;
    const skillDisplay = (seraphicTotal+1) * (others+1);
    skillCap.textContent = skillDisplay.toFixed(2);
}
function CBCal(){
    const others = handleCB() + getValue(otherType,"otherCB")/100;
    const CBDisplay = (others+1);
    CBCap.textContent = CBDisplay.toFixed(2);
    estimatedCB.textContent = (CBDisplay * 170).toFixed(1);
}
//==============處理各別上限==============
function handleCommonCap(){
    let cap = 
    getValue(weaponUp,"beast") * 0.07 +
    isChecked(weaponUp,"scales") +
    isChecked(weaponUp,"axe") +
    isChecked(weaponUp,"qilinbow") +
    getValue(weaponUp,"cosmos") *0.01;
    if(cap > 0.2){
        cap = 0.2;
    }
    return cap;
}
function handleCA(){
    let exceedCap = getValue(weaponUp,"exceedNum") * getValue(weaponUp,"exceed");
    let omegaCap = getValue(weaponUp,"sentenceoNum") * getValue(weaponUp,"sentenceo") * getValue(weaponUp,"summono");
    if(omegaCap > 0.3){
        omegaCap = 0.3;
    }
    let normalCap = 
    getValue(weaponUp,"sentenceNum") * getValue(weaponUp,"sentence") * getValue(weaponUp,"summon")+
    getValue(weaponUp,"glorycaNum") * getValue(weaponUp,"gloryca") * getValue(weaponUp,"summon");
    if(normalCap > 0.3){
        normalCap = 0.3;
    }
    let total = exceedCap + omegaCap + normalCap
    if(total > 0.6){
        total = 0.6;
    }
    return total;
}
function handleSkill(){
    let artsCap = getValue(weaponUp,"artsNum") * getValue(weaponUp,"arts");
    if(artsCap > 0.4){
        artsCap = 0.4;
    }
    let twoSwordCap = isChecked(weaponUp,"twoSword");
    let total = artsCap + twoSwordCap;
    if(total > 0.4){
        total = 0.4;
    }
    return total;
}
function handleCB(){
    let chainForceCap = getValue(weaponUp,"chainForceNum") * getValue(weaponUp,"chainForce");
    let normalCap = getValue(weaponUp,"glorycbNum") * getValue(weaponUp,"glorycb") * getValue(weaponUp,"summoncb");
    let total = chainForceCap + normalCap + isChecked(weaponUp,"kengo") + isChecked(weaponUp,"omedgCB");
    if(total > 0.5){
        total = 0.5;
    }
    return total;
}