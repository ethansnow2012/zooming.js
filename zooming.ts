console.log('zooming.js');

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
    framemetaY= "framemeta-y",
    framemetaX= "framemeta-x",
    framemetaWidth = "framemeta-width",
    framemetaHeight = "framemeta-height"
}
enum frameMetas$map$dimensionKey {
    framemetaY= "top",
    framemetaX= "left",
    framemetaWidth = "width",
    framemetaHeight = "height"
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
interface ZoomingPrototype {
    getRectContext(target: HTMLElement): RectContext,
    toggleZoomInOut(targetFrame: HTMLElement, operation: frameOperations): void,
    in(index: HTMLElement): void,
    out(index: HTMLElement): void,
    getDynamicRootClientRect(HTMLElement): DOMRect,
    createDummyDiv(): HTMLDivElement,
    insertDummy(element: HTMLElement, target: Element, style: fullHtmlDimensions): HTMLDivElement,
    setInitialCssAttribute(target: Element, dimension: fullHtmlDimensions): void
}
interface ZoomingInnerThis {
    rootClientRect: DOMRect,
    styleNotAbsolute: typeof styleNotAbsolute,
    cssClasses: typeof cssClasses,
    helper: ZoomingPrototype$helper,
    relativeFrameInRegister: WeakMap<HTMLElement, any>,// typing needed
    relativeFrameOutRegister: WeakMap<HTMLElement, any>// typing needed
}
interface Zooming extends ZoomingPrototype, ZoomingInnerThis { }



function _zooming(this: Zooming): void {
    this.relativeFrameInRegister = new WeakMap()
    this.relativeFrameOutRegister = new WeakMap()
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

_zooming.prototype.createDummyDiv = function() {
    var div = document.createElement('div');
    return div;
}

_zooming.prototype.setInitialCssAttribute = function(target, dimensions){
    console.log(frameMetas)
    
    for( let x in frameMetas){
        let value = dimensions[frameMetas$map$dimensionKey[x]]
        target.dataset[x] = value
        console.log(x)
    }
}

_zooming.prototype.insertDummy = function(element, target, {width, height, top, left}:fullHtmlDimensions) {
    element.style.position = "relative"
    element.style.width = width+'px'
    element.style.height = height+'px'
    // element.style.top = top+'px'
    // element.style.left = left+'px'
    
    element.classList.add(cssClasses.dummyDiv)

    target.parentNode.insertBefore(element, target)
}

//_zooming.prototype.becomeAbsolute = function()

_zooming.prototype.toggleZoomInOut = function (targetFrame: HTMLElement, operation: frameOperations) {
    const _this: Zooming = this
    console.log('toggleZoomInOut')
    const isRelativeBlock = targetFrame.style.position === _this.styleNotAbsolute.emply
        || targetFrame.style.position === _this.styleNotAbsolute.relative
        || _this.relativeFrameInRegister.has(targetFrame)

    if (isRelativeBlock) {
        _this.relativeFrameInRegister.set(targetFrame, {})
        console.log(_this.relativeFrameInRegister)
    }

    if (operation in frameOperations) {
        switch (operation) {
            case frameOperations.in:
                if (isRelativeBlock) {
                    const wrapper = targetFrame.closest('.zooming-frame-wrapper')

                    const wrapperRect = _this.getDynamicRootClientRect(targetFrame)
                    const targetRect = targetFrame.getBoundingClientRect()

                    

                    //calc
                    const top = targetRect.top - wrapperRect.top
                    const left = targetRect.left - wrapperRect.left
                    const width = targetRect.width
                    const height = targetRect.height

                    targetFrame.style.setProperty(cssVariable.width, `${targetRect.width}px`)
                    targetFrame.style.setProperty(cssVariable.height, `${targetRect.height}px`)
                    targetFrame.style.setProperty(cssVariable.x, `${left}px`)
                    targetFrame.style.setProperty(cssVariable.y, `${top}px`)

                    let newDiv = _this.createDummyDiv()
                    const dims:fullHtmlDimensions = {width, height, top, left}

                    newDiv = _this.insertDummy(newDiv, targetFrame, dims)

                    console.log("isRelativeBlock:in", top, left)
                    

                    // _this.setInitialCssAttribute(targetFrame, dims)
                    


                    


                    targetFrame.classList.add(cssClasses.relative2Absolute)


                    // targetFrame.classList.add(cssClasses.inZooming)
                    // targetFrame.classList.remove(cssClasses.outZooming)

                    // setInitialCssAttrible
                    // calc the corresponding top & left for absolute position, calc the width & height for dummy
                    // fill the original space with dummy div && turn the real one's position absolute 
                    
                }else{
                    targetFrame.classList.add(cssClasses.inZooming)
                    targetFrame.classList.remove(cssClasses.outZooming)
                }
                
                break
            case frameOperations.out:
                if (isRelativeBlock) {
                    // reverse
                }
                targetFrame.classList.add(cssClasses.outZooming)
                targetFrame.classList.remove(cssClasses.inZooming)
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

    //deferred for render life cycle
    setTimeout(()=>{ 
        targetFrame.style.setProperty(cssVariable.width, `${viewportWidth}px`)
        targetFrame.style.setProperty(cssVariable.height, `${viewportHeight}px`)
        targetFrame.style.setProperty(cssVariable.x, `0`)
        targetFrame.style.setProperty(cssVariable.y, `0`)
    }, 0)
    

    targetFrame.classList.add(cssClasses.inZooming)
}

_zooming.prototype.out = function (target: HTMLDivElement) {
    const targetFrame: HTMLElement = target
    this.toggleZoomInOut(targetFrame, frameOperations.out)

    targetFrame.style.setProperty(cssVariable.width, `${targetFrame.dataset.framemetaWidth}`)
    targetFrame.style.setProperty(cssVariable.height, `${targetFrame.dataset.framemetaHeight}`)
    targetFrame.style.setProperty(cssVariable.x, `${targetFrame.dataset.framemetaX}`)
    targetFrame.style.setProperty(cssVariable.y, `${targetFrame.dataset.framemetaY}`)

    console.log(targetFrame)
}

export const zooming: Zooming = new _zooming()

