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
import { forwardRef } from "react";
const Input = forwardRef((_a, ref) => {
    var { className = "" } = _a, props = __rest(_a, ["className"]);
    return (_jsx("input", Object.assign({ ref: ref, className: `w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500 ${className}` }, props)));
});
Input.displayName = "Input";
export { Input };
