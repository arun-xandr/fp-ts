import { pipeable } from './pipeable';
import * as RR from './ReadonlyRecord';
/**
 * @since 2.0.0
 */
export var URI = 'Record';
/**
 * @since 2.0.0
 */
export var getShow = RR.getShow;
/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 2.0.0
 */
export var size = RR.size;
/**
 * Test whether a record is empty
 *
 * @since 2.0.0
 */
export var isEmpty = RR.isEmpty;
/**
 * @since 2.0.0
 */
export var keys = RR.keys;
/**
 * Map a record into an array
 *
 * @example
 * import {collect} from 'fp-ts/lib/Record'
 *
 * const x: { a: string, b: boolean } = { a: 'foo', b: false }
 * assert.deepStrictEqual(
 *   collect((key, val) => ({key: key, value: val}))(x),
 *   [{key: 'a', value: 'foo'}, {key: 'b', value: false}]
 * )
 *
 * @since 2.0.0
 */
export var collect = RR.collect;
/**
 * @since 2.0.0
 */
export var toArray = RR.toReadonlyArray;
export function toUnfoldable(U) {
    return RR.toUnfoldable(U);
}
export function insertAt(k, a) {
    return RR.insertAt(k, a);
}
/**
 * @since 2.0.0
 */
export var hasOwnProperty = RR.hasOwnProperty;
export function deleteAt(k) {
    return RR.deleteAt(k);
}
/**
 * @since 2.0.0
 */
export var updateAt = RR.updateAt;
/**
 * @since 2.0.0
 */
export var modifyAt = RR.modifyAt;
export function pop(k) {
    return RR.pop(k);
}
/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 2.0.0
 */
export var isSubrecord = RR.isSubrecord;
export function getEq(E) {
    return RR.getEq(E);
}
export function getMonoid(S) {
    return RR.getMonoid(S);
}
/**
 * Lookup the value for a key in a record
 *
 * @since 2.0.0
 */
export var lookup = RR.lookup;
/**
 * @since 2.0.0
 */
export var empty = {};
export function mapWithIndex(f) {
    return RR.mapWithIndex(f);
}
export function map(f) {
    return RR.map(f);
}
export function reduceWithIndex(b, f) {
    return RR.reduceWithIndex(b, f);
}
export function foldMapWithIndex(M) {
    return RR.foldMapWithIndex(M);
}
export function reduceRightWithIndex(b, f) {
    return RR.reduceRightWithIndex(b, f);
}
/**
 * Create a record with one key/value pair
 *
 * @since 2.0.0
 */
export var singleton = RR.singleton;
export function traverseWithIndex(F) {
    return RR.traverseWithIndex(F);
}
export function traverse(F) {
    return RR.traverse(F);
}
export function sequence(F) {
    return RR.sequence(F);
}
export function partitionMapWithIndex(f) {
    return RR.partitionMapWithIndex(f);
}
export function partitionWithIndex(predicateWithIndex) {
    return RR.partitionWithIndex(predicateWithIndex);
}
export function filterMapWithIndex(f) {
    return RR.filterMapWithIndex(f);
}
export function filterWithIndex(predicateWithIndex) {
    return RR.filterWithIndex(predicateWithIndex);
}
export function fromFoldable(M, F) {
    return RR.fromFoldable(M, F);
}
export function fromFoldableMap(M, F) {
    return RR.fromFoldableMap(M, F);
}
/**
 * @since 2.0.0
 */
export var every = RR.every;
/**
 * @since 2.0.0
 */
export var some = RR.some;
/**
 * @since 2.0.0
 */
export var elem = RR.elem;
/**
 * @since 2.0.0
 */
export var record = 
/*@__PURE__*/
(function () { return Object.assign({}, RR.readonlyRecord, { URI: URI }); })();
var pipeables = /*@__PURE__*/ pipeable(record);
var filter = /*@__PURE__*/ (function () { return pipeables.filter; })();
var filterMap = /*@__PURE__*/ (function () { return pipeables.filterMap; })();
var foldMap = /*@__PURE__*/ (function () { return pipeables.foldMap; })();
var partition = /*@__PURE__*/ (function () { return pipeables.partition; })();
var partitionMap = /*@__PURE__*/ (function () { return pipeables.partitionMap; })();
var reduce = /*@__PURE__*/ (function () { return pipeables.reduce; })();
var reduceRight = /*@__PURE__*/ (function () { return pipeables.reduceRight; })();
var compact = /*@__PURE__*/ (function () { return pipeables.compact; })();
var separate = /*@__PURE__*/ (function () { return pipeables.separate; })();
export { 
/**
 * @since 2.0.0
 */
filter, 
/**
 * @since 2.0.0
 */
filterMap, 
/**
 * @since 2.0.0
 */
foldMap, 
/**
 * @since 2.0.0
 */
partition, 
/**
 * @since 2.0.0
 */
partitionMap, 
/**
 * @since 2.0.0
 */
reduce, 
/**
 * @since 2.0.0
 */
reduceRight, 
/**
 * @since 2.0.0
 */
compact, 
/**
 * @since 2.0.0
 */
separate };