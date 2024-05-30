//Inserting the images

function insertImage() {
  document.querySelectorAll(".box").forEach((image) => {
    if (image.innerText.length !== 0) {
      image.innerHTML = `${image.innerText} <img class="all-img" src="./images/${image.innerText}.svg" alt="image"> `;
      image.style.cursor = "pointer";
    }
  });
}

insertImage();


//Coloring the board

function coloring() {
  const color = document.querySelectorAll(".box");

  color.forEach((color) => {
    getId = color.id;
    arr = Array.from(getId);
    arr.shift();
    aside = eval(arr.pop());
    aup = eval(arr.shift());
    a = aside + aup;

    if (a % 2 == 0) {
      color.style.backgroundColor = "rgb(232 235 239)";
    }
    if (a % 2 !== 0) {
      color.style.backgroundColor = "rgb(125 135 150)";
    }
  });
}

coloring();

function reddish() {
  document.querySelectorAll(".box").forEach((i1) => {
    if (i1.style.backgroundColor == "blue") {
      document.querySelectorAll(".box").forEach((i2) => {
        if (
          i2.style.backgroundColor == "greenyellow" &&
          i2.innerText.length !== 0
        ) {
          greenyellowText = i2.innerText;

          blueText = i1.innerText;

          getId = i2.id;
          arr = Array.from(getId);
          arr.shift();
          aside = eval(arr.pop());
          aup = eval(arr.shift());
          a = aside + aup;

          if (a % 2 == 0) {
            i2.style.backgroundColor = "rgb(232 235 239)";
          }
          if (a % 2 !== 0) {
            i2.style.backgroundColor = "rgb(125 135 150)";
          }
        }
      });
    }
  });
}

//reset button
document.getElementById("reset-btn").addEventListener("click", function () {
  location.reload();
});

tog = 0;

document.querySelectorAll(".box").forEach((item) => {
  item.addEventListener("click", function () {
    if (
      item.style.backgroundColor == "greenyellow" &&
      item.innerText.length == 0
    ) {
      tog = tog + 1;
    } else if (
      item.style.backgroundColor == "greenyellow" &&
      item.innerText.length !== 0
    ) {
      document.querySelectorAll(".box").forEach((i) => {
        if (i.style.backgroundColor == "blue") {
          blueId = i.id;
          blueText = i.innerText;
          document.getElementById(blueId).innerText = "";
          item.innerText = blueText;
          coloring();
          insertImage();
          tog = tog + 1;
        }
      });
    }

    getId = item.id;
    arr = Array.from(getId);
    itemcolor = item.innerText[0];
    arr.shift();
    aside = eval(arr.pop());
    arr.push("0");
    aup = eval(arr.join(""));
    a = aside + aup;
    //function to display the available path for all pieces

    function whosTurn(toggle) {
        
      if (item.innerText.length != 0) {

        if(toggle == "R" && itemcolor == "R"){

            if (item.innerText == "Rtitan" || "Rtank") {

                if (aside < 8) {
                    document.getElementById(`b${a + 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aside > 1) {
                    document.getElementById(`b${a - 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup < 800) {
                    document.getElementById(`b${a + 100}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup > 100) {
                    document.getElementById(`b${a - 100}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup > 100 && aside < 8) {
                    document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup > 100 && aside > 1) {
                    document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup < 800 && aside < 8) {
                    document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup < 800 && aside > 1) {
                    document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (item.innerText != 0) {
                    item.style.backgroundColor = "blue";
                }
            }

            if (item.innerText == "Rcannon"){

                if (aside < 8) {
                    document.getElementById(`b${a + 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aside > 1) {
                    document.getElementById(`b${a - 1}`).style.backgroundColor =
                      "greenyellow";
                }

            }

            if(item.innerText == "Rricho" || "Rsemiricho"){

                if (aside < 8) {
                    document.getElementById(`b${a + 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aside > 1) {
                    document.getElementById(`b${a - 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup < 800) {
                    document.getElementById(`b${a + 100}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup > 100) {
                    document.getElementById(`b${a - 100}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup > 100 && aside < 8) {
                    document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup > 100 && aside > 1) {
                    document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup < 800 && aside < 8) {
                    document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup < 800 && aside > 1) {
                    document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (item.innerText != 0) {
                    item.style.backgroundColor = "blue";
                }
            }

        }

        
        if(toggle == "B" && itemcolor == "B"){
            if (item.innerText == "Btitan" || "Btank") {

                if (aside < 8) {
                    document.getElementById(`b${a + 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aside > 1) {
                    document.getElementById(`b${a - 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup < 800) {
                    document.getElementById(`b${a + 100}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup > 100) {
                    document.getElementById(`b${a - 100}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup > 100 && aside < 8) {
                    document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup > 100 && aside > 1) {
                    document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup < 800 && aside < 8) {
                    document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup < 800 && aside > 1) {
                    document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (item.innerText != 0) {
                    item.style.backgroundColor = "blue";
                }
            }

            if (item.innerText == "Bcannon"){
                if (aside < 8) {
                    document.getElementById(`b${a + 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aside > 1) {
                    document.getElementById(`b${a - 1}`).style.backgroundColor =
                      "greenyellow";
                }
                

            }

            if(item.innerText == "Bricho" || "Bsemiricho"){

                if (aside < 8) {
                    document.getElementById(`b${a + 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aside > 1) {
                    document.getElementById(`b${a - 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup < 800) {
                    document.getElementById(`b${a + 100}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup > 100) {
                    document.getElementById(`b${a - 100}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup > 100 && aside < 8) {
                    document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup > 100 && aside > 1) {
                    document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup < 800 && aside < 8) {
                    document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (aup < 800 && aside > 1) {
                    document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
                      "greenyellow";
                }
                if (item.innerText != 0) {
                    item.style.backgroundColor = "blue";
                }
                

            }

        }
            
      }
    }

    // Toggling the turn

    if (tog % 2 !== 0) {
      document.getElementById("tog").innerText = "Red's Turn";
      whosTurn("R");
    }

    if (tog % 2 == 0) {
      document.getElementById("tog").innerText = "Blue's Turn";
      whosTurn("B");
    }

    reddish();
  });
});

// Moving the element
document.querySelectorAll(".box").forEach((hathiTest) => {
  hathiTest.addEventListener("click", function () {
    if (hathiTest.style.backgroundColor == "blue") {
      blueId = hathiTest.id;
      blueText = hathiTest.innerText;

      document.querySelectorAll(".box").forEach((hathiTest2) => {
        hathiTest2.addEventListener("click", function () {
          if (
            hathiTest2.style.backgroundColor == "greenyellow" &&
            hathiTest2.innerText.length == 0
          ) {
            document.getElementById(blueId).innerText = "";
            hathiTest2.innerText = blueText;
            coloring();
            insertImage();
          }
        });
      });
    }
  });
});

// Prvents from selecting multiple elements
z = 0;
document.querySelectorAll(".box").forEach((ee) => {
  ee.addEventListener("click", function () {
    z = z + 1;
    if (z % 2 == 0 && ee.style.backgroundColor !== "greenyellow") {
      coloring();
    }
  });
});
