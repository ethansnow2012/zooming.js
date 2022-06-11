enum styleNotAbsolute {
    relative = 'relative',
    emply = ''
}

enum cssVariable {
    width = '---width',
    height = '---height',
    x = '---x',
    y = '---y'
}

enum cssClasses {
    body = 'zooming-body',
    inZooming = 'in-zooming',
    outZooming = 'out-zooming',
    dummyDiv = 'zooming-dummyDiv',
    relative2Absolute = 'zooming-relative2absolute'
}
    
enum frameOperations {
    in = 'in',
    out = 'out'
}

enum frameMetas {
    framemetaY = "framemeta-y",
    framemetaX = "framemeta-x",
    framemetaWidth = "framemeta-width",
    framemetaHeight = "framemeta-height"
}

enum frameMetas$map$dimensionKey {
    framemetaY = "top",
    framemetaX = "left",
    framemetaWidth = "width",
    framemetaHeight = "height"
}

enum frameMetas$map$cssVariable {
    framemetaY = "---width",
    framemetaX = "---height",
    framemetaWidth = "---x",
    framemetaHeight = "---y"
}

type RectContext = {
    viewportWidth: number,
    viewportHeight: number
}

type fullHtmlDimensions = {
    width: number,
    height: number,
    top: number,
    left: number
}

interface ZoomingPrototype$helper {
    toggle(target: HTMLElement): void
}

interface ZoomingPrototype$innerUtils {
    stringUnitsRemove(str: string): string
}
interface ZoomingPrototype {
    getRectContext(target: HTMLElement): RectContext,
    toggleZoomInOut(targetFrame: HTMLElement, operation: frameOperations): void,
    in(index: HTMLElement): void,
    out(index: HTMLElement): void,
    getDynamicRootClientRect(HTMLElement): DOMRect,
    createDummyDiv(): HTMLDivElement,
    insertDummy(element: HTMLElement, target: Element, style: fullHtmlDimensions): HTMLDivElement,
    removeDummy(target: Element): void,
    setInitialCssAttribute(target: Element, dimension: fullHtmlDimensions): void,
    removeInitialCssAttribute(target: Element): void,
    //updateInitialCssAttribute(target: Element, newMeta: any): void,//typeof frameMetas
    toggleZoomInOut$Deferred(targetFrame: HTMLElement, operation: frameOperations, aa?: RectContext): void,
    isRelativeBlock(target: Element),
    getAndSetTheFullHtmlDimensions(target: Element): fullHtmlDimensions
}
interface ZoomingInnerThis {
    rootClientRect: DOMRect,
    styleNotAbsolute: typeof styleNotAbsolute,
    cssClasses: typeof cssClasses,
    helper: ZoomingPrototype$helper,
    innerUtils: ZoomingPrototype$innerUtils,
    relativeFrameInRegister: WeakMap<HTMLElement, any>,// typing needed
    relativeFrameOutRegister: WeakMap<HTMLElement, any>,// typing needed
    dummyDiv: WeakMap<HTMLElement, any>,
    endTransistionHandle: WeakMap<HTMLElement, any>, 
}
interface Zooming extends ZoomingPrototype, ZoomingInnerThis { }

function isFrameMetas(obj: any): obj is frameMetas {
    return 'framemetaY' in obj && 'framemetaX' in obj && 'framemetaWidth' in obj && 'framemetaHeight' in obj;
}



function _zooming(this: Zooming): void {
    this.relativeFrameInRegister = new WeakMap()
    this.relativeFrameOutRegister = new WeakMap()
    this.dummyDiv = new WeakMap()
    this.endTransistionHandle = new WeakMap()
    this.cssClasses = cssClasses
    this.styleNotAbsolute = styleNotAbsolute
    this.helper = {
        toggle: (target) => {
            const classList = target.classList
            switch (true) {
                case classList.contains(zooming.cssClasses.outZooming):
                    this.in(target)
                    break;
                case classList.contains(zooming.cssClasses.inZooming):
                    zooming.out(target)
                    break;
                default:
                    zooming.in(target)
            }
        }
    }
    this.innerUtils = {
        stringUnitsRemove: (str) => {
            const whiteListUnit = ['px', '%', 'vw', 'vh']
            return str.replace(new RegExp(`(${whiteListUnit.join('|')})(${whiteListUnit.join('|')})`), "$1")
        }
    }

    const resizeHandle = () => {
        
        const zoomingFrame = Array.from(document.querySelectorAll<HTMLElement>('.zooming-frame'))
        const zoomingFrame$Relative = zoomingFrame.filter(x=>window.getComputedStyle(x).position==='relative')
        const zoomingFrame$Absolute = zoomingFrame.filter(x=>window.getComputedStyle(x).position==='absolute')
        
        //$Relative$In will basicly not exists so comment it out
        // const zoomingFrame$Relative$In = zoomingFrame$Relative.filter(x=>x.classList.contains(cssClasses.inZooming))
        const zoomingFrame$Relative$Out = zoomingFrame$Relative.filter(x=>!(x.classList.contains(cssClasses.inZooming)))
        const zoomingFrame$Absolute$In = zoomingFrame$Absolute.filter(x=>x.classList.contains(cssClasses.inZooming))
        const zoomingFrame$Absolute$Out = zoomingFrame$Absolute.filter(x=>!(x.classList.contains(cssClasses.inZooming)))
        
        zoomingFrame$Absolute$In.forEach((el)=>{
            const wrapperRect = this.getDynamicRootClientRect(el)
            console.log('wrapperRect', wrapperRect)
            el.style.setProperty(cssVariable.width, `${wrapperRect.width}px`)
            el.style.setProperty(cssVariable.height, `${wrapperRect.height}px`)

        })
        zoomingFrame$Relative$Out.forEach((el)=>{
            el.style.removeProperty(cssVariable.width)
            el.style.removeProperty(cssVariable.height)
            el.style.removeProperty(cssVariable.x)
            el.style.removeProperty(cssVariable.y)

            this.removeInitialCssAttribute(el)
        })
    }

    window.addEventListener('resize', ()=>{
        resizeHandle()
    })
}
_zooming.prototype.getDynamicRootClientRect = function (target) {
    return target.closest('.zooming-frame-wrapper').getBoundingClientRect();
}
_zooming.prototype.getRectContext = function (target): RectContext {
    const _this: Zooming = this
    const clientRect = _this.getDynamicRootClientRect(target)
    const viewportWidth = clientRect.width as number
    const viewportHeight = clientRect.height as number
    return {
        viewportWidth,
        viewportHeight
    }
}

