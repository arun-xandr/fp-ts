import { none, some } from './Option';
import { pipeable } from './pipeable';
import * as RA from './ReadonlyArray';
import { getJoinSemigroup, getMeetSemigroup } from './Semigroup';
/**
 * @since 2.5.0
 */
export var URI = 'ReadonlyNonEmptyArray';
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @since 2.5.0
 */
export var cons = RA.cons;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @since 2.5.0
 */
export var snoc = RA.snoc;
/**
 * Builds a `ReadonlyNonEmptyArray` from an array returning `none` if `as` is an empty array
 *
 * @since 2.5.0
 */
export function fromReadonlyArray(as) {
    return RA.isNonEmpty(as) ? some(as) : none;
}
/**
 * @since 2.5.0
 */
// tslint:disable-next-line: readonly-array
export function fromArray(as) {
    return fromReadonlyArray(RA.fromArray(as));
}
/**
 * @since 2.5.0
 */
export var getShow = RA.getShow;
/**
 * @since 2.5.0
 */
export function head(nea) {
    return nea[0];
}
/**
 * @since 2.5.0
 */
export function tail(nea) {
    return nea.slice(1);
}
/**
 * @since 2.5.0
 */
export var reverse = RA.reverse;
/**
 * @since 2.5.0
 */
export function min(ord) {
    var S = getMeetSemigroup(ord);
    return function (nea) { return nea.reduce(S.concat); };
}
/**
 * @since 2.5.0
 */
export function max(ord) {
    var S = getJoinSemigroup(ord);
    return function (nea) { return nea.reduce(S.concat); };
}
/**
 * Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`
 *
 * @since 2.5.0
 */
export function getSemigroup() {
    return {
        concat: concat
    };
}
/**
 * @example
 * import { getEq, cons } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
 *
 * @since 2.5.0
 */
export var getEq = RA.getEq;
export function group(E) {
    return function (as) {
        var len = as.length;
        if (len === 0) {
            return RA.empty;
        }
        // tslint:disable-next-line: readonly-array
        var r = [];
        var head = as[0];
        var nea = [head];
        for (var i = 1; i < len; i++) {
            var x = as[i];
            if (E.equals(x, head)) {
                nea.push(x);
            }
            else {
                r.push(nea);
                head = x;
                nea = [head];
            }
        }
        r.push(nea);
        return r;
    };
}
/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { cons, groupSort } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
 *
 * @since 2.5.0
 */
export function groupSort(O) {
    var sortO = RA.sort(O);
    var groupO = group(O);
    return function (as) { return groupO(sortO(as)); };
}
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { cons, groupBy } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
 *   '3': cons('foo', ['bar']),
 *   '6': cons('foobar', [])
 * })
 *
 * @since 2.5.0
 */
export function groupBy(f) {
    return function (as) {
        var r = {};
        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
            var a = as_1[_i];
            var k = f(a);
            if (r.hasOwnProperty(k)) {
                r[k].push(a);
            }
            else {
                r[k] = [a];
            }
        }
        return r;
    };
}
/**
 * @since 2.5.0
 */
export function last(nea) {
    return nea[nea.length - 1];
}
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.5.0
 */
export function init(nea) {
    return nea.slice(0, -1);
}
/**
 * @since 2.5.0
 */
export function sort(O) {
    return RA.sort(O);
}
/**
 * @since 2.5.0
 */
export function insertAt(i, a) {
    return RA.insertAt(i, a);
}
/**
 * @since 2.5.0
 */
export function updateAt(i, a) {
    return RA.updateAt(i, a);
}
/**
 * @since 2.5.0
 */
export function modifyAt(i, f) {
    return RA.modifyAt(i, f);
}
export function filter(predicate) {
    return filterWithIndex(function (_, a) { return predicate(a); });
}
/**
 * @since 2.5.0
 */
export function filterWithIndex(predicate) {
    return function (nea) { return fromReadonlyArray(nea.filter(function (a, i) { return predicate(i, a); })); };
}
/**
 * @since 2.5.0
 */
export var of = RA.of;
export function concat(fx, fy) {
    return fx.concat(fy);
}
/**
 * @since 2.5.0
 */
export function fold(S) {
    return function (fa) { return fa.reduce(S.concat); };
}
/**
 * @since 2.5.1
 */
export var zipWith = RA.zipWith;
/**
 * @since 2.5.1
 */
