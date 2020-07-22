'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var debounce = _interopDefault(require('lodash.debounce'));

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

var getGridContainerStyle = function (columns, cellWidth, gridGap) {
    return {
        display: 'grid',
        gridTemplateColumns: "repeat(" + columns + ", minmax(" + cellWidth + "px, 1fr)",
        gridGap: gridGap + "px",
        marginLeft: 'auto',
        marginRight: 'auto',
        overflowY: 'auto',
        border: '1px solid black',
        width: '100%',
    };
};
var getCellStyle = function (height) {
    return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        boxSizing: 'border-box',
    };
};

var DummyRow = function (_a) {
    var columns = _a.columns, rows = _a.rows, rowHeight = _a.rowHeight, gapSize = _a.gapSize;
    return (React__default.createElement(React__default.Fragment, null, __spreadArrays(Array(columns)).map(function (_, index) { return (React__default.createElement("div", { key: index, style: { height: rows * (rowHeight + gapSize) } })); })));
};

var Cell = function (props) {
    return React__default.createElement("div", { style: getCellStyle(props.height) }, props.children);
};

var VirtualizedGrid = function (props) {
    var _a, _b, _c;
    var gridRef = React.useRef(null);
    var previousScroll = React.useRef({ value: 0 });
    var prevScrollPercent = React.useRef({ value: 0 });
    var _d = React.useState({ rows: 0, columns: 0 }), config = _d[0], setConfig = _d[1];
    var _e = React.useState({ from: 0, to: 30 }), fromTo = _e[0], setFromTo = _e[1];
    var debounceDelay = (_a = props.debounceDelay) !== null && _a !== void 0 ? _a : 300;
    var prerenderRows = (_b = props.prerenderRows) !== null && _b !== void 0 ? _b : 3;
    var gridGap = (_c = props.gridGap) !== null && _c !== void 0 ? _c : 0;
    React.useLayoutEffect(function () {
        if (gridRef.current && previousScroll.current.value !== gridRef.current.scrollTop) {
            gridRef.current.scrollTop = previousScroll.current.value;
        }
    }, [previousScroll.current.value]);
    React.useEffect(function () {
        if (gridRef.current) {
            var columns = Math.floor(gridRef.current.clientWidth / (props.cellWidth + gridGap));
            var rows = Math.ceil(props.itemCount / columns);
            setConfig({ columns: columns, rows: rows });
        }
    }, [gridGap, props.cellWidth, props.itemCount]);
    React.useEffect(function () {
        var ref = gridRef.current;
        var resizeCallback = debounce(function () {
            var ref = gridRef.current;
            if (ref) {
                var columns = Math.floor(ref.clientWidth / (props.cellWidth + gridGap));
                var rows = Math.ceil(props.itemCount / columns);
                prevScrollPercent.current.value = ref.scrollTop / ref.scrollHeight;
                setConfig({ columns: columns, rows: rows });
            }
        }, 0);
        var resizeObserver = new ResizeObserver(resizeCallback);
        ref && resizeObserver.observe(ref);
        return function () {
            ref && resizeObserver.unobserve(ref);
        };
    }, [gridGap, props.cellWidth, props.debounceDelay, props.itemCount]);
    React.useLayoutEffect(function () {
        gridRef.current && (gridRef.current.scrollTop = gridRef.current.scrollHeight * prevScrollPercent.current.value);
    }, [config]);
    var db = debounce(function (params) {
        var maxVisibleRows = Math.ceil(params.clientHeight / (props.rowHeight + gridGap));
        var from = Math.max(0, Math.floor(params.scrollTop / (props.rowHeight + gridGap)) - maxVisibleRows * prerenderRows);
        var to = Math.min(config.rows, from + maxVisibleRows * (prerenderRows * 2 + 1));
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
                return index < props.itemCount ? (React__default.createElement(Cell, { index: cellIndex, key: cellIndex, height: props.rowHeight }, props.children(index, rowIndex + fromTo.from, cellIndex))) : null;
            });
        });
    };
    var renderDummyRow = function (rowCount, condition) {
        if (condition === void 0) { condition = true; }
        if (condition) {
            return React__default.createElement(DummyRow, { columns: config.columns, rows: rowCount, rowHeight: props.rowHeight, gapSize: gridGap });
        }
        return null;
    };
    return (React__default.createElement("div", { className: props.className, ref: gridRef, style: getGridContainerStyle(config.columns, props.cellWidth, gridGap), onScroll: handleScroll },
        renderDummyRow(fromTo.from, fromTo.from > 0),
        renderCells(),
        renderDummyRow(config.rows - fromTo.to, fromTo.to < config.rows)));
};

exports.VirtualizedGrid = VirtualizedGrid;
//# sourceMappingURL=index.js.map
