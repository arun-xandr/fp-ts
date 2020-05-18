"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduceRight = exports.reduce = exports.map = exports.foldMap = exports.flatten = exports.extend = exports.duplicate = exports.chainFirst = exports.chain = exports.apSecond = exports.apFirst = exports.ap = exports.tree = exports.fold = exports.elem = exports.unfoldForestM = exports.unfoldTreeM = exports.unfoldForest = exports.unfoldTree = exports.drawTree = exports.drawForest = exports.getEq = exports.getShow = exports.make = exports.URI = void 0;
var Array_1 = require("./Array");
var Eq_1 = require("./Eq");
var function_1 = require("./function");
var pipeable_1 = require("./pipeable");
/**
 * @since 2.0.0
 */
exports.URI = 'Tree';
/**
 * @since 2.0.0
 */
function make(value, forest) {
    if (forest === void 0) { forest = Array_1.empty; }
    return {
        value: value,
        forest: forest
    };
}
exports.make = make;
/**
 * @since 2.0.0
 */
function getShow(S) {
    var show = function (t) {
        return t.forest === Array_1.empty || t.forest.length === 0
            ? "make(" + S.show(t.value) + ")"
            : "make(" + S.show(t.value) + ", [" + t.forest.map(show).join(', ') + "])";
    };
    return {
        show: show
    };
}
exports.getShow = getShow;
/**
 * @since 2.0.0
 */
function getEq(E) {
    var SA;
    var R = Eq_1.fromEquals(function (x, y) { return E.equals(x.value, y.value) && SA.equals(x.forest, y.forest); });
    SA = Array_1.getEq(R);
    return R;
}
exports.getEq = getEq;
var draw = function (indentation, forest) {
    var r = '';
    var len = forest.length;
    var tree;
    for (var i = 0; i < len; i++) {
        tree = forest[i];
        var isLast = i === len - 1;
        r += indentation + (isLast ? '└' : '├') + '─ ' + tree.value;
        r += draw(indentation + (len > 1 && !isLast ? '│  ' : '   '), tree.forest);
    }
    return r;
};
/**
 * Neat 2-dimensional drawing of a forest
 *
 * @since 2.0.0
 */
function drawForest(forest) {
    return draw('\n', forest);
}
exports.drawForest = drawForest;
/**
 * Neat 2-dimensional drawing of a tree
 *
 * @example
 * import { make, drawTree, tree } from 'fp-ts/lib/Tree'
 *
 * const fa = make('a', [
 *   tree.of('b'),
 *   tree.of('c'),
 *   make('d', [tree.of('e'), tree.of('f')])
 * ])
 *
 * assert.strictEqual(drawTree(fa), `a
 * ├─ b
 * ├─ c
 * └─ d
 *    ├─ e
 *    └─ f`)
 *
 *
 * @since 2.0.0
 */
function drawTree(tree) {
    return tree.value + drawForest(tree.forest);
}
exports.drawTree = drawTree;
/**
 * Build a tree from a seed value
 *
 * @since 2.0.0
 */
function unfoldTree(b, f) {
    var _a = f(b), a = _a[0], bs = _a[1];
    return { value: a, forest: unfoldForest(bs, f) };
}
exports.unfoldTree = unfoldTree;
/**
 * Build a tree from a seed value
 *
 * @since 2.0.0
 */
function unfoldForest(bs, f) {
    return bs.map(function (b) { return unfoldTree(b, f); });
}
exports.unfoldForest = unfoldForest;
function unfoldTreeM(M) {
    var unfoldForestMM = unfoldForestM(M);
    return function (b, f) { return M.chain(f(b), function (_a) {
        var a = _a[0], bs = _a[1];
        return M.chain(unfoldForestMM(bs, f), function (ts) { return M.of({ value: a, forest: ts }); });
    }); };
}
exports.unfoldTreeM = unfoldTreeM;
function unfoldForestM(M) {
    var traverseM = Array_1.array.traverse(M);
    return function (bs, f) { return traverseM(bs, function (b) { return unfoldTreeM(M)(b, f); }); };
}
exports.unfoldForestM = unfoldForestM;
/**
 * @since 2.0.0
 */