export var zip = RA.zip;
/**
 * @since 2.5.1
 */
export var unzip = RA.unzip;
/**
 * @since 2.5.0
 */
export var readonlyNonEmptyArray = 
/*@__PURE__*/
(function () {
    var _a = RA.readonlyArray, alt = _a.alt, map = _a.map, mapWithIndex = _a.mapWithIndex, of = _a.of, ap = _a.ap, chain = _a.chain, extend = _a.extend, reduce = _a.reduce, foldMap = _a.foldMap, reduceRight = _a.reduceRight, traverse = _a.traverse, sequence = _a.sequence, reduceRightWithIndex = _a.reduceRightWithIndex, foldMapWithIndex = _a.foldMapWithIndex, reduceWithIndex = _a.reduceWithIndex, traverseWithIndex = _a.traverseWithIndex;
    return {
        URI: URI,
        extract: head,
        alt: alt,
        map: map,
        mapWithIndex: mapWithIndex,
        of: of,
        ap: ap,
        chain: chain,
        extend: extend,
        reduce: reduce,
        foldMap: foldMap,
        reduceRight: reduceRight,
        traverse: traverse,
        sequence: sequence,
        reduceWithIndex: reduceWithIndex,
        foldMapWithIndex: foldMapWithIndex,
        reduceRightWithIndex: reduceRightWithIndex,
        traverseWithIndex: traverseWithIndex
    };
})();
var pipeables = /*@__PURE__*/ pipeable(readonlyNonEmptyArray);
var alt = /*@__PURE__*/ (function () { return pipeables.alt; })();
var ap = /*@__PURE__*/ (function () { return pipeables.ap; })();
var apFirst = /*@__PURE__*/ (function () { return pipeables.apFirst; })();
var apSecond = /*@__PURE__*/ (function () { return pipeables.apSecond; })();
var chain = /*@__PURE__*/ (function () { return pipeables.chain; })();
var chainFirst = /*@__PURE__*/ (function () { return pipeables.chainFirst; })();
var duplicate = /*@__PURE__*/ (function () { return pipeables.duplicate; })();
var extend = /*@__PURE__*/ (function () { return pipeables.extend; })();
var flatten = /*@__PURE__*/ (function () { return pipeables.flatten; })();
var map = /*@__PURE__*/ (function () { return pipeables.map; })();
var mapWithIndex = /*@__PURE__*/ (function () { return pipeables.mapWithIndex; })();
var reduce = /*@__PURE__*/ (function () { return pipeables.reduce; })();
var reduceWithIndex = /*@__PURE__*/ (function () { return pipeables.reduceWithIndex; })();
var reduceRight = /*@__PURE__*/ (function () { return pipeables.reduceRight; })();
var reduceRightWithIndex = /*@__PURE__*/ (function () { return pipeables.reduceRightWithIndex; })();
var foldMapWithIndex = function (S) { return function (f) { return function (fa) {
    return fa.slice(1).reduce(function (s, a, i) { return S.concat(s, f(i + 1, a)); }, f(0, fa[0]));
}; }; };
var foldMap = function (S) { return function (f) { return function (fa) {
    return fa.slice(1).reduce(function (s, a) { return S.concat(s, f(a)); }, f(fa[0]));
}; }; };
export { 
/**
 * @since 2.6.2
 */
alt, 
/**
 * @since 2.5.0
 */
ap, 
/**
 * @since 2.5.0
 */
apFirst, 
/**
 * @since 2.5.0
 */
apSecond, 
/**
 * @since 2.5.0
 */
chain, 
/**
 * @since 2.5.0
 */
chainFirst, 
/**
 * @since 2.5.0
 */
duplicate, 
/**
 * @since 2.5.0
 */
extend, 
/**
 * @since 2.5.0
 */
flatten, 
/**
 * @since 2.5.0
 */
foldMap, 
/**
 * @since 2.5.0
 */
foldMapWithIndex, 
/**
 * @since 2.5.0
 */
map, 
/**
 * @since 2.5.0
 */
mapWithIndex, 
/**
 * @since 2.5.0
 */
reduce, 
/**
 * @since 2.5.0
 */
reduceRight, 
/**
 * @since 2.5.0
 */
reduceRightWithIndex, 
/**
 * @since 2.5.0
 */
reduceWithIndex };