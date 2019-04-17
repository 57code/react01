// util辅助函数
import { addEvent, removeEvent } from './event-system'
import {
    setStyle,
    removeStyle,
    patchStyle
} from './CSSPropertyOperations.js'
import {
    setPropValue,
    removePropValue,
    updateSelectOptions
} from './DOMPropertyOperations'
import { HTML_KEY } from './constant'

export function isFn(obj) {
    return typeof obj === 'function'
}

export let isArr = Array.isArray

export function noop() {}
export function identity(obj) {
    return obj
}
export function pipe(fn1, fn2) {
    return function() {
        fn1.apply(this, arguments)
        return fn2.apply(this, arguments)
    }
}



export function flatEach(list, iteratee, a) {
    let len = list.length
    let i = -1

    while (len--) {
        let item = list[++i]
        if (isArr(item)) {
            flatEach(item, iteratee, a)
        } else {
            iteratee(item, a)
        }
    }
}


let uid = 0
export function getUid() {
    return ++uid
}

export let EVENT_KEYS = /^on/i

function setProp(elem, key, value, isCustomComponent) {
    if (EVENT_KEYS.test(key)) {
        addEvent(elem, key, value)
    } else if (key === 'style') {
        setStyle(elem.style, value)
    } else if (key === HTML_KEY) {
        if (value && value.__html != null) {
            elem.innerHTML = value.__html
        }
    } else if (isCustomComponent) {
        if (value == null) {
            elem.removeAttribute(key)
        } else {
            elem.setAttribute(key, '' + value)
        }
    } else {
        setPropValue(elem, key, value)
    }
}

function removeProp(elem, key, oldValue, isCustomComponent) {
    if (EVENT_KEYS.test(key)) {
        removeEvent(elem, key)
    } else if (key === 'style') {
        removeStyle(elem.style, oldValue)
    } else if (key === HTML_KEY) {
        elem.innerHTML = ''
    } else if (isCustomComponent) {
        elem.removeAttribute(key)
    } else {
        removePropValue(elem, key)
    }
}

function patchProp(elem, key, value, oldValue, isCustomComponent) {
    if (key === 'value' || key === 'checked') {
        oldValue = elem[key]
    }
    if (value === oldValue) {
        return
    }
    if (value === undefined) {
        removeProp(elem, key, oldValue, isCustomComponent)
        return
    }
    if (key === 'style') {
        patchStyle(elem.style, oldValue, value)
    } else {
        setProp(elem, key, value, isCustomComponent)
    }
}

export function setProps(elem, props, isCustomComponent) {
    var isSelect = elem.nodeName === 'SELECT'
    for (let key in props) {
        if (key !== 'children') {
            if (isSelect && (key === 'value' || key === 'defaultValue')) {
                updateSelectOptions(elem, props.multiple, props[key])
            } else {
                setProp(elem, key, props[key], isCustomComponent)
            }
        }
    }
}

export function patchProps(elem, props, newProps, isCustomComponent) {
    var isSelect = elem.nodeName === 'SELECT'
    for (let key in props) {
        if (key !== 'children') {
            if (newProps.hasOwnProperty(key)) {
                if (isSelect && (key === 'value' || key === 'defaultValue')) {
                    updateSelectOptions(elem, newProps.multiple, newProps[key])
                } else {
                    patchProp(elem, key, newProps[key], props[key], isCustomComponent)
                }
            } else {
                removeProp(elem, key, props[key], isCustomComponent)
            }
        }
    }
    for (let key in newProps) {
        if (key !== 'children' && !props.hasOwnProperty(key)) {
            if (isSelect && (key === 'value' || key === 'defaultValue')) {
                updateSelectOptions(elem, newProps.multiple, newProps[key])
            } else {
                setProp(elem, key, newProps[key], isCustomComponent)
            }
        }
    }
}

if (!Object.freeze) {
    Object.freeze = identity
}