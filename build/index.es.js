import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var debounce = function (callback, wait) {
    var timeout;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var functionCall = function () { return callback.apply(_this, args); };
        clearTimeout(timeout);
        timeout = setTimeout(functionCall, wait);
    };
};
var createCustomStyleProperties = function (properties) {
    var obj = {};
    properties.forEach(function (property) {
        obj["--" + property[0]] = property[1];
    });
    return obj;
};

var DummyRow = function (_a) {
    var columns = _a.columns, rows = _a.rows, rowHeight = _a.rowHeight, gapSize = _a.gapSize;
    return (React.createElement(React.Fragment, null, __spreadArrays(Array(columns)).map(function (_, index) { return (React.createElement("div", { key: index, style: { height: rows * (rowHeight + gapSize) } })); })));
};

var e=[],t=[];function injector_256af7c9(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

const css = ".container {\r\n\t--grid-gap: 5px;\r\n\t--grid-height: 100vh;\r\n\t--grid-columns: '2';\r\n\tdisplay: grid;\r\n\tgrid-template-columns: var(--grid-columns);\r\n\tgrid-gap: var(--grid-gap);\r\n\toverflow-y: auto;\r\n\twidth: 100%;\r\n\tmax-height: 100vh;\r\n\theight: var(--grid-height);\r\n}\r\n\r\n.cell {\r\n\t--cell-height: 40px;\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n\talign-items: center;\r\n\tbox-sizing: border-box;\r\n\theight: var(--cell-height);\r\n}\r\n";
injector_256af7c9(css,{});

var Cell = function (props) {
    var style = createCustomStyleProperties([['cell-height', props.height + "px"]]);
    return (React.createElement("div", { className: 'cell', style: style }, props.children));
};

var VirtualizedGrid = function (props) {
    var _a, _b, _c, _d;
    var gridRef = useRef(null);
    var previousScroll = useRef({ value: 0 });
    var _e = useState({ rows: 0, columns: 0 }), config = _e[0], setConfig = _e[1];
    var _f = useState({ from: 0, to: 30 }), fromTo = _f[0], setFromTo = _f[1];
    var debounceDelay = (_a = props.debounceDelay) !== null && _a !== void 0 ? _a : 300;
    var prerenderScreens = (_b = props.prerenderScreens) !== null && _b !== void 0 ? _b : 3;
    var gridGap = (_c = props.gridGap) !== null && _c !== void 0 ? _c : 0;
    var getGridHeight = function () {
        if (!props.gridHeight) {
            return '100vh';
        }
        if (typeof props.gridHeight === 'string') {
            return props.gridHeight;
        }
        else {
            return props.gridHeight + "px";
        }
    };
    useLayoutEffect(function () {
        if (gridRef.current && previousScroll.current.value !== gridRef.current.scrollTop) {
            gridRef.current.scrollTop = previousScroll.current.value;
        }
    }, [previousScroll.current.value]);
    useEffect(function () {
        if (gridRef.current) {
            var columns = Math.floor(gridRef.current.clientWidth / (props.cellWidth + gridGap));
            var rows = Math.ceil(props.itemCount / columns);
            setConfig({ columns: columns, rows: rows });
        }
    }, [gridGap, props.cellWidth, props.itemCount]);
    useEffect(function () {
        var ref = gridRef.current;
        var resizeCallback = debounce(function () {
            var ref = gridRef.current;
            if (ref) {
                var columns = Math.floor(ref.clientWidth / (props.cellWidth + gridGap));
                var rows = Math.ceil(props.itemCount / columns);
                setConfig({ columns: columns, rows: rows });
            }
        }, 0);
        var resizeObserver = new ResizeObserver(resizeCallback);
        ref && resizeObserver.observe(ref);
        return function () {
            ref && resizeObserver.unobserve(ref);
        };
    }, [gridGap, props.cellWidth, props.debounceDelay, props.itemCount]);
    var db = debounce(function (params) {
        var maxVisibleRows = Math.ceil(params.clientHeight / (props.rowHeight + gridGap));
        var from = Math.max(0, Math.floor(params.scrollTop / (props.rowHeight + gridGap)) - maxVisibleRows * prerenderScreens);
        var to = Math.min(config.rows, from + maxVisibleRows * (prerenderScreens * 2 + 1));
        if (from > to) {
            setFromTo({ from: config.rows - (fromTo.to - fromTo.from), to: config.rows });
        }
        else {
            setFromTo({ from: from, to: to });
        }
    }, debounceDelay);
    var handleScroll = function (event) {
        db(event.currentTarget);
        if (gridRef.current) {
            previousScroll.current.value = gridRef.current.scrollTop;
        }
    };
    var renderCells = function () {
        return __spreadArrays(Array(fromTo.to - fromTo.from)).map(function (_, rowIndex) {
            return __spreadArrays(Array(config.columns)).map(function (_, cellIndex) {
                var index = (rowIndex + fromTo.from) * config.columns + cellIndex;
                return index < props.itemCount ? (React.createElement(Cell, { key: cellIndex, height: props.rowHeight }, props.children(index, rowIndex + fromTo.from, cellIndex))) : null;
            });
        });
    };
    var renderDummyRow = function (rowCount, condition) {
        if (condition === void 0) { condition = true; }
        if (condition) {
            return React.createElement(DummyRow, { columns: config.columns, rows: rowCount, rowHeight: props.rowHeight, gapSize: gridGap });
        }
        return null;
    };
    var style = createCustomStyleProperties([
        ['grid-gap', props.gridGap + "px"],
        ['grid-height', getGridHeight()],
        ['grid-columns', "repeat(" + config.columns + ", minmax(" + props.cellWidth + "px, 1fr))"],
    ]);
    return (React.createElement("div", { className: "container " + ((_d = props.className) !== null && _d !== void 0 ? _d : ''), ref: gridRef, style: style, onScroll: handleScroll },
        renderDummyRow(fromTo.from, fromTo.from > 0),
        renderCells(),
        renderDummyRow(config.rows - fromTo.to, fromTo.to < config.rows)));
};

export { VirtualizedGrid };
//# sourceMappingURL=index.es.js.map
