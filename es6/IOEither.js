var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as E from './Either';
import { getEitherM } from './EitherT';
import { getFilterableComposition } from './Filterable';
import { getSemigroup as getIOSemigroup, io } from './IO';
import { pipeable } from './pipeable';
import { getValidationM } from './ValidationT';
var T = /*@__PURE__*/ getEitherM(io);
/**
 * @since 2.0.0
 */
export var URI = 'IOEither';
/**
 * @since 2.0.0
 */
export var left = T.left;
/**
 * @since 2.0.0
 */
export var right = T.of;
/**
 * @since 2.0.0
 */
export var rightIO = T.rightM;
/**
 * @since 2.0.0
 */
export var leftIO = T.leftM;
/**
 * @since 2.0.0
 */
export function fold(onLeft, onRight) {
    return function (ma) { return T.fold(ma, onLeft, onRight); };
}
/**
 * @since 2.0.0
 */
export function getOrElse(onLeft) {
    return function (ma) { return T.getOrElse(ma, onLeft); };
}
/**
 * @since 2.6.0
 */
export var getOrElseW = getOrElse;
/**
 * @since 2.0.0
 */
export function orElse(onLeft) {
    return function (ma) { return T.orElse(ma, onLeft); };
}
/**
 * @since 2.0.0
 */
export var swap = T.swap;
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getSemigroup(S) {
    return getIOSemigroup(E.getSemigroup(S));
}
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getApplySemigroup(S) {
    return getIOSemigroup(E.getApplySemigroup(S));
}
/**
 * @since 2.0.0
 */
export function getApplyMonoid(M) {
    return {
        concat: getApplySemigroup(M).concat,
        empty: right(M.empty)
    };
}
/**
 * Constructs a new `IOEither` from a function that performs a side effect and might throw
 *
 * @since 2.0.0
 */
export function tryCatch(f, onError) {
    return function () { return E.tryCatch(f, onError); };
}
/**
 * Make sure that a resource is cleaned up in the event of an exception (*). The release action is called regardless of
 * whether the body action throws (*) or returns.
 *
 * (*) i.e. returns a `Left`
 *
 * @since 2.0.0
 */
export function bracket(acquire, use, release) {
    return T.chain(acquire, function (a) {
        return T.chain(io.map(use(a), E.right), function (e) {
            return T.chain(release(a, e), function () { return (E.isLeft(e) ? T.left(e.left) : T.of(e.right)); });
        });
    });
}
/**
 * @since 2.0.0
 */
export function getIOValidation(S) {
    var T = getValidationM(S, io);
    return __assign(__assign({ _E: undefined }, ioEither), T);
}
/**
 * @since 2.1.0
 */
export function getFilterable(M) {
    var F = E.getWitherable(M);
    return __assign({ URI: URI, _E: undefined }, getFilterableComposition(io, F));
}
/**
 * @since 2.4.0
 */
export function fromEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromEither(f.apply(void 0, a));
    };
}
/**
 * @since 2.4.0
 */
export function chainEitherK(f) {
    return chain(fromEitherK(f));
}
/**
 * @since 2.0.0
 */
export var ioEither = {
    URI: URI,
    bimap: T.bimap,
    mapLeft: T.mapLeft,
    map: T.map,
    of: right,
    ap: T.ap,
    chain: T.chain,
    alt: T.alt,
    fromIO: rightIO,
    throwError: left
};
var pipeables = /*@__PURE__*/ pipeable(ioEither);
var alt = /*@__PURE__*/ (function () { return pipeables.alt; })();
var ap = /*@__PURE__*/ (function () { return pipeables.ap; })();
var apFirst = /*@__PURE__*/ (function () { return pipeables.apFirst; })();
var apSecond = /*@__PURE__*/ (function () { return pipeables.apSecond; })();
var bimap = /*@__PURE__*/ (function () { return pipeables.bimap; })();
var chain = /*@__PURE__*/ (function () { return pipeables.chain; })();
var chainFirst = /*@__PURE__*/ (function () { return pipeables.chainFirst; })();
var flatten = /*@__PURE__*/ (function () { return pipeables.flatten; })();
var map = /*@__PURE__*/ (function () { return pipeables.map; })();
var mapLeft = /*@__PURE__*/ (function () { return pipeables.mapLeft; })();
var fromEither = /*@__PURE__*/ (function () { return pipeables.fromEither; })();
var fromOption = /*@__PURE__*/ (function () { return pipeables.fromOption; })();
var fromPredicate = /*@__PURE__*/ (function () { return pipeables.fromPredicate; })();
var filterOrElse = /*@__PURE__*/ (function () { return pipeables.filterOrElse; })();
/**
 * @since 2.6.0
 */
export var chainW = chain;
/**
 * @since 2.6.1
 */
export var chainEitherKW = chainEitherK;
export { 
/**
 * @since 2.0.0
 */
alt, 
/**
 * @since 2.0.0
 */
ap, 
/**
 * @since 2.0.0
 */
apFirst, 
/**
 * @since 2.0.0
 */
apSecond, 
/**
 * @since 2.0.0
 */
bimap, 
/**
 * @since 2.0.0
 */
chain, 
/**
 * @since 2.0.0
 */
chainFirst, 
/**
 * @since 2.0.0
 */
flatten, 
/**
 * @since 2.0.0
 */
map, 
/**
 * @since 2.0.0
 */
mapLeft, 
/**
 * @since 2.0.0
 */
fromEither, 
/**
 * @since 2.0.0
 */
fromOption, 
/**
 * @since 2.0.0
 */
fromPredicate, 
/**
 * @since 2.0.0
 */
filterOrElse };