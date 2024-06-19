const colorPickerBtn = document.getElementById('color-picker');
const clearAll = document.querySelector('.clear-all');
const colorList = document.querySelector('.all-colors');
// const pickedColors = [];
//step 05

let pickedColors = JSON.parse(localStorage.getItem('picked-colors') || '[]');

//step 1
const activateEyeDropper = async () => {
  try {
    const eyeDropper = new EyeDropper();
    console.log(eyeDropper);
    // const test = eyeDropper.open();
    // console.log(test);


    const colorCode = await eyeDropper.open();
    console.log(colorCode.sRGBHex);
    //copy to clipboard
    navigator.clipboard.writeText(colorCode.sRGBHex);
    //sending new color code to the array
    pickedColors.push(colorCode.sRGBHex);
    //step 4
    localStorage.setItem('picked-colors', JSON.stringify(pickedColors));
    console.log(pickedColors);
    showColor();
  } catch (error) {
    alert("failed")
  }
};

//step :2

const showColor = () => {
  if (pickedColors.length > 0) {
    document.querySelector(".picked-colors").style.display = "block";
     colorList.innerHTML = pickedColors
       .map(
         color => `
    
     <li class="color">
        <span class="rect" style= "background-color : ${color}"></span>
        <span class="value hex">${color}</span>
      </li>
    
    `
       )
      .join('');
    let colors = document.querySelectorAll(".color");
    console.log(colors)
    colors.forEach(li => {
      li.addEventListener('click', (e) => {
        let color = e.target.innerText;
        navigator.clipboard.writeText(color);
        e.target.innerText = "Copied";
        setTimeout(() => (e.target.innerText = color), 1000);
      })
    })
    
    
  } else {
    document.querySelector('.picked-colors').style.display = 'none';
  }

 
}

//step 3
const clearListOfColors = () => {
  // colorList.innerHTML = "";
  pickedColors.length = 0;
  localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
   document.querySelector('.picked-colors').style.display = 'none';
}

//activate colorpicker
colorPickerBtn.addEventListener('click', activateEyeDropper);
clearAll.addEventListener('click', clearListOfColors);
    showColor();
