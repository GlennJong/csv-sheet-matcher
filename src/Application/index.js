import React, { useEffect, useState, useRef, useCallback } from 'react';
import Axios from 'axios';
import { useDropzone } from 'react-dropzone'
import './style.css';

function downloadTrigger(fileName, download) {
  const downloadTrigger = document.createElement('a');
  downloadTrigger.setAttribute('download', fileName);
  downloadTrigger.setAttribute('href', download);
  downloadTrigger.click();
  document.body.append(downloadTrigger)
  // downloadTrigger.remove();
}

function MyDropzone({titleName, className, getFileInfo, children}) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles[0].type === 'text/csv') {
      setError('');
      setFile(acceptedFiles[0]);
      getFileInfo(acceptedFiles);
    }
    else {
      setFile(null);
      setError('這個檔案不是 .csv 喔！');
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className={`${className} ${isDragActive ? '-active' : ''}`}>
      <input {...getInputProps()} multiple={false} accept=".csv" />
      <div className="icon">
        <i className="far fa-file-alt"></i>
      </div>
      {
        isDragActive ?
        <p className="msg">拖曳到這裡</p> :
        <p className="msg">點擊或拖曳到這裡</p>
      }
      {
        error !== '' &&
        <p className="error"><i className="fas fa-times"></i> {error}</p>
      }
      {
        file && <p className="name"><i className="fas fa-check-circle"></i> {titleName} {file.name}</p>
      }
      <p className="info">{children}</p>
    </div>
  )
}

function Application() {
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

  return (
    <div className="csv-matcher">
      <div className={`upload-wrapper ${isStart ? '-active' : ''}`}>
        <div className={`drop-zone ${(sheetA && sheetB) ? '-active' : ''}`}>
          <MyDropzone titleName="基礎表格" className="file" getFileInfo={file => handleLoadFiles(file, 'sheetA')}>【基礎表格】用來被比對表格內的資料，也可以幫表格內擴充更多內容。</MyDropzone>
          <MyDropzone titleName="對照表格" className="file" getFileInfo={file => handleLoadFiles(file, 'sheetB')}>【對照表格】用來比對基礎表格內的資料，也可以用對照表格的欄位擴充到基礎表格。</MyDropzone>
          <button className={`start ${(sheetA && sheetB) ? '-active' : ''}`}
          onClick={handleClickStart}><i className="fas fa-table"></i> 開始製作表格</button>
        </div>
      </div>
      <div className={`application ${showResult ? '-result' : ''} -${expandResult}`} >
        <div className="options-bar">
          <div className="controller-wrapper">
            <div className="tag-selector controller">
              <div className="dropdown">
                <div className="head" onClick={ (e) => handleClickToggleElement(e, 'tagSelector') }>
                  <i className="fas fa-thumbtack"></i>
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
                      onClick={() => handleClickSelectTag(tag)}><i className="fa fa-times"></i>{sheetB.sheet[0][tag]}</button>) }
              </div>
            </div>
            <div className="addition-selector controller">
              <div className="dropdown">
                <div className="head" onClick={ (e) => handleClickToggleElement(e, 'additionSelector') }>
                  <i className="fas fa-file-import"></i>
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
                      onClick={() => handleClickSelectAddition(addition)}><i className="fa fa-times"></i>{sheetB.sheet[0][addition]}</button>) }
              </div>
            </div>
          </div>
          <button className="options-submit"
          onClick={() => handleSubmitOptions()}>
            <i className="fas fa-edit"></i>
            <span>製作表格</span>
          </button>
        </div>
        <div className={`table-wrapper -${expandTable} `}>
          <div className="item left">
            <div className="table-head">
              <div className="name">
                <i className="icon fas fa-table"></i>
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
            { expandTable === 'normal' && <button className="expand-button" onClick={() => setExpandTable('left')}><i className="fa fa-expand-alt"></i></button> }
            { expandTable !== 'normal' && <button className="expand-button -reverse" onClick={() => setExpandTable('normal')}><i className="fa fa-compress-alt"></i></button> }
          </div>
          <div className="item right">
            <div className="table-head">
              <div className="name">
                <i className="icon fas fa-angle-double-left"></i>
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
            {expandTable === 'normal' && <button className="expand-button" onClick={() => setExpandTable('right')}><i className="fa fa-expand-alt"></i></button>}
            {expandTable !== 'normal' && <button className="expand-button -reverse" onClick={() => setExpandTable('normal')}><i className="fa fa-compress-alt"></i></button>}
          </div>
        </div>
        <div className="result-wrapper">
          <div className="table-head">
            <div className="name">
              <i className="icon fas fa-columns"></i>
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
            <button className="close" onClick={handleClickClearResult} ><i className="fas fa-times"></i></button>
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
          {expandResult === 'fill' && <button className="expand-button" onClick={() => setExpandResult('normal')}><i className="fa fa-compress-alt"></i></button>}
          {expandResult !== 'fill' && <button className="expand-button -reverse" onClick={() => setExpandResult('fill')}><i className="fa fa-expand-alt"></i></button>}
        </div>
        {/* <input type="file" id="input" onChange={handleFiles}></input> */}
      </div>
    </div>
  );
}

export default Application;