_zooming.prototype.createDummyDiv = function () {
    var div = document.createElement('div');
    return div;
}

_zooming.prototype.setInitialCssAttribute = function (target, dimensions) {
    for (let x in frameMetas) {
        let value = dimensions[frameMetas$map$dimensionKey[x]]
        target.dataset[x] = value
    }
}

_zooming.prototype.removeInitialCssAttribute = function (target) {
    for (let x in frameMetas) {
        target.removeAttribute(`data-${frameMetas[x]}`)
    }
}

// _zooming.prototype.updateInitialCssAttribute = function (target, newMeta: any) {//typeof frameMetas
//     for (let x in frameMetas) {
//         if(newMeta[x] !== undefined){
//             const key = `data-${frameMetas[x]}`
//             target.setAttribute(key, newMeta[x])
//         }
//     }
// }

_zooming.prototype.insertDummy = function (element, target, { width, height, top, left }: fullHtmlDimensions) {
    const _this: Zooming = this
    const root = target.parentNode
    _this.dummyDiv.set(target, element)
    const previousDummy = root.querySelector(`.${cssClasses.dummyDiv}`)
    if (previousDummy) {
        previousDummy.remove()
    }

    element.style.position = "relative"
    element.style.width = width + 'px'
    element.style.height = height + 'px'

    element.classList.add(cssClasses.dummyDiv)
    root.insertBefore(element, target)//parentNode => not flexable
    
}
_zooming.prototype.removeDummy = function (target) {
    const _this: Zooming = this
    const dummyTobeRemoved = _this.dummyDiv.get(target)
    //dummyTobeRemoved.parentNode
    if (dummyTobeRemoved) {
        dummyTobeRemoved.remove()
    }
}


_zooming.prototype.isRelativeBlock = function (targetFrame: HTMLElement) {
    const _this: Zooming = this
    const calcPosition = window.getComputedStyle(targetFrame).position
    const isRelativeBlock = calcPosition === _this.styleNotAbsolute.emply
        || calcPosition === _this.styleNotAbsolute.relative
        || _this.relativeFrameInRegister.has(targetFrame)
    return isRelativeBlock
}

//deferred for render life cycle
_zooming.prototype.toggleZoomInOut$Deferred = function (targetFrame: HTMLElement, operation: frameOperations, rectContext: RectContext | undefined) {
    const _this: Zooming = this
    const isRelativeBlock = _this.isRelativeBlock(targetFrame)
    const viewportWidth = rectContext?.viewportWidth
    const viewportHeight = rectContext?.viewportHeight

    if (operation in frameOperations) {
        switch (operation) {
            case frameOperations.in:
                setTimeout(() => {
                    targetFrame.style.setProperty(cssVariable.width, `${viewportWidth}px`)
                    targetFrame.style.setProperty(cssVariable.height, `${viewportHeight}px`)
                    targetFrame.style.setProperty(cssVariable.x, `0`)
                    targetFrame.style.setProperty(cssVariable.y, `0`)

                    //targetFrame.classList.add(cssClasses.inZooming)
                }, 0)
                break;
            case frameOperations.out:
                setTimeout(() => {
                    targetFrame.style.setProperty(cssVariable.width, _this.innerUtils.stringUnitsRemove(`${targetFrame.dataset.framemetaWidth}px`))
                    targetFrame.style.setProperty(cssVariable.height, _this.innerUtils.stringUnitsRemove(`${targetFrame.dataset.framemetaHeight}px`))
                    targetFrame.style.setProperty(cssVariable.x, _this.innerUtils.stringUnitsRemove(`${targetFrame.dataset.framemetaX}px`))
                    targetFrame.style.setProperty(cssVariable.y, _this.innerUtils.stringUnitsRemove(`${targetFrame.dataset.framemetaY}px`))

                }, 0)

                break;
            default:
                break
        }
    }
}

