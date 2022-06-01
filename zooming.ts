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
    outZooming = 'out-zooming'
}

enum frameOperations {
    in = 'in',
    out = 'out'
}

type RectContext = {
    viewportWidth: number,
    viewportHeight: number
}

interface ZoomingPrototype$helper {
    toggle(target: HTMLElement): void
}
interface ZoomingPrototype {
    getRectContext(target: HTMLElement): RectContext,
    toggleZoomInOut(targetFrame: HTMLElement, operation: frameOperations): void,
    in(index: HTMLElement): void,
    out(index: HTMLElement): void,
    getDynamicRootClientRect(HTMLElement): DOMRect
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
                    // calc the corresponding top & left for absolute position, calc the width & height for dummy
                    // fill the original space with dummy div && turn the real one's position absolute 
                }
                targetFrame.classList.add(cssClasses.inZooming)
                targetFrame.classList.remove(cssClasses.outZooming)
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

    targetFrame.style.setProperty(cssVariable.width, `${viewportWidth}px`)
    targetFrame.style.setProperty(cssVariable.height, `${viewportHeight}px`)
    targetFrame.style.setProperty(cssVariable.x, `0`)
    targetFrame.style.setProperty(cssVariable.y, `0`)

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