function elem(E) {
    var go = function (a, fa) {
        if (E.equals(a, fa.value)) {
            return true;
        }
        return fa.forest.some(function (tree) { return go(a, tree); });
    };
    return go;
}
exports.elem = elem;
/**
 * Fold a tree into a "summary" value in depth-first order.
 *
 * For each node in the tree, apply `f` to the `value` and the result of applying `f` to each `forest`.
 *
 * This is also known as the catamorphism on trees.
 *
 * @example
 * import { fold, make } from 'fp-ts/lib/Tree'
 *
 * const t = make(1, [make(2), make(3)])
 *
 * const sum = (as: Array<number>) => as.reduce((a, acc) => a + acc, 0)
 *
 * // Sum the values in a tree:
 * assert.deepStrictEqual(fold((a: number, bs: Array<number>) => a + sum(bs))(t), 6)
 *
 * // Find the maximum value in the tree:
 * assert.deepStrictEqual(fold((a: number, bs: Array<number>) => bs.reduce((b, acc) => Math.max(b, acc), a))(t), 3)
 *
 * // Count the number of leaves in the tree:
 * assert.deepStrictEqual(fold((_: number, bs: Array<number>) => (bs.length === 0 ? 1 : sum(bs)))(t), 2)
 *
 * @since 2.6.0
 */
function fold(f) {
    var go = function (tree) { return f(tree.value, tree.forest.map(go)); };
    return go;
}
exports.fold = fold;
/**
 * @since 2.0.0
 */
exports.tree = {
    URI: exports.URI,
    map: function (fa, f) { return ({
        value: f(fa.value),
        forest: fa.forest.map(function (t) { return exports.tree.map(t, f); })
    }); },
    of: function (a) { return ({
        value: a,
        forest: Array_1.empty
    }); },
    ap: function (fab, fa) { return exports.tree.chain(fab, function (f) { return exports.tree.map(fa, f); }); },
    chain: function (fa, f) {
        var _a = f(fa.value), value = _a.value, forest = _a.forest;
        var concat = Array_1.getMonoid().concat;
        return {
            value: value,
            forest: concat(forest, fa.forest.map(function (t) { return exports.tree.chain(t, f); }))
        };
    },
    reduce: function (fa, b, f) {
        var r = f(b, fa.value);
        var len = fa.forest.length;
        for (var i = 0; i < len; i++) {
            r = exports.tree.reduce(fa.forest[i], r, f);
        }
        return r;
    },
    foldMap: function (M) { return function (fa, f) { return exports.tree.reduce(fa, M.empty, function (acc, a) { return M.concat(acc, f(a)); }); }; },
    reduceRight: function (fa, b, f) {
        var r = b;
        var len = fa.forest.length;
        for (var i = len - 1; i >= 0; i--) {
            r = exports.tree.reduceRight(fa.forest[i], r, f);
        }
        return f(fa.value, r);
    },
    traverse: function (F) {
        var traverseF = Array_1.array.traverse(F);
        var r = function (ta, f) {
            return F.ap(F.map(f(ta.value), function (value) { return function (forest) { return ({
                value: value,
                forest: forest
            }); }; }), traverseF(ta.forest, function (t) { return r(t, f); }));
        };
        return r;
    },
    sequence: function (F) {
        var traverseF = exports.tree.traverse(F);
        return function (ta) { return traverseF(ta, function_1.identity); };
    },
    extract: function (wa) { return wa.value; },
    extend: function (wa, f) { return ({
        value: f(wa),
        forest: wa.forest.map(function (t) { return exports.tree.extend(t, f); })
    }); }
};
var pipeables = /*@__PURE__*/ pipeable_1.pipeable(exports.tree);
var ap = /*@__PURE__*/ (function () { return pipeables.ap; })();
exports.ap = ap;
var apFirst = /*@__PURE__*/ (function () { return pipeables.apFirst; })();
exports.apFirst = apFirst;
var apSecond = /*@__PURE__*/ (function () { return pipeables.apSecond; })();
exports.apSecond = apSecond;
var chain = /*@__PURE__*/ (function () { return pipeables.chain; })();
exports.chain = chain;
var chainFirst = /*@__PURE__*/ (function () { return pipeables.chainFirst; })();
exports.chainFirst = chainFirst;
var duplicate = /*@__PURE__*/ (function () { return pipeables.duplicate; })();
exports.duplicate = duplicate;
var extend = /*@__PURE__*/ (function () { return pipeables.extend; })();
exports.extend = extend;
var flatten = /*@__PURE__*/ (function () { return pipeables.flatten; })();
exports.flatten = flatten;
var foldMap = /*@__PURE__*/ (function () { return pipeables.foldMap; })();
exports.foldMap = foldMap;
var map = /*@__PURE__*/ (function () { return pipeables.map; })();
exports.map = map;
var reduce = /*@__PURE__*/ (function () { return pipeables.reduce; })();
exports.reduce = reduce;
var reduceRight = /*@__PURE__*/ (function () { return pipeables.reduceRight; })();
exports.reduceRight = reduceRight;