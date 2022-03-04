import React, { useEffect, useState, useRef } from 'react';
import { Table, RightArrowAlt, Merge, Expand, Collapse, X, Pin, Import, Edit } from '@styled-icons/boxicons-regular';
import { downloadTrigger } from '../utils/methods';
import DropZone from '../DropZone';
import './style.css';

const App = () => {
  // Refs
  const refs = {
    tagSelector: useRef(null),
    additionSelector: useRef(null),
    editSheetA: useRef(null),
    editSheetB: useRef(null),
    editSheetC: useRef(null),
  }
  
  const [tags, setTags] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [additions, setAdditions] = useState([]);
  const [expandTable, setExpandTable] = useState('normal');
  const [expandResult, setExpandResult] = useState('normal');
  const [isStart, setStart] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [example, setExample] = useState(false);
  const [sheetA, setSheetA] = useState(null);
  const [sheetB, setSheetB] = useState(null);
  const [sheetC, setSheetC] = useState(null);

  useEffect(() => {
    // if (!sheetA || !sheetB) {
    //   handleLoadAllData();
    // }
  }, [tags, additions]);

  function getCsvContent(csvString) {
    const lineRegex = /\n(?=(?:(?:[^"]*"){2})*[^"]*$)/g;
    const cellRegex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/g;
    const lines = csvString.split(lineRegex);
    const cells = lines.map(line => {
      let cellData = line.split(cellRegex);
      cellData = cellData.filter(function (element) {
        return element !== undefined;
      });
      return cellData
    });
    return cells;
  }
  
  const handleClickStart = () => {
    setStart(true);
  }
  const handleLoadFiles = (files, sheetName) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = function () {
      const data = getCsvContent(reader.result);
      switch (sheetName) {
        case 'sheetA':
          setSheetA({ name: file.name, sheet: data });
          break;
        case 'sheetB':
          setSheetB({ name: file.name, sheet: data });
          break;
      
        default:
          break;
      }
    };
    reader.readAsText(file);
  }
  const handleExchangeSheet = () => {
    const newSheetA = JSON.parse(JSON.stringify(sheetB.sheet));
    const newSheetAName = sheetB.name;
    const newSheetB = JSON.parse(JSON.stringify(sheetA.sheet));
    const newSheetBName = sheetA.name;

    setSheetA({ name: newSheetAName, sheet: newSheetA });
    setSheetB({ name: newSheetBName, sheet: newSheetB });
  }
  // const handleLoadAllData = () => {
  //   Axios.get('/config/test.csv')
  //   .then(result => {
  //     const Asheet = getCsvContent(result.data);
  //     setSheetA({name: 'test.csv', sheet: Asheet});
  //     Axios.get('/config/test2.csv')
  //     .then(result => {
  //       const Bsheet = getCsvContent(result.data);
  //       setSheetB({name: 'test2.csv', sheet: Bsheet});
  //     });
  //   });
  // }
  const handleClickSelectTag = (item) => {
    const newTags = tags.slice();
    if (newTags.indexOf(item) === -1) {
      newTags.push(item);
    }
    else {
      const index = newTags.findIndex(filter => filter === item);
      newTags.splice(index, 1);
    }
    setTags(newTags);
  }
  const handleClickSelectAddition = (item) => {
    const Additions = additions.slice();
    if (Additions.indexOf(item) === -1) {
      Additions.push(item);
    }
    else {
      const index = Additions.findIndex(filter => filter === item);
      Additions.splice(index, 1);
    }
    setAdditions(Additions);
  }
  const handleSubmitOptions = () => {
    function matchChecker(array, matchers) {
      const result = matchers.map(matcher => {
        return array.indexOf(matcher) !== -1;
      });
      return result.includes(true);
    }
    
    const result = JSON.parse(JSON.stringify(sheetA.sheet));
    const conflictLines = [];
    
    const maximumColumn = result[0].length + additions.length;
    const minimumColumn = result[0].length;

    additions.forEach(index => {
      result[0].push(sheetB.sheet[0][index]);
    });

    sheetB.sheet.forEach(lineB => {
      const matchers = tags.map(tagIndex => lineB[tagIndex]);
      result.forEach((resultLine, resultLineIndex) => {
        if (resultLineIndex !== 0) {
          const isMatch = matchChecker(resultLine, matchers);
          if (isMatch) {
            additions.forEach((additionIndex, index) => {
              if (resultLine.length < maximumColumn) {
                resultLine.push(lineB[additionIndex]);
              }
              else {
                conflictLines.indexOf(resultLineIndex) === -1 && conflictLines.push(resultLineIndex);
                resultLine[minimumColumn + index] += ` ／ ${lineB[additionIndex]}`;
              }
            });
          }
        }
      })
    });

    result.forEach(resultLine => {
      if (resultLine.length < maximumColumn) {
        for (let i = 0; i < maximumColumn; i++) {
          resultLine[i] = resultLine[i] === undefined ? '' : resultLine[i];
        }
      }
    })

    setSheetC(result);
    setConflicts(conflictLines);
    setShowResult(true);
  }
  const handleClickToggleElement = (e, element) => {
    const self = e.currentTarget;
    const target = refs[element].current;
    target.classList.contains('-active') ? target.classList.remove('-active') : target.classList.add('-active');
    self.classList.contains('-active') ? self.classList.remove('-active') : self.classList.add('-active');
  }
  const handleClickClearResult = () => {
    setSheetC([]);
    setShowResult(false);
  }
  
  const handleClickDownloadCsv = (sheetName) => {
    switch (sheetName) {
      case 'sheetA': handleTriggerDownloadCsv(sheetA.name, sheetA.sheet);
        break;

      case 'sheetB': handleTriggerDownloadCsv(sheetB.name, sheetB.sheet);
        break;
        
      case 'sheetC': handleTriggerDownloadCsv(`merge-${sheetA.name}`, sheetC);
        break;
    
      default:
        break;
    }
  }

  const handleTriggerDownloadCsv = (name, sheet) => {
    let csv = '';
    sheet.forEach(sheetLine => {
      let line = '';
      sheetLine.forEach((sheetCell, cellIndex) => {
        if (cellIndex === 0) {
          console.log(sheetCell)
        }
        let cell = sheetCell.replace(/#/gi, '＃');
        cell = cellIndex === 0 ? cell : `,${cell}`;
        line += cell;
      })
      csv += line + '\n'
    });

    const fileName = `${name}`;
    const csvContent = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csv);


    downloadTrigger(fileName, csvContent);
  }

  function handleUseExampleSheet() {
    const sheetAExample = getCsvContent(`title, value_1, value_2, value_3,
    apple, 10, 12, 15,
    banana, 8, 9, 2,
    cat, 100, 8, 6,`);
    const sheetBExample = getCsvContent(`title, name, value_2, value_3,
    apple, 蘋果, 12, 15,
    banana, 香蕉, 9, 2,
    cat, 貓, 8, 6,`);
    setSheetA({ name: 'example1', sheet: sheetAExample });
    setSheetB({ name: 'example2', sheet: sheetBExample });
    setExample(true);
  }

  return (
    <div className="csv-matcher">
      <div className={`upload-wrapper ${isStart ? '-active' : ''}`}>
        <button onClick={handleUseExampleSheet} className="example">Example Sheet</button>
        <div className={`drop-zone ${(sheetA && sheetB) ? '-active' : ''}`}>
          <DropZone titleName="基礎表格" className={`file ${example ? '-blur' : ''}`} getFileInfo={file => handleLoadFiles(file, 'sheetA')}>【基礎表格】用來被比對表格內的資料，也可以幫表格內擴充更多內容。</DropZone>
          <DropZone titleName="對照表格" className={`file ${example ? '-blur' : ''}`} getFileInfo={file => handleLoadFiles(file, 'sheetB')}>【對照表格】用來比對基礎表格內的資料，也可以用對照表格的欄位擴充到基礎表格。</DropZone>
          <button className={`start ${(sheetA && sheetB) ? '-active' : ''}`}
          onClick={handleClickStart}>
            <Table size={18} /> 
            <span>開始製作表格</span>
          </button>
        </div>
      </div>
      <div className={`application ${showResult ? '-result' : ''} -${expandResult}`} >
        <div className="options-bar">
          <div className="controller-wrapper">
            <div className="tag-selector controller">
              <div className="dropdown">
                <div className="head" onClick={ (e) => handleClickToggleElement(e, 'tagSelector') }>
                  <Pin />
                  <span>核對欄位</span>
                </div>
                <div className="items" ref={refs.tagSelector}>
                  { sheetB &&
                    sheetB.sheet[0].map((cell, cellIndex) =>
                      <button key={cellIndex} className={ tags.indexOf(cellIndex) !== -1 ? '-tag' : ''}
                      onClick={() => handleClickSelectTag(cellIndex)}>{cell}</button> )}
                </div>
              </div>
              <div className="selected">
                { tags &&
                  tags.map((tag, tagIndex) =>
                  <button key={tagIndex}
                      onClick={() => handleClickSelectTag(tag)}><X size={14} />{sheetB.sheet[0][tag]}</button>) }
              </div>
            </div>
            <div className="addition-selector controller">
              <div className="dropdown">
                <div className="head" onClick={ (e) => handleClickToggleElement(e, 'additionSelector') }>
                  <Import />
                  <span>添加欄位</span>
                </div>
                <div className="items" ref={refs.additionSelector}>
                  { sheetB &&
                    sheetB.sheet[0].map((cell, cellIndex) =>
                      <button key={cellIndex} className={ additions.indexOf(cellIndex) !== -1 ? '-tag' : ''}
                      onClick={() => handleClickSelectAddition(cellIndex)}>{cell}</button> )}
                </div>
              </div>
              <div className="selected">
                { additions &&
                  additions.map((addition, additionIndex) =>
                  <button key={additionIndex}
                      onClick={() => handleClickSelectAddition(addition)}><X />{sheetB.sheet[0][addition]}</button>) }
              </div>
            </div>
          </div>
          <button className="options-submit"
          onClick={() => handleSubmitOptions()}>
            <Edit size={18} />
            <span>製作表格</span>
          </button>
        </div>
        <div className={`table-wrapper -${expandTable} `}>
          <div className="item left">
            <div className="table-head">
              <div className="name">
                <Table />
                <span>基礎表格 { sheetA && sheetA.name }</span>
              </div>
              <div className="dropdown">
                <button onClick={(e) => handleClickToggleElement(e, 'editSheetA')}>編輯</button>
                <div className="items" ref={refs.editSheetA}>
                  <button className="file-selector">
                    <label htmlFor="sheet-a-upload">重新選擇表格</label>
                    <input onChange={(e) => {
                      handleLoadFiles(e.target.files, 'sheetA')
                      handleClickToggleElement(e, 'editSheetA')
                    }} id="sheet-a-upload" className="button" type="file" />
                  </button>
                  <button onClick={handleExchangeSheet}>表格互換</button>
                  <button onClick={(e) => {
                    handleClickDownloadCsv('sheetA')
                    handleClickToggleElement(e, 'editSheetA')
                  }}>下載此表格</button>
                </div>
              </div>
            </div>
            <div className="table">
              <table>
                <tbody>
                  {
                    sheetA && sheetA.sheet.map((line, lineIndex) => 
                      <tr key={`l${lineIndex}`}>
                        { line.map((cell, cellIndex) => <td key={`c${cellIndex}`}>{ cell }</td>) }
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
            { expandTable === 'normal' && <button className="expand-button" onClick={() => setExpandTable('left')}><Expand /></button> }
            { expandTable !== 'normal' && <button className="expand-button -reverse" onClick={() => setExpandTable('normal')}><Collapse /></button> }
          </div>
          <div className="item right">
            <div className="table-head">
              <div className="name">
                <RightArrowAlt />
                <span>對照表格 { sheetB && sheetB.name }</span>
              </div>
              <div className="dropdown">
                <button onClick={(e) => handleClickToggleElement(e, 'editSheetB')}>編輯</button>
                <div className="items" ref={refs.editSheetB}>
                  <button className="file-selector">
                    <label htmlFor="sheet-b-upload">重新選擇表格</label>
                    <input onChange={(e) => {
                      handleLoadFiles(e.target.files, 'sheetB')
                      handleClickToggleElement(e, 'editSheetB')
                    }} id="sheet-b-upload" className="button" type="file" />
                  </button>
                  <button onClick={handleExchangeSheet}>表格互換</button>
                  <button onClick={(e) => {
                    handleClickDownloadCsv('sheetB')
                    handleClickToggleElement(e, 'editSheetB')
                  }}>下載此表格</button>
                </div>
              </div>
            </div>
            <div className="table">
              <table>
                <tbody>
                  {
                    sheetB && sheetB.sheet.map((line, lineIndex) => 
                      <tr key={`l${lineIndex}`}>
                        {
                          line.map((cell, cellIndex) => {
                            return (
                              <td key={`c${cellIndex}`}
                              className={`${tags.indexOf(cellIndex) !== -1 ? '-tag' : ''} ${additions.indexOf(cellIndex) !== -1 ? '-addition' : ''}`}
                              >{ cell }</td>
                            )
                          })
                        }
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
            {expandTable === 'normal' && <button className="expand-button" onClick={() => setExpandTable('right')}><Expand /></button>}
            {expandTable !== 'normal' && <button className="expand-button -reverse" onClick={() => setExpandTable('normal')}><Collapse /></button>}
          </div>
        </div>
        <div className="result-wrapper">
          <div className="table-head">
            <div className="name">
              <Merge />
              <span>合併後表格</span>
            </div>
            <div className="dropdown">
              <button onClick={(e) => handleClickToggleElement(e, 'editSheetC')}>編輯</button>
              <div className="items" ref={refs.editSheetC}>
                <button onClick={(e) => {
                  handleClickDownloadCsv('sheetC')
                  handleClickToggleElement(e, 'editSheetC')
                }}>下載此表格</button>
              </div>
            </div>
            <button className="close" onClick={handleClickClearResult} ><X /></button>
          </div>
          <div className="table">
            <table>
              <tbody>
                {
                  sheetC && sheetC.map((line, lineIndex) =>
                    <tr key={`l${lineIndex}`}
                      className={conflicts.indexOf(lineIndex) !== -1 ? '-conflict' : ''}> 
                      {line.map((cell, cellIndex) => 
                        <td key={`c${cellIndex}`} className={cellIndex+1 > sheetA.sheet[0].length ? '-increase' : ''}>{cell}</td>
                      )}
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
          {expandResult === 'fill' && <button className="expand-button" onClick={() => setExpandResult('normal')}><Collapse size={24} /></button>}
          {expandResult !== 'fill' && <button className="expand-button -reverse" onClick={() => setExpandResult('fill')}><Expand size={24} /></button>}
        </div>
        {/* <input type="file" id="input" onChange={handleFiles}></input> */}
      </div>
    </div>
  );
}

export default App;
