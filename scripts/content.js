// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function fontToVScale(fontGrade) {
  fontGrade = fontGrade.toLocaleUpperCase();
  const conversionTable = {
    4: 'V0',
    5: 'V1',
    '5+': 'V2',
    '6A': 'V3',
    '6A+': 'V3+',
    '6B': 'V4',
    '6B+': 'V4+',
    '6C': 'V5',
    '6C+': 'V5+',
    '7A': 'V6',
    '7A+': 'V7',
    '7B': 'V8',
    '7B+': 'V8+/V9',
    '7C': 'V9',
    '7C+': 'V10',
    '8A': 'V11',
    '8A+': 'V12',
    '8B': 'V13',
    '8B+': 'V14',
    '8C': 'V15',
    '8C+': 'V16',
    '9A': 'V17',
  };

  // Normalize the input to match the keys in the conversion table
  return conversionTable[fontGrade] || 'Unknown grade';
}

function replaceFontGrades() {
  const shortPatterns = /5\+|6[abc](?!\+)|7[abc](?!\+)|8[abc](?!\+)|9a/gi;
  const longPatterns = /6[abc]\+|7[abc]\+|8[abc]\+/gi;

  const textNodes = [];

  function findTextNodes(node) {
    if (node.nodeType === 3) {
      textNodes.push(node);
    } else {
      for (let i = 0; i < node.childNodes.length; i++) {
        findTextNodes(node.childNodes[i]);
      }
    }
  }

  findTextNodes(document.body);

  textNodes.forEach((node) => {
    let text = node.textContent;

    text = text.replace(longPatterns, (match) => {
      const vScaleEquivalent = fontToVScale(match);
      return vScaleEquivalent ? `${match} (${vScaleEquivalent})` : match;
    });

    text = text.replace(shortPatterns, (match) => {
      const vScaleEquivalent = fontToVScale(match);
      return vScaleEquivalent ? `${match} (${vScaleEquivalent})` : match;
    });

    node.textContent = text;
  });
}

// Run the conversion function when the script loads
replaceFontGrades();
