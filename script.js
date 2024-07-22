document.addEventListener('DOMContentLoaded', () => {
    const fontFamilySelect = document.getElementById('font-family');
    const fontWeightSelect = document.getElementById('font-weight');
    const italicToggle = document.getElementById('italic-toggle');
    const editor = document.getElementById('editor');
    const resetButton = document.getElementById('reset-button');
    const saveButton = document.getElementById('save-button');

 
    const fontsData = {
        "Arial": ["100", "200", "300", "400", "500", "600", "700", "800", "900", "400italic", "700italic"],
        "Times New Roman": ["100", "200", "300", "400", "500", "600", "700", "800", "900", "400italic", "700italic"],
        "Georgia": ["100", "200", "300", "400", "500", "600", "700", "800", "900", "400italic", "700italic"],
        "Verdana": ["100", "200", "300", "400", "500", "600", "700", "800", "900", "400italic", "700italic"],
        "Courier New": ["100", "200", "300", "400", "500", "600", "700", "800", "900", "400italic", "700italic"],
        "Tahoma": ["100", "200", "300", "400", "500", "600", "700", "800", "900", "400italic", "700italic"],
        "Trebuchet MS": ["100", "200", "300", "400", "500", "600", "700", "800", "900", "400italic", "700italic"],
        "Comic Sans MS": ["100", "200", "300", "400", "500", "600", "700", "800", "900", "400italic", "700italic"],
        "Lucida Sans Unicode": ["100", "200", "300", "400", "500", "600", "700", "800", "900", "400italic", "700italic"]
    };


    
    function populateFontFamilies() {
        fontFamilySelect.innerHTML = '';
        for (let font in fontsData) {
            let option = document.createElement('option');
            option.value = font;
            option.textContent = font;
            fontFamilySelect.appendChild(option);
        }
        fontFamilySelect.addEventListener('change', onFontFamilyChange);
        onFontFamilyChange(); 
    }

   
    function populateFontWeights(variants) {
        fontWeightSelect.innerHTML = '';
        const weights = Array.from(new Set(variants.map(v => parseInt(v.match(/\d+/)))));
        weights.forEach(weight => {
            let option = document.createElement('option');
            option.value = weight;
            option.textContent = weight;
            fontWeightSelect.appendChild(option);
        });
        fontWeightSelect.addEventListener('change', onFontWeightChange);
        onFontWeightChange(); 
    }


    function onFontFamilyChange() {
        const selectedFont = fontFamilySelect.value;
        const variants = fontsData[selectedFont];
        populateFontWeights(variants);
    }

  
    function onFontWeightChange() {
        const selectedFont = fontFamilySelect.value;
        const selectedWeight = fontWeightSelect.value;
        const variants = fontsData[selectedFont];

       
        const italicVariants = variants.some(v => v === `${selectedWeight}italic`);
        italicToggle.disabled = !italicVariants;
        italicToggle.checked = editor.style.fontStyle === 'italic';

        applyFont();
    }

  
    function applyFont() {
        const selectedFont = fontFamilySelect.value;
        const selectedWeight = fontWeightSelect.value;
        const isItalic = italicToggle.checked ? 'italic' : 'normal';

        editor.style.fontFamily = selectedFont;
        editor.style.fontWeight = selectedWeight;
        editor.style.fontStyle = isItalic;

        autoSave();
    }

    
    function autoSave() {
        const data = {
            text: editor.value,
            fontFamily: fontFamilySelect.value,
            fontWeight: fontWeightSelect.value,
            isItalic: italicToggle.checked
        };
        localStorage.setItem('editorData', JSON.stringify(data));
    }

   
    function loadSavedData() {
        const savedData = JSON.parse(localStorage.getItem('editorData'));
        if (savedData) {
            editor.value = savedData.text;
            fontFamilySelect.value = savedData.fontFamily;
            fontWeightSelect.value = savedData.fontWeight;
            italicToggle.checked = savedData.isItalic;
            onFontFamilyChange(); 
        }
    }

  
    resetButton.addEventListener('click', () => {
        editor.value = '';
        fontFamilySelect.value = 'Arial';
        fontWeightSelect.value = '400';
        italicToggle.checked = false;
        applyFont();
        localStorage.removeItem('editorData');
    });

  
    saveButton.addEventListener('click', () => {
        autoSave();
        alert('Content saved!');
    }); 
    
    italicToggle.addEventListener('change', applyFont);

    
    populateFontFamilies();
    loadSavedData();
});