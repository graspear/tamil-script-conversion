import React, { useState, useEffect } from 'react';
import './VatteluttuConverter.css';

const VatteluttuConverter = ({ onConverted }) => {
  const consonantsT = ['ஜ', 'ஷ', 'ஸ', 'ஹ', 'ஶ'];
  const consonantsB = ['ജ', 'ഷ', 'സ', 'ഹ', 'ശ'];
  const vowelSignsT = ['ா', 'ி', 'ீ', 'ு', 'ூ', 'ெ', 'ே', 'ை', 'ொ', 'ோ', 'ௌ', '்', ''];
  const vowelSignsB = ['ാ', 'ി', 'ീ', 'ു', 'ൂ', 'െ', 'േ', 'ൈ', 'ൊ', 'ോ', 'ൌ', '്', ''];

  const [inputText, setInputText] = useState('');
  const [convertedText, setConvertedText] = useState('');
  const [conversionDirection, setConversionDirection] = useState('VatteluttuToTamil');

  const convert = (text) => {
    let convertedText = text;
    const map = {};

    if (conversionDirection === 'TamilToVatteluttu') {
      convertedText = convertedText.replace(/ஶ்ரீ/g, 'ശ്രീ');
      convertedText = convertedText.replace(/ஸ்ரீ/g, 'ശ്രീ');
      for (let i = 0; i < consonantsT.length; i++) {
        map[consonantsT[i]] = consonantsB[i];
        for (let j = 0; j < vowelSignsT.length; j++) {
          const key = consonantsT[i] + vowelSignsT[j];
          const value = consonantsB[i] + vowelSignsB[j];
          map[key] = value;
        }
      }
    } else {
      convertedText = convertedText.replace(/ശ്രീ/g, 'ஶ்ரீ');
      for (let i = 0; i < consonantsB.length; i++) {
        map[consonantsB[i]] = consonantsT[i];
        for (let j = 0; j < vowelSignsB.length; j++) {
          const key = consonantsB[i] + vowelSignsB[j];
          const value = consonantsT[i] + vowelSignsT[j];
          map[key] = value;
        }
      }
    }

    // Create a regex pattern to match longer sequences first
    const sortedKeys = Object.keys(map).sort((a, b) => b.length - a.length);
    const regex = new RegExp(sortedKeys.join('|'), 'g');
    convertedText = convertedText.replace(regex, match => map[match]);

    setConvertedText(convertedText);
    if (onConverted) {
      onConverted(convertedText);
    }
  };

  useEffect(() => {
    convert(inputText);
  }, [inputText, conversionDirection]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleDirectionChange = (event) => {
    setConversionDirection(event.target.value);
  };

  return (
    <div>
      <select value={conversionDirection} onChange={handleDirectionChange} className="conversion-direction">
        <option value="VatteluttuToTamil">Vatteluttu to Tamil</option>
        <option value="TamilToVatteluttu">Tamil to Vatteluttu</option>
      </select>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text here"
        className="input-text"
        style={{ fontFamily: conversionDirection === "VatteluttuToTamil" ? 'e-Velvi' : 'Tamil' }}
        rows="10"
        cols="50"
      />
      {conversionDirection === "VatteluttuToTamil" ?
        <div
          className="vatteluttu-cont"
          style={{ fontFamily: 'Tamil' }}
        >
          {convertedText}
        </div>
        :
        <div
          className="vatteluttu-cont"
          style={{ fontFamily: 'e-Velvi' }}
        >
          {convertedText}
        </div>}
    </div>
  );
};

export default VatteluttuConverter;
