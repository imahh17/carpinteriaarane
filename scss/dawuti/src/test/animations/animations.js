window.onload = function () {
  //ELEMENTS
  var editor = document.getElementById("editor");
  var elements = document.getElementsByClassName("el");
  var textarea = document.getElementById("textarea");
  var editorEl = document.getElementById("editor-el");
  var backdrop = document.getElementById("backdrop");
  var playButton = document.getElementById("play");
  var copyButton = document.getElementById("copy");
  var selectOptions = document.getElementById("options");
  //LISTENERS
  backdrop.addEventListener("click", toggleEditorHandler);
  playButton.addEventListener("click", playAnimationHandler);
  copyButton.addEventListener("click", copyAnimationHandler);
  selectOptions.addEventListener("change", selectChangeHandler);

  function toggleEditorHandler(open) {
    editor.classList.add("open");
  }

  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", toggleEditorHandler);
  }

  function changeAnimationType(cssText, innerText, id) {
    var textareaContent = innerText;
    textareaContent = textareaContent.replaceAll(";", ";\r\n");
    textarea.value = textareaContent;

    var optionIndex = 0;
    for (i = 0; i < selectOptions.length; i++) {
      console.log(id)
      console.log(selectOptions[i].value)
      if (id === selectOptions[i].value) {
        console.log("!!!!")
        optionIndex = i;
      }
    }

    selectOptions.selectedIndex = optionIndex;
   
    editorEl.style.cssText = cssText;
  }

  function toggleEditorHandler(ev) {
    if (editor.classList.contains("open")) {
      editor.classList.remove("open");
      textarea.value = "";
      editorEl.style.cssText = "";
    } else {
      editor.classList.add("open");
     
      var id = ev.target.closest('article').id;

      changeAnimationType(ev.target.style.cssText, ev.target.innerText, id);
    }
  }

  function playAnimationHandler(e) {
    e.preventDefault();
    editorEl.style.cssText = "";

    setTimeout(function () {
      editorEl.style.cssText = textarea.value;
    }, 100);
  }

  function copyAnimationHandler(e) {
    e.preventDefault();
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(textarea.value);


  }

  function selectChangeHandler(e) {
    var firstElOfType = document.querySelector(
      "#" + e.target.value + " .el:first-of-type"
    );

    var id = e.target.value;



    changeAnimationType(firstElOfType.style.cssText, firstElOfType.innerText, id);
  }
};