_zooming.prototype.getAndSetTheFullHtmlDimensions = function(targetFrame): fullHtmlDimensions{
    const _this: Zooming = this
    const wrapperRect = _this.getDynamicRootClientRect(targetFrame)
    const targetRect = targetFrame.getBoundingClientRect()

    const top = targetRect.top - wrapperRect.top
    const left = targetRect.left - wrapperRect.left
    const width = targetRect.width
    const height = targetRect.height

    const dims: fullHtmlDimensions = { width, height, top, left }

    if ( !isFrameMetas(targetFrame.dataset) ) {
        _this.setInitialCssAttribute(targetFrame, dims)
    }else{
        dims.top = Number(targetFrame.dataset['framemetaY'])
        dims.left = Number(targetFrame.dataset['framemetaX'])
        dims.width = Number(targetFrame.dataset['framemetaWidth'])
        dims.height = Number(targetFrame.dataset['framemetaHeight'])
    }

    return { width, height, top, left }
}

_zooming.prototype.toggleZoomInOut = function (targetFrame: HTMLElement, operation: frameOperations) {
    const _this: Zooming = this
    console.log('toggleZoomInOut')
    const isRelativeBlock = _this.isRelativeBlock(targetFrame)

    if (isRelativeBlock) {
        _this.relativeFrameInRegister.set(targetFrame, {})

        console.log(_this.relativeFrameInRegister)
    }

    if (operation in frameOperations) {
        switch (operation) {
            case frameOperations.in:
                if (isRelativeBlock) {
                    
                    const dims: fullHtmlDimensions = _this.getAndSetTheFullHtmlDimensions(targetFrame) 

                    targetFrame.style.setProperty(cssVariable.width, `${dims.width}px`)
                    targetFrame.style.setProperty(cssVariable.height, `${dims.height}px`)
                    targetFrame.style.setProperty(cssVariable.x, `${dims.left}px`)
                    targetFrame.style.setProperty(cssVariable.y, `${dims.top}px`)

                    let newDiv = _this.createDummyDiv()

                    newDiv = _this.insertDummy(newDiv, targetFrame, dims)

                    targetFrame.classList.add(cssClasses.relative2Absolute)



                    targetFrame.classList.add(cssClasses.inZooming)
                    targetFrame.classList.remove(cssClasses.outZooming)

                    // setInitialCssAttrible
                    // calc the corresponding top & left for absolute position, calc the width & height for dummy
                    // fill the original space with dummy div && turn the real one's position absolute 

                } else {
                    targetFrame.classList.add(cssClasses.inZooming)
                    targetFrame.classList.remove(cssClasses.outZooming)
                }

                break
            case frameOperations.out:
                if (isRelativeBlock) {
                    // reverse
                    //_this.removeDummy(targetFrame)//too soon

                    if (_this.endTransistionHandle.has(targetFrame)) {
                        targetFrame.removeEventListener('transitionend', _this.endTransistionHandle.get(targetFrame))
                        _this.endTransistionHandle.delete(targetFrame)
                    }

                    targetFrame.classList.add(cssClasses.outZooming)
                    targetFrame.classList.remove(cssClasses.inZooming)

                    const transitionendHandle = targetFrame.addEventListener('transitionend', () => {
                        if (targetFrame.classList.contains(cssClasses.outZooming)) {
                            targetFrame.classList.remove(cssClasses.relative2Absolute)
                            _this.removeDummy(targetFrame)

                            targetFrame.classList.remove(cssClasses.outZooming)

                            targetFrame.style.setProperty(cssVariable.x, `unset`)
                            targetFrame.style.setProperty(cssVariable.y, `unset`)
                        }
                    });

                    _this.endTransistionHandle.set(targetFrame, transitionendHandle)


                } else {
                    targetFrame.classList.add(cssClasses.outZooming)
                    targetFrame.classList.remove(cssClasses.inZooming)
                }

                break
            default:
                break
        }
    }

}

_zooming.prototype.in = function (target: HTMLDivElement) {
    const _this: Zooming = this
    const { viewportWidth, viewportHeight } = _this.getRectContext(target)

    const targetFrame: HTMLElement = target

    _this.toggleZoomInOut(targetFrame, frameOperations.in)
    _this.toggleZoomInOut$Deferred(targetFrame, frameOperations.in, { viewportWidth, viewportHeight })

}

_zooming.prototype.out = function (target: HTMLDivElement) {
    const _this: Zooming = this
    const targetFrame: HTMLElement = target
    _this.toggleZoomInOut(targetFrame, frameOperations.out)
    _this.toggleZoomInOut$Deferred(targetFrame, frameOperations.out)

}

export const zooming: Zooming = new _zooming()

