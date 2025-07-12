let data = document.querySelector('#data').innerText;
let arr = data.split('$$$');
let map = [];

arr.forEach(item => {
    let _arr = item.split('%%');
    map.push({
        title: _arr[0].trim(),              // 标题
        permalink: _arr[1],					// 链接
        date: _arr[2],						// 日期
        summary: _arr[3],					// 摘要
        content: item.trim().toLowerCase()	// 信息串，包含页面所有信息
    })
})

function scanStr(content, str) {        // content 页面内容信息串
  let index = content.indexOf(str);   // str     出现的位置
  let num = 0;                        // str     出现的次数
  let arrIndex = [];                  // str     出现的位置集合

  while(index !== -1) {
      arrIndex.push(index);
      num += 1;
      index = content.indexOf(str, index + 1); // 从 str 出现的位置下一位置继续
  }

  return arrIndex;
}

let scInput = document.querySelector('#sc-input');
let scRes = document.querySelector('#sc-res')
let scVal = '';

scInput.focus(); // 自动聚集搜索框

function search() {
    let post = '';
    scVal = scInput.value.trim().toLowerCase();

    map.forEach(item => {
        if (!scVal) return;
        if (item.content.indexOf(scVal) > -1) {
            let _arrIndex = scanStr(item.content, scVal);
            let strRes = '';
            let _radius = 100;  // 搜索字符前后截取的长度
            let _strStyle0 = '<span style="background: yellow;">'
            let _strStyle1 = '</span>'
            let _strSeparator = '<hr>'


            // 统计与首个与其前邻的索引（不妨称为基准索引）差值小于截取半径的索引位小于截取半径的索引的个数
            // 如果差值小于半径，则表示当前索引内容已包括在概要范围内，则不重复截取，且
            // 下次比较的索引应继续与基准索引比较，直到大于截取半径， _count重新置 为 0；
            let _count = 0;

            for (let i = 0, len = _arrIndex.length; i < len; i++) {
                let _idxItem = _arrIndex[i];
                let _relidx = i;


                // 如果相邻搜索词出现的距离小于截取半径，那么忽略后一个出现位置的内容截取（因为已经包含在内了）
                if (_relidx > 0 && (_arrIndex[_relidx] - _arrIndex[_relidx - 1 - _count] < _radius)) {
                    _count += 1;
                    continue;
                }
                _count = 0;

                // 概要显示
                // _startIdx, _endIdx 会在超限时自动归限（默认，无需处理）
                strRes += _strSeparator;
                let _startIdx = _idxItem - _radius + (_relidx + 1) * _strSeparator.length;
                let _endIdx = _idxItem + _radius + (_relidx + 1) * _strSeparator.length;
                strRes +=  item.content.substring(_startIdx, _endIdx);
            }

            // 进一步对搜索摘要进行处理，高亮搜索词
            let _arrStrRes = scanStr(strRes, scVal);
            // console.log(_arrStrRes)
            for (let i = 0, len = _arrStrRes.length; i < len; i++) {
                let _idxItem = _arrStrRes[i];
                let _realidx = i;

                strRes =
                    strRes.slice(0, (_idxItem + _realidx * (_strStyle0.length + _strStyle1.length))) +          // 当前索引位置之前的部分
                    _strStyle0 + scVal + _strStyle1 +
                    strRes.slice(_idxItem + scVal.length + _realidx * (_strStyle0.length + _strStyle1.length)); // 之后的部分
            }

            post += `
                <div class="item" align="left" >
                    <a href="${item.permalink}">
                        <div align="left">
                            <span>📄</span>
                            <span class="date">${item.date}</span>
                            <span>${item.title}</span>
                        </div>
                    </a>
                    <div>${strRes}</div>
                </div>
            `
        }
    })

    let res = `<div class="list">${post}</div>`;
    scRes.innerHTML = res;
  }