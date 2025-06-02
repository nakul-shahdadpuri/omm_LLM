var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
export function Button(_a) {
    var { size, variant, className = '' } = _a, props = __rest(_a, ["size", "variant", "className"]);
    const sizeClasses = size === 'icon'
        ? 'p-2'
        : size === 'sm'
            ? 'px-3 py-1.5 text-sm'
            : 'px-4 py-2';
    const variantClasses = variant === 'outline'
        ? 'border border-gray-300 bg-white hover:bg-gray-100'
        : variant === 'ghost'
            ? 'bg-transparent hover:bg-gray-100'
            : 'bg-gray-100 hover:bg-gray-200';
    return (_jsx("button", Object.assign({}, props, { className: `${sizeClasses} ${variantClasses} rounded-md font-medium ${className}` })));
}
